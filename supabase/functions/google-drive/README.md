# Google Drive · Valia

La función recibe archivos como `multipart/form-data` y los organizará en:

`Valia/<materia>/<tipo de material>/`

Secretos requeridos en Supabase Edge Functions:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_DRIVE_ROOT_FOLDER_ID`

El último paso pendiente es obtener y guardar el refresh token OAuth de la cuenta administradora. No debe guardarse en el repositorio ni exponerse al navegador.
