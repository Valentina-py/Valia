# Google Drive · Valia

La función recibe archivos como `multipart/form-data` y los organizará en:

`Valia/<año de la carrera>/<materia>/<tipo de material>/`

Los identificadores de las carpetas de Primer, Segundo y Tercer Año de Sistemas
Loutaif están configurados en la función.

Secretos requeridos en Supabase Edge Functions:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_DRIVE_ROOT_FOLDER_ID`

El último paso pendiente es obtener y guardar el refresh token OAuth de la cuenta administradora. No debe guardarse en el repositorio ni exponerse al navegador.
