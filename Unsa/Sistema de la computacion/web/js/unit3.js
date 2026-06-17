/* ============================================================
   UNIDAD 3 — Organización de la Computadora (CPU + Ensamblador 8086)
   ============================================================ */
window.APP_DATA.units.push({
  id: "organizacion",
  glyph: "µP",
  title: "Organización de la Computadora",
  desc: "Cómo se estructura la CPU por dentro y cómo programarla en ensamblador 8086.",
  tool: "ensamblador",
  html: `
<p class="lead">Esta unidad abre la CPU y mira sus piezas: registros, ruta de datos, unidad de control y el ciclo que ejecuta cada instrucción. Después bajamos al lenguaje más cercano al hardware, el <strong>ensamblador 8086</strong>, para ver cómo esas ideas se vuelven código real.</p>

<h2>1. Organización vs. Arquitectura</h2>
<p>Conviene separar dos miradas distintas de una computadora:</p>
<div class="callout def"><strong class="callout__tag">Definición</strong> La <strong>arquitectura del conjunto de instrucciones (ISA)</strong> es lo que ve el programador o el compilador: el repertorio de instrucciones, los registros visibles y los modos de direccionamiento. Define <em>qué</em> hace la máquina. Es la interfaz entre el software y el hardware.</div>
<div class="callout def"><strong class="callout__tag">Definición</strong> La <strong>organización (o microarquitectura)</strong> describe <em>cómo</em> se implementa esa ISA: las ALU, los registros internos, los buses, la ruta de datos y la unidad de control.</div>
<p>Dos máquinas pueden compartir la misma ISA (ejecutar el mismo binario) pero tener organizaciones muy diferentes, por ejemplo una más barata y lenta y otra con más circuitos y más rápida.</p>

<h3>1.1 Modelo de Von Neumann</h3>
<p>El esquema clásico que aún seguimos hoy organiza la máquina en tres bloques conectados por <strong>buses</strong>:</p>
<ul>
  <li><strong>CPU</strong>: unidad de control (UC) + unidad aritmético-lógica (ALU) + registros.</li>
  <li><strong>Memoria principal</strong>: guarda datos <em>y</em> programa (programa almacenado).</li>
  <li><strong>Entrada/Salida (E/S)</strong>.</li>
</ul>
<p>Los tres buses que los unen son:</p>
<ul>
  <li><strong>Bus de datos</strong>: transporta la información.</li>
  <li><strong>Bus de direcciones</strong>: indica <em>a qué</em> posición de memoria o E/S se accede.</li>
  <li><strong>Bus de control</strong>: señales de lectura/escritura, sincronización, interrupciones.</li>
</ul>

<h2>2. Ruta de datos (data path) y organización de la CPU</h2>
<div class="callout def"><strong class="callout__tag">Definición</strong> La <strong>ruta de datos (data path)</strong> es la parte de la CPU que contiene las ALU, los registros y los buses internos que los conectan. Su ciclo (leer registros → operar en la ALU → guardar el resultado) determina qué operaciones puede hacer la máquina.</div>
<p>Según <em>dónde</em> espera la CPU encontrar los operandos, hay tres organizaciones típicas:</p>
<div class="tbl-wrap"><table class="tbl tbl--left">
  <thead><tr><th>Organización</th><th>Idea</th><th>Ejemplo de instrucción</th></tr></thead>
  <tbody>
    <tr><td>Acumulador único</td><td>Un registro fijo (AC) es origen y destino implícito</td><td><code>ADD X</code> → AC ← AC + M[X]</td></tr>
    <tr><td>Registros de propósito general</td><td>Operandos en cualquier registro</td><td><code>ADD R1, R2, R3</code> → R1 ← R2 + R3</td></tr>
    <tr><td>Pila</td><td>Operandos en la cima de la pila</td><td><code>PUSH X</code> … <code>ADD</code></td></tr>
  </tbody>
</table></div>

<h2>3. Registros</h2>
<p>Los registros son memoria muy rápida dentro de la CPU. Hay de <strong>propósito general</strong> (los procesadores RISC suelen tener 32) y de <strong>propósito específico</strong>:</p>
<div class="tbl-wrap"><table class="tbl tbl--left">
  <thead><tr><th>Sigla</th><th>Nombre</th><th>Función</th></tr></thead>
  <tbody>
    <tr><td><strong>PC</strong></td><td>Contador de programa</td><td>Dirección de la <em>próxima</em> instrucción a ejecutar.</td></tr>
    <tr><td><strong>IR</strong></td><td>Registro de instrucción</td><td>Contiene la instrucción que se está ejecutando.</td></tr>
    <tr><td><strong>MAR</strong></td><td>Registro de dirección de memoria</td><td>Dirección a la que se va a acceder en memoria.</td></tr>
    <tr><td><strong>MBR / MDR</strong></td><td>Registro de datos / buffer de memoria</td><td>El dato que entra o sale de la memoria.</td></tr>
    <tr><td><strong>AC</strong></td><td>Acumulador</td><td>Operando y resultado de operaciones aritméticas.</td></tr>
    <tr><td><strong>SP</strong></td><td>Puntero de pila</td><td>Apunta a la cima de la pila.</td></tr>
    <tr><td><strong>PSW</strong></td><td>Registro de estado</td><td>Banderas e información de estado de la máquina.</td></tr>
  </tbody>
</table></div>
<h3>3.1 Banderas del PSW</h3>
<p>El <strong>PSW</strong> (Program Status Word) guarda bits que reflejan el resultado de la última operación:</p>
<ul>
  <li><strong>N</strong> (negativo / signo), <strong>Z</strong> (cero), <strong>V</strong> (overflow / desbordamiento), <strong>C</strong> (carry / acarreo).</li>
  <li><strong>A</strong> (acarreo auxiliar, bit 3) y <strong>P</strong> (paridad).</li>
  <li>Además bits de estado de máquina: modo <strong>kernel/usuario</strong>, traza y habilitación de interrupciones.</li>
</ul>
<div class="callout tip"><strong class="callout__tag">Ejemplo</strong> El Intel 8080 tenía 7 registros de propósito general (A como acumulador; B, C, D, E, H, L de 8 bits, agrupables en pares BC/DE/HL de 16 bits), un PC de 16, un SP de 16 y un registro F de banderas.</div>

<h2>4. Ciclo de instrucción</h2>
<p>La CPU repite sin parar el mismo ciclo. En su forma resumida son tres fases: <strong>Búsqueda → Decodificación → Ejecución</strong> (en inglés, <em>fetch-decode-execute</em>). Con más detalle:</p>
<ol>
  <li><strong>Búsqueda (fetch)</strong>: se trae la instrucción apuntada por PC y se copia al IR.</li>
  <li><strong>Actualizar PC</strong>: PC apunta a la siguiente instrucción.</li>
  <li><strong>Decodificar</strong>: la UC interpreta el código de operación (opcode).</li>
  <li><strong>Localizar operando</strong>: según el modo de direccionamiento.</li>
  <li><strong>Buscar operando</strong>: se lee de memoria o registro.</li>
  <li><strong>Ejecutar</strong>: la ALU/UC realiza la operación y guarda el resultado.</li>
  <li>Volver al paso 1.</li>
</ol>

<h2>5. Microprogramación</h2>
<p>Una CPU puede implementarse directamente en hardware o puede <strong>interpretarse</strong>: un programa interno trata los registros como variables y ejecuta cada instrucción paso a paso. Esto simplifica y abarata el diseño.</p>
<div class="callout def"><strong class="callout__tag">Definición</strong> Un <strong>microprograma</strong> es un conjunto de <strong>microinstrucciones</strong> (cada una formada por <strong>micro-operaciones</strong>) almacenado en una <strong>ROM de control</strong>, que describe cómo ejecutar cada instrucción de la ISA.</div>
<div class="tbl-wrap"><table class="tbl tbl--left">
  <thead><tr><th></th><th>Unidad de control cableada</th><th>Unidad de control microprogramada</th></tr></thead>
  <tbody>
    <tr><td>Implementación</td><td>Lógica fija (circuitos)</td><td>Microprograma en ROM de control (con µPC)</td></tr>
    <tr><td>Velocidad</td><td>Más rápida</td><td>Más lenta</td></tr>
    <tr><td>Flexibilidad</td><td>Rígida, difícil de modificar</td><td>Flexible, fácil de cambiar</td></tr>
    <tr><td>Se usa en</td><td>RISC</td><td>CISC</td></tr>
  </tbody>
</table></div>

<h2>6. Formato de instrucciones</h2>
<p>Una instrucción se divide en <strong>código de operación (opcode)</strong> + <strong>operandos</strong>. Según cuántas direcciones lleve:</p>
<div class="tbl-wrap"><table class="tbl tbl--left">
  <thead><tr><th>Direcciones</th><th>Ejemplo</th><th>Significado</th></tr></thead>
  <tbody>
    <tr><td>3</td><td><code>ADD R1, R2, R3</code></td><td>R1 ← R2 + R3</td></tr>
    <tr><td>2</td><td><code>ADD R1, R2</code></td><td>R1 ← R1 + R2</td></tr>
    <tr><td>1</td><td><code>ADD X</code></td><td>AC ← AC + M[X]</td></tr>
    <tr><td>0</td><td><code>ADD</code></td><td>cima ← cima + subcima (pila)</td></tr>
  </tbody>
</table></div>
<p>Por su función las instrucciones se clasifican en: <strong>transferencia de datos</strong>, <strong>manipulación</strong> (aritméticas, lógicas, de corrimiento) y <strong>control de programa</strong> (comparación, bifurcación). Son <strong>diádicas</strong> si usan dos operandos y <strong>monoádicas</strong> si usan uno (NOT, shift, CLR, INC, NEG). La longitud puede ser fija o variable.</p>
<div class="callout tip"><strong class="callout__tag">Cálculos</strong>
  <ul>
    <li>Instrucciones por palabra = bits de la palabra / bits de la instrucción.</li>
    <li>Bits de opcode = \\(\\log_2(\\text{nº de operaciones})\\).</li>
    <li>Bits de dirección = \\(\\log_2(\\text{posiciones direccionables})\\).</li>
  </ul>
</div>

<h2>7. Modos de direccionamiento</h2>
<p>Indican <em>dónde</em> está el operando:</p>
<div class="tbl-wrap"><table class="tbl tbl--left">
  <thead><tr><th>Modo</th><th>El operando está…</th><th>Ejemplo</th></tr></thead>
  <tbody>
    <tr><td>Inmediato</td><td>en la propia instrucción</td><td>Cargar AC, 345 → AC = 345</td></tr>
    <tr><td>Directo</td><td>en memoria, la instrucción trae su dirección</td><td>AC ← M[345]</td></tr>
    <tr><td>Registro</td><td>en un registro</td><td>AC ← R1</td></tr>
    <tr><td>Indirecto por registro</td><td>en memoria; un registro guarda su dirección</td><td>AC ← M[R1]</td></tr>
    <tr><td>Indirecto (memoria)</td><td>la dirección apunta a otra que tiene la dirección real</td><td>AC ← M[M[345]]</td></tr>
    <tr><td>Indexado</td><td>índice + dirección</td><td>M[índice + 345]</td></tr>
    <tr><td>Registro base</td><td>base + dirección</td><td>M[base + 345]</td></tr>
    <tr><td>Relativo</td><td>PC + dirección</td><td>M[PC + d]</td></tr>
    <tr><td>Base + índice</td><td>suma de dos registros (+ desplazamiento)</td><td>M[base + índice]</td></tr>
  </tbody>
</table></div>

<h2>8. CISC vs. RISC, pipeline y paralelismo</h2>
<div class="tbl-wrap"><table class="tbl tbl--left">
  <thead><tr><th></th><th>CISC</th><th>RISC</th></tr></thead>
  <tbody>
    <tr><td>Nº de instrucciones</td><td>100–350</td><td>menos de 100, simples (1 palabra)</td></tr>
    <tr><td>CPI (ciclos/instrucción)</td><td>1–20</td><td>1</td></tr>
    <tr><td>Modos de direccionamiento</td><td>5–20</td><td>3–5</td></tr>
    <tr><td>Unidad de control</td><td>microprogramada (ROM)</td><td>cableada</td></tr>
    <tr><td>Registros</td><td>pocos</td><td>muchos</td></tr>
    <tr><td>Pipeline</td><td>difícil</td><td>natural</td></tr>
    <tr><td>Ejemplos</td><td>Intel i386, Motorola 68000</td><td>ARM, MIPS, SPARC</td></tr>
  </tbody>
</table></div>
<p>Más del 90% de los teléfonos móviles usan procesadores RISC (ARM).</p>
<div class="callout def"><strong class="callout__tag">Definición</strong> El <strong>pipeline</strong> divide el ciclo de instrucción en etapas para solapar varias instrucciones a la vez (como una línea de montaje). Un ejemplo de 5 etapas: búsqueda → decodificación → búsqueda de operandos → ejecución → escritura.</div>
<p>Un procesador <strong>superescalar</strong> ejecuta más de una instrucción por ciclo (el Pentium tenía 2 pipelines). El paralelismo aparece a nivel de instrucción (pipeline) y a nivel de procesador (multiprocesadores, multicomputadoras).</p>

<h2>9. Cálculos típicos</h2>
<ul>
  <li><strong>Capacidad de direccionamiento</strong>: un bus de direcciones de <em>n</em> bits direcciona \\(2^{n}\\) posiciones. Tamaño de memoria = \\(2^{n} \\times\\) tamaño de cada posición.</li>
  <li>El <strong>8086/88</strong> tiene bus de datos de 16 bits y bus de direcciones de 20 bits → \\(2^{20} = 1\\) Mbyte direccionable.</li>
  <li><strong>Segmentación del 8086</strong>: dirección física = segmento × 16 + offset (los segmentos son de 64 K).</li>
  <li><strong>MIPS</strong> (millones de instrucciones por segundo) = frecuencia de reloj / (CPI × \\(10^{6}\\)).</li>
</ul>

<h2>10. Ensamblador 8086/88</h2>
<p>El ensamblador es el lenguaje que se traduce casi directamente a instrucciones de máquina. Podés practicar con el <a href="#/tool/ensamblador">simulador 8086</a> de esta plataforma.</p>

<h3>10.1 Tamaños y little-endian</h3>
<ul>
  <li>4 bits = <strong>nibble</strong>; 8 bits = <strong>byte</strong>; 16 bits = <strong>word</strong> (palabra); 32 bits = <strong>dword</strong>.</li>
</ul>
<div class="callout def"><strong class="callout__tag">Little-endian</strong> El 8086 almacena el byte <em>menos</em> significativo en la dirección más baja. El valor 0x1122 se guarda como: dirección baja = 22, dirección alta = 11.</div>

<h3>10.2 Registros del 8086</h3>
<p><strong>De datos (16 bits, con mitades alta/baja AH/AL, etc.):</strong></p>
<div class="tbl-wrap"><table class="tbl tbl--left">
  <thead><tr><th>Registro</th><th>Mitades</th><th>Uso principal</th></tr></thead>
  <tbody>
    <tr><td><strong>AX</strong> (acumulador)</td><td>AH / AL</td><td>Único registro con el que se hacen <code>MUL</code> y <code>DIV</code>.</td></tr>
    <tr><td><strong>BX</strong> (base)</td><td>BH / BL</td><td>Dirección base para acceder a memoria.</td></tr>
    <tr><td><strong>CX</strong> (contador)</td><td>CH / CL</td><td>Contador en bucles; CL = nº de desplazamientos en shift/rotate.</td></tr>
    <tr><td><strong>DX</strong> (datos)</td><td>DH / DL</td><td>Datos; parte alta en multiplicaciones/divisiones de 16 bits.</td></tr>
  </tbody>
</table></div>
<p><strong>De segmento (16 bits):</strong> <code>CS</code> (código), <code>DS</code> (datos), <code>ES</code> (extra), <code>SS</code> (pila).</p>
<p><strong>De índice/puntero:</strong> <code>IP</code> (puntero de instrucción, con CS), <code>SI</code> (origen), <code>DI</code> (destino), <code>SP</code> (pila, con SS), <code>BP</code> (base de pila).</p>
<p><strong>Banderas (FLAGS):</strong> OF (overflow), DF (dirección), IF (interrupción), TF (trampa/traza), SF (signo), ZF (cero), AF (acarreo auxiliar), PF (paridad), CF (acarreo).</p>

<h3>10.3 Modos de direccionamiento del 8086</h3>
<p>Con la sintaxis <code>MOV destino, origen</code>:</p>
<pre class="code">; 1. Registro          -> origen y destino son registros
MOV AX, BX

; 2. Inmediato         -> el dato va en la instruccion
MOV AX, 500

; 3. Directo           -> [direccion] entre corchetes
MOV BX, [1000]

; 4. Indirecto por registro
MOV AX, [BX]

; 5. Base (con desplazamiento)
MOV AX, [BP+2]

; 6. Indexado
MOV AX, TABLA[DI]

; 7. Base + indice
MOV AX, TABLA[BX][DI]</pre>

<h3>10.4 Juego de instrucciones</h3>
<h4>Transferencia de datos</h4>
<ul>
  <li><code>MOV</code>: copia un valor (no puede tener ambos operandos en memoria).</li>
  <li><code>XCHG</code>: intercambia los contenidos.</li>
  <li><code>LEA</code>: carga la dirección efectiva (no el contenido).</li>
  <li><code>PUSH</code> / <code>POP</code>: meter/sacar de la pila; <code>PUSHF</code>/<code>POPF</code>, <code>LAHF</code>/<code>SAHF</code> para las banderas.</li>
</ul>
<h4>Aritméticas</h4>
<ul>
  <li><code>ADD</code>, <code>ADC</code> (con acarreo), <code>SUB</code>, <code>SBB</code> (con préstamo), <code>NEG</code> (cambia el signo).</li>
  <li><code>MUL</code>/<code>IMUL</code>: AX × operando → AX (8 bits) o DX:AX (16 bits).</li>
  <li><code>DIV</code>/<code>IDIV</code>: cociente en AL/AX, resto en AH/DX.</li>
  <li><code>INC</code>, <code>DEC</code>.</li>
  <li><code>CMP</code>: resta destino − origen <em>sin guardar</em> el resultado; solo afecta las banderas.</li>
  <li><code>CBW</code>/<code>CWD</code>: extensión de signo; <code>DAA</code>/<code>DAS</code>: ajuste decimal.</li>
</ul>
<h4>Lógicas</h4>
<ul>
  <li><code>AND</code>, <code>OR</code>, <code>XOR</code>, <code>NOT</code>.</li>
  <li><code>TEST</code>: hace un AND <em>sin guardar</em>; solo afecta banderas.</li>
</ul>
<h4>Corrimiento y rotación</h4>
<ul>
  <li><code>SHL</code>/<code>SAL</code> (multiplica por 2), <code>SHR</code> (divide por 2), <code>SAR</code> (aritmético, conserva el signo).</li>
  <li><code>ROL</code>, <code>ROR</code>, <code>RCL</code>, <code>RCR</code> (rotaciones, las dos últimas pasan por el carry).</li>
</ul>
<h4>Control de programa</h4>
<ul>
  <li><code>JMP</code>: salto incondicional.</li>
  <li>Saltos condicionales sin signo: <code>JA</code>, <code>JB</code>, <code>JAE</code>, <code>JBE</code>; con signo: <code>JG</code>, <code>JL</code>, <code>JGE</code>, <code>JLE</code>.</li>
  <li>Igualdad: <code>JE</code>/<code>JZ</code>, <code>JNE</code>/<code>JNZ</code>; por bit: <code>JC</code>, <code>JNC</code>, <code>JO</code>, <code>JS</code>, <code>JP</code>.</li>
  <li><code>CALL</code>/<code>RET</code>: llamar y volver de subrutinas.</li>
  <li><code>LOOP</code>: decrementa CX y salta si CX ≠ 0; <code>LOOPE</code>/<code>LOOPNE</code>, <code>JCXZ</code>.</li>
</ul>
<h4>Cadenas y otras</h4>
<ul>
  <li><code>REP</code>/<code>REPE</code>/<code>REPNE</code> + <code>MOVS</code>, <code>CMPS</code>, <code>SCAS</code>, <code>LODS</code>, <code>STOS</code>.</li>
  <li>E/S: <code>IN</code>, <code>OUT</code>. Otras: <code>HLT</code>, <code>NOP</code>, <code>CLC</code>/<code>STC</code>, <code>CLI</code>/<code>STI</code>, <code>CLD</code>/<code>STD</code>.</li>
</ul>

<h3>10.5 Directivas y estructura de un programa</h3>
<ul>
  <li><code>.MODEL</code> (TINY / SMALL / MEDIUM / COMPACT / LARGE): tamaño del modelo de memoria.</li>
  <li><code>.STACK n</code>: reserva la pila; <code>.DATA</code>: segmento de datos; <code>.CODE</code>: segmento de código; termina con <code>END</code>.</li>
  <li>Inicializar DS al arrancar: <code>MOV AX, @DATA</code> seguido de <code>MOV DS, AX</code>.</li>
  <li><code>PROC</code>/<code>ENDP</code>: procedimientos. <code>EQU</code>: constantes. <code>DB</code>/<code>DW</code>/<code>DD</code>: reservar byte/word/dword. <code>n DUP(?)</code>: reservar n posiciones.</li>
  <li>Las etiquetas terminan en <code>:</code> y los comentarios empiezan con <code>;</code>.</li>
</ul>
<p>Programa de ejemplo completo:</p>
<pre class="code">.MODEL SMALL
.STACK 100H

.DATA
   max   EQU 100
   cad   DB  max DUP(?)    ; reserva 100 bytes sin inicializar
   J     DW  ?
   F     DW  20

.CODE
inicio:
   MOV AX, @DATA           ; carga la direccion del segmento de datos
   MOV DS, AX              ; e inicializa DS

   MOV AX, F              ; AX = 20
   ADD AX, 34             ; AX = AX + 34 = 54
   MOV J, AX             ; J = 54

   MOV AX, 5
   ADD AX, 3             ; AX = 8

   MOV AX, 4C00H          ; funcion 4Ch del DOS
   INT 21H               ; terminar el programa
   END inicio</pre>

<h3>10.6 Interrupciones</h3>
<div class="callout def"><strong class="callout__tag">Trampa</strong> Es una condición excepcional generada por el propio programa (overflow, división por cero, instrucción inválida). Es <strong>síncrona</strong>: ocurre siempre en el mismo punto.</div>
<div class="callout warn"><strong class="callout__tag">Interrupción</strong> Tiene una causa <em>externa</em> (teclado, disco, reloj). Es <strong>asíncrona</strong>, la gestiona el controlador de interrupciones según prioridades, y la atiende una <strong>ISR</strong> (rutina de servicio de interrupción).</div>
<p>En ambos casos la CPU guarda el estado, salta a la rutina correspondiente y, al terminar, vuelve a donde estaba.</p>
`,
  quiz: [
    {
      q: "¿Qué registro contiene la dirección de la próxima instrucción a ejecutar?",
      opts: ["IR (registro de instrucción)", "PC (contador de programa)", "MAR (registro de direcciones)", "SP (puntero de pila)"],
      a: 1,
      exp: "El PC (contador de programa) apunta siempre a la próxima instrucción; el IR guarda la que se está ejecutando."
    },
    {
      q: "Las tres fases resumidas del ciclo de instrucción son:",
      opts: ["Leer, escribir, borrar", "Búsqueda, decodificación, ejecución", "Compilar, ensamblar, enlazar", "Entrada, proceso, salida"],
      a: 1,
      exp: "El ciclo es fetch-decode-execute: búsqueda de la instrucción, decodificación del opcode y ejecución."
    },
    {
      q: "¿Cuál es una característica propia de un procesador RISC frente a uno CISC?",
      opts: ["Unidad de control microprogramada", "Cientos de instrucciones complejas", "Pocos modos de direccionamiento, control cableado y muchos registros", "CPI muy alto (1 a 20)"],
      a: 2,
      exp: "RISC: menos de 100 instrucciones simples, CPI ≈ 1, 3–5 modos, unidad de control cableada y muchos registros (ARM, MIPS)."
    },
    {
      q: "En la instrucción MOV AX, [BX], ¿qué modo de direccionamiento se usa para el origen?",
      opts: ["Inmediato", "Directo", "Indirecto por registro", "Registro"],
      a: 2,
      exp: "BX entre corchetes significa que BX contiene la dirección del operando: direccionamiento indirecto por registro."
    },
    {
      q: "En el 8086, ¿con qué registro se realizan obligatoriamente las operaciones MUL y DIV?",
      opts: ["BX", "AX (el acumulador)", "DX", "SP"],
      a: 1,
      exp: "AX es el acumulador; MUL/DIV lo usan siempre (el resultado de 16 bits queda en DX:AX)."
    },
    {
      q: "¿Qué hace la instrucción CMP destino, origen?",
      opts: ["Copia el origen en el destino", "Resta origen del destino y guarda el resultado", "Resta sin guardar el resultado, solo afecta las banderas", "Multiplica destino por origen"],
      a: 2,
      exp: "CMP hace destino − origen pero descarta el resultado; solo actualiza las banderas, para luego saltar condicionalmente."
    },
    {
      q: "El valor 0x1122 almacenado en memoria little-endian queda como:",
      opts: ["dirección baja = 11, alta = 22", "dirección baja = 22, alta = 11", "todo en una sola dirección", "depende del compilador"],
      a: 1,
      exp: "En little-endian el byte menos significativo (22) va en la dirección más baja y el más significativo (11) en la alta."
    },
    {
      q: "Un bus de direcciones de n bits permite direccionar cuántas posiciones?",
      opts: ["n posiciones", "2·n posiciones", "n² posiciones", "2^n posiciones"],
      a: 3,
      exp: "Con n líneas de dirección hay 2^n combinaciones, por eso se direccionan 2^n posiciones (el 8086 con 20 bits direcciona 2^20 = 1 MB)."
    },
    {
      q: "¿Qué diferencia hay entre la arquitectura (ISA) y la organización de una computadora?",
      opts: ["Son sinónimos", "La ISA define qué hace la máquina; la organización, cómo se implementa", "La organización la ve el programador; la ISA no", "La ISA es el hardware; la organización el software"],
      a: 1,
      exp: "La ISA es la interfaz visible (qué instrucciones/registros hay); la organización o microarquitectura es cómo se construye internamente."
    },
    {
      q: "¿Cómo se calcula la dirección física en la segmentación del 8086?",
      opts: ["segmento + offset", "segmento × 16 + offset", "segmento × offset", "offset − segmento"],
      a: 1,
      exp: "Dirección física = segmento × 16 + offset; el segmento se desplaza 4 bits (×16) y se le suma el desplazamiento."
    },
    {
      q: "¿Qué describe mejor una unidad de control microprogramada?",
      opts: ["Lógica fija cableada, muy rápida, típica de RISC", "Usa un microprograma en ROM de control; flexible, típica de CISC", "No existe en CPUs reales", "Es exclusiva de la memoria principal"],
      a: 1,
      exp: "La UC microprogramada interpreta cada instrucción mediante microinstrucciones en una ROM de control: más flexible pero más lenta, propia de CISC."
    }
  ],
  cards: [
    { q: "¿Qué es la ISA (arquitectura del conjunto de instrucciones)?", a: "Lo que ve el programador/compilador: instrucciones, registros visibles y modos de direccionamiento. Define QUÉ hace la máquina; es la interfaz software-hardware." },
    { q: "¿Qué es la organización o microarquitectura?", a: "CÓMO se implementa la ISA: ALU, registros internos, buses, ruta de datos y unidad de control." },
    { q: "¿Para qué sirven el MAR y el MBR/MDR?", a: "MAR guarda la dirección de memoria a la que se va a acceder; MBR/MDR guarda el dato que entra o sale de la memoria." },
    { q: "¿Cuáles son las banderas del PSW?", a: "N (negativo/signo), Z (cero), V (overflow), C (carry), más A (acarreo auxiliar) y P (paridad), y bits de estado de máquina." },
    { q: "¿Qué hace LEA en el 8086?", a: "Carga la dirección efectiva (la dirección) de un operando en un registro, no su contenido. Ej: LEA SI, TABLA." },
    { q: "¿Diferencia entre control cableado y microprogramado?", a: "Cableado: lógica fija, rápido, RISC. Microprogramado: microinstrucciones en ROM de control, flexible pero más lento, CISC." },
    { q: "¿Qué hace TEST y en qué se parece a CMP?", a: "TEST hace un AND sin guardar el resultado (solo afecta banderas), igual que CMP hace una resta sin guardar el resultado." },
    { q: "¿Qué registros de segmento tiene el 8086?", a: "CS (código), DS (datos), ES (extra) y SS (pila), todos de 16 bits." },
    { q: "¿Qué hace la instrucción LOOP?", a: "Decrementa CX y salta a la etiqueta indicada mientras CX sea distinto de 0; se usa para bucles." },
    { q: "¿Trampa vs. interrupción?", a: "Trampa: excepción síncrona del propio programa (overflow, división por cero). Interrupción: causa externa asíncrona, atendida por una ISR según prioridades." }
  ]
});
