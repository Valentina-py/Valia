window.COURSE_DATA = {
  slug: "programacion-web",
  title: "Programación Web",
  shortTitle: "Programación Web",
  meta: "Internet y Web · 2.º año · 2026",
  mark: "Web",
  kicker: "Valía · Sistemas · Segundo año",
  subtitle: "Cómo funciona Internet y la Web: arquitectura cliente-servidor, protocolos, DNS, hosting, dominios y el ecosistema argentino.",
  accent: "#0891B2",
  accent2: "#2563EB",
  updated: "11/09/2026",
  coverage: "Organiza la Unidad 1 y el Trabajo Práctico N.º 1 entregados por la cátedra. Los aranceles de NIC Argentina fueron contrastados con el tarifario oficial vigente al 11/09/2026.",
  units: [
    {
      id: "internet-web",
      glyph: "01",
      title: "Internet y la Web",
      desc: "Origen, evolución y diferencia entre la infraestructura de Internet y el servicio Web.",
      html: `
        <p class="lead"><strong>Internet</strong> es la red mundial de redes que conecta dispositivos. La <strong>Web</strong> es uno de los servicios que funciona sobre esa infraestructura y permite consultar recursos enlazados desde un navegador.</p>
        <h2>Una historia por capas</h2>
        <ol><li><strong>ARPANET:</strong> demostró que varias computadoras podían comunicarse mediante conmutación de paquetes.</li><li><strong>TCP/IP:</strong> dio un lenguaje común a redes distintas y se convirtió en la base de Internet.</li><li><strong>World Wide Web:</strong> combinó URL, HTTP y HTML para publicar y enlazar documentos.</li><li><strong>Web actual:</strong> suma aplicaciones interactivas, multimedia, servicios en la nube y dispositivos móviles.</li></ol>
        <div class="table-wrap"><table><thead><tr><th>Internet</th><th>Web</th></tr></thead><tbody><tr><td>Infraestructura y protocolos que conectan redes.</td><td>Sistema de documentos y aplicaciones accesibles con navegador.</td></tr><tr><td>También transporta correo, mensajería, juegos y otros servicios.</td><td>Usa principalmente HTTP o HTTPS.</td></tr></tbody></table></div>
        <div class="callout"><strong>Idea clave.</strong> La Web necesita Internet, pero Internet no se reduce a la Web.</div>`,
      quiz: [
        { q: "¿Cuál describe mejor la relación entre Internet y la Web?", opts: ["Son exactamente lo mismo", "La Web es un servicio que funciona sobre Internet", "Internet funciona dentro de HTML", "La Web solo sirve para correo"], a: 1, exp: "Internet es la infraestructura; la Web es uno de sus servicios." },
        { q: "¿Qué conjunto permitió identificar, transferir y mostrar recursos web?", opts: ["URL, HTTP y HTML", "FTP, SQL y CSS", "DNS, Java y USB", "IP, PDF y SMTP"], a: 0, exp: "URL identifica, HTTP transfiere y HTML estructura el documento." },
        { q: "TCP/IP fue decisivo porque…", opts: ["creó las pantallas táctiles", "permitió interconectar redes diferentes", "reemplazó todos los navegadores", "registró los dominios .ar"], a: 1, exp: "Proporcionó protocolos comunes para comunicar redes heterogéneas." }
      ],
      cards: [
        { q: "Internet", a: "Red mundial de redes conectadas mediante protocolos comunes." },
        { q: "World Wide Web", a: "Servicio de recursos enlazados que se consulta con un navegador." },
        { q: "ARPANET", a: "Red precursora que probó la comunicación mediante conmutación de paquetes." },
        { q: "Tres pilares iniciales de la Web", a: "URL, HTTP y HTML." }
      ]
    },
    {
      id: "cliente-servidor",
      glyph: "02",
      title: "Cliente y servidor",
      desc: "El recorrido de una petición desde el navegador hasta la respuesta del servidor.",
      html: `
        <p class="lead">La Web usa una arquitectura <strong>cliente-servidor</strong>. El cliente solicita un recurso; el servidor procesa la petición y devuelve una respuesta.</p>
        <h2>Qué ocurre al abrir una dirección</h2>
        <ol><li>El navegador interpreta la URL.</li><li>Consulta DNS para obtener la dirección IP del dominio.</li><li>Establece una conexión con el servidor.</li><li>Envía una petición HTTP.</li><li>Recibe una respuesta con un código de estado, cabeceras y contenido.</li><li>Procesa HTML, CSS, JavaScript e imágenes para mostrar la página.</li></ol>
        <h2>Responsabilidades</h2>
        <div class="table-wrap"><table><thead><tr><th>Cliente</th><th>Servidor</th></tr></thead><tbody><tr><td>Inicia la petición y presenta la interfaz.</td><td>Escucha peticiones y entrega recursos o datos.</td></tr><tr><td>Navegador, app móvil u otro programa.</td><td>Puede ejecutar lógica, consultar bases de datos y autenticar usuarios.</td></tr></tbody></table></div>
        <p>Una aplicación puede usar varios servidores: uno para el sitio, otro para una API, otro para archivos y otro para autenticación.</p>`,
      quiz: [
        { q: "En la Web, ¿quién inicia normalmente la petición?", opts: ["El servidor", "El cliente", "El DNS raíz", "El proveedor de hosting"], a: 1, exp: "El navegador u otro cliente solicita el recurso." },
        { q: "¿Qué hace el navegador después de recibir HTML?", opts: ["Lo registra como dominio", "Lo procesa y solicita recursos asociados", "Cambia la IP pública", "Apaga la conexión física"], a: 1, exp: "Interpreta el documento y obtiene CSS, scripts e imágenes necesarios." },
        { q: "Una API web suele actuar como…", opts: ["servidor ante su cliente", "cable de red", "dominio de nivel superior", "editor de código"], a: 0, exp: "Recibe solicitudes y responde con datos o resultados." }
      ],
      cards: [
        { q: "Cliente", a: "Programa que inicia una petición; por ejemplo, un navegador." },
        { q: "Servidor", a: "Sistema que recibe peticiones y devuelve recursos o resultados." },
        { q: "Petición", a: "Mensaje del cliente que indica qué recurso u operación necesita." },
        { q: "Respuesta", a: "Mensaje del servidor con estado, cabeceras y contenido." }
      ]
    },
    {
      id: "protocolos",
      glyph: "03",
      title: "Protocolos y modelos",
      desc: "TCP/IP, modelo OSI y el papel de HTTP y HTTPS en la comunicación web.",
      html: `
        <p class="lead">Un <strong>protocolo</strong> define reglas para intercambiar información. La comunicación se divide en capas para que cada una resuelva una parte del problema.</p>
        <h2>TCP/IP y OSI</h2>
        <div class="table-wrap"><table><thead><tr><th>TCP/IP</th><th>OSI de referencia</th><th>Ejemplos</th></tr></thead><tbody><tr><td>Aplicación</td><td>Aplicación, presentación y sesión</td><td>HTTP, HTTPS, DNS</td></tr><tr><td>Transporte</td><td>Transporte</td><td>TCP, UDP</td></tr><tr><td>Internet</td><td>Red</td><td>IP</td></tr><tr><td>Acceso a la red</td><td>Enlace y física</td><td>Ethernet, Wi‑Fi</td></tr></tbody></table></div>
        <h2>HTTP y HTTPS</h2>
        <p><strong>HTTP</strong> organiza peticiones y respuestas. <strong>HTTPS</strong> agrega una capa de seguridad mediante TLS: cifra el intercambio, ayuda a comprobar la identidad del sitio y protege la integridad de los datos.</p>
        <div class="callout"><strong>No confundir.</strong> HTTPS protege la conexión, pero no garantiza por sí solo que el contenido o la organización detrás del sitio sean confiables.</div>
        <p>Códigos habituales: <code>200</code> éxito, <code>301/302</code> redirección, <code>404</code> recurso no encontrado y <code>500</code> error interno del servidor.</p>`,
      quiz: [
        { q: "¿En qué capa del modelo TCP/IP se ubica HTTP?", opts: ["Aplicación", "Transporte", "Internet", "Acceso a la red"], a: 0, exp: "HTTP es un protocolo de aplicación." },
        { q: "¿Qué agrega HTTPS?", opts: ["Un dominio gratuito", "Cifrado y autenticación con TLS", "Más memoria al servidor", "Una dirección IP fija"], a: 1, exp: "TLS protege confidencialidad, identidad e integridad de la conexión." },
        { q: "¿Qué significa normalmente el estado 404?", opts: ["Respuesta correcta", "Redirección permanente", "Recurso no encontrado", "Servidor creado"], a: 2, exp: "El servidor no encontró el recurso solicitado." }
      ],
      cards: [
        { q: "Protocolo", a: "Conjunto de reglas para que dos sistemas intercambien información." },
        { q: "HTTP", a: "Protocolo de aplicación basado en peticiones y respuestas." },
        { q: "HTTPS", a: "HTTP protegido mediante TLS." },
        { q: "Código 404", a: "El recurso solicitado no fue encontrado." }
      ]
    },
    {
      id: "dns-hosting",
      glyph: "04",
      title: "DNS, dominios y hosting",
      desc: "Nombres legibles, direcciones IP, alojamiento y estructura de una URL.",
      html: `
        <p class="lead">Un <strong>dominio</strong> es un nombre fácil de recordar; <strong>DNS</strong> lo traduce a la dirección IP del servicio. El <strong>hosting</strong> aporta el espacio y los recursos donde se ejecuta o almacena el sitio.</p>
        <h2>Anatomía de una URL</h2>
        <pre><code>https://aula.ejemplo.com.ar/cursos/web?unidad=1#actividad
└─protocolo  └──── host ────┘ └─ruta─┘ └consulta┘ └fragmento┘</code></pre>
        <h2>Resolución simplificada</h2>
        <ol><li>El navegador revisa si ya conoce la respuesta.</li><li>El resolvedor consulta la jerarquía DNS si es necesario.</li><li>Obtiene un registro, como <code>A</code> o <code>AAAA</code>, asociado al dominio.</li><li>El cliente se conecta a esa IP y envía el nombre del host solicitado.</li></ol>
        <h2>Opciones de alojamiento</h2>
        <ul><li><strong>Compartido:</strong> económico; varios sitios usan el mismo servidor.</li><li><strong>VPS:</strong> recursos virtuales más controlables.</li><li><strong>Nube:</strong> servicios que escalan según la demanda.</li><li><strong>Estático:</strong> adecuado para HTML, CSS, JS e imágenes sin servidor propio.</li></ul>
        <div class="callout"><strong>Dominio y hosting son servicios distintos.</strong> Se pueden contratar con proveedores diferentes y vincularlos mediante registros DNS.</div>`,
      quiz: [
        { q: "¿Qué problema resuelve DNS?", opts: ["Traduce dominios a direcciones de red", "Escribe el HTML", "Cifra archivos locales", "Diseña la interfaz"], a: 0, exp: "Permite usar nombres legibles en lugar de recordar direcciones IP." },
        { q: "¿Qué parte de la URL indica cómo comunicarse?", opts: ["El fragmento", "El protocolo", "La ruta", "El dominio de segundo nivel"], a: 1, exp: "El esquema o protocolo aparece al comienzo, como https." },
        { q: "¿Dominio y hosting deben contratarse juntos?", opts: ["Siempre", "Nunca pueden vincularse", "No; son servicios distintos", "Solo en Argentina"], a: 2, exp: "El dominio puede apuntar por DNS a un hosting de otro proveedor." }
      ],
      cards: [
        { q: "DNS", a: "Sistema jerárquico que resuelve nombres de dominio a direcciones y otros registros." },
        { q: "Dominio", a: "Nombre registrable que identifica una presencia en Internet." },
        { q: "Hosting", a: "Infraestructura donde se alojan o ejecutan los recursos de un sitio." },
        { q: "Registro A", a: "Registro DNS que asocia un nombre con una dirección IPv4." }
      ]
    },
    {
      id: "gobernanza-ar",
      glyph: "05",
      title: "Gobernanza y dominios .ar",
      desc: "ICANN, IANA, LACNIC, LACTLD y el registro de dominios en NIC Argentina.",
      html: `
        <p class="lead">Internet funciona mediante coordinación distribuida. Distintas organizaciones administran identificadores, direcciones y dominios sin que una sola entidad controle toda la red.</p>
        <div class="table-wrap"><table><thead><tr><th>Organización</th><th>Rol principal</th></tr></thead><tbody><tr><td><strong>ICANN</strong></td><td>Coordina el sistema global de nombres y números.</td></tr><tr><td><strong>IANA</strong></td><td>Administra funciones centrales como la zona raíz y asignaciones globales.</td></tr><tr><td><strong>LACNIC</strong></td><td>Registro regional de direcciones IP para América Latina y el Caribe.</td></tr><tr><td><strong>LACTLD</strong></td><td>Asocia y coopera con administradores de dominios de país de la región.</td></tr><tr><td><strong>NIC Argentina</strong></td><td>Administra el dominio de nivel superior <code>.ar</code>.</td></tr></tbody></table></div>
        <h2>Registrar un dominio argentino</h2>
        <ol><li>Contar con CUIT/CUIL y clave fiscal con el nivel requerido.</li><li>Buscar el nombre y comprobar disponibilidad en NIC Argentina.</li><li>Elegir la zona adecuada y revisar si necesita habilitación previa.</li><li>Iniciar el trámite, completar los datos y abonar el arancel.</li><li>Configurar después los DNS para vincular el dominio con el servicio.</li></ol>
        <h2>Aranceles de referencia</h2>
        <p>Según el tarifario oficial consultado el 11/09/2026, el alta o renovación anual de <code>.ar</code> cuesta $25.500; zonas usuales como <code>.com.ar</code> y <code>.net.ar</code>, $8.500. Las zonas especiales pueden exigir documentación y tener otros importes.</p>
        <div class="callout"><strong>Comprobá antes de pagar.</strong> Los requisitos y aranceles pueden cambiar. Consultá siempre el <a href="https://nic.ar/dominios/aranceles" target="_blank" rel="noopener noreferrer">tarifario oficial de NIC Argentina</a> y el <a href="https://nic.ar/ayuda/instructivos/registro-de-dominio" target="_blank" rel="noopener noreferrer">instructivo de registro</a>.</div>`,
      quiz: [
        { q: "¿Qué entidad administra el dominio .ar?", opts: ["LACNIC", "NIC Argentina", "LACTLD", "IETF"], a: 1, exp: "NIC Argentina administra el dominio de país .ar." },
        { q: "¿Cuál es el registro regional de direcciones IP para América Latina y el Caribe?", opts: ["IANA", "NIC Argentina", "LACNIC", "W3C"], a: 2, exp: "LACNIC es el RIR de la región." },
        { q: "Después de registrar un dominio, ¿qué lo vincula con el alojamiento?", opts: ["Los registros DNS", "El editor HTML", "El cable USB", "El código 404"], a: 0, exp: "Los DNS indican a qué servicio debe dirigirse el nombre." }
      ],
      cards: [
        { q: "ICANN", a: "Coordina globalmente el sistema de identificadores únicos de Internet." },
        { q: "IANA", a: "Opera funciones centrales de numeración y zona raíz bajo ICANN." },
        { q: "LACNIC", a: "Registro regional de direcciones IP de América Latina y el Caribe." },
        { q: "NIC Argentina", a: "Organismo que administra el dominio .ar." }
      ]
    }
  ],
  practices: [
    {
      id: "tp1",
      unit: "internet-web",
      title: "TP 1 · Internet y Web",
      desc: "Diez actividades de investigación, comparación y diseño incluidas en la guía de la cátedra.",
      exercises: [
        { q: "Construí una línea de tiempo desde ARPANET hasta la Web actual con al menos seis hitos.", sol: "Elegí hitos que expliquen cambios reales: conmutación de paquetes, TCP/IP, DNS, propuesta de la Web, primer sitio y expansión móvil. Para cada uno indicá fecha, protagonista e impacto." },
        { q: "Explicá con un ejemplo cotidiano la diferencia entre Internet y la Web.", sol: "Podés comparar Internet con una red de rutas y la Web con uno de los servicios que las usa. Completá el ejemplo con correo o mensajería para demostrar que hay otros servicios." },
        { q: "Dibujá el ciclo petición-respuesta al abrir una página.", sol: "Incluí navegador, DNS, servidor, petición HTTP, respuesta y recursos secundarios. Usá flechas y numerá el orden." },
        { q: "Compará los modelos OSI y TCP/IP en una tabla.", sol: "Relacioná aplicación con las tres capas superiores de OSI, transporte con transporte, Internet con red y acceso con enlace/física." },
        { q: "Analizá una petición y una respuesta HTTP desde las herramientas del navegador.", sol: "Registrá URL, método, código de estado, tipo de contenido y tiempo. No copies cookies ni credenciales en el informe." },
        { q: "Investigá tres diferencias entre HTTP y HTTPS.", sol: "Considerá cifrado, autenticación e integridad. Aclarar que HTTPS no prueba por sí solo que el contenido sea legítimo mejora la conclusión." },
        { q: "Desarmá una URL real e identificá protocolo, host, ruta, consulta y fragmento.", sol: "No todas las URL tienen todos los componentes. Señalá cuáles están presentes y explicá para qué sirve cada uno." },
        { q: "Compará tres opciones de hosting para un sitio estático escolar.", sol: "Usá criterios comunes: costo, límite, dominio personalizado, despliegue, HTTPS y facilidad de uso. Cerrá con una recomendación justificada." },
        { q: "Simulá la elección y registro de un dominio .ar disponible.", sol: "Proponé alternativas, verificá disponibilidad sin completar una compra, elegí la zona y citá requisitos y arancel vigente desde NIC Argentina." },
        { q: "Creá un mapa conceptual de ICANN, IANA, LACNIC, LACTLD y NIC Argentina.", sol: "Uní cada sigla con su alcance y función. Evitá presentarlas como una jerarquía de mando: son roles coordinados y diferentes." }
      ]
    }
  ],
  sources: [
    { title: "Unidad 1 · Internet y Web", note: "Historia, arquitectura, modelos, protocolos, DNS, hosting, dominios y gobernanza" },
    { title: "Trabajo Práctico N.º 1", note: "10 consignas de investigación y aplicación" }
  ]
};

