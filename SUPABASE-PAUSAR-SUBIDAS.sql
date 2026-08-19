-- Valía · pausa temporal de nuevas subidas
-- Ejecutar en Supabase > SQL Editor.
-- No elimina cuentas, filas ni archivos existentes.

drop policy if exists "subir apuntes" on public.apuntes;

-- El nombre de la política del bucket puede variar. Esta instrucción elimina
-- las políticas INSERT del bucket "apuntes" creadas con los nombres habituales.
drop policy if exists "subir apuntes" on storage.objects;
drop policy if exists "Usuarios suben sus apuntes" on storage.objects;
drop policy if exists "authenticated uploads" on storage.objects;

-- Comprobación manual recomendada:
-- Storage > Policies > apuntes no debe mostrar ninguna política INSERT activa.
