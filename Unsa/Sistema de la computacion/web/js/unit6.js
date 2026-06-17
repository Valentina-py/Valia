/* ============================================================
   UNIDAD 6 — Software Libre
   window.APP_DATA.units.push({...})
   ============================================================ */
window.APP_DATA.units.push({
  id: "libre",
  glyph: "SL",
  title: "Software Libre",
  desc: "Las 4 libertades, GNU, copyleft y licencias, GNU/Linux y sus distribuciones.",
  tool: null,
  html: `
    <p class="lead">El <strong>software libre</strong> es aquel que respeta la libertad de los usuarios: puede usarse, copiarse, estudiarse, modificarse y redistribuirse. Para la <strong>Free Software Foundation (FSF)</strong> es una cuestión de <em>libertad</em>, no de precio.</p>

    <div class="callout def">
      <strong class="callout__tag">Definición</strong>
      <strong>Software libre</strong> es el que garantiza a sus usuarios cuatro libertades esenciales sobre el programa. La palabra clave en inglés «free» se refiere a <em>libre</em> (freedom), no a <em>gratis</em> (free of charge).
    </div>

    <h2>1. Las cuatro libertades</h2>
    <p>Un programa es software libre si concede a quien lo recibe estas cuatro libertades. La numeración empieza en 0, como suele hacerse en informática.</p>

    <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead>
          <tr><th>Libertad</th><th>Qué permite</th><th>Requiere código fuente</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Libertad 0</strong></td><td>Usar / ejecutar el programa con cualquier propósito.</td><td>No</td></tr>
          <tr><td><strong>Libertad 1</strong></td><td>Estudiar el funcionamiento del programa y adaptarlo a tus necesidades.</td><td><strong>Sí</strong></td></tr>
          <tr><td><strong>Libertad 2</strong></td><td>Distribuir copias para ayudar a otros.</td><td>No</td></tr>
          <tr><td><strong>Libertad 3</strong></td><td>Mejorar el programa y publicar (distribuir) las versiones modificadas.</td><td><strong>Sí</strong></td></tr>
        </tbody>
      </table>
    </div>

    <div class="callout tip">
      <strong class="callout__tag">Clave</strong>
      Las libertades <strong>1 y 3</strong> exigen acceso al <strong>código fuente</strong>: sin él es imposible estudiar o modificar el programa de forma práctica.
    </div>

    <h3>Software libre ≠ software gratis (freeware)</h3>
    <p>Son cosas distintas y conviene no confundirlas:</p>
    <ul>
      <li><strong>Software libre</strong>: garantiza las 4 libertades. Puede incluso ser comercial (cobrarse por él o por servicios).</li>
      <li><strong>Freeware</strong>: es <em>gratuito</em>, pero <strong>no</strong> garantiza el derecho a estudiarlo, modificarlo ni redistribuirlo. Suele ser software propietario que simplemente no cuesta dinero.</li>
    </ul>
    <div class="callout warn">
      <strong class="callout__tag">Atención</strong>
      «Libre» no significa «gratis». Un programa libre puede venderse, y un programa gratuito (freeware) puede no ser libre.
    </div>

    <h2>2. Código Abierto (Open Source)</h2>
    <p>El término <strong>Código Abierto</strong> (Open Source) apareció en <strong>1998</strong>, impulsado por <strong>Eric S. Raymond</strong> y <strong>Bruce Perens</strong>, que fundaron la <strong>Open Source Initiative (OSI)</strong>.</p>
    <p>Su premisa central es práctica: al compartir el código, el programa <em>mejora más rápido</em>, porque muchas personas pueden leerlo, modificarlo y corregir errores.</p>

    <div class="callout def">
      <strong class="callout__tag">Definición</strong>
      El <strong>decálogo de la OSI</strong> es el conjunto de criterios que debe cumplir una licencia de código abierto: libre redistribución, código fuente incluido, trabajos derivados permitidos, integridad del código del autor, sin discriminación de personas o grupos, sin discriminación de áreas de uso, distribución de la licencia con el software, licencia no específica de un producto, licencia que no restringe otro software y neutralidad tecnológica.
    </div>

    <h3>Software Libre vs. Código Abierto</h3>
    <p>En la práctica reconocen casi las mismas licencias; la diferencia está en la <strong>filosofía</strong>.</p>
    <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead>
          <tr><th>Aspecto</th><th>Software Libre (FSF)</th><th>Código Abierto (OSI)</th></tr>
        </thead>
        <tbody>
          <tr><td>Énfasis</td><td>Moral / ético (libertad)</td><td>Excelencia técnica (mejor software)</td></tr>
          <tr><td>Compartir el código</td><td>Un derecho y un fin ético</td><td>Un medio para lograr mejor software</td></tr>
          <tr><td>Software propietario</td><td>Se considera «antiético»</td><td>Postura pragmática</td></tr>
          <tr><td>En la práctica</td><td colspan="2">Reconocen las mismas licencias; difieren solo en la motivación.</td></tr>
        </tbody>
      </table>
    </div>

    <h2>3. El sistema operativo GNU</h2>
    <p><strong>GNU</strong> es un acrónimo recursivo de <strong>«GNU's Not Unix»</strong> («GNU No es Unix»). Es un sistema operativo de tipo Unix, formado completamente por software libre y mayormente con licencias copyleft.</p>
    <ul>
      <li>Liderado por <strong>Richard Stallman</strong> desde <strong>1983</strong>.</li>
      <li>Componentes emblemáticos: <code>GCC</code> (compilador), <code>Bash</code> (shell), <code>Emacs</code> (editor), <strong>GNOME</strong> (escritorio).</li>
      <li>Su núcleo propio es <strong>Hurd</strong>, poco utilizado. En la práctica GNU se combina con el kernel <strong>Linux</strong>, dando lugar a <strong>GNU/Linux</strong>.</li>
    </ul>

    <h3>Historia — Richard Stallman</h3>
    <ul>
      <li><strong>Anécdota de la impresora:</strong> a Stallman no le entregaron el código fuente del controlador de una impresora para arreglar un problema. Esa negativa le planteó una encrucijada ética sobre el software cerrado.</li>
      <li><strong>1983:</strong> inicia el <strong>Proyecto GNU</strong>.</li>
      <li><strong>1985:</strong> funda la <strong>Free Software Foundation (FSF)</strong>, define el software libre y crea el concepto de <strong>copyleft</strong>.</li>
      <li><strong>1998:</strong> nace la <strong>OSI</strong> (Raymond y Perens) con el término «código abierto».</li>
    </ul>

    <div class="callout def">
      <strong class="callout__tag">Definición</strong>
      <strong>Copyleft</strong>: mecanismo legal que otorga libertad a los usuarios e impide que el software se vuelva propietario. Las obras derivadas deben mantener la <em>misma licencia libre</em>.
    </div>

    <h2>4. Licencias de software</h2>
    <div class="callout tip">
      <strong class="callout__tag">Idea central</strong>
      El software <strong>no se vende, se licencia</strong>: al adquirirlo se obtienen <em>derechos de uso</em>. Una licencia es una autorización contractual sobre qué se puede hacer con el programa.
    </div>
    <p>Existen muchas licencias: GPL, LGPL, AGPL, BSD, MIT, MPL, Apache, EPL, APSL, PHP, entre otras. Se agrupan en dos grandes familias.</p>

    <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead>
          <tr><th>Familia</th><th>Ejemplos</th><th>Obligación principal</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Copyleft</strong></td><td>GPL, LGPL, AGPL</td><td>Las obras derivadas deben conservar la misma licencia libre.</td></tr>
          <tr><td><strong>Permisivas</strong></td><td>BSD, MIT, Apache</td><td>Permiten reutilizar el código incluso en software propietario; solo exigen conservar el aviso de copyright.</td></tr>
        </tbody>
      </table>
    </div>

    <h3>La licencia GPL</h3>
    <p>La <strong>GPL</strong> (Licencia Pública General de GNU) es la más utilizada (aproximadamente el <strong>60 %</strong> del software libre).</p>
    <ul>
      <li>El autor conserva el copyright.</li>
      <li>Permite redistribuir y modificar, pero <strong>todas las versiones modificadas siguen bajo GPL</strong> (copyleft fuerte).</li>
      <li>Si se mezcla código GPL con otro, el resultado completo debe ser GPL.</li>
    </ul>

    <h3>Clasificación del software por licencia</h3>
    <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead>
          <tr><th>Tipo</th><th>Característica</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Software libre</strong></td><td>Respeta las 4 libertades.</td></tr>
          <tr><td><strong>Código abierto</strong></td><td>Cumple el decálogo OSI (en la práctica equivale a libre).</td></tr>
          <tr><td><strong>Software propietario / privativo</strong></td><td>Código cerrado: no se comparte ni se modifica.</td></tr>
          <tr><td><strong>Freeware</strong></td><td>Gratuito, pero no libre.</td></tr>
          <tr><td><strong>Copyleft</strong></td><td>Mecanismo que obliga a mantener la libertad en las obras derivadas.</td></tr>
        </tbody>
      </table>
    </div>

    <h2>5. Implicancias del software libre</h2>
    <ul>
      <li><strong>Bien de uso inagotable:</strong> copiarlo tiene un costo marginal mínimo y no hay rivalidad (que yo lo use no impide que vos lo uses). Es una alternativa a la piratería y es fácil de traducir a idiomas poco rentables comercialmente.</li>
      <li><strong>Producción cooperativa:</strong> lo desarrollan equipos internacionales por libre asociación. Se lo describe como orden espontáneo, cooperativismo y «economía del regalo».</li>
      <li><strong>Administración pública:</strong> apoyado por gobiernos como Alemania, Brasil, Cuba, Chile, China, Ecuador, España, Francia, México y Venezuela. En España existió el CENATIC.</li>
      <li><strong>Países en desarrollo:</strong> facilita el acceso a herramientas, la difusión del conocimiento y un modelo de negocio distinto (basado en servicios), más justo y equitativo.</li>
    </ul>

    <h2>6. GNU/Linux</h2>
    <div class="callout def">
      <strong class="callout__tag">Definición</strong>
      <strong>GNU/Linux</strong> es el sistema operativo completo. <strong>Linux</strong> es solo el <em>núcleo</em> (kernel) libre de tipo Unix, creado por <strong>Linus Torvalds</strong> y la comunidad. El resto del sistema son las <strong>herramientas GNU</strong> más los entornos de escritorio (GNOME, KDE, LXDE, Xfce).
    </div>
    <ul>
      <li>Se usa en el <strong>78 %</strong> de los 500 principales servidores y en el <strong>89 %</strong> de las 500 mayores supercomputadoras. Su porcentaje en equipos de escritorio es menor.</li>
      <li>Funciona en <strong>entorno gráfico</strong> (usuario final) o en <strong>consola</strong> (servidores).</li>
      <li>Lo apoyan empresas como Intel, Google, IBM, AMD, Dell, Lenovo, HP, Oracle y Red Hat.</li>
    </ul>
    <div class="callout warn">
      <strong class="callout__tag">Caso especial: Android</strong>
      Android usa el <strong>kernel Linux</strong>, pero <strong>NO</strong> las herramientas GNU. Por eso no se lo considera un sistema GNU/Linux.
    </div>

    <h3>Distribuciones (distros)</h3>
    <p>Una <strong>distribución</strong> es un paquete de software basado en el kernel Linux + herramientas GNU + el sistema gráfico X Window System + software adicional, listo para instalar.</p>
    <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead>
          <tr><th>Categoría</th><th>Ejemplos</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Comerciales</strong> (respaldadas por empresas)</td><td>Fedora / Red Hat, openSUSE / Novell, Ubuntu / Canonical, Mandriva</td></tr>
          <tr><td><strong>De comunidad</strong></td><td>Debian, Gentoo</td></tr>
          <tr><td><strong>Independientes</strong></td><td>Slackware</td></tr>
        </tbody>
      </table>
    </div>
    <div class="callout tip">
      <strong class="callout__tag">Huayra</strong>
      Sistema operativo libre del programa Conectar Igualdad (ANSES) para netbooks educativas. Está basado en <strong>Debian</strong>, incluye más de 37.000 paquetes y usa mayormente la licencia GNU GPL; puede usarse, estudiarse, modificarse y redistribuirse libremente.
    </div>

    <h3>Árbol de directorios de Linux</h3>
    <p>En Linux todo cuelga de un único directorio raíz <code>/</code>. Esta es la estructura típica:</p>
    <pre class="code">/
├── bin    binarios esenciales (cp, mv, cat)
├── boot   cargador de arranque y kernel
├── dev    dispositivos
├── etc    archivos de configuración
├── home   carpetas de los usuarios
├── lib    librerías, módulos del kernel y drivers
├── media  medios removibles
├── mnt    montaje temporal
├── opt    aplicaciones adicionales
├── proc   información del kernel y los procesos
├── root   home del administrador (superusuario)
├── sbin   binarios de administración (mount, shutdown)
├── srv    datos de servicios
├── tmp    archivos temporales
├── usr    subdirectorios y programas de usuario
└── var    archivos variables (logs, cache, spool)</pre>

    <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead>
          <tr><th>Directorio</th><th>Contenido</th></tr>
        </thead>
        <tbody>
          <tr><td><code>/</code></td><td>Raíz del sistema de archivos; de aquí cuelga todo lo demás.</td></tr>
          <tr><td><code>/bin</code></td><td>Binarios esenciales para todos los usuarios (cp, mv, cat).</td></tr>
          <tr><td><code>/boot</code></td><td>Cargador de arranque y el núcleo (kernel).</td></tr>
          <tr><td><code>/dev</code></td><td>Archivos que representan los dispositivos del sistema.</td></tr>
          <tr><td><code>/etc</code></td><td>Archivos de configuración del sistema.</td></tr>
          <tr><td><code>/home</code></td><td>Carpetas personales de los usuarios.</td></tr>
          <tr><td><code>/lib</code></td><td>Librerías compartidas, módulos del kernel y drivers.</td></tr>
          <tr><td><code>/sbin</code></td><td>Binarios de administración del sistema (mount, shutdown).</td></tr>
          <tr><td><code>/tmp</code></td><td>Archivos temporales.</td></tr>
          <tr><td><code>/usr</code></td><td>Programas y subdirectorios importantes de usuario.</td></tr>
          <tr><td><code>/var</code></td><td>Datos variables: registros (logs), cache, colas (spool).</td></tr>
          <tr><td><code>/proc</code></td><td>Sistema de archivos virtual con información del kernel y los procesos.</td></tr>
          <tr><td><code>/root</code></td><td>Carpeta personal del administrador (superusuario).</td></tr>
        </tbody>
      </table>
    </div>
  `,
  quiz: [
    {
      q: "¿Cuál de estas NO es una de las cuatro libertades del software libre?",
      opts: [
        "Usar el programa con cualquier propósito",
        "Estudiar y modificar el programa",
        "Garantizar que el programa sea siempre gratuito",
        "Distribuir copias y versiones modificadas"
      ],
      a: 2,
      exp: "Las 4 libertades son: usar (0), estudiar/modificar (1), distribuir copias (2) y distribuir versiones modificadas (3). La gratuidad no es una libertad: libre se refiere a libertad, no a precio."
    },
    {
      q: "¿Qué libertades requieren obligatoriamente el acceso al código fuente?",
      opts: [
        "Las libertades 0 y 2",
        "Las libertades 1 y 3",
        "Solo la libertad 0",
        "Todas por igual"
      ],
      a: 1,
      exp: "La libertad 1 (estudiar y modificar) y la 3 (publicar versiones modificadas) exigen el código fuente, porque sin él es imposible estudiar o cambiar el programa."
    },
    {
      q: "¿Cuál es la diferencia entre software libre y freeware?",
      opts: [
        "Son exactamente lo mismo",
        "El freeware es libre pero de pago; el libre es siempre gratis",
        "El software libre garantiza libertades aunque pueda ser comercial; el freeware es gratis pero no garantiza modificarlo ni redistribuirlo",
        "El freeware siempre incluye el código fuente"
      ],
      a: 2,
      exp: "El software libre garantiza las 4 libertades (y puede ser comercial). El freeware es gratuito pero no garantiza estudiarlo, modificarlo ni redistribuirlo: «libre» no significa «gratis»."
    },
    {
      q: "¿Qué es el copyleft?",
      opts: [
        "Un mecanismo que obliga a que las obras derivadas mantengan la misma licencia libre",
        "Lo opuesto al software libre",
        "Una licencia que prohíbe modificar el software",
        "Un sinónimo de freeware"
      ],
      a: 0,
      exp: "El copyleft otorga libertad a los usuarios e impide que el software se vuelva propietario: las versiones derivadas deben conservar la misma licencia libre."
    },
    {
      q: "Respecto de la licencia GPL, ¿qué afirmación es correcta?",
      opts: [
        "Permite convertir el código modificado en software propietario",
        "Es una licencia permisiva como MIT o BSD",
        "Obliga a que todas las versiones modificadas sigan bajo GPL (copyleft fuerte)",
        "Casi no se usa en el software libre"
      ],
      a: 2,
      exp: "La GPL es copyleft fuerte: todas las versiones modificadas deben seguir bajo GPL. Es la licencia más usada (~60 % del software libre)."
    },
    {
      q: "¿Qué significa el acrónimo GNU?",
      opts: [
        "General New Unix",
        "GNU's Not Unix (acrónimo recursivo)",
        "Global Network Utilities",
        "Graphical Native Unix"
      ],
      a: 1,
      exp: "GNU es un acrónimo recursivo de «GNU's Not Unix». Es un sistema operativo de tipo Unix formado por software libre, liderado por Richard Stallman desde 1983."
    },
    {
      q: "¿Quién creó el núcleo (kernel) Linux?",
      opts: [
        "Richard Stallman",
        "Eric S. Raymond",
        "Bruce Perens",
        "Linus Torvalds"
      ],
      a: 3,
      exp: "El kernel Linux fue creado por Linus Torvalds junto con la comunidad. Las herramientas GNU las desarrolló el proyecto de Stallman; juntos forman GNU/Linux."
    },
    {
      q: "¿Cuál es la diferencia de enfoque entre la FSF y la OSI?",
      opts: [
        "La FSF pone el énfasis en lo moral/ético y la OSI en la excelencia técnica",
        "La FSF es comercial y la OSI sin fines de lucro",
        "La OSI defiende el software propietario",
        "No tienen ninguna diferencia"
      ],
      a: 0,
      exp: "La FSF (software libre) enfatiza la libertad como cuestión ética; la OSI (código abierto) enfatiza la excelencia técnica. En la práctica reconocen las mismas licencias."
    },
    {
      q: "¿Cuál de estas distribuciones es de comunidad (no respaldada por una empresa)?",
      opts: [
        "Ubuntu",
        "Fedora",
        "Debian",
        "openSUSE"
      ],
      a: 2,
      exp: "Debian (y Gentoo) son distribuciones de comunidad. Ubuntu/Canonical, Fedora/Red Hat y openSUSE/Novell son comerciales (respaldadas por empresas)."
    },
    {
      q: "¿Por qué Android no se considera un sistema GNU/Linux?",
      opts: [
        "Porque no usa el kernel Linux",
        "Porque usa el kernel Linux pero NO las herramientas GNU",
        "Porque es software propietario en su totalidad",
        "Porque no funciona en dispositivos móviles"
      ],
      a: 1,
      exp: "Android usa el kernel Linux, pero no incorpora las herramientas GNU, que son las que completan un sistema GNU/Linux. Por eso no se lo clasifica como tal."
    }
  ],
  cards: [
    {
      q: "¿Cuáles son las 4 libertades del software libre?",
      a: "0: usar con cualquier propósito; 1: estudiar y modificar; 2: distribuir copias; 3: distribuir versiones modificadas. Las libertades 1 y 3 requieren el código fuente."
    },
    {
      q: "¿Software libre es lo mismo que gratis (freeware)?",
      a: "No. «Libre» se refiere a libertad, no a precio: un programa libre puede ser comercial, y un freeware es gratis pero no garantiza estudiarlo, modificarlo ni redistribuirlo."
    },
    {
      q: "¿Qué es el copyleft?",
      a: "Mecanismo que otorga libertad a los usuarios e impide que el software se vuelva propietario: las obras derivadas deben mantener la misma licencia libre. Creado por Stallman (FSF, 1985)."
    },
    {
      q: "¿Qué caracteriza a la licencia GPL?",
      a: "Es la más usada (~60 %). Copyleft fuerte: todas las versiones modificadas deben seguir bajo GPL. El autor conserva el copyright. Si se mezcla con otro código, el resultado debe ser GPL."
    },
    {
      q: "¿Qué significa GNU y quién lo lidera?",
      a: "Acrónimo recursivo de «GNU's Not Unix». Sistema operativo libre de tipo Unix liderado por Richard Stallman desde 1983. Incluye GCC, Bash, Emacs, GNOME; su núcleo propio es Hurd."
    },
    {
      q: "¿Quién creó Linux y qué es exactamente?",
      a: "Lo creó Linus Torvalds (con la comunidad). Linux es solo el núcleo (kernel) libre de tipo Unix. Junto con las herramientas GNU forma el sistema completo GNU/Linux."
    },
    {
      q: "¿En qué se diferencian la FSF y la OSI?",
      a: "La FSF (software libre, 1985) enfatiza la libertad como cuestión ética; la OSI (código abierto, 1998, Raymond y Perens) enfatiza la excelencia técnica. Reconocen las mismas licencias."
    },
    {
      q: "¿Por qué Android no es GNU/Linux?",
      a: "Porque usa el kernel Linux pero NO las herramientas GNU. Un sistema GNU/Linux necesita ambas partes: el kernel Linux más las herramientas GNU."
    },
    {
      q: "¿Para qué sirven /home, /etc, /bin y /var en Linux?",
      a: "/home: carpetas de los usuarios. /etc: archivos de configuración. /bin: binarios esenciales (cp, mv, cat). /var: archivos variables como logs, cache y spool. Todo cuelga de la raíz /."
    }
  ]
});
