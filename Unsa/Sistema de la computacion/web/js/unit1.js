window.APP_DATA.units.push({
  id: "intro",
  glyph: "⌗",
  title: "Introducción a los Sistemas de Computación",
  desc: "Qué es una computadora, la máquina multinivel, Von Neumann, generaciones, supercomputadoras y RISC vs CISC.",
  tool: null,
  html: `
<p class="lead">Esta unidad presenta las ideas fundamentales para entender qué es un sistema de computación: cómo una máquina ejecuta programas, cómo se organiza en niveles que van del hardware al lenguaje de alto nivel, cómo evolucionó a lo largo de las generaciones, y cuáles son los grandes modelos de arquitectura (Von Neumann, Harvard, RISC, CISC) que siguen vigentes hoy.</p>

<h2>1. La computadora</h2>
<p>Una <strong>computadora digital</strong> es una máquina que resuelve problemas ejecutando <strong>instrucciones</strong> (programas) que recibe de las personas. Un <strong>programa</strong> es simplemente un conjunto de instrucciones que indican a la máquina qué hacer, paso a paso.</p>

<div class="callout def"><strong class="callout__tag">Definición</strong> El <strong>lenguaje de máquina</strong> (también llamado nivel <code>L0</code>) es el único lenguaje que el hardware entiende directamente: una secuencia de números en binario.</div>

<p>Programar directamente en binario es tedioso y muy propenso a errores. Por eso se inventaron lenguajes de más alto nivel, más cercanos al ser humano. Pero la máquina sigue ejecutando solo binario, así que esos lenguajes deben convertirse a <code>L0</code> de alguna forma.</p>

<h3>1.1 Traducción vs Interpretación</h3>
<p>Existen dos estrategias para llevar un programa escrito en un lenguaje <code>L1</code> hasta el lenguaje de máquina <code>L0</code>:</p>

<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Aspecto</th><th>Traducción</th><th>Interpretación</th></tr></thead>
<tbody>
<tr><td>Cómo funciona</td><td>Sustituye todo el programa <code>L1</code> por instrucciones equivalentes en <code>L0</code>, generando un programa ejecutable completo que luego se ejecuta.</td><td>Toma cada instrucción <code>L1</code>, la sustituye por instrucciones <code>L0</code> y la ejecuta de inmediato, sin generar un programa nuevo.</td></tr>
<tr><td>Quién lo hace</td><td>Un <strong>traductor</strong></td><td>Un <strong>intérprete</strong></td></tr>
<tr><td>Ejecuta…</td><td>Después de traducir todo</td><td>Línea por línea, sobre la marcha</td></tr>
<tr><td>Ejemplos</td><td>C, C++, Pascal</td><td>PHP, Python, JavaScript</td></tr>
</tbody>
</table>
</div>

<ul>
  <li><strong>Compilador:</strong> traductor que pasa todo el programa fuente a un programa objeto/ejecutable; luego ese ejecutable se corre.</li>
  <li><strong>Intérprete:</strong> lee y ejecuta el programa línea por línea, sin producir un ejecutable independiente.</li>
  <li><strong>Ensamblador:</strong> traductor que convierte el lenguaje ensamblador en lenguaje de máquina.</li>
</ul>

<div class="callout tip"><strong class="callout__tag">Dato</strong> Java usa una estrategia mixta: se <em>compila</em> a <strong>bytecode</strong> (un lenguaje intermedio independiente de la plataforma) que luego <em>interpreta</em> la Máquina Virtual de Java (JVM). Por eso "compila una vez, ejecuta en cualquier lado".</div>

<h2>2. Organización estructurada: la máquina multinivel</h2>
<p>No se construye una máquina que entienda C directamente, porque sería demasiado compleja y costosa. En su lugar, las computadoras se diseñan como una serie de <strong>niveles</strong>: cada nivel se construye sobre el inferior, traduciendo o interpretando hasta llegar al hardware.</p>

<div class="callout def"><strong class="callout__tag">Definición</strong> Cada nivel <code>Mn</code> con su lenguaje <code>Ln</code> es una <strong>máquina virtual (o hipotética)</strong>. Solo el nivel 0 es hardware real; los demás son una "ilusión" útil para el programador.</div>

<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Nivel</th><th>Nombre</th><th>Cómo se implementa</th></tr></thead>
<tbody>
<tr><td>5</td><td>Lenguaje de alto nivel</td><td>Traducción (compilador): C, C++, Java, Python</td></tr>
<tr><td>4</td><td>Lenguaje ensamblador</td><td>Traducción (ensamblador)</td></tr>
<tr><td>3</td><td>Sistema operativo</td><td>Interpretación parcial (SO)</td></tr>
<tr><td>2</td><td>ISA — Arquitectura del Conjunto de Instrucciones</td><td>Microprograma o ejecución directa (frontera HW/SW)</td></tr>
<tr><td>1</td><td>Microarquitectura</td><td>Hardware (data path, registros, ALU)</td></tr>
<tr><td>0</td><td>Lógica digital</td><td>Hardware (compuertas, biestables)</td></tr>
<tr><td>-1</td><td>Dispositivos (transistores)</td><td>Hardware (fuera del alcance de estudio)</td></tr>
</tbody>
</table>
</div>

<ul>
  <li>En el <strong>nivel 4</strong> (ensamblador) el usuario típico es el <strong>programador de sistemas</strong>.</li>
  <li>En el <strong>nivel 5</strong> (alto nivel) el usuario típico es el <strong>programador de aplicaciones</strong>.</li>
</ul>

<h3>2.1 Arquitectura, organización e implementación</h3>
<div class="callout warn"><strong class="callout__tag">Cuidado</strong> Según Tanenbaum, los términos <strong>"arquitectura"</strong> y <strong>"organización"</strong> significan lo mismo. Lo que <em>no</em> hay que confundir es la arquitectura con la <strong>implementación</strong>: la arquitectura es <em>qué</em> hace la máquina (lo que el programador ve), mientras que la implementación es <em>cómo</em> se construye con una tecnología concreta.</div>

<h2>3. Generaciones de computadoras</h2>
<p>La historia del hardware suele dividirse en generaciones según la tecnología dominante:</p>

<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Generación</th><th>Período</th><th>Tecnología</th></tr></thead>
<tbody>
<tr><td>Cero</td><td>1642–1945</td><td>Mecánicas</td></tr>
<tr><td>Primera</td><td>1945–1955</td><td>Tubos de vacío (válvulas)</td></tr>
<tr><td>Segunda</td><td>1955–1965</td><td>Transistores</td></tr>
<tr><td>Tercera</td><td>1965–1980</td><td>Circuitos integrados</td></tr>
<tr><td>Cuarta</td><td>1980–?</td><td>VLSI (integración de muy alta escala)</td></tr>
<tr><td>Quinta</td><td>—</td><td>Cambio de paradigma</td></tr>
</tbody>
</table>
</div>

<h3>3.1 Hitos importantes</h3>
<ul>
  <li><strong>1834</strong> — Máquina analítica (Babbage).</li>
  <li><strong>1936</strong> — Z1 (Zuse).</li>
  <li><strong>1943</strong> — COLOSSUS, la primera electrónica.</li>
  <li><strong>1944</strong> — Mark I (Aiken).</li>
  <li><strong>1946</strong> — ENIAC (Eckert y Mauchley).</li>
  <li><strong>1949</strong> — <strong>EDSAC (Wilkes): primera computadora de programa almacenado</strong>, primera implementación real del modelo de Von Neumann.</li>
  <li><strong>1952</strong> — IAS (Von Neumann).</li>
  <li><strong>1960</strong> — PDP-1, primera minicomputadora.</li>
  <li><strong>1964</strong> — CDC 6600, primera supercomputadora científica.</li>
  <li><strong>1974</strong> — Intel 8080 (primer chip de propósito general de 8 bits) y CRAY-1 (primera supercomputadora vectorial).</li>
  <li><strong>1981</strong> — IBM PC.</li>
  <li><strong>1985</strong> — MIPS, primera RISC comercial.</li>
</ul>

<div class="callout tip"><strong class="callout__tag">Recordá</strong> Si te preguntan por la <strong>primera computadora de programa almacenado</strong>, la respuesta es <strong>EDSAC (1949)</strong>.</div>

<h2>4. Arquitectura de Von Neumann</h2>
<p>Diseñada por John von Neumann y colaboradores en 1945, su principio central es el <strong>programa almacenado</strong>: las instrucciones y los datos se guardan juntos en la misma memoria.</p>

<div class="callout def"><strong class="callout__tag">Definición</strong> <strong>Programa almacenado:</strong> tanto las instrucciones del programa como los datos sobre los que opera residen en la misma memoria principal y se representan de la misma manera (en binario).</div>

<h3>4.1 Componentes</h3>
<ul>
  <li><strong>Dispositivo de entrada.</strong></li>
  <li><strong>CPU</strong>, formada por: Unidad de Control (UC) + Unidad Aritmético-Lógica (ALU) + Registros.</li>
  <li><strong>Memoria principal</strong>, que guarda instrucciones y datos.</li>
  <li><strong>Dispositivo de salida.</strong></li>
</ul>

<h3>4.2 Los 3 buses</h3>
<p>La memoria se comunica con la CPU a través de tres buses:</p>
<ol>
  <li><strong>Bus de control</strong></li>
  <li><strong>Bus de direcciones</strong></li>
  <li><strong>Bus de datos e instrucciones</strong></li>
</ol>

<div class="callout warn"><strong class="callout__tag">Cuello de botella</strong> El <strong>cuello de botella de Von Neumann</strong>: como existe un único bus compartido entre la CPU y la memoria, las instrucciones y los datos no se pueden transferir al mismo tiempo, lo que limita la velocidad del sistema.</div>

<h3>4.3 Arquitectura Harvard</h3>
<p>La <strong>arquitectura Harvard</strong> separa físicamente la <strong>memoria de instrucciones</strong> (tipo ROM) de la <strong>memoria de datos</strong> (tipo RAM), y le da a cada una su propio bus.</p>
<ul>
  <li><strong>Ventaja:</strong> la CPU accede a ambas memorias simultáneamente, lo que aumenta la velocidad y resuelve el cuello de botella de Von Neumann.</li>
  <li><strong>Uso típico:</strong> microcontroladores y DSP (procesadores de señales).</li>
  <li><strong>Origen del nombre:</strong> la IBM "Harvard Mark 1".</li>
</ul>

<h2>5. Ley de Moore y tipos de computadoras</h2>
<div class="callout def"><strong class="callout__tag">Definición</strong> <strong>Ley de Moore:</strong> el número de transistores que caben en un circuito integrado se duplica aproximadamente cada 2 años.</div>

<div class="callout tip"><strong class="callout__tag">Dato</strong> <strong>Primera Ley del software de Nathan:</strong> "el software es un gas; se expande hasta llenar el contenedor". Es decir, el software siempre crece para consumir todo el hardware disponible.</div>

<h3>5.1 Tipos de computadoras (de menor a mayor capacidad)</h3>
<ol>
  <li><strong>Computadoras descartables:</strong> etiquetas <code>RFID</code> y tarjetas inteligentes (smart cards). Una etiqueta RFID es un tag con chip + antena que dialoga con un lector. Una smart card típica tiene una CPU de 8 bits, ROM con su sistema operativo, 256–512 B de RAM y memoria EEPROM.</li>
  <li><strong>Computadoras embebidas:</strong> microcontroladores, Raspberry Pi, Arduino. Tienen propósito específico y recursos limitados, y suelen usar arquitectura Harvard. Un microcontrolador integra oscilador, CPU, ALU, RAM, memoria Flash y puertos de E/S. Aplicaciones: electrónica de consumo, automotriz (ECUs), industria (SCADA), salud y aeroespacial.</li>
  <li><strong>Computadoras móviles:</strong> smartphones y tablets.</li>
  <li><strong>Computadoras personales / portátiles.</strong></li>
  <li><strong>Servidores:</strong> optimizados para muchos usuarios, alta disponibilidad, funcionamiento 24/7 y hardware redundante. Un <strong>clúster</strong> es un conjunto de servidores que trabajan como si fueran un solo sistema.</li>
  <li><strong>Mainframes y supercomputadoras.</strong></li>
</ol>

<h2>6. Supercomputadoras (HPC)</h2>
<div class="callout def"><strong class="callout__tag">Definición</strong> Una <strong>supercomputadora</strong> es un conjunto de computadoras muy poderosas unidas para aumentar la potencia y el rendimiento con fines específicos. También se las llama "Computadoras de Alta Prestación" (HPC).</div>

<p>El rendimiento se mide en <strong>FLOPS</strong> (Floating-point Operations Per Second, operaciones de punto flotante por segundo). Sus múltiplos son: kFLOPS, MFLOPS, GFLOPS, TFLOPS, PFLOPS (peta) y EFLOPS (exa).</p>

<h3>6.1 Unidades de información: decimal vs binario</h3>
<p>Hay dos sistemas para medir cantidades de información:</p>
<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>SI (decimal)</th><th>Valor</th><th>ISO/IEC (binario)</th><th>Valor</th></tr></thead>
<tbody>
<tr><td>kB</td><td>\\(10^{3}\\)</td><td>KiB</td><td>\\(2^{10}\\)</td></tr>
<tr><td>MB</td><td>\\(10^{6}\\)</td><td>MiB</td><td>\\(2^{20}\\)</td></tr>
<tr><td>GB</td><td>\\(10^{9}\\)</td><td>GiB</td><td>\\(2^{30}\\)</td></tr>
<tr><td>TB</td><td>\\(10^{12}\\)</td><td>TiB</td><td>\\(2^{40}\\)</td></tr>
</tbody>
</table>
</div>

<h3>6.2 Organización y características</h3>
<p>Las supercomputadoras se organizan de forma jerárquica:</p>
<pre class="code">Chip (varios cores) → Compute Card → Node Card → Midplane → Rack → System</pre>
<p>Características: gran tamaño, sistemas de refrigeración (incluso líquida), enorme rendimiento, muchos usuarios (en general, científicos) y alto consumo eléctrico. Sus aplicaciones incluyen predicciones climatológicas, exploraciones petrolíferas, física atómica, diagnóstico médico, aerodinámica y vuelo espacial, inteligencia artificial y procesamiento de imágenes.</p>

<h3>6.3 TOP500</h3>
<p>El ranking TOP500 lista las supercomputadoras más potentes del mundo:</p>
<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>#</th><th>Nombre</th><th>País / Sede</th><th>Rendimiento (Rmax)</th></tr></thead>
<tbody>
<tr><td>1</td><td><strong>El Capitán</strong> (AMD EPYC + Instinct MI300A, HPE Cray, LLNL)</td><td>EE.UU.</td><td>1.742 PFlops/s — el más potente del mundo</td></tr>
<tr><td>2</td><td><strong>Frontier</strong> (HPE Cray + AMD, Oak Ridge)</td><td>EE.UU.</td><td>~1.353 PFlops/s (2 EFLOPS pico, 29 MW, refrigerado por agua)</td></tr>
<tr><td>3</td><td><strong>Aurora</strong> (Intel, Argonne)</td><td>EE.UU.</td><td>~1.012 PFlops/s</td></tr>
<tr><td>4</td><td>Eagle (Microsoft Azure)</td><td>EE.UU.</td><td>—</td></tr>
<tr><td>5</td><td>HPC6 (Eni)</td><td>Italia</td><td>—</td></tr>
</tbody>
</table>
</div>
<p>Otro sistema conocido es <strong>Summit</strong> (200 PFLOPS, 13 MW): IBM Power System AC922 con GPUs NVIDIA Volta GV100. Frontier cuenta con 9.408 nodos y 9,2 PB de memoria.</p>

<h3>6.4 Supercomputadoras en Argentina</h3>
<ul>
  <li><strong>Clementina</strong> (1961): primera computadora científica del país (Mercury Ferranti).</li>
  <li><strong>Tupac</strong> (2015).</li>
  <li><strong>Huayra Muyu</strong> (2018): 340 TFLOPS.</li>
  <li><strong>Serafín</strong> (2021): la más potente del país al momento de su estreno.</li>
  <li><strong>Clementina XXI</strong> (2023): instalada en el Servicio Meteorológico Nacional; costó unos US$ 5 millones; alcanza <strong>15,7 petaFLOPS</strong> con 5.120 núcleos Intel Xeon CPU Max + 37.888 núcleos Intel Data Center GPU Max; figura entre las 100 más potentes del mundo.</li>
</ul>

<h2>7. Arquitecturas paralelas</h2>
<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Tipo</th><th>Memoria</th><th>Cómo se comunican</th></tr></thead>
<tbody>
<tr><td><strong>Multiprocesador</strong></td><td>Compartida</td><td>Varias CPU comparten una misma memoria.</td></tr>
<tr><td><strong>Multicomputadora</strong></td><td>Privada por CPU</td><td>Cada CPU tiene su memoria; se comunican por una red de interconexión (paso de mensajes).</td></tr>
<tr><td><strong>Multinúcleo (multicore)</strong></td><td>Caché por núcleo + compartida</td><td>Un solo chip con dos o más núcleos de CPU, cada uno con su pipeline y caché.</td></tr>
</tbody>
</table>
</div>
<p>Ejemplo de multinúcleo: un Intel Core i7 con 4 núcleos, cada uno con caché L1/L2 propia y una caché L3 compartida.</p>

<h2>8. Organización básica: RISC vs CISC</h2>
<div class="callout def"><strong class="callout__tag">Definición</strong> El <strong>data path (ruta de datos)</strong> es la parte de la CPU formada por el banco de registros, la ALU (con sus registros de entrada/salida) y los buses internos. Define lo que la máquina puede hacer: cuanto más rápido es su ciclo, más rápida es la CPU.</div>

<p>Las organizaciones de registros más comunes son: <strong>acumulador único</strong>, <strong>registros de propósito general</strong> y <strong>registro de pila (stack)</strong>.</p>

<h3>8.1 Comparación RISC vs CISC</h3>
<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>RISC (Reduced Instruction Set Computing)</th><th>CISC (Complex Instruction Set Computer)</th></tr></thead>
<tbody>
<tr><td>Pocas instrucciones simples</td><td>Muchas instrucciones complejas</td></tr>
<tr><td>Longitud fija</td><td>Longitud variable</td></tr>
<tr><td>Complejidad en el compilador</td><td>Complejidad en el microcódigo</td></tr>
<tr><td>Acceso a memoria solo con Load/Store</td><td>Muchas instrucciones acceden a memoria</td></tr>
<tr><td>Pocos modos de direccionamiento</td><td>Muchos modos de direccionamiento</td></tr>
<tr><td>Muchos registros, usa pipeline, menor consumo</td><td>Mayor consumo</td></tr>
<tr><td>Ejemplos: ARM, MIPS, PowerPC, SPARC</td><td>Ejemplos: Intel x86 (Core i7/i5/i3, Pentium), Motorola 68000, DEC VAX, IBM System/360</td></tr>
</tbody>
</table>
</div>

<div class="callout tip"><strong class="callout__tag">Relación con la unidad</strong> <strong>x86</strong> es CISC (Intel/AMD, presente en PC, servidores y supercomputadoras). <strong>ARM</strong> y <strong>AVR</strong> son RISC: ARM domina en móviles, embebidos y cada vez más en servidores; AVR se usa en embebidos y placas Arduino.</div>

<h2>9. El ciclo de instrucción</h2>
<p>Cada instrucción se procesa en una serie de fases:</p>
<ol>
  <li><strong>Búsqueda de la instrucción (Fetch).</strong></li>
  <li><strong>Decodificación.</strong></li>
  <li><strong>Búsqueda de operandos.</strong></li>
  <li><strong>Ejecución.</strong></li>
  <li><strong>Almacenamiento del resultado.</strong></li>
</ol>

<h3>9.1 Formato de una instrucción</h3>
<p>Una instrucción se compone de varios campos:</p>
<ul>
  <li><strong>Opcode (código de operación):</strong> qué hay que hacer.</li>
  <li><strong>Bits de direccionamiento:</strong> cómo interpretar los operandos.</li>
  <li><strong>Operandos / direcciones:</strong> sobre qué datos operar.</li>
</ul>
<p>Una instrucción puede tener 0, 1, 2 o 3 operandos. Algunos tipos:</p>
<pre class="code">LOAD A      ; registro-memoria
ADD R1, R2  ; registro-registro</pre>
`,
  quiz: [
    {
      q: "¿Cuál fue la primera computadora de programa almacenado y primera implementación real del modelo de Von Neumann?",
      opts: ["ENIAC (1946)", "EDSAC (1949)", "COLOSSUS (1943)", "Mark I (1944)"],
      a: 1,
      exp: "EDSAC, de Wilkes (1949), fue la primera de programa almacenado. ENIAC y COLOSSUS no almacenaban el programa en memoria."
    },
    {
      q: "¿En qué unidad se mide el rendimiento de una supercomputadora?",
      opts: ["Hz", "Bytes", "FLOPS", "Watts"],
      a: 2,
      exp: "FLOPS = operaciones de punto flotante por segundo. Sus múltiplos van de kFLOPS hasta EFLOPS (exa)."
    },
    {
      q: "Según el modelo de Von Neumann, las instrucciones y los datos…",
      opts: ["Se guardan en memorias físicamente separadas", "Se guardan juntos en la misma memoria principal", "Solo se almacenan en registros", "No se almacenan, se reciben en tiempo real"],
      a: 1,
      exp: "El principio de programa almacenado indica que instrucciones y datos comparten la misma memoria."
    },
    {
      q: "¿Cuál es la principal ventaja de la arquitectura Harvard frente a la de Von Neumann?",
      opts: ["Usa menos transistores", "La CPU accede a instrucciones y datos simultáneamente", "No necesita ALU", "Permite programar en C directamente"],
      a: 1,
      exp: "Harvard separa la memoria de instrucciones (ROM) de la de datos (RAM), cada una con su bus, eliminando el cuello de botella de Von Neumann."
    },
    {
      q: "¿Cuál de estas características corresponde a una arquitectura RISC?",
      opts: ["Instrucciones de longitud variable", "Muchas instrucciones acceden a memoria", "Acceso a memoria solo con Load/Store", "Complejidad concentrada en el microcódigo"],
      a: 2,
      exp: "RISC restringe el acceso a memoria a las instrucciones Load/Store, tiene longitud fija y pone la complejidad en el compilador."
    },
    {
      q: "En la máquina multinivel, ¿qué nivel corresponde al lenguaje ensamblador?",
      opts: ["Nivel 2 (ISA)", "Nivel 3 (Sistema operativo)", "Nivel 4", "Nivel 5"],
      a: 2,
      exp: "El nivel 4 es el lenguaje ensamblador (traducción mediante el ensamblador); el nivel 5 es el lenguaje de alto nivel."
    },
    {
      q: "¿Qué enuncia la Ley de Moore?",
      opts: ["La velocidad de la CPU se duplica cada año", "El número de transistores por circuito integrado se duplica cada ~2 años", "El software se expande hasta llenar el hardware", "La memoria RAM se duplica cada 18 meses"],
      a: 1,
      exp: "La Ley de Moore se refiere al número de transistores que caben en un circuito integrado, que se duplica cada ~2 años."
    },
    {
      q: "¿Cuál es la diferencia clave entre traducción e interpretación?",
      opts: ["La traducción es más lenta siempre", "La interpretación genera un ejecutable completo antes de correr", "La traducción genera un programa ejecutable completo; la interpretación ejecuta instrucción por instrucción sin generarlo", "No hay diferencia, son sinónimos"],
      a: 2,
      exp: "El traductor (p. ej. un compilador) produce un ejecutable; el intérprete ejecuta cada instrucción de inmediato sin crear uno nuevo."
    },
    {
      q: "En una arquitectura multicomputadora paralela, ¿cómo se comunican las CPU?",
      opts: ["Comparten una misma memoria", "Por paso de mensajes a través de una red de interconexión", "Mediante un único núcleo", "No se comunican"],
      a: 1,
      exp: "En la multicomputadora cada CPU tiene memoria privada y se comunican por paso de mensajes. La memoria compartida es propia del multiprocesador."
    },
    {
      q: "¿Cuál es el orden correcto de las fases del ciclo de instrucción?",
      opts: ["Decodificación → Fetch → Ejecución → Almacenamiento", "Fetch → Decodificación → Búsqueda de operandos → Ejecución → Almacenamiento", "Ejecución → Fetch → Decodificación → Almacenamiento", "Fetch → Ejecución → Decodificación → Almacenamiento"],
      a: 1,
      exp: "El orden es: búsqueda (Fetch), decodificación, búsqueda de operandos, ejecución y almacenamiento del resultado."
    }
  ],
  cards: [
    { q: "¿Qué es una computadora digital?", a: "Una máquina que resuelve problemas ejecutando instrucciones (programas) que recibe de las personas, en su lenguaje de máquina (binario)." },
    { q: "Compilador vs intérprete", a: "El compilador traduce todo el programa a un ejecutable y luego se corre; el intérprete lee y ejecuta línea por línea sin generar ejecutable." },
    { q: "¿Qué hace un ensamblador?", a: "Es un traductor que convierte lenguaje ensamblador en lenguaje de máquina." },
    { q: "Niveles 4 y 5 de la máquina multinivel", a: "Nivel 4: lenguaje ensamblador (traducción); Nivel 5: lenguaje de alto nivel como C, C++, Java o Python (compilador)." },
    { q: "Principio de la arquitectura de Von Neumann", a: "Programa almacenado: instrucciones y datos se guardan juntos en la misma memoria principal." },
    { q: "¿Qué es el cuello de botella de Von Neumann?", a: "El bus único compartido entre CPU y memoria limita la velocidad, porque instrucciones y datos no se transfieren a la vez." },
    { q: "¿Cuál es la supercomputadora más potente del mundo (TOP500)?", a: "El Capitán (EE.UU., LLNL), con Rmax de 1.742 PFlops/s." },
    { q: "RISC vs CISC en una frase", a: "RISC: pocas instrucciones simples, longitud fija, Load/Store, complejidad en el compilador (ARM, MIPS). CISC: muchas instrucciones complejas, longitud variable (x86)." },
    { q: "¿Qué es la Clementina XXI?", a: "Supercomputadora (2023) del Servicio Meteorológico Nacional argentino: 15,7 petaFLOPS, entre las 100 más potentes del mundo." }
  ]
});
