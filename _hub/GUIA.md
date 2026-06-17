# Guía rápida de tu Hub de Estudio

Tu web principal ya funciona. Ábrela con doble clic en **`Clases/index.html`**.
Por ahora está en **modo demo** (login y apuntes simulados en tu navegador).
Sigue estos pasos cuando quieras que sea real. Todo se edita en **`_hub/config.js`**.

---

## 1. Login + subir apuntes de verdad (Supabase · gratis)

1. Entra en **https://supabase.com** → *Start your project* → crea una cuenta.
2. *New project* → ponle nombre y una contraseña → espera ~2 min.
3. En el panel izquierdo: **Project Settings → API**. Copia:
   - **Project URL** → pégalo en `config.js` → `supabase.url`
   - **anon public key** → pégalo en `config.js` → `supabase.anonKey`
4. Crea el **almacenamiento de archivos**:
   - Menú **Storage → New bucket** → nombre `apuntes` → marca **Public bucket** → *Save*.
5. Crea la **tabla de apuntes**. Ve a **SQL Editor → New query**, pega esto y dale *Run*:

   > ⚠️ Importante: copia **desde `create table` hasta el final**. NO copies la palabra
   > `sql` de la primera línea (es solo una etiqueta del documento, no es código). Si la
   > pegas, Supabase dará el error `syntax error at or near "sql"`.

```sql
create table apuntes (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  materia text,
  file_path text not null,
  url text,
  user_id uuid references auth.users(id),
  created_at timestamptz default now()
);

alter table apuntes enable row level security;

-- Todos pueden ver los apuntes
create policy "ver apuntes" on apuntes for select using (true);
-- Solo usuarios logueados pueden subir (y solo como ellos mismos)
create policy "subir apuntes" on apuntes for insert with check (auth.uid() = user_id);
-- Cada quien borra los suyos
create policy "borrar propios" on apuntes for delete using (auth.uid() = user_id);
```

6. (Opcional) Para que el bucket acepte subidas de usuarios logueados, en
   **Storage → Policies → apuntes** crea una política de *INSERT* para el rol
   `authenticated`.

Guarda `config.js`, recarga la web → ya tienes login y apuntes reales. ✅

### Login con Google (el botón ya está puesto)

1. En **https://console.cloud.google.com** crea un proyecto.
2. **APIs y servicios → Pantalla de consentimiento OAuth** → tipo *Externo* → completa lo básico.
3. **Credenciales → Crear credenciales → ID de cliente de OAuth → Aplicación web**.
   - En *Orígenes autorizados de JavaScript* y *URIs de redireccionamiento* pega la URL
     que te da Supabase en el paso siguiente.
4. En **Supabase → Authentication → Providers → Google** actívalo y pega el
   **Client ID** y **Client Secret** de Google. Copia la *Callback URL* que muestra
   Supabase y pégala en Google (paso 3).

Con eso, el botón **"Continuar con Google"** funciona solo. Mientras no lo actives,
en modo demo el botón simula el acceso.

---

## 2. Donativos

En `config.js` → `pagos`:

- **PayPal:** entra a tu PayPal → *Botones de donación* → copia el enlace y pégalo en `paypal`.
- **Mercado Pago:** crea un *Link de pago* en tu cuenta y pégalo en `mercadopago`.

Si dejas uno vacío, ese botón no aparece.

---

## 3. Anuncios (cuando tengas tráfico)

1. Solicita **Google AdSense** (https://adsense.com). Aprueban cuando la web tiene visitas.
2. Pega tu código `ca-pub-...` en `config.js` → `ads.adsenseClient`.
3. Avísame y coloco los bloques `<ins class="adsbygoogle">` en los espacios reservados
   (ya están diseñados para no molestar: una franja fina y nada de pop-ups).

---

## 4. Personalizar

Todo lo visible (nombre, lema, materias, iconos, colores de cada tarjeta) se cambia
en `config.js`. No necesitas tocar el resto.

---

## 5. Publicarla en internet (gratis)

Cuando quieras que otros entren: súbela a **Netlify** o **Vercel** (arrastrando la
carpeta `Clases`) o a **GitHub Pages**. Dímelo y te guío paso a paso.
