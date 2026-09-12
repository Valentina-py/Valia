import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const FUNCTION_URL = "https://eizvzrulpagmwaynslli.supabase.co/functions/v1/google-drive";
const CALLBACK_URL = `${FUNCTION_URL}/callback`;
const APP_URL = "https://valia2026.vercel.app";
const cors = {
  "Access-Control-Allow-Origin": APP_URL,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const YEAR_FOLDERS: Record<string, string> = {
  "Primer Año - Sistemas Loutaif": "1ZCnvb90BLhfg0tkJuWBJD_L8x5p0xrNJ",
  "Segundo Año - Sistemas Loutaif": "1QCvc1KNTy21u4E1TwAtOcQyn91waRrkq",
  "Tercer Año - Sistemas Loutaif": "1VvS_nIYS79M9isWEG8K0Fi2wQ0NfJISe",
};

const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { ...cors, "Content-Type": "application/json" },
});

async function tokenRequest(params: URLSearchParams) {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error_description || data.error || "No se pudo autorizar Google Drive");
  return data;
}

async function accessToken() {
  const clientId = Deno.env.get("GOOGLE_CLIENT_ID") || "";
  const clientSecret = Deno.env.get("GOOGLE_CLIENT_SECRET") || "";
  const refreshToken = Deno.env.get("GOOGLE_REFRESH_TOKEN") || "";
  if (!clientId || !clientSecret || !refreshToken) throw new Error("Falta GOOGLE_REFRESH_TOKEN o las credenciales OAuth");
  const data = await tokenRequest(new URLSearchParams({
    client_id: clientId, client_secret: clientSecret,
    refresh_token: refreshToken, grant_type: "refresh_token",
  }));
  return data.access_token as string;
}

async function findOrCreateFolder(token: string, parent: string, name: string) {
  const safeName = name.replace(/[\\/]/g, "-").trim() || "General";
  const query = `name='${safeName.replace(/'/g, "\\'")}' and '${parent}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`;
  const list = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name)&spaces=drive`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const listed = await list.json();
  if (!list.ok) throw new Error(listed.error?.message || "No se pudo consultar Drive");
  if (listed.files?.[0]?.id) return listed.files[0].id as string;
  const create = await fetch("https://www.googleapis.com/drive/v3/files?fields=id", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ name: safeName, mimeType: "application/vnd.google-apps.folder", parents: [parent] }),
  });
  const created = await create.json();
  if (!create.ok) throw new Error(created.error?.message || "No se pudo crear la carpeta");
  return created.id as string;
}

async function uploadFile(token: string, folderId: string, file: File) {
  const boundary = `valia_${crypto.randomUUID()}`;
  const metadata = JSON.stringify({ name: file.name, parents: [folderId] });
  const prefix = new TextEncoder().encode(`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n--${boundary}\r\nContent-Type: ${file.type || "application/octet-stream"}\r\n\r\n`);
  const suffix = new TextEncoder().encode(`\r\n--${boundary}--`);
  const bytes = new Uint8Array(prefix.length + file.size + suffix.length);
  bytes.set(prefix, 0); bytes.set(new Uint8Array(await file.arrayBuffer()), prefix.length); bytes.set(suffix, prefix.length + file.size);
  const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": `multipart/related; boundary=${boundary}` },
    body: bytes,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || "No se pudo subir el archivo");
  return data;
}

serve(async (req) => {
  try {
    if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
    const url = new URL(req.url);
    const clientId = Deno.env.get("GOOGLE_CLIENT_ID") || "";
    const clientSecret = Deno.env.get("GOOGLE_CLIENT_SECRET") || "";

    if (req.method === "GET" && url.pathname.endsWith("/callback")) {
      const code = url.searchParams.get("code");
      if (!code) return json({ error: "Google no devolvió el código de autorización" }, 400);
      const tokens = await tokenRequest(new URLSearchParams({
        code, client_id: clientId, client_secret: clientSecret,
        redirect_uri: CALLBACK_URL, grant_type: "authorization_code",
      }));
      const refresh = tokens.refresh_token || "No se recibió refresh token. Repetí la autorización con prompt=consent.";
      return new Response(`<!doctype html><meta charset="utf-8"><title>Valia · Drive autorizado</title><style>body{font:16px system-ui;max-width:760px;margin:60px auto;padding:20px}code{display:block;padding:16px;background:#eee;overflow-wrap:anywhere}h1{color:#6d28d9}</style><h1>Drive autorizado</h1><p>Copiá este valor en Supabase como secreto <b>GOOGLE_REFRESH_TOKEN</b>. No lo compartas por chat.</p><code>${refresh}</code>`, { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }

    if (req.method === "GET") {
      if (!clientId || !clientSecret) return json({ error: "Faltan GOOGLE_CLIENT_ID o GOOGLE_CLIENT_SECRET" }, 500);
      const auth = new URL("https://accounts.google.com/o/oauth2/v2/auth");
      auth.search = new URLSearchParams({
        client_id: clientId, redirect_uri: CALLBACK_URL, response_type: "code",
        scope: "https://www.googleapis.com/auth/drive", access_type: "offline",
        prompt: "consent", login_hint: "nvalentinabaudino@gmail.com",
      }).toString();
      return Response.redirect(auth.toString(), 302);
    }

    if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);
    const form = await req.formData();
    const file = form.get("file");
    const carreraAnio = String(form.get("carrera_anio") || "");
    const materia = String(form.get("materia") || "General");
    const tipo = String(form.get("tipo") || "Material");
    if (!(file instanceof File)) return json({ error: "Falta el archivo" }, 400);
    const yearFolderId = YEAR_FOLDERS[carreraAnio];
    if (!yearFolderId) return json({ error: "Seleccioná un año válido de Sistemas Loutaif" }, 400);
    const token = await accessToken();
    const subjectFolder = await findOrCreateFolder(token, yearFolderId, materia);
    const typeFolder = await findOrCreateFolder(token, subjectFolder, tipo);
    const uploaded = await uploadFile(token, typeFolder, file);
    return json({ ok: true, file: uploaded, destination: { carreraAnio, materia, tipo } });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Error inesperado" }, 500);
  }
});