window.COURSE_TOOL = {
  title: "Analizador de URL",
  desc: "Separá una dirección web en sus componentes y repasá el recorrido de resolución.",
  mount(root, helpers) {
    root.innerHTML = `
      <div class="field"><label for="urlInput">Dirección completa</label><input id="urlInput" value="https://aula.ejemplo.com.ar/cursos/web?unidad=1#actividad"></div>
      <div class="btn-row"><button class="btn btn--primary" id="parseUrl">Analizar</button></div>
      <div class="tool-result" id="urlResult">Ingresá una URL absoluta.</div>`;
    root.querySelector("#parseUrl").addEventListener("click", () => {
      const result = root.querySelector("#urlResult");
      try {
        const url = new URL(root.querySelector("#urlInput").value.trim());
        const rows = [
          ["Protocolo", url.protocol.replace(":", "")], ["Host", url.host],
          ["Subdominio y dominio", url.hostname], ["Ruta", url.pathname || "/"],
          ["Consulta", url.search || "—"], ["Fragmento", url.hash || "—"]
        ];
        result.innerHTML = `<div class="table-wrap"><table><tbody>${rows.map(([label, value]) => `<tr><th>${label}</th><td><code>${helpers.escapeHtml(value)}</code></td></tr>`).join("")}</tbody></table></div>`;
      } catch (error) {
        result.textContent = "La dirección debe incluir el protocolo, por ejemplo https://";
      }
    });
  }
};
