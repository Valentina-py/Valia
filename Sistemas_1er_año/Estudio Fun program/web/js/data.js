/* ============================================================
   CONTENIDO DE ESTUDIO — Fundamentos de la Programación
   Unidades: Álgebra de Boole · Algoritmos y Datos ·
             Diagramación y Estructuras de Control · Vectores
   ============================================================ */
window.APP_DATA = {
  units: [

  /* ===================================================================
     UNIDAD 1 — ÁLGEBRA DE BOOLE
     =================================================================== */
  {
    id: "boole",
    glyph: "01",
    title: "Álgebra de Boole",
    desc: "El conjunto {0,1}, postulados, teoremas, De Morgan, minitérminos y mapas de Karnaugh.",
    tool: "boole",
    html: `
      <p class="lead">El <strong>Álgebra de Boole</strong> es una rama de la matemática que trabaja con solo dos valores: <strong>0</strong> y <strong>1</strong>, que representan <em>falso</em> (0) y <em>verdadero</em> (1). Es la base de la lógica, la electrónica digital y la programación: permite representar decisiones, condiciones y circuitos de forma precisa.</p>

      <p>En lugar de operar con números como en el álgebra común, en Boole operamos con valores lógicos usando reglas propias. Todo lo que hagamos se resuelve dentro del conjunto \\(B=\\{0,1\\}\\).</p>

      <h2>Conceptos previos</h2>
      <div class="callout def">
        <strong class="callout__tag">Operación cerrada</strong>
        Una operación es <strong>cerrada</strong> en un conjunto cuando al operar dos elementos del conjunto, el resultado <em>también</em> pertenece a ese conjunto.
      </div>
      <div class="callout def">
        <strong class="callout__tag">Operación binaria</strong>
        Es una operación que necesita <strong>dos</strong> elementos para realizarse.
      </div>
      <p>Por ejemplo, la <strong>resta es cerrada</strong> en los enteros \\(\\mathbb{Z}\\) (restar dos enteros da un entero) pero <strong>no es cerrada</strong> en los naturales \\(\\mathbb{N}\\): \\(3-8=-5\\notin\\mathbb{N}\\).</p>

      <h2>Definición de Álgebra de Boole</h2>
      <p>Sea \\(B=\\{0,1\\}\\) y dos operaciones cerradas en \\(B\\): la <strong>suma lógica</strong> (símbolo \\(+\\)) y el <strong>producto lógico</strong> (símbolo \\(\\cdot\\)), definidas por estas tablas:</p>

      <div class="tbl-wrap" style="display:flex;gap:18px;flex-wrap:wrap;justify-content:center">
        <table class="tbl" style="min-width:0;width:auto">
          <thead><tr><th>+</th><th>0</th><th>1</th></tr></thead>
          <tbody>
            <tr><th>0</th><td class="v-false">0</td><td class="v-true">1</td></tr>
            <tr><th>1</th><td class="v-true">1</td><td class="v-true">1</td></tr>
          </tbody>
        </table>
        <table class="tbl" style="min-width:0;width:auto">
          <thead><tr><th>·</th><th>0</th><th>1</th></tr></thead>
          <tbody>
            <tr><th>0</th><td class="v-false">0</td><td class="v-false">0</td></tr>
            <tr><th>1</th><td class="v-false">0</td><td class="v-true">1</td></tr>
          </tbody>
        </table>
      </div>

      <div class="callout tip">
        <strong class="callout__tag">Analogía clave</strong>
        La <strong>suma</strong> es una <strong>O lógica (disyunción)</strong>: da 1 si al menos uno es 1.<br>
        El <strong>producto</strong> es una <strong>Y lógica (conjunción)</strong>: da 1 solo si ambos son 1.
      </div>

      <p>La estructura \\((B,+,\\cdot)\\) es un <strong>Álgebra de Boole</strong> si y solo si \\(\\forall\\, a,b,c\\in B\\) se cumplen <strong>cuatro postulados</strong>. El símbolo \\(\\forall\\) significa «para todo» y \\(\\exists\\) significa «existe».</p>

      <h2>Los cuatro postulados</h2>
      <div class="formula-box">
        $$ \\textbf{P1 — Conmutativa: }\\; a+b=b+a \\;\\;\\wedge\\;\\; a\\cdot b=b\\cdot a $$
        $$ \\textbf{P2 — Elemento neutro: }\\; a+0=a \\;\\;\\wedge\\;\\; a\\cdot 1=a $$
        $$ \\textbf{P3 — Distributiva (¡las dos!): }\\; a\\cdot(b+c)=ab+ac $$
        $$ a+(b\\cdot c)=(a+b)\\cdot(a+c) $$
        $$ \\textbf{P4 — Complemento: }\\;\\exists\\,\\overline{a}\\;/\\; a+\\overline{a}=1 \\;\\wedge\\; a\\cdot\\overline{a}=0 $$
      </div>
      <div class="callout warn">
        <strong class="callout__tag">Ojo, no es como el álgebra común</strong>
        En Boole la <strong>suma también distribuye respecto del producto</strong>: \\(a+bc=(a+b)(a+c)\\). ¡Eso no existe en el álgebra tradicional! Además, el neutro de la suma es \\(0\\) y el del producto es \\(1\\).
      </div>
      <p>Del postulado 4 se deduce que el <strong>complemento de 0 es 1</strong> y el <strong>complemento de 1 es 0</strong>. Por eso \\(\\overline{0}=1\\) y \\(\\overline{1}=0\\).</p>

      <h2>Convenciones de notación</h2>
      <ul>
        <li>Si no hay símbolo entre dos elementos, se asume <strong>producto</strong>: \\(a\\cdot b\\) se escribe \\(ab\\).</li>
        <li>Ni \\(+\\) ni \\(\\cdot\\) tienen prioridad fija; por convención, escribir \\(ab\\) sin paréntesis significa <strong>priorizar el producto</strong>. Se usa paréntesis cuando se quiere priorizar la suma.</li>
      </ul>
      <p>Ejemplos: en \\(a+bc\\) se resuelve primero \\(b\\cdot c\\) y luego se suma \\(a\\). En \\((a+b)c\\) se resuelve primero \\(a+b\\) y luego se multiplica por \\(c\\).</p>

      <h2>Teoremas (propiedades) del Álgebra de Boole</h2>
      <p>Cada teorema nos permite simplificar expresiones. Recordá el <strong>Principio de Dualidad</strong>: si cambiás \\(+\\leftrightarrow\\cdot\\) y \\(0\\leftrightarrow 1\\) en una identidad válida, obtenés otra identidad válida.</p>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Ley</th><th>Para \\(+\\)</th><th>Para \\(\\cdot\\)</th></tr></thead>
        <tbody>
          <tr><td>Idempotencia</td><td>\\(a+a=a\\)</td><td>\\(a\\cdot a=a\\)</td></tr>
          <tr><td>Absorción (elementos)</td><td>\\(a+1=1\\)</td><td>\\(a\\cdot 0=0\\)</td></tr>
          <tr><td>Redundancia</td><td>\\(a+ab=a\\)</td><td>\\(a(a+b)=a\\)</td></tr>
          <tr><td>Redundancia 2</td><td>\\(a+\\overline{a}b=a+b\\)</td><td>\\(a(\\overline{a}+b)=ab\\)</td></tr>
          <tr><td>Asociativa</td><td>\\((a+b)+c=a+(b+c)\\)</td><td>\\((ab)c=a(bc)\\)</td></tr>
          <tr><td>De Morgan</td><td>\\(\\overline{a+b}=\\overline{a}\\cdot\\overline{b}\\)</td><td>\\(\\overline{a\\cdot b}=\\overline{a}+\\overline{b}\\)</td></tr>
        </tbody>
      </table>
      </div>
      <div class="formula-box">
        $$ \\textbf{Involución: }\\; \\overline{\\overline{a}}=a \\qquad \\textbf{Complementos: }\\; \\overline{0}=1,\\;\\overline{1}=0 $$
        $$ \\textbf{Unicidad del complemento: el }\\overline{a}\\textbf{ de cada elemento es único.} $$
      </div>
      <div class="callout">
        <strong class="callout__tag">De Morgan, la estrella</strong>
        «La negación de una suma es el producto de las negaciones» y «la negación de un producto es la suma de las negaciones». Sirve para empujar las negaciones hacia las variables.
      </div>

      <h2>Funciones booleanas: minitérminos y maxitérminos</h2>
      <p>Una <strong>tabla de verdad</strong> define una función booleana. A partir de ella obtenemos su expresión algebraica de dos formas:</p>
      <ul>
        <li><strong>Minitérmino</strong>: producto donde aparecen <em>todas</em> las variables (complementadas o no). Vale 1 en <strong>una sola</strong> combinación. Cada variable se complementa si su bit es <strong>0</strong>.</li>
        <li><strong>Maxitérmino</strong>: suma donde aparecen <em>todas</em> las variables. Vale 0 en <strong>una sola</strong> combinación. Cada variable se complementa si su bit es <strong>1</strong>.</li>
      </ul>
      <div class="callout def">
        <strong class="callout__tag">Forma Normal Disyuntiva (FND)</strong>
        Suma lógica de los minitérminos donde la función vale <strong>1</strong>.&nbsp;
        <strong class="callout__tag" style="margin-top:8px">Forma Normal Conjuntiva (FNC)</strong>
        Producto lógico de los maxitérminos donde la función vale <strong>0</strong>.
      </div>
      <p>Ejemplo: si \\(f(a,b,c)=1\\) en las filas \\(2,3,5,6\\):</p>
      <div class="formula-box">
        $$ \\text{FND}=\\overline{a}b\\overline{c}+\\overline{a}bc+a\\overline{b}c+ab\\overline{c} $$
        $$ \\text{FNC}=(a+b+c)(a+b+\\overline{c})(\\overline{a}+b+c)(\\overline{a}+\\overline{b}+\\overline{c}) $$
      </div>

      <h2>Mapas de Karnaugh</h2>
      <p>El <strong>mapa de Karnaugh</strong> es una grilla que ordena los minitérminos de modo que las casillas vecinas difieren en un solo bit. Agrupando los <strong>1</strong> en bloques de \\(1,2,4,8\\dots\\) casillas (potencias de 2) se obtiene la expresión <strong>mínima</strong> de la función, evitando hacer largas demostraciones algebraicas.</p>
      <div class="callout tip">
        <strong class="callout__tag">Probalo</strong>
        Usá la <a href="#/tool/boole">Tabla de verdad booleana</a>, las <a href="#/tool/formas">Formas normales (FND/FNC)</a> y el <a href="#/tool/karnaugh">Mapa de Karnaugh</a> para experimentar con tus propias funciones.
      </div>
    `,
    quiz: [
      { q: "¿Con qué dos valores trabaja el Álgebra de Boole?", opts: ["0 y 1", "−1 y 1", "Verdadero, Falso y Nulo", "Todos los enteros"], a: 0, exp: "El conjunto es \\(B=\\{0,1\\}\\): falso (0) y verdadero (1)." },
      { q: "En la suma lógica, ¿cuánto vale \\(1+1\\)?", opts: ["2", "0", "1", "10"], a: 2, exp: "La suma lógica es una O: \\(1+1=1\\)." },
      { q: "En el producto lógico, ¿cuánto vale \\(1\\cdot 0\\)?", opts: ["1", "0", "10", "Indefinido"], a: 1, exp: "El producto es una Y: da 1 solo si ambos son 1. \\(1\\cdot 0=0\\)." },
      { q: "¿Cuál es el elemento neutro de la suma lógica?", opts: ["1", "0", "No tiene", "a"], a: 1, exp: "\\(a+0=a\\): el 0 es el neutro de la suma." },
      { q: "¿Cuál es el elemento neutro del producto lógico?", opts: ["0", "1", "a", "No tiene"], a: 1, exp: "\\(a\\cdot 1=a\\): el 1 es el neutro del producto." },
      { q: "Por la ley de absorción, \\(a+1\\) es igual a:", opts: ["a", "1", "0", "\\(\\overline{a}\\)"], a: 1, exp: "\\(a+1=1\\): el 1 absorbe la suma." },
      { q: "Según De Morgan, \\(\\overline{a+b}\\) es igual a:", opts: ["\\(\\overline{a}+\\overline{b}\\)", "\\(\\overline{a}\\cdot\\overline{b}\\)", "\\(a\\cdot b\\)", "\\(\\overline{a}\\cdot b\\)"], a: 1, exp: "La negación de una suma es el producto de las negaciones: \\(\\overline{a}\\cdot\\overline{b}\\)." },
      { q: "¿Cuál es el complemento de 0?", opts: ["0", "1", "−1", "No existe"], a: 1, exp: "\\(\\overline{0}=1\\) y \\(\\overline{1}=0\\)." },
      { q: "Por idempotencia, \\(a\\cdot a\\) es igual a:", opts: ["\\(a^2\\)", "0", "a", "1"], a: 2, exp: "En Boole \\(a\\cdot a=a\\) (no hay potencias)." },
      { q: "En la expresión \\(a+bc\\) (sin paréntesis), ¿qué se opera primero?", opts: ["La suma \\(a+b\\)", "El producto \\(b\\cdot c\\)", "Es indistinto", "Nada, está mal escrita"], a: 1, exp: "Por convención, escribir \\(bc\\) prioriza el producto: primero \\(b\\cdot c\\), luego se suma \\(a\\)." },
      { q: "La Forma Normal Disyuntiva (FND) se arma con la suma de los minitérminos donde la función vale:", opts: ["0", "1", "su complemento", "el último bit"], a: 1, exp: "FND = suma de minitérminos donde \\(f=1\\). La FNC usa los maxitérminos donde \\(f=0\\)." },
      { q: "¿Para qué sirve un mapa de Karnaugh?", opts: ["Para ordenar números", "Para simplificar/minimizar una función booleana", "Para sumar binarios", "Para dibujar variables"], a: 1, exp: "Agrupando los 1 en bloques potencia de 2 se obtiene la expresión mínima." },
    ],
    cards: [
      { q: "¿Qué es una operación cerrada?", a: "Aquella en la que el resultado de operar dos elementos del conjunto pertenece al mismo conjunto." },
      { q: "¿Qué es una operación binaria?", a: "Una operación que necesita dos elementos para realizarse." },
      { q: "¿Cuáles son los 4 postulados del Álgebra de Boole?", a: "1) Conmutativa. 2) Elemento neutro (0 para +, 1 para ·). 3) Distributiva (ambas operaciones). 4) Existencia del complemento." },
      { q: "Postulado distributivo (lo raro)", a: "La suma distribuye respecto del producto: a + (b·c) = (a+b)·(a+c). No existe en el álgebra común." },
      { q: "Leyes de De Morgan", a: "\\(\\overline{a+b}=\\overline{a}\\,\\overline{b}\\) y \\(\\overline{a\\cdot b}=\\overline{a}+\\overline{b}\\)." },
      { q: "Ley de absorción", a: "a + 1 = 1 y a · 0 = 0." },
      { q: "Ley de idempotencia", a: "a + a = a y a · a = a." },
      { q: "Ley de involución", a: "El complemento del complemento es el original: \\(\\overline{\\overline{a}}=a\\)." },
      { q: "Principio de dualidad", a: "Toda identidad válida sigue siendo válida si intercambiás + por · y 0 por 1." },
      { q: "¿Qué es un minitérmino?", a: "Producto donde aparecen todas las variables; vale 1 en una sola combinación. La variable se complementa si su bit es 0." },
      { q: "¿Qué es un maxitérmino?", a: "Suma donde aparecen todas las variables; vale 0 en una sola combinación. La variable se complementa si su bit es 1." },
      { q: "FND vs FNC", a: "FND: suma de minitérminos donde f=1. FNC: producto de maxitérminos donde f=0." },
    ]
  },

  /* ===================================================================
     UNIDAD 2 — ALGORITMOS Y DATOS
     =================================================================== */
  {
    id: "algoritmos",
    glyph: "ƒ",
    title: "Algoritmos y Datos",
    desc: "Qué es un algoritmo, variables y constantes, tipos de datos simples y operadores.",
    tool: "pseudo",
    html: `
      <p class="lead">Programar es, antes que nada, <strong>pensar la solución paso a paso</strong>. Esa solución ordenada es un <strong>algoritmo</strong>; recién después se la traduce a un lenguaje de programación.</p>

      <h2>¿Qué es un algoritmo?</h2>
      <div class="callout def">
        <strong class="callout__tag">Definición</strong>
        Un <strong>algoritmo</strong> es una secuencia ordenada y finita de pasos (operaciones) que, partiendo de unos datos de entrada, produce un resultado en un número finito de pasos.
      </div>
      <p>Como dice Joyanes: «en la ciencia de la computación los algoritmos son más importantes que los lenguajes o las computadoras. Un lenguaje es solo un medio para expresar un algoritmo y la computadora solo un procesador para ejecutarlo». Primero se entiende el problema; lo menos importante es la codificación.</p>

      <h3>Características de un buen algoritmo</h3>
      <ul>
        <li><strong>Preciso</strong>: cada paso está definido sin ambigüedad.</li>
        <li><strong>Definido</strong>: ante los mismos datos, siempre da el mismo resultado.</li>
        <li><strong>Finito</strong>: termina después de una cantidad limitada de pasos.</li>
        <li><strong>Entrada y salida</strong>: recibe datos (0 o más) y produce al menos un resultado.</li>
      </ul>

      <h3>Fases de la resolución de un problema</h3>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Fase</th><th>En qué consiste</th></tr></thead>
        <tbody>
          <tr><td>1. Análisis</td><td>Entender el problema: qué datos entran y qué se pide.</td></tr>
          <tr><td>2. Diseño</td><td>Crear el algoritmo (diagrama / pseudocódigo).</td></tr>
          <tr><td>3. Codificación</td><td>Traducir el algoritmo a un lenguaje de programación.</td></tr>
          <tr><td>4. Prueba y depuración</td><td>Ejecutar, verificar resultados y corregir errores.</td></tr>
        </tbody>
      </table>
      </div>

      <h2>Variables y constantes</h2>
      <div class="callout def">
        <strong class="callout__tag">Variable</strong>
        Es un espacio de memoria con un <strong>nombre</strong> que almacena un valor que <strong>puede cambiar</strong> durante la ejecución, siempre respetando el mismo tipo de dato.
      </div>
      <p>Una <strong>constante</strong>, en cambio, guarda un valor que no cambia (por ejemplo \\(\\pi=3{,}1416\\)). Conviene darles nombres cortos y alusivos a lo que almacenan: <code>edad</code>, <code>total</code>, <code>contador</code>.</p>

      <h2>Tipos de datos simples</h2>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Tipo</th><th>Qué guarda</th><th>Ejemplos</th></tr></thead>
        <tbody>
          <tr><td>Entero</td><td>Números sin decimales</td><td><code>0</code>, <code>-7</code>, <code>1500</code></td></tr>
          <tr><td>Real</td><td>Números con decimales</td><td><code>3.14</code>, <code>-0.5</code></td></tr>
          <tr><td>Carácter</td><td>Un solo símbolo</td><td><code>'A'</code>, <code>'%'</code>, <code>'7'</code></td></tr>
          <tr><td>Cadena (string)</td><td>Texto</td><td><code>"Hola mundo"</code></td></tr>
          <tr><td>Lógico (booleano)</td><td>Verdadero / Falso</td><td><code>verdadero</code>, <code>falso</code></td></tr>
        </tbody>
      </table>
      </div>

      <h2>Operadores</h2>
      <h3>Aritméticos</h3>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Operador</th><th>Operación</th><th>Ejemplo</th></tr></thead>
        <tbody>
          <tr><td><code>+ &nbsp; -</code></td><td>Suma y resta</td><td><code>5 + 2 = 7</code></td></tr>
          <tr><td><code>* &nbsp; /</code></td><td>Multiplicación y división</td><td><code>5 / 2 = 2.5</code></td></tr>
          <tr><td><code>div</code></td><td>Cociente entero</td><td><code>17 div 5 = 3</code></td></tr>
          <tr><td><code>mod</code></td><td>Resto de la división</td><td><code>17 mod 5 = 2</code></td></tr>
          <tr><td><code>^</code></td><td>Potencia</td><td><code>2 ^ 3 = 8</code></td></tr>
        </tbody>
      </table>
      </div>
      <div class="callout tip">
        <strong class="callout__tag">div y mod, tus amigos</strong>
        Para saber si un número es <strong>par</strong>: <code>n mod 2 = 0</code>. Para sacar el <strong>último dígito</strong> de un número: <code>n mod 10</code>. Para <strong>quitárselo</strong>: <code>n div 10</code>.
      </div>

      <h3>Relacionales (dan verdadero/falso)</h3>
      <p><code>&lt;</code> menor · <code>&gt;</code> mayor · <code>&lt;=</code> menor o igual · <code>&gt;=</code> mayor o igual · <code>=</code> igual · <code>&lt;&gt;</code> distinto.</p>

      <h3>Lógicos</h3>
      <p><code>Y</code> (AND) · <code>O</code> (OR) · <code>NO</code> (NOT). Conectan condiciones: <code>(edad &gt;= 18) Y (tiene_dni)</code>.</p>

      <h2>Prioridad de operadores</h2>
      <p>De mayor a menor: <strong>1)</strong> paréntesis <code>( )</code> · <strong>2)</strong> potencia <code>^</code> · <strong>3)</strong> <code>* / div mod</code> · <strong>4)</strong> <code>+ -</code> · <strong>5)</strong> relacionales · <strong>6)</strong> <code>NO</code> · <strong>7)</strong> <code>Y</code> · <strong>8)</strong> <code>O</code>.</p>

      <h2>Asignación y entrada / salida</h2>
      <p>La <strong>asignación</strong> guarda un valor en una variable y se escribe con una flecha:</p>
      <div class="code-box"><span class="c-cmt">// asignación: la variable recibe el resultado</span>
total <span class="c-kw">←</span> precio * cantidad</div>
      <p>Para comunicarnos con el usuario usamos <code>Leer</code> (entrada) y <code>Escribir</code> (salida):</p>
      <div class="code-box"><span class="c-kw">Escribir</span> <span class="c-str">"Ingresá tu edad:"</span>
<span class="c-kw">Leer</span> edad
<span class="c-kw">Escribir</span> <span class="c-str">"Faltan"</span>, 18 - edad, <span class="c-str">"años"</span></div>
      <div class="callout tip">
        <strong class="callout__tag">Probalo</strong>
        Escribí y ejecutá tus propios algoritmos en el <a href="#/tool/pseudo">Intérprete de pseudocódigo</a> y convertí entre bases con el <a href="#/tool/bases">Conversor de bases</a>.
      </div>
    `,
    quiz: [
      { q: "Un algoritmo debe ser, sobre todo:", opts: ["Infinito", "Finito, preciso y ordenado", "Escrito en un solo lenguaje", "Lo más largo posible"], a: 1, exp: "Secuencia finita, precisa y ordenada de pasos." },
      { q: "¿Cuál es la primera fase de la resolución de un problema?", opts: ["Codificación", "Prueba", "Análisis (entender el problema)", "Compilar"], a: 2, exp: "Primero se analiza: qué entra y qué se pide." },
      { q: "Una variable se caracteriza por:", opts: ["Tener un valor fijo", "Poder cambiar su valor durante la ejecución", "No tener nombre", "Guardar solo texto"], a: 1, exp: "Su valor puede cambiar; una constante no." },
      { q: "¿Qué tipo de dato es <code>\"Hola\"</code>?", opts: ["Entero", "Carácter", "Cadena (string)", "Lógico"], a: 2, exp: "Texto entre comillas dobles es una cadena." },
      { q: "¿Cuánto vale <code>17 mod 5</code>?", opts: ["3", "2", "3.4", "12"], a: 1, exp: "mod es el resto: 17 = 5·3 + 2, entonces el resto es 2." },
      { q: "¿Cuánto vale <code>17 div 5</code>?", opts: ["2", "3", "3.4", "85"], a: 1, exp: "div es el cociente entero: 17 entre 5 da 3." },
      { q: "Para saber si un número <code>n</code> es par se usa:", opts: ["n div 2 = 0", "n mod 2 = 0", "n / 2 = 1", "n ^ 2 = 0"], a: 1, exp: "Es par si el resto de dividir por 2 es 0." },
      { q: "¿Qué operador tiene mayor prioridad?", opts: ["+", "Los paréntesis ( )", "Y (AND)", "<"], a: 1, exp: "Los paréntesis se resuelven primero, luego la potencia, etc." },
      { q: "El símbolo de asignación que usamos es:", opts: ["==", "←", ">", ":"], a: 1, exp: "<code>variable ← valor</code> guarda el valor en la variable." },
      { q: "¿Qué hace la instrucción <code>Leer</code>?", opts: ["Muestra un texto en pantalla", "Recibe un dato del usuario", "Borra una variable", "Termina el programa"], a: 1, exp: "Leer es entrada; Escribir es salida." },
    ],
    cards: [
      { q: "Definición de algoritmo", a: "Secuencia ordenada y finita de pasos que, desde unos datos de entrada, produce un resultado en pasos finitos." },
      { q: "Fases para resolver un problema", a: "1) Análisis 2) Diseño del algoritmo 3) Codificación 4) Prueba y depuración." },
      { q: "Variable vs constante", a: "La variable puede cambiar su valor; la constante guarda un valor fijo (ej. π)." },
      { q: "Tipos de datos simples", a: "Entero, Real, Carácter, Cadena (string) y Lógico (booleano)." },
      { q: "div y mod", a: "div = cociente entero (17 div 5 = 3). mod = resto (17 mod 5 = 2)." },
      { q: "¿Cómo sé si un número es par?", a: "n mod 2 = 0." },
      { q: "Último dígito de un número", a: "n mod 10 da el último dígito; n div 10 lo quita." },
      { q: "Operadores relacionales", a: "< &nbsp; > &nbsp; <= &nbsp; >= &nbsp; = &nbsp; <> (distinto). Devuelven verdadero o falso." },
      { q: "Operadores lógicos", a: "Y (AND), O (OR), NO (NOT). Conectan condiciones." },
      { q: "Asignación, Leer y Escribir", a: "total ← a + b asigna; Leer pide un dato; Escribir muestra un resultado." },
    ]
  },

  /* ===================================================================
     UNIDAD 3 — DIAGRAMACIÓN Y ESTRUCTURAS DE CONTROL
     =================================================================== */
  {
    id: "diagramacion",
    glyph: "◇",
    title: "Diagramación y Estructuras de Control",
    desc: "Diagramas de flujo y NS, estructuras secuencial, selectiva e iterativa, contadores y acumuladores.",
    tool: "pseudo",
    html: `
      <p class="lead">Un mismo algoritmo se puede <strong>representar</strong> de varias formas: con un <strong>diagrama de flujo</strong>, con un <strong>diagrama NS</strong> (Nassi-Schneiderman) o con <strong>pseudocódigo</strong>. Todas usan las mismas tres estructuras de control.</p>

      <h2>Símbolos del diagrama de flujo</h2>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Símbolo</th><th>Significa</th></tr></thead>
        <tbody>
          <tr><td>Óvalo / elipse</td><td><strong>Inicio</strong> y <strong>Fin</strong> del algoritmo</td></tr>
          <tr><td>Paralelogramo</td><td><strong>Entrada / Salida</strong> (Leer / Escribir)</td></tr>
          <tr><td>Rectángulo</td><td><strong>Proceso</strong> (cálculos, asignaciones)</td></tr>
          <tr><td>Rombo</td><td><strong>Decisión</strong> (una condición con salidas Sí / No)</td></tr>
          <tr><td>Flechas</td><td>Indican el <strong>flujo</strong>, el orden de ejecución</td></tr>
        </tbody>
      </table>
      </div>
      <p>El <strong>diagrama NS</strong> reemplaza las flechas por bloques apilados sin líneas, lo que obliga a una programación más ordenada y estructurada.</p>

      <h2>1. Estructura secuencial</h2>
      <p>Las instrucciones se ejecutan <strong>una tras otra</strong>, en orden, de arriba hacia abajo.</p>
      <div class="code-box"><span class="c-kw">Leer</span> base, altura
area <span class="c-kw">←</span> base * altura
<span class="c-kw">Escribir</span> <span class="c-str">"Área:"</span>, area</div>

      <h2>2. Estructura selectiva (condicional)</h2>
      <p>Permite <strong>elegir</strong> entre caminos según una condición.</p>
      <h3>Simple (Si… Entonces)</h3>
      <div class="code-box"><span class="c-kw">Si</span> edad >= 18 <span class="c-kw">Entonces</span>
  <span class="c-kw">Escribir</span> <span class="c-str">"Es mayor de edad"</span>
<span class="c-kw">FinSi</span></div>
      <h3>Doble (Si… Entonces… Sino)</h3>
      <div class="code-box"><span class="c-kw">Si</span> nota >= 6 <span class="c-kw">Entonces</span>
  <span class="c-kw">Escribir</span> <span class="c-str">"Aprobado"</span>
<span class="c-kw">Sino</span>
  <span class="c-kw">Escribir</span> <span class="c-str">"Desaprobado"</span>
<span class="c-kw">FinSi</span></div>
      <h3>Múltiple (Según / casos)</h3>
      <p>Cuando hay muchas opciones se usa una selección múltiple según el valor de una variable (día de la semana, opción de menú, etc.).</p>

      <h2>3. Estructura iterativa (repetición / bucle)</h2>
      <p>Repite un bloque de instrucciones varias veces.</p>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Bucle</th><th>Cómo funciona</th><th>Cuándo conviene</th></tr></thead>
        <tbody>
          <tr><td><code>Mientras</code></td><td>Evalúa la condición <strong>antes</strong>; puede ejecutarse 0 veces</td><td>No se sabe cuántas veces de antemano</td></tr>
          <tr><td><code>Repetir-Hasta</code></td><td>Evalúa la condición <strong>al final</strong>; se ejecuta al menos 1 vez</td><td>Validar datos, menús</td></tr>
          <tr><td><code>Para</code> (for)</td><td>Repite una <strong>cantidad fija</strong> con un contador automático</td><td>Se conoce la cantidad de vueltas</td></tr>
        </tbody>
      </table>
      </div>
      <div class="code-box"><span class="c-cmt">// Mientras: leer hasta que ingresen 0</span>
<span class="c-kw">Leer</span> n
<span class="c-kw">Mientras</span> n <> 0 <span class="c-kw">Hacer</span>
  <span class="c-kw">Escribir</span> n * n
  <span class="c-kw">Leer</span> n
<span class="c-kw">FinMientras</span>

<span class="c-cmt">// Para: sumar los números del 1 al 5</span>
suma <span class="c-kw">←</span> <span class="c-num">0</span>
<span class="c-kw">Para</span> i <span class="c-kw">←</span> <span class="c-num">1</span> <span class="c-kw">Hasta</span> <span class="c-num">5</span> <span class="c-kw">Hacer</span>
  suma <span class="c-kw">←</span> suma + i
<span class="c-kw">FinPara</span>
<span class="c-kw">Escribir</span> suma</div>

      <h2>Contadores, acumuladores y banderas</h2>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Concepto</th><th>Qué hace</th><th>Forma típica</th></tr></thead>
        <tbody>
          <tr><td>Contador</td><td>Cuenta cuántas veces ocurre algo (suma siempre lo mismo)</td><td><code>cont ← cont + 1</code></td></tr>
          <tr><td>Acumulador</td><td>Va sumando/multiplicando valores distintos</td><td><code>suma ← suma + n</code></td></tr>
          <tr><td>Bandera (flag)</td><td>Variable lógica que recuerda si pasó algo</td><td><code>encontrado ← verdadero</code></td></tr>
        </tbody>
      </table>
      </div>
      <div class="callout warn">
        <strong class="callout__tag">Inicializar siempre</strong>
        Un contador o acumulador debe arrancar en <strong>0</strong> (o en <strong>1</strong> si es un producto, como el factorial) <em>antes</em> del bucle. Si no, arrastra basura.
      </div>

      <h2>Ejemplo completo: factorial de un número</h2>
      <div class="code-box"><span class="c-kw">Leer</span> n
fact <span class="c-kw">←</span> <span class="c-num">1</span>
<span class="c-kw">Para</span> i <span class="c-kw">←</span> <span class="c-num">1</span> <span class="c-kw">Hasta</span> n <span class="c-kw">Hacer</span>
  fact <span class="c-kw">←</span> fact * i
<span class="c-kw">FinPara</span>
<span class="c-kw">Escribir</span> <span class="c-str">"n! ="</span>, fact</div>
      <div class="callout tip">
        <strong class="callout__tag">Probalo</strong>
        Copiá estos ejemplos en el <a href="#/tool/pseudo">Intérprete de pseudocódigo</a> y miralos ejecutarse paso a paso.
      </div>
    `,
    quiz: [
      { q: "En un diagrama de flujo, ¿qué símbolo representa una decisión?", opts: ["Óvalo", "Rectángulo", "Rombo", "Paralelogramo"], a: 2, exp: "El rombo es la decisión, con salidas Sí/No." },
      { q: "¿Qué símbolo marca el Inicio y el Fin?", opts: ["Óvalo / elipse", "Rombo", "Rectángulo", "Flecha"], a: 0, exp: "El óvalo (o elipse) indica inicio y fin." },
      { q: "El paralelogramo se usa para:", opts: ["Procesos", "Entrada / Salida", "Decisiones", "Inicio"], a: 1, exp: "Entrada y salida: Leer / Escribir." },
      { q: "¿Cuáles son las tres estructuras de control básicas?", opts: ["Suma, resta, producto", "Secuencial, selectiva e iterativa", "Si, Para, Fin", "Entrada, proceso, salida"], a: 1, exp: "Toda lógica se arma con secuencia, selección y repetición." },
      { q: "¿Qué bucle se ejecuta al menos una vez sí o sí?", opts: ["Mientras", "Para", "Repetir-Hasta", "Si-Entonces"], a: 2, exp: "Repetir-Hasta evalúa la condición al final, por eso corre al menos 1 vez." },
      { q: "Si NO sabés cuántas veces se repetirá, conviene usar:", opts: ["Para", "Mientras", "Si", "Según"], a: 1, exp: "Mientras evalúa la condición antes y sirve cuando la cantidad es desconocida." },
      { q: "Para repetir una cantidad fija y conocida de veces conviene:", opts: ["Mientras", "Repetir-Hasta", "Para (for)", "Si-Sino"], a: 2, exp: "El Para usa un contador automático para una cantidad conocida." },
      { q: "Un contador típicamente se escribe:", opts: ["cont ← cont + 1", "cont ← cont * n", "cont ← 0 * cont", "cont ← n"], a: 0, exp: "Suma siempre 1 cada vez que ocurre el evento." },
      { q: "¿En cuánto se inicializa un acumulador de PRODUCTO (factorial)?", opts: ["0", "1", "n", "−1"], a: 1, exp: "Para multiplicar se arranca en 1; para sumar, en 0." },
      { q: "Una bandera (flag) es una variable:", opts: ["Entera grande", "Lógica que recuerda si algo ocurrió", "De texto", "Sin tipo"], a: 1, exp: "Guarda verdadero/falso, por ej. <code>encontrado</code>." },
    ],
    cards: [
      { q: "Símbolos del diagrama de flujo", a: "Óvalo = inicio/fin · Paralelogramo = entrada/salida · Rectángulo = proceso · Rombo = decisión · Flechas = flujo." },
      { q: "¿Qué es un diagrama NS?", a: "Diagrama de Nassi-Schneiderman: bloques apilados sin flechas que fuerzan una programación estructurada." },
      { q: "Las 3 estructuras de control", a: "Secuencial (en orden), Selectiva (Si/Sino/Según) e Iterativa (Mientras/Repetir/Para)." },
      { q: "Selección simple, doble y múltiple", a: "Simple: Si…Entonces. Doble: Si…Entonces…Sino. Múltiple: Según el valor de una variable." },
      { q: "Mientras vs Repetir-Hasta", a: "Mientras evalúa antes (0+ veces). Repetir-Hasta evalúa al final (1+ vez)." },
      { q: "¿Cuándo uso el bucle Para?", a: "Cuando conozco la cantidad exacta de repeticiones; lleva un contador automático." },
      { q: "Contador vs acumulador", a: "Contador suma siempre lo mismo (cont←cont+1). Acumulador suma valores distintos (suma←suma+n)." },
      { q: "¿Qué es una bandera (flag)?", a: "Variable lógica que recuerda si ocurrió algo, ej. encontrado ← verdadero." },
      { q: "Inicialización de contadores/acumuladores", a: "Sumas: arrancar en 0. Productos (factorial): arrancar en 1. Siempre antes del bucle." },
      { q: "Esqueleto del factorial", a: "fact←1; Para i←1 Hasta n: fact←fact*i; Escribir fact." },
    ]
  },

  /* ===================================================================
     UNIDAD 4 — VECTORES (ARREGLOS)
     =================================================================== */
  {
    id: "vectores",
    glyph: "[ ]",
    title: "Vectores (Arreglos)",
    desc: "Estructura, carga y recorrido, conteo, búsqueda y ordenamiento (selección, burbuja, inserción).",
    tool: "sorting",
    html: `
      <p class="lead">Un <strong>vector</strong> (o arreglo) permite guardar <strong>muchos valores del mismo tipo</strong> bajo un solo nombre, accediendo a cada uno por su posición. Es la primera estructura de datos que se aprende.</p>

      <h2>¿Qué es un vector?</h2>
      <div class="callout def">
        <strong class="callout__tag">Definición</strong>
        Un <strong>vector</strong> es una colección <strong>ordenada y homogénea</strong> (todos del mismo tipo) de elementos, almacenados en posiciones consecutivas y accesibles mediante un <strong>índice</strong>.
      </div>
      <p>Cada casillero tiene un <strong>índice</strong> (su posición). Aquí lo numeramos desde <strong>0</strong>; un vector de \\(N\\) elementos va del índice \\(0\\) al \\(N-1\\).</p>
      <div class="tbl-wrap">
      <table class="tbl">
        <thead><tr><th>Índice</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead>
        <tbody><tr><th>Valor</th><td>12</td><td>7</td><td>25</td><td>3</td><td>9</td></tr></tbody>
      </table>
      </div>
      <p>Se accede a un elemento con <code>v[i]</code>. Por ejemplo, arriba <code>v[2]</code> vale <strong>25</strong>.</p>

      <h2>Carga y recorrido</h2>
      <p>Para recorrer un vector se usa casi siempre un bucle <strong>Para</strong> con el índice:</p>
      <div class="code-box"><span class="c-cmt">// cargar 5 números en el vector v</span>
<span class="c-kw">Para</span> i <span class="c-kw">←</span> <span class="c-num">0</span> <span class="c-kw">Hasta</span> <span class="c-num">4</span> <span class="c-kw">Hacer</span>
  <span class="c-kw">Leer</span> v[i]
<span class="c-kw">FinPara</span>

<span class="c-cmt">// mostrar todo el vector</span>
<span class="c-kw">Para</span> i <span class="c-kw">←</span> <span class="c-num">0</span> <span class="c-kw">Hasta</span> <span class="c-num">4</span> <span class="c-kw">Hacer</span>
  <span class="c-kw">Escribir</span> v[i]
<span class="c-kw">FinPara</span></div>

      <h2>Operaciones frecuentes</h2>
      <ul>
        <li><strong>Suma y promedio</strong>: acumular todos los elementos y dividir por \\(N\\).</li>
        <li><strong>Conteo</strong>: contar cuántos cumplen una condición (positivos, pares, etc.).</li>
        <li><strong>Búsqueda lineal</strong>: recorrer hasta encontrar un valor.</li>
        <li><strong>Máximo / mínimo</strong>: guardar el mayor (o menor) visto hasta el momento.</li>
      </ul>
      <div class="code-box"><span class="c-cmt">// promedio de un vector de N elementos</span>
suma <span class="c-kw">←</span> <span class="c-num">0</span>
<span class="c-kw">Para</span> i <span class="c-kw">←</span> <span class="c-num">0</span> <span class="c-kw">Hasta</span> N-<span class="c-num">1</span> <span class="c-kw">Hacer</span>
  suma <span class="c-kw">←</span> suma + v[i]
<span class="c-kw">FinPara</span>
promedio <span class="c-kw">←</span> suma / N</div>

      <h2>Algoritmos de ordenamiento</h2>
      <p>Ordenar es reacomodar los elementos de menor a mayor (o al revés). Tres métodos clásicos:</p>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Método</th><th>Idea central</th></tr></thead>
        <tbody>
          <tr><td><strong>Selección</strong></td><td>Buscar el menor del resto y ponerlo en su lugar; repetir.</td></tr>
          <tr><td><strong>Burbuja</strong></td><td>Comparar pares vecinos e intercambiarlos; los grandes «suben» al final.</td></tr>
          <tr><td><strong>Inserción</strong></td><td>Tomar cada elemento e insertarlo en su lugar dentro de la parte ya ordenada.</td></tr>
        </tbody>
      </table>
      </div>
      <h3>Método de la burbuja</h3>
      <div class="code-box"><span class="c-kw">Para</span> i <span class="c-kw">←</span> <span class="c-num">0</span> <span class="c-kw">Hasta</span> N-<span class="c-num">2</span> <span class="c-kw">Hacer</span>
  <span class="c-kw">Para</span> j <span class="c-kw">←</span> <span class="c-num">0</span> <span class="c-kw">Hasta</span> N-<span class="c-num">2</span>-i <span class="c-kw">Hacer</span>
    <span class="c-kw">Si</span> v[j] > v[j+<span class="c-num">1</span>] <span class="c-kw">Entonces</span>
      aux <span class="c-kw">←</span> v[j]
      v[j] <span class="c-kw">←</span> v[j+<span class="c-num">1</span>]
      v[j+<span class="c-num">1</span>] <span class="c-kw">←</span> aux
    <span class="c-kw">FinSi</span>
  <span class="c-kw">FinPara</span>
<span class="c-kw">FinPara</span></div>
      <div class="callout tip">
        <strong class="callout__tag">Mirá cómo ordenan</strong>
        El <a href="#/tool/sorting">Visualizador de ordenamiento</a> anima paso a paso la burbuja, la selección y la inserción para que <em>veas</em> las comparaciones e intercambios.
      </div>

      <h2>Insertar y eliminar</h2>
      <ul>
        <li><strong>Insertar en una posición</strong>: hay que «correr» los elementos posteriores una casilla a la derecha para hacer lugar.</li>
        <li><strong>Eliminar duplicados</strong>: por cada elemento, recorrer el resto y descartar las repeticiones.</li>
        <li><strong>Insertar manteniendo el orden</strong>: buscar la posición correcta y luego correr el resto.</li>
      </ul>
    `,
    quiz: [
      { q: "Un vector almacena elementos:", opts: ["De distinto tipo cada uno", "Del mismo tipo (homogéneos)", "Solo de texto", "Sin orden"], a: 1, exp: "Es una colección ordenada y homogénea." },
      { q: "Si un vector tiene N elementos y se indexa desde 0, el último índice es:", opts: ["N", "N+1", "N−1", "1"], a: 2, exp: "Va de 0 a N−1." },
      { q: "En el vector [12, 7, 25, 3, 9], ¿cuánto vale <code>v[2]</code>?", opts: ["7", "25", "3", "2"], a: 1, exp: "El índice 2 es el tercer elemento: 25." },
      { q: "¿Qué estructura se usa casi siempre para recorrer un vector?", opts: ["Si-Entonces", "Bucle Para con un índice", "Repetir una sola vez", "Según"], a: 1, exp: "Un Para que va del índice 0 a N−1." },
      { q: "Para calcular el promedio de un vector primero hay que:", opts: ["Ordenarlo", "Acumular la suma de todos sus elementos", "Buscar el máximo", "Invertirlo"], a: 1, exp: "Sumar todo y dividir por N." },
      { q: "La idea del método de SELECCIÓN es:", opts: ["Comparar vecinos e intercambiar", "Buscar el menor del resto y ubicarlo en su lugar", "Insertar en la parte ordenada", "Dividir el vector"], a: 1, exp: "Selecciona el mínimo de lo que falta y lo coloca." },
      { q: "La idea del método de la BURBUJA es:", opts: ["Buscar el mínimo", "Comparar pares vecinos e intercambiarlos", "Partir el vector a la mitad", "Insertar ordenado"], a: 1, exp: "Compara v[j] con v[j+1] e intercambia; los grandes suben." },
      { q: "Para intercambiar dos elementos de un vector necesito:", opts: ["Sumarlos", "Una variable auxiliar (aux)", "Ordenar primero", "Multiplicarlos"], a: 1, exp: "aux guarda uno temporalmente para no perder su valor." },
      { q: "Para INSERTAR un elemento en una posición intermedia hay que:", opts: ["Borrar el vector", "Correr los elementos posteriores una casilla", "Ordenar de mayor a menor", "Cambiar el tipo de dato"], a: 1, exp: "Se desplazan a la derecha para hacer lugar." },
      { q: "La búsqueda lineal consiste en:", opts: ["Recorrer el vector hasta encontrar el valor", "Dividir el vector en dos", "Ordenar y comparar el del medio", "Sumar todos los valores"], a: 0, exp: "Recorre elemento por elemento hasta hallarlo." },
    ],
    cards: [
      { q: "¿Qué es un vector (arreglo)?", a: "Colección ordenada y homogénea de elementos del mismo tipo, accesibles por un índice." },
      { q: "Rango de índices de un vector de N elementos", a: "De 0 a N−1 (si se indexa desde 0)." },
      { q: "¿Cómo se accede a un elemento?", a: "Con v[i], donde i es el índice (la posición)." },
      { q: "¿Cómo se recorre un vector?", a: "Con un bucle Para que va del índice 0 hasta N−1." },
      { q: "Promedio de un vector", a: "Acumular la suma de todos los elementos y dividir por N." },
      { q: "Método de selección", a: "Buscar el menor del resto del vector y colocarlo en su posición; repetir." },
      { q: "Método de la burbuja", a: "Comparar pares vecinos e intercambiarlos; los mayores se desplazan al final." },
      { q: "Método de inserción", a: "Tomar cada elemento e insertarlo en su lugar dentro de la parte ya ordenada." },
      { q: "Intercambiar dos elementos", a: "aux←v[j]; v[j]←v[j+1]; v[j+1]←aux. Se necesita una variable auxiliar." },
      { q: "Insertar en una posición intermedia", a: "Correr los elementos posteriores una casilla a la derecha para hacer lugar." },
    ]
  },

  ]
};
