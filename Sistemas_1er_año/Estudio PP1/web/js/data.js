/* ============================================================
   CONTENIDO DE ESTUDIO — Prácticas Profesionalizantes I
   Operador Básico de Computadora · 1er Año
   Basado en los apuntes y material de la cátedra.
   Cada unidad: { id, glyph, title, desc, tool?, html, quiz[], cards[] }
   ============================================================ */
window.APP_DATA = {
  units: [

  /* ===================================================================
     UNIDAD 1 — HARDWARE
     =================================================================== */
  {
    id: "hardware",
    glyph: "🖥️",
    title: "Hardware",
    desc: "El sistema informático, la CPU, la placa madre, memorias, puertos, periféricos y la fuente de alimentación.",
    tool: "bytes",
    html: `
      <p class="lead">Todo <strong>sistema informático</strong> está formado por tres subsistemas que trabajan juntos para ingresar, procesar, almacenar y obtener información.</p>

      <div class="mini-grid">
        <div class="mini-card"><div class="mini-card__title"><span class="emoji">🔩</span>Hardware</div><div class="mini-card__desc">Subsistema físico: elementos y soportes tangibles que permiten ingresar, procesar, almacenar datos y obtener resultados.</div></div>
        <div class="mini-card"><div class="mini-card__title"><span class="emoji">💿</span>Software</div><div class="mini-card__desc">Subsistema lógico: elementos no tangibles (los programas) que facilitan el tratamiento de la información.</div></div>
        <div class="mini-card"><div class="mini-card__title"><span class="emoji">👤</span>Humanware</div><div class="mini-card__desc">Subsistema humano: las personas que gestionan, operan y administran el sistema, y le dan significado.</div></div>
      </div>

      <div class="callout def">
        <strong class="callout__tag">Definición</strong>
        El <strong>hardware</strong> son todas las partes físicas y tangibles de una computadora: componentes eléctricos, electrónicos, electromecánicos y mecánicos, cables, gabinete y periféricos. La RAE lo define como el <em>«conjunto de los componentes que integran la parte material de una computadora»</em>.
      </div>

      <h2>¿Cómo funciona una computadora?</h2>
      <p>Una computadora es un aparato electrónico que <strong>interpreta y ejecuta instrucciones</strong> almacenadas en su memoria. Su trabajo se resume en un ciclo de tres fases:</p>
      <div class="formula-box"><strong>ENTRADA</strong> (datos) &nbsp;→&nbsp; <strong>PROCESAMIENTO</strong> (CPU) + ALMACENAMIENTO &nbsp;→&nbsp; <strong>SALIDA</strong> (resultados)</div>
      <p>Los bloques funcionales se comunican entre sí mediante caminos de cables o líneas conductoras que forman un <strong>bus</strong>.</p>

      <h2>Componentes principales</h2>

      <h3>Microprocesador (CPU)</h3>
      <p>La <strong>CPU</strong> (Unidad Central de Procesamiento) es el «cerebro» de la computadora: interpreta y ejecuta instrucciones y procesa datos. Cuando se fabrica como un único circuito integrado se llama <strong>microprocesador</strong>. El primero comercial fue el <strong>Intel 4004 (1971)</strong>.</p>
      <p>Sus partes internas:</p>
      <ul>
        <li><strong>ALU</strong> (Unidad Aritmético-Lógica): realiza las operaciones aritméticas y lógicas.</li>
        <li><strong>Unidad de Control</strong>: coordina todas las actividades y dirige el flujo de datos.</li>
        <li><strong>Registros</strong>: pequeñas memorias de acceso muy rápido para los datos en uso.</li>
        <li><strong>Memoria caché</strong>: memoria de alta velocidad que guarda datos frecuentes.</li>
      </ul>
      <p>Ejecuta instrucciones en un <strong>ciclo de instrucción</strong>: <em>búsqueda → decodificación → ejecución → almacenamiento del resultado</em>. Los procesadores <strong>multinúcleo (multicore)</strong> permiten procesamiento en paralelo.</p>

      <h3>Placa madre (motherboard)</h3>
      <p>Es la <strong>placa base</strong>: un gran circuito impreso que conecta todos los componentes. Determina las características y la capacidad de expansión del equipo. Contiene el <strong>chipset</strong>, que actúa como centro de conexión entre el microprocesador, la RAM, las ranuras de expansión y los discos.</p>

      <h3>Memorias</h3>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Memoria RAM</th><th>Memoria ROM</th></tr></thead>
        <tbody>
          <tr><td><em>Random Access Memory</em> (acceso aleatorio).</td><td><em>Read Only Memory</em> (solo lectura).</td></tr>
          <tr><td>Memoria principal y de trabajo.</td><td>Memoria interna y «oculta».</td></tr>
          <tr><td><strong>Volátil</strong>: se borra al apagar/reiniciar.</td><td><strong>No volátil</strong>: conserva la información.</td></tr>
          <tr><td>Guarda temporalmente los programas en uso. El micro solo trabaja con la RAM.</td><td>Se graba una vez; contiene la información de arranque y datos críticos.</td></tr>
        </tbody>
      </table>
      </div>
      <div class="callout tip">
        <strong class="callout__tag">Para entenderlo</strong>
        Todos los programas instalados están en el <strong>disco duro</strong>. Cuando abrís un programa, sus instrucciones pasan a la <strong>RAM</strong>, donde el microprocesador las busca rápidamente. Al cerrarlo, se liberan de la RAM. Por eso, con más RAM podés tener más programas abiertos a la vez.
      </div>
      <p>La tecnología actual de RAM es <strong>DDR</strong> (<em>Double Data Rate</em>): cada generación —DDR2, DDR3, <strong>DDR4</strong> (la más usada), DDR5— es más rápida y eficiente. <strong>No hay compatibilidad entre generaciones</strong>: la placa madre debe tener el zócalo correcto. Los módulos de PC se insertan en ranuras <strong>DIMM</strong>; en notebooks se usan las <strong>SO-DIMM</strong>, más cortas. Al elegir RAM importan: <strong>capacidad</strong> (GB), <strong>velocidad</strong> (MHz), <strong>tipo de DDR</strong>, <strong>latencia (CL)</strong> y <strong>compatibilidad</strong>.</p>

      <h3>Puertos y conectores</h3>
      <p>Un <strong>puerto</strong> es la ficha o interfaz para conectar dispositivos a la computadora.</p>
      <div class="mini-grid">
        <div class="mini-card"><div class="mini-card__title">USB</div><div class="mini-card__desc"><em>Bus Universal en Serie</em>. El más usado hoy para casi todos los periféricos.</div></div>
        <div class="mini-card"><div class="mini-card__title">VGA / HDMI</div><div class="mini-card__desc">Conexión de video: monitor u otra salida de imagen.</div></div>
        <div class="mini-card"><div class="mini-card__title">RJ-45 / Ethernet</div><div class="mini-card__desc">Conector de 8 terminales para red de datos (LAN) e Internet por cable.</div></div>
        <div class="mini-card"><div class="mini-card__title">PS/2</div><div class="mini-card__desc">Conectores antiguos para teclado (violeta) y mouse (verde).</div></div>
        <div class="mini-card"><div class="mini-card__title">Serie / Paralelo</div><div class="mini-card__desc">Serie: envía bit a bit. Paralelo: varios bits a la vez (impresoras antiguas).</div></div>
        <div class="mini-card"><div class="mini-card__title">Audio</div><div class="mini-card__desc">Parlantes, auriculares o micrófono.</div></div>
      </div>

      <h2>Periféricos o dispositivos</h2>
      <p>Los <strong>periféricos</strong> son los dispositivos que se conectan a los puertos y permanecen externos a la computadora. Se clasifican según su función:</p>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Tipo</th><th>Función</th><th>Ejemplos</th></tr></thead>
        <tbody>
          <tr><td><strong>Entrada</strong></td><td>Envían datos a la computadora.</td><td>Teclado, mouse, escáner, micrófono, cámara web, lector de código de barras, pantalla táctil.</td></tr>
          <tr><td><strong>Salida</strong></td><td>Reciben información de la computadora.</td><td>Monitor, impresora, parlantes.</td></tr>
          <tr><td><strong>Almacenamiento</strong></td><td>Guardan datos de forma permanente.</td><td>Disco rígido (HDD/SSD), CD, DVD, Blu-ray, pendrive.</td></tr>
          <tr><td><strong>Conectividad</strong></td><td>Intercambian datos entre computadoras.</td><td>Placa de red, módem, adaptador Wi-Fi, Bluetooth.</td></tr>
          <tr><td><strong>Mixtos (E/S)</strong></td><td>Entran y salen datos.</td><td>Pantalla táctil, impresora multifunción, módem.</td></tr>
        </tbody>
      </table>
      </div>

      <h2>Tipos de computadoras</h2>
      <ul>
        <li><strong>PC de escritorio</strong>: gabinete, monitor, teclado y mouse. Potente y ampliable.</li>
        <li><strong>Notebook</strong>: portátil, cómoda y fácil de transportar.</li>
        <li><strong>Netbook</strong>: más pequeña y liviana que la notebook; para tareas simples.</li>
        <li><strong>Ultrabook</strong>: delgada, liviana y de alto rendimiento.</li>
        <li><strong>Tablet</strong>: muy liviana, ideal para tareas básicas (navegar, multimedia).</li>
        <li><strong>MacBook</strong>: equipo de Apple, muy eficiente para tareas gráficas.</li>
      </ul>

      <h2>Fuente de alimentación (PSU)</h2>
      <p>Transforma la <strong>corriente alterna</strong> de la red eléctrica (220 V en Argentina) en <strong>corriente continua</strong> con los distintos voltajes que necesitan los componentes (5 a 12 V), e incluye protección frente a sobretensiones. Cumple cuatro funciones:</p>
      <div class="formula-box"><strong>Transformación</strong> → <strong>Rectificación</strong> → <strong>Filtrado</strong> → <strong>Estabilización</strong></div>
      <p>Se clasifica por su <strong>factor de forma</strong> (ATX —la más común—, SFX, SFX-L, TFX), por su <strong>cableado</strong> (no modular, semi-modular o modular), por su <strong>refrigeración</strong> (activa o pasiva) y por su <strong>potencia</strong> (de 180 W a 2000 W; lo habitual entre 450 y 850 W). Las antiguas fuentes <strong>AT</strong> fueron reemplazadas por las <strong>ATX</strong>, que se encienden con un pulsador conectado a la placa y son más seguras.</p>

      <div class="callout tip">
        <strong class="callout__tag">Herramienta</strong>
        Practicá las unidades de almacenamiento (bits, bytes, KB, MB, GB, TB) con el <a href="#/tool/bytes">Conversor de almacenamiento</a>.
      </div>
    `,
    quiz: [
      { q: "¿Qué subsistema corresponde a las personas que operan y administran el sistema?", opts: ["Hardware", "Software", "Humanware", "Firmware"], a: 2, exp: "El humanware es el subsistema humano del sistema informático." },
      { q: "La memoria que se borra al apagar la computadora es la…", opts: ["ROM", "RAM", "Disco duro", "Caché del disco"], a: 1, exp: "La RAM es volátil: pierde su contenido al cortar la energía." },
      { q: "¿Cuál es la función principal de la CPU?", opts: ["Almacenar archivos de forma permanente", "Interpretar y ejecutar instrucciones", "Transformar la corriente eléctrica", "Conectar a Internet"], a: 1, exp: "La CPU (microprocesador) interpreta y ejecuta instrucciones y procesa datos." },
      { q: "Un teclado es un periférico de…", opts: ["Salida", "Almacenamiento", "Entrada", "Conectividad"], a: 2, exp: "El teclado envía datos hacia la computadora: es de entrada." },
      { q: "La placa que conecta todos los componentes y contiene el chipset es la…", opts: ["Placa de video", "Placa madre", "Placa de red", "Fuente"], a: 1, exp: "La placa madre (motherboard) es la placa base del equipo." },
      { q: "La fuente de alimentación transforma la corriente…", opts: ["Continua en alterna", "Alterna en continua", "Alterna en alterna de mayor voltaje", "Continua en señal digital"], a: 1, exp: "Convierte la corriente alterna de la red en corriente continua para los componentes." },
      { q: "¿Qué unidad NO trabaja directamente con el microprocesador para los datos en uso?", opts: ["Memoria RAM", "Registros", "Caché", "Disco duro"], a: 3, exp: "El micro busca las instrucciones en la RAM; el disco duro es más lento y solo almacena." },
      { q: "Las partes internas de la CPU encargadas de las operaciones lógicas y de coordinar son…", opts: ["ALU y Unidad de Control", "RAM y ROM", "Chipset y BIOS", "DIMM y SO-DIMM"], a: 0, exp: "La ALU hace las operaciones; la Unidad de Control coordina." },
      { q: "Una impresora y unos parlantes son periféricos de…", opts: ["Entrada", "Salida", "Almacenamiento", "Entrada/Salida"], a: 1, exp: "Reciben información de la computadora: son de salida." },
      { q: "El conector RJ-45 sirve para…", opts: ["Conectar el monitor", "Conectar a una red de datos (LAN)", "Conectar parlantes", "Alimentar la placa"], a: 1, exp: "El RJ-45 (Ethernet) conecta la computadora a la red de datos." },
      { q: "¿Qué tecnología de RAM es la más usada actualmente?", opts: ["SRAM", "SDRAM sin DDR", "DDR4", "RIMM"], a: 2, exp: "La DDR4 es la generación más comercializada hoy." },
      { q: "Las ranuras de RAM de una notebook se llaman…", opts: ["DIMM", "SO-DIMM", "PCIe", "SATA"], a: 1, exp: "Las SO-DIMM son más cortas, pensadas para portátiles." },
      { q: "¿Cuál es el orden correcto del ciclo básico de una computadora?", opts: ["Salida → Proceso → Entrada", "Entrada → Proceso/Almacenamiento → Salida", "Proceso → Entrada → Salida", "Entrada → Salida → Proceso"], a: 1, exp: "Se reciben datos (entrada), se procesan/almacenan y se producen resultados (salida)." },
    ],
    cards: [
      { q: "Tres subsistemas de un sistema informático", a: "Hardware (físico), Software (lógico) y Humanware (humano)." },
      { q: "¿Qué es el hardware?", a: "Todas las partes físicas y tangibles de la computadora." },
      { q: "RAM vs ROM", a: "RAM: volátil, memoria de trabajo. ROM: no volátil, solo lectura, datos de arranque." },
      { q: "¿Qué es la CPU?", a: "Unidad Central de Procesamiento; interpreta y ejecuta instrucciones. Como circuito integrado = microprocesador." },
      { q: "Partes internas de la CPU", a: "ALU, Unidad de Control, Registros y Caché." },
      { q: "¿Qué es la placa madre?", a: "La placa base que conecta todos los componentes; contiene el chipset." },
      { q: "Tipos de periféricos", a: "Entrada, Salida, Almacenamiento, Conectividad y Mixtos (E/S)." },
      { q: "Funciones de la fuente de alimentación", a: "Transformación, Rectificación, Filtrado y Estabilización (de alterna a continua)." },
      { q: "¿Qué significa DDR?", a: "Double Data Rate; tecnología de la RAM actual (DDR2, DDR3, DDR4…)." },
      { q: "Puerto más usado hoy", a: "USB (Bus Universal en Serie)." },
      { q: "Primer microprocesador comercial", a: "Intel 4004, lanzado en 1971." },
      { q: "¿Por qué el micro usa la RAM y no el disco?", a: "La RAM es mucho más rápida; ahí están solo los programas abiertos." },
    ]
  },

  /* ===================================================================
     UNIDAD 2 — SOFTWARE Y HUMANWARE
     =================================================================== */
  {
    id: "software",
    glyph: "💿",
    title: "Software y Humanware",
    desc: "Definición y clasificación del software, sus características, niveles de usuario, licencias, seguridad informática y humanware.",
    html: `
      <div class="callout def">
        <strong class="callout__tag">Definición</strong>
        El <strong>software</strong> es el componente <em>lógico</em> de la computadora: el conjunto de <strong>programas y aplicaciones</strong> necesarios para ejecutar los procesos del sistema informático. Es un elemento lógico, no físico.
      </div>

      <h2>Clasificación del software</h2>
      <h3>Por su funcionalidad</h3>
      <div class="deflist">
        <div class="deflist__item"><strong>Software de sistema (o de base):</strong> los programas básicos que controlan la computadora. El principal es el <strong>sistema operativo</strong>, que coordina el hardware, organiza los archivos y gestiona errores.</div>
        <div class="deflist__item"><strong>Software de aplicación:</strong> permite realizar tareas específicas (ofimática, editores de texto, recreación, trabajo). Ayuda al usuario a hacer un trabajo determinado.</div>
        <div class="deflist__item"><strong>Software de programación:</strong> herramientas para crear otros programas usando lenguajes (C++, Java, C#, Python, etc.).</div>
        <div class="deflist__item"><strong>Software de gestión:</strong> orientado a la gestión integral de una empresa (contabilidad, facturación, nóminas, impuestos).</div>
      </div>
      <h3>Por su tipo de licencia</h3>
      <p>Software <strong>libre</strong> y software <strong>propietario</strong> (lo vemos más abajo).</p>

      <h2>Características del software</h2>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Tipo</th><th>Qué evalúa</th><th>Incluye</th></tr></thead>
        <tbody>
          <tr><td><strong>Operativas</strong></td><td>La «parte exterior», cómo se presenta y funciona.</td><td>Corrección, usabilidad, integridad, fiabilidad, eficiencia, seguridad.</td></tr>
          <tr><td><strong>De transición</strong></td><td>Su comportamiento al cambiar de entorno.</td><td>Interoperabilidad, reutilización, portabilidad.</td></tr>
          <tr><td><strong>De revisión</strong></td><td>La «calidad interior» de ingeniería.</td><td>Mantenibilidad, flexibilidad, extensibilidad, escalabilidad, capacidad de prueba, modularidad.</td></tr>
        </tbody>
      </table>
      </div>
      <div class="callout">
        <strong class="callout__tag">Clave</strong>
        El software <strong>no se fabrica, se desarrolla</strong> (análisis, diseño, desarrollo, implementación y evaluación). No se «estropea», pero <strong>se deteriora</strong> con los cambios si los fallos no se corrigen. La <strong>reusabilidad</strong> es clave para un componente de calidad.
      </div>

      <h2>Niveles de usuario</h2>
      <p>Un <strong>usuario</strong> es quien utiliza la computadora o el sistema operativo. Los <strong>perfiles o privilegios</strong> definen qué puede hacer cada uno y mejoran la seguridad.</p>
      <div class="mini-grid">
        <div class="mini-card"><div class="mini-card__title"><span class="emoji">👑</span>Administrador</div><div class="mini-card__desc">Cuenta por defecto. Instala software y periféricos, hace mantenimiento y crea otras cuentas.</div></div>
        <div class="mini-card"><div class="mini-card__title"><span class="emoji">🙂</span>Usuario común (limitado)</div><div class="mini-card__desc">Para el trabajo cotidiano: Internet, e-mail, ofimática, música y video. Sin permisos de administración.</div></div>
        <div class="mini-card"><div class="mini-card__title"><span class="emoji">👥</span>Invitado</div><div class="mini-card__desc">Para compartir datos puntualmente. Acceso limitado y sin contraseña.</div></div>
      </div>
      <div class="callout tip"><strong class="callout__tag">Recomendación</strong> Crear una cuenta por cada persona que use la PC: cada una tiene su escritorio, configuración y aplicaciones privadas. Conviene dejar la cuenta de administrador solo para tareas de administración.</div>

      <h2>Licencias de software</h2>
      <div class="callout def">
        <strong class="callout__tag">Definición</strong>
        Una <strong>licencia de software</strong> es un documento con directrices legalmente vinculantes para el uso y la distribución del software. Define los derechos y responsabilidades del autor, el proveedor y los usuarios finales, y protege la propiedad intelectual.
      </div>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Software libre</th><th>Software propietario</th></tr></thead>
        <tbody>
          <tr><td>Permite usar, estudiar, copiar, modificar el código fuente y distribuir el programa.</td><td>Código cerrado: limitado a ciertos usuarios; no se puede modificar ni compartir libremente.</td></tr>
          <tr><td>Sin restricciones de copia (puede ser gratuito o pago).</td><td>Se accede por compra o porque fue compartido.</td></tr>
        </tbody>
      </table>
      </div>
      <p>Las licencias de <strong>código abierto</strong> incluyen variantes: <strong>Dominio público</strong> (sin restricciones), <strong>Permisivas</strong> (requisitos mínimos, ej. Creative Commons Atribución), <strong>LGPL</strong> (enlazar bibliotecas abiertas) y <strong>Copyleft / GPL</strong> (recíprocas: las obras derivadas deben mantener la misma licencia).</p>

      <h2>Seguridad informática</h2>
      <p>Es el proceso de <strong>prevenir el uso indebido o no autorizado</strong> de un sistema informático, protegiendo la información frente a amenazas (virus, intrusos, robo de datos). Se apoya en herramientas (antivirus, firewalls, VPN) y, sobre todo, en el cuidado del usuario.</p>
      <h3>Los cuatro pilares</h3>
      <div class="mini-grid">
        <div class="mini-card"><div class="mini-card__title">Integridad</div><div class="mini-card__desc">Solo los usuarios autorizados pueden modificar los datos.</div></div>
        <div class="mini-card"><div class="mini-card__title">Confidencialidad</div><div class="mini-card__desc">Solo los usuarios autorizados acceden a la información.</div></div>
        <div class="mini-card"><div class="mini-card__title">Disponibilidad</div><div class="mini-card__desc">Los datos están disponibles cuando se los necesita.</div></div>
        <div class="mini-card"><div class="mini-card__title">Autenticación</div><div class="mini-card__desc">Permite validar la identidad de los usuarios.</div></div>
      </div>
      <h3>Tipos de seguridad</h3>
      <ul>
        <li><strong>Seguridad de software:</strong> protege aplicaciones y programas; se corrigen errores con actualizaciones.</li>
        <li><strong>Seguridad de red:</strong> varios niveles de protección (cortafuegos, antivirus, VPN, IPS).</li>
        <li><strong>Seguridad de hardware:</strong> protege los dispositivos (firewalls, proxy, módulos HSM con claves encriptadas).</li>
      </ul>
      <div class="callout warn"><strong class="callout__tag">Importante</strong> Hay que actualizar el software de seguridad constantemente, porque los atacantes desarrollan nuevos métodos. Capacitar a las personas es vital: un error de manejo puede abrir la puerta a software no deseado.</div>

      <h2>Humanware</h2>
      <p>El <strong>humanware</strong> es la <strong>dimensión humana</strong> de los sistemas tecnológicos: las personas que usan, operan, mantienen y crean los sistemas. Incluye el talento, la creatividad, la capacidad de resolver problemas, la experiencia y la habilidad para trabajar con tecnología.</p>
      <div class="callout"><strong class="callout__tag">Por qué importa</strong> Sin importar cuán avanzado sea el software o el hardware, su eficacia depende de las habilidades y el conocimiento de las personas. En una época en que el hardware y el software se pueden replicar, el humanware —la experiencia única de un equipo— es un <strong>diferenciador clave</strong>.</div>
    `,
    quiz: [
      { q: "El sistema operativo es un ejemplo de software de…", opts: ["Aplicación", "Programación", "Sistema (o de base)", "Gestión"], a: 2, exp: "El SO es el principal software de sistema: controla el hardware y los archivos." },
      { q: "¿Cuál de estas es una característica OPERATIVA del software?", opts: ["Portabilidad", "Modularidad", "Fiabilidad", "Escalabilidad"], a: 2, exp: "La fiabilidad es operativa. Portabilidad es de transición; modularidad y escalabilidad, de revisión." },
      { q: "El software, a diferencia del hardware…", opts: ["Se fabrica en serie", "Se desarrolla y se deteriora", "No cambia nunca", "Es siempre físico"], a: 1, exp: "El software se desarrolla (no se fabrica) y se deteriora si no se corrigen sus fallos." },
      { q: "La cuenta que puede instalar programas y crear otras cuentas es la de…", opts: ["Invitado", "Usuario común", "Administrador", "Usuario limitado"], a: 2, exp: "El administrador tiene todos los privilegios de gestión del equipo." },
      { q: "El software libre se caracteriza por…", opts: ["Tener siempre un precio alto", "Permitir copiar y modificar el código fuente", "Tener código cerrado", "No poder distribuirse"], a: 1, exp: "Permite usar, estudiar, modificar y distribuir el código libremente." },
      { q: "¿Cuáles son los cuatro pilares de la seguridad informática?", opts: ["Velocidad, costo, diseño, tamaño", "Integridad, confidencialidad, disponibilidad, autenticación", "Hardware, software, redes, nube", "Backup, antivirus, firewall, VPN"], a: 1, exp: "Integridad, confidencialidad, disponibilidad y autenticación." },
      { q: "El humanware se refiere a…", opts: ["Los programas del sistema", "Las partes físicas", "Las personas que usan y crean los sistemas", "Los manuales impresos"], a: 2, exp: "Es la dimensión humana: talento, experiencia y habilidades de las personas." },
      { q: "Una licencia de software sirve para…", opts: ["Acelerar la PC", "Definir derechos de uso y distribución y proteger la propiedad intelectual", "Eliminar virus", "Aumentar la RAM"], a: 1, exp: "Es un documento legal que regula el uso, la distribución y protege al autor y al usuario." },
      { q: "La confidencialidad asegura que…", opts: ["Los datos no se pierdan nunca", "Solo usuarios autorizados accedan a la información", "El sistema sea rápido", "Cualquiera pueda modificar los datos"], a: 1, exp: "La confidencialidad limita el acceso a los usuarios autorizados." },
      { q: "El software de programación se usa para…", opts: ["Llevar la contabilidad", "Crear otros programas con lenguajes", "Controlar el hardware", "Navegar por Internet"], a: 1, exp: "Proporciona herramientas para escribir programas en distintos lenguajes." },
      { q: "Las licencias Copyleft (como la GPL)…", opts: ["Cierran el código por completo", "Exigen que las obras derivadas mantengan la misma licencia", "No permiten modificar el código", "Son siempre de pago"], a: 1, exp: "Son recíprocas: lo derivado debe distribuirse bajo la misma licencia." },
      { q: "Un sistema operativo multitarea permite…", opts: ["Un solo proceso a la vez", "Varias acciones simultáneas (imprimir, navegar, escuchar música)", "Solo apagar el equipo", "Solo ejecutar juegos"], a: 1, exp: "Los SO modernos son multitarea: ejecutan varios procesos a la vez." },
    ],
    cards: [
      { q: "¿Qué es el software?", a: "El componente lógico: el conjunto de programas y aplicaciones de la computadora." },
      { q: "Clasificación del software por funcionalidad", a: "De sistema, de aplicación, de programación y de gestión." },
      { q: "Tres características del software", a: "Operativas, de transición y de revisión." },
      { q: "¿El software se fabrica?", a: "No: se desarrolla. Y no se estropea, pero se deteriora con los cambios." },
      { q: "Niveles de usuario", a: "Administrador, Usuario común (limitado) e Invitado." },
      { q: "Software libre vs propietario", a: "Libre: código abierto, se puede modificar y distribuir. Propietario: código cerrado." },
      { q: "Pilares de la seguridad informática", a: "Integridad, Confidencialidad, Disponibilidad y Autenticación." },
      { q: "Tipos de seguridad informática", a: "De software, de red y de hardware." },
      { q: "¿Qué es el humanware?", a: "La dimensión humana: las personas que usan, operan, mantienen y crean los sistemas." },
      { q: "¿Qué es una licencia de software?", a: "Documento legal que regula el uso y la distribución y protege la propiedad intelectual." },
      { q: "Software de sistema principal", a: "El sistema operativo: controla el hardware, organiza archivos y gestiona errores." },
    ]
  },

  /* ===================================================================
     UNIDAD 3 — INTRODUCCIÓN A LA INFORMÁTICA
     =================================================================== */
  {
    id: "informatica",
    glyph: "🪟",
    title: "Introducción a la Informática",
    desc: "La computadora personal, los sistemas operativos, el escritorio de Windows, archivos, compresión y captura de pantalla.",
    html: `
      <p class="lead">La <strong>informática</strong> es el tratamiento automático de la información mediante computadoras. En esta unidad conocemos la PC y el entorno de trabajo del sistema operativo.</p>

      <h2>La computadora personal (PC)</h2>
      <p>Una <strong>PC</strong> es una máquina capaz de procesar y realizar múltiples acciones informáticas en simultáneo para facilitar las tareas cotidianas: navegar, visualizar, editar, buscar, eliminar o modificar datos (fotos, videos, documentos), siempre que tenga el programa adecuado.</p>

      <h2>El sistema operativo (SO)</h2>
      <div class="callout def">
        <strong class="callout__tag">Definición</strong>
        El <strong>sistema operativo</strong> es el software de base que controla la computadora. Sus tres grandes funciones: <strong>coordinar el hardware</strong> (memoria, discos), <strong>organizar los archivos</strong> en los dispositivos de almacenamiento y <strong>gestionar los errores</strong> de hardware y software.
      </div>
      <div class="mini-grid">
        <div class="mini-card"><div class="mini-card__title"><span class="emoji">🪟</span>Windows</div><div class="mini-card__desc">El más usado en PC de escritorio. Entorno gráfico de Microsoft.</div></div>
        <div class="mini-card"><div class="mini-card__title"><span class="emoji">🐧</span>Linux</div><div class="mini-card__desc">Libre y de código abierto; gratuito, seguro y muy configurable.</div></div>
        <div class="mini-card"><div class="mini-card__title"><span class="emoji">🍎</span>macOS</div><div class="mini-card__desc">El sistema de las computadoras Apple.</div></div>
        <div class="mini-card"><div class="mini-card__title"><span class="emoji">📱</span>Móviles</div><div class="mini-card__desc">Android e iOS para teléfonos y tabletas.</div></div>
      </div>
      <p>Los SO pueden ser de <strong>tarea única</strong> (un proceso a la vez, los más primitivos) o <strong>multitarea</strong> (todos los modernos): permiten realizar varias acciones a la vez.</p>

      <h2>El escritorio de Windows</h2>
      <p>El <strong>escritorio</strong> es la pantalla principal de trabajo. Sus elementos:</p>
      <div class="deflist">
        <div class="deflist__item"><strong>Iconos:</strong> pequeñas imágenes que representan programas, archivos o carpetas.</div>
        <div class="deflist__item"><strong>Accesos directos:</strong> enlaces que abren un programa o archivo sin moverlo de su lugar (tienen una flechita).</div>
        <div class="deflist__item"><strong>Barra de tareas:</strong> franja (normalmente inferior) con el botón <strong>Inicio</strong>, los programas abiertos y el área de notificación (reloj, volumen).</div>
        <div class="deflist__item"><strong>Menú Inicio:</strong> da acceso a los programas, la configuración y el apagado del equipo.</div>
      </div>

      <h2>Objetos de Windows</h2>
      <ul>
        <li><strong>Ventanas:</strong> el marco donde se ejecuta cada programa; se pueden minimizar, maximizar y cerrar.</li>
        <li><strong>Botones, cuadros y listas:</strong> controles para interactuar con los programas y elegir opciones.</li>
        <li><strong>Cuadros de diálogo:</strong> ventanas pequeñas que piden o informan algo.</li>
      </ul>

      <h2>El Explorador de Windows y los archivos</h2>
      <p>El <strong>Explorador de archivos</strong> permite navegar por carpetas y administrar la información. La información se organiza en <strong>archivos</strong> (la unidad básica de datos) y <strong>carpetas</strong> (que agrupan archivos), dentro de los dispositivos de almacenamiento.</p>
      <p>El <strong>tipo de archivo</strong> se reconoce por su <strong>extensión</strong>:</p>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Categoría</th><th>Extensiones típicas</th></tr></thead>
        <tbody>
          <tr><td>Documentos</td><td><code class="inline">.docx</code> <code class="inline">.pdf</code> <code class="inline">.txt</code> <code class="inline">.xlsx</code></td></tr>
          <tr><td>Imágenes</td><td><code class="inline">.jpg</code> <code class="inline">.png</code> <code class="inline">.gif</code></td></tr>
          <tr><td>Audio y video</td><td><code class="inline">.mp3</code> <code class="inline">.mp4</code> <code class="inline">.avi</code></td></tr>
          <tr><td>Ejecutables y comprimidos</td><td><code class="inline">.exe</code> <code class="inline">.zip</code> <code class="inline">.rar</code></td></tr>
        </tbody>
      </table>
      </div>
      <p>El Explorador permite cambiar el <strong>tipo de vista</strong> (iconos grandes, lista, detalles) y la <strong>ordenación</strong> (por nombre, fecha, tamaño o tipo).</p>

      <h2>Tareas básicas del operador</h2>
      <div class="mini-grid">
        <div class="mini-card"><div class="mini-card__title">Captura de pantalla</div><div class="mini-card__desc">Con <code class="inline">Impr Pant</code> o <code class="inline">Win + Shift + S</code> (Recortes) se guarda una imagen de lo que se ve en pantalla.</div></div>
        <div class="mini-card"><div class="mini-card__title">Compresión</div><div class="mini-card__desc">Reduce el tamaño de los archivos para guardarlos o enviarlos (formatos ZIP/RAR).</div></div>
        <div class="mini-card"><div class="mini-card__title">Descompresión</div><div class="mini-card__desc">Recupera los archivos originales desde un comprimido con programas como WinRAR o 7-Zip.</div></div>
        <div class="mini-card"><div class="mini-card__title">Búsqueda</div><div class="mini-card__desc">Localiza archivos por nombre, tipo o fecha desde el Explorador o el menú Inicio.</div></div>
      </div>
      <div class="callout tip"><strong class="callout__tag">Atajos útiles</strong> <code class="inline">Ctrl+C</code> copiar · <code class="inline">Ctrl+V</code> pegar · <code class="inline">Ctrl+X</code> cortar · <code class="inline">Ctrl+Z</code> deshacer · <code class="inline">Ctrl+F</code> buscar · <code class="inline">Win+E</code> abrir el Explorador.</div>
    `,
    quiz: [
      { q: "Las tres funciones principales del sistema operativo son…", opts: ["Navegar, editar e imprimir", "Coordinar el hardware, organizar archivos y gestionar errores", "Sumar, restar y multiplicar", "Comprimir, descomprimir y buscar"], a: 1, exp: "El SO coordina el hardware, organiza los archivos y gestiona los errores." },
      { q: "Un acceso directo…", opts: ["Es una copia del programa", "Enlaza a un programa o archivo sin moverlo", "Borra el archivo original", "Es un tipo de virus"], a: 1, exp: "El acceso directo es un enlace; no mueve ni copia el archivo original." },
      { q: "El sistema operativo libre y de código abierto es…", opts: ["Windows", "macOS", "Linux", "iOS"], a: 2, exp: "Linux es libre, gratuito y de código abierto." },
      { q: "La barra de tareas contiene…", opts: ["Solo el fondo de pantalla", "El botón Inicio, los programas abiertos y el reloj", "Únicamente la papelera", "El BIOS"], a: 1, exp: "Incluye el botón Inicio, las apps abiertas y el área de notificación." },
      { q: "La extensión .zip corresponde a un archivo…", opts: ["De imagen", "Comprimido", "De audio", "De texto plano"], a: 1, exp: ".zip es un archivo comprimido." },
      { q: "Comprimir un archivo sirve para…", opts: ["Aumentar su tamaño", "Reducir su tamaño para guardarlo o enviarlo", "Eliminarlo", "Ejecutarlo"], a: 1, exp: "La compresión reduce el tamaño del archivo." },
      { q: "Un sistema operativo multitarea permite…", opts: ["Un solo proceso por vez", "Realizar varias acciones a la vez", "No abrir programas", "Solo usar Internet"], a: 1, exp: "Los SO modernos ejecutan varios procesos simultáneamente." },
      { q: "El programa para navegar por carpetas y administrar archivos en Windows es…", opts: ["El Explorador de Windows", "La papelera", "El antivirus", "El BIOS"], a: 0, exp: "El Explorador de archivos administra carpetas y archivos." },
      { q: "Para hacer una captura de pantalla se usa…", opts: ["Ctrl + S", "Impr Pant o Win+Shift+S", "Alt + F4", "Ctrl + P"], a: 1, exp: "Impr Pant captura la pantalla; Win+Shift+S abre Recortes." },
      { q: "Los iconos del escritorio son…", opts: ["Sonidos del sistema", "Imágenes que representan programas, archivos o carpetas", "Cuentas de usuario", "Puertos físicos"], a: 1, exp: "Los iconos representan programas, archivos o carpetas." },
      { q: "El tipo de un archivo se reconoce por su…", opts: ["Color", "Extensión", "Tamaño", "Fecha"], a: 1, exp: "La extensión (ej. .docx, .jpg) indica el tipo de archivo." },
      { q: "Android e iOS son sistemas operativos para…", opts: ["Servidores", "Dispositivos móviles", "Impresoras", "Routers"], a: 1, exp: "Android e iOS son SO de teléfonos y tabletas." },
    ],
    cards: [
      { q: "¿Qué es la informática?", a: "El tratamiento automático de la información mediante computadoras." },
      { q: "Tres funciones del SO", a: "Coordinar el hardware, organizar los archivos y gestionar los errores." },
      { q: "Ejemplos de sistemas operativos", a: "Windows, Linux, macOS, Android, iOS." },
      { q: "¿Qué es el escritorio?", a: "La pantalla principal de trabajo con iconos, accesos directos y barra de tareas." },
      { q: "Icono vs acceso directo", a: "El icono representa algo; el acceso directo es un enlace que lo abre sin moverlo." },
      { q: "¿Qué contiene la barra de tareas?", a: "El botón Inicio, los programas abiertos y el área de notificación (reloj, volumen)." },
      { q: "¿Qué es una extensión?", a: "Las letras tras el punto que indican el tipo de archivo (.docx, .jpg, .mp3)." },
      { q: "Comprimir vs descomprimir", a: "Comprimir reduce el tamaño (ZIP/RAR); descomprimir recupera los archivos originales." },
      { q: "SO de tarea única vs multitarea", a: "Tarea única: un proceso a la vez. Multitarea: varias acciones simultáneas (los modernos)." },
      { q: "¿Qué hace el Explorador de Windows?", a: "Navega por carpetas y administra los archivos del equipo." },
    ]
  },

  /* ===================================================================
     UNIDAD 4 — CONFIGURACIÓN DE HARDWARE Y SOFTWARE
     =================================================================== */
  {
    id: "configuracion",
    glyph: "⚙️",
    title: "Configuración de Hardware y Software",
    desc: "Drivers y compatibilidad, el panel de control, instalación de programas y de sistemas operativos, doble booteo.",
    tool: "diagnostico",
    html: `
      <p class="lead">Configurar un equipo es <strong>adaptar el hardware y el software</strong> para que funcionen correctamente y según las necesidades del usuario.</p>

      <h2>Drivers (controladores)</h2>
      <div class="callout def">
        <strong class="callout__tag">Definición</strong>
        Un <strong>driver</strong> o controlador es un programa que permite al sistema operativo <strong>comunicarse con un dispositivo de hardware</strong> (impresora, placa de video, sonido, etc.). Sin el driver adecuado, el dispositivo no funciona o lo hace mal.
      </div>
      <ul>
        <li><strong>Versiones:</strong> los fabricantes publican nuevas versiones que corrigen errores y mejoran el rendimiento. Conviene mantenerlos actualizados.</li>
        <li><strong>Compatibilidad:</strong> el driver debe corresponder al modelo del dispositivo y a la versión del sistema operativo (y a si es de 32 o 64 bits).</li>
      </ul>

      <h2>El Panel de Control</h2>
      <p>Desde el <strong>Panel de Control</strong> (o la app <em>Configuración</em>) se realizan los cambios importantes del sistema:</p>
      <div class="mini-grid">
        <div class="mini-card"><div class="mini-card__title">Sistema y seguridad</div></div>
        <div class="mini-card"><div class="mini-card__title">Cuentas de usuario</div></div>
        <div class="mini-card"><div class="mini-card__title">Redes e Internet</div></div>
        <div class="mini-card"><div class="mini-card__title">Apariencia y personalización</div></div>
        <div class="mini-card"><div class="mini-card__title">Hardware y sonido</div></div>
        <div class="mini-card"><div class="mini-card__title">Reloj, idioma y región</div></div>
        <div class="mini-card"><div class="mini-card__title">Programas</div></div>
        <div class="mini-card"><div class="mini-card__title">Accesibilidad</div></div>
      </div>

      <h2>Instalación de software</h2>
      <p>Instalar un programa es copiar sus archivos al equipo y registrarlo en el sistema. Pasos generales:</p>
      <ol>
        <li>Verificar los <strong>requisitos mínimos</strong> (procesador, RAM, espacio en disco, versión del SO).</li>
        <li>Descargar el instalador desde una <strong>fuente confiable</strong> (sitio oficial).</li>
        <li>Ejecutar el instalador y seguir el asistente (aceptar la licencia, elegir carpeta y opciones).</li>
        <li>Finalizar y, si hace falta, <strong>reiniciar</strong> el equipo.</li>
      </ol>
      <div class="callout warn"><strong class="callout__tag">Cuidado</strong> No instalar software de procedencia dudosa ni inestable: es una de las principales vías de entrada de malware.</div>

      <h2>Instalación de sistemas operativos</h2>
      <p>Para instalar un SO se prepara un <strong>medio de arranque</strong> (pendrive o DVD booteable), se configura el orden de arranque en el <strong>BIOS/UEFI</strong> y se sigue el asistente (particionado, formato, datos del usuario).</p>
      <div class="deflist">
        <div class="deflist__item"><strong>Instalación monousuario:</strong> un único sistema operativo en el equipo.</div>
        <div class="deflist__item"><strong>Doble booteo (dual boot):</strong> dos sistemas operativos instalados (por ejemplo Windows y Linux). Al encender, un menú permite <strong>elegir cuál iniciar</strong>. Cada SO se instala en su propia partición.</div>
      </div>
      <div class="callout tip"><strong class="callout__tag">Herramienta</strong> Practicá la resolución de problemas con el <a href="#/tool/diagnostico">Diagnóstico de fallas</a>.</div>
    `,
    quiz: [
      { q: "Un driver o controlador es…", opts: ["Una parte física de la PC", "Un programa que comunica el SO con un dispositivo", "Un tipo de virus", "Una cuenta de usuario"], a: 1, exp: "El driver permite al sistema operativo comunicarse con el hardware." },
      { q: "Para que un driver funcione debe ser…", opts: ["El más antiguo posible", "Compatible con el dispositivo y el sistema operativo", "De otra marca distinta", "Siempre de pago"], a: 1, exp: "Debe corresponder al modelo del dispositivo y a la versión del SO." },
      { q: "El doble booteo (dual boot) consiste en…", opts: ["Encender dos veces la PC", "Tener dos sistemas operativos y elegir cuál iniciar", "Duplicar la RAM", "Instalar dos antivirus"], a: 1, exp: "Permite elegir entre dos SO instalados al arrancar el equipo." },
      { q: "Antes de instalar un programa conviene verificar…", opts: ["El color del icono", "Los requisitos mínimos del sistema", "La fecha de hoy", "La marca del monitor"], a: 1, exp: "Hay que comprobar procesador, RAM, espacio y versión del SO." },
      { q: "¿Desde dónde se cambian la mayoría de las configuraciones del sistema?", opts: ["La papelera", "El Panel de Control / Configuración", "El navegador", "La calculadora"], a: 1, exp: "El Panel de Control centraliza las opciones del sistema." },
      { q: "El orden de arranque para instalar un SO se configura en…", opts: ["El antivirus", "El BIOS/UEFI", "La papelera de reciclaje", "El Explorador"], a: 1, exp: "El BIOS/UEFI define desde qué dispositivo arranca el equipo." },
      { q: "Descargar instaladores conviene hacerlo desde…", opts: ["Cualquier sitio", "Fuentes confiables u oficiales", "Correos de remitentes desconocidos", "Ventanas emergentes"], a: 1, exp: "Las fuentes oficiales reducen el riesgo de malware." },
      { q: "Mantener los drivers actualizados sirve para…", opts: ["Llenar el disco", "Corregir errores y mejorar el rendimiento", "Borrar archivos", "Cambiar el fondo de pantalla"], a: 1, exp: "Las nuevas versiones corrigen fallos y mejoran el desempeño." },
      { q: "En un equipo con doble booteo, cada sistema operativo se instala…", opts: ["En la misma carpeta", "En su propia partición", "En la RAM", "En la nube"], a: 1, exp: "Cada SO va en una partición separada del disco." },
      { q: "Una instalación monousuario tiene…", opts: ["Dos sistemas operativos", "Un único sistema operativo", "Ningún sistema operativo", "Solo software libre"], a: 1, exp: "Monousuario = un solo sistema operativo en el equipo." },
    ],
    cards: [
      { q: "¿Qué es un driver?", a: "Un programa que permite al SO comunicarse con un dispositivo de hardware." },
      { q: "¿Qué hay que cuidar en un driver?", a: "La versión y la compatibilidad con el dispositivo y el sistema operativo." },
      { q: "¿Qué es el Panel de Control?", a: "El lugar donde se realizan los cambios de configuración del sistema." },
      { q: "Pasos para instalar software", a: "Verificar requisitos, descargar de fuente confiable, ejecutar el asistente y reiniciar si hace falta." },
      { q: "¿Qué es el doble booteo?", a: "Tener dos SO instalados y poder elegir cuál iniciar al encender." },
      { q: "¿Dónde se configura el orden de arranque?", a: "En el BIOS/UEFI." },
      { q: "Instalación monousuario", a: "Un único sistema operativo instalado en el equipo." },
      { q: "Riesgo al instalar software dudoso", a: "Es una vía principal de entrada de malware." },
    ]
  },

  /* ===================================================================
     UNIDAD 5 — MANTENIMIENTO Y REPARACIÓN
     =================================================================== */
  {
    id: "mantenimiento",
    glyph: "🧰",
    title: "Mantenimiento y Reparación",
    desc: "Mantenimiento preventivo, correctivo y predictivo, herramientas y materiales, técnicas de limpieza y mensajes de error.",
    tool: "diagnostico",
    html: `
      <div class="callout def">
        <strong class="callout__tag">Definición</strong>
        El <strong>mantenimiento</strong> son todas las acciones que buscan <strong>preservar un equipo o restaurarlo</strong> a un estado en que pueda cumplir su función. Combina acciones técnicas y administrativas.
      </div>

      <h2>Tipos de mantenimiento</h2>
      <div class="mini-grid">
        <div class="mini-card"><div class="mini-card__title"><span class="emoji">🧹</span>Preventivo</div><div class="mini-card__desc">Acciones periódicas para prevenir fallos y prolongar la vida útil: limpieza, actualización de software y respaldo de datos. <em>Antes</em> de que ocurra el problema.</div></div>
        <div class="mini-card"><div class="mini-card__title"><span class="emoji">🔧</span>Correctivo</div><div class="mini-card__desc">Reparar o reemplazar lo que ya falló (mouse, teclado, fuente, RAM), eliminar virus o restaurar el SO. <em>Después</em> del problema.</div></div>
        <div class="mini-card"><div class="mini-card__title"><span class="emoji">📈</span>Predictivo</div><div class="mini-card__desc">Prever cuándo va a fallar un componente: monitoreo de rendimiento y temperatura, análisis <strong>S.M.A.R.T.</strong> de los discos.</div></div>
      </div>
      <div class="callout"><strong class="callout__tag">Clave</strong> El objetivo del mantenimiento <strong>no es desarmar y armar</strong>, sino eliminar elementos nocivos como el <strong>polvo</strong>, especialmente en piezas con movimiento (coolers, ventiladores, motores de disco).</div>

      <h2>Herramientas y materiales (kit básico)</h2>
      <ul>
        <li>Juego de <strong>destornilladores</strong> (estrella/Phillips, plano, Torx, de copa).</li>
        <li><strong>Pulsera antiestática</strong> (evita dañar componentes con la electricidad estática del cuerpo).</li>
        <li><strong>Brocha</strong> pequeña suave y <strong>copitos de algodón</strong>.</li>
        <li><strong>Soplador</strong> o bote de <strong>aire comprimido</strong>.</li>
        <li>Trozos de <strong>tela secos</strong> (bayetilla blanca).</li>
        <li><strong>Alcohol isopropílico</strong> y <strong>limpia contactos</strong> en aerosol.</li>
        <li>Silicona lubricante o grasa blanca, borrador, pinzas, <strong>multímetro</strong>.</li>
        <li><strong>Kit de software</strong>: SO y utilitarios, software de diagnóstico, antivirus, drivers.</li>
      </ul>

      <h2>Técnicas de limpieza</h2>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Directa</th><th>Indirecta</th></tr></thead>
        <tbody>
          <tr><td>Se aplica el producto/herramienta sobre el componente.</td><td>Se aplica el producto en la herramienta (paño) y luego se limpia.</td></tr>
        </tbody>
      </table>
      </div>
      <h4>Pasos de la limpieza física</h4>
      <ol>
        <li>Apagar el equipo y <strong>desenchufar</strong> el cable de alimentación.</li>
        <li>Limpiar el exterior de la carcasa con un paño (las zonas superior e inferior acumulan más polvo).</li>
        <li>Abrir los paneles y quitar el polvo interno con <strong>aire comprimido</strong> en ráfagas breves.</li>
        <li>Ordenar los cables antes de cerrar para asegurar la circulación del aire.</li>
      </ol>

      <h2>Cuidados básicos del equipo</h2>
      <div class="callout warn">
        <strong class="callout__tag">No hacer</strong>
        No comer ni beber sobre el teclado · no mojar el mouse ni los componentes · no desconectar el monitor con la PC encendida · no abrir un monitor (los CRT manejan hasta 10.000 V) · no fumar sobre el equipo · no usar la PC en espacios sin ventilación.
      </div>
      <div class="callout tip">
        <strong class="callout__tag">Sí hacer</strong>
        Conexión a tierra · apagar correctamente · usar pulsera antiestática al abrir el gabinete · limpiar con paño seco y la PC apagada · en notebooks: reducir el brillo, no moverlas encendidas, no descargar del todo la batería y cuidar el cable del cargador.
      </div>

      <h2>Mensajes de error y diagnóstico</h2>
      <p>Para diagnosticar fallas se recopila información (entrevistas, cuestionarios, <strong>formatos de reporte de la falla</strong>). Algunos <strong>síntomas de software</strong>: los programas tardan en iniciar, todo va más lento, aparecen o desaparecen archivos, programas que funcionaban dejan de hacerlo.</p>
      <p>El <strong>Diagrama Causa-Efecto</strong> o <strong>de Ishikawa</strong> («espina de pescado») ayuda a analizar todas las causas posibles de un problema, no solo las obvias.</p>
      <div class="callout tip"><strong class="callout__tag">Practicá</strong> Probá el <a href="#/tool/diagnostico">Diagnóstico de fallas</a>: elegí un síntoma y descubrí su causa probable y la solución.</div>
    `,
    quiz: [
      { q: "El mantenimiento que se realiza ANTES de que ocurra el problema es…", opts: ["Correctivo", "Preventivo", "Predictivo", "Destructivo"], a: 1, exp: "El preventivo evita fallos con acciones periódicas (limpieza, respaldo)." },
      { q: "Reemplazar una fuente que dejó de funcionar es mantenimiento…", opts: ["Preventivo", "Correctivo", "Predictivo", "Ninguno"], a: 1, exp: "El correctivo repara o reemplaza lo que ya falló." },
      { q: "El análisis S.M.A.R.T. de los discos pertenece al mantenimiento…", opts: ["Correctivo", "Preventivo", "Predictivo", "Manual"], a: 2, exp: "El predictivo prevé fallos; S.M.A.R.T. informa el estado del disco." },
      { q: "La pulsera antiestática sirve para…", opts: ["Medir el voltaje", "Evitar dañar componentes con la estática del cuerpo", "Limpiar la pantalla", "Lubricar ventiladores"], a: 1, exp: "Descarga la electricidad estática para no dañar los componentes." },
      { q: "Para quitar el polvo interno de la PC se recomienda usar…", opts: ["Agua", "Aire comprimido en ráfagas breves", "Un paño húmedo", "Alcohol sobre la placa encendida"], a: 1, exp: "El aire comprimido remueve el polvo sin tocar los componentes." },
      { q: "¿Cuál es el objetivo principal del mantenimiento?", opts: ["Desarmar y armar la PC", "Eliminar el polvo y elementos nocivos", "Cambiar todos los componentes", "Reinstalar juegos"], a: 1, exp: "El polvo es muy nocivo, sobre todo en piezas con movimiento." },
      { q: "El primer paso de una limpieza física es…", opts: ["Abrir el gabinete", "Apagar y desenchufar el equipo", "Aplicar aire comprimido", "Encender la PC"], a: 1, exp: "Por seguridad, primero se apaga y se desenchufa." },
      { q: "El Diagrama de Ishikawa también se llama…", opts: ["Diagrama de barras", "Diagrama de espina de pescado", "Diagrama de torta", "Diagrama de flujo"], a: 1, exp: "El Causa-Efecto de Ishikawa tiene forma de espina de pescado." },
      { q: "¿Cuál es una buena práctica de cuidado del equipo?", opts: ["Comer sobre el teclado", "Tener conexión a tierra y apagar correctamente", "Mover la notebook encendida", "Fumar cerca del gabinete"], a: 1, exp: "Conexión a tierra y apagado correcto cuidan el equipo." },
      { q: "En la limpieza INDIRECTA, el producto se aplica…", opts: ["Directo sobre el componente", "Sobre la herramienta o paño y luego se limpia", "Con la PC encendida", "Con agua a presión"], a: 1, exp: "Indirecta: el producto va en el paño, no sobre el componente." },
      { q: "Un síntoma típico de problema de software es…", opts: ["Que la PC esté más rápida", "Que los programas tarden más o dejen de funcionar", "Que el monitor sea más grande", "Que haya más RAM"], a: 1, exp: "Lentitud, archivos que aparecen/desaparecen y programas que fallan son síntomas." },
      { q: "Hacer copias de seguridad es una tarea de mantenimiento…", opts: ["Correctivo", "Preventivo", "Físico únicamente", "Innecesario"], a: 1, exp: "El respaldo de datos es una acción preventiva." },
    ],
    cards: [
      { q: "Tipos de mantenimiento", a: "Preventivo (antes), Correctivo (después) y Predictivo (prevé el fallo)." },
      { q: "Objetivo del mantenimiento", a: "No es desarmar y armar, sino eliminar el polvo y elementos nocivos." },
      { q: "¿Para qué sirve la pulsera antiestática?", a: "Evitar dañar los componentes con la electricidad estática del cuerpo." },
      { q: "¿Con qué se quita el polvo interno?", a: "Con aire comprimido o soplador, en ráfagas breves." },
      { q: "Limpieza directa vs indirecta", a: "Directa: producto sobre el componente. Indirecta: producto en el paño y luego se limpia." },
      { q: "Primer paso de una limpieza física", a: "Apagar y desenchufar el equipo." },
      { q: "¿Qué es el análisis S.M.A.R.T.?", a: "Tecnología que informa el estado del disco para prever fallos (predictivo)." },
      { q: "Diagrama de Ishikawa", a: "Diagrama Causa-Efecto (espina de pescado) para analizar las causas de un problema." },
      { q: "Tres cuidados importantes", a: "Conexión a tierra, apagar correctamente y no comer/beber sobre el equipo." },
    ]
  },

  /* ===================================================================
     UNIDAD 6 — GESTIÓN DE LA INFORMACIÓN
     =================================================================== */
  {
    id: "informacion",
    glyph: "🗄️",
    title: "Gestión de la Información",
    desc: "La información como activo, clasificación, almacenamiento, pérdida y recuperación de datos, copias de seguridad y políticas.",
    tool: "bytes",
    html: `
      <div class="callout def">
        <strong class="callout__tag">La información como activo</strong>
        Un <strong>activo</strong> es todo lo que tiene valor para una organización. La <strong>información</strong> (ficheros, bases de datos, contratos, facturas, software, etc.) es un activo fundamental y, por eso, debe protegerse a lo largo de todo su ciclo de vida, desde que se crea hasta que se destruye.
      </div>
      <p>La <strong>seguridad de la información</strong> es la preservación de tres dimensiones: <strong>confidencialidad</strong>, <strong>integridad</strong> y <strong>disponibilidad</strong>. En algunos casos se agregan la <strong>responsabilidad</strong> (saber quién hizo qué y cuándo) y el <strong>no repudio</strong> (certificar origen y destino).</p>

      <h2>Clasificación de la información</h2>
      <p>El primer paso de una gestión segura es <strong>clasificar</strong> la información: identificar todo lo que se maneja, registrar su ubicación y responsable, y agruparla según su criticidad para aplicar las medidas adecuadas. Casos especiales:</p>
      <ul>
        <li><strong>Datos personales:</strong> afectan la privacidad; regulados por la Ley de Protección de Datos (los más sensibles —salud, ideología— necesitan más protección).</li>
        <li><strong>Propiedad industrial:</strong> patentes, marcas y diseños.</li>
        <li><strong>Propiedad intelectual:</strong> creaciones artísticas o literarias.</li>
      </ul>

      <h2>Almacenamiento de la información</h2>
      <div class="mini-grid">
        <div class="mini-card"><div class="mini-card__title">Local</div><div class="mini-card__desc">En el disco de cada equipo, tablet o móvil (también tarjetas micro SD).</div></div>
        <div class="mini-card"><div class="mini-card__title">Servidores en red</div><div class="mini-card__desc">Lugar común para compartir información entre los usuarios de la organización.</div></div>
        <div class="mini-card"><div class="mini-card__title">Dispositivos externos</div><div class="mini-card__desc">Discos externos, pendrives, CD/DVD, cintas. Cómodos pero fáciles de extraviar.</div></div>
        <div class="mini-card"><div class="mini-card__title">Copias de seguridad</div><div class="mini-card__desc">Respaldos sistemáticos en soportes externos o en otra ubicación.</div></div>
        <div class="mini-card"><div class="mini-card__title">En la nube</div><div class="mini-card__desc">Almacenamiento externo en Internet para compartir o respaldar.</div></div>
      </div>

      <h2>Pérdida de información: causas</h2>
      <ul>
        <li>Equipos y soportes <strong>extraviados o robados</strong> (móviles, pendrives, discos externos).</li>
        <li>Difusión indebida por correo o redes (incluidas <strong>contraseñas</strong>), por error o intención.</li>
        <li><strong>Acceso no autorizado</strong> que destruye, manipula o difunde datos.</li>
        <li><strong>Desastres naturales</strong> (si las copias están en el mismo lugar, se pierden también).</li>
        <li><strong>Deterioro</strong> de los soportes con el tiempo y fallos mecánicos.</li>
        <li><strong>Vulnerabilidades</strong> del software sin actualizar (malware, ataques).</li>
      </ul>

      <h2>Recuperación de la información</h2>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Recuperación lógica</th><th>Recuperación física</th></tr></thead>
        <tbody>
          <tr><td>El dispositivo funciona, pero se perdió el acceso (estructura de archivos dañada o archivo borrado).</td><td>Algún componente físico del dispositivo está dañado.</td></tr>
          <tr><td>Se analiza la estructura que queda y se accede a los datos disponibles.</td><td>Se repara o sustituye el componente dañado para volver a acceder.</td></tr>
          <tr><td>—</td><td>Requiere conocimiento experto; <strong>no</strong> debe intentarlo personal no capacitado.</td></tr>
        </tbody>
      </table>
      </div>

      <h2>Conservación y duración de los soportes</h2>
      <p>Conservar documentos a largo plazo enfrenta el <strong>envejecimiento del soporte</strong> y la <strong>obsolescencia</strong> del formato/hardware. Duración aproximada:</p>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Soporte</th><th>Duración estimada</th></tr></thead>
        <tbody>
          <tr><td>Discos ópticos (CD/DVD)</td><td>hasta ~50 años</td></tr>
          <tr><td>Cintas magnéticas</td><td>~25 años</td></tr>
          <tr><td>Memorias electrónicas (SSD/pendrive)</td><td>~10 años</td></tr>
          <tr><td>Discos duros (HDD)</td><td>se deterioran antes de 10 años</td></tr>
        </tbody>
      </table>
      </div>
      <p>Técnicas para preservar a largo plazo: <strong>refresco</strong> (copiar antes de que el soporte se dañe), <strong>conservar el entorno</strong> tecnológico, <strong>emular</strong> y <strong>migrar</strong> a formatos actuales.</p>

      <h2>Políticas de información</h2>
      <p>Las <strong>políticas</strong> son las reglas y procedimientos que deben seguir los usuarios para proteger la información. Las principales: almacenamiento <strong>local</strong>, en la <strong>red corporativa</strong>, uso de <strong>dispositivos externos</strong>, almacenamiento en la <strong>nube</strong>, <strong>copias de seguridad</strong>, conservación/archivo y uso de dispositivos móviles personales.</p>
    `,
    quiz: [
      { q: "Las tres dimensiones de la seguridad de la información son…", opts: ["Velocidad, costo y tamaño", "Confidencialidad, integridad y disponibilidad", "Hardware, software y humanware", "Local, red y nube"], a: 1, exp: "Confidencialidad, integridad y disponibilidad." },
      { q: "El primer paso de una gestión segura de la información es…", opts: ["Borrar todo", "Clasificar la información", "Apagar los servidores", "Comprar discos nuevos"], a: 1, exp: "Clasificar permite aplicar medidas según la criticidad." },
      { q: "La recuperación lógica se usa cuando…", opts: ["Un componente físico está dañado", "El dispositivo funciona pero se perdió el acceso a los datos", "El disco se rompió en pedazos", "No hay copias de seguridad"], a: 1, exp: "Lógica: el hardware funciona; se analiza la estructura de archivos." },
      { q: "La recuperación física…", opts: ["La puede hacer cualquiera", "Requiere conocimiento experto", "No existe", "Es siempre gratis"], a: 1, exp: "Se desaconseja totalmente que la intente personal no capacitado." },
      { q: "¿Cuál NO es una causa común de pérdida de información?", opts: ["Robo de un pendrive", "Desastre natural", "Hacer copias de seguridad", "Acceso no autorizado"], a: 2, exp: "Hacer copias de seguridad PREVIENE la pérdida, no la causa." },
      { q: "El almacenamiento que sirve para compartir entre usuarios de la organización es…", opts: ["Local", "Servidores en red", "Pendrive personal", "Memoria RAM"], a: 1, exp: "Los servidores en red ofrecen un lugar común de trabajo." },
      { q: "¿Qué soporte dura más tiempo aproximadamente?", opts: ["Disco duro (HDD)", "Discos ópticos (CD/DVD)", "Pendrive", "Memoria RAM"], a: 1, exp: "Los discos ópticos pueden durar hasta ~50 años." },
      { q: "La información se considera un activo porque…", opts: ["Ocupa espacio", "Tiene valor para la organización y debe protegerse", "Es pesada", "Es gratis"], a: 1, exp: "Un activo es todo lo que tiene valor para la organización." },
      { q: "La técnica de copiar los datos antes de que el soporte se deteriore se llama…", opts: ["Migrar", "Emular", "Refresco", "Formatear"], a: 2, exp: "El refresco copia los originales a un soporte nuevo a tiempo." },
      { q: "Los datos personales están regulados por…", opts: ["La Ley de Protección de Datos", "El manual del fabricante", "La licencia del software", "El BIOS"], a: 0, exp: "Los datos personales se rigen por la Ley de Protección de Datos." },
      { q: "Una política de copias de seguridad busca…", opts: ["Llenar el disco", "Sistematizar los respaldos para poder recuperar la información", "Eliminar los datos", "Compartir contraseñas"], a: 1, exp: "Garantiza respaldos para recuperar la actividad ante incidentes." },
      { q: "El 'no repudio' permite…", opts: ["Acelerar la red", "Certificar el origen y el destino de un mensaje", "Aumentar la RAM", "Borrar archivos"], a: 1, exp: "El no repudio certifica de dónde salió y a dónde llegó la información." },
    ],
    cards: [
      { q: "¿Por qué la información es un activo?", a: "Porque tiene valor para la organización y debe protegerse." },
      { q: "Dimensiones de la seguridad de la información", a: "Confidencialidad, Integridad y Disponibilidad (a veces responsabilidad y no repudio)." },
      { q: "Primer paso de la gestión segura", a: "Clasificar la información según su criticidad." },
      { q: "Formas de almacenamiento", a: "Local, servidores en red, dispositivos externos, copias de seguridad y nube." },
      { q: "Causas de pérdida de información", a: "Robo/extravío, difusión indebida, accesos no autorizados, desastres, deterioro y vulnerabilidades." },
      { q: "Recuperación lógica vs física", a: "Lógica: el equipo funciona, se perdió el acceso. Física: hay un componente dañado (requiere experto)." },
      { q: "Técnicas de conservación a largo plazo", a: "Refresco, conservar el entorno, emular y migrar." },
      { q: "¿Qué son las políticas de información?", a: "Las reglas y procedimientos que siguen los usuarios para proteger la información." },
    ]
  },

  /* ===================================================================
     UNIDAD 7 — INFORME TÉCNICO Y COTIZACIÓN
     =================================================================== */
  {
    id: "informe",
    glyph: "🧾",
    title: "Informe Técnico y Cotización",
    desc: "El informe técnico y sus etapas, la diferencia entre cotización y presupuesto, y cómo armar un presupuesto.",
    tool: "cotizador",
    html: `
      <h2>El informe técnico</h2>
      <div class="callout def">
        <strong class="callout__tag">Definición</strong>
        Un <strong>informe</strong> es el documento en el que se estudia un problema para <strong>transmitir información, presentar conclusiones, ideas y recomendaciones</strong>. Las tres reglas de oro de su redacción son: <strong>Precisión, Concisión y Claridad</strong>.
      </div>

      <h3>Las cuatro etapas del método</h3>
      <div class="mini-grid">
        <div class="mini-card"><div class="mini-card__title">I. Preparación</div><div class="mini-card__desc">Definir el objetivo, pensar en el lector y recopilar el material (hechos e ideas).</div></div>
        <div class="mini-card"><div class="mini-card__title">II. Ordenación</div><div class="mini-card__desc">Analizar y agrupar el material en secciones, eliminar lo superfluo y decidir el orden.</div></div>
        <div class="mini-card"><div class="mini-card__title">III. Redacción</div><div class="mini-card__desc">Escribir con estilo claro, con introducción, secciones, conclusión, referencias e índice.</div></div>
        <div class="mini-card"><div class="mini-card__title">IV. Revisión</div><div class="mini-card__desc">Criticar el borrador objetivamente: estructura, coherencia, lectura en voz alta e ilustraciones.</div></div>
      </div>

      <h3>Partes de un informe técnico</h3>
      <ul>
        <li><strong>Introducción:</strong> destinatario y cargo, fecha, propósito, antecedentes, resumen de resultados y lista de capítulos.</li>
        <li><strong>Secciones / cuerpo:</strong> enunciado de los hechos (con su fuente), análisis, conclusiones y procedimiento seguido.</li>
        <li><strong>Conclusión:</strong> resumen de argumentos y conclusiones, recomendaciones y acciones a seguir. <em>Hay una relación directa entre introducción y conclusión.</em></li>
        <li><strong>Referencias e índice:</strong> bibliografía y títulos de las secciones, más listas de tablas e ilustraciones.</li>
        <li><strong>Apéndices:</strong> detalles concretos extraídos del cuerpo del texto.</li>
      </ul>

      <h2>Cotización y presupuesto</h2>
      <div class="callout def">
        <strong class="callout__tag">Cotización</strong>
        Documento contable donde se <strong>detalla el precio</strong> de un bien o servicio. La pide un cliente y este puede aceptarla, modificarla o rechazarla (no obliga a pagar). Si se acepta, se convierte en <strong>factura</strong>.
      </div>
      <div class="callout">
        <strong class="callout__tag">Presupuesto</strong>
        El conjunto de <strong>recursos económicos</strong> de los que dispone un cliente o empresa para invertir en un producto, servicio o proyecto.
      </div>
      <p>En pocas palabras: <em>«la <strong>cotización</strong> es el precio que pone el vendedor; el <strong>presupuesto</strong> es el dinero del que dispone el comprador».</em> Ejemplo: «Le envié la cotización el lunes, pero me dijo que no le daba el presupuesto».</p>

      <h3>Partes de una cotización</h3>
      <ul>
        <li>Producto, bien o servicio, su referencia y descripción.</li>
        <li>Precio por unidad y por cantidad; fecha de expedición.</li>
        <li>Datos de la empresa (logo, identificación, nombre) y de la persona a quien va dirigida.</li>
        <li>Notas adicionales y formas/métodos de pago.</li>
      </ul>

      <h3>Cómo crear un presupuesto</h3>
      <ol>
        <li><strong>Establecer los objetivos</strong> del proyecto.</li>
        <li><strong>Definir el alcance</strong> (recursos disponibles, plazos, qué queda fuera).</li>
        <li><strong>Dividir el proyecto en etapas</strong>.</li>
        <li><strong>Enumerar los recursos</strong> de cada etapa (equipo, adquisiciones, capacitación, equipamiento, espacio, etc.).</li>
        <li><strong>Estimar y sumar</strong> los montos.</li>
        <li>Reservar un <strong>fondo para contingencias</strong>.</li>
        <li><strong>Crear el presupuesto</strong> (por ejemplo, en una hoja de cálculo).</li>
      </ol>
      <div class="callout tip"><strong class="callout__tag">Herramienta</strong> Armá una PC y calculá su costo con el <a href="#/tool/cotizador">Cotizador de PC</a>; ideal para el Proyecto Final.</div>
    `,
    quiz: [
      { q: "Las tres reglas de oro de la redacción de un informe son…", opts: ["Velocidad, color y tamaño", "Precisión, concisión y claridad", "Hardware, software y humanware", "Introducción, nudo y desenlace"], a: 1, exp: "Precisión, concisión y claridad." },
      { q: "¿Cuáles son las cuatro etapas del método del informe?", opts: ["Inicio, desarrollo, cierre y entrega", "Preparación, ordenación, redacción y revisión", "Diseño, código, prueba y deploy", "Compra, uso, falla y reparación"], a: 1, exp: "Preparación, ordenación del material, redacción y revisión." },
      { q: "Una cotización es un documento que…", opts: ["Obliga al cliente a pagar", "Detalla el precio de un bien o servicio", "Mide la RAM", "Reemplaza al informe técnico"], a: 1, exp: "Detalla el precio; el cliente puede aceptarla, modificarla o rechazarla." },
      { q: "El presupuesto se refiere a…", opts: ["El precio que pone el vendedor", "Los recursos económicos del comprador", "La factura final", "El manual del producto"], a: 1, exp: "El presupuesto es el dinero del que dispone el comprador." },
      { q: "Si el cliente acepta una cotización, esta se convierte en…", opts: ["Informe", "Factura", "Presupuesto", "Recibo de sueldo"], a: 1, exp: "Aceptada la cotización, se pasa a factura para el pago." },
      { q: "La etapa donde se critica el borrador objetivamente es…", opts: ["Preparación", "Ordenación", "Redacción", "Revisión"], a: 3, exp: "En la revisión se evalúa el borrador como si fuera ajeno." },
      { q: "¿Qué parte del informe tiene relación directa con la conclusión?", opts: ["El índice", "La introducción", "Los apéndices", "La bibliografía"], a: 1, exp: "Existe una relación de dependencia directa entre introducción y conclusión." },
      { q: "El primer paso para crear un presupuesto es…", opts: ["Sumar los montos", "Establecer los objetivos del proyecto", "Crear la factura", "Reservar contingencias"], a: 1, exp: "Primero se establecen los objetivos; luego el alcance, etapas, recursos y montos." },
      { q: "Reservar un fondo para contingencias significa…", opts: ["Gastar todo el dinero", "Apartar dinero para imprevistos", "Eliminar etapas", "Bajar el precio a cero"], a: 1, exp: "Es dinero reservado para gastos imprevistos del proyecto." },
      { q: "¿Cuál es una parte de la cotización?", opts: ["El sistema operativo", "El precio por unidad y las formas de pago", "La memoria RAM", "El driver"], a: 1, exp: "Incluye descripción, precio, datos de la empresa y formas de pago." },
    ],
    cards: [
      { q: "¿Qué es un informe técnico?", a: "Documento que estudia un problema para transmitir información, conclusiones y recomendaciones." },
      { q: "Reglas de oro del informe", a: "Precisión, Concisión y Claridad." },
      { q: "Cuatro etapas del informe", a: "Preparación, Ordenación, Redacción y Revisión." },
      { q: "Partes del informe", a: "Introducción, secciones/cuerpo, conclusión, referencias, índice y apéndices." },
      { q: "¿Qué es una cotización?", a: "Documento que detalla el precio de un bien o servicio; si se acepta, pasa a factura." },
      { q: "¿Qué es un presupuesto?", a: "Los recursos económicos de los que dispone el comprador." },
      { q: "Cotización vs presupuesto", a: "Cotización = precio del vendedor; presupuesto = dinero del comprador." },
      { q: "Pasos para crear un presupuesto", a: "Objetivos, alcance, etapas, recursos, estimar montos, contingencias y crearlo." },
    ]
  },

  ]
};
