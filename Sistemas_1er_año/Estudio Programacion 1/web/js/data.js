/* ============================================================
   CONTENIDO DE ESTUDIO — Programación 1 (Lenguaje C)
   Basado en los apuntes de la cátedra: "De PSeInt a C",
   Tipos simples y enumerados (TP1), Vectores y Cadenas (TP2)
   y Funciones/Módulos (TP3). 1er año.
   ============================================================ */
(function () {
  // Helper: bloque de código C (escapa HTML; app.js lo resalta).
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const C = (src, cap) => `<pre class="code">${esc(src.replace(/^\n/, "").replace(/\s+$/, ""))}</pre>${cap ? `<div class="code-cap">${cap}</div>` : ""}`;

  window.APP_DATA = {
    units: [

      /* ===================================================================
         UNIDAD 1 — DE PSeInt A C / ESTRUCTURA DE UN PROGRAMA
         =================================================================== */
      {
        id: "intro",
        glyph: "{}",
        title: "De PSeInt a C",
        desc: "Estructura de un programa, librerías, main(), printf/scanf y entrada/salida.",
        tool: "consola",
        html: `
        <p class="lead">El lenguaje <strong>C</strong> es un lenguaje de programación de propósito general. En esta materia damos el salto desde los <em>diagramas de PSeInt</em> hacia un programa real en C, que se <strong>compila</strong> y se <strong>ejecuta</strong>.</p>

        <div class="callout def">
          <strong class="callout__tag">Idea clave</strong>
          Lo que en PSeInt era <code>Escribir</code> / <code>Leer</code>, en C se convierte en <code>printf</code> / <code>scanf</code>. La lógica (decisiones y repeticiones) es la misma; cambia la <strong>sintaxis</strong>.
        </div>

        <h2>1. Estructura general de un programa en C</h2>
        <p>Todo programa en C tiene, como mínimo, la inclusión de librerías y la función <code>main()</code>:</p>
        ${C(`/* Comentario de
   varias líneas */
// Comentario de una sola línea
#include <stdio.h>     // inclusión de librerías (directiva)

int main() {
    int x;             // declaración de variables locales
    printf("Ingrese un nro entero:\\n");
    scanf("%i", &x);   // leer en la variable x
    return 0;          // fin correcto del programa
}`, "Estructura mínima de un programa en C.")}

        <div class="tbl-wrap">
        <table class="tbl tbl--left">
          <thead><tr><th>Parte</th><th>¿Qué es?</th></tr></thead>
          <tbody>
            <tr><td><code>#include &lt;stdio.h&gt;</code></td><td><strong>Directiva</strong>: le indica al compilador que incluya la librería <em>standard input/output</em> (allí viven <code>printf</code> y <code>scanf</code>). Los archivos <code>.h</code> se llaman <strong>archivos de cabecera</strong>.</td></tr>
            <tr><td><code>int main()</code></td><td>Función principal. Todo programa C empieza a ejecutarse por <code>main()</code>. Debe existir <strong>una</strong>.</td></tr>
            <tr><td><code>{ ... }</code></td><td>Las <strong>llaves</strong> delimitan el cuerpo (bloque) de la función.</td></tr>
            <tr><td><code>return 0;</code></td><td>Devuelve 0 al sistema operativo: el programa terminó <strong>correctamente</strong>.</td></tr>
            <tr><td><code>;</code></td><td>Cada instrucción (sentencia) termina con <strong>punto y coma</strong>.</td></tr>
          </tbody>
        </table>
        </div>

        <h2>2. Salida con <code>printf</code></h2>
        <p><code>printf</code> ("print formatted") muestra texto y valores en pantalla. Dentro de las comillas pueden ir <strong>especificadores de formato</strong> (<code>%i</code>, <code>%f</code>, <code>%c</code>…) y <strong>secuencias de escape</strong> (<code>\\n</code>, <code>\\t</code>).</p>
        ${C(`printf("Hola mundo\\n");          // \\n = salto de línea
printf("La suma es %i\\n", 7);    // %i se reemplaza por 7
printf("%i + %i = %i\\n", 2, 3, 5);`, 'Salida: "Hola mundo", luego "La suma es 7", luego "2 + 3 = 5".')}

        <h2>3. Entrada con <code>scanf</code></h2>
        <p><code>scanf</code> lee datos del teclado y los guarda en variables. <strong>Atención:</strong> hay que poner el operador <code>&amp;</code> (ampersand) delante de la variable, porque <code>scanf</code> necesita la <em>dirección</em> donde guardar el dato.</p>
        ${C(`int edad;
printf("Ingrese su edad: ");
scanf("%i", &edad);   // el & es OBLIGATORIO en variables simples
printf("El año que viene tendrá %i\\n", edad + 1);`)}
        <div class="callout warn">
          <strong class="callout__tag">Error típico</strong>
          Olvidar el <code>&amp;</code> en <code>scanf("%i", &amp;edad)</code> es uno de los errores más comunes. Sin él, el programa puede romperse al ejecutarse.
        </div>

        <h2>4. Secuencias de escape más usadas</h2>
        <div class="tbl-wrap">
        <table class="tbl">
          <thead><tr><th>Secuencia</th><th>Significado</th></tr></thead>
          <tbody>
            <tr><td><code>\\n</code></td><td>Salto de línea (enter)</td></tr>
            <tr><td><code>\\t</code></td><td>Tabulación</td></tr>
            <tr><td><code>\\"</code></td><td>Comilla doble</td></tr>
            <tr><td><code>\\\\</code></td><td>Barra invertida</td></tr>
            <tr><td><code>\\0</code></td><td>Carácter nulo (fin de cadena)</td></tr>
          </tbody>
        </table>
        </div>

        <h2>5. Etapas para crear un programa</h2>
        <ol>
          <li><strong>Editar</strong>: escribir el código fuente (<code>.c</code>) en un IDE como Dev-C++.</li>
          <li><strong>Compilar</strong>: traducir el código a lenguaje de máquina. El compilador avisa los <em>errores de sintaxis</em>.</li>
          <li><strong>Ejecutar</strong>: correr el programa ya compilado.</li>
        </ol>
        <div class="callout tip">
          <strong class="callout__tag">Probalo vos</strong>
          Usá la <a href="#/tool/consola">Consola de C interactiva</a> para escribir y ejecutar programas directamente en esta página, sin instalar nada.
        </div>
        `,
        quiz: [
          { q: "¿Por qué función empieza siempre a ejecutarse un programa en C?", opts: ["Por la primera que aparezca", "Por <code>main()</code>", "Por <code>printf()</code>", "Por <code>#include</code>"], a: 1, exp: "Todo programa C arranca por <code>main()</code>." },
          { q: "¿Qué hace <code>#include &lt;stdio.h&gt;</code>?", opts: ["Define la función main", "Incluye la librería de entrada/salida estándar", "Imprime en pantalla", "Declara variables"], a: 1, exp: "Incluye <code>stdio.h</code>, donde están <code>printf</code> y <code>scanf</code>." },
          { q: "¿Qué símbolo necesita <code>scanf</code> antes de una variable simple?", opts: ["<code>*</code>", "<code>%</code>", "<code>&amp;</code>", "<code>#</code>"], a: 2, exp: "El <code>&amp;</code> indica la dirección de memoria donde guardar el dato." },
          { q: "¿Con qué termina cada sentencia en C?", opts: ["Con un punto", "Con punto y coma <code>;</code>", "Con una llave", "Con enter"], a: 1, exp: "Cada instrucción termina con <code>;</code>." },
          { q: "¿Qué imprime <code>printf(\"%i\", 2+3);</code>?", opts: ["<code>%i</code>", "<code>2+3</code>", "<code>5</code>", "Nada"], a: 2, exp: "Calcula 2+3 y reemplaza <code>%i</code> por 5." },
          { q: "La secuencia <code>\\n</code> sirve para…", opts: ["Tabular", "Saltar de línea", "Imprimir una barra", "Terminar el programa"], a: 1, exp: "<code>\\n</code> es el salto de línea." },
          { q: "¿Qué significa <code>return 0;</code> al final de main?", opts: ["Que hubo un error", "Que el programa terminó correctamente", "Que devuelve 0 por pantalla", "Que reinicia el programa"], a: 1, exp: "Devuelve 0 al sistema: terminó sin errores." },
        ],
        cards: [
          { q: "¿Qué es una <strong>directiva</strong> <code>#include</code>?", a: "Una instrucción al compilador para incluir una librería (archivo de cabecera <code>.h</code>) antes de compilar." },
          { q: "<code>printf</code> vs <code>scanf</code>", a: "<code>printf</code> <strong>muestra</strong> datos en pantalla; <code>scanf</code> <strong>lee</strong> datos del teclado." },
          { q: "¿Qué hace el <code>&amp;</code> en <code>scanf(\"%i\", &amp;x)</code>?", a: "Pasa la <strong>dirección</strong> de la variable <code>x</code>, para que scanf sepa dónde guardar el valor leído." },
          { q: "Equivalencias PSeInt → C", a: "<code>Escribir</code> → <code>printf</code> · <code>Leer</code> → <code>scanf</code> · <code>Definir</code> → declaración de tipo." },
          { q: "¿Qué es <code>\\n</code>?", a: "Una secuencia de escape: significa salto de línea." },
          { q: "Las 3 etapas para obtener un programa", a: "Editar (escribir el <code>.c</code>) → Compilar (traducir y detectar errores) → Ejecutar." },
        ],
      },

      /* ===================================================================
         UNIDAD 2 — TIPOS DE DATOS SIMPLES Y ENUMERADOS
         =================================================================== */
      {
        id: "tipos",
        glyph: "int",
        title: "Tipos de datos simples y enumerados",
        desc: "int, float, double, char, modificadores, declaración de variables y enum.",
        tool: "tipos",
        html: `
        <p class="lead">Una <strong>variable</strong> es una zona de memoria, con un <em>nombre</em>, que guarda un valor que puede cambiar durante la ejecución. En C, <strong>toda variable debe declararse</strong> indicando su <em>tipo</em> antes de usarla.</p>

        <div class="callout def">
          <strong class="callout__tag">Sintaxis de declaración</strong>
          <code>tipo nombre_de_variable;</code> &nbsp; Por ejemplo: <code>int edad;</code>
        </div>

        <h2>1. Tipos de datos simples</h2>
        <p>Los tipos básicos se dividen en <strong>enteros</strong>, <strong>reales</strong> y <strong>carácter</strong>. Cada uno ocupa una cantidad de bytes y tiene un rango de valores.</p>
        <div class="tbl-wrap">
        <table class="tbl tbl--left">
          <thead><tr><th>Tipo</th><th>Guarda</th><th>Formato (E/S)</th><th>Bytes</th><th>Rango aprox.</th></tr></thead>
          <tbody>
            <tr><td><code>int</code></td><td>Enteros</td><td><code>%i</code> / <code>%d</code></td><td>4</td><td>−2.147.483.648 a 2.147.483.647</td></tr>
            <tr><td><code>short int</code></td><td>Enteros chicos</td><td><code>%d</code></td><td>2</td><td>−32.768 a 32.767</td></tr>
            <tr><td><code>long int</code></td><td>Enteros grandes</td><td><code>%ld</code></td><td>4</td><td>≈ ±2.100 millones</td></tr>
            <tr><td><code>unsigned int</code></td><td>Enteros sin signo</td><td><code>%u</code></td><td>4</td><td>0 a 4.294.967.295</td></tr>
            <tr><td><code>float</code></td><td>Reales</td><td><code>%f</code></td><td>4</td><td>≈ 3,4·10⁻³⁸ a 3,4·10³⁸</td></tr>
            <tr><td><code>double</code></td><td>Reales (más precisión)</td><td><code>%lf</code></td><td>8</td><td>≈ 1,7·10⁻³⁰⁸ a 1,7·10³⁰⁸</td></tr>
            <tr><td><code>char</code></td><td>Un carácter</td><td><code>%c</code> / <code>%d</code></td><td>1</td><td>−128 a 127</td></tr>
            <tr><td><code>unsigned char</code></td><td>Carácter sin signo</td><td><code>%c</code> / <code>%d</code></td><td>1</td><td>0 a 255</td></tr>
          </tbody>
        </table>
        </div>

        <h2>2. Declaración de variables</h2>
        ${C(`int entero1;
short entero2;
long entero3;
unsigned int natural1;
float real1;
double real2;
char caracter1;
int a, b, c;       // varias del mismo tipo
int x = 10;        // declarar e inicializar a la vez`)}
        <div class="callout warn">
          <strong class="callout__tag">¡Importante!</strong>
          Internamente, los <strong>caracteres se almacenan como números</strong> (código ASCII). La letra <code>'A'</code> es el número <strong>65</strong>, la <code>'B'</code> el <strong>66</strong>, etc. Mirá la <a href="#/tool/ascii">Tabla ASCII interactiva</a>.
        </div>
        ${C(`char letra = 'A';
printf("%c\\n", letra);   // muestra: A
printf("%d\\n", letra);   // muestra: 65  (su código ASCII)`)}

        <h2>3. ¿Qué formato uso?</h2>
        <p>El especificador de <code>printf</code>/<code>scanf</code> debe coincidir con el tipo de la variable:</p>
        <ul>
          <li><code>int</code> → <code>%i</code> o <code>%d</code></li>
          <li><code>unsigned</code> → <code>%u</code></li>
          <li><code>float</code> / <code>double</code> → <code>%f</code> (podés fijar decimales: <code>%.2f</code>)</li>
          <li><code>char</code> → <code>%c</code> (o <code>%d</code> para ver su número)</li>
        </ul>

        <h2>4. Tipos de datos enumerados (<code>enum</code>)</h2>
        <p>Un <strong>enumerado</strong> es un grupo de constantes con nombre. Internamente toman valores <strong>0, 1, 2, …, N−1</strong> (salvo que asignes otros).</p>
        ${C(`enum nombre { constante1, constante2, ..., constanteN } variable;

// Ejemplo:
enum COLORES { NEGRO, AZUL, VERDE, ROJO, MORADO, AMARILLO, BLANCO } color;
printf("%d %d", AZUL, MORADO);   // muestra: 1 4`, "NEGRO=0, AZUL=1, VERDE=2, ROJO=3, MORADO=4…")}
        <p>Podés forzar el valor inicial; los siguientes siguen contando:</p>
        ${C(`enum meses { ene = 1, feb, mar, abr, may, jun,
              jul, ago, sep, oct, nov, dic };
// ene=1, feb=2, mar=3, ... dic=12`)}
        ${C(`enum EstadoSemaforo { ROJO, AMARILLO, VERDE };
int main() {
    enum EstadoSemaforo semaforo;
    semaforo = ROJO;       // inicia en ROJO (0)
    semaforo = VERDE;      // cambia a VERDE (2)
    printf("Estado final: %d\\n", semaforo);   // 2
    return 0;
}`, "Los enumerados hacen el código más legible que usar 0, 1, 2 sueltos.")}
        <div class="callout tip">
          <strong class="callout__tag">Probalo vos</strong>
          Abrí el <a href="#/tool/tipos">Explorador de tipos</a>: escribí un valor y mirá qué tipos pueden contenerlo, cuántos bytes ocupa y qué formato usar.
        </div>
        `,
        quiz: [
          { q: "¿Cuántos bytes ocupa típicamente un <code>int</code>?", opts: ["1", "2", "4", "8"], a: 2, exp: "Un <code>int</code> ocupa 4 bytes." },
          { q: "¿Qué formato se usa para imprimir un <code>float</code>?", opts: ["<code>%i</code>", "<code>%c</code>", "<code>%f</code>", "<code>%s</code>"], a: 2, exp: "Los reales usan <code>%f</code>." },
          { q: "Internamente, ¿cómo se almacena el carácter <code>'A'</code>?", opts: ["Como el texto A", "Como el número 65", "Como 1", "No se puede almacenar"], a: 1, exp: "Como su código ASCII: 65." },
          { q: "En <code>enum dias { LUN, MAR, MIE };</code>, ¿cuánto vale <code>MIE</code>?", opts: ["1", "2", "3", "Depende"], a: 1, exp: "Empiezan en 0: LUN=0, MAR=1, MIE=2." },
          { q: "¿Qué tipo usarías para guardar 0 a 4.000 millones sin signo?", opts: ["<code>short</code>", "<code>char</code>", "<code>unsigned int</code>", "<code>float</code>"], a: 2, exp: "<code>unsigned int</code> llega hasta 4.294.967.295." },
          { q: "En <code>enum meses { ene=1, feb, mar };</code>, ¿cuánto vale <code>mar</code>?", opts: ["1", "2", "3", "0"], a: 2, exp: "ene=1, feb=2, mar=3 (sigue contando desde el valor forzado)." },
          { q: "¿Cuál de estas declaraciones es válida?", opts: ["<code>int 2x;</code>", "<code>float x = 3.5;</code>", "<code>char = 'a';</code>", "<code>int x</code> (sin ;)"], a: 1, exp: "Un identificador no puede empezar con número y toda declaración lleva nombre y <code>;</code>." },
          { q: "Para imprimir el código numérico de un <code>char c</code>:", opts: ["<code>printf(\"%c\", c)</code>", "<code>printf(\"%d\", c)</code>", "<code>printf(\"%f\", c)</code>", "<code>printf(\"%s\", c)</code>"], a: 1, exp: "<code>%d</code> muestra el número (ASCII); <code>%c</code> muestra el carácter." },
        ],
        cards: [
          { q: "¿Qué es una variable?", a: "Una zona de memoria con nombre y tipo, cuyo valor puede cambiar durante la ejecución." },
          { q: "Bytes de <code>int</code>, <code>float</code>, <code>double</code>, <code>char</code>", a: "<code>int</code>=4, <code>float</code>=4, <code>double</code>=8, <code>char</code>=1 byte." },
          { q: "¿Cómo se guarda un <code>char</code> internamente?", a: "Como un número entero: su <strong>código ASCII</strong>. <code>'A'</code>=65, <code>'a'</code>=97, <code>'0'</code>=48." },
          { q: "Formatos: int, float, char, unsigned", a: "<code>int</code>→<code>%i</code>/<code>%d</code>, <code>float</code>→<code>%f</code>, <code>char</code>→<code>%c</code>, <code>unsigned</code>→<code>%u</code>." },
          { q: "¿Qué es un <code>enum</code>?", a: "Un tipo enumerado: un conjunto de constantes con nombre que valen 0, 1, 2, … (salvo que asignes otros)." },
          { q: "<code>enum sem { ROJO, VERDE };</code> → ¿valores?", a: "ROJO = 0, VERDE = 1. Hacen el código más legible que usar números sueltos." },
        ],
      },

      /* ===================================================================
         UNIDAD 3 — ESTRUCTURAS DE CONTROL
         =================================================================== */
      {
        id: "control",
        glyph: "if",
        title: "Estructuras de control",
        desc: "Secuencia, decisión (if/else, switch) y repetición (for, while, do-while).",
        tool: "pseint",
        html: `
        <p class="lead">Las <strong>estructuras de control</strong> definen el orden en que se ejecutan las instrucciones. Hay tres tipos: <strong>secuencial</strong>, <strong>de decisión</strong> y <strong>repetitiva</strong>.</p>

        <h2>1. Operadores</h2>
        <div class="tbl-wrap">
        <table class="tbl tbl--left">
          <thead><tr><th>Tipo</th><th>Operadores</th></tr></thead>
          <tbody>
            <tr><td>Aritméticos</td><td><code>+</code> <code>-</code> <code>*</code> <code>/</code> <code>%</code> (resto / módulo)</td></tr>
            <tr><td>Relacionales</td><td><code>&lt;</code> <code>&gt;</code> <code>&lt;=</code> <code>&gt;=</code> <code>==</code> (igual) <code>!=</code> (distinto)</td></tr>
            <tr><td>Lógicos</td><td><code>&amp;&amp;</code> (y) <code>||</code> (o) <code>!</code> (no)</td></tr>
          </tbody>
        </table>
        </div>
        <div class="callout warn">
          <strong class="callout__tag">¡Ojo!</strong>
          <code>=</code> es <strong>asignación</strong> (guarda un valor); <code>==</code> es <strong>comparación</strong>. Confundirlos es un error clásico: <code>if (x = 5)</code> asigna en vez de comparar.
        </div>
        <p>Con enteros, <code>/</code> es <strong>división entera</strong> (descarta los decimales) y <code>%</code> da el <strong>resto</strong>:</p>
        ${C(`printf("%i", 7 / 2);   // 3  (división entera)
printf("%i", 7 % 2);   // 1  (resto)`)}

        <h2>2. Decisión simple y doble: <code>if</code> / <code>else</code></h2>
        ${C(`// Decisión simple
if (x > 0) {
    printf("x es positivo\\n");
}

// Decisión doble
if (x > 0) {
    printf("x > 0\\n");
} else {
    printf("x <= 0\\n");
}`, "PSeInt: Si (x>0) Entonces … Sino … FinSi")}

        <h3>Decisión múltiple con <code>else if</code></h3>
        ${C(`if (nota >= 90)      printf("Excelente");
else if (nota >= 80) printf("Muy bueno");
else if (nota >= 70) printf("Bueno");
else if (nota >= 60) printf("Regular");
else                 printf("Insuficiente");`)}

        <h2>3. Decisión múltiple: <code>switch</code></h2>
        <p>Útil cuando comparamos una variable contra <strong>valores constantes</strong>. No olvides el <code>break</code> en cada caso.</p>
        ${C(`int i;
switch (i) {
    case 1:
        printf("i = 1\\n");
        break;
    case 2:
        printf("i = 2\\n");
        break;
    case 3:
        printf("i = 3\\n");
        break;
    default:
        printf("i > 3\\n");
}`, "Sin break, la ejecución 'cae' al siguiente case.")}

        <h2>4. Repetición con contador: <code>for</code></h2>
        <p>Repite un bloque <strong>una cantidad fija de veces</strong>. Equivale al <em>Para … FinPara</em> de PSeInt.</p>
        ${C(`int i, suma = 0, num;
for (i = 1; i <= 5; i++) {
    printf("Ingrese numero: ");
    scanf("%i", &num);
    suma = suma + num;
}`, "for (inicio ; condición ; incremento). i++ es lo mismo que i = i + 1.")}

        <h2>5. Repetición condicional: <code>while</code></h2>
        <p>Repite <strong>mientras</strong> la condición sea verdadera. El ciclo <em>puede no ejecutarse nunca</em> si la condición empieza siendo falsa.</p>
        ${C(`while (n > 0) {
    digito = n % 10;     // último dígito
    n = n / 10;          // saco ese dígito
    suma = suma + digito;
}`, "Patrón clásico para recorrer los dígitos de un número.")}

        <h3><code>do-while</code>: se ejecuta al menos una vez</h3>
        ${C(`do {
    printf("Ingrese un nro positivo: ");
    scanf("%i", &n);
} while (n <= 0);   // repite hasta que ingrese uno válido`)}

        <div class="callout tip">
          <strong class="callout__tag">Probalo vos</strong>
          Compará lado a lado el diagrama de PSeInt y su código en C con la herramienta <a href="#/tool/pseint">De PSeInt a C</a>, y ejecutá tus ciclos en la <a href="#/tool/consola">Consola de C</a>.
        </div>
        `,
        quiz: [
          { q: "¿Cuál es la diferencia entre <code>=</code> y <code>==</code>?", opts: ["Son iguales", "<code>=</code> asigna, <code>==</code> compara", "<code>=</code> compara, <code>==</code> asigna", "<code>==</code> no existe"], a: 1, exp: "<code>=</code> guarda un valor; <code>==</code> compara igualdad." },
          { q: "¿Cuánto vale <code>7 % 2</code>?", opts: ["3", "1", "3.5", "0"], a: 1, exp: "<code>%</code> es el resto: 7 = 2·3 + 1." },
          { q: "En un <code>switch</code>, ¿qué pasa si olvido el <code>break</code>?", opts: ["Error de compilación", "Se ejecuta solo ese case", "La ejecución sigue al siguiente case", "No pasa nada"], a: 2, exp: "Sin break, 'cae' (fall-through) al siguiente case." },
          { q: "¿Qué estructura conviene para repetir una cantidad <strong>fija</strong> de veces?", opts: ["<code>while</code>", "<code>for</code>", "<code>if</code>", "<code>switch</code>"], a: 1, exp: "El <code>for</code> usa un contador: cantidad conocida de repeticiones." },
          { q: "¿Cuál ciclo se ejecuta <strong>al menos una vez</strong> siempre?", opts: ["<code>for</code>", "<code>while</code>", "<code>do-while</code>", "<code>if</code>"], a: 2, exp: "El <code>do-while</code> evalúa la condición al final." },
          { q: "<code>i++</code> es equivalente a…", opts: ["<code>i = i - 1</code>", "<code>i = i + 1</code>", "<code>i = i * 2</code>", "<code>i == i + 1</code>"], a: 1, exp: "Incrementa i en 1." },
          { q: "¿Qué imprime <code>for(i=0;i&lt;3;i++) printf(\"%i\",i);</code>?", opts: ["<code>123</code>", "<code>012</code>", "<code>0123</code>", "<code>111</code>"], a: 1, exp: "i toma 0, 1, 2 (se corta cuando i llega a 3)." },
          { q: "El operador lógico <strong>Y</strong> en C se escribe…", opts: ["<code>and</code>", "<code>&amp;</code>", "<code>&amp;&amp;</code>", "<code>||</code>"], a: 2, exp: "<code>&amp;&amp;</code> es Y; <code>||</code> es O; <code>!</code> es NO." },
        ],
        cards: [
          { q: "<code>/</code> y <code>%</code> con enteros", a: "<code>/</code> es la división entera (descarta decimales) y <code>%</code> da el resto. Ej: <code>17/5=3</code>, <code>17%5=2</code>." },
          { q: "Decisión doble en C", a: "<code>if (cond) { ... } else { ... }</code> — equivale a Si/Sino de PSeInt." },
          { q: "Estructura de un <code>for</code>", a: "<code>for (inicialización; condición; incremento) { ... }</code>. Para repetir una cantidad fija de veces." },
          { q: "<code>while</code> vs <code>do-while</code>", a: "<code>while</code> evalúa la condición al principio (puede no ejecutarse). <code>do-while</code> al final (se ejecuta ≥ 1 vez)." },
          { q: "¿Para qué sirve <code>break</code> en switch?", a: "Para salir del <code>switch</code> y no 'caer' a los siguientes <code>case</code>." },
          { q: "Operadores lógicos", a: "<code>&amp;&amp;</code> (Y), <code>||</code> (O), <code>!</code> (NO)." },
          { q: "Patrón: recorrer dígitos de un número", a: "<code>while(n>0){ d = n%10; n = n/10; }</code> — <code>%10</code> da el último dígito, <code>/10</code> lo elimina." },
        ],
      },

      /* ===================================================================
         UNIDAD 4 — ARREGLOS (VECTORES)
         =================================================================== */
      {
        id: "vectores",
        glyph: "[i]",
        title: "Arreglos (vectores)",
        desc: "Tipos compuestos: declaración, índices, recorrido con for y while, operaciones.",
        tool: "vectores",
        html: `
        <p class="lead">Un <strong>arreglo</strong> (array o vector) es una secuencia <strong>homogénea</strong> de elementos —todos del mismo tipo— a los que se accede mediante un <strong>índice</strong>. Es un tipo de dato <em>compuesto</em>.</p>

        <div class="callout def">
          <strong class="callout__tag">Concepto</strong>
          Un <strong>vector</strong> tiene dimensión 1. Si tuviera 2 dimensiones (filas y columnas) sería una <strong>matriz</strong> o tabla.
        </div>

        <h2>1. Índices: empiezan en 0</h2>
        <p>Si <code>V</code> tiene 5 elementos, sus posiciones válidas son <strong>0, 1, 2, 3, 4</strong>. El primer elemento es <code>V[0]</code> y el último <code>V[4]</code>.</p>
        ${C(`int V[5];   // V[0] V[1] V[2] V[3] V[4]
//            -2    7   -4   10    3
// V[0] vale -2 ; V[2] vale -4 ; V[4] vale 3`)}

        <h2>2. Declaración</h2>
        ${C(`tipo_de_dato nombreVector[tamaño];

int V[5];              // reserva 5 enteros contiguos
float notas[100];
char letras[10];

#define tam 20         // tamaño constante muy usado en la cátedra
int vec[tam];`, "El compilador reserva espacio contiguo en memoria para todos los elementos.")}

        <h2>3. Carga y muestra con <code>for</code></h2>
        <p>El <code>for</code> es ideal cuando sabemos cuántos elementos hay:</p>
        ${C(`#include <stdio.h>
#define tam 20
int main() {
    int i, n, v[tam];

    printf("Indique la cantidad de elementos: ");
    scanf("%i", &n);

    for (i = 0; i < n; i++) {            // cargar
        printf("Ingrese un elemento: ");
        scanf("%i", &v[i]);
    }

    printf("ELEMENTOS DEL VECTOR\\n");   // mostrar
    for (i = 0; i < n; i++)
        printf("v[%i] = %i\\n", i, v[i]);

    return 0;
}`)}

        <h2>4. Carga con <code>while</code> (centinela)</h2>
        <p>Cuando no sabemos cuántos datos hay, usamos un valor de corte (centinela). Acá se cargan números mientras sean positivos:</p>
        ${C(`#define tam 10
int main() {
    int i = 0, x, k, v[tam];

    printf("Ingrese un numero (0 para terminar): ");
    scanf("%u", &x);
    while (x > 0) {
        v[i] = x;
        scanf("%u", &x);
        i++;
    }

    for (k = 0; k < i; k++)
        printf("v[%i] = %u\\n", k, v[k]);
    return 0;
}`)}

        <h2>5. Asignación de valores</h2>
        ${C(`// Método 1: elemento a elemento
int v[5];
v[0] = 10;  v[1] = 20;  v[2] = 30;

// Método 2: en la declaración
int w[5] = {10, 20, 30, 40, 50};
int z[]  = {1, 2, 3};   // el compilador deduce tamaño 3`)}

        <div class="callout warn">
          <strong class="callout__tag">¡Cuidado!</strong>
          C <strong>no</strong> verifica que el índice esté dentro del rango. Escribir en <code>v[100]</code> de un vector de 10 no da error de compilación, pero <strong>corrompe memoria</strong>. El control lo hacés vos.
        </div>

        <h2>6. Operaciones típicas</h2>
        <ul>
          <li><strong>Sumar</strong> todos los elementos.</li>
          <li>Buscar el <strong>mayor</strong> / <strong>menor</strong> y su posición.</li>
          <li><strong>Invertir</strong> el orden.</li>
          <li><strong>Buscar</strong> un elemento (búsqueda secuencial).</li>
        </ul>
        ${C(`int suma = 0, may = v[0];
for (i = 0; i < n; i++) {
    suma = suma + v[i];
    if (v[i] > may) may = v[i];   // mayor
}`)}

        <div class="callout tip">
          <strong class="callout__tag">Probalo vos</strong>
          Visualizá cómo se cargan y recorren los vectores, posición por posición, con el <a href="#/tool/vectores">Simulador de vectores</a>.
        </div>
        `,
        quiz: [
          { q: "Si un vector tiene 5 elementos, ¿cuál es el índice del último?", opts: ["5", "4", "1", "0"], a: 1, exp: "Los índices van de 0 a 4: el último es <code>V[4]</code>." },
          { q: "¿Cómo se declara un vector de 10 enteros?", opts: ["<code>int v(10);</code>", "<code>int v[10];</code>", "<code>vector v[10];</code>", "<code>int v = 10;</code>"], a: 1, exp: "<code>tipo nombre[tamaño];</code>" },
          { q: "¿Qué pasa si accedo a un índice fuera de rango?", opts: ["Error de compilación", "El compilador lo corrige", "Comportamiento indefinido / corrompe memoria", "Devuelve 0"], a: 2, exp: "C no controla los límites: el control queda en tus manos." },
          { q: "¿Qué estructura conviene para recorrer un vector de tamaño conocido?", opts: ["<code>do-while</code>", "<code>for</code>", "<code>switch</code>", "<code>if</code>"], a: 1, exp: "El <code>for</code> con índice de 0 a n−1." },
          { q: "<code>int w[] = {1, 2, 3};</code> declara un vector de tamaño…", opts: ["0", "1", "3", "indefinido"], a: 2, exp: "El compilador deduce el tamaño: 3." },
          { q: "Para acceder al primer elemento de <code>v</code> escribo…", opts: ["<code>v[1]</code>", "<code>v(0)</code>", "<code>v[0]</code>", "<code>v.0</code>"], a: 2, exp: "El primer elemento es <code>v[0]</code>." },
          { q: "Un arreglo es una secuencia…", opts: ["de distintos tipos", "homogénea (mismo tipo)", "siempre de 10 elementos", "de solo enteros"], a: 1, exp: "Todos los elementos son del mismo tipo." },
        ],
        cards: [
          { q: "¿Qué es un arreglo/vector?", a: "Una secuencia homogénea de elementos del mismo tipo, accesibles por un índice. Dimensión 1 = vector; dimensión 2 = matriz." },
          { q: "¿Dónde empiezan los índices en C?", a: "En <strong>0</strong>. Un vector de N elementos usa los índices 0 … N−1." },
          { q: "Declaración de un vector", a: "<code>tipo nombre[tamaño];</code> — ej: <code>int v[20];</code>. Muy común usar <code>#define tam 20</code>." },
          { q: "Inicializar en la declaración", a: "<code>int v[5] = {10,20,30,40,50};</code> o <code>int z[] = {1,2,3};</code> (deduce tamaño)." },
          { q: "Recorrer un vector con for", a: "<code>for (i = 0; i &lt; n; i++) { ... v[i] ... }</code>" },
          { q: "Peligro de los arreglos en C", a: "C <strong>no</strong> controla los límites del índice. Acceder fuera de rango corrompe memoria sin avisar." },
        ],
      },

      /* ===================================================================
         UNIDAD 5 — CARACTERES Y CADENAS
         =================================================================== */
      {
        id: "cadenas",
        glyph: "\\0",
        title: "Caracteres y cadenas",
        desc: "char, vector de caracteres, fflush(stdin), cadenas, carácter nulo y string.h.",
        tool: "ascii",
        html: `
        <p class="lead">Una <strong>cadena</strong> (string) es texto: una secuencia de caracteres. En C se guarda en un <strong>vector de <code>char</code></strong> que termina con un carácter especial: el <strong>nulo</strong> <code>'\\0'</code>.</p>

        <h2>1. El tipo <code>char</code></h2>
        ${C(`char c = 'A';            // entre comillas SIMPLES
scanf("%c", &c);        // leer un carácter
printf("%c", c);        // mostrar un carácter
// Recordá: 'A' se guarda como 65 (ASCII)`)}

        <h2>2. Vector de caracteres y <code>fflush(stdin)</code></h2>
        <p>Al leer varios caracteres con <code>scanf("%c", …)</code>, el <strong>enter</strong> anterior queda en el buffer y se cuela como un carácter. La solución de la cátedra es limpiar el buffer con <code>fflush(stdin)</code> antes de cada lectura:</p>
        ${C(`#define tam 10
int main() {
    char car[tam];
    int i, n;
    printf("Indique la cantidad de caracteres: ");
    scanf("%i", &n);
    for (i = 0; i < n; i++) {
        fflush(stdin);          // limpia el buffer de entrada
        scanf("%c", &car[i]);
    }
    for (i = 0; i < n; i++)
        printf("Car[%i] = %c\\n", i, car[i]);
    return 0;
}`, "fflush(stdin): fflush = limpia el buffer; stdin = buffer de entrada.")}

        <h2>3. Cadena vs. vector de caracteres</h2>
        <div class="callout def">
          <strong class="callout__tag">Diferencia clave</strong>
          Una <strong>cadena</strong> se guarda en un vector de caracteres <strong>y</strong> lleva el carácter nulo <code>'\\0'</code> al final, que marca dónde termina. Un vector de caracteres "a secas" no necesariamente lo tiene.
        </div>
        ${C(`// Vector de chars:   'H' 'O' 'L' 'A'
// Cadena "HOLA":      'H' 'O' 'L' 'A' '\\0'
//  posición:           0   1   2   3   4`)}

        <h2>4. Declaración y lectura de cadenas</h2>
        ${C(`char nombre[40];

// scanf("%s"): lee hasta el primer espacio o enter (una palabra)
scanf("%s", &nombre);
printf("Su nombre es: %s\\n", nombre);

// gets(): lee la línea COMPLETA (incluye espacios)
gets(nombre);
puts(nombre);          // muestra la cadena completa`, "Con scanf(\"%s\") y nombre = \"Santiago Agustin\", solo lee \"Santiago\".")}

        <h2>5. Lectura carácter a carácter</h2>
        <p>Se lee con <code>getchar()</code> hasta el fin de línea y se agrega manualmente el <code>'\\0'</code>:</p>
        ${C(`int i = 0;
char c, cad[20];
c = getchar();
while (c != '\\n') {
    cad[i] = c;
    c = getchar();
    i++;
}
cad[i] = '\\0';        // ¡importante! marca el fin de la cadena
printf("Cadena: %s\\n", cad);`)}

        <h2>6. Funciones de <code>&lt;string.h&gt;</code></h2>
        <div class="tbl-wrap">
        <table class="tbl tbl--left">
          <thead><tr><th>Función</th><th>Qué hace</th></tr></thead>
          <tbody>
            <tr><td><code>strlen(cad)</code></td><td>Devuelve la <strong>longitud</strong> de la cadena (sin contar el <code>'\\0'</code>).</td></tr>
            <tr><td><code>strcpy(dest, fuente)</code></td><td><strong>Copia</strong> la cadena fuente en la destino.</td></tr>
            <tr><td><code>strcmp(c1, c2)</code></td><td><strong>Compara</strong>: 0 si son iguales; &lt;0 si c1 va antes; &gt;0 si va después.</td></tr>
            <tr><td><code>strcat(c1, c2)</code></td><td><strong>Concatena</strong>: deja en c1 el resultado de c1 seguida de c2.</td></tr>
            <tr><td><code>atoi(cad)</code></td><td>Convierte la cadena a su valor <strong>entero</strong>.</td></tr>
          </tbody>
        </table>
        </div>
        ${C(`#include <string.h>
char cadena[80], cad1[80], cad2[80];

strcpy(cadena, "cadena1");        // cadena = "cadena1"
printf("longitud: %i", strlen(cadena));   // 7

strcpy(cad1, "abc");
strcpy(cad2, "abd");
if (strcmp(cad1, cad2) == 0) printf("iguales");
else if (strcmp(cad1, cad2) < 0) printf("abc va antes que abd");

strcat(cad1, cad2);               // cad1 = "abcabd"

int entero = atoi("987");         // entero = 987`)}
        <div class="callout tip">
          <strong class="callout__tag">Probalo vos</strong>
          Mirá el código de cada carácter en la <a href="#/tool/ascii">Tabla ASCII</a> y ejecutá tus programas con cadenas en la <a href="#/tool/consola">Consola de C</a> (soporta <code>strlen</code>, <code>strcpy</code>, <code>strcmp</code>, <code>strcat</code>, <code>atoi</code>).
        </div>
        `,
        quiz: [
          { q: "¿Qué carácter marca el final de una cadena en C?", opts: ["<code>'\\n'</code>", "<code>'\\0'</code>", "<code>'#'</code>", "Un espacio"], a: 1, exp: "El carácter nulo <code>'\\0'</code> indica el fin de la cadena." },
          { q: "¿Qué devuelve <code>strlen(\"HOLA\")</code>?", opts: ["3", "4", "5", "0"], a: 1, exp: "4 caracteres (el <code>'\\0'</code> no se cuenta)." },
          { q: "¿Para qué se usa <code>fflush(stdin)</code>?", opts: ["Imprimir más rápido", "Limpiar el buffer de entrada", "Cerrar el programa", "Leer un número"], a: 1, exp: "Limpia el buffer para que el enter previo no se cuele al leer con <code>%c</code>." },
          { q: "<code>scanf(\"%s\", nombre)</code> con entrada \"Juan Perez\" guarda…", opts: ["\"Juan Perez\"", "\"Juan\"", "\"Perez\"", "Nada"], a: 1, exp: "<code>%s</code> corta en el primer espacio: guarda \"Juan\"." },
          { q: "¿Qué función copia una cadena en otra?", opts: ["<code>strlen</code>", "<code>strcpy</code>", "<code>strcmp</code>", "<code>strcat</code>"], a: 1, exp: "<code>strcpy(destino, fuente)</code> copia." },
          { q: "<code>strcmp(c1, c2)</code> devuelve 0 cuando…", opts: ["c1 va antes", "las cadenas son iguales", "c1 va después", "hay error"], a: 1, exp: "0 significa que son iguales." },
          { q: "Para leer una línea completa con espacios uso…", opts: ["<code>scanf(\"%s\")</code>", "<code>gets()</code>", "<code>strlen()</code>", "<code>getchar()</code> una vez"], a: 1, exp: "<code>gets()</code> lee la línea entera, incluidos los espacios." },
          { q: "Internamente, ¿qué es <code>strcat(c1, c2)</code>?", opts: ["Compara c1 y c2", "Copia c2 en c1", "Concatena: c1 + c2 queda en c1", "Mide c1"], a: 2, exp: "Concatena: deja c1 seguida de c2 en c1." },
        ],
        cards: [
          { q: "¿Qué es el carácter nulo <code>'\\0'</code>?", a: "El carácter (código 0) que marca el <strong>fin de una cadena</strong>. Toda cadena lo lleva al final." },
          { q: "char vs cadena", a: "<code>char</code> es UN carácter (comillas simples <code>'A'</code>). Una cadena es un vector de char terminado en <code>'\\0'</code> (comillas dobles <code>\"hola\"</code>)." },
          { q: "¿Por qué <code>fflush(stdin)</code> antes de <code>%c</code>?", a: "Para limpiar el enter que quedó en el buffer de entrada y que no se cuele como carácter leído." },
          { q: "<code>scanf(\"%s\")</code> vs <code>gets()</code>", a: "<code>%s</code> lee una sola palabra (corta en el espacio). <code>gets()</code> lee la línea completa con espacios." },
          { q: "strlen / strcpy / strcmp / strcat / atoi", a: "Longitud / Copiar / Comparar (0 = iguales) / Concatenar / convertir a entero. Están en <code>&lt;string.h&gt;</code>." },
          { q: "Lectura carácter a carácter", a: "Con <code>getchar()</code> en un <code>while</code> hasta <code>'\\n'</code>, y al final asignar <code>cad[i] = '\\0';</code>." },
        ],
      },

      /* ===================================================================
         UNIDAD 6 — MÓDULOS (FUNCIONES)
         =================================================================== */
      {
        id: "modulos",
        glyph: "f()",
        title: "Módulos (funciones)",
        desc: "Funciones, parámetros, valor de retorno, prototipos y división en módulos.",
        tool: "consola",
        html: `
        <p class="lead">Un <strong>módulo</strong> o <strong>función</strong> es un bloque de código con nombre que resuelve una sub-tarea. Dividir un problema en funciones lo hace más <strong>legible</strong>, <strong>reutilizable</strong> y fácil de probar.</p>

        <div class="callout def">
          <strong class="callout__tag">Estructura de una función</strong>
          <code>tipoDevuelto nombre(parámetros) { cuerpo; return valor; }</code>
        </div>

        <h2>1. Una función que devuelve un valor</h2>
        ${C(`#include <stdio.h>

int suma(int a, int b) {     // recibe a y b ; devuelve un int
    return a + b;
}

int main() {
    int r = suma(20, 22);    // llamada: r = 42
    printf("La suma es %i\\n", r);
    return 0;
}`, "a y b son parámetros; 20 y 22 son los argumentos de la llamada.")}

        <h2>2. Partes de una función</h2>
        <ul>
          <li><strong>Tipo devuelto</strong>: qué tipo de dato retorna (<code>int</code>, <code>float</code>…). Si no devuelve nada, es <code>void</code>.</li>
          <li><strong>Parámetros</strong>: los datos que recibe (entre paréntesis).</li>
          <li><strong>Cuerpo</strong>: el código entre llaves.</li>
          <li><strong><code>return</code></strong>: devuelve el resultado y termina la función.</li>
        </ul>

        <h2>3. Funciones sin retorno: <code>void</code></h2>
        ${C(`void saludar(char nombre[]) {
    printf("Hola, %s!\\n", nombre);
    // no lleva return de valor
}`)}

        <h2>4. Un módulo por tarea: ejemplo de menú</h2>
        <p>Cada operación va en su propia función. <code>main</code> solo coordina:</p>
        ${C(`int sumar(int a, int b)   { return a + b; }
int restar(int a, int b)  { return a - b; }
int multiplicar(int a, int b) { return a * b; }

int main() {
    int op, a, b;
    printf("1.Sumar 2.Restar 3.Multiplicar\\n");
    scanf("%i", &op);
    printf("Ingrese dos numeros: ");
    scanf("%i %i", &a, &b);

    switch (op) {
        case 1: printf("= %i", sumar(a, b));        break;
        case 2: printf("= %i", restar(a, b));       break;
        case 3: printf("= %i", multiplicar(a, b));  break;
        default: printf("Opcion invalida");
    }
    return 0;
}`)}

        <h2>5. Pasar arreglos a funciones</h2>
        <p>Los arreglos se pasan <strong>por referencia</strong>: la función trabaja sobre el vector original (no una copia). Por eso suele recibir también el tamaño <code>n</code>.</p>
        ${C(`int sumaVector(int v[], int n) {
    int i, s = 0;
    for (i = 0; i < n; i++)
        s = s + v[i];
    return s;
}`)}

        <h2>6. Prototipos</h2>
        <p>Si definís una función <strong>después</strong> de <code>main</code>, debés declarar su <strong>prototipo</strong> arriba para que el compilador la conozca:</p>
        ${C(`#include <stdio.h>

int esPrimo(int n);   // prototipo (declaración)

int main() {
    if (esPrimo(7)) printf("7 es primo\\n");
    return 0;
}

int esPrimo(int n) {  // definición
    int i;
    if (n < 2) return 0;
    for (i = 2; i < n; i++)
        if (n % i == 0) return 0;
    return 1;
}`)}
        <div class="callout tip">
          <strong class="callout__tag">Probalo vos</strong>
          La <a href="#/tool/consola">Consola de C</a> soporta funciones definidas por vos: escribí varios módulos y llamalos desde <code>main</code>.
        </div>
        `,
        quiz: [
          { q: "¿Qué palabra clave devuelve un valor desde una función?", opts: ["<code>break</code>", "<code>return</code>", "<code>void</code>", "<code>main</code>"], a: 1, exp: "<code>return</code> devuelve el resultado y termina la función." },
          { q: "Una función que no devuelve nada se declara de tipo…", opts: ["<code>int</code>", "<code>null</code>", "<code>void</code>", "<code>empty</code>"], a: 2, exp: "<code>void</code> indica que no retorna valor." },
          { q: "En <code>suma(20, 22)</code>, ¿qué son 20 y 22?", opts: ["Parámetros", "Argumentos", "Variables globales", "Prototipos"], a: 1, exp: "Son los argumentos de la llamada; los parámetros son a y b en la definición." },
          { q: "¿Cómo se pasan los arreglos a una función?", opts: ["Por copia", "Por referencia", "No se pueden pasar", "Como texto"], a: 1, exp: "Por referencia: la función trabaja sobre el arreglo original." },
          { q: "¿Para qué sirve un <strong>prototipo</strong>?", opts: ["Ejecutar la función", "Declararla antes de definirla, para que el compilador la conozca", "Borrar la función", "Hacerla más rápida"], a: 1, exp: "Avisa al compilador la firma de una función que se define más abajo." },
          { q: "¿Por qué dividir un programa en módulos?", opts: ["Para que sea más lento", "Para reutilizar y ordenar el código", "Es obligatorio siempre", "Para usar menos memoria"], a: 1, exp: "Legibilidad, reutilización y pruebas más simples." },
          { q: "¿Qué imprime?<br><code>int f(int x){return x*x;} ... printf(\"%i\", f(4));</code>", opts: ["<code>8</code>", "<code>16</code>", "<code>4</code>", "<code>44</code>"], a: 1, exp: "f(4) devuelve 4·4 = 16." },
        ],
        cards: [
          { q: "Estructura de una función", a: "<code>tipo nombre(parámetros) { ... return valor; }</code>. El tipo es lo que devuelve." },
          { q: "Parámetros vs argumentos", a: "Parámetros: las variables de la definición. Argumentos: los valores reales que pasás al llamarla." },
          { q: "¿Qué es <code>void</code>?", a: "Un tipo de retorno que significa 'no devuelve ningún valor'." },
          { q: "¿Cómo se pasan los arreglos?", a: "Por referencia: la función modifica el arreglo original. Suele recibir también el tamaño <code>n</code>." },
          { q: "¿Qué es un prototipo?", a: "La declaración de la firma de una función (<code>int esPrimo(int n);</code>) antes de <code>main</code>, cuando la definís después." },
          { q: "¿Por qué usar módulos?", a: "Para dividir el problema en partes: código más legible, reutilizable y fácil de probar (cada módulo, una tarea)." },
        ],
      },

    ],
  };
})();
