/* ============================================================
   CONTENIDO DE ESTUDIO — PP2 · Programador Junior (desarrollo web)
   Basado en los TP 0, 1 y 2 de la cátedra y en "El gran libro de
   HTML5, CSS3 y JavaScript". Unidades: Entorno · HTML · CSS · JavaScript.
   ============================================================ */
window.APP_DATA = {
  units: [

  /* ===================================================================
     UNIDAD 1 — ENTORNO Y HERRAMIENTAS
     =================================================================== */
  {
    id: "entorno",
    glyph: "⚙",
    icon: "tool",
    title: "Entorno y herramientas",
    desc: "Editores de código, sistemas operativos, terminal, lenguajes, servidores y XAMPP.",
    tool: null,
    html: `
      <p class="lead">Antes de programar conviene conocer las <strong>herramientas</strong> del desarrollo web: con qué se escribe el código, dónde se ejecuta y cómo se prueba.</p>

      <h2>Editores de código</h2>
      <p>Un <strong>editor de código</strong> es un programa para escribir y editar código con ayudas (resaltado de sintaxis, autocompletado, extensiones).</p>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Editor</th><th>Características</th></tr></thead>
        <tbody>
          <tr><td><strong>Visual Studio Code</strong></td><td>El más usado. Gratis, liviano, miles de extensiones, terminal integrada, Git. (Recomendado)</td></tr>
          <tr><td><strong>Sublime Text</strong></td><td>Muy rápido y liviano; de pago (con prueba gratuita).</td></tr>
          <tr><td><strong>Brackets</strong></td><td>Pensado para la web, con vista previa en vivo; hoy poco mantenido.</td></tr>
        </tbody>
      </table>
      </div>

      <h2>Sistemas operativos</h2>
      <ul>
        <li><strong>Windows:</strong> el más extendido en escritorio; muy compatible con software de oficina y juegos.</li>
        <li><strong>Linux:</strong> libre y de código abierto; domina en servidores; muchas distribuciones (Ubuntu, Debian…).</li>
        <li><strong>macOS:</strong> de Apple, sobre hardware propio; popular en diseño y desarrollo.</li>
      </ul>

      <h2>La terminal</h2>
      <p>La <strong>terminal</strong> (o consola) permite dar órdenes a la computadora <em>escribiendo comandos</em>, sin usar el mouse. Se usa para crear carpetas, instalar programas, ejecutar proyectos o usar <strong>Git</strong>. Ejemplos: <code>cd</code> (cambiar de carpeta), <code>ls</code>/<code>dir</code> (listar), <code>mkdir</code> (crear carpeta).</p>

      <h2>Lenguajes de programación</h2>
      <p>Un <strong>lenguaje de programación</strong> es un conjunto de reglas para escribir instrucciones que la computadora ejecuta. Ejemplos: <strong>JavaScript, Python, Java, C, C++, C#, PHP</strong>. En la web conviven tres «lenguajes» con roles distintos: <strong>HTML</strong> (estructura), <strong>CSS</strong> (estilo) y <strong>JavaScript</strong> (comportamiento).</p>

      <h2>Servidores</h2>
      <p>Un <strong>servidor</strong> es una computadora (o programa) que <em>brinda servicios</em> a otras (los clientes): por ejemplo, entregar páginas web. Ejemplos de software servidor: <strong>Apache</strong>, <strong>Nginx</strong>, <strong>Node.js</strong>. El navegador (cliente) le pide una página y el servidor se la envía.</p>

      <h2>XAMPP</h2>
      <div class="callout def">
        <strong class="callout__tag">XAMPP</strong>
        Paquete gratuito que instala de una sola vez un entorno de servidor local: <strong>A</strong>pache (servidor web), <strong>M</strong>ariaDB/MySQL (base de datos), <strong>P</strong>HP y <strong>P</strong>erl. Sirve para <em>probar sitios dinámicos en tu propia máquina</em> antes de publicarlos.
      </div>
    `,
    quiz: [
      { q: "El editor de código gratuito y más usado actualmente es:", opts: ["Brackets", "Visual Studio Code", "Bloc de notas", "Sublime Text"], a: 1, exp: "VS Code: gratis, extensible y con terminal integrada." },
      { q: "La terminal sirve para:", opts: ["diseñar imágenes", "dar órdenes escribiendo comandos", "navegar internet", "editar videos"], a: 1, exp: "Es la consola de comandos." },
      { q: "En la web, el lenguaje que da la ESTRUCTURA es:", opts: ["CSS", "HTML", "JavaScript", "PHP"], a: 1, exp: "HTML estructura; CSS estiliza; JS da comportamiento." },
      { q: "XAMPP incluye principalmente:", opts: ["Apache, MySQL/MariaDB y PHP", "Word y Excel", "Photoshop", "Android Studio"], a: 0, exp: "Es un entorno de servidor local (Apache + BD + PHP)." },
    ],
    cards: [
      { q: "¿Qué es un editor de código?", a: "Programa para escribir código con ayudas (resaltado, autocompletado, extensiones). Ej: VS Code." },
      { q: "Los 3 lenguajes de la web", a: "HTML (estructura), CSS (estilo) y JavaScript (comportamiento)." },
      { q: "¿Qué es la terminal?", a: "La consola para dar órdenes a la PC escribiendo comandos." },
      { q: "¿Qué es un servidor?", a: "Una computadora/programa que brinda servicios a clientes (ej: entregar páginas web)." },
      { q: "¿Qué es XAMPP?", a: "Entorno de servidor local: Apache + MySQL/MariaDB + PHP. Para probar sitios dinámicos." },
    ]
  },

  /* ===================================================================
     UNIDAD 2 — HTML
     =================================================================== */
  {
    id: "html",
    glyph: "&lt;/&gt;",
    icon: "tool",
    title: "HTML — Estructura",
    desc: "Qué es HTML, etiquetas y atributos, estructura del documento, listas, tablas, formularios y semántica.",
    tool: "editor",
    html: `
      <p class="lead"><strong>HTML</strong> (HyperText Markup Language) es el <strong>lenguaje de marcado</strong> que define la <em>estructura y el contenido</em> de una página web: títulos, párrafos, imágenes, enlaces, listas, tablas, formularios…</p>

      <h2>Etiquetas y atributos</h2>
      <p>El contenido se marca con <strong>etiquetas</strong>. La mayoría vienen en par (apertura y cierre):</p>
      <pre>&lt;p&gt;Esto es un párrafo&lt;/p&gt;</pre>
      <p>Algunas son <strong>vacías</strong> (no tienen cierre), como <code>&lt;img&gt;</code> o <code>&lt;br&gt;</code>.</p>
      <p>Los <strong>atributos</strong> dan información extra y van en la etiqueta de apertura, como <code>nombre="valor"</code>:</p>
      <pre>&lt;a href="https://ejemplo.com"&gt;Ir al sitio&lt;/a&gt;
&lt;img src="foto.jpg" alt="Mi foto"&gt;</pre>

      <h2>Estructura básica de un documento</h2>
      <pre>&lt;!DOCTYPE html&gt;
&lt;html lang="es"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Mi página&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hola&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
      <ul>
        <li><code>&lt;!DOCTYPE html&gt;</code>: declara que usamos <strong>HTML5</strong> (la última versión).</li>
        <li><code>&lt;html&gt;</code>: elemento raíz.</li>
        <li><code>&lt;head&gt;</code>: <em>metadatos</em> (no se ven): charset, <code>&lt;title&gt;</code>, enlaces a CSS.</li>
        <li><code>&lt;title&gt;</code>: el texto de la <strong>pestaña</strong> del navegador.</li>
        <li><code>&lt;body&gt;</code>: <em>todo lo visible</em> de la página.</li>
      </ul>

      <h2>Etiquetas frecuentes</h2>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Etiqueta</th><th>Para qué sirve</th></tr></thead>
        <tbody>
          <tr><td><code>&lt;h1&gt;…&lt;h6&gt;</code></td><td>Títulos y subtítulos (h1 = principal).</td></tr>
          <tr><td><code>&lt;p&gt;</code></td><td>Párrafo de texto.</td></tr>
          <tr><td><code>&lt;a&gt;</code></td><td>Enlace (atributo <code>href</code>).</td></tr>
          <tr><td><code>&lt;img&gt;</code></td><td>Imagen (<code>src</code> y <code>alt</code>).</td></tr>
          <tr><td><code>&lt;div&gt;</code></td><td>Contenedor genérico de bloque (agrupa y organiza).</td></tr>
          <tr><td><code>&lt;span&gt;</code></td><td>Contenedor genérico en línea.</td></tr>
        </tbody>
      </table>
      </div>

      <h2>Listas</h2>
      <pre>&lt;ul&gt;            &lt;ol&gt;
  &lt;li&gt;Harina&lt;/li&gt;   &lt;li&gt;Boca&lt;/li&gt;
  &lt;li&gt;Azúcar&lt;/li&gt;   &lt;li&gt;River&lt;/li&gt;
&lt;/ul&gt;           &lt;/ol&gt;</pre>
      <p><code>&lt;ul&gt;</code> = lista <strong>no ordenada</strong> (viñetas); <code>&lt;ol&gt;</code> = <strong>ordenada</strong> (números). Cada ítem es un <code>&lt;li&gt;</code>.</p>

      <h2>Tablas</h2>
      <pre>&lt;table&gt;
  &lt;tr&gt;&lt;th&gt;Nombre&lt;/th&gt;&lt;th&gt;Edad&lt;/th&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;Ana&lt;/td&gt;&lt;td&gt;20&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;</pre>
      <p><code>&lt;tr&gt;</code> = fila, <code>&lt;th&gt;</code> = celda de encabezado, <code>&lt;td&gt;</code> = celda de datos.</p>

      <h2>Formularios</h2>
      <pre>&lt;form&gt;
  &lt;label&gt;Nombre: &lt;input type="text" name="nombre"&gt;&lt;/label&gt;
  &lt;label&gt;Email: &lt;input type="email" name="email"&gt;&lt;/label&gt;
  &lt;button type="submit"&gt;Enviar&lt;/button&gt;
&lt;/form&gt;</pre>
      <p>El <code>&lt;form&gt;</code> agrupa campos. <code>&lt;input&gt;</code> tiene muchos <code>type</code>: text, email, password, number, checkbox, radio, date… <code>&lt;label&gt;</code> es la etiqueta del campo.</p>

      <h2>Etiquetas semánticas</h2>
      <p>HTML5 trae etiquetas que <em>describen el significado</em> del contenido (mejor que llenar todo de <code>&lt;div&gt;</code>): <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;aside&gt;</code>, <code>&lt;footer&gt;</code>.</p>
      <div class="callout tip"><strong class="callout__tag">Probalo</strong> Copiá cualquiera de estos ejemplos en el <a href="#/tool/editor">Editor en vivo</a> y vé el resultado.</div>
    `,
    quiz: [
      { q: "¿Qué significan las siglas HTML?", opts: ["Lenguaje de estilos", "Lenguaje de marcado de hipertexto", "Lenguaje de programación", "Hoja de cálculo"], a: 1, exp: "HyperText Markup Language: marca la estructura." },
      { q: "¿Qué etiqueta declara HTML5?", opts: ["&lt;html5&gt;", "&lt;!DOCTYPE html&gt;", "&lt;meta&gt;", "&lt;version&gt;"], a: 1, exp: "<code>&lt;!DOCTYPE html&gt;</code> al inicio del documento." },
      { q: "¿Qué va dentro de &lt;head&gt;?", opts: ["El contenido visible", "Metadatos (título, charset, CSS)", "Las imágenes", "Los formularios"], a: 1, exp: "El head son metadatos; lo visible va en &lt;body&gt;." },
      { q: "La etiqueta para una lista NO ordenada es:", opts: ["&lt;ol&gt;", "&lt;ul&gt;", "&lt;li&gt;", "&lt;list&gt;"], a: 1, exp: "&lt;ul&gt; con ítems &lt;li&gt;." },
      { q: "En una tabla, una celda de DATOS es:", opts: ["&lt;tr&gt;", "&lt;th&gt;", "&lt;td&gt;", "&lt;table&gt;"], a: 2, exp: "&lt;td&gt; (dato); &lt;th&gt; es encabezado; &lt;tr&gt; es fila." },
    ],
    cards: [
      { q: "¿Qué es HTML?", a: "El lenguaje de marcado que define la estructura y el contenido de la web." },
      { q: "Estructura básica", a: "&lt;!DOCTYPE html&gt; → &lt;html&gt; → &lt;head&gt; (metadatos) + &lt;body&gt; (visible)." },
      { q: "Etiqueta vs atributo", a: "La etiqueta marca contenido (&lt;p&gt;); el atributo da info extra (href=\"...\")." },
      { q: "&lt;ul&gt; vs &lt;ol&gt;", a: "ul: lista con viñetas; ol: lista numerada. Ítems con &lt;li&gt;." },
      { q: "Tabla: tr / th / td", a: "tr = fila, th = celda de encabezado, td = celda de dato." },
      { q: "Etiquetas semánticas", a: "header, nav, main, section, article, aside, footer (describen el significado)." },
    ]
  },

  /* ===================================================================
     UNIDAD 3 — CSS
     =================================================================== */
  {
    id: "css",
    glyph: "{ }",
    icon: "tool",
    title: "CSS — Estilo",
    desc: "Selectores, box model, colores y degradados, tipografías, posicionamiento, animación y responsive.",
    tool: "editor",
    html: `
      <p class="lead"><strong>CSS</strong> (Cascading Style Sheets) define el <strong>estilo</strong> de la página: colores, tamaños, tipografías, espaciados, posiciones y animaciones. Separa el <em>diseño</em> de la <em>estructura</em> (HTML).</p>

      <h2>Cómo incluir CSS</h2>
      <ul>
        <li><strong>Externo</strong> (recomendado): un archivo <code>.css</code> vinculado en el head: <code>&lt;link rel="stylesheet" href="estilos.css"&gt;</code>.</li>
        <li><strong>Interno</strong>: dentro de <code>&lt;style&gt;…&lt;/style&gt;</code> en el head.</li>
        <li><strong>En línea</strong>: atributo <code>style="..."</code> en la etiqueta (evitarlo salvo casos puntuales).</li>
      </ul>

      <h2>Sintaxis y selectores</h2>
      <pre>selector {
  propiedad: valor;
}

h1 { color: blue; }          /* por etiqueta */
.aviso { color: red; }       /* por clase  (class="aviso") */
#cabecera { height: 80px; }  /* por id     (id="cabecera") */</pre>
      <p>Se aplica por <strong>etiqueta</strong>, por <strong>clase</strong> (<code>.</code>, reutilizable) o por <strong>id</strong> (<code>#</code>, único).</p>

      <h2>Modelo de caja (box model)</h2>
      <p>Cada elemento es una caja con 4 capas, de adentro hacia afuera:</p>
      <div class="formula-box" style="text-align:left;">contenido → <strong>padding</strong> (relleno interno) → <strong>border</strong> (borde) → <strong>margin</strong> (margen externo)</div>
      <div class="callout warn"><strong class="callout__tag">No confundir</strong> <code>padding</code> = espacio <em>dentro</em> del borde. <code>margin</code> = espacio <em>fuera</em>, separa de otros elementos.</div>
      <p>Con <code>box-sizing: border-box</code> el ancho incluye padding y borde (más fácil de maquetar).</p>

      <h2>Colores, fondos y degradados</h2>
      <pre>color: #FE2E9A;                 /* texto (hex) */
background-color: #6A0888;      /* fondo sólido */
background: linear-gradient(135deg, #7C3AED, #EC4899);  /* degradado */
border-radius: 12px;            /* esquinas redondeadas */
box-shadow: 0 8px 24px rgba(0,0,0,.2);  /* sombra */</pre>

      <h2>Tipografías</h2>
      <p>Con <code>font-family</code>, <code>font-size</code>, <code>font-weight</code>. Para una <strong>fuente externa</strong>, desde Google Fonts (un <code>&lt;link&gt;</code>) o con <code>@font-face</code>.</p>

      <h2>Posicionamiento y Flexbox</h2>
      <p><code>display</code> controla cómo se dispone un elemento (<code>block</code>, <code>inline</code>, <code>none</code>, <code>flex</code>). <strong>Flexbox</strong> alinea y distribuye en fila o columna:</p>
      <pre>.fila { display: flex; gap: 12px; justify-content: center; align-items: center; }</pre>

      <h2>Pseudoclases y animación</h2>
      <pre>.boton { transition: background .2s; }
.boton:hover { background: #BF00FF; }   /* al pasar el mouse */</pre>
      <p>Con <code>transition</code> los cambios son suaves; con <code>@keyframes</code> + <code>animation</code> se crean animaciones más complejas.</p>

      <h2>Diseño responsive (media queries)</h2>
      <p>Adaptan el diseño al tamaño de pantalla:</p>
      <pre>@media (max-width: 599px) {
  .menu { flex-direction: column; }
}
@media (min-width: 600px) and (max-width: 1023px) {
  /* estilos para tablet */
}</pre>
      <div class="callout tip"><strong class="callout__tag">Probalo</strong> Pegá HTML y CSS juntos en el <a href="#/tool/editor">Editor en vivo</a> para ver los estilos al instante.</div>
    `,
    quiz: [
      { q: "La forma recomendada de incluir CSS es:", opts: ["en línea (style=\"\")", "archivo externo con &lt;link&gt;", "dentro de &lt;body&gt;", "con JavaScript"], a: 1, exp: "CSS externo separa diseño de estructura y se reutiliza." },
      { q: "Para aplicar estilo a class=\"aviso\" el selector es:", opts: ["#aviso", ".aviso", "aviso", "*aviso"], a: 1, exp: "Las clases se seleccionan con punto: .aviso" },
      { q: "El espacio DENTRO del borde (entre borde y contenido) es:", opts: ["margin", "padding", "gap", "border"], a: 1, exp: "padding = relleno interno; margin = externo." },
      { q: "Para esquinas redondeadas se usa:", opts: ["border-style", "border-radius", "round", "corner"], a: 1, exp: "border-radius." },
      { q: "Para adaptar el diseño a distintas pantallas se usan:", opts: ["media queries", "tablas", "frames", "iframes"], a: 0, exp: "@media (...) { ... } → responsive." },
    ],
    cards: [
      { q: "¿Qué es CSS?", a: "Hojas de estilo en cascada: define colores, tamaños, tipografías, posiciones y animaciones." },
      { q: "3 formas de incluir CSS", a: "Externo (&lt;link&gt;), interno (&lt;style&gt;) y en línea (style=\"\")." },
      { q: "Selectores", a: "Etiqueta (h1), clase (.clase, reutilizable) e id (#id, único)." },
      { q: "Box model", a: "contenido → padding → border → margin." },
      { q: "padding vs margin", a: "padding: espacio interno (dentro del borde). margin: externo (separa elementos)." },
      { q: ":hover", a: "Pseudoclase: aplica estilos cuando el mouse pasa por encima." },
      { q: "Media queries", a: "@media (max-width: ...) → cambian el diseño según el tamaño de pantalla (responsive)." },
    ]
  },

  /* ===================================================================
     UNIDAD 4 — JAVASCRIPT
     =================================================================== */
  {
    id: "js",
    glyph: "JS",
    icon: "tool",
    title: "JavaScript — Comportamiento",
    desc: "Variables, tipos, operadores, condicionales, bucles, funciones y manipulación del DOM.",
    tool: "editor",
    html: `
      <p class="lead"><strong>JavaScript</strong> es el lenguaje de programación que da <strong>comportamiento</strong> e interactividad a la web: responder a clics, validar formularios, cambiar el contenido sin recargar. Se ejecuta en el <em>navegador</em>.</p>

      <h2>Dónde se escribe</h2>
      <pre>&lt;script&gt;
  console.log("¡Hola desde JS!");
&lt;/script&gt;</pre>
      <p>Dentro de <code>&lt;script&gt;</code> (al final del body) o, mejor, en un archivo externo: <code>&lt;script src="app.js"&gt;&lt;/script&gt;</code>.</p>

      <h2>Variables y tipos</h2>
      <pre>let edad = 20;          // puede cambiar
const PI = 3.14;        // constante (no cambia)
let nombre = "Ana";     // texto (string)
let activo = true;      // booleano (true/false)</pre>
      <p>Se usan <code>let</code> (variable) y <code>const</code> (constante). Tipos básicos: <strong>number</strong>, <strong>string</strong>, <strong>boolean</strong>, además de arrays y objetos.</p>

      <h2>Operadores</h2>
      <p>Aritméticos <code>+ - * / %</code>; comparación <code>=== !== &gt; &lt; &gt;= &lt;=</code>; lógicos <code>&amp;&amp;</code> (y), <code>||</code> (o), <code>!</code> (no).</p>
      <div class="callout warn"><strong class="callout__tag">Ojo</strong> <code>=</code> asigna; <code>===</code> compara (igualdad estricta). No los confundas.</div>

      <h2>Condicionales</h2>
      <pre>if (edad &gt;= 18) {
  console.log("Mayor de edad");
} else {
  console.log("Menor");
}</pre>

      <h2>Bucles</h2>
      <pre>for (let i = 0; i &lt; 5; i++) {
  console.log(i);   // 0,1,2,3,4
}

let n = 0;
while (n &lt; 3) { n++; }</pre>

      <h2>Funciones</h2>
      <pre>function saludar(nombre) {
  return "Hola, " + nombre;
}
saludar("Ana");   // "Hola, Ana"</pre>

      <h2>El DOM (interactividad)</h2>
      <p>El <strong>DOM</strong> es la representación de la página que JS puede leer y modificar. Lo más usado: seleccionar un elemento y reaccionar a un evento.</p>
      <pre>const btn = document.getElementById("btn");
btn.addEventListener("click", function () {
  document.getElementById("salida").textContent = "¡Clic!";
});</pre>
      <div class="callout tip"><strong class="callout__tag">Probalo</strong> Pegá HTML con un <code>&lt;button id="btn"&gt;</code> y este JS en el <a href="#/tool/editor">Editor en vivo</a> y tocá el botón.</div>
    `,
    quiz: [
      { q: "JavaScript se ejecuta principalmente en:", opts: ["el servidor de base de datos", "el navegador (cliente)", "la impresora", "el sistema operativo"], a: 1, exp: "Es el lenguaje del lado cliente (en el navegador)." },
      { q: "Para declarar una CONSTANTE se usa:", opts: ["let", "var", "const", "fix"], a: 2, exp: "const: su valor no cambia." },
      { q: "¿Qué operador COMPARA igualdad estricta?", opts: ["=", "==", "===", "=>"], a: 2, exp: "=== compara; = asigna." },
      { q: "Para que algo pase al hacer clic se usa:", opts: ["addEventListener('click', ...)", "console.log()", "@media", "&lt;link&gt;"], a: 0, exp: "Se escucha el evento 'click' sobre el elemento." },
      { q: "Un bucle que repite N veces es:", opts: ["if", "for", "function", "return"], a: 1, exp: "for (let i=0; i<N; i++)." },
    ],
    cards: [
      { q: "¿Qué hace JavaScript?", a: "Da comportamiento/interactividad a la web; se ejecuta en el navegador." },
      { q: "let vs const", a: "let: variable que puede cambiar. const: constante (no cambia)." },
      { q: "= vs ===", a: "= asigna un valor; === compara igualdad estricta." },
      { q: "Condicional if/else", a: "Ejecuta un bloque u otro según una condición verdadera/falsa." },
      { q: "Función", a: "Bloque reutilizable que recibe parámetros y puede devolver (return) un valor." },
      { q: "¿Qué es el DOM?", a: "La representación de la página que JS puede leer y modificar (document.getElementById, etc.)." },
      { q: "Escuchar un evento", a: "elemento.addEventListener('click', función) reacciona a la acción del usuario." },
    ]
  },

  /* ===================================================================
     UNIDAD 5 — PROYECTO INTEGRADOR
     =================================================================== */
  {
    id: "proyecto",
    glyph: "★",
    icon: "tool",
    title: "Proyecto integrador",
    desc: "Armar una landing page paso a paso combinando HTML, CSS y JavaScript.",
    tool: "editor",
    html: `
      <p class="lead">Vamos a juntar todo lo aprendido en una <strong>landing page</strong> simple. Copiá cada parte en el <a href="#/tool/editor">Editor en vivo</a> y andá viendo el resultado.</p>

      <h2>Paso 1 · La estructura (HTML)</h2>
      <p>Usamos etiquetas semánticas: <code>&lt;header&gt;</code> con el menú, <code>&lt;main&gt;</code> con el contenido y <code>&lt;footer&gt;</code>.</p>
      <pre>&lt;header&gt;
  &lt;nav class="menu"&gt;
    &lt;a href="#"&gt;Inicio&lt;/a&gt;
    &lt;a href="#"&gt;Servicios&lt;/a&gt;
    &lt;a href="#"&gt;Contacto&lt;/a&gt;
  &lt;/nav&gt;
&lt;/header&gt;

&lt;main&gt;
  &lt;section class="hero"&gt;
    &lt;h1&gt;Mi primer sitio&lt;/h1&gt;
    &lt;p&gt;Hecho con HTML, CSS y JavaScript.&lt;/p&gt;
    &lt;button id="btn"&gt;Saludar&lt;/button&gt;
  &lt;/section&gt;
&lt;/main&gt;

&lt;footer&gt;&lt;p&gt;© 2026 · Mi sitio&lt;/p&gt;&lt;/footer&gt;</pre>

      <h2>Paso 2 · El diseño (CSS)</h2>
      <p>Variables de color, Flexbox para el menú, un degradado en el hero y diseño responsive.</p>
      <pre>:root { --primario: #7C3AED; --secundario: #EC4899; }
* { box-sizing: border-box; margin: 0; font-family: system-ui, sans-serif; }

.menu { display: flex; gap: 14px; background: #14111F; padding: 14px; }
.menu a { color: #fff; text-decoration: none; }
.menu a:hover { color: var(--secundario); }

.hero {
  text-align: center; padding: 60px 20px; color: #fff;
  background: linear-gradient(135deg, var(--primario), var(--secundario));
}
.hero button {
  margin-top: 16px; padding: 10px 20px; border: 0; border-radius: 10px;
  background: #fff; color: var(--primario); font-weight: 700; cursor: pointer;
}
footer { text-align: center; padding: 18px; color: #666; }

@media (max-width: 599px) { .menu { flex-direction: column; } }</pre>

      <h2>Paso 3 · La interactividad (JavaScript)</h2>
      <pre>document.getElementById("btn").addEventListener("click", function () {
  alert("¡Hola! Gracias por visitar mi sitio 😊");
});</pre>

      <div class="callout tip"><strong class="callout__tag">Desafío</strong> Cambiá los colores con el <a href="#/tool/degradados">Generador de degradados</a>, agregá una sección más y, cuando te guste, <a href="#/unit/publicar">publicalo</a> en internet.</div>
    `,
    quiz: [
      { q: "¿Qué etiqueta semántica conviene para el menú de navegación?", opts: ["&lt;div&gt;", "&lt;nav&gt;", "&lt;menu-bar&gt;", "&lt;section&gt;"], a: 1, exp: "&lt;nav&gt; describe la navegación." },
      { q: "Para que el menú se apile en celular se usa:", opts: ["display:none", "una media query con flex-direction:column", "position:fixed", "un &lt;table&gt;"], a: 1, exp: "Media query + flex-direction:column." },
      { q: "El degradado del hero se logra con:", opts: ["color", "linear-gradient(...)", "border", "box-shadow"], a: 1, exp: "background: linear-gradient(...)." },
    ],
    cards: [
      { q: "Estructura semántica típica", a: "header (nav) + main (sections) + footer." },
      { q: "Variables CSS", a: ":root { --color: #...; } y luego var(--color)." },
      { q: "Hacerlo interactivo", a: "JS: getElementById + addEventListener('click', ...)." },
    ]
  },

  /* ===================================================================
     UNIDAD 6 — PUBLICAR TU SITIO
     =================================================================== */
  {
    id: "publicar",
    glyph: "⬆",
    icon: "tool",
    title: "Publicar tu sitio",
    desc: "Git y GitHub, y cómo subir tu web gratis con GitHub Pages, Vercel o Netlify. Herramientas útiles.",
    tool: null,
    html: `
      <p class="lead">Ya tenés tu página: ahora hay que <strong>ponerla online</strong> para compartirla. Primero versionás el código con <strong>Git/GitHub</strong> y después lo publicás en un servicio <strong>gratuito</strong>.</p>

      <h2>Git — control de versiones</h2>
      <p><strong>Git</strong> guarda el historial de cambios de tu proyecto (podés volver atrás). <strong>GitHub</strong> es la nube donde subís ese repositorio. Flujo básico en la terminal:</p>
      <pre>git init                 # inicializa el repositorio
git add .                # prepara todos los archivos
git commit -m "primer commit"   # guarda una versión
git remote add origin URL_DEL_REPO   # conecta con GitHub
git push -u origin main  # sube los cambios</pre>
      <div class="callout tip"><strong class="callout__tag">.gitignore</strong> Un archivo donde listás lo que NO querés subir (por ejemplo <code>node_modules/</code> o archivos pesados).</div>

      <h2>Crear el repositorio en GitHub</h2>
      <ol>
        <li>Entrá a <strong>github.com</strong> y creá una cuenta (gratis).</li>
        <li><strong>New repository</strong> → ponele un nombre → <em>Create</em>.</li>
        <li>Seguí los comandos que te muestra (los <code>git remote add</code> y <code>git push</code> de arriba).</li>
      </ol>

      <h2>Publicarlo gratis — 3 opciones</h2>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Servicio</th><th>Cómo</th></tr></thead>
        <tbody>
          <tr><td><strong>GitHub Pages</strong></td><td>En tu repo: <em>Settings → Pages</em> → elegí la rama <code>main</code> → guardás. Tu sitio queda en <code>usuario.github.io/repo</code>. Ideal para sitios estáticos (HTML/CSS/JS).</td></tr>
          <tr><td><strong>Vercel</strong></td><td>Entrá a <strong>vercel.com</strong>, <em>Add New → Project</em>, importá tu repo de GitHub y <em>Deploy</em>. Te da una URL <code>tusitio.vercel.app</code> y redeploya solo en cada push.</td></tr>
          <tr><td><strong>Netlify</strong></td><td>La forma más rápida: <strong>app.netlify.com/drop</strong> y <em>arrastrás la carpeta</em> del sitio. También se puede conectar al repo de GitHub.</td></tr>
        </tbody>
      </table>
      </div>
      <div class="callout"><strong class="callout__tag">¿Cuál elijo?</strong> Para empezar y solo arrastrar: <strong>Netlify Drop</strong>. Para que se actualice solo al pushear: <strong>Vercel</strong> o <strong>GitHub Pages</strong>.</div>

      <h2>Herramientas útiles</h2>
      <ul>
        <li><strong>DevTools</strong> (tecla <code>F12</code> en el navegador): inspeccionar el HTML, probar CSS en vivo y ver errores de la consola.</li>
        <li><strong>MDN Web Docs</strong> (developer.mozilla.org): la documentación de referencia de HTML, CSS y JS.</li>
        <li><strong>Can I use</strong> (caniuse.com): ver qué navegadores soportan una función.</li>
        <li><strong>Google Fonts</strong> (fonts.google.com) y <strong>Font Awesome</strong> (fontawesome.com): tipografías e íconos gratis.</li>
        <li><strong>Validador del W3C</strong> (validator.w3.org): revisar que tu HTML esté bien escrito.</li>
        <li><strong>Coolors / generadores de paletas</strong>: elegir combinaciones de colores.</li>
      </ul>
    `,
    quiz: [
      { q: "¿Para qué sirve Git?", opts: ["editar imágenes", "llevar el historial de versiones del código", "diseñar logos", "navegar internet"], a: 1, exp: "Control de versiones: guarda y permite volver atrás." },
      { q: "El comando para subir los cambios a GitHub es:", opts: ["git pull", "git push", "git status", "git clone"], a: 1, exp: "git push envía tus commits al repositorio remoto." },
      { q: "La forma más rápida de publicar arrastrando una carpeta es:", opts: ["GitHub Pages", "Netlify Drop", "XAMPP", "FTP manual"], a: 1, exp: "app.netlify.com/drop: arrastrás y listo." },
      { q: "Para inspeccionar y depurar una página en el navegador se usan:", opts: ["las DevTools (F12)", "Photoshop", "Word", "la terminal"], a: 0, exp: "Las herramientas de desarrollo (F12)." },
    ],
    cards: [
      { q: "Git vs GitHub", a: "Git: control de versiones local. GitHub: la nube donde subís el repositorio." },
      { q: "Comandos básicos de Git", a: "git init · add . · commit -m \"...\" · remote add origin URL · push." },
      { q: "GitHub Pages", a: "Settings → Pages → rama main. Publica sitios estáticos en usuario.github.io." },
      { q: "Vercel / Netlify", a: "Vercel: importás el repo y se redeploya al pushear. Netlify Drop: arrastrás la carpeta." },
      { q: "DevTools (F12)", a: "Inspeccionar HTML, probar CSS en vivo y ver errores de consola." },
      { q: ".gitignore", a: "Lista de archivos/carpetas que NO se suben al repositorio." },
    ]
  }

  ]
};
