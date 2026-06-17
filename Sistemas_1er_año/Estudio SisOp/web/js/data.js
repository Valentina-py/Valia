/* ============================================================
   CONTENIDO DE ESTUDIO — SISTEMAS OPERATIVOS
   Unidades: Fundamentos · Procesos y Planificación de CPU ·
             Gestión de Memoria · Sistemas de Archivos · Entrada/Salida
   ============================================================ */
window.APP_DATA = {
  units: [

  /* ===================================================================
     UNIDAD 1 — FUNDAMENTOS DE LOS SISTEMAS OPERATIVOS
     =================================================================== */
  {
    id: "fundamentos",
    glyph: "⊞",
    title: "Fundamentos de los SO",
    desc: "Qué es un SO, evolución histórica, características modernas, Windows/Linux, arquitecturas y virtualización.",
    tool: "terminal",
    html: `
      <p class="lead">El <strong>sistema operativo (SO)</strong> es el software más importante de una computadora: actúa como <strong>intermediario entre el hardware y el usuario</strong>. Sin él, el hardware sería prácticamente inútil.</p>

      <div class="callout def">
        <strong class="callout__tag">Definición</strong>
        Un <strong>sistema operativo</strong> es un programa (o conjunto de programas) que administra los recursos del hardware, abstrae su complejidad y ofrece una interfaz para que los usuarios y las aplicaciones lo utilicen.
      </div>

      <h2>Las dos grandes visiones del SO</h2>
      <h3>1) Máquina extendida (interfaz usuario/computadora)</h3>
      <p>El SO ofrece una <strong>capa de abstracción</strong> que oculta los detalles del hardware. En vez de hablarle a los dispositivos en lenguaje máquina, el usuario interactúa mediante interfaces:</p>
      <ul>
        <li><strong>CLI (línea de comandos):</strong> comandos de texto. Ej.: Terminal de Linux, CMD, PowerShell. Precisa y automatizable, pero con curva de aprendizaje.</li>
        <li><strong>GUI (interfaz gráfica):</strong> ventanas, iconos y menús. Ej.: Explorador de Windows, GNOME/KDE, Finder. Intuitiva.</li>
        <li><strong>NUI (interfaz natural):</strong> gestos, voz, pantalla táctil. Ej.: asistentes de voz.</li>
      </ul>

      <h3>2) Administrador de recursos</h3>
      <p>Los recursos (CPU, memoria, dispositivos de E/S, almacenamiento) son <strong>limitados</strong> y deben compartirse con eficiencia, equidad y seguridad. El SO administra cuatro áreas:</p>
      <div class="tbl-wrap"><table class="tbl tbl--left">
        <thead><tr><th>Área</th><th>Qué hace</th><th>Conceptos clave</th></tr></thead>
        <tbody>
          <tr><td>CPU</td><td>Decide qué proceso se ejecuta y por cuánto tiempo.</td><td>Planificador (scheduler), despachador (dispatcher), evitar inanición.</td></tr>
          <tr><td>Memoria</td><td>Asigna y libera la RAM, protege los espacios.</td><td>Particionamiento, paginación, segmentación, memoria virtual.</td></tr>
          <tr><td>E/S</td><td>Coordina discos, impresoras, teclado, pantalla.</td><td>Drivers, buffers, spooling.</td></tr>
          <tr><td>Archivos</td><td>Organiza el almacenamiento persistente.</td><td>Sistemas de archivos (FAT, NTFS, ext4), metadatos, directorios.</td></tr>
        </tbody>
      </table></div>

      <div class="callout tip">
        <strong class="callout__tag">Objetivos de un SO</strong>
        <strong>Comodidad</strong> (facilitar el uso), <strong>eficiencia</strong> (aprovechar los recursos) y <strong>capacidad de evolución</strong> (poder actualizarse y adaptarse a nuevo hardware y software).
      </div>

      <h2>Evolución histórica de los SO</h2>
      <p>Cada etapa nace para resolver una limitación de la anterior. Conceptos transversales: <strong>procesamiento por lotes, spooling, multiprogramación y tiempo compartido</strong>.</p>
      <div class="tbl-wrap"><table class="tbl tbl--left">
        <thead><tr><th>Generación</th><th>Tecnología</th><th>Característica clave</th></tr></thead>
        <tbody>
          <tr><td>1ª (1940-1956)</td><td>Tubos al vacío</td><td>Sin SO. Programación en lenguaje máquina; procesamiento en serie (un usuario, un programa). ENIAC, UNIVAC.</td></tr>
          <tr><td>2ª (1956-1963)</td><td>Transistores</td><td><strong>Monitor residente</strong> y <strong>proceso por lotes (batch)</strong>: los trabajos se agrupan y ejecutan en secuencia.</td></tr>
          <tr><td>3ª (1964-1971)</td><td>Circuitos integrados</td><td><strong>Multiprogramación</strong> y <strong>spooling</strong>; primeros <strong>tiempo compartido</strong> (CTSS, MULTICS). Nace UNIX (1969). OS/360.</td></tr>
          <tr><td>4ª (1972-1980)</td><td>Microprocesador (VLSI)</td><td>La CPU en un chip. CP/M, MS-DOS. Llega la computación personal.</td></tr>
          <tr><td>Era del PC (1981-1995)</td><td>PC + GUI</td><td>Windows, Mac OS, AmigaOS; aparece Linux (1991). Interfaces gráficas (WIMP).</td></tr>
          <tr><td>Redes y nube (1985→hoy)</td><td>Internet, virtualización</td><td>SO de red y distribuidos, móviles (Android/iOS), nube y contenedores.</td></tr>
        </tbody>
      </table></div>
      <ul>
        <li><strong>Procesamiento por lotes:</strong> los trabajos se ejecutan uno tras otro sin interacción del usuario.</li>
        <li><strong>Spooling:</strong> usar el disco como buffer para dispositivos lentos (p. ej. cola de impresión).</li>
        <li><strong>Multiprogramación:</strong> varios programas en memoria; mientras uno espera por E/S, otro usa la CPU.</li>
        <li><strong>Tiempo compartido:</strong> la CPU alterna rápidamente entre usuarios (quantums), dando la ilusión de uso exclusivo.</li>
      </ul>

      <h2>Características de los SO modernos</h2>
      <ul>
        <li><strong>Multitarea:</strong> ejecutar varios programas concurrentemente.</li>
        <li><strong>Multiusuario:</strong> varios usuarios al mismo tiempo.</li>
        <li><strong>Multiprocesamiento (SMP):</strong> varias CPU idénticas comparten memoria bajo un único SO.</li>
        <li><strong>Multihilo:</strong> un proceso se divide en varios <strong>hilos</strong> que comparten memoria y se ejecutan concurrentemente.</li>
      </ul>
      <p>Estas características <strong>no son excluyentes</strong>: los SO modernos las combinan en enfoques híbridos.</p>

      <h2>Microsoft Windows y Linux</h2>
      <div class="tbl-wrap"><table class="tbl tbl--left">
        <thead><tr><th>Aspecto</th><th>Windows</th><th>Linux</th></tr></thead>
        <tbody>
          <tr><td>Modelo</td><td>Código <strong>cerrado/propietario</strong>, comercial, Microsoft</td><td>Código <strong>abierto (GPL)</strong>, comunitario, software libre</td></tr>
          <tr><td>Núcleo</td><td>Kernel <strong>híbrido</strong> (NT)</td><td>Kernel <strong>monolítico con módulos cargables</strong>, POSIX</td></tr>
          <tr><td>Archivos</td><td>NTFS, unidades C:\\ D:\\, rutas con <code>\\</code></td><td>ext4/btrfs/xfs, jerarquía única <code>/</code>, "todo es un archivo"</td></tr>
          <tr><td>Permisos</td><td>ACL, Active Directory, UAC</td><td>Permisos rwx (octal), SELinux/AppArmor</td></tr>
          <tr><td>Uso típico</td><td>Escritorio, gaming, empresa</td><td>Servidores, nube, embebidos, HPC, base de Android</td></tr>
        </tbody>
      </table></div>

      <h2>Arquitecturas (estructuras) de SO</h2>
      <div class="tbl-wrap"><table class="tbl tbl--left">
        <thead><tr><th>Arquitectura</th><th>Idea</th><th>Ventaja / Desventaja</th><th>Ejemplos</th></tr></thead>
        <tbody>
          <tr><td><strong>Monolítica</strong></td><td>Todo el SO en un único programa en modo privilegiado.</td><td>+ Rendimiento alto. − Un fallo derriba todo.</td><td>UNIX, Linux, MS-DOS</td></tr>
          <tr><td><strong>Por capas</strong></td><td>Niveles jerárquicos; cada capa usa la inferior.</td><td>+ Modular y fácil de depurar. − Sobrecarga entre capas.</td><td>THE, MULTICS</td></tr>
          <tr><td><strong>Microkernel</strong></td><td>Núcleo mínimo; los servicios corren en espacio de usuario y se comunican por <strong>paso de mensajes</strong>.</td><td>+ Fiable y seguro. − Más lento.</td><td>MINIX, QNX, L4</td></tr>
          <tr><td><strong>Cliente-servidor</strong></td><td>Servicios = servidores; procesos = clientes (petición/respuesta).</td><td>+ Escalable y distribuible. − Sobrecarga de comunicación.</td><td>Mach, Amoeba</td></tr>
          <tr><td><strong>Máquina virtual</strong></td><td>Un hipervisor emula hardware: varios SO sobre un mismo equipo.</td><td>+ Aislamiento y consolidación. − Overhead.</td><td>VMware, Hyper-V, Xen</td></tr>
          <tr><td><strong>Híbrida</strong></td><td>Combina monolítico + microkernel + capas.</td><td>+ Balance rendimiento/modularidad.</td><td>Windows NT/10/11, macOS (XNU)</td></tr>
        </tbody>
      </table></div>

      <h2>Virtualización</h2>
      <p>Tecnología que crea una <strong>versión virtual</strong> de un recurso (hardware, SO, red), permitiendo ejecutar varias "máquinas" sobre un mismo equipo físico.</p>
      <ul>
        <li><strong>Host (anfitrión):</strong> el equipo físico. <strong>Guest (huésped):</strong> el SO virtualizado.</li>
        <li><strong>Hipervisor:</strong> software que crea y ejecuta las máquinas virtuales.</li>
      </ul>
      <div class="tbl-wrap"><table class="tbl tbl--left">
        <thead><tr><th>Tipo</th><th>Dónde corre</th><th>Ejemplos</th></tr></thead>
        <tbody>
          <tr><td><strong>Hipervisor Tipo 1</strong> (bare-metal)</td><td>Directo sobre el hardware (sin SO host). Más rápido, para datacenter.</td><td>VMware ESXi, Hyper-V Server, Xen, KVM</td></tr>
          <tr><td><strong>Hipervisor Tipo 2</strong> (hosted)</td><td>Como app dentro de un SO anfitrión. Ideal para pruebas/aprendizaje.</td><td>VirtualBox, VMware Workstation</td></tr>
          <tr><td><strong>Contenedores</strong></td><td>Comparten el <strong>mismo kernel</strong> del host (namespaces + cgroups). Arranque casi instantáneo.</td><td>Docker, Kubernetes, LXC</td></tr>
        </tbody>
      </table></div>
      <div class="callout tip">
        <strong class="callout__tag">Practicá</strong>
        Probá comandos reales de Windows y Linux en la <a href="#/tool/terminal">Terminal interactiva</a>.
      </div>
    `,
    quiz: [
      { q: "¿Cuál es la función principal de un sistema operativo?", opts: ["Reemplazar al hardware", "Ser intermediario entre el hardware y el usuario, administrando recursos", "Únicamente ejecutar juegos", "Conectar a Internet"], a: 1, exp: "El SO administra los recursos del hardware y ofrece una interfaz al usuario." },
      { q: "La visión del SO como «máquina extendida» se refiere a:", opts: ["Que abstrae y oculta la complejidad del hardware", "Que agranda la memoria RAM", "Que aumenta el tamaño del disco", "Que duplica la CPU"], a: 0, exp: "Como máquina extendida, el SO ofrece una capa de abstracción sobre el hardware." },
      { q: "El <strong>spooling</strong> consiste en:", opts: ["Apagar el equipo", "Usar el disco como buffer para dispositivos lentos (ej. cola de impresión)", "Borrar archivos temporales", "Compilar programas"], a: 1, exp: "Spooling = Simultaneous Peripheral Operations On-Line: el disco actúa de buffer." },
      { q: "La <strong>multiprogramación</strong> permite que:", opts: ["Un solo programa use toda la CPU", "Mientras un programa espera por E/S, otro use la CPU", "Solo un usuario trabaje", "No haya interrupciones"], a: 1, exp: "Con varios programas en memoria, la CPU no queda ociosa durante las esperas de E/S." },
      { q: "El <strong>tiempo compartido</strong> se basa en:", opts: ["Ejecutar un trabajo por día", "Alternar rápidamente la CPU entre usuarios (quantums)", "Apagar la CPU entre tareas", "Procesar solo por lotes"], a: 1, exp: "Reparte la CPU en pequeños intervalos de tiempo, dando ilusión de uso exclusivo." },
      { q: "¿Qué arquitectura ejecuta los servicios en espacio de usuario comunicándose por paso de mensajes?", opts: ["Monolítica", "Microkernel", "Por capas pura", "MS-DOS"], a: 1, exp: "El microkernel deja un núcleo mínimo y mueve los servicios a espacio de usuario." },
      { q: "Linux utiliza fundamentalmente un kernel:", opts: ["Microkernel puro", "Monolítico con módulos cargables", "Exokernel", "Sin kernel"], a: 1, exp: "Linux es monolítico pero modular: carga y descarga módulos en caliente." },
      { q: "Windows NT/10/11 se considera una arquitectura:", opts: ["Monolítica pura", "Híbrida", "Exokernel", "Por lotes"], a: 1, exp: "El kernel NT combina elementos monolíticos y de microkernel: es híbrido." },
      { q: "Un <strong>hipervisor de Tipo 1</strong> se caracteriza por:", opts: ["Ejecutarse como app dentro de un SO anfitrión", "Ejecutarse directamente sobre el hardware (bare-metal)", "Ser un antivirus", "Necesitar Windows para arrancar"], a: 1, exp: "El Tipo 1 corre directo sobre el hardware; el Tipo 2 corre sobre un SO host." },
      { q: "Los <strong>contenedores</strong> (Docker) se diferencian de las máquinas virtuales en que:", opts: ["Emulan hardware completo", "Comparten el mismo kernel del host", "Necesitan un disco propio gigante", "No pueden ejecutar aplicaciones"], a: 1, exp: "Los contenedores comparten el kernel del host (namespaces + cgroups), por eso arrancan en segundos." },
      { q: "¿Cuál NO es una característica de los SO modernos?", opts: ["Multitarea", "Multiusuario", "Multihilo", "Monoprogramación obligatoria"], a: 3, exp: "Los SO modernos son multitarea, multiusuario y multihilo; la monoprogramación es lo opuesto." },
      { q: "En la 1ª generación (tubos al vacío), la programación se hacía:", opts: ["Con interfaces gráficas", "En lenguaje máquina, sin un SO", "Con Python", "Mediante la nube"], a: 1, exp: "No existían SO; se programaba directamente en lenguaje máquina y cableado." },
      { q: "El <strong>despachador (dispatcher)</strong> se encarga de:", opts: ["Elegir el algoritmo de disco", "Realizar el cambio de contexto entre procesos", "Formatear el disco", "Compilar el kernel"], a: 1, exp: "El planificador decide qué proceso sigue; el despachador ejecuta el cambio de contexto." },
      { q: "«Todo es un archivo» es un principio típico de:", opts: ["Windows", "Sistemas Unix/Linux", "MS-DOS", "La virtualización"], a: 1, exp: "En Unix/Linux los dispositivos y recursos se representan como archivos (ej. /dev/null)." },
    ],
    cards: [
      { q: "¿Qué es un sistema operativo?", a: "Software intermediario entre el hardware y el usuario que administra recursos y abstrae el hardware." },
      { q: "Las dos visiones del SO", a: "Máquina extendida (abstrae el hardware) y administrador de recursos (CPU, memoria, E/S, archivos)." },
      { q: "Tres objetivos de un SO", a: "Comodidad, eficiencia y capacidad de evolución." },
      { q: "CLI vs GUI", a: "CLI = comandos de texto (precisa). GUI = ventanas e iconos (intuitiva)." },
      { q: "Multiprogramación", a: "Varios programas en memoria; la CPU pasa a otro mientras uno espera por E/S." },
      { q: "Tiempo compartido", a: "La CPU alterna entre usuarios en quantums, dando ilusión de uso exclusivo." },
      { q: "Spooling", a: "Usar el disco como buffer para dispositivos lentos (cola de impresión)." },
      { q: "Arquitectura monolítica", a: "Todo el SO en un programa privilegiado. Rápido, pero un fallo derriba todo (Linux, UNIX)." },
      { q: "Microkernel", a: "Núcleo mínimo; servicios en espacio de usuario por paso de mensajes. Fiable pero más lento (MINIX, QNX)." },
      { q: "Kernel de Linux vs Windows", a: "Linux: monolítico modular. Windows NT: híbrido." },
      { q: "Hipervisor Tipo 1 vs Tipo 2", a: "Tipo 1: directo sobre el hardware (ESXi, Xen). Tipo 2: sobre un SO host (VirtualBox)." },
      { q: "Contenedores vs VM", a: "Los contenedores comparten el kernel del host (Docker); las VM emulan hardware completo." },
    ]
  },

  /* ===================================================================
     UNIDAD 2 — PROCESOS Y PLANIFICACIÓN DE CPU
     =================================================================== */
  {
    id: "procesos",
    glyph: "↻",
    title: "Procesos y Planificación de CPU",
    desc: "Procesos, estados, PCB, hilos, monitoreo, planificación de CPU y sección crítica (semáforos, Peterson).",
    tool: "cpu",
    html: `
      <p class="lead">Un <strong>proceso</strong> es un programa en ejecución: la unidad básica de trabajo de un SO. A diferencia del programa (entidad pasiva en disco), el proceso es una <strong>entidad activa</strong> que consume recursos.</p>

      <div class="callout def">
        <strong class="callout__tag">Proceso vs Programa</strong>
        <strong>Programa:</strong> conjunto de instrucciones almacenado (pasivo). <strong>Proceso:</strong> ese programa cargado y ejecutándose, con su contexto (registros, contador de programa, pila, recursos).
      </div>

      <h2>Estados de un proceso</h2>
      <p>El modelo de <strong>cinco estados</strong> describe el ciclo de vida de un proceso:</p>
      <div class="tbl-wrap"><table class="tbl tbl--left">
        <thead><tr><th>Estado</th><th>Significado</th></tr></thead>
        <tbody>
          <tr><td><strong>Nuevo</strong></td><td>El proceso se está creando.</td></tr>
          <tr><td><strong>Listo</strong></td><td>Preparado para usar la CPU, esperando turno.</td></tr>
          <tr><td><strong>En ejecución</strong></td><td>Está usando la CPU.</td></tr>
          <tr><td><strong>Bloqueado / Espera</strong></td><td>Esperando un evento (p. ej. fin de una E/S).</td></tr>
          <tr><td><strong>Terminado</strong></td><td>Finalizó su ejecución.</td></tr>
        </tbody>
      </table></div>
      <p>Transiciones principales: Nuevo →<em>admitir</em>→ Listo →<em>expedir</em>→ Ejecución. Desde Ejecución: →<em>fin de quantum</em>→ Listo, →<em>espera suceso</em>→ Bloqueado, →<em>salir</em>→ Terminado. Y Bloqueado →<em>ocurre suceso</em>→ Listo.</p>
      <div class="callout">
        <strong class="callout__tag">Suspendidos</strong>
        Si la memoria escasea, un proceso puede enviarse a disco: <strong>suspendido-listo</strong> y <strong>suspendido-bloqueado</strong> (modelo de siete estados).
      </div>

      <h2>PCB — Bloque de Control de Proceso</h2>
      <p>Estructura de datos donde el SO guarda toda la información de un proceso:</p>
      <ul>
        <li>Identificador del proceso (<strong>PID</strong>) y estado</li>
        <li>Contador de programa y registros de CPU</li>
        <li>Información de planificación (prioridad, colas)</li>
        <li>Información de memoria, contabilidad y estado de E/S</li>
      </ul>

      <h2>Cambio de contexto</h2>
      <p>Cuando la CPU pasa de un proceso a otro, el SO: guarda el contexto del proceso actual en su PCB, lo mueve a la cola que corresponda, selecciona otro proceso y restaura su contexto. Es trabajo "puro" del SO (overhead).</p>

      <h2>Hilos (threads)</h2>
      <p>Un proceso puede tener <strong>uno o varios hilos</strong> de ejecución que comparten su espacio de memoria y recursos. Crear un hilo y cambiar entre hilos es mucho más económico que con procesos.</p>
      <div class="callout">
        <strong class="callout__tag">Proceso vs Hilo</strong>
        Los procesos son independientes y no comparten memoria por defecto. Los hilos de un mismo proceso <strong>comparten</strong> el espacio de direcciones, pero cada uno tiene su propio contador de programa, registros y pila.
      </div>

      <h2>Monitoreo de procesos</h2>
      <h3>En Linux</h3>
      <div class="codeblock"><span class="cmt"># instantánea de procesos</span>
ps aux            <span class="cmt"># formato BSD (usuario, %CPU, %MEM, estado)</span>
ps -ef            <span class="cmt"># formato System V</span>
ps aux --sort=-%cpu   <span class="cmt"># ordenar por uso de CPU</span>
<span class="cmt"># monitor en tiempo real</span>
top               <span class="cmt"># teclas: P (CPU), M (memoria), k (kill), q (salir)</span>
htop              <span class="cmt"># versión mejorada y colorida</span>
<span class="cmt"># terminar procesos</span>
kill 1234         <span class="cmt"># envía señal al PID 1234</span>
pkill firefox     <span class="cmt"># por nombre</span>
nice / renice     <span class="cmt"># ajustar prioridad</span></div>
      <h3>En Windows</h3>
      <div class="codeblock"><span class="cmt"># Administrador de tareas: Ctrl+Shift+Esc</span>
tasklist                       <span class="cmt"># lista de procesos</span>
taskkill /PID 1234 /F          <span class="cmt"># terminar proceso</span>
taskkill /IM notepad.exe /F    <span class="cmt"># terminar por nombre</span>
<span class="cmt"># PowerShell</span>
Get-Process | Sort-Object CPU -Descending
Stop-Process -Name notepad</div>

      <h2>Planificación de CPU</h2>
      <p>El <strong>planificador</strong> decide qué proceso de la cola de listos usa la CPU. Buscamos optimizar varios criterios:</p>
      <div class="tbl-wrap"><table class="tbl tbl--left">
        <thead><tr><th>Criterio</th><th>Objetivo</th></tr></thead>
        <tbody>
          <tr><td>Uso de CPU</td><td>Mantener la CPU ocupada (maximizar).</td></tr>
          <tr><td>Productividad (throughput)</td><td>Más procesos completados por unidad de tiempo (maximizar).</td></tr>
          <tr><td>Tiempo de retorno (turnaround)</td><td>Tiempo desde que llega hasta que termina (minimizar).</td></tr>
          <tr><td>Tiempo de espera</td><td>Tiempo total en la cola de listos (minimizar).</td></tr>
          <tr><td>Tiempo de respuesta</td><td>Tiempo hasta la primera respuesta (minimizar).</td></tr>
        </tbody>
      </table></div>
      <p>Un algoritmo es <strong>expropiativo (apropiativo)</strong> si puede quitarle la CPU a un proceso en ejecución; <strong>no expropiativo</strong> si lo deja terminar su ráfaga.</p>

      <h3>Algoritmos clásicos</h3>
      <div class="tbl-wrap"><table class="tbl tbl--left">
        <thead><tr><th>Algoritmo</th><th>Idea</th><th>Tipo</th></tr></thead>
        <tbody>
          <tr><td><strong>FCFS / FIFO</strong></td><td>El primero que llega, primero se ejecuta.</td><td>No expropiativo</td></tr>
          <tr><td><strong>SJF (SPN)</strong></td><td>Primero el trabajo más corto.</td><td>No expropiativo</td></tr>
          <tr><td><strong>SRTF</strong></td><td>Primero el de menor tiempo restante (SJF apropiativo).</td><td>Expropiativo</td></tr>
          <tr><td><strong>Round Robin</strong></td><td>Cada proceso recibe un <strong>quantum</strong>; al agotarlo, va al final de la cola.</td><td>Expropiativo</td></tr>
          <tr><td><strong>Prioridades</strong></td><td>Se ejecuta el de mayor prioridad.</td><td>Ambas variantes</td></tr>
        </tbody>
      </table></div>
      <div class="formula-box">
        Tiempo de retorno (F) = Tiempo de finalización − Tiempo de llegada<br>
        Tiempo de espera (E) = Tiempo de retorno (F) − Ráfaga de CPU (t)<br>
        Penalización (P) = F / t
      </div>
      <div class="callout warn">
        <strong class="callout__tag">Inanición (starvation)</strong>
        Con prioridades o SJF, un proceso puede no ejecutarse nunca. Se corrige con <strong>envejecimiento (aging)</strong>: subir la prioridad a medida que espera.
      </div>
      <div class="callout tip">
        <strong class="callout__tag">Simulá</strong>
        Cargá procesos y compará FCFS, SJF, SRTF, RR y Prioridades con su diagrama de Gantt y métricas en el <a href="#/tool/cpu">Planificador de CPU</a>.
      </div>

      <h2>Sección crítica y sincronización</h2>
      <div class="callout def">
        <strong class="callout__tag">Definiciones</strong>
        Una <strong>sección crítica</strong> es la región de código donde se accede a un recurso compartido. Una <strong>condición de carrera</strong> ocurre cuando el resultado depende del orden en que se intercalan los procesos.
      </div>
      <p>Toda solución correcta debe cumplir tres requisitos:</p>
      <ol>
        <li><strong>Exclusión mutua:</strong> solo un proceso en la sección crítica a la vez.</li>
        <li><strong>Progreso:</strong> si nadie está dentro, la decisión de quién entra no se pospone indefinidamente.</li>
        <li><strong>Espera limitada:</strong> ningún proceso espera para siempre.</li>
      </ol>

      <h3>Algoritmo de Peterson (2 procesos)</h3>
      <div class="codeblock"><span class="cmt">// proceso i (el otro es j)</span>
flag[i] = true;
turn = j;
while (flag[j] && turn == j) <span class="cmt">; // espera</span>
   <span class="cmt">// --- sección crítica ---</span>
flag[i] = false;</div>
      <p>Cumple los tres requisitos usando <code>flag[]</code> (intención) y <code>turn</code> (turno).</p>

      <h3>Semáforos</h3>
      <p>Variable entera con dos operaciones atómicas: <code>wait()</code> (P, decrementa/espera) y <code>signal()</code> (V, incrementa/despierta).</p>
      <ul>
        <li><strong>Binario (mutex):</strong> inicializado en 1, controla un recurso.</li>
        <li><strong>Contador:</strong> controla varios recursos iguales.</li>
      </ul>
      <div class="codeblock"><span class="cmt">// productor-consumidor con buffer de N</span>
semaphore mutex = 1, empty = N, full = 0;
<span class="kw">Productor:</span>  wait(empty); wait(mutex); insertar(); signal(mutex); signal(full);
<span class="kw">Consumidor:</span> wait(full);  wait(mutex); retirar();  signal(mutex); signal(empty);</div>

      <h3>Test-and-Set (hardware)</h3>
      <div class="codeblock"><span class="cmt">// instrucción atómica</span>
bool TestAndSet(bool *t){ bool v=*t; *t=true; return v; }
while (TestAndSet(&lock)) <span class="cmt">; // espera activa</span>
   <span class="cmt">// --- sección crítica ---</span>
lock = false;</div>

      <div class="callout warn">
        <strong class="callout__tag">Interbloqueo (deadlock)</strong>
        Conjunto de procesos bloqueados permanentemente: cada uno espera un recurso que otro retiene. Requiere las 4 condiciones de Coffman: exclusión mutua, retención y espera, no apropiación y espera circular.
      </div>
    `,
    quiz: [
      { q: "¿Cuál es la diferencia entre proceso y programa?", opts: ["Son lo mismo", "El programa es pasivo (en disco); el proceso es el programa en ejecución (activo)", "El proceso está en disco y el programa en RAM", "El programa usa CPU y el proceso no"], a: 1, exp: "El proceso es un programa en ejecución, con su contexto y recursos." },
      { q: "¿Qué estructura guarda el PID, los registros y el estado de un proceso?", opts: ["La tabla FAT", "El PCB (Bloque de Control de Proceso)", "El MBR", "El semáforo"], a: 1, exp: "El PCB almacena toda la información necesaria para gestionar un proceso." },
      { q: "Un proceso que espera el fin de una operación de E/S está en estado:", opts: ["Listo", "En ejecución", "Bloqueado / Espera", "Nuevo"], a: 2, exp: "Mientras espera un evento (como E/S) el proceso está bloqueado." },
      { q: "El paso de Ejecución a Listo por agotar su tiempo se debe a:", opts: ["Espera de suceso", "Fin de quantum", "Terminación", "Admisión"], a: 1, exp: "Al agotar su quantum, el proceso vuelve a la cola de listos." },
      { q: "¿Cuál es la principal ventaja de los hilos frente a los procesos?", opts: ["Ocupan más memoria", "Comparten recursos y su cambio de contexto es más económico", "No pueden ejecutarse en paralelo", "No tienen pila"], a: 1, exp: "Los hilos comparten el espacio de memoria, lo que abarata su creación y conmutación." },
      { q: "En Linux, ¿qué comando muestra los procesos en tiempo real?", opts: ["ls", "top", "cat", "cd"], a: 1, exp: "top (o htop) muestra los procesos actualizándose en tiempo real." },
      { q: "En Windows, para terminar un proceso por su PID desde la consola se usa:", opts: ["kill", "taskkill /PID 1234 /F", "rm 1234", "ps 1234"], a: 1, exp: "taskkill /PID <id> /F fuerza la terminación del proceso." },
      { q: "El algoritmo en que «el primero que llega es el primero en ejecutarse» es:", opts: ["SJF", "Round Robin", "FCFS / FIFO", "SRTF"], a: 2, exp: "FCFS atiende en orden de llegada, sin expropiación." },
      { q: "¿Qué algoritmo es apropiativo y reparte la CPU en quantums?", opts: ["FCFS", "SJF", "Round Robin", "Prioridades no apropiativas"], a: 2, exp: "Round Robin da a cada proceso un quantum y luego lo manda al final de la cola." },
      { q: "El tiempo de espera (E) se calcula como:", opts: ["F + t", "F / t", "F − t (retorno menos ráfaga)", "t − F"], a: 2, exp: "E = tiempo de retorno (F) − ráfaga de CPU (t)." },
      { q: "SRTF (Shortest Remaining Time First) es:", opts: ["FCFS apropiativo", "La versión apropiativa de SJF", "Igual que Round Robin", "Un algoritmo de disco"], a: 1, exp: "SRTF expropia la CPU si llega un proceso con menor tiempo restante." },
      { q: "Los tres requisitos de una solución a la sección crítica son:", opts: ["Velocidad, tamaño y costo", "Exclusión mutua, progreso y espera limitada", "FIFO, LIFO y prioridad", "Lectura, escritura y ejecución"], a: 1, exp: "Exclusión mutua, progreso y espera limitada." },
      { q: "Una condición de carrera ocurre cuando:", opts: ["Dos discos compiten", "El resultado depende del orden en que se intercalan los procesos al usar un recurso compartido", "La CPU está ociosa", "Se llena la memoria"], a: 1, exp: "Sin control, intercalar accesos a un recurso compartido da resultados impredecibles." },
      { q: "En el productor-consumidor, el semáforo <code>empty</code> se inicializa en:", opts: ["0", "1", "N (tamaño del buffer)", "−1"], a: 2, exp: "empty cuenta los espacios libres, que al inicio son N (buffer vacío)." },
      { q: "El algoritmo de Peterson sirve para:", opts: ["Planificar el disco", "Resolver la exclusión mutua entre 2 procesos por software", "Traducir direcciones", "Comprimir archivos"], a: 1, exp: "Peterson es una solución por software a la sección crítica para 2 procesos." },
      { q: "Un interbloqueo (deadlock) requiere, entre otras, la condición de:", opts: ["Espera circular", "Compresión", "Paginación", "Spooling"], a: 0, exp: "Las 4 condiciones de Coffman incluyen la espera circular." },
    ],
    cards: [
      { q: "Proceso vs programa", a: "Programa = código pasivo en disco. Proceso = programa en ejecución (activo, con contexto)." },
      { q: "Los 5 estados de un proceso", a: "Nuevo, Listo, En ejecución, Bloqueado/Espera y Terminado." },
      { q: "¿Qué es el PCB?", a: "Bloque de Control de Proceso: guarda PID, estado, registros, contador de programa, info de memoria y E/S." },
      { q: "Cambio de contexto", a: "Guardar el estado del proceso actual en su PCB y restaurar el del siguiente. Es overhead del SO." },
      { q: "Proceso vs hilo", a: "Los hilos comparten memoria del proceso; cada uno tiene su PC, registros y pila. Más baratos de crear." },
      { q: "Comandos de monitoreo en Linux", a: "ps, top, htop (ver); kill, pkill (terminar); nice/renice (prioridad)." },
      { q: "Monitoreo en Windows", a: "Administrador de tareas, tasklist, taskkill, Get-Process / Stop-Process (PowerShell)." },
      { q: "Criterios de planificación", a: "Uso de CPU, throughput, turnaround, tiempo de espera y tiempo de respuesta." },
      { q: "Expropiativo vs no expropiativo", a: "Expropiativo puede quitar la CPU (RR, SRTF); no expropiativo deja terminar la ráfaga (FCFS, SJF)." },
      { q: "Fórmulas de planificación", a: "F = fin − llegada; E = F − t; Penalización P = F / t." },
      { q: "Requisitos de la sección crítica", a: "Exclusión mutua, progreso y espera limitada." },
      { q: "Semáforo: wait y signal", a: "wait (P) decrementa/espera; signal (V) incrementa/despierta. Binario = mutex." },
      { q: "Test-and-Set", a: "Instrucción atómica de hardware: lee y pone true a la vez. Garantiza exclusión mutua con espera activa." },
      { q: "4 condiciones de deadlock (Coffman)", a: "Exclusión mutua, retención y espera, no apropiación y espera circular." },
    ]
  },

  /* ===================================================================
     UNIDAD 3 — GESTIÓN DE MEMORIA
     =================================================================== */
  {
    id: "memoria",
    glyph: "▦",
    title: "Gestión de Memoria",
    desc: "Direcciones lógicas/físicas, particiones, fragmentación, paginación, segmentación y memoria virtual.",
    tool: "memory",
    html: `
      <p class="lead">La <strong>gestión de memoria</strong> es el conjunto de técnicas con que el SO controla y coordina el uso de la <strong>memoria principal (RAM)</strong>, repartiéndola entre los procesos.</p>

      <h2>Objetivos</h2>
      <ul>
        <li><strong>Protección:</strong> cada proceso tiene su espacio privado; no puede tocar el de otro.</li>
        <li><strong>Compartición:</strong> permitir que ciertos datos se compartan de forma controlada.</li>
        <li><strong>Reubicación:</strong> que un programa se ejecute sin importar dónde quede en memoria.</li>
        <li><strong>Organización lógica:</strong> reflejar la estructura del programa (código, datos, pila).</li>
      </ul>

      <h2>Jerarquía de memoria</h2>
      <p>De más rápida/cara/chica a más lenta/barata/grande: <strong>Registros → Caché (L1/L2/L3) → RAM → Disco (SSD/HDD) → Almacenamiento remoto</strong>.</p>

      <h2>Direcciones lógicas y físicas</h2>
      <div class="tbl-wrap"><table class="tbl tbl--left">
        <thead><tr><th>Dirección lógica (virtual)</th><th>Dirección física (real)</th></tr></thead>
        <tbody>
          <tr><td>La que genera y usa el programa</td><td>La ubicación real en la RAM</td></tr>
          <tr><td>Lo que el proceso "ve"; suele empezar en 0</td><td>Lo que el hardware "ve"</td></tr>
          <tr><td>Es relativa</td><td>Es absoluta</td></tr>
        </tbody>
      </table></div>
      <p>La <strong>MMU (Unidad de Gestión de Memoria)</strong> traduce por hardware, en tiempo de ejecución, cada dirección lógica a física.</p>
      <div class="formula-box">Dirección física = Dirección lógica + Registro Base<br>Verificación de límite: 0 ≤ dirección lógica &lt; Registro Límite</div>

      <h2>Asignación contigua y fragmentación</h2>
      <ul>
        <li><strong>Particiones fijas:</strong> la memoria se divide en bloques de tamaño fijo. Asignación con First Fit, Best Fit o Worst Fit.</li>
        <li><strong>Particiones variables:</strong> se asigna exactamente lo que pide cada proceso.</li>
      </ul>
      <div class="tbl-wrap"><table class="tbl tbl--left">
        <thead><tr><th>Fragmentación</th><th>Qué es</th></tr></thead>
        <tbody>
          <tr><td><strong>Interna</strong></td><td>Espacio desperdiciado <em>dentro</em> de un bloque asignado (el proceso es más chico que el bloque).</td></tr>
          <tr><td><strong>Externa</strong></td><td>Hay memoria libre total suficiente, pero está dividida en huecos no contiguos demasiado chicos.</td></tr>
        </tbody>
      </table></div>
      <p>La <strong>compactación</strong> mueve los procesos para juntar todos los huecos libres y combatir la fragmentación externa.</p>

      <h2>Paginación</h2>
      <div class="callout def">
        <strong class="callout__tag">Idea</strong>
        La memoria lógica se divide en <strong>páginas</strong> y la física en <strong>marcos (frames)</strong> del <strong>mismo tamaño</strong>. Una <strong>tabla de páginas</strong> indica en qué marco está cada página. Así se elimina la fragmentación externa.
      </div>
      <p>Para traducir una dirección lógica:</p>
      <div class="formula-box">
        número de página   = dirección lógica DIV tamaño de página<br>
        desplazamiento     = dirección lógica MOD tamaño de página<br>
        marco = tabla_de_páginas[número de página]<br>
        <b>dirección física = marco × tamaño de página + desplazamiento</b>
      </div>
      <div class="callout tip">
        <strong class="callout__tag">Practicá</strong>
        Traducí direcciones y simulá reemplazo de páginas (FIFO / LRU / Óptimo) en el <a href="#/tool/memory">Laboratorio de memoria</a>.
      </div>

      <h2>Segmentación</h2>
      <p>La memoria se divide en <strong>segmentos de tamaño variable</strong> según la estructura lógica (código, datos, pila). La <strong>tabla de segmentos</strong> guarda, por segmento, una <strong>Base</strong>, un <strong>Límite</strong> y los <strong>permisos</strong> (R/W/X).</p>
      <div class="formula-box">
        Una dirección virtual = (número de segmento, desplazamiento)<br>
        Si desplazamiento ≥ Límite → <b>error (segment fault)</b><br>
        Si no: dirección física = Base del segmento + desplazamiento
      </div>

      <h2>Segmentación paginada</h2>
      <p>Combina ambas: cada <strong>segmento</strong> se divide internamente en <strong>páginas</strong>, y cada segmento tiene su propia tabla de páginas. La dirección virtual se parte en: <strong>segmento | página | desplazamiento</strong>.</p>

      <h2>Memoria virtual y reemplazo de páginas</h2>
      <p>Con <strong>memoria virtual</strong>, un proceso puede tener un espacio de direcciones mayor que la RAM física; las páginas que no caben quedan en disco. La <strong>paginación por demanda</strong> trae cada página solo cuando se la necesita.</p>
      <ul>
        <li><strong>Hit (acierto):</strong> la página ya está en un marco.</li>
        <li><strong>Fallo de página (page fault):</strong> no está en RAM; hay que traerla de disco (y si no hay marco libre, reemplazar una).</li>
      </ul>
      <div class="tbl-wrap"><table class="tbl tbl--left">
        <thead><tr><th>Algoritmo</th><th>Qué página reemplaza</th></tr></thead>
        <tbody>
          <tr><td><strong>FIFO</strong></td><td>La más antigua (la que llegó primero), sin mirar usos.</td></tr>
          <tr><td><strong>LRU</strong></td><td>La menos recientemente usada.</td></tr>
          <tr><td><strong>Óptimo</strong></td><td>La que se usará más tarde en el futuro (teórico, cota ideal).</td></tr>
        </tbody>
      </table></div>
    `,
    quiz: [
      { q: "¿Qué hace la MMU?", opts: ["Administra el disco", "Traduce direcciones lógicas a físicas por hardware", "Planifica la CPU", "Comprime archivos"], a: 1, exp: "La Unidad de Gestión de Memoria traduce direcciones en tiempo de ejecución." },
      { q: "Una dirección lógica es:", opts: ["La ubicación real en la RAM", "La que genera y usa el programa (relativa)", "Un sector del disco", "El número de marco"], a: 1, exp: "La lógica/virtual es la que ve el proceso; la física es la real en RAM." },
      { q: "La fragmentación <strong>interna</strong> es:", opts: ["Huecos libres no contiguos", "Espacio desperdiciado dentro de un bloque asignado", "Un fallo de página", "Memoria compartida"], a: 1, exp: "Interna: el proceso es más chico que el bloque que se le asignó." },
      { q: "La fragmentación <strong>externa</strong> se combate con:", opts: ["Más fragmentación", "Compactación", "Apagar el equipo", "Spooling"], a: 1, exp: "La compactación junta los huecos libres en un bloque contiguo." },
      { q: "En paginación, páginas y marcos:", opts: ["Tienen distinto tamaño", "Tienen el mismo tamaño", "Solo existen en el disco", "No se relacionan"], a: 1, exp: "Página (lógica) y marco (física) tienen el mismo tamaño." },
      { q: "Con tamaño de página 1024, el desplazamiento de una dirección lógica se calcula como:", opts: ["dirección × 1024", "dirección DIV 1024", "dirección MOD 1024", "dirección + 1024"], a: 2, exp: "El desplazamiento = dirección lógica MOD tamaño de página." },
      { q: "La dirección física en paginación es:", opts: ["página × tamaño + marco", "marco × tamaño de página + desplazamiento", "base + límite", "marco + página"], a: 1, exp: "dirección física = marco × tamaño de página + desplazamiento." },
      { q: "¿Qué estructura usa la segmentación?", opts: ["Tabla de páginas", "Tabla de segmentos con base, límite y permisos", "FAT", "Mapa de bits"], a: 1, exp: "Cada segmento tiene base, límite y permisos en la tabla de segmentos." },
      { q: "En segmentación, si el desplazamiento ≥ límite del segmento:", opts: ["Se ignora", "Se produce un error (segment fault)", "Se suma al marco", "Se reinicia el proceso"], a: 1, exp: "El acceso fuera del límite es inválido: segment fault." },
      { q: "Un <strong>fallo de página (page fault)</strong> ocurre cuando:", opts: ["La página pedida no está en RAM", "La CPU está ociosa", "El disco está lleno", "Hay dos procesos"], a: 0, exp: "Si la página referida no está en un marco, hay que traerla de disco." },
      { q: "El algoritmo de reemplazo <strong>FIFO</strong> expulsa:", opts: ["La menos usada recientemente", "La más antigua en memoria", "La que se usará más tarde", "Una al azar"], a: 1, exp: "FIFO saca la página que llegó primero, sin mirar su uso." },
      { q: "El algoritmo <strong>LRU</strong> expulsa:", opts: ["La más antigua", "La menos recientemente usada", "La más grande", "La del segmento 0"], a: 1, exp: "LRU = Least Recently Used: la que hace más tiempo no se usa." },
      { q: "La <strong>memoria virtual</strong> permite:", opts: ["Que un proceso use un espacio mayor que la RAM física", "Eliminar el disco", "Apagar la CPU", "Duplicar la frecuencia"], a: 0, exp: "Las páginas que no caben en RAM se guardan en disco." },
      { q: "En segmentación paginada, la dirección virtual se divide en:", opts: ["Solo desplazamiento", "Segmento | página | desplazamiento", "Base | límite", "Marco | página"], a: 1, exp: "Cada segmento se pagina; la dirección lleva segmento, página y offset." },
      { q: "La fórmula de reubicación con registro base es:", opts: ["física = lógica − base", "física = lógica + registro base", "física = lógica × base", "física = base / lógica"], a: 1, exp: "Dirección física = dirección lógica + registro base." },
    ],
    cards: [
      { q: "Objetivos de la gestión de memoria", a: "Protección, compartición, reubicación y organización lógica." },
      { q: "Jerarquía de memoria", a: "Registros → Caché → RAM → Disco → Almacenamiento remoto (rápida/cara/chica → lenta/barata/grande)." },
      { q: "Dirección lógica vs física", a: "Lógica: la que ve el programa (relativa). Física: la real en RAM (absoluta). Traduce la MMU." },
      { q: "Fragmentación interna vs externa", a: "Interna: se desperdicia dentro del bloque. Externa: huecos libres no contiguos." },
      { q: "Paginación: páginas y marcos", a: "La memoria lógica en páginas y la física en marcos del mismo tamaño; la tabla de páginas mapea página → marco." },
      { q: "Traducir dirección (paginación)", a: "página = dir DIV tam; offset = dir MOD tam; física = marco × tam + offset." },
      { q: "Segmentación", a: "Segmentos de tamaño variable; tabla con base, límite y permisos. física = base + desplazamiento (si offset < límite)." },
      { q: "Segmentación paginada", a: "Cada segmento se divide en páginas. Dirección = segmento | página | desplazamiento." },
      { q: "Page fault (fallo de página)", a: "La página pedida no está en RAM; hay que traerla de disco (y reemplazar si no hay marco libre)." },
      { q: "FIFO vs LRU vs Óptimo", a: "FIFO: la más antigua. LRU: la menos usada recientemente. Óptimo: la que se usará más tarde (teórico)." },
      { q: "Memoria virtual", a: "Permite un espacio de direcciones mayor que la RAM; las páginas sobrantes van a disco (paginación por demanda)." },
      { q: "Compactación", a: "Mover procesos en memoria para unir los huecos libres y combatir la fragmentación externa." },
    ]
  },

  /* ===================================================================
     UNIDAD 4 — SISTEMAS DE ARCHIVOS
     =================================================================== */
  {
    id: "archivos",
    glyph: "▤",
    title: "Sistemas de Archivos",
    desc: "Archivos, atributos, tipos, métodos de acceso, directorios, asignación de espacio y FAT/NTFS/ext4.",
    tool: "terminal",
    html: `
      <p class="lead">Un <strong>archivo</strong> es una unidad lógica de información almacenada en memoria secundaria (disco, SSD, USB), identificada por un <strong>nombre y una extensión</strong>. El <strong>sistema de archivos</strong> es la parte del SO que los organiza.</p>

      <h2>Atributos (metadatos)</h2>
      <p>Cada archivo tiene metadatos que el SO usa para gestionarlo. Se guardan en <strong>inodos</strong> (Unix/Linux) o en la <strong>MFT</strong> (NTFS de Windows):</p>
      <ul>
        <li><strong>Nombre</strong> (hasta 255 caracteres; único en su directorio)</li>
        <li><strong>Tamaño</strong> en bytes</li>
        <li><strong>Fechas</strong>: creación, modificación (mtime), último acceso (atime)</li>
        <li><strong>Permisos</strong> y control de acceso (rwx en Linux; ACL en Windows)</li>
        <li><strong>Ubicación</strong> (ruta absoluta)</li>
      </ul>

      <h2>Tipos de archivos</h2>
      <div class="tbl-wrap"><table class="tbl tbl--left">
        <thead><tr><th>Tipo</th><th>Descripción</th><th>Ejemplos</th></tr></thead>
        <tbody>
          <tr><td><strong>Texto</strong></td><td>Caracteres legibles (ASCII/Unicode).</td><td><code>.txt</code>, <code>.log</code>, <code>.conf</code></td></tr>
          <tr><td><strong>Binarios</strong></td><td>Datos en formato no legible; requieren software específico.</td><td><code>.exe</code>, <code>.dll</code>, multimedia</td></tr>
          <tr><td><strong>Especiales</strong></td><td>Representaciones del SO para hardware o recursos ("todo es un archivo").</td><td><code>/dev/null</code>, <code>/dev/sda</code></td></tr>
        </tbody>
      </table></div>

      <h2>Operaciones sobre archivos</h2>
      <p>Crear, abrir (devuelve un <strong>descriptor</strong>), leer, escribir, cerrar (hace <em>flush</em> y libera el descriptor), eliminar, renombrar y copiar.</p>

      <h2>Métodos de acceso</h2>
      <ul>
        <li><strong>Secuencial:</strong> se leen los datos en orden (ej. audio).</li>
        <li><strong>Directo (aleatorio):</strong> acceso a cualquier posición (ej. base de datos).</li>
        <li><strong>Indexado:</strong> índices que apuntan a los bloques (ej. DBMS).</li>
      </ul>

      <h2>Directorios y rutas</h2>
      <p>Los <strong>directorios</strong> organizan los archivos. Estructuras posibles: un nivel, dos niveles, <strong>árbol</strong> (la más común) y grafo (con enlaces compartidos).</p>
      <ul>
        <li><strong>Ruta absoluta:</strong> desde la raíz (<code>/</code> en Linux, <code>C:\\</code> en Windows).</li>
        <li><strong>Ruta relativa:</strong> desde el directorio actual (<code>.</code> actual, <code>..</code> padre).</li>
      </ul>

      <h2>Asignación de espacio en disco</h2>
      <div class="tbl-wrap"><table class="tbl tbl--left">
        <thead><tr><th>Método</th><th>Idea</th><th>Ventaja / Desventaja</th></tr></thead>
        <tbody>
          <tr><td><strong>Contigua</strong></td><td>Bloques consecutivos.</td><td>+ Acceso muy rápido. − Fragmentación externa; difícil crecer.</td></tr>
          <tr><td><strong>Enlazada</strong></td><td>Cada bloque apunta al siguiente.</td><td>+ Sin fragmentación externa; crece fácil. − Acceso directo lento (FAT mejora esto).</td></tr>
          <tr><td><strong>Indexada</strong></td><td>Un bloque índice con todos los punteros.</td><td>+ Buen acceso directo. − Overhead del índice (inodos: directos/indirectos).</td></tr>
        </tbody>
      </table></div>

      <h2>Gestión del espacio libre</h2>
      <ul>
        <li><strong>Mapa de bits (bitmap):</strong> un bit por bloque (libre/ocupado). Fácil hallar bloques contiguos.</li>
        <li><strong>Lista enlazada:</strong> los bloques libres se encadenan. Ocupa poco, pero recorrerla es lento.</li>
      </ul>

      <h2>Sistemas de archivos concretos</h2>
      <div class="tbl-wrap"><table class="tbl tbl--left">
        <thead><tr><th>Sistema</th><th>Características</th></tr></thead>
        <tbody>
          <tr><td><strong>FAT32</strong></td><td>Antiguo y compatible, pero límite de <strong>4 GB por archivo</strong>.</td></tr>
          <tr><td><strong>exFAT</strong></td><td>Para USB/SD de gran capacidad; sin el límite de 4 GB, pero sin journaling.</td></tr>
          <tr><td><strong>NTFS</strong></td><td>Windows: usa la MFT, permisos, cifrado EFS, compresión y <strong>journaling</strong>. Diagnóstico: <code>chkdsk</code>.</td></tr>
          <tr><td><strong>ext4</strong></td><td>Estándar en Linux: usa inodos y journaling. Diagnóstico: <code>fsck</code>.</td></tr>
          <tr><td><strong>Btrfs / ZFS</strong></td><td>Modernos: Copy-on-Write, snapshots, checksums e integridad de datos.</td></tr>
        </tbody>
      </table></div>
      <div class="callout tip">
        <strong class="callout__tag">Practicá</strong>
        Recorré directorios y archivos con comandos reales (<code>ls</code>, <code>cd</code>, <code>cat</code>, <code>mkdir</code>) en la <a href="#/tool/terminal">Terminal interactiva</a>.
      </div>
    `,
    quiz: [
      { q: "Los metadatos de un archivo en Linux se guardan en:", opts: ["La FAT", "El inodo", "El MBR", "Un semáforo"], a: 1, exp: "En Unix/Linux, el inodo guarda los atributos; en NTFS es la MFT." },
      { q: "¿Cuál NO es un atributo típico de un archivo?", opts: ["Tamaño", "Fechas (creación/modificación)", "Permisos", "Velocidad de la CPU"], a: 3, exp: "Los atributos describen el archivo: nombre, tamaño, fechas, permisos, ubicación." },
      { q: "<code>/dev/null</code> es un ejemplo de archivo:", opts: ["De texto", "Binario ejecutable", "Especial (dispositivo)", "Comprimido"], a: 2, exp: "Es un archivo especial: «todo es un archivo» en Unix/Linux." },
      { q: "El método de acceso en el que se lee en orden es:", opts: ["Directo", "Secuencial", "Indexado", "Aleatorio"], a: 1, exp: "El acceso secuencial recorre los datos en orden." },
      { q: "Una ruta <strong>absoluta</strong>:", opts: ["Parte del directorio actual", "Parte de la raíz del sistema de archivos", "Es siempre relativa", "No existe en Windows"], a: 1, exp: "La absoluta comienza en la raíz (/ o C:\\); la relativa, en el directorio actual." },
      { q: "En la asignación <strong>contigua</strong>, una desventaja es:", opts: ["No permite acceso directo", "La fragmentación externa", "Que es lentísima de leer", "Que no usa el disco"], a: 1, exp: "Al exigir bloques consecutivos, sufre fragmentación externa y cuesta hacer crecer el archivo." },
      { q: "La asignación <strong>indexada</strong> usa:", opts: ["Un bit por bloque", "Un bloque índice con los punteros a los bloques", "Bloques consecutivos", "Una lista de procesos"], a: 1, exp: "El bloque índice reúne los punteros; permite buen acceso directo." },
      { q: "El <strong>mapa de bits</strong> sirve para:", opts: ["Planificar la CPU", "Gestionar el espacio libre del disco (1 bit por bloque)", "Traducir direcciones", "Cifrar archivos"], a: 1, exp: "Cada bit indica si un bloque está libre u ocupado." },
      { q: "El límite de 4 GB por archivo es típico de:", opts: ["NTFS", "ext4", "FAT32", "ZFS"], a: 2, exp: "FAT32 no admite archivos individuales mayores a 4 GB; exFAT lo soluciona." },
      { q: "¿Qué sistema de archivos usa la MFT y journaling en Windows?", opts: ["ext4", "NTFS", "FAT32", "Btrfs"], a: 1, exp: "NTFS usa la Master File Table y journaling; se diagnostica con chkdsk." },
      { q: "El <strong>journaling</strong> sirve para:", opts: ["Acelerar la CPU", "Recuperar el sistema de archivos tras un apagado abrupto", "Comprimir datos", "Cifrar la RAM"], a: 1, exp: "El journal registra operaciones para reproducirlas/revertirlas tras un corte." },
      { q: "La operación <strong>cerrar</strong> un archivo:", opts: ["Lo elimina", "Libera el descriptor y hace flush de los buffers", "Lo renombra", "Lo copia"], a: 1, exp: "close() escribe los buffers pendientes y libera el descriptor." },
      { q: "En Linux, los nombres de archivo son:", opts: ["Insensibles a mayúsculas", "Sensibles a mayúsculas (Archivo.txt ≠ archivo.txt)", "Máximo 8 caracteres", "Sin extensión"], a: 1, exp: "Linux es case-sensitive; Windows es case-insensitive." },
      { q: "La estructura de directorios más común hoy es:", opts: ["Un nivel", "Dos niveles", "Árbol jerárquico", "Sin directorios"], a: 2, exp: "El árbol, con raíz y subdirectorios anidados, es el modelo habitual." },
    ],
    cards: [
      { q: "¿Qué es un archivo?", a: "Unidad lógica de información en memoria secundaria, identificada por nombre y extensión." },
      { q: "¿Dónde se guardan los metadatos?", a: "En inodos (Unix/Linux) o en la MFT (NTFS de Windows)." },
      { q: "Atributos de un archivo", a: "Nombre, tamaño, fechas (creación/mod/acceso), permisos y ubicación (ruta)." },
      { q: "Tipos de archivos", a: "Texto (.txt), binarios (.exe), especiales (dispositivos como /dev/null)." },
      { q: "Métodos de acceso", a: "Secuencial (en orden), directo/aleatorio (cualquier posición) e indexado." },
      { q: "Ruta absoluta vs relativa", a: "Absoluta: desde la raíz (/ o C:\\). Relativa: desde el directorio actual (. y ..)." },
      { q: "Asignación contigua / enlazada / indexada", a: "Contigua: bloques seguidos. Enlazada: cada bloque apunta al siguiente. Indexada: un bloque índice con punteros." },
      { q: "Gestión del espacio libre", a: "Mapa de bits (1 bit por bloque) o lista enlazada de bloques libres." },
      { q: "FAT32", a: "Compatible pero con límite de 4 GB por archivo. exFAT lo soluciona para USB/SD." },
      { q: "NTFS vs ext4", a: "NTFS (Windows): MFT, permisos, cifrado, journaling, chkdsk. ext4 (Linux): inodos, journaling, fsck." },
      { q: "Journaling", a: "Registro de operaciones que permite recuperar el FS tras un apagado abrupto." },
      { q: "Btrfs / ZFS", a: "Sistemas modernos con Copy-on-Write, snapshots y checksums de integridad." },
    ]
  },

  /* ===================================================================
     UNIDAD 5 — SISTEMA DE ENTRADA / SALIDA
     =================================================================== */
  {
    id: "es",
    glyph: "⇄",
    title: "Sistema de Entrada/Salida",
    desc: "Dispositivos, controladores, técnicas de E/S (polling, interrupciones, DMA), buffers y planificación de disco.",
    tool: "disk",
    html: `
      <p class="lead">El <strong>sistema de E/S</strong> gestiona la comunicación entre la computadora y los dispositivos (discos, teclado, impresora, red), ofreciendo una <strong>interfaz uniforme</strong> y controlando el hardware con eficiencia.</p>

      <h2>Funciones del sistema de E/S</h2>
      <ul>
        <li><strong>Abstracción</strong> de dispositivos (interfaz uniforme).</li>
        <li><strong>Control</strong> del acceso al hardware.</li>
        <li><strong>Manejo de buffers</strong> para compensar diferencias de velocidad.</li>
        <li><strong>Programación</strong> (interrupciones, polling) y <strong>gestión de errores</strong>.</li>
        <li><strong>Acceso concurrente</strong> de varios procesos a los dispositivos.</li>
      </ul>

      <h2>Tipos de dispositivos</h2>
      <ul>
        <li><strong>De bloque:</strong> transfieren datos en bloques (ej. disco duro, SSD).</li>
        <li><strong>De carácter:</strong> transfieren carácter por carácter (ej. teclado, mouse).</li>
      </ul>

      <h2>Conceptos clave</h2>
      <div class="tbl-wrap"><table class="tbl tbl--left">
        <thead><tr><th>Concepto</th><th>Qué es</th></tr></thead>
        <tbody>
          <tr><td><strong>Controlador (driver)</strong></td><td>Software puente entre el SO y un dispositivo específico; traduce las solicitudes del SO a comandos del hardware.</td></tr>
          <tr><td><strong>Puerto</strong></td><td>Punto de conexión/dirección para enviar y recibir datos (serie, paralelo).</td></tr>
          <tr><td><strong>Bus</strong></td><td>Líneas de comunicación: bus de datos, de direcciones y de control.</td></tr>
        </tbody>
      </table></div>

      <h2>Técnicas de E/S</h2>
      <div class="tbl-wrap"><table class="tbl tbl--left">
        <thead><tr><th>Técnica</th><th>Cómo funciona</th><th>Eficiencia</th></tr></thead>
        <tbody>
          <tr><td><strong>E/S programada (polling)</strong></td><td>La CPU consulta repetidamente si el dispositivo está listo.</td><td>Simple, pero <strong>desperdicia CPU</strong>.</td></tr>
          <tr><td><strong>E/S por interrupciones</strong></td><td>El dispositivo avisa a la CPU cuando termina.</td><td>La CPU queda libre mientras tanto. Más eficiente.</td></tr>
          <tr><td><strong>DMA</strong></td><td>Un controlador transfiere los datos directamente a memoria, sin que la CPU mueva cada dato.</td><td>La CPU solo interviene al inicio y al final.</td></tr>
        </tbody>
      </table></div>

      <h2>Buffering, caché y spooling</h2>
      <ul>
        <li><strong>Buffer:</strong> memoria temporal que compensa la diferencia de velocidad entre la CPU y los dispositivos. El <strong>doble buffer</strong> permite llenar uno mientras se vacía el otro.</li>
        <li><strong>Caché:</strong> memoria rápida con datos usados con frecuencia; un <strong>acierto (hit)</strong> evita acudir al medio lento.</li>
        <li><strong>Spooling:</strong> caso especial de buffering; encola trabajos (p. ej. de impresión) hasta que el dispositivo esté libre.</li>
      </ul>

      <h2>Planificación de disco</h2>
      <p>El SO ordena las solicitudes de acceso al disco para minimizar el <strong>movimiento del cabezal</strong> (suma de distancias entre pistas).</p>
      <div class="tbl-wrap"><table class="tbl tbl--left">
        <thead><tr><th>Algoritmo</th><th>Cómo atiende</th></tr></thead>
        <tbody>
          <tr><td><strong>FCFS</strong></td><td>En orden de llegada. Justo pero ineficiente.</td></tr>
          <tr><td><strong>SSTF</strong></td><td>Primero la pista más cercana al cabezal. Puede causar inanición.</td></tr>
          <tr><td><strong>SCAN (ascensor)</strong></td><td>Recorre en una dirección hasta el extremo y luego invierte.</td></tr>
          <tr><td><strong>C-SCAN</strong></td><td>Como SCAN, pero al llegar al extremo vuelve al inicio sin atender en el regreso.</td></tr>
          <tr><td><strong>LOOK / C-LOOK</strong></td><td>Como SCAN/C-SCAN, pero solo va hasta la última petición (no hasta el extremo físico).</td></tr>
        </tbody>
      </table></div>
      <div class="callout tip">
        <strong class="callout__tag">Practicá</strong>
        Cargá una cola de pistas y compará FCFS, SSTF, SCAN y C-SCAN con su recorrido y desplazamiento total en el <a href="#/tool/disk">Planificador de disco</a>.
      </div>

      <h2>RAID (almacenamiento redundante)</h2>
      <div class="tbl-wrap"><table class="tbl tbl--left">
        <thead><tr><th>Nivel</th><th>Idea</th></tr></thead>
        <tbody>
          <tr><td><strong>RAID 0</strong></td><td>Striping: reparte datos. + Rendimiento y capacidad. − Sin redundancia.</td></tr>
          <tr><td><strong>RAID 1</strong></td><td>Mirroring: copia espejo. + Seguridad. − Usa la mitad de la capacidad.</td></tr>
          <tr><td><strong>RAID 5</strong></td><td>Paridad distribuida; tolera la falla de 1 disco.</td></tr>
          <tr><td><strong>RAID 6</strong></td><td>Doble paridad; tolera 2 discos.</td></tr>
          <tr><td><strong>RAID 10</strong></td><td>Espejo + striping; rendimiento y seguridad (usa 50% de capacidad).</td></tr>
        </tbody>
      </table></div>
    `,
    quiz: [
      { q: "Un disco duro es un dispositivo de:", opts: ["Carácter", "Bloque", "Red", "Texto"], a: 1, exp: "Los discos transfieren datos en bloques; el teclado, carácter a carácter." },
      { q: "El <strong>controlador (driver)</strong> es:", opts: ["Un tipo de archivo", "El software puente entre el SO y un dispositivo", "Un algoritmo de CPU", "Una partición"], a: 1, exp: "El driver traduce las solicitudes del SO a comandos del hardware específico." },
      { q: "La técnica de E/S que <strong>desperdicia CPU</strong> consultando repetidamente es:", opts: ["DMA", "Interrupciones", "Polling (E/S programada)", "Spooling"], a: 2, exp: "En polling la CPU pregunta constantemente si el dispositivo está listo." },
      { q: "El <strong>DMA</strong> permite que:", opts: ["La CPU mueva cada dato", "Un controlador transfiera datos directamente a memoria sin la CPU", "Se apague el disco", "Se cifren los datos"], a: 1, exp: "El DMA libera a la CPU: el controlador transfiere a memoria directamente." },
      { q: "Las <strong>interrupciones</strong> son más eficientes que el polling porque:", opts: ["Consumen más energía", "Solo activan la CPU cuando hay algo que atender", "Apagan el dispositivo", "Borran el buffer"], a: 1, exp: "El dispositivo avisa al terminar; mientras tanto la CPU hace otra cosa." },
      { q: "El <strong>buffer</strong> sirve para:", opts: ["Cifrar datos", "Compensar la diferencia de velocidad entre CPU y dispositivos", "Planificar la CPU", "Aumentar la RAM física"], a: 1, exp: "Almacena datos temporalmente y evita pérdidas por diferencia de velocidad." },
      { q: "El <strong>spooling</strong> es típico de:", opts: ["La cola de impresión", "La planificación de CPU", "La traducción de direcciones", "El cifrado"], a: 0, exp: "Spooling encola trabajos (impresión) hasta que el dispositivo esté libre." },
      { q: "El algoritmo de disco que atiende primero la pista más cercana es:", opts: ["FCFS", "SSTF", "SCAN", "C-SCAN"], a: 1, exp: "SSTF (Shortest Seek Time First) elige la pista más próxima al cabezal." },
      { q: "SCAN se conoce como algoritmo:", opts: ["Del ascensor", "De la panadería", "De Peterson", "De Dijkstra"], a: 0, exp: "SCAN recorre como un ascensor: va hasta un extremo y vuelve." },
      { q: "Para medir la eficiencia de un algoritmo de disco se calcula:", opts: ["El número de archivos", "El desplazamiento total del cabezal (suma de distancias)", "La cantidad de RAM", "El número de procesos"], a: 1, exp: "Se suman las distancias entre pistas consecutivas atendidas." },
      { q: "RAID 0 (striping):", opts: ["Da redundancia", "Mejora rendimiento pero NO da redundancia", "Copia espejo", "Usa paridad"], a: 1, exp: "RAID 0 reparte datos y mejora velocidad, pero si falla un disco se pierde todo." },
      { q: "RAID 1 (mirroring):", opts: ["No protege los datos", "Duplica los datos en espejo (seguridad)", "Suma toda la capacidad", "Usa paridad doble"], a: 1, exp: "RAID 1 copia los mismos datos en dos discos; usa la mitad de la capacidad." },
      { q: "RAID 5 logra tolerancia a fallos mediante:", opts: ["Espejo total", "Paridad distribuida (tolera 1 disco)", "Striping sin redundancia", "Compresión"], a: 1, exp: "La paridad permite reconstruir un disco que falle sin duplicar todo." },
      { q: "Un <strong>acierto de caché (cache hit)</strong> significa que:", opts: ["El dato no está en caché", "El dato pedido está en la caché y se entrega rápido", "La caché está llena", "Falló el disco"], a: 1, exp: "Si el dato está en la caché (hit), se sirve sin acudir al medio lento." },
    ],
    cards: [
      { q: "Dispositivos de bloque vs carácter", a: "Bloque: en bloques (disco). Carácter: uno a uno (teclado, mouse)." },
      { q: "Controlador (driver)", a: "Software puente entre el SO y un dispositivo; traduce solicitudes a comandos del hardware." },
      { q: "Polling vs Interrupciones", a: "Polling: la CPU consulta y desperdicia tiempo. Interrupciones: el dispositivo avisa al terminar (más eficiente)." },
      { q: "DMA", a: "Acceso Directo a Memoria: el controlador transfiere a memoria sin que la CPU mueva cada dato." },
      { q: "Buffer", a: "Memoria temporal que compensa la diferencia de velocidad CPU/dispositivo. El doble buffer evita esperas." },
      { q: "Spooling", a: "Buffering especial que encola trabajos (impresión) hasta que el dispositivo esté libre." },
      { q: "Caché y cache hit", a: "Memoria rápida con datos frecuentes. Hit = el dato está y se entrega rápido; miss = hay que traerlo." },
      { q: "Algoritmos de disco", a: "FCFS, SSTF (más cercana), SCAN (ascensor), C-SCAN, LOOK/C-LOOK." },
      { q: "Desplazamiento del cabezal", a: "Suma de las distancias (en pistas) entre cada posición consecutiva atendida." },
      { q: "RAID 0 vs RAID 1", a: "RAID 0: rendimiento sin redundancia. RAID 1: espejo (seguridad), usa la mitad de la capacidad." },
      { q: "RAID 5 vs RAID 6", a: "RAID 5: una paridad (tolera 1 disco). RAID 6: doble paridad (tolera 2 discos)." },
      { q: "RAID 10", a: "Espejo + striping: rendimiento y seguridad, usando el 50% de la capacidad." },
    ]
  }

  ],

  /* ===================================================================
     PRÁCTICA — Ejercicios de los Trabajos Prácticos
     =================================================================== */
  practica: [
    {
      id: "tp1", unit: "fundamentos", glyph: "⊞",
      title: "TP 1 · Evolución y Arquitecturas",
      desc: "Preguntas integradoras sobre la evolución histórica de los SO y las arquitecturas.",
      exercises: [
        { q: "Nombrá las generaciones de los SO según su tecnología y la característica principal de cada una.",
          sol: "<strong>1ª (tubos al vacío):</strong> sin SO, lenguaje máquina, procesamiento en serie.<br><strong>2ª (transistores):</strong> monitor residente y proceso por lotes (batch).<br><strong>3ª (circuitos integrados):</strong> multiprogramación, spooling y tiempo compartido (OS/360, UNIX en 1969).<br><strong>4ª (microprocesador/VLSI):</strong> la CPU en un chip, computación personal (CP/M, MS-DOS).<br><strong>Era del PC y redes:</strong> GUI, Windows/Mac/Linux, Internet, nube y contenedores." },
        { q: "¿Qué problema resuelve la multiprogramación respecto del proceso por lotes simple?",
          sol: "En el batch simple la CPU queda ociosa mientras un trabajo espera por E/S. La <strong>multiprogramación</strong> mantiene varios programas en memoria: cuando uno se bloquea por E/S, la CPU pasa a ejecutar otro, aumentando el uso de CPU y la productividad." },
        { q: "Compará las arquitecturas monolítica y microkernel (estructura, ventajas y desventajas).",
          sol: "<strong>Monolítica:</strong> todo el SO en un único programa en modo privilegiado; comunicación por llamadas a función. + Rendimiento alto. − Un fallo derriba todo; difícil de extender (Linux, UNIX).<br><strong>Microkernel:</strong> núcleo mínimo y servicios en espacio de usuario que se comunican por paso de mensajes. + Fiable, seguro y extensible. − Más lento por la sobrecarga de mensajes (MINIX, QNX)." },
        { q: "¿Qué tipo de arquitectura implementan Linux y Windows? Justificá.",
          sol: "<strong>Linux:</strong> monolítica <em>modular</em> (kernel monolítico que carga/descarga módulos sin recompilar). Combina rendimiento con flexibilidad.<br><strong>Windows (kernel NT):</strong> <em>híbrida</em> (mezcla microkernel y monolítico, con capas y aspectos cliente-servidor). Balancea rendimiento (componentes en modo kernel) con estabilidad (servicios en modo usuario)." },
        { q: "Diferenciá hipervisor Tipo 1, Tipo 2 y contenedores.",
          sol: "<strong>Tipo 1 (bare-metal):</strong> corre directo sobre el hardware, sin SO host; máximo rendimiento (ESXi, Xen, Hyper-V Server).<br><strong>Tipo 2 (hosted):</strong> corre como aplicación dentro de un SO anfitrión; ideal para pruebas (VirtualBox, VMware Workstation).<br><strong>Contenedores:</strong> comparten el mismo kernel del host (namespaces + cgroups); arranque casi instantáneo y muy livianos, pero no permiten distintos SO (Docker, LXC)." }
      ]
    },
    {
      id: "tp3", unit: "procesos", glyph: "↻",
      title: "TP 3 · Planificación de CPU",
      desc: "Resolución del conjunto de procesos A–E con FCFS, SJF, Prioridades y Round Robin (q=3).",
      exercises: [
        { q: "Datos de los procesos. Llegada (C) y ráfaga de CPU (t):<br><div class='tbl-wrap'><table class='tbl'><thead><tr><th>Proceso</th><th>Llegada (C)</th><th>Ráfaga (t)</th><th>Prioridad</th></tr></thead><tbody><tr><td>A</td><td>4</td><td>1</td><td>2</td></tr><tr><td>B</td><td>0</td><td>5</td><td>1</td></tr><tr><td>C</td><td>1</td><td>4</td><td>3</td></tr><tr><td>D</td><td>8</td><td>3</td><td>2</td></tr><tr><td>E</td><td>12</td><td>2</td><td>2</td></tr></tbody></table></div>Resolvé con <strong>FCFS</strong>: diagrama de Gantt, tiempo de espera (E), retorno (F) y penalización (P) por proceso, y los promedios. (Menor número de prioridad = mayor prioridad.)",
          sol: "Orden por llegada: B, C, A, D, E.<br>Gantt: <code>| B(0-5) | C(5-9) | A(9-10) | D(10-13) | E(13-15) |</code><br><div class='tbl-wrap'><table class='tbl'><thead><tr><th>P</th><th>t</th><th>Fin</th><th>F=t+E</th><th>E</th><th>P=F/t</th></tr></thead><tbody><tr><td>A</td><td>1</td><td>10</td><td>6</td><td>5</td><td>6,00</td></tr><tr><td>B</td><td>5</td><td>5</td><td>5</td><td>0</td><td>1,00</td></tr><tr><td>C</td><td>4</td><td>9</td><td>8</td><td>4</td><td>2,00</td></tr><tr><td>D</td><td>3</td><td>13</td><td>5</td><td>2</td><td>1,67</td></tr><tr><td>E</td><td>2</td><td>15</td><td>3</td><td>1</td><td>1,50</td></tr></tbody></table></div><strong>Promedios:</strong> E = 2,40 · F = 5,40 · P = 2,43." },
        { q: "Resolvé el mismo conjunto con <strong>SJF</strong> (no apropiativo).",
          sol: "t=0 solo B → B(0-5). t=5 disponibles A(1) y C(4): el más corto es A → A(5-6). Luego C(6-10), D(10-13), E(13-15). Orden: B, A, C, D, E.<br>Gantt: <code>| B(0-5) | A(5-6) | C(6-10) | D(10-13) | E(13-15) |</code><br><div class='tbl-wrap'><table class='tbl'><thead><tr><th>P</th><th>t</th><th>Fin</th><th>F</th><th>E</th><th>P</th></tr></thead><tbody><tr><td>A</td><td>1</td><td>6</td><td>2</td><td>1</td><td>2,00</td></tr><tr><td>B</td><td>5</td><td>5</td><td>5</td><td>0</td><td>1,00</td></tr><tr><td>C</td><td>4</td><td>10</td><td>9</td><td>5</td><td>2,25</td></tr><tr><td>D</td><td>3</td><td>13</td><td>5</td><td>2</td><td>1,67</td></tr><tr><td>E</td><td>2</td><td>15</td><td>3</td><td>1</td><td>1,50</td></tr></tbody></table></div><strong>Promedios:</strong> E = 1,80 · F = 4,80 · P = 1,68." },
        { q: "Resolvé con <strong>Prioridades</strong> (no apropiativo, menor número = mayor prioridad).",
          sol: "t=0 solo B(pr1) → B(0-5). t=5 disponibles A(pr2) y C(pr3): gana A. Luego C, D, E. En este conjunto el orden coincide con SJF: B, A, C, D, E.<br>Gantt: <code>| B(0-5) | A(5-6) | C(6-10) | D(10-13) | E(13-15) |</code><br><strong>Promedios:</strong> E = 1,80 · F = 4,80 · P = 1,68 (idéntico a SJF aquí)." },
        { q: "Resolvé con <strong>Round Robin</strong>, quantum q = 3.",
          sol: "Cola circular (los recién llegados entran antes que el proceso que agota su quantum):<br>Gantt: <code>| B(0-3) | C(3-6) | B(6-8) | A(8-9) | C(9-10) | D(10-13) | E(13-15) |</code><br><div class='tbl-wrap'><table class='tbl'><thead><tr><th>P</th><th>t</th><th>Fin</th><th>F</th><th>E</th><th>P</th></tr></thead><tbody><tr><td>A</td><td>1</td><td>9</td><td>5</td><td>4</td><td>5,00</td></tr><tr><td>B</td><td>5</td><td>8</td><td>8</td><td>3</td><td>1,60</td></tr><tr><td>C</td><td>4</td><td>10</td><td>9</td><td>5</td><td>2,25</td></tr><tr><td>D</td><td>3</td><td>13</td><td>5</td><td>2</td><td>1,67</td></tr><tr><td>E</td><td>2</td><td>15</td><td>3</td><td>1</td><td>1,50</td></tr></tbody></table></div><strong>Promedios:</strong> E = 3,00 · F = 6,00 · P = 2,40." },
        { q: "¿Qué algoritmo resultó más eficiente y por qué?",
          sol: "<strong>SJF</strong> (y Prioridades, que dio igual) es el más eficiente: minimiza el tiempo de espera medio (1,80) y el de retorno (4,80) porque despacha primero los trabajos cortos, reduciendo el efecto convoy. <strong>FCFS</strong> es peor porque B (largo) retrasa a A y C. <strong>Round Robin</strong> da las peores medias aquí (penaliza al proceso corto A), pero a cambio ofrece mejor tiempo de respuesta y reparto equitativo (su ventaja real es la interactividad). Verificalo en el <a href='#/tool/cpu'>Planificador de CPU</a>." }
      ]
    },
    {
      id: "tp4", unit: "memoria", glyph: "▦",
      title: "TP 4 · Memoria: paginación y segmentación",
      desc: "Reemplazo de páginas (FIFO/LRU), traducción de direcciones segmentadas y segmentación paginada.",
      exercises: [
        { q: "Una computadora tiene 4 marcos (memoria inicialmente vacía). Las referencias a páginas son: <code>0, 7, 2, 7, 5, 8, 9, 2, 4</code>. ¿Cuántos fallos de página produce <strong>FIFO</strong>?",
          sol: "Cargas iniciales 0,7,2 (3 fallos). Ref 7 → hit. Ref 5 → fallo (marcos llenos: 0,7,2,5). Ref 8 → fallo, expulsa la más vieja (0). Ref 9 → fallo, expulsa 7. Ref 2 → hit (sigue en memoria). Ref 4 → fallo, expulsa 2.<br>Fallan: 0, 7, 2, 5, 8, 9, 4. <strong>Total: 7 fallos</strong> (hits en la 2ª «7» y en «2»). Probalo en el <a href='#/tool/memory'>Laboratorio de memoria</a>." },
        { q: "Mismo caso con <strong>LRU</strong>. ¿Cuántos fallos produce?",
          sol: "0,7,2 (fallos). 7 → hit (7 pasa a más reciente). 5 → fallo (marcos 0,7,2,5). 8 → fallo, expulsa LRU = 0. 9 → fallo, expulsa LRU = 2. 2 → fallo (ya fue expulsada), expulsa LRU = 7. 4 → fallo, expulsa LRU = 5.<br>Fallan: 0, 7, 2, 5, 8, 9, 2, 4. <strong>Total: 8 fallos</strong> (único hit: la 2ª «7»). Diferencia con FIFO: la página 2 cerca del final." },
        { q: "Segmentación con direcciones de 16 bits (4 bits segmento, 12 bits desplazamiento). Tabla: Seg0 base 0x2000 lím 4096 (RW-); Seg2 base 0x8000 lím 1024 (RW-). Traducí <code>0x0F00</code> (escritura) y <code>0x2200</code> (lectura).",
          sol: "<strong>0x0F00:</strong> dígito alto 0 → seg 0; desplazamiento 0xF00 = 3840. 3840 &lt; 4096 ✔ y RW- permite escritura ✔. Física = 0x2000 + 0xF00 = <strong>0x2F00</strong>.<br><strong>0x2200:</strong> seg 2; desplazamiento 0x200 = 512. 512 &lt; 1024 ✔ y RW- permite lectura ✔. Física = 0x8000 + 0x200 = <strong>0x8200</strong>." },
        { q: "En la misma tabla, Seg3 tiene base 0xC000, límite 512 y permisos R--. Traducí <code>0x3100</code> que es una <em>lectura de instrucción</em> (ejecución).",
          sol: "Seg 3; desplazamiento 0x100 = 256. 256 &lt; 512 ✔ (válido por límite), pero los permisos son <strong>R--</strong> (sin ejecución X). Como la operación es ejecución → <strong>VIOLACIÓN DE PERMISOS</strong> (el acceso se rechaza, aunque numéricamente sería 0xC100)." },
        { q: "Segmentación paginada: páginas de 1 KB (1024). Seg2 tiene límite 8 páginas; su tabla: pág1→marco2 (Presente=0), pág5→marco4 (P=1), pág7→marco16 (P=1). Traducí <code>0x081403</code>, <code>0x0805F0</code> y <code>0x082100</code>.",
          sol: "<strong>0x081403:</strong> seg 2, pág 5, desp 3. pág 5 &lt; 8 ✔ y P=1 → marco 4. base = 4×1024 = 4096 = 0x1000. Física = 0x1000 + 0x003 = <strong>0x1003</strong>.<br><strong>0x0805F0:</strong> seg 2, pág 1, desp 0x1F0. pág 1 &lt; 8 ✔ pero P=0 → <strong>PAGE FAULT</strong>.<br><strong>0x082100:</strong> seg 2, pág 8, desp 0x100. pág 8 ≥ límite 8 → <strong>SEGMENT FAULT</strong> (fuera de límite). Verificalo en el <a href='#/tool/memory'>Laboratorio de memoria</a>." }
      ]
    },
    {
      id: "tp5", unit: "es", glyph: "⇄",
      title: "TP 5 · Entrada/Salida: buffers, RAID y caché",
      desc: "Preguntas conceptuales del TP de E/S y un ejercicio de planificación de disco.",
      exercises: [
        { q: "¿Por qué es necesario el buffer en los sistemas de E/S y qué diferencia hay entre buffer simple y doble?",
          sol: "El buffer compensa la <strong>diferencia de velocidad</strong> entre la CPU/memoria (rápidas) y los dispositivos (lentos), evitando pérdida de datos y desacoplando productor y consumidor.<br><strong>Simple:</strong> una sola zona; mientras se llena no se puede vaciar, hay esperas.<br><strong>Doble:</strong> dos zonas; mientras una se llena, la otra se vacía en paralelo, eliminando esperas." },
        { q: "¿Qué sucede si el buffer se llena más rápido de lo que se vacía?",
          sol: "Se produce <strong>desbordamiento (overflow)</strong>: el productor genera datos más rápido de lo que el consumidor procesa. O bien se ralentiza/bloquea al productor (control de flujo / backpressure), o se <strong>pierden datos</strong>. En streaming se ve como pausas; en redes, como descarte de paquetes." },
        { q: "¿Qué diferencia principal existe entre RAID 0 y RAID 1? ¿Por qué RAID 5 usa paridad?",
          sol: "<strong>RAID 0 (striping):</strong> reparte datos entre discos → más rendimiento y capacidad, pero <strong>sin redundancia</strong> (si falla un disco, se pierde todo).<br><strong>RAID 1 (mirroring):</strong> copia espejo → seguridad, pero usa la mitad de la capacidad.<br><strong>RAID 5</strong> usa <strong>paridad distribuida</strong> para tolerar la falla de 1 disco sin tener que duplicar todos los datos: con la paridad (XOR) se reconstruye el disco perdido." },
        { q: "¿Por qué la memoria caché mejora el rendimiento y qué es un «cache hit»? ¿Por qué no se guarda todo en caché?",
          sol: "La caché es memoria muy rápida que guarda los datos usados con frecuencia, aprovechando la <strong>localidad</strong>; así se evitan accesos al medio lento. Un <strong>cache hit</strong> es cuando el dato pedido está en la caché y se entrega de inmediato (lo contrario es un <em>miss</em>). No se guarda todo porque la caché es <strong>pequeña y costosa</strong>; por eso se aplican políticas de reemplazo (como LRU)." },
        { q: "Planificación de disco. Cola de pistas: <code>98, 183, 37, 122, 14, 124, 65, 67</code>, cabezal en 53. Calculá el desplazamiento total con <strong>FCFS</strong> y con <strong>SSTF</strong>.",
          sol: "<strong>FCFS</strong> (en orden): 53→98→183→37→122→14→124→65→67. Distancias: 45+85+146+85+108+110+59+2 = <strong>640 pistas</strong>.<br><strong>SSTF</strong> (siempre la más cercana): 53→65→67→37→14→98→122→124→183. Distancias: 12+2+30+23+84+24+2+59 = <strong>236 pistas</strong>. SSTF reduce mucho el movimiento. Probalo en el <a href='#/tool/disk'>Planificador de disco</a>." }
      ]
    }
  ]
};
