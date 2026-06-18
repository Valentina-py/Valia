# Hub de Estudio · "Valía"

Plataforma web que reúne todas las materias de estudio en un solo lugar, con login,
subida de apuntes, donativos y anuncios. La página principal (hub) vive en esta carpeta
(`Clases/index.html`) y enlaza a las webs de cada materia (ya existentes en subcarpetas).

## Comportamiento al iniciar
Cuando el usuario abra esta carpeta, saluda en español, recuerda que estamos construyendo
su hub de estudio y pregunta en qué quiere avanzar hoy. NO inventes datos: usa solo los reales.

## Estructura
- `index.html` ............ Hub principal (hero, materias, lista pública de apuntes, login, anuncios, donativos)
- `panel.html` ........... Página de panel del usuario (perfil, estadísticas, subir apuntes, "mis apuntes"). Se abre con el engranaje del navbar.
- `_hub/config.js` ........ ÚNICO archivo que edita la usuaria: marca, claves Supabase, pagos, materias
- `_hub/hub.css` .......... Estilos. Tema claro = menta + carbón · Tema oscuro = violeta eléctrico + negro
- `_hub/hub.js` ........... Lógica del hub: tema, scroll, auth (email + Google), lista pública de apuntes
- `_hub/panel.js` ........ Lógica de panel.html: auth-guard, subir apuntes (con materia/institución libre), mis apuntes, borrar
- `_hub/GUIA.md` .......... Pasos para activar Supabase, Google y pagos
- `Sistemas_1er_año/`, `Sistemas_2do_año/`, `Turismo/`, `Unsa/` ... webs de cada materia

## Decisiones tomadas
- Estética: profesional, **sin emojis**, iconos vectoriales de línea (monocromos).
- Temas: claro = menta (`#07C98A`) + carbón · oscuro = violeta (`#8B5CF6`) + magenta (`#EC4899`) + negro.
- Backend: **Supabase** YA CONFIGURADO (proyecto `eizvzrulpagmwaynslli`): tabla `apuntes`, bucket
  público `apuntes` con políticas por carpeta-uid (INSERT/SELECT/UPDATE/DELETE), claves en `config.js`.
- Login: email/contraseña + **Google** (OAuth, ya implementado; falta activar proveedor en Supabase).
- Pagos/donativos: **PayPal** y **Mercado Pago** (pegar enlaces en `config.js`).
- Anuncios: AdSense, no invasivos (franja fina reservada; se carga solo si hay `ca-pub-...`).
- Nombre de marca DEFINITIVO: **Valía** (antes se barajaron "Valentía"/"Apuntia").
- PWA del hub: `favicon.svg`, `site.webmanifest`, `sw.js` en la raíz; meta OG/Twitter en `index.html`.
- Deploy: `vercel.json` listo (sitio estático, sin build).

## Materias (10) y sus rutas
Definidas en `_hub/config.js` → `grupos`. Rutas relativas con espacios en %20:
- Sistemas 1.er año: Fundamentos de Programación, Matemática, PP1, Programación 1, Sistemas Operativos
- Sistemas 2.º año: Electrónica, Redes (esta abre en `Estudio Redes/index.html`, sin subcarpeta /web)
- Turismo: Inglés
- UNSA: Sistema de la Computación, Teoría de Algoritmos y Datos

## Navegación entre webs
- Cada materia tiene en su `topbar__actions` dos enlaces al hub: **Inicio** (`.topbar__home`) y
  **Entrar** (`.topbar__login` → `index.html#entrar`). El hub abre el modal de login solo al detectar
  `#entrar`/`#login` (ver `_hub/hub.js`). Ruta al hub: `../../../index.html` (Redes: `../../index.html`).
- CSS de esos botones: bloque "Navegación al hub Valía" al final de cada `css/styles.css`.
- Cada materia tiene un script inline antes de `</body>` que lee la sesión de Supabase de localStorage
  (mismo dominio, clave `sb-*-auth-token`) y, si hay sesión, cambia "Entrar" por el nombre de usuario
  y lo enlaza a `panel.html`. Así las materias reflejan el login.
- En el hub, el engranaje `#panelBtn` (visible al loguearse) navega a `panel.html`. El upload y "mis apuntes"
  viven SOLO en panel.html (antes estaban en el hub).

## Publicidad (decisión: hub + materias)
- AdSense va en el hub Y en cada materia (franja fina, no invasiva). Requiere sitio publicado + aprobación
  de Google antes de tener `ca-pub-...`. Hub ya tiene slot reservado (`#adTop`); los slots de las materias
  se agregan recién cuando haya código de editor aprobado.

## Pendientes / próximos pasos
- [x] Supabase configurado (tabla `apuntes`, bucket público con políticas, claves en `config.js`).
- [x] Marca unificada a "Valía"; PWA del hub (favicon/manifest/sw); paleta unificada en las 10 webs.
- [x] Botones Inicio/Entrar en la barra de cada materia.
- [ ] Activar proveedor Google en Supabase (la usuaria lo está haciendo; Google OAuth es gratis).
- [ ] Subir a Vercel; luego configurar Site URL / Redirect URLs y "Confirm email" en Supabase.
- [ ] Verificar login real y subida de apuntes una vez publicado.
- [x] Enlaces de PayPal y Mercado Pago pegados en `config.js`.
- [x] Logo V/check (favicon + `.logo` del navbar/footer via hub.js/panel.js).
- [x] Formulario de contacto (sección `#contacto`) con Formspree (`config.contacto.formspree`); fallback a mailto.
- [ ] AdSense: solicitar tras publicar; redactar política de privacidad; pegar `ca-pub-...` y colocar slots.
- [ ] Sistema de Computación sigue incompleta (faltan JS); recolor aplicado pero no funcional aún.
- [ ] (Ideas a futuro) progreso unificado por materia, buscador global, gamificación de rachas,
      plan "Pro" sin anuncios, panel de aprobación de apuntes.

## Reglas
- Solo datos reales; sin emojis en la interfaz.
- Toda personalización debe poder hacerse desde `_hub/config.js` sin tocar el resto.
- Mantener el diseño sobrio y profesional.
