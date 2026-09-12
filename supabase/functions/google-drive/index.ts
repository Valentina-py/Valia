// Valia · recepción segura de materiales para Google Drive.
// La credencial de Drive debe permanecer en secretos de Supabase.
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const cors = {
  "Access-Control-Allow-Origin": "https://valia2026.vercel.app",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Método no permitido" }), { status: 405, headers: { ...cors, "Content-Type": "application/json" } });

  // El endpoint queda preparado para recibir multipart/form-data.
  // La subida final se habilita cuando exista el refresh token OAuth de Drive.
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) return new Response(JSON.stringify({ error: "Enviá un archivo como multipart/form-data" }), { status: 400, headers: { ...cors, "Content-Type": "application/json" } });
  const form = await req.formData();
  const file = form.get("file");
  const materia = String(form.get("materia") || "General");
  const tipo = String(form.get("tipo") || "Material");
  if (!(file instanceof File)) return new Response(JSON.stringify({ error: "Falta el archivo" }), { status: 400, headers: { ...cors, "Content-Type": "application/json" } });

  const hasRoot = Boolean(Deno.env.get("GOOGLE_DRIVE_ROOT_FOLDER_ID"));
  const hasOAuth = Boolean(Deno.env.get("GOOGLE_CLIENT_ID") && Deno.env.get("GOOGLE_CLIENT_SECRET"));
  if (!hasRoot || !hasOAuth) return new Response(JSON.stringify({ error: "Faltan secretos de Google Drive en Supabase" }), { status: 500, headers: { ...cors, "Content-Type": "application/json" } });

  return new Response(JSON.stringify({ ok: false, pending: true, message: `Archivo recibido para ${materia}/${tipo}. Falta completar la autorización OAuth de Drive.` }), { status: 501, headers: { ...cors, "Content-Type": "application/json" } });
});
