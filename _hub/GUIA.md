# Guía rápida de Valía

La web está publicada en **https://valia2026.vercel.app/**. La configuración general vive en
`_hub/config.js`.

## Estado actual de las subidas

Las nuevas subidas de apuntes están **pausadas temporalmente**.

- Interfaz: `funciones.permitirSubidas` está en `false`.
- Panel: oculta el formulario y bloquea cualquier intento de subida desde JavaScript.
- Apuntes existentes: continúan visibles y sus propietarios pueden eliminarlos.

### Bloqueo completo en Supabase

Para que la pausa no dependa solo de la interfaz, ejecutá en **Supabase → SQL Editor** el archivo
`SUPABASE-PAUSAR-SUBIDAS.sql`. Este elimina la política de inserción de la tabla y la política de
subida del bucket, sin borrar archivos ni cuentas.

Cuando decidas reactivar la función, será necesario volver a crear ambas políticas y cambiar
`funciones.permitirSubidas` a `true`.

## Inicio de sesión

Supabase ya está configurado. El acceso por correo funciona con el proyecto indicado en
`_hub/config.js`. Para Google, activá el proveedor en **Supabase → Authentication → Providers → Google**
y comprobá que la URL publicada esté incluida en las direcciones autorizadas.

## Donativos

Los enlaces de PayPal y Mercado Pago están configurados. En la portada se muestran únicamente al
abrir el desplegable discreto **“Colaborar con Valía”** del pie de página. Si un enlace queda vacío en
`config.js`, su botón no aparece.

## Anuncios

El identificador de AdSense está configurado. Los anuncios deben mantenerse en espacios no invasivos
y revisarse en la versión publicada.

## Publicación

El proyecto usa Vercel y no necesita proceso de compilación. Después de cada despliegue, comprobá:

1. Portada y doce materias.
2. Inicio y cierre de sesión.
3. Que el panel no muestre ni permita subir archivos.
4. Que “Colaborar con Valía” permanezca cerrado por defecto.
5. Tema claro/oscuro y vista móvil.
