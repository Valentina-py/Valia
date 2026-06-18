/* =======================================================================
   CONFIG · Edita SOLO este archivo para personalizar tu hub de estudio.
   No necesitas tocar nada más.
   ======================================================================= */

window.HUB_CONFIG = {

  /* --- Identidad de la web ------------------------------------------- */
  marca: {
    nombre: "Valía",                    // ← cambia por el nombre de tu web
    lema: "Todas tus materias, un solo lugar para dominarlas.",
    descripcion: "Plataforma de estudio con apuntes, prácticas y seguimiento de tu progreso.",
  },

  /* --- Supabase (login + subir apuntes) ------------------------------
     Lee la guía SUPABASE.md para sacar estos 2 datos (son gratis).
     Si los dejas vacíos, la web funciona en MODO DEMO (login y apuntes
     simulados en tu navegador, sin guardar de verdad).               */
  supabase: {
    url: "https://eizvzrulpagmwaynslli.supabase.co",        // ej: https://xxxxxxxx.supabase.co
    anonKey: "sb_publishable_JFS20xu8z3OH5KiWMFMUIA_Y1F4BDmZ",    // la "anon public key"
    bucket: "apuntes",
  },

  /* --- Donativos / pagos --------------------------------------------
     Pega tus enlaces. Si dejas uno vacío, ese botón no aparece.      */
  pagos: {
    paypal: "https://www.paypal.com/donate/?hosted_button_id=X5NXQ97CKGL38",        // ej: https://www.paypal.com/donate/?hosted_button_id=XXXX
    mercadopago: "https://link.mercadopago.com.ar/valia2026",   // ej: https://link.mercadopago.com.ar/tuusuario
  },

  /* --- Anuncios (Google AdSense) ------------------------------------
     Cuando tengas tu cuenta de AdSense, pega tu "client" (ca-pub-...).
     Mientras esté vacío, se muestran espacios de anuncio discretos
     y NO se carga ningún script de terceros.                          */
  ads: {
    // Ya colocado también en el <head> de todas las páginas (método recomendado por Google).
    adsenseClient: "ca-pub-2566809183716381",   // ej: ca-pub-1234567890123456
  },

  /* --- Contacto (formulario) ----------------------------------------
     Crea un formulario GRATIS en https://formspree.io, copia tu
     "endpoint" (se ve como https://formspree.io/f/XXXXXXXX) y pégalo
     en "formspree". Mientras esté vacío, el botón abre tu correo.     */
  contacto: {
    formspree: "https://formspree.io/f/meewwwdb",                          // ej: https://formspree.io/f/xxxxxxxx
    email: "nvalentinabaudino@gmail.com",
  },

  /* --- Materias (tus webs ya creadas) -------------------------------
     "ruta" es relativa a ESTA carpeta (Clases). Los espacios van
     codificados como %20. icono = emoji o símbolo.                    */
  grupos: [
    {
      titulo: "Sistemas · 1.er año",
      materias: [
        { nombre: "Fundamentos de Programación", icono: "code",     ruta: "Sistemas_1er_a%C3%B1o/Estudio%20Fun%20program/web/index.html", color: "#10E0A0" },
        { nombre: "Matemática",                  icono: "sigma",    ruta: "Sistemas_1er_a%C3%B1o/Estudio%20Matematica/web/index.html",   color: "#22D3EE" },
        { nombre: "PP1",                         icono: "briefcase",ruta: "Sistemas_1er_a%C3%B1o/Estudio%20PP1/web/index.html",          color: "#A78BFA" },
        { nombre: "Programación 1",              icono: "terminal", ruta: "Sistemas_1er_a%C3%B1o/Estudio%20Programacion%201/web/index.html", color: "#34D399" },
        { nombre: "Sistemas Operativos",         icono: "monitor",  ruta: "Sistemas_1er_a%C3%B1o/Estudio%20SisOp/web/index.html",        color: "#F472B6" },
      ],
    },
    {
      titulo: "Sistemas · 2.º año",
      materias: [
        { nombre: "Electrónica", icono: "zap",   ruta: "Sistemas_2do_a%C3%B1o/Electronica/web/index.html",  color: "#FBBF24" },
        { nombre: "Redes",       icono: "globe", ruta: "Sistemas_2do_a%C3%B1o/Estudio%20Redes/index.html",   color: "#38BDF8" },
        { nombre: "Estadística", icono: "chart", ruta: "Sistemas_2do_a%C3%B1o/Estudio%20Estadistica/web/index.html", color: "#2DD4BF" },
        { nombre: "PP2",         icono: "code",  ruta: "Sistemas_2do_a%C3%B1o/Estudio%20PP2/web/index.html",         color: "#F472B6" },
      ],
    },
    {
      titulo: "Turismo",
      materias: [
        { nombre: "Inglés", icono: "languages", ruta: "Turismo/Estudio%20Ingles/web/index.html", color: "#FB7185" },
      ],
    },
    {
      titulo: "UNSA",
      materias: [
        { nombre: "Sistema de la Computación", icono: "cpu",   ruta: "Unsa/Sistema%20de%20la%20computacion/web/index.html", color: "#60A5FA" },
        { nombre: "Teoría de Algoritmos y Datos", icono: "chart", ruta: "Unsa/Teoria%20Algos%20y%20data/web/index.html",      color: "#C084FC" },
      ],
    },
  ],
};
