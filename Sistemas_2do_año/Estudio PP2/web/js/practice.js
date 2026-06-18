/* ============================================================
   TRABAJOS PRÁCTICOS — PP2 (ejercicios con solución revelable)
   Basados en los TP 0, 1 y 2 de la cátedra.
   ============================================================ */
window.APP_DATA = window.APP_DATA || {};
window.APP_DATA.practica = [

  /* =============================== TP 0 =============================== */
  {
    id: "tp0", unit: "entorno", glyph: "⚙",
    title: "TP N°0 · Entorno y conceptos",
    desc: "Editores, sistemas operativos, terminal, lenguajes, servidores y XAMPP.",
    exercises: [
      { q: "<strong>1.</strong> Ventajas, desventajas y diferencias entre <b>VS Code, Sublime Text y Brackets</b>.",
        sol: "<strong>VS Code</strong>: gratis, liviano, enorme catálogo de extensiones, terminal y Git integrados → el más usado. <strong>Sublime</strong>: muy rápido y liviano, pero de pago (prueba ilimitada con aviso). <strong>Brackets</strong>: pensado para web con vista previa en vivo, pero hoy poco mantenido. Diferencia clave: VS Code es el más completo y con comunidad activa." },
      { q: "<strong>2.</strong> Características de <b>Windows, Linux y macOS</b>.",
        sol: "<strong>Windows</strong>: el más usado en escritorio, gran compatibilidad de software, pago. <strong>Linux</strong>: libre y de código abierto, muy usado en servidores, muchas distribuciones (Ubuntu, Debian). <strong>macOS</strong>: de Apple, solo en su hardware, popular en diseño/desarrollo." },
      { q: "<strong>3.</strong> ¿Qué es la <b>terminal</b> y para qué sirve?",
        sol: "Es la consola que permite dar órdenes a la computadora escribiendo <b>comandos</b> (sin mouse): crear carpetas, instalar programas, ejecutar proyectos, usar Git. Ej.: <code>cd</code>, <code>ls</code>/<code>dir</code>, <code>mkdir</code>." },
      { q: "<strong>4.</strong> ¿Qué es un <b>lenguaje de programación</b>? Dé ejemplos.",
        sol: "Conjunto de reglas para escribir instrucciones que la computadora ejecuta. Ejemplos: JavaScript, Python, Java, C, C++, C#, PHP. En la web: HTML (estructura), CSS (estilo), JavaScript (comportamiento)." },
      { q: "<strong>5 y 6.</strong> ¿Qué es un <b>servidor</b> (con ejemplos) y qué es <b>XAMPP</b>?",
        sol: "<strong>Servidor</strong>: computadora/programa que brinda servicios a clientes (ej.: entregar páginas web). Ejemplos: Apache, Nginx, Node.js. <strong>XAMPP</strong>: paquete que instala un servidor local con <b>A</b>pache + <b>M</b>ySQL/MariaDB + <b>P</b>HP + <b>P</b>erl, para probar sitios dinámicos en tu propia máquina." },
    ]
  },

  /* =============================== TP 1 =============================== */
  {
    id: "tp1", unit: "html", glyph: "&lt;/&gt;",
    title: "TP N°1 · HTML",
    desc: "Conceptos de HTML y páginas con título, imagen, listas, formulario y tabla.",
    exercises: [
      { q: "<strong>3.</strong> Escribí la <b>estructura básica</b> de un documento HTML y explicá sus etiquetas.",
        sol: "<pre>&lt;!DOCTYPE html&gt;\n&lt;html lang=\"es\"&gt;\n  &lt;head&gt;\n    &lt;meta charset=\"UTF-8\"&gt;\n    &lt;title&gt;Mi página&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;!-- contenido visible --&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</pre><code>&lt;!DOCTYPE html&gt;</code>: HTML5 · <code>&lt;html&gt;</code>: raíz · <code>&lt;head&gt;</code>: metadatos · <code>&lt;title&gt;</code>: pestaña · <code>&lt;body&gt;</code>: lo visible." },
      { q: "<strong>4.</strong> Página con un <b>título de cabecera</b>, un <b>párrafo</b> que describe una imagen y la <b>imagen</b> debajo.",
        sol: "<pre>&lt;h1&gt;Mi mascota&lt;/h1&gt;\n&lt;p&gt;Esta es una foto de mi perro jugando en el parque.&lt;/p&gt;\n&lt;img src=\"perro.jpg\" alt=\"Mi perro\" width=\"300\"&gt;</pre>" },
      { q: "<strong>5.</strong> Página con <b>dos listas</b>: una receta (ingredientes) y una lista de equipos de fútbol.",
        sol: "<pre>&lt;h2&gt;Ingredientes&lt;/h2&gt;\n&lt;ul&gt;\n  &lt;li&gt;Maicena&lt;/li&gt;\n  &lt;li&gt;Leche&lt;/li&gt;\n  &lt;li&gt;Azúcar&lt;/li&gt;\n&lt;/ul&gt;\n\n&lt;h2&gt;Equipos&lt;/h2&gt;\n&lt;ol&gt;\n  &lt;li&gt;Boca&lt;/li&gt;\n  &lt;li&gt;River&lt;/li&gt;\n  &lt;li&gt;San Lorenzo&lt;/li&gt;\n&lt;/ol&gt;</pre>Receta → <code>&lt;ul&gt;</code> (no ordenada). Equipos → <code>&lt;ol&gt;</code> o <code>&lt;ul&gt;</code>." },
      { q: "<strong>6.</strong> Página con un <b>formulario</b> (nombre, email, mensaje y botón).",
        sol: "<pre>&lt;form&gt;\n  &lt;label&gt;Nombre: &lt;input type=\"text\" name=\"nombre\"&gt;&lt;/label&gt;\n  &lt;label&gt;Email: &lt;input type=\"email\" name=\"email\"&gt;&lt;/label&gt;\n  &lt;label&gt;Mensaje: &lt;textarea name=\"msg\"&gt;&lt;/textarea&gt;&lt;/label&gt;\n  &lt;button type=\"submit\"&gt;Enviar&lt;/button&gt;\n&lt;/form&gt;</pre>" },
      { q: "<strong>7.</strong> Replicá una <b>tabla</b> simple en una página.",
        sol: "<pre>&lt;table border=\"1\"&gt;\n  &lt;tr&gt;&lt;th&gt;Producto&lt;/th&gt;&lt;th&gt;Precio&lt;/th&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;td&gt;Café&lt;/td&gt;&lt;td&gt;$500&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;td&gt;Té&lt;/td&gt;&lt;td&gt;$400&lt;/td&gt;&lt;/tr&gt;\n&lt;/table&gt;</pre>" },
    ]
  },

  /* =============================== TP 2 =============================== */
  {
    id: "tp2", unit: "css", glyph: "{ }",
    title: "TP N°2 · CSS",
    desc: "Hover en botoneras, maquetación con div/semántica, degradados, tipografías e responsive.",
    exercises: [
      { q: "<strong>2.</strong> Botonera horizontal con efecto <b>hover</b> (cambio de color al pasar el mouse).",
        sol: "<pre>&lt;nav class=\"menu\"&gt;\n  &lt;a href=\"#\"&gt;Inicio&lt;/a&gt;\n  &lt;a href=\"#\"&gt;Servicios&lt;/a&gt;\n&lt;/nav&gt;</pre><pre>.menu { display: flex; gap: 8px; }\n.menu a {\n  padding: 10px 16px; color: #fff;\n  background: #6A0888; border-radius: 8px;\n  text-decoration: none; transition: background .2s;\n}\n.menu a:hover { background: #BF00FF; }</pre>Para vertical: <code>flex-direction: column;</code>." },
      { q: "<strong>3.</strong> Maquetá dos secciones con <b>div + etiquetas semánticas</b> y una <b>CSS externa</b>.",
        sol: "HTML: <code>&lt;link rel=\"stylesheet\" href=\"estilos.css\"&gt;</code> en el head, y estructura con <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;footer&gt;</code>. En <code>estilos.css</code> definir los estilos. Usar <code>box-sizing: border-box</code> facilita la maquetación." },
      { q: "<strong>4.</strong> Agregá <b>degradado, border-radius, sombra, color de fondo y animación</b>.",
        sol: "<pre>.tarjeta {\n  background: linear-gradient(135deg, #FE2E9A, #BF00FF);\n  border-radius: 16px;\n  box-shadow: 0 10px 30px rgba(0,0,0,.25);\n  padding: 24px; color: #fff;\n  animation: aparecer .6s ease;\n}\n@keyframes aparecer {\n  from { opacity: 0; transform: translateY(12px); }\n  to   { opacity: 1; transform: translateY(0); }\n}</pre>" },
      { q: "<strong>6.</strong> Incorporá una <b>tipografía externa</b> (Google Fonts) e <b>íconos</b>.",
        sol: "En el head: <code>&lt;link href=\"https://fonts.googleapis.com/css2?family=Poppins&amp;display=swap\" rel=\"stylesheet\"&gt;</code> y luego <code>body { font-family: 'Poppins', sans-serif; }</code>. Para íconos podés usar una librería como Font Awesome o SVGs (por ejemplo, en los enlaces a redes sociales)." },
      { q: "<strong>7.</strong> Hacé el sitio <b>responsive</b> con media queries para tablet y celular.",
        sol: "<pre>/* tablet */\n@media (min-width: 600px) and (max-width: 1023px) {\n  .contenedor { grid-template-columns: 1fr 1fr; }\n}\n/* celular */\n@media (max-width: 599px) {\n  .menu { flex-direction: column; }\n  .contenedor { grid-template-columns: 1fr; }\n}</pre>" },
    ]
  },

];
