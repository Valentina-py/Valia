window.APP_DATA.units.push({
  id: "so",
  glyph: "OS",
  title: "Sistemas Operativos",
  desc: "Qué es un SO y sus estructuras, gestión de procesos e hilos, planificación de CPU, concurrencia y sincronización, memoria, archivos, seguridad y sistemas distribuidos.",
  tool: "cpu",
  html: `
<p class="lead">El sistema operativo (SO) es la capa de software que controla el hardware, oculta su complejidad y administra los recursos de la computadora. Esta unidad recorre los fundamentos del SO, sus estructuras, la gestión de procesos e hilos, los algoritmos de planificación de CPU, la concurrencia y sincronización, la administración de memoria y archivos, la seguridad y, por último, los sistemas operativos distribuidos.</p>

<h2>1. Fundamentos del sistema operativo</h2>
<p>Existen dos visiones complementarias del SO:</p>
<div class="callout def"><strong class="callout__tag">Definición</strong> <strong>Vista del usuario (máquina extendida):</strong> "un sistema operativo es un conjunto de programas y funciones que controlan el funcionamiento del hardware, ocultando sus detalles y ofreciendo al usuario una vía sencilla y flexible de acceso a la computadora".</div>
<div class="callout def"><strong class="callout__tag">Definición</strong> <strong>Vista del administrador de recursos:</strong> el SO administra los recursos del hardware para lograr un uso eficiente. Esos recursos son el <strong>procesador</strong>, la <strong>memoria</strong>, la <strong>entrada/salida</strong> y la <strong>información</strong>.</div>

<h3>1.1 Componentes y kernel</h3>
<p>Los componentes principales del SO son cuatro administradores o gestores:</p>
<ul>
  <li>Gestor de la <strong>CPU</strong> (procesador).</li>
  <li>Gestor de la <strong>memoria principal</strong>.</li>
  <li>Gestor de <strong>E/S</strong>.</li>
  <li><strong>Sistema de archivos</strong>.</li>
</ul>
<div class="callout def"><strong class="callout__tag">Definición</strong> El <strong>kernel</strong> o núcleo es la parte fundamental del SO que se encarga de conceder acceso al hardware de forma segura a todo el software que lo solicita.</div>

<h3>1.2 Llamadas al sistema (System Calls)</h3>
<p>Una <strong>llamada al sistema</strong> (SysCall) es el método que usan los programas de aplicación para comunicarse con el núcleo del SO cuando necesitan transmitir o leer información del hardware, de otros procesos o del propio núcleo. La computadora alterna entre dos <strong>modos de operación</strong>: el <strong>modo usuario</strong> (restringido) y el <strong>modo kernel</strong> (privilegiado, con acceso total al hardware).</p>

<h3>1.3 Clasificación e interfaces</h3>
<p>Los SO se pueden clasificar por la cantidad de usuarios (monousuario / multiusuario), de tareas (monotarea / multitarea) y por el tipo de procesamiento (por lotes, tiempo compartido, tiempo real, distribuidos). Sus <strong>interfaces</strong> de usuario pueden ser de <strong>línea de comando</strong>, <strong>gráfica (GUI)</strong> o <strong>táctil (touch)</strong>, frecuente en móviles.</p>

<h2>2. Estructuras de los sistemas operativos</h2>
<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Estructura</th><th>Idea central</th><th>Ejemplos</th></tr></thead>
<tbody>
<tr><td><strong>Monolítica</strong></td><td>El SO es una colección de procedimientos enlazados en un único programa binario que se ejecuta entero en modo kernel.</td><td>MS-DOS, UNIX, FreeBSD, NetBSD</td></tr>
<tr><td><strong>Por capas</strong></td><td>Procedimientos organizados en capas: la capa <code>n</code> solo se comunica con la superior y la inferior.</td><td>THE, Minix (didáctico)</td></tr>
<tr><td><strong>Microkernel</strong></td><td>Módulos pequeños bien definidos; solo el microkernel corre en modo kernel y el resto como procesos de usuario.</td><td>QNX, L4, Symbian, MINIX 3</td></tr>
<tr><td><strong>Cliente-servidor</strong></td><td>Variación del microkernel: módulos clientes y servidores que se comunican por mensajes a través de una capa inferior.</td><td>Variantes de microkernel</td></tr>
<tr><td><strong>Máquina virtual</strong></td><td>Sistema de tiempo compartido que crea máquinas virtuales capaces de ejecutar distintos SO (hipervisores).</td><td>VMware, VirtualBox (tipo II); Xen, KVM (tipo I)</td></tr>
<tr><td><strong>Exokernel</strong></td><td>Particiona el hardware dando a cada máquina virtual un subconjunto de recursos; el SO de cada una los administra directamente.</td><td>ExOS</td></tr>
<tr><td><strong>Modular</strong></td><td>Enfoque orientado a objetos: el kernel tiene componentes fundamentales y enlaza dinámicamente servicios a medida que se necesitan.</td><td>Solaris</td></tr>
</tbody>
</table>
</div>
<div class="callout tip"><strong class="callout__tag">SO modernos: híbridos</strong> Los SO actuales combinan estructuras. Linux y Solaris: monolítico + modular (carga dinámica de funcionalidades). Windows: mayormente monolítico + microkernel para subsistemas. Mac OS X: por capas + microkernel Mach + partes de BSD. Android: kernel Linux modificado.</div>

<div class="callout warn"><strong class="callout__tag">Beneficios del microkernel</strong> Es más confiable (menos código corre en modo kernel, así que hay menos fallas críticas), más fácil de portar a nuevas arquitecturas y más fácil de extender.</div>

<h2>3. Gestión de procesos</h2>
<div class="callout def"><strong class="callout__tag">Definición</strong> Un <strong>proceso</strong> es una instancia de un programa en ejecución, incluyendo los valores actuales del contador de programa, los registros y las variables. Es la unidad de procesamiento que gestiona el SO.</div>
<p>Todo programa, para ejecutarse, debe residir en memoria principal junto con sus datos.</p>

<h3>3.1 Creación y finalización</h3>
<ul>
  <li><strong>Creación:</strong> arranque del sistema, ejecución de un programa, petición de un usuario o inicio de un trabajo por lotes.</li>
  <li><strong>Finalización:</strong> salida normal (voluntaria), salida por error (voluntaria), error fatal (involuntaria) o eliminado por otro proceso (involuntaria).</li>
</ul>

<h3>3.2 Estados de un proceso</h3>
<p>Un proceso alterna entre <strong>ráfagas de CPU</strong> y <strong>ráfagas de E/S</strong>. Sus estados básicos son:</p>
<ul>
  <li><strong>En ejecución:</strong> usa la CPU en ese instante.</li>
  <li><strong>Listo:</strong> puede ejecutarse, pero la CPU está ocupada por otro proceso.</li>
  <li><strong>Bloqueado:</strong> espera un evento (típicamente una operación de E/S) y no puede ejecutarse aunque la CPU esté libre.</li>
</ul>

<h3>3.3 Bloque de Control de Proceso (PCB)</h3>
<div class="callout def"><strong class="callout__tag">Definición</strong> Cada proceso tiene su <strong>PCB</strong> (Bloque de Control de Proceso): la estructura del SO que guarda toda su información (contador de programa, registros, estado, mapa de memoria, archivos abiertos, prioridad, etc.).</div>
<p>Según su comportamiento, los procesos se clasifican en <strong>intensivos en CPU</strong> (largas ráfagas de cálculo) e <strong>intensivos en E/S</strong> (ráfagas cortas y mucha espera de E/S). En cuanto a jerarquías: UNIX organiza los procesos en árbol (un proceso inicial al encender), mientras que Windows no tiene jerarquía: todos los procesos son iguales.</p>

<h3>3.4 Multiprogramación</h3>
<p>La <strong>multiprogramación</strong> mantiene varios procesos en memoria a la vez para aprovechar la CPU mientras unos esperan E/S. Desde un punto de vista probabilístico, si <code>p</code> es la fracción de tiempo que un proceso pasa esperando E/S y hay <code>n</code> procesos en memoria, la probabilidad de que todos estén esperando E/S (CPU ociosa) es \\(p^{n}\\). El <strong>aprovechamiento de la CPU</strong> es entonces \\(1 - p^{n}\\), que crece con <code>n</code>.</p>

<h2>4. Hilos (threads)</h2>
<p>En los SO tradicionales cada proceso tiene un espacio de direcciones y un único hilo de control. Pero con frecuencia conviene tener varios <strong>hilos</strong> en el mismo espacio de direcciones, ejecutándose en cuasi-paralelo como si fueran procesos casi separados (excepto por el espacio de direcciones, que comparten).</p>

<div class="callout def"><strong class="callout__tag">Definición</strong> Un <strong>hilo</strong> es la unidad de ejecución dentro de un proceso: tiene su propio contador de programa, registros y pila, pero comparte con los demás hilos del proceso el código, los datos y los recursos abiertos.</div>

<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Compartido por todos los hilos del proceso</th><th>Privado de cada hilo</th></tr></thead>
<tbody>
<tr><td>Espacio de direcciones (código y datos), archivos abiertos, procesos hijos, señales.</td><td>Contador de programa, registros, pila, estado.</td></tr>
</tbody>
</table>
</div>

<ul>
  <li><strong>¿Por qué usar hilos?</strong> Ejecución cuasi-paralela, ligereza, mayor velocidad de la aplicación y mejor aprovechamiento de sistemas con varias CPU.</li>
  <li><strong>Estados de un hilo:</strong> en ejecución, bloqueado y listo (igual que un proceso).</li>
  <li><strong>Ejemplo:</strong> un procesador de texto con un hilo para la interacción con el usuario, otro para el formateo en segundo plano y otro para el guardado automático.</li>
</ul>
<p>El <strong>Hyper-Threading</strong> (multihilamiento) es una técnica de hardware que permite a un núcleo físico ejecutar dos hilos en paralelo aprovechando recursos ociosos.</p>

<h2>5. Planificación de procesos (CPU)</h2>
<div class="callout def"><strong class="callout__tag">Definición</strong> El <strong>planificador</strong> (scheduler) decide qué proceso de la cola de listos usa la CPU. El <strong>despachador</strong> (dispatcher) realiza el <strong>cambio de contexto</strong>.</div>
<p>El procedimiento de conmutación (cambio de contexto) consiste en: 1) pasar de modo usuario a modo kernel; 2) resguardar el estado del proceso actual en su PCB (mapa de memoria, cachés); 3) seleccionar un nuevo proceso con el algoritmo de planificación; 4) restaurar el estado del nuevo proceso (memoria, registros, cachés); 5) iniciarlo. Se planifica cuando un proceso se crea, termina o se bloquea.</p>

<h3>5.1 Apropiativa vs no apropiativa</h3>
<ul>
  <li><strong>No apropiativa:</strong> el proceso elegido se ejecuta hasta que se bloquea o libera la CPU voluntariamente.</li>
  <li><strong>Apropiativa:</strong> el proceso se ejecuta por un máximo de tiempo fijo; al vencerse (interrupción de reloj) se lo suspende y se elige otro.</li>
</ul>

<h3>5.2 Métricas</h3>
<p>Para evaluar un algoritmo se definen, para cada proceso:</p>
<ul>
  <li><strong>tCPU:</strong> tiempo que el proceso necesita ejecutarse para completar su trabajo (ráfaga).</li>
  <li><strong>ti:</strong> instante en que el usuario da la orden de ejecución; <strong>tf:</strong> instante en que termina.</li>
  <li><strong>Tiempo de servicio o retorno:</strong> \\(TS = tf - ti\\).</li>
  <li><strong>Tiempo de espera:</strong> \\(TE = TS - tCPU\\).</li>
  <li><strong>Índice de servicio:</strong> \\(I = tCPU / TS\\).</li>
</ul>
<p>Se promedian sobre todos los procesos para obtener el <strong>tiempo promedio de servicio (TPS)</strong> y el <strong>tiempo promedio de espera (TPE)</strong>.</p>

<h3>5.3 Algoritmos de planificación</h3>
<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Algoritmo</th><th>Tipo</th><th>Criterio</th><th>Observación</th></tr></thead>
<tbody>
<tr><td><strong>FCFS</strong> (First Come, First Served / FIFO)</td><td>No apropiativo</td><td>Orden de llegada</td><td>Fácil de implementar; penaliza a los procesos cortos que llegan detrás de uno largo (efecto convoy).</td></tr>
<tr><td><strong>SJF</strong> (Shortest Job First / SPN)</td><td>No apropiativo</td><td>Menor tCPU requerido</td><td>Produce el menor tiempo de espera promedio; puede causar inanición de procesos largos. Requiere conocer el tCPU.</td></tr>
<tr><td><strong>SRTN</strong> (Shortest Remaining Time Next)</td><td>Apropiativo</td><td>Menor tiempo restante</td><td>Versión apropiativa de SJF: si llega un proceso con menos tiempo que el restante del actual, lo desplaza.</td></tr>
<tr><td><strong>Round Robin</strong></td><td>Apropiativo</td><td>Turno circular con quantum Q</td><td>Reparto equitativo; el costo es la sobrecarga por cambios de contexto. Q chico = más justo pero más overhead.</td></tr>
<tr><td><strong>Por prioridad</strong></td><td>Ambas variantes</td><td>Mayor prioridad primero</td><td>Atención rápida a alta prioridad; con prioridades fijas puede causar inanición de los de baja prioridad.</td></tr>
<tr><td><strong>Colas multinivel</strong></td><td>Apropiativo</td><td>Clases de prioridad</td><td>Prioridad entre clases + Round Robin dentro de cada clase. Variante: quantums crecientes por clase.</td></tr>
<tr><td><strong>Por sorteo (lotería)</strong></td><td>Apropiativo</td><td>Boletos de lotería</td><td>El premio es tiempo de CPU; todos los procesos tienen probabilidad de ser elegidos.</td></tr>
<tr><td><strong>Partes equitativas</strong></td><td>Apropiativo</td><td>Fracción de CPU por usuario</td><td>Asigna CPU por usuario sin importar cuántos procesos tenga cada uno.</td></tr>
</tbody>
</table>
</div>
<div class="callout tip"><strong class="callout__tag">Dato</strong> El procesamiento por lotes usa algoritmos no apropiativos (FCFS, SJF); el procesamiento interactivo usa apropiativos (Round Robin, prioridades). Para un mismo conjunto de procesos, <strong>SJF</strong> suele dar el menor TPE y TPR. Probá estos algoritmos en el <strong>planificador de CPU</strong> de esta unidad.</div>

<h2>6. Comunicación y sincronización de procesos</h2>
<div class="callout def"><strong class="callout__tag">Definición</strong> La <strong>ejecución concurrente</strong> es la ejecución pseudoparalela de varios procesos: el scheduler los alterna, de modo que parece que se ejecutan a la vez aunque, con un solo procesador, solo uno corre en cada instante. No hay que confundir <strong>concurrencia</strong> (alternancia) con <strong>paralelismo</strong> (ejecución simultánea real en varias CPU).</div>

<h3>6.1 Condición de carrera y sección crítica</h3>
<div class="callout warn"><strong class="callout__tag">Cuidado</strong> Una <strong>condición de carrera (race condition)</strong> ocurre cuando el resultado depende del orden en que se intercalan los accesos de varios procesos a un recurso compartido. Ejemplos clásicos: un spooler de impresión o una cuenta bancaria compartida.</div>
<div class="callout def"><strong class="callout__tag">Definición</strong> La <strong>sección crítica</strong> es la parte del código en la que se accede al recurso compartido (memoria o archivo). La <strong>exclusión mutua</strong> es el mecanismo que asegura que solo un proceso esté en su sección crítica a la vez.</div>
<p>La exclusión mutua puede producir dos problemas:</p>
<ul>
  <li><strong>Interbloqueo (deadlock o abrazo mortal):</strong> dos o más procesos quedan bloqueados esperando recursos que los otros tienen.</li>
  <li><strong>Inanición (starvation, lockout o postergación indefinida):</strong> un proceso nunca obtiene el recurso porque siempre se prioriza a otros.</li>
</ul>

<h3>6.2 Semáforos</h3>
<div class="callout def"><strong class="callout__tag">Definición</strong> Un <strong>semáforo</strong> (inventado por E. W. Dijkstra) es una variable entera con dos operaciones atómicas: <code>down/wait/P</code> (decrementa; si queda negativo, bloquea) y <code>up/signal/V</code> (incrementa; despierta a un proceso en espera).</div>
<ul>
  <li><strong>Semáforos binarios (mutex):</strong> valor 0 o 1; sirven para lograr la exclusión mutua.</li>
  <li><strong>Semáforos contadores:</strong> valor mayor que 1; resuelven situaciones particulares (contar recursos disponibles).</li>
</ul>
<pre class="code">do {
   wait(mutex);     // entrar a la seccion critica
   // SECCION CRITICA
   signal(mutex);   // salir de la seccion critica
   // seccion restante
} while (TRUE);</pre>

<h3>6.3 Problema del productor-consumidor</h3>
<p>Dos procesos comparten un buffer común de tamaño fijo: el <strong>productor</strong> coloca datos y el <strong>consumidor</strong> los retira. Su solución con semáforos requiere tres:</p>
<ul>
  <li>Un <strong>semáforo binario (mutex)</strong> para la exclusión mutua en el acceso al buffer.</li>
  <li>Un <strong>semáforo contador "vacías"</strong> que evita que el productor escriba en un buffer lleno.</li>
  <li>Un <strong>semáforo contador "llenas"</strong> que evita que el consumidor lea de un buffer vacío.</li>
</ul>

<h2>7. Administración de memoria</h2>
<p>El administrador de memoria lleva registro de las partes en uso, asigna memoria a los procesos cuando la necesitan y la desasigna cuando terminan. Su evolución histórica fue: asignación contigua → particiones fijas → particiones reubicables → particiones variables → <strong>memoria virtual</strong> (paginación y segmentación).</p>

<h3>7.1 Memoria virtual y paginación</h3>
<div class="callout def"><strong class="callout__tag">Definición</strong> La <strong>memoria virtual</strong> permite ejecutar programas más grandes que la memoria física dividiéndolos en bloques y cargándolos a demanda. El espacio virtual se divide en <strong>páginas</strong> y la memoria física en <strong>marcos</strong> del mismo tamaño. Cuando se referencia una página que no está en memoria física, ocurre un <strong>fallo de página</strong> y el SO la trae del disco.</div>
<p>La <strong>MMU</strong> (Memory Management Unit) traduce direcciones virtuales en físicas usando la <strong>tabla de páginas</strong>. Para memorias extensas se usan tablas <strong>multinivel</strong> (con punteros a tablas, no hace falta cargarlas todas) o <strong>invertidas</strong> (una entrada por marco físico; ahorra espacio pero su traducción es más compleja).</p>

<h3>7.2 Algoritmos de reemplazo de página</h3>
<p>Cuando ocurre un fallo y no hay marcos libres, hay que elegir qué página expulsar:</p>
<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Algoritmo</th><th>Política</th></tr></thead>
<tbody>
<tr><td><strong>Óptimo</strong></td><td>Expulsa la página que tardará más en volver a usarse. Es ideal e irrealizable (requiere conocer el futuro); sirve de referencia.</td></tr>
<tr><td><strong>FIFO</strong></td><td>Expulsa la página que entró primero. Simple, pero puede expulsar páginas muy usadas (anomalía de Belady).</td></tr>
<tr><td><strong>LRU</strong> (Least Recently Used)</td><td>Expulsa la página que hace más tiempo que no se usa. Buena aproximación al óptimo, pero costosa de implementar.</td></tr>
<tr><td><strong>NRU</strong> / <strong>NFU</strong></td><td>No usada recientemente / No usada frecuentemente: aproximaciones más baratas usando bits de referencia.</td></tr>
</tbody>
</table>
</div>

<h3>7.3 Segmentación</h3>
<div class="callout def"><strong class="callout__tag">Definición</strong> La <strong>segmentación</strong> divide el programa en <strong>segmentos</strong> de tamaño variable que corresponden a unidades lógicas (código, pila, datos), cada uno con su entrada en la <strong>tabla de segmentos</strong>.</div>
<ul>
  <li><strong>Ventajas:</strong> facilita la expansión y la compartición de segmentos.</li>
  <li><strong>Problema:</strong> la segmentación pura sufre <strong>fragmentación externa</strong>; se corrige con <strong>compactación</strong>.</li>
  <li><strong>Segmentación con paginación:</strong> los segmentos se dividen en páginas (ej.: MULTICS), combinando lo mejor de ambos esquemas.</li>
</ul>

<h2>8. Sistema de archivos</h2>
<div class="callout def"><strong class="callout__tag">Definición</strong> El <strong>sistema de archivos (SA)</strong> es la parte del SO que administra el almacenamiento y la recuperación de los datos en la memoria secundaria. Sus funciones: asignar espacio a los archivos, administrar el espacio libre y controlar el acceso a los datos.</div>
<p>Un <strong>archivo</strong> es un mecanismo de abstracción y la unidad lógica de información. Tiene <strong>atributos</strong>, un <strong>tipo</strong> y soporta acceso <strong>secuencial</strong> o <strong>aleatorio</strong>. Los <strong>directorios</strong> son tablas con una entrada por archivo y se organizan de forma jerárquica (rutas absolutas o relativas).</p>

<h3>8.1 Implementación de archivos</h3>
<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Mecanismo</th><th>Ventaja</th><th>Desventaja</th></tr></thead>
<tbody>
<tr><td><strong>Asignación contigua</strong></td><td>Implementación simple, excelente lectura.</td><td>Fragmentación externa; difícil expandir el archivo.</td></tr>
<tr><td><strong>Lista enlazada de bloques</strong></td><td>Sin fragmentación externa.</td><td>Acceso aleatorio lento; punteros consumen espacio del bloque.</td></tr>
<tr><td><strong>Lista enlazada con tabla (FAT)</strong></td><td>Bloques de tamaño potencia de 2; acceso aleatorio más fácil.</td><td>La FAT es estructura crítica y debe estar en memoria.</td></tr>
<tr><td><strong>Nodo-i (i-node)</strong></td><td>Solo necesita estar en memoria cuando el archivo está abierto.</td><td>Tamaño limitado de entradas directas (usa niveles de indirección).</td></tr>
</tbody>
</table>
</div>

<h3>8.2 Organización del disco y casos de estudio</h3>
<p>Un disco suele tener <strong>MBR</strong> (Master Boot Record, sector 0, con bootloader y tabla de particiones) en discos IDE, o tabla <strong>GPT</strong> en discos SATA (hasta 128 particiones). Cada partición tiene su propio SA (con superbloque, mapa de bloques libres, raíz, etc.).</p>
<ul>
  <li><strong>FAT</strong> (File Allocation Table): SA de MS-DOS y Windows 9x (1981); usa lista enlazada con tabla. Evoluciones: VFAT, FAT32, exFAT.</li>
  <li><strong>NTFS</strong> (New Technology File System): SA de Windows NT en adelante; es un <strong>SA por bitácora (journaling)</strong>; usa la <strong>MFT</strong> (Master File Table) con registros de 1 KB y clústeres de tamaño fijo.</li>
  <li><strong>Journaling:</strong> registra lo que va a hacer antes de hacerlo; si el sistema falla, al reiniciar completa el trabajo pendiente. Usa transacciones atómicas y operaciones idempotentes. Ejemplos: NTFS, ext3, ReiserFS.</li>
</ul>

<h2>9. Seguridad y protección</h2>
<p>Proteger la información contra el uso no autorizado es una preocupación central del SO. La seguridad tiene cuatro objetivos con sus amenazas:</p>
<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Objetivo</th><th>Amenaza</th></tr></thead>
<tbody>
<tr><td>Confidencialidad de los datos</td><td>Exposición de los datos</td></tr>
<tr><td>Integridad de los datos</td><td>Alteración de los datos</td></tr>
<tr><td>Disponibilidad del sistema</td><td>Negación del servicio (DoS)</td></tr>
</tbody>
</table>
</div>

<h3>9.1 Criptografía</h3>
<p>La <strong>criptografía</strong> convierte un texto simple en texto cifrado de modo que solo las personas autorizadas puedan revertirlo. Los algoritmos son públicos; el secreto está en las claves.</p>
<ul>
  <li><strong>Clave secreta (simétrica):</strong> la misma clave cifra y descifra; rápida. Se recomienda usar al menos 256 bits.</li>
  <li><strong>Clave pública (asimétrica):</strong> claves distintas para cifrar y descifrar; la clave pública cifra y la privada descifra. Más segura para el intercambio pero unas mil veces más lenta. Ejemplo: <strong>RSA</strong>, basado en la dificultad de factorizar números grandes.</li>
  <li><strong>Funciones de hash y firmas digitales:</strong> el hash (MD5, SHA-1) genera un resumen difícil de invertir; al cifrarlo con la clave privada se obtiene una <strong>firma digital</strong> que evita el repudio.</li>
  <li><strong>TPM</strong> (Trusted Platform Module): criptoprocesador que guarda claves en almacenamiento no volátil seguro.</li>
</ul>

<h3>9.2 Mecanismos de protección y autenticación</h3>
<p>Un <strong>dominio</strong> es un conjunto de pares (objeto, permisos). La matriz de protección se almacena por filas (<strong>lista de capacidades</strong>) o por columnas (<strong>ACL</strong>, lista de control de acceso). El <strong>POLA</strong> (Principio de menor autoridad) recomienda dar a cada dominio los mínimos privilegios necesarios.</p>
<p>La <strong>autenticación</strong> se basa en tres principios: algo que el usuario <strong>conoce</strong> (contraseña), algo que <strong>tiene</strong> (tarjeta de chip) o algo que <strong>es</strong> (biometría: iris, huellas, firma, voz).</p>

<h3>9.3 Malware</h3>
<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Tipo</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><strong>Virus</strong></td><td>Software que altera el funcionamiento de la computadora sin permiso; necesita un programa anfitrión para propagarse. Tipos: de compañía, de programa ejecutable, residente en memoria, del sector de arranque, de macro, de código fuente.</td></tr>
<tr><td><strong>Gusano (worm)</strong></td><td>Como un virus, pero se duplica de forma automática a través de la red sin anfitrión.</td></tr>
<tr><td><strong>Troyano</strong></td><td>Malware oculto dentro de un programa aparentemente legítimo; al ejecutarlo da acceso remoto al atacante.</td></tr>
<tr><td><strong>Spyware</strong></td><td>Se carga clandestinamente y espía en segundo plano (marketing, vigilancia, malware).</td></tr>
<tr><td><strong>Rootkit</strong></td><td>Programa que oculta su propia existencia (de firmware, hipervisor, kernel o biblioteca).</td></tr>
</tbody>
</table>
</div>
<p>Defensas: <strong>firewalls</strong> (de hardware o software) que filtran el tráfico de red, <strong>antivirus</strong> (exploración de firmas, comprobación de integridad y del comportamiento), firma de código y defensa en profundidad. Los <strong>ataques de desbordamiento de búfer</strong> aprovechan que C no comprueba los límites de los arreglos.</p>

<h2>10. Sistemas operativos distribuidos</h2>
<div class="callout def"><strong class="callout__tag">Definición</strong> Un <strong>sistema distribuido (SD)</strong> es una colección de computadoras independientes que aparecen ante los usuarios como una única computadora. Tiene dos aspectos: en hardware, las máquinas son autónomas; en software, el usuario percibe un solo sistema.</div>
<p>El hardware se clasifica con la <strong>taxonomía de Flynn (1972)</strong>: SISD, SIMD, MISD y MIMD (según el número de flujos de instrucciones y de datos).</p>

<h3>10.1 Acoplamiento de software y hardware</h3>
<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Configuración</th><th>Descripción</th></tr></thead>
<tbody>
<tr><td><strong>Software débil + hardware débil</strong></td><td>Sistemas operativos de <strong>red</strong>: alta autonomía, cada máquina con su SO. Ejemplo: red de estaciones de trabajo con servidores de archivos que los clientes montan.</td></tr>
<tr><td><strong>Software fuerte + hardware débil</strong></td><td>Sistema realmente <strong>distribuido</strong> sobre multicomputadoras: crea la ilusión de un único sistema de tiempo compartido (comunicación, procesos y archivos uniformes en todas las máquinas).</td></tr>
<tr><td><strong>Software fuerte + hardware fuerte</strong></td><td>Multiprocesadores de tiempo compartido: una sola cola de ejecución en memoria compartida; sincronización con semáforos y monitores.</td></tr>
</tbody>
</table>
</div>

<h3>10.2 Comunicación entre procesos</h3>
<p>Como en un SD no hay memoria compartida, la comunicación se hace por <strong>paso de mensajes</strong>. Métodos:</p>
<ul>
  <li><strong>Protocolos con capas:</strong> OSI, TCP/IP (para redes de área amplia).</li>
  <li><strong>Modelo cliente-servidor:</strong> protocolo solicitud/respuesta sencillo y sin conexión (<code>send</code> / <code>receive</code>), eficiente en LAN.</li>
  <li><strong>RPC</strong> (Remote Procedure Call): un proceso cliente llama a un procedimiento que se ejecuta en otra máquina; los <strong>resguardos (stubs)</strong> empaquetan los parámetros en mensajes y ocultan la red.</li>
  <li><strong>Comunicación en grupo:</strong> un mensaje a varios receptores a la vez (ej.: servidores de archivos replicados).</li>
</ul>
<p>Las primitivas pueden ser <strong>con bloqueo</strong> (síncronas: el emisor se suspende hasta enviar) o <strong>sin bloqueo</strong> (asíncronas: regresan de inmediato), y <strong>con o sin almacenamiento (buffer/buzón)</strong>.</p>

<h3>10.3 Sincronización en sistemas distribuidos</h3>
<p>Cada máquina tiene su propio reloj (cronómetro de cristal de cuarzo) y sus frecuencias difieren, lo que produce <strong>distorsión del reloj</strong>.</p>
<ul>
  <li><strong>Relojes lógicos (Lamport, 1978):</strong> lo importante no es la hora exacta sino el orden de los eventos. La relación <strong>"ocurre antes de"</strong> (\\(a \\rightarrow b\\)) es transitiva; eventos sin relación se llaman <strong>concurrentes</strong>.</li>
  <li><strong>Relojes físicos:</strong> deben coincidir con el tiempo real. Se basan en <strong>TAI</strong> (Tiempo Atómico Internacional, átomo de cesio 133) y <strong>UTC</strong> (con segundos de salto). Algoritmos: Cristian, Berkeley, con promedio.</li>
  <li><strong>Exclusión mutua distribuida:</strong> algoritmo centralizado (el más eficiente, 3 mensajes), distribuido (2(n−1) mensajes) y de anillo de fichas (token).</li>
</ul>

<h3>10.4 Transacciones atómicas y sistema distribuido de archivos</h3>
<div class="callout def"><strong class="callout__tag">Definición</strong> Una <strong>transacción atómica</strong> es una abstracción de alto nivel que agrupa operaciones con cuatro propiedades <strong>ACID</strong>: <strong>Atómica</strong> (indivisible), <strong>Consistente</strong>, <strong>Aislada</strong> y <strong>Durable</strong>.</div>
<p>Primitivas: <code>BEGIN-TRANSACTION</code>, <code>END-TRANSACTION</code>, <code>ABORT-TRANSACTION</code>, <code>READ</code>, <code>WRITE</code>. Se implementan con <strong>espacio de trabajo privado</strong> o <strong>bitácora de escritura anticipada</strong>, sobre <strong>almacenamiento estable</strong> (dos discos con resguardos idénticos). El control de concurrencia se logra con <strong>cerraduras (locks)</strong>.</p>
<p>El corazón de un SD es el <strong>sistema distribuido de archivos</strong>, que distingue el <strong>servicio de archivos</strong> (la interfaz que se ofrece a los clientes) del <strong>servidor de archivos</strong> (el proceso que la implementa). Aspectos de diseño: modelo <strong>carga/descarga</strong> vs <strong>acceso remoto</strong>, servidores <strong>con o sin estado</strong>, uso de <strong>cachés</strong> y <strong>réplica</strong> de archivos. Un ejemplo clásico es <strong>NFS</strong> (Network File System): los servidores exportan directorios y los clientes los montan de forma remota; su implementación usa la capa <strong>VFS</strong> con nodos-v.</p>
`,
  quiz: [
    {
      q: "¿Cuál es la función del kernel o núcleo del SO?",
      opts: ["Compilar los programas del usuario", "Conceder el acceso al hardware de forma segura a todo el software que lo solicita", "Almacenar los archivos en disco", "Traducir el lenguaje de alto nivel a binario"],
      a: 1,
      exp: "El kernel es la parte fundamental del SO que concede acceso seguro al hardware a todo el software que lo solicita."
    },
    {
      q: "Un proceso que puede ejecutarse pero está esperando a que la CPU se libere, está en estado…",
      opts: ["Bloqueado", "En ejecución", "Listo", "Terminado"],
      a: 2,
      exp: "El estado 'Listo' indica que el proceso podría ejecutarse pero la CPU está ocupada. 'Bloqueado' es cuando espera un evento de E/S."
    },
    {
      q: "¿Qué estructura guarda toda la información de un proceso (contador de programa, registros, estado, mapa de memoria)?",
      opts: ["La tabla de páginas", "El PCB (Bloque de Control de Proceso)", "El semáforo", "La MMU"],
      a: 1,
      exp: "Cada proceso tiene su PCB, donde el SO resguarda todo su estado, especialmente durante el cambio de contexto."
    },
    {
      q: "¿Qué comparten entre sí los hilos de un mismo proceso?",
      opts: ["El contador de programa y la pila", "Los registros", "El espacio de direcciones (código y datos) y los archivos abiertos", "El estado de ejecución"],
      a: 2,
      exp: "Los hilos comparten el espacio de direcciones, los archivos abiertos y los recursos del proceso; cada hilo tiene su propio PC, registros y pila."
    },
    {
      q: "¿Cuál de estos algoritmos de planificación es APROPIATIVO?",
      opts: ["FCFS", "SJF (Shortest Job First)", "Round Robin", "Ninguno es apropiativo"],
      a: 2,
      exp: "Round Robin asigna un quantum fijo y, al vencerse, suspende el proceso (apropiativo). FCFS y SJF son no apropiativos."
    },
    {
      q: "El tiempo de espera de un proceso se calcula como…",
      opts: ["TE = tf - ti", "TE = TS - tCPU", "TE = tCPU / TS", "TE = ti - tf"],
      a: 1,
      exp: "El tiempo de espera es el tiempo de servicio (retorno) menos el tiempo de CPU efectivo: TE = TS - tCPU."
    },
    {
      q: "¿Qué problema puede generar la exclusión mutua cuando dos procesos quedan bloqueados esperando recursos que el otro tiene?",
      opts: ["Condición de carrera", "Interbloqueo (deadlock)", "Fallo de página", "Fragmentación externa"],
      a: 1,
      exp: "El interbloqueo o abrazo mortal ocurre cuando los procesos se bloquean mutuamente esperando recursos retenidos por el otro."
    },
    {
      q: "En la memoria virtual, ¿qué ocurre cuando se referencia una página que no está en memoria física?",
      opts: ["Una condición de carrera", "Un fallo de página", "Un cambio de contexto", "Una interrupción de reloj"],
      a: 1,
      exp: "Se produce un fallo de página: el SO debe traer la página desde el disco a un marco de la memoria física."
    },
    {
      q: "¿Qué algoritmo de reemplazo de página es ideal e irrealizable, y se usa solo como referencia?",
      opts: ["FIFO", "LRU", "Óptimo", "NRU"],
      a: 2,
      exp: "El algoritmo Óptimo expulsa la página que tardará más en volver a usarse; requiere conocer el futuro, por lo que es irrealizable."
    },
    {
      q: "Según Lamport, en la sincronización de relojes lógicos de un sistema distribuido, lo importante es…",
      opts: ["Que todos los relojes marquen la hora exacta del UTC", "Que los procesos coincidan en el ORDEN en que ocurren los eventos", "Que cada máquina tenga un reloj atómico", "Eliminar por completo la distorsión del reloj"],
      a: 1,
      exp: "Lamport mostró que no hace falta una hora absoluta: basta con coincidir en el orden de los eventos (relación 'ocurre antes de')."
    }
  ],
  cards: [
    { q: "¿Qué es un sistema operativo (las dos vistas)?", a: "Vista del usuario: máquina extendida que oculta el hardware. Vista del administrador: gestor de los recursos (CPU, memoria, E/S, información)." },
    { q: "¿Qué es una llamada al sistema (SysCall)?", a: "El método que usan los programas para comunicarse con el núcleo cuando necesitan acceder al hardware, a otros procesos o al propio núcleo." },
    { q: "Microkernel: ¿qué es y qué beneficios tiene?", a: "El SO se divide en módulos pequeños; solo el microkernel corre en modo kernel. Beneficios: más confiable, más fácil de portar y de extender." },
    { q: "¿Qué es un proceso y qué es un hilo?", a: "Proceso: instancia de un programa en ejecución (con su espacio de direcciones). Hilo: unidad de ejecución dentro del proceso, con su propio PC, registros y pila, pero que comparte el espacio de direcciones." },
    { q: "Diferencia entre planificación apropiativa y no apropiativa", a: "Apropiativa: el proceso se ejecuta por un tiempo máximo y luego se lo suspende (Round Robin). No apropiativa: corre hasta bloquearse o liberar la CPU voluntariamente (FCFS, SJF)." },
    { q: "¿Qué es un semáforo y qué tipos hay?", a: "Variable entera con operaciones atómicas wait/down y signal/up. Binarios (mutex) para exclusión mutua; contadores para contar recursos." },
    { q: "¿Qué es la memoria virtual?", a: "Técnica que permite ejecutar programas mayores que la memoria física dividiendo el espacio en páginas y los marcos físicos, cargándolas a demanda; un fallo de página trae la página del disco." },
    { q: "Reemplazo de página: Óptimo, FIFO y LRU", a: "Óptimo: expulsa la que tardará más en usarse (irrealizable). FIFO: expulsa la más antigua. LRU: expulsa la que hace más tiempo no se usa (buena aproximación al óptimo)." },
    { q: "¿Qué es un sistema distribuido?", a: "Una colección de computadoras independientes (hardware autónomo) que aparecen ante el usuario como una única computadora (software uniforme)." },
    { q: "Propiedades ACID de una transacción atómica", a: "Atómica (indivisible), Consistente (no viola invariantes), Aislada (las concurrentes no interfieren) y Durable (los cambios comprometidos son permanentes)." }
  ]
});
