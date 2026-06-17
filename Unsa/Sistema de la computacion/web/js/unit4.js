window.APP_DATA.units.push({
  id: "avanzadas",
  glyph: "∥",
  title: "Arquitecturas Avanzadas",
  desc: "Paralelismo (ILP, pipeline, superescalar, VLIW), taxonomía de Flynn, SIMD y procesadores vectoriales, multiprocesadores (UMA/NUMA/COMA), multicomputadoras, clústeres, cloud, FPGA y SOA.",
  tool: null,
  html: `
<p class="lead">Esta unidad estudia cómo se obtiene más rendimiento agregando <strong>paralelismo</strong>: dentro del propio chip (a nivel de instrucción y de hilos), replicando núcleos y CPU completas, y conectando computadoras enteras a través de redes. Recorremos la clasificación de Flynn, las máquinas SIMD y vectoriales, los multiprocesadores de memoria compartida (UMA, NUMA, COMA) con sus problemas de coherencia de caché, las multicomputadoras de paso de mensajes, los clústeres, el cloud computing, las arquitecturas reconfigurables (FPGA) y la arquitectura orientada a servicios (SOA).</p>

<h2>1. Paralelismo: ideas generales</h2>
<p>El <strong>paralelismo</strong> consiste en hacer varias cosas a la vez para resolver un problema más rápido. Se puede introducir a <strong>nivel de instrucciones</strong> (mediante pipeline y arquitecturas superescalares) y a <strong>nivel de hardware</strong> (varias CPU en un chip o varias computadoras conectadas).</p>

<p>Toda arquitectura paralela se describe con tres ingredientes:</p>
<ul>
  <li><strong>Elementos de procesamiento (EP):</strong> pueden ir desde ALU mínimas hasta CPU o computadoras completas.</li>
  <li><strong>Sistema de memoria:</strong> normalmente dividido en módulos que operan de forma independiente o en paralelo. Las cachés suelen usar tecnología <code>SRAM</code> y pueden organizarse hasta en 4 niveles.</li>
  <li><strong>Esquema de interconexión:</strong> los <strong>estáticos</strong> conectan los componentes en una configuración fija (estrella, anillo, cuadrícula); los <strong>dinámicos</strong> conectan los EP a una red de conmutación que encamina mensajes de forma dinámica.</li>
</ul>

<div class="callout def"><strong class="callout__tag">Definición</strong> Dos CPU o EP están <strong>estrechamente acoplados</strong> cuando están muy juntos, con alto ancho de banda y bajo retardo entre ellos (son "computacionalmente íntimos"). Están <strong>débilmente acoplados</strong> cuando están muy separados, con bajo ancho de banda y alto retardo (son "computacionalmente remotos").</div>

<h3>1.1 Para qué se usa el paralelismo</h3>
<ul>
  <li><strong>Trabajos independientes a la vez:</strong> atender a miles de usuarios remotos (sistemas bancarios, reservas aéreas, servidores web). El objetivo es atender más carga.</li>
  <li><strong>Un solo trabajo con muchos procesos paralelos</strong> (por ejemplo, un programa de ajedrez). Aquí el objetivo no es atender más usuarios, sino resolver con mayor rapidez un único problema.</li>
</ul>

<h3>1.2 Niveles de paralelismo</h3>
<p>El paralelismo se puede agregar en niveles crecientes, pasando de sistemas estrechamente acoplados a sistemas cada vez más débilmente acoplados:</p>
<ol>
  <li><strong>Dentro del chip de la CPU:</strong> diseño superescalar con varias unidades funcionales, arquitectura VLIW, hyperthreading (varios hilos a la vez) o juntar varias CPU en un mismo chip.</li>
  <li><strong>CPU adicionales especializadas:</strong> coprocesador de red, coprocesador multimedia, criptoprocesador, etc.</li>
  <li><strong>CPU completas replicadas:</strong> multiprocesadores y multicomputadoras (clústeres).</li>
  <li><strong>Organizaciones enteras unidas por Internet:</strong> redes de cómputo acopladas de manera muy flexible (computación grid).</li>
</ol>

<h2>2. Paralelismo a nivel de instrucción (ILP)</h2>
<p>En el nivel más bajo, una forma de lograr paralelismo es <strong>emitir múltiples instrucciones por ciclo de reloj</strong>. Esto se consigue con procesadores superescalares y procesadores VLIW.</p>

<h3>2.1 Procesadores superescalares</h3>
<div class="callout def"><strong class="callout__tag">Definición</strong> Un procesador <strong>superescalar</strong> es capaz de ejecutar <strong>más de una instrucción por ciclo de reloj</strong>; un procesador <strong>escalar</strong> ejecuta solo una instrucción por ciclo.</div>

<p>Las CPU superescalares emiten varias instrucciones a las unidades de ejecución en un único ciclo. El hardware fija el máximo emitible (generalmente de 2 a 6 instrucciones). Sin embargo, si una instrucción necesita una unidad funcional ocupada o un resultado que aún no se calculó, esa instrucción <strong>no se emite</strong>. La planificación la realiza el hardware en tiempo de ejecución.</p>

<h3>2.2 Procesadores VLIW</h3>
<p>La otra forma de ILP son los procesadores <strong>VLIW</strong> (Very Long Instruction Word). En su forma original, tenían palabras de instrucción muy largas que activaban múltiples unidades funcionales a la vez.</p>

<div class="callout tip"><strong class="callout__tag">Ejemplo</strong> Una máquina con cinco unidades funcionales (dos enteros, una de punto flotante, una carga y un almacenamiento) usa instrucciones VLIW con cinco códigos de operación y cinco pares de operandos. Con 6 bits por opcode, 5 bits por registro y 32 bits por dirección, una instrucción puede llegar a tener unos <strong>134 bits</strong>.</div>

<p>Características de VLIW:</p>
<ul>
  <li>Juego de instrucciones muy <strong>simple</strong> en cantidad de instrucciones distintas, pero cada instrucción es muy <strong>grande</strong>.</li>
  <li>Cada instrucción indica el estado de <strong>todas</strong> las unidades funcionales.</li>
  <li>La planificación del código la hace el <strong>compilador (o el programador)</strong>, no el hardware. Esto simplifica el diseño del hardware.</li>
</ul>

<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Aspecto</th><th>Superescalar</th><th>VLIW</th></tr></thead>
<tbody>
<tr><td>¿Quién planifica?</td><td>El hardware en tiempo de ejecución</td><td>El compilador / programador</td></tr>
<tr><td>Complejidad del hardware</td><td>Alta (lógica de planificación)</td><td>Menor (hardware más simple)</td></tr>
<tr><td>Instrucciones</td><td>Normales</td><td>Muy largas, con paralelismo explícito</td></tr>
</tbody>
</table>
</div>

<h3>2.3 Ejemplo de planificación</h3>
<p>Dado el programa: (1) <code>R3 = R1 * R2</code>, (2) <code>R5 = R3 + R4</code>, (3) <code>R6 = R1 - R4</code>. La instrucción 2 depende de la 1, pero la 3 es independiente.</p>
<ul>
  <li><strong>Superescalar:</strong> el hardware inicia simultáneamente la multiplicación y la resta en unidades distintas; al terminar la multiplicación, ejecuta la suma.</li>
  <li><strong>VLIW:</strong> el compilador genera el código ya planificado:</li>
</ul>
<pre class="code">1.  MULT(R1,R2,R3)        -        REST(R1,R4,R6)
2.       -        SUM(R3,R4,R5)        -</pre>
<p>En la primera instrucción se activan el multiplicador y el restador (el sumador queda ocioso porque aún no puede calcular la suma); en la segunda se hace la suma pendiente.</p>

<div class="callout tip"><strong class="callout__tag">Caso TriMedia</strong> La CPU <strong>TriMedia</strong> (Philips) es un VLIW real para aplicaciones de imagen, audio y video (reproductores de DVD/MP3, cámaras digitales). Cada instrucción contiene hasta cinco operaciones, tiene 128 registros de 32 bits y 11 unidades funcionales.</div>

<h2>3. Multithreading en chip y multinúcleo</h2>
<h3>3.1 Multithreading (subprocesamiento múltiple)</h3>
<p>Con las CPU superescalares aparece el <strong>multithreading simultáneo</strong>: se permite que un hilo emita varias instrucciones por ciclo siempre que pueda, y cuando un hilo se detiene (por ejemplo, por un fallo de caché), otro hilo aprovecha las unidades de ejecución. Hay variantes de granularidad fina y de granularidad gruesa.</p>

<div class="callout tip"><strong class="callout__tag">Hyperthreading</strong> Intel llama <strong>hyperthreading</strong> a su implementación del multithreading: permite ejecutar dos subprocesos (o procesos) a la vez en un mismo núcleo, ya que la CPU no distingue un hilo de un proceso. Ejemplo: el Core i7.</div>

<h3>3.2 Multiprocesadores en un solo chip</h3>
<p>Con la tecnología <code>VLSI</code> es posible colocar dos o más CPU potentes en un mismo chip, que comparten cachés y, en general, todos los recursos de la máquina. A pequeña escala prevalecen dos diseños:</p>
<ul>
  <li><strong>Multiprocesadores homogéneos en un chip:</strong> todos los núcleos son iguales. Ejemplos: Intel i3, i5, i7.</li>
  <li><strong>Multiprocesadores heterogéneos en un chip:</strong> núcleos especializados para distintas tareas. Se usan en sistemas integrados de electrónica de consumo (televisores, reproductores de DVD, videocámaras, consolas, teléfonos móviles), donde cada función tiene fuertes restricciones de tiempo real, energía, calor, tamaño y precio. Un reproductor de DVD portátil o un teléfono celular avanzado son ejemplos típicos.</li>
</ul>

<h2>4. Coprocesadores (procesadores de uso específico)</h2>
<p>Un <strong>coprocesador</strong> es un procesador auxiliar que ayuda al procesador principal. En unos casos la CPU le entrega instrucciones para que las ejecute; en otros, el coprocesador es bastante independiente. Físicamente puede estar en un gabinete separado, en una placa enchufable o integrado dentro de la propia CPU (como la unidad de punto flotante). Históricamente, los mainframes IBM 360 tenían canales de E/S independientes y el CDC 6600 tenía 10 procesadores de E/S. Incluso un chip <code>DMA</code> puede verse como un coprocesador.</p>

<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Coprocesador</th><th>Función</th></tr></thead>
<tbody>
<tr><td><strong>Procesador de red</strong></td><td>Procesa rápidamente grandes cantidades de paquetes en sistemas intermedios (enrutadores, conmutadores, cortafuegos, proxies, balanceadores). Internamente es muy paralelo: consta de múltiples <strong>PPE</strong> (Protocol/Programmable/Packet Processing Engines), cada uno con un núcleo RISC y memoria interna pequeña.</td></tr>
<tr><td><strong>Procesador gráfico (GPU)</strong></td><td>Maneja el procesamiento de gráficos de alta resolución y cálculo masivo (render 3D), tarea en la que las CPU comunes no son eficientes.</td></tr>
<tr><td><strong>Criptoprocesador</strong></td><td>Tiene hardware especial para cifrar y descifrar datos mucho más rápido que una CPU ordinaria; clave para conexiones seguras y autenticación.</td></tr>
</tbody>
</table>
</div>

<div class="callout tip"><strong class="callout__tag">GPU NVIDIA Fermi</strong> Se organiza en 16 <strong>SM</strong> (Streaming Multiprocesadores), cada uno con su caché L1 privada de gran ancho de banda y 32 núcleos <strong>CUDA</strong> (procesadores simples de punto flotante y enteros de precisión simple). Los 16 SM comparten una caché L2 unificada de 768 KB conectada a la DRAM. Cada SM busca y decodifica una sola instrucción por ciclo y la aplica a muchos datos: es un cálculo <strong>SIMD</strong>.</div>

<h2>5. Taxonomía de Flynn</h2>
<p>La clasificación de <strong>Flynn</strong> se basa en dos conceptos: el <strong>flujo de instrucciones (FI)</strong> y el <strong>flujo de datos (FD)</strong>. Un FI corresponde a un contador de programa: un sistema con n CPU tiene n contadores de programa, es decir n FI. Un FD es un conjunto de operandos. Como FI y FD son independientes, surgen cuatro combinaciones.</p>

<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Clase</th><th>Significado</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><strong>SISD</strong></td><td>Single Instruction, Single Data</td><td>Computadora secuencial clásica de Von Neumann: un FI, un FD, una cosa a la vez.</td></tr>
<tr><td><strong>SIMD</strong></td><td>Single Instruction, Multiple Data</td><td>Una sola unidad de control emite una instrucción; varias ALU la ejecutan sobre distintos conjuntos de datos a la vez (ej.: ILLIAC IV). Se usa en cálculo científico.</td></tr>
<tr><td><strong>MISD</strong></td><td>Multiple Instruction, Single Data</td><td>Varias instrucciones operan sobre un mismo dato. Se desconoce si existen máquinas reales de este tipo.</td></tr>
<tr><td><strong>MIMD</strong></td><td>Multiple Instruction, Multiple Data</td><td>Múltiples CPU independientes que operan como parte de un sistema mayor. Casi todos los procesadores paralelos son MIMD.</td></tr>
</tbody>
</table>
</div>

<div class="callout def"><strong class="callout__tag">Subdivisión de MIMD</strong> Los MIMD se organizan en dos subgrupos: <strong>multiprocesadores</strong> (comparten memoria y se comunican a través de ella) y <strong>multicomputadoras</strong> (no comparten memoria y se comunican por transferencia de mensajes).</div>

<h2>6. Computadoras SIMD</h2>
<p>Las computadoras SIMD se usan para problemas científicos y de ingeniería con alto requerimiento computacional y estructuras de datos regulares (vectores, arreglos). Sus características: tienen una sola <strong>unidad de control</strong> que ejecuta instrucción por instrucción, y cada instrucción opera con varios datos. Un EP es una CPU/ALU ampliada con memoria local pequeña y opcional. Se clasifican en arreglos de procesadores y procesadores vectoriales.</p>

<h3>6.1 Arreglo de procesadores</h3>
<p>El <strong>arreglo de procesadores</strong> tiene una sola unidad de control que emite las señales para controlar muchos EP. Sus EP pueden ir desde una simple ALU de 1 bit hasta un coprocesador matemático o una CPU, y se interconectan en una <strong>cuadrícula (grid) rectangular</strong>, que es la opción más común.</p>

<h3>6.2 Procesadores vectoriales</h3>
<ul>
  <li>Usan <strong>ALU vectoriales</strong> para sus operaciones.</li>
  <li>Sus datos son <strong>vectores</strong>, casi siempre en punto flotante.</li>
  <li>Los vectores de entrada y salida se almacenan en memoria o en <strong>registros vectoriales</strong> especiales.</li>
  <li>También pueden hacer operaciones escalares y mixtas.</li>
  <li>Son muy costosos de construir, por lo que en la práctica se implementan diseños combinados: <strong>procesamiento vectorial + pipeline</strong>.</li>
</ul>

<h2>7. Computadoras MIMD: multiprocesadores de memoria compartida</h2>
<div class="callout def"><strong class="callout__tag">Definición</strong> Un <strong>multiprocesador</strong> es un sistema con varias CPU y <strong>un solo espacio de direcciones</strong> visible para todas ellas. Las CPU pueden comunicarse a través de la memoria, accediendo con instrucciones <code>LOAD</code> y <code>STORE</code>.</div>

<p>Aunque presentan un único espacio de direcciones, suele haber varios módulos de memoria, cada uno con una porción de la memoria física. La máquina ejecuta una copia del sistema operativo con sus tablas (entre ellas la tabla de páginas); cuando un proceso se bloquea, la CPU guarda su estado y busca otro proceso para ejecutar.</p>

<div class="callout tip"><strong class="callout__tag">SMP</strong> Si todas las CPU pueden acceder por igual a los recursos, el SO las trata como "CPU intercambiables" y el sistema se llama <strong>multiprocesador simétrico (SMP, Symmetric MultiProcessor)</strong>.</div>

<p>El acceso a la memoria compartida sigue <strong>modelos de consistencia</strong> (estricta, secuencial, débil, del procesador, de liberación). Según el tiempo de acceso, los multiprocesadores se agrupan en <strong>UMA</strong>, <strong>NUMA</strong> y <strong>COMA</strong>.</p>

<h3>7.1 Multiprocesadores UMA</h3>
<p>En los <strong>UMA</strong> (Uniform Memory Access) el tiempo de acceso a todos los módulos de memoria es el mismo ("uniforme"), por lo que su desempeño es predecible. Pueden conectarse por bus o por conmutadores.</p>
<ul>
  <li><strong>Basados en bus:</strong> sencillos, pero presentan problemas en configuraciones grandes (32, 64 CPU). El bus compartido se satura y aparece el problema de coherencia de cachés. Soluciones: cachés y memorias privadas, protocolos de coherencia y cachés "espía" (snooping) que vigilan permanentemente el bus.</li>
  <li><strong>Basados en conmutadores de barras cruzadas (crossbar):</strong> cada <strong>punto de cruce</strong> es un conmutador que conecta o no una línea horizontal con una vertical. Se comporta como una "red no bloqueadora". Apropiado para sistemas de media envergadura (ej.: Sun Enterprise 10000), pero no para sistemas muy grandes (1000 CPU × 1000 módulos).</li>
</ul>

<h3>7.2 Multiprocesadores NUMA</h3>
<p>Los <strong>NUMA</strong> (NonUniform Memory Access) tienen acceso no uniforme a la memoria. Tres rasgos los distinguen:</p>
<ol>
  <li>Hay un <strong>único espacio de direcciones</strong> visible para todas las CPU.</li>
  <li>El acceso a memoria remota se hace con <code>LOAD</code> y <code>STORE</code>.</li>
  <li>El acceso a la memoria local es <strong>más rápido</strong> que a la remota (esta diferencia es su desventaja).</li>
</ol>
<p>Es apropiado para sistemas de mediana envergadura (ej.: Sun MicroSystems E25K). Si no usa cachés (no oculta la latencia remota), se llama <strong>NC-NUMA</strong>; si tiene cachés coherentes, <strong>CC-NUMA</strong>.</p>

<h3>7.3 Coherencia de caché: protocolo MESI</h3>
<div class="callout def"><strong class="callout__tag">Coherencia de caché</strong> Los <strong>protocolos de coherencia</strong> son reglas implementadas por las cachés, las CPU y la memoria para evitar que distintas versiones de un mismo dato aparezcan en cachés diferentes. Ejemplos: escritura a través (write-through) y <strong>MESI</strong>.</div>

<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Estado MESI</th><th>Significado</th></tr></thead>
<tbody>
<tr><td><strong>M — Modificada</strong></td><td>La entrada es válida, la memoria está desactualizada y no existen otras copias.</td></tr>
<tr><td><strong>E — Exclusiva</strong></td><td>Ninguna otra caché tiene la línea; la memoria está actualizada.</td></tr>
<tr><td><strong>S — Compartida (Shared)</strong></td><td>Varias cachés pueden tener la línea; la memoria está actualizada.</td></tr>
<tr><td><strong>I — No válida (Invalid)</strong></td><td>La entrada no contiene datos válidos.</td></tr>
</tbody>
</table>
</div>

<h3>7.4 Multiprocesadores COMA</h3>
<p>La arquitectura <strong>COMA</strong> (Cache Only Memory Access) busca superar el problema de los NUMA: usa la memoria principal de cada CPU como una <strong>caché de gran capacidad</strong>, lo que eleva la tasa de aciertos y mejora el desempeño. El espacio de direcciones se divide en líneas de caché que <strong>migran</strong> por el sistema según se necesitan. Su principal problema es la localización de los bloques. Se construyeron pocas (ej.: KSR-1 y Data Diffusion Machine, ambas de 1992).</p>

<div class="callout warn"><strong class="callout__tag">Límite de los multiprocesadores</strong> Ventaja: un programa puede acceder a cualquier dirección de memoria sin conocer la topología interna. Limitación: <strong>no escalan a tamaños muy grandes</strong>. De ahí surgen las multicomputadoras.</div>

<h2>8. Computadoras MIMD: multicomputadoras de paso de mensajes</h2>
<div class="callout def"><strong class="callout__tag">Definición</strong> Las <strong>multicomputadoras</strong> no tienen memoria compartida a nivel arquitectónico: una CPU no puede leer la memoria de otra con un simple <code>LOAD</code>, sino que debe enviar un mensaje explícito y esperar respuesta, mediante las primitivas <strong>send</strong> y <strong>receive</strong>. Por eso se las llama <strong>NORMA</strong> (NO Remote Memory Access).</div>

<p>Las multicomputadoras superan el límite de escala de los multiprocesadores: pueden manejar miles de CPU (2000, 9000). Una multicomputadora es una conexión de <strong>nodos</strong>:</p>
<pre class="code">Nodo = una o más CPU + RAM + disco/dispositivos E/S + procesador de comunicaciones (PdC)</pre>
<p>Los PdC se conectan por una red de interconexión de alta velocidad. Cuando una aplicación ejecuta <code>send</code>, avisa al PdC, que envía el bloque de datos a la máquina destino. La <strong>topología</strong> describe cómo se organizan enlaces y conmutadores. Las multicomputadoras se dividen en dos grupos:</p>
<ul>
  <li><strong>MPP</strong> (Massively Parallel Processors): procesadores masivamente paralelos.</li>
  <li><strong>Redes/cúmulos de estaciones de trabajo:</strong> NOW (Network of Workstations) o COW (Cluster of Workstations).</li>
</ul>

<h3>8.1 Multicomputadoras MPP</h3>
<p>Los <strong>MPP</strong> son enormes supercomputadoras multimillonarias con muchas CPU acopladas por una red de interconexión propietaria de alta velocidad. Características:</p>
<ul>
  <li>Se usan en ciencia, ingeniería e industria para cálculos muy grandes, grandes volúmenes de transacciones y almacenamiento de inmensas bases de datos.</li>
  <li>Han desplazado a las máquinas SIMD, supercomputadoras vectoriales y procesadores de matriz.</li>
  <li>Su red propietaria mueve mensajes con <strong>baja latencia y alto ancho de banda</strong>. La mayoría de los mensajes son pequeños (menos de 256 B), pero la mayor parte del tráfico se debe a mensajes grandes (más de 8 KB).</li>
  <li>Tienen enorme capacidad de <strong>E/S</strong> (manejan terabytes distribuidos en muchos discos) y fuerte <strong>tolerancia a fallas</strong> (hardware y software para monitorear, detectar y recuperarse de fallas).</li>
</ul>
<div class="callout tip"><strong class="callout__tag">Ejemplos de MPP</strong> IBM <strong>BlueGene/P</strong> (2007). <strong>Red Storm</strong> (2006, Sandia National Laboratory): 108 gabinetes, 10368 Opterons (20736 procesadores), 10 TB de SDRAM, ~41 teraflops/s. Cada CPU accede solo a su propia SDRAM (no hay memoria compartida); los discos se organizan en RAID 3 y RAID 5.</div>

<h3>8.2 Computación en clúster</h3>
<p>Una computadora de <strong>clúster</strong> consta de cientos o miles de PC o estaciones de trabajo conectadas por placas de red comerciales. Dominan dos grupos:</p>
<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Tipo</th><th>Características</th></tr></thead>
<tbody>
<tr><td><strong>Centralizado</strong></td><td>PC montadas en un rack grande en una sola sala, empaquetadas de forma compacta. Suelen ser homogéneas y sin periféricos más allá de la tarjeta de red y, quizá, discos.</td></tr>
<tr><td><strong>Descentralizado</strong></td><td>PC repartidas por un edificio o campus, conectadas por una LAN. Heterogéneas, con periféricos completos; aprovechan máquinas inactivas (requiere migrar trabajos cuando el dueño recupera su máquina).</td></tr>
</tbody>
</table>
</div>

<div class="callout tip"><strong class="callout__tag">La máquina de Google</strong> Google es un clúster gigante de PC baratas en varios centros de datos por el mundo. Cada centro tiene fibra óptica OC-48 (2,488 Gbps) y un respaldo OC-12 (622 Mbps), UPS y generadores diésel. Las PC se apilan (80 por rack) con conmutadores redundantes. Su lógica: (1) los componentes fallarán, planifíquelo; (2) replique todo para rendimiento y disponibilidad; (3) optimice <strong>precio/rendimiento</strong>. Por eso eligió PC baratas con software tolerante a fallas en vez de hardware caro.</div>

<h2>9. Cloud Computing</h2>
<div class="callout def"><strong class="callout__tag">Definición</strong> El <strong>cloud computing</strong> (computación en la nube) es el uso de una red de servidores remotos conectados a Internet para almacenar, administrar y procesar datos, bases de datos, redes y software. Permite <strong>alquilar</strong> las tecnologías de la información (pagar por uso) en lugar de comprarlas, evitando grandes inversiones en hardware y software.</div>

<h3>9.1 Tipos de nube</h3>
<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Tipo</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><strong>Pública</strong></td><td>Toda la infraestructura está en las instalaciones del proveedor y se ofrece por Internet. Varios inquilinos comparten la infraestructura.</td></tr>
<tr><td><strong>Privada</strong></td><td>De uso exclusivo de una organización (alojada por ella o por el proveedor). Mayor seguridad y control.</td></tr>
<tr><td><strong>Híbrida</strong></td><td>Combinación de pública y privada: las aplicaciones críticas se alojan en servidores propios y las secundarias en la nube del proveedor.</td></tr>
<tr><td><strong>Multinube</strong></td><td>Uso de varios servicios de nube y almacenamiento en una sola arquitectura.</td></tr>
</tbody>
</table>
</div>

<h3>9.2 Modelos de servicio</h3>
<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Servicio</th><th>Qué ofrece</th></tr></thead>
<tbody>
<tr><td><strong>SaaS</strong> (Software as a Service)</td><td>El proveedor aloja las aplicaciones; el cliente accede por Internet con suscripción de pago por consumo. Actualizaciones automáticas.</td></tr>
<tr><td><strong>PaaS</strong> (Platform as a Service)</td><td>Da herramientas para desarrollar y gestionar aplicaciones web/móviles sin invertir en la infraestructura subyacente, que aloja el proveedor.</td></tr>
<tr><td><strong>IaaS</strong> (Infrastructure as a Service)</td><td>Acceso bajo demanda a infraestructura (red, almacenamiento, cómputo). El cliente instala, configura y mantiene el software (base de datos, middleware, aplicaciones).</td></tr>
</tbody>
</table>
</div>

<p><strong>Ventajas del cloud:</strong> reduce el costo (menos gastos de capital), velocidad de aprovisionamiento, escala global flexible, productividad, mejor relación precio/rendimiento y confiabilidad (sistemas distribuidos y tolerantes a fallos).</p>

<h2>10. Arquitecturas reconfigurables (FPGA)</h2>
<p>Una <strong>FPGA</strong> (arreglo de compuertas programables en campo) es hardware reconfigurable que combina el rendimiento de circuitos dedicados con la flexibilidad de la programación. Se usan cada vez más en lugar de procesadores de propósito general y de <strong>ASIC</strong>, sobre todo en empresas pequeñas y medianas que no pueden afrontar el costo de un ASIC.</p>

<p>Ventajas de las FPGA frente a los ASIC:</p>
<ol>
  <li>El costo de un diseño en FPGA es mucho menor que en ASIC.</li>
  <li>Las herramientas de diseño para FPGA son más baratas.</li>
  <li>El tiempo de desarrollo hasta llegar al mercado es mucho menor.</li>
  <li>Se puede corregir un error de hardware <strong>incluso después</strong> de lanzar el producto, porque el dispositivo se reprograma.</li>
</ol>
<p>La paralelización a nivel de hardware reconfigurable es una herramienta clave para el cómputo de alta prestación (<strong>HPC</strong>) y el procesamiento de grandes volúmenes de datos. Se aplican en criptografía, exploración de arquitecturas, procesamiento multimedia, simulaciones financieras y físicas, y emuladores.</p>

<h2>11. Arquitectura orientada a servicios (SOA)</h2>
<div class="callout def"><strong class="callout__tag">Definición</strong> <strong>SOA</strong> (Service-Oriented Architecture) define una manera de hacer que los componentes de software sean <strong>reutilizables</strong> a través de <strong>interfaces de servicio</strong> que usan estándares comunes, de modo que se incorporen rápidamente a nuevas aplicaciones.</div>

<p>Cada servicio encapsula el código y los datos necesarios para ejecutar una función de negocio completa y discreta (por ejemplo, comprobar el crédito de un cliente o procesar una hipoteca). Las interfaces ofrecen <strong>acoplamiento débil</strong>: se pueden invocar con poco o ningún conocimiento de cómo está implementado el servicio, reduciendo dependencias entre aplicaciones.</p>

<ul>
  <li>La interfaz es un <strong>contrato</strong> entre proveedor y consumidor de servicios.</li>
  <li>Las interfaces suelen describirse con <strong>WSDL</strong> (basado en XML).</li>
  <li>Los servicios se exponen con protocolos estándar como <strong>SOAP</strong>/HTTP o REST (JSON/HTTP).</li>
  <li>Se publican en un <strong>registro</strong> donde otros desarrolladores los encuentran y reutilizan; la conexión se hace a través de un bus de servicios (<strong>ESB</strong>).</li>
</ul>

<h3>11.1 Los 8 principios de diseño SOA</h3>
<ol>
  <li><strong>Contrato estandarizado:</strong> los contratos cumplen los mismos estándares de diseño.</li>
  <li><strong>Bajo acoplamiento:</strong> evitan acoplarse a la tecnología que los implementa y al consumidor.</li>
  <li><strong>Abstracción:</strong> el contrato presenta solo la información mínima requerida.</li>
  <li><strong>Reusabilidad:</strong> contienen lógica de negocio independiente del consumidor; son activos de la empresa.</li>
  <li><strong>Autonomía:</strong> controlan los recursos tecnológicos sobre los que se implementan.</li>
  <li><strong>Sin estado:</strong> delegan el manejo de sesiones para reducir el consumo de recursos.</li>
  <li><strong>Descubrimiento:</strong> tienen metadata que permite encontrarlos e interpretarlos.</li>
  <li><strong>Componibilidad:</strong> pueden formar parte de composiciones de cualquier tamaño y complejidad.</li>
</ol>
<p>La aplicación de la orientación a servicios se divide en dos etapas: <strong>análisis</strong> orientado a servicios (modelado) y <strong>diseño</strong> orientado a servicios (que aplica los 8 principios). Ejemplos reales de adopción: Delaware Electric, Cisco e Independence Blue Cross.</p>
`,
  quiz: [
    {
      q: "¿Cuál es la diferencia clave entre un procesador superescalar y uno VLIW?",
      opts: ["El VLIW solo ejecuta una instrucción por ciclo", "En el superescalar la planificación la hace el hardware en tiempo de ejecución; en el VLIW la hace el compilador", "El superescalar usa palabras de instrucción de 134 bits", "No hay diferencia, son sinónimos"],
      a: 1,
      exp: "En el superescalar el hardware planifica las instrucciones en tiempo de ejecución; en el VLIW toda la planificación la realiza el compilador (o el programador), lo que simplifica el hardware."
    },
    {
      q: "Según la taxonomía de Flynn, ¿qué clase corresponde a la computadora secuencial clásica de Von Neumann?",
      opts: ["SIMD", "MIMD", "SISD", "MISD"],
      a: 2,
      exp: "SISD (Single Instruction, Single Data) tiene un flujo de instrucciones y uno de datos: hace una cosa a la vez, como la máquina secuencial de Von Neumann."
    },
    {
      q: "En la clase SIMD, ¿cómo se procesan los datos?",
      opts: ["Múltiples instrucciones sobre un solo dato", "Una sola instrucción que varias ALU ejecutan sobre múltiples datos a la vez", "Cada CPU ejecuta un programa independiente", "No se procesan datos en paralelo"],
      a: 1,
      exp: "SIMD (Single Instruction, Multiple Data) tiene una única unidad de control que emite una instrucción aplicada simultáneamente a varios conjuntos de datos mediante múltiples ALU."
    },
    {
      q: "¿Cuál es la característica que define a un multiprocesador frente a una multicomputadora?",
      opts: ["El multiprocesador se comunica por paso de mensajes", "El multiprocesador tiene un único espacio de direcciones compartido accesible con LOAD/STORE", "El multiprocesador no tiene memoria", "El multiprocesador escala a miles de CPU sin problema"],
      a: 1,
      exp: "El multiprocesador tiene un solo espacio de direcciones compartido y las CPU se comunican por memoria con LOAD/STORE. La multicomputadora usa paso de mensajes (send/receive)."
    },
    {
      q: "¿Qué distingue a un multiprocesador UMA de uno NUMA?",
      opts: ["UMA usa paso de mensajes y NUMA memoria compartida", "En UMA el tiempo de acceso a todos los módulos de memoria es el mismo; en NUMA el acceso local es más rápido que el remoto", "NUMA no tiene espacio de direcciones único", "UMA solo se usa en multicomputadoras"],
      a: 1,
      exp: "UMA (Uniform Memory Access) tiene tiempo de acceso uniforme a toda la memoria; NUMA (NonUniform) accede más rápido a la memoria local que a la remota."
    },
    {
      q: "En el protocolo de coherencia de caché MESI, ¿qué significa el estado 'Modificada'?",
      opts: ["La línea está en varias cachés y la memoria está actualizada", "La entrada no contiene datos válidos", "La entrada es válida, la memoria está desactualizada y no existen otras copias", "Ninguna otra caché tiene la línea y la memoria está actualizada"],
      a: 2,
      exp: "En MESI, 'Modificada' indica que la entrada es válida, la memoria principal está desactualizada y no existen copias en otras cachés."
    },
    {
      q: "¿Por qué a las multicomputadoras se las llama NORMA?",
      opts: ["Porque comparten memoria normalmente", "Porque NO tienen acceso a memoria remota y deben comunicarse por mensajes (send/receive)", "Porque usan memoria SRAM", "Porque tienen un solo espacio de direcciones"],
      a: 1,
      exp: "NORMA = NO Remote Memory Access: una CPU no puede leer la memoria de otra con un LOAD; debe enviar un mensaje explícito y esperar respuesta."
    },
    {
      q: "¿Cuál de los siguientes es un modelo de servicio de cloud computing donde el cliente accede a aplicaciones ya alojadas por el proveedor vía Internet?",
      opts: ["IaaS", "PaaS", "SaaS", "FPGA"],
      a: 2,
      exp: "SaaS (Software as a Service): el proveedor aloja las aplicaciones y el cliente las usa por Internet con suscripción de pago por consumo."
    },
    {
      q: "¿Cuál es una ventaja de una FPGA frente a un ASIC?",
      opts: ["Es imposible reprogramarla", "Se puede corregir un error de hardware incluso después de lanzar el producto", "Tiene siempre mayor rendimiento bruto", "No requiere herramientas de diseño"],
      a: 1,
      exp: "La FPGA es reconfigurable: permite corregir errores de hardware tras el lanzamiento, tiene menor costo de diseño y un tiempo de desarrollo más corto que el ASIC."
    },
    {
      q: "En SOA, ¿qué describe el principio de 'bajo acoplamiento'?",
      opts: ["Los servicios deben compartir su implementación interna", "Los servicios evitan acoplarse a la tecnología que los implementa y reducen las dependencias con sus consumidores", "Los servicios deben mantener el estado de cada sesión", "Los servicios no pueden reutilizarse"],
      a: 1,
      exp: "El bajo acoplamiento permite invocar un servicio con poco o ningún conocimiento de su implementación, reduciendo dependencias entre aplicaciones."
    }
  ],
  cards: [
    { q: "Acoplamiento estrecho vs débil", a: "Estrechamente acoplado: EP muy juntos, alto ancho de banda y bajo retardo. Débilmente acoplado: EP muy separados, bajo ancho de banda y alto retardo." },
    { q: "Superescalar vs VLIW", a: "Superescalar: el hardware planifica las instrucciones en tiempo de ejecución. VLIW: el compilador planifica; usa instrucciones muy largas que activan todas las unidades funcionales." },
    { q: "Las cuatro clases de Flynn", a: "SISD (1 instrucción, 1 dato), SIMD (1 instrucción, varios datos), MISD (varias instrucciones, 1 dato; rara), MIMD (varias instrucciones, varios datos)." },
    { q: "Subgrupos de MIMD", a: "Multiprocesadores (memoria compartida, se comunican por memoria) y multicomputadoras (memoria privada, se comunican por mensajes)." },
    { q: "UMA, NUMA y COMA", a: "UMA: tiempo de acceso uniforme a la memoria. NUMA: la memoria local es más rápida que la remota. COMA: usa la memoria principal de cada CPU como caché de gran capacidad." },
    { q: "Estados del protocolo MESI", a: "Modificada (válida, memoria desactualizada, sin copias), Exclusiva (sola copia, memoria actualizada), Compartida (varias copias, memoria actualizada) e Inválida (sin datos válidos)." },
    { q: "¿Qué es NORMA?", a: "NO Remote Memory Access: las multicomputadoras no acceden a memoria remota; se comunican con las primitivas send y receive (paso de mensajes)." },
    { q: "Modelos de servicio en la nube", a: "SaaS (software como servicio), PaaS (plataforma como servicio) e IaaS (infraestructura como servicio)." },
    { q: "¿Qué es SOA?", a: "Arquitectura orientada a servicios: hace reutilizables los componentes de software mediante interfaces de servicio con estándares comunes y acoplamiento débil." }
  ]
});
