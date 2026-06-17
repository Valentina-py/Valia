/* ============================================================
   CONTENIDO DE ESTUDIO — Redes Informáticas y Comunicación
   Redes Informáticas y Comunicación · 2do año
   Basado en Kurose & Ross (Caps. 1 y 2) y en los TP de la cátedra.
   Cada unidad: { id, glyph, icon, title, desc, tool?, html, quiz, cards }
   ============================================================ */
window.APP_DATA = window.APP_DATA || {};
window.APP_DATA.units = [

/* ===================================================================
   UNIDAD 1 — INTRODUCCIÓN A LAS REDES
   =================================================================== */
{
  id: "redes",
  glyph: "⇄",
  icon: "net",
  title: "Introducción a las Redes",
  desc: "Internet, sistemas terminales, ISP, acceso, conmutación, retardos y throughput.",
  tool: "retardos",
  html: `
    <p class="lead">Una <strong>red de computadoras</strong> es un conjunto de dispositivos interconectados que intercambian datos siguiendo <strong>protocolos</strong>. Internet es "la red de redes": millones de redes enlazadas a escala mundial.</p>

    <div class="callout def">
      <strong class="callout__tag">Definición</strong>
      Un <strong>protocolo</strong> define el <em>formato</em> y el <em>orden</em> de los mensajes intercambiados entre dos o más entidades, y las <em>acciones</em> que se toman al enviar o recibir un mensaje. Son las "reglas" para que dos dispositivos se entiendan.
    </div>

    <h2>El borde de la red: sistemas terminales</h2>
    <p>Los <strong>sistemas terminales</strong> (o <em>hosts</em>) están en el "borde" de Internet: PCs, celulares, servidores, sensores. Ejecutan las aplicaciones.</p>
    <ul>
      <li><strong>Host:</strong> cualquier dispositivo con dirección IP que envía o recibe datos.</li>
      <li><strong>Sistema terminal:</strong> el host usado directamente por usuarios/aplicaciones. Un <strong>servidor web es un sistema terminal</strong> (está en el extremo y responde solicitudes).</li>
      <li><strong>Cliente:</strong> <em>inicia</em> la comunicación pidiendo un servicio. <strong>Servidor:</strong> <em>espera</em> y responde. El servidor nunca solicita servicios al cliente.</li>
    </ul>

    <h3>Tecnologías de acceso</h3>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Tecnología</th><th>Velocidad típica</th><th>Tipo</th></tr></thead>
      <tbody>
        <tr><td>Módem telefónico</td><td>hasta 56 kbps</td><td>dedicada</td></tr>
        <tr><td>DSL</td><td>1 – 100 Mbps</td><td>dedicada</td></tr>
        <tr><td>HFC (cable módem)</td><td>10 Mbps – 1 Gbps</td><td><strong>compartida</strong></td></tr>
        <tr><td>FTTH (fibra al hogar)</td><td>100 Mbps – 10 Gbps</td><td>gen. dedicada</td></tr>
        <tr><td>Ethernet (empresa)</td><td>10 Mbps – 10 Gbps</td><td>compartida</td></tr>
        <tr><td>Wi-Fi / 4G-5G</td><td>variable</td><td>compartida</td></tr>
      </tbody>
    </table>
    </div>
    <p>En <strong>HFC</strong> la velocidad se comparte entre los usuarios; en el canal de descarga no hay colisiones porque la transmisión va en un solo sentido. <strong>Ethernet</strong> funciona sobre par trenzado de cobre (UTP) o fibra óptica.</p>

    <h3>Medios físicos</h3>
    <ul>
      <li><strong>Guiados:</strong> las ondas viajan por un medio sólido — par trenzado (UTP), cable coaxial, fibra óptica.</li>
      <li><strong>No guiados:</strong> se propagan por el aire — Wi-Fi, radio, microondas, satélite.</li>
    </ul>

    <h2>Clasificación de las redes</h2>
    <p><strong>Por alcance:</strong> <strong>LAN</strong> (local, un edificio) y <strong>WAN</strong> (extensa, ciudades o países). <strong>Por la relación entre equipos:</strong></p>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Modelo</th><th>Ventajas</th><th>Desventajas</th></tr></thead>
      <tbody>
        <tr><td><strong>Cliente / Servidor</strong></td><td>Más seguridad y control; respaldos centralizados; sin datos duplicados.</td><td>SO de servidor más caro; todos dependen del servidor; más tráfico de peticiones.</td></tr>
        <tr><td><strong>Peer to Peer (P2P)</strong></td><td>Menos tráfico; autonomía; no necesita administrador.</td><td>Se vuelve lenta al crecer; menos seguridad; difícil de administrar.</td></tr>
      </tbody>
    </table>
    </div>
    <p><strong>Por topología</strong> (cómo se conectan físicamente):</p>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Topología</th><th>Cómo es</th></tr></thead>
      <tbody>
        <tr><td><strong>Bus</strong></td><td>Un único canal compartido por todos los dispositivos.</td></tr>
        <tr><td><strong>Anillo</strong></td><td>Cada estación se conecta a la siguiente; cada una repite la señal.</td></tr>
        <tr><td><strong>Estrella</strong></td><td>Todos se conectan a un punto central por el que pasa todo.</td></tr>
        <tr><td><strong>Árbol / jerárquica</strong></td><td>Varias estrellas ordenadas en jerarquía.</td></tr>
        <tr><td><strong>Malla</strong></td><td>Cada nodo se conecta con todos; hay caminos alternativos.</td></tr>
      </tbody>
    </table>
    </div>
    <p><strong>Ethernet</strong> es el estándar de LAN más usado (acceso al medio por <strong>CSMA/CD</strong>); <strong>Token Ring</strong> (IBM, IEEE 802.5, paso de testigo) quedó en desuso.</p>

    <h2>El núcleo de la red: conmutación</h2>
    <p>El núcleo es la malla de <strong>routers</strong> que reenvía datos entre sistemas terminales. Hay dos formas de mover datos por el núcleo:</p>

    <h3>Conmutación de circuitos</h3>
    <p>Se <strong>reserva</strong> un camino (ancho de banda) durante toda la conexión, como en la telefonía clásica.</p>
    <ul>
      <li>Ancho de banda dedicado y <strong>retardo constante</strong>; sin congestión ni pérdidas.</li>
      <li>Multiplexación <strong>FDM</strong> (bandas de frecuencia, todos a la vez) o <strong>TDM</strong> (turnos de tiempo).</li>
      <li>Desventaja de TDM: si el usuario no transmite en su turno, ese intervalo <strong>se desperdicia</strong>.</li>
    </ul>

    <h3>Conmutación de paquetes</h3>
    <p>El mensaje se parte en <strong>paquetes</strong>, cada uno con una cabecera (dirección de destino). Los routers usan esa dirección para reenviarlos.</p>
    <div class="callout def">
      <strong class="callout__tag">Store-and-forward</strong>
      Cada router debe <strong>recibir el paquete completo antes de reenviarlo</strong>. Por eso, con N enlaces de tasa R y paquete de tamaño L, el retardo de transmisión total es <strong>N · (L/R)</strong>.
    </div>
    <p>Usa <strong>multiplexación estadística</strong>: el enlace se comparte <em>dinámicamente según la demanda</em>, sin turnos fijos. Es más eficiente, pero puede haber colas y pérdidas.</p>

    <h2>Retardos en una red</h2>
    <p>El <strong>retardo nodal</strong> (en cada router) tiene cuatro componentes:</p>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Retardo</th><th>Qué es</th><th>Fórmula</th></tr></thead>
      <tbody>
        <tr><td><strong>Procesamiento</strong></td><td>examinar cabecera y decidir salida</td><td>—</td></tr>
        <tr><td><strong>Cola</strong> (espera)</td><td>esperar en el buffer; depende de la congestión <em>(único variable)</em></td><td>—</td></tr>
        <tr><td><strong>Transmisión</strong></td><td>"empujar" los bits al enlace</td><td><strong>L / R</strong></td></tr>
        <tr><td><strong>Propagación</strong></td><td>viaje del bit por el medio</td><td><strong>d / v</strong></td></tr>
      </tbody>
    </table>
    </div>
    <p>La <strong>transmisión (L/R)</strong> depende del tamaño del paquete y la tasa, <em>no</em> de la distancia. La <strong>propagación (d/v)</strong> depende de la distancia y la velocidad del medio (v ≈ 2×10⁸ m/s), <em>no</em> del tamaño.</p>

    <div class="callout tip">
      <strong class="callout__tag">Intensidad de tráfico</strong>
      La/R mide cuán cargado está un enlace. Si <strong>La/R → 1</strong> el retardo de cola se dispara; si <strong>La/R &gt; 1</strong> llega más de lo que sale y se <strong>pierden paquetes</strong>.
    </div>

    <h2>Throughput y cuello de botella</h2>
    <p>El <strong>throughput</strong> (tasa de transferencia real) en una ruta de varios enlaces lo limita el <strong>enlace más lento</strong> = <em>cuello de botella</em>.</p>
    <div class="formula-box">Ej.: enlaces de 10, 2 y 5 Mbps en serie  →  throughput = mín = 2 Mbps</div>
    <p>El <strong>RTT</strong> (Round-Trip Time) es el tiempo de ida y vuelta de un paquete pequeño; se usa para estimar el handshake de TCP o la carga de una página.</p>

    <div class="callout tip">
      <strong class="callout__tag">Practicá</strong>
      Usá la <a href="#/tool/retardos">Calculadora de retardos y throughput</a> para resolver los ejercicios numéricos de cálculo.
    </div>`,
  quiz: [
    { q: "El retardo de <strong>transmisión</strong> se calcula como…", opts: ["d / v", "L / R", "L × R", "R / L"], a: 1,
      exp: "L/R = tamaño del paquete sobre la tasa del enlace. No depende de la distancia." },
    { q: "¿Qué componente del retardo depende de la <strong>congestión</strong>?", opts: ["Procesamiento", "Transmisión", "Cola", "Propagación"], a: 2,
      exp: "El retardo de cola es el único variable: crece con el tráfico." },
    { q: "En una ruta de varios enlaces, el <strong>throughput</strong> lo limita…", opts: ["El enlace más rápido", "El enlace más lento (cuello de botella)", "El promedio", "El primer enlace"], a: 1,
      exp: "El cuello de botella es el enlace más lento de la ruta." },
    { q: "¿Qué conmutación <strong>reserva</strong> ancho de banda durante toda la conexión?", opts: ["De paquetes", "De circuitos", "Estadística", "Store-and-forward"], a: 1,
      exp: "Circuitos reserva recursos: ancho de banda dedicado y retardo constante." },
    { q: "¿Qué significa <strong>store-and-forward</strong>?", opts: ["Reenvía bit a bit mientras llegan", "Recibe el paquete completo antes de reenviarlo", "Descarta paquetes al azar", "Comprime el paquete"], a: 1,
      exp: "Debe almacenar el paquete entero y recién ahí lo reenvía; por eso suma L/R en cada nodo." },
    { q: "En <strong>HFC</strong> la velocidad de acceso es…", opts: ["Dedicada por usuario", "Compartida entre los usuarios", "Siempre de 1 Gbps fija", "Solo de subida"], a: 1,
      exp: "HFC (cable módem) comparte el medio entre los usuarios de la zona." },
    { q: "¿Qué <strong>topología</strong> usa un único canal compartido por todos los dispositivos?", opts: ["Estrella", "Anillo", "Bus", "Malla"], a: 2,
      exp: "En bus todos comparten un mismo canal; en estrella todo pasa por un nodo central." },
    { q: "¿Qué técnica de acceso al medio usa <strong>Ethernet</strong>?", opts: ["Paso de testigo (token)", "CSMA/CD", "TDM", "DHCP"], a: 1,
      exp: "Ethernet usa CSMA/CD (detección de portadora con detección de colisiones); el token es de Token Ring." }
  ],
  cards: [
    { q: "¿Diferencia entre host y sistema terminal? ¿Un servidor web es sistema terminal?", a: "<strong>Host:</strong> dispositivo con IP que envía/recibe datos. <strong>Sistema terminal:</strong> el host que usan directamente usuarios o apps. <strong>Sí</strong>: un servidor web es sistema terminal (está en el extremo y responde solicitudes)." },
    { q: "Topologías de red: bus, estrella, anillo y malla", a: "<strong>Bus:</strong> un canal compartido por todos. <strong>Estrella:</strong> todos a un nodo central. <strong>Anillo:</strong> cada estación se conecta a la siguiente y repite la señal. <strong>Malla:</strong> todos con todos, con caminos alternativos." },
    { q: "Componentes del retardo terminal a terminal: ¿cuáles son constantes y cuáles variables?", a: "Procesamiento, cola, transmisión y propagación. <strong>Variable:</strong> solo el de <strong>cola</strong> (depende de la congestión). Los otros tres son constantes." },
    { q: "Ventajas de conmutación de circuitos frente a paquetes", a: "Ancho de banda dedicado, retardo constante y predecible, sin congestión ni pérdidas, y QoS garantizada (ideal para voz/tiempo real)." }
  ]
},

/* ===================================================================
   UNIDAD 2 — CAPA DE APLICACIÓN
   =================================================================== */
{
  id: "aplicacion",
  glyph: "@",
  icon: "app",
  title: "Capa de Aplicación",
  desc: "Cliente-servidor y P2P, sockets, HTTP, correo, DNS y BitTorrent.",
  html: `
    <p class="lead">La <strong>capa de aplicación</strong> es donde viven los programas que usás (web, correo, mensajería). Solo se ejecuta en los <strong>sistemas terminales</strong>, no en el núcleo de la red.</p>

    <h2>Arquitecturas de aplicación</h2>
    <div class="callout def">
      <strong class="callout__tag">Atención</strong>
      La <strong>arquitectura de red</strong> es fija (las 5 capas). La <strong>arquitectura de aplicación</strong> la diseña el programador: define cómo se organiza la app sobre los hosts.
    </div>
    <ul>
      <li><strong>Cliente-servidor:</strong> un servidor siempre activo, con IP fija, atiende a los clientes (que no se hablan entre sí). Ej.: la Web. Ventaja: control centralizado. Desventaja: el servidor puede saturarse (no escala fácil).</li>
      <li><strong>P2P (par a par):</strong> los hosts se comunican directamente, sin servidor central. Ej.: BitTorrent. Ventaja: <strong>autoescalable</strong> (cada par aporta recursos). En cada sesión un par actúa de cliente y otro de servidor, pero un mismo par puede ser ambos a la vez.</li>
    </ul>

    <h2>Procesos, sockets y direccionamiento</h2>
    <p>Un <strong>socket</strong> es la "puerta" entre el proceso de aplicación y la capa de transporte: la app envía y recibe mensajes a través de él.</p>
    <div class="callout">
      <strong class="callout__tag">Identificar un proceso</strong>
      Para enviar datos a un proceso en otro host se necesitan <strong>dos datos</strong>: la <strong>dirección IP</strong> del host (identifica la máquina) y el <strong>número de puerto</strong> (identifica el proceso). Ej.: web → puerto 80, SMTP → 25, DNS → 53.
    </div>

    <h3>¿TCP o UDP?</h3>
    <p>La app elige el servicio de transporte. <strong>TCP</strong> da entrega <em>fiable</em>, control de flujo y de congestión. <strong>UDP</strong> es rápido, sin conexión ni garantías. Para una transacción lo más rápida posible conviene <strong>UDP</strong> (no hay handshake). <strong>SSL/TLS</strong> opera a nivel de aplicación: el programador incorpora la biblioteca y cifra antes de entregar a TCP.</p>

    <h2>HTTP — la Web</h2>
    <ul>
      <li><strong>No persistente:</strong> una conexión TCP por cada objeto (HTML, cada imagen). Gasta un RTT extra por objeto.</li>
      <li><strong>Persistente</strong> (por defecto en HTTP/1.1): reutiliza la misma conexión TCP para varios objetos. Menos retardo y sobrecarga.</li>
      <li><strong>Cookies:</strong> el servidor genera un ID, lo envía con <span class="cmd">Set-cookie</span>, el navegador lo guarda y lo reenvía en cada pedido → el servidor reconoce al usuario.</li>
      <li><strong>Caché web:</strong> guarda copias de objetos pedidos; si hay acierto, los entrega local (menos retardo). No reduce el retardo de <em>todos</em> los objetos, solo los que están en caché.</li>
    </ul>
    <p>HTTP es <strong>"sin estado"</strong> (no recuerda pedidos previos) y sus mensajes son texto ASCII. <strong>Métodos:</strong> GET, POST, HEAD (HTTP/1.0) + PUT y DELETE (HTTP/1.1). Códigos de estado más comunes:</p>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Código</th><th>Significado</th></tr></thead>
      <tbody>
        <tr><td><strong>200</strong> OK</td><td>pedido exitoso, el objeto va en la respuesta</td></tr>
        <tr><td><strong>301</strong> Moved Permanently</td><td>el objeto cambió de URL</td></tr>
        <tr><td><strong>304</strong> Not Modified</td><td>respuesta a un GET condicional: no cambió</td></tr>
        <tr><td><strong>400</strong> Bad Request</td><td>el servidor no entendió el pedido</td></tr>
        <tr><td><strong>404</strong> Not Found</td><td>el documento no existe en el servidor</td></tr>
      </tbody>
    </table>
    </div>

    <h2>FTP — transferencia de archivos</h2>
    <div class="callout def">
      <strong class="callout__tag">"Fuera de banda"</strong>
      FTP usa <strong>dos conexiones TCP</strong>: <strong>control</strong> (puerto 21, comandos y contraseñas) y <strong>datos</strong> (puerto 20, los archivos). Como el control viaja por una conexión distinta a los datos, se dice que va "fuera de banda". HTTP, en cambio, va "dentro de banda".
    </div>

    <h2>Correo electrónico</h2>
    <ul>
      <li><strong>SMTP:</strong> <em>envía</em> el correo (cliente→servidor y entre servidores). Es de "empuje" (push).</li>
      <li><strong>POP3:</strong> el destinatario <em>descarga</em> los mensajes ("bajar y borrar" o "bajar y mantener").</li>
      <li><strong>IMAP:</strong> gestiona los mensajes <em>en el servidor</em> (carpetas, sincroniza varios dispositivos).</li>
    </ul>
    <p>Alicia (correo web) → Benito (POP3): la serie de protocolos es <strong>HTTP → SMTP → POP3</strong>.</p>

    <h2>DNS — nombres a direcciones</h2>
    <p>El <strong>DNS</strong> traduce nombres (www.ejemplo.com) a direcciones IP. Es una base de datos <strong>jerárquica y distribuida</strong>: servidores <strong>raíz</strong> (13 en el mundo) → <strong>TLD</strong> (.com, .ar…) → <strong>autoritativos</strong>. Usa <strong>UDP</strong> (puerto 53) para ser rápido. La <strong>consulta iterativa</strong> deriva al siguiente servidor a contactar; la <strong>recursiva</strong> resuelve todo y devuelve la respuesta final. Los resultados se guardan en <strong>caché</strong> hasta que caduca su TTL.</p>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Registro DNS</th><th>Para qué sirve</th></tr></thead>
      <tbody>
        <tr><td><strong>A</strong></td><td>nombre de host → dirección IP</td></tr>
        <tr><td><strong>NS</strong></td><td>dominio → servidor autoritativo</td></tr>
        <tr><td><strong>CNAME</strong></td><td>alias → nombre canónico real</td></tr>
        <tr><td><strong>MX</strong></td><td>dominio → servidor de correo</td></tr>
      </tbody>
    </table>
    </div>

    <h2>Puertos bien conocidos</h2>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Servicio</th><th>Protocolo</th><th>Transporte</th><th>Puerto</th></tr></thead>
      <tbody>
        <tr><td>Web</td><td>HTTP / HTTPS</td><td>TCP</td><td>80 / 443</td></tr>
        <tr><td>Envío de correo</td><td>SMTP</td><td>TCP</td><td>25</td></tr>
        <tr><td>Descarga de correo</td><td>POP3 / IMAP</td><td>TCP</td><td>110 / 143</td></tr>
        <tr><td>Archivos</td><td>FTP (control / datos)</td><td>TCP</td><td>21 / 20</td></tr>
        <tr><td>Nombres</td><td>DNS</td><td>UDP</td><td>53</td></tr>
        <tr><td>Terminal remota</td><td>Telnet / SSH</td><td>TCP</td><td>23 / 22</td></tr>
      </tbody>
    </table>
    </div>

    <h2>P2P y BitTorrent</h2>
    <ul>
      <li><strong>Tit-for-tat</strong> (toma y daca): cada par envía a quienes le dan a mejor velocidad.</li>
      <li><strong>Desbloqueo optimista:</strong> cada par elige al azar a otro y le envía, aunque no esté entre los mejores → así un par nuevo recibe su primer fragmento.</li>
      <li><strong>Red solapada (overlay):</strong> red lógica de pares por encima de Internet. No contiene routers; sus nodos son los propios hosts.</li>
      <li><strong>DHT:</strong> tabla hash distribuida. En malla, 1 salto pero mucho estado; circular, poco estado pero ~N/2 saltos.</li>
    </ul>`,
  quiz: [
    { q: "¿En qué puerto escucha por defecto un servidor <strong>HTTP</strong>?", opts: ["21", "25", "80", "53"], a: 2,
      exp: "HTTP usa el puerto 80 (21=FTP control, 25=SMTP, 53=DNS)." },
    { q: "¿Cuántas conexiones TCP usa <strong>FTP</strong>?", opts: ["Una sola", "Dos: control y datos", "Tres", "Ninguna, usa UDP"], a: 1,
      exp: "FTP usa 2: control (21) y datos (20). Por eso el control va 'fuera de banda'." },
    { q: "¿Qué protocolo traduce <strong>nombres de dominio</strong> a IP?", opts: ["DHCP", "DNS", "ARP", "ICMP"], a: 1,
      exp: "El DNS resuelve nombres a IP. Usa UDP, puerto 53." },
    { q: "¿Qué arquitectura de aplicación es <strong>autoescalable</strong>?", opts: ["Cliente-servidor", "P2P (par a par)", "Centralizada", "Monolítica"], a: 1,
      exp: "En P2P cada par aporta recursos, así escala con la cantidad de usuarios." },
    { q: "Para una transacción <strong>lo más rápida posible</strong> conviene…", opts: ["TCP, por ser fiable", "UDP, sin handshake ni control de congestión", "FTP", "SMTP"], a: 1,
      exp: "UDP no establece conexión: empieza a enviar de inmediato (menor retardo)." },
    { q: "¿Qué protocolo de correo deja los mensajes <strong>en el servidor</strong> y sincroniza dispositivos?", opts: ["POP3", "IMAP", "SMTP", "HTTP"], a: 1,
      exp: "IMAP gestiona los correos en el servidor; POP3 típicamente descarga y borra." },
    { q: "HTTP <strong>persistente</strong> se caracteriza por…", opts: ["Una conexión TCP por objeto", "Reutilizar la misma conexión TCP para varios objetos", "No usar TCP", "Cifrar los datos"], a: 1,
      exp: "Reutiliza la conexión: ahorra un RTT por objeto frente al no persistente." },
    { q: "¿Qué código de estado HTTP significa <strong>documento no encontrado</strong>?", opts: ["200", "301", "404", "500"], a: 2,
      exp: "404 Not Found. 200 = OK, 301 = movido permanentemente." },
    { q: "¿Qué registro DNS asocia un dominio con su <strong>servidor de correo</strong>?", opts: ["A", "MX", "CNAME", "NS"], a: 1,
      exp: "MX → servidor de correo. A = nombre→IP, CNAME = alias, NS = servidor autoritativo." }
  ],
  cards: [
    { q: "¿Por qué FTP envía la información de control \"fuera de banda\"?", a: "Porque usa <strong>dos conexiones TCP</strong>: control (puerto 21, comandos y claves) y datos (puerto 20, archivos). El control viaja por una conexión distinta a los datos." },
    { q: "Registros DNS: A, NS, CNAME y MX", a: "<strong>A:</strong> nombre de host → dirección IP. <strong>NS:</strong> dominio → servidor autoritativo. <strong>CNAME:</strong> alias → nombre canónico. <strong>MX:</strong> dominio → servidor de correo." },
    { q: "¿Qué necesita un proceso para identificar a otro proceso en otro host?", a: "La <strong>dirección IP</strong> del host (la máquina) y el <strong>número de puerto</strong> (el proceso dentro de ese host)." },
    { q: "¿Para qué sirven SMTP, POP3 e IMAP?", a: "<strong>SMTP</strong> envía el correo (push). <strong>POP3</strong> descarga al dispositivo. <strong>IMAP</strong> gestiona los mensajes en el servidor y sincroniza varios dispositivos." }
  ]
},

/* ===================================================================
   UNIDAD 3 — CAPA DE TRANSPORTE
   =================================================================== */
{
  id: "transporte",
  glyph: "⇅",
  icon: "transport",
  title: "Capa de Transporte",
  desc: "TCP y UDP, puertos y sockets, segmento, 3-way handshake, control de flujo y de congestión.",
  html: `
    <p class="lead">La <strong>capa de transporte</strong> es el <strong>puente entre las aplicaciones y la red</strong>. Ofrece <strong>comunicación lógica proceso a proceso</strong>: dos programas en hosts distintos "se hablan" como si estuvieran conectados directamente, aunque entre ellos haya muchos routers.</p>

    <div class="callout def">
      <strong class="callout__tag">Proceso a proceso</strong>
      La capa de <strong>red</strong> conecta <em>hosts</em> entre sí; la capa de <strong>transporte</strong> conecta <em>procesos</em> (aplicaciones) dentro de esos hosts. Es la <strong>capa 4</strong> y su PDU es el <strong>segmento</strong>.
    </div>

    <h2>Multiplexación, puertos y sockets</h2>
    <p>Un <strong>socket</strong> es la puerta por la que un proceso envía y recibe datos. Como muchas apps usan la red a la vez, el transporte hace:</p>
    <ul>
      <li><strong>Multiplexación</strong> (emisor): junta los datos de varios sockets y les agrega una cabecera con su <strong>número de puerto</strong>.</li>
      <li><strong>Demultiplexación</strong> (receptor): usa los números de puerto para entregar cada segmento al <strong>socket correcto</strong>.</li>
    </ul>
    <div class="callout">
      <strong class="callout__tag">Puertos (16 bits → 0 a 65535)</strong>
      Un socket <strong>UDP</strong> se identifica con una <strong>tupla de 2</strong>: (IP destino, puerto destino). Un socket <strong>TCP</strong> se identifica con una <strong>tupla de 4</strong>: IP origen, puerto origen, IP destino, puerto destino. Por eso un servidor TCP puede atender muchos clientes a la vez.
    </div>

    <h2>UDP — rápido y sin garantías</h2>
    <p><strong>UDP</strong> (User Datagram Protocol) es un servicio <strong>"best effort"</strong> (mejor esfuerzo): los datagramas pueden perderse o llegar desordenados.</p>
    <ul>
      <li><strong>Sin conexión:</strong> no hay <em>handshake</em>, empieza a enviar de inmediato.</li>
      <li><strong>Cabecera mínima de 8 bytes</strong> → baja sobrecarga.</li>
      <li><strong>Sin control de congestión:</strong> envía al ritmo que quiera.</li>
    </ul>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Cabecera UDP (8 bytes)</th><th>Tamaño</th></tr></thead>
      <tbody>
        <tr><td>Puerto origen</td><td>16 bits</td></tr>
        <tr><td>Puerto destino</td><td>16 bits</td></tr>
        <tr><td>Longitud (cabecera + datos)</td><td>16 bits</td></tr>
        <tr><td>Checksum (detección de errores, opcional)</td><td>16 bits</td></tr>
      </tbody>
    </table>
    </div>
    <p><strong>Usos típicos:</strong> DNS, streaming de audio/video, juegos en línea, VoIP, TFTP. Si una app quiere fiabilidad sobre UDP, debe agregarla ella misma en la capa de aplicación.</p>

    <h2>TCP — fiable y orientado a conexión</h2>
    <p><strong>TCP</strong> (Transmission Control Protocol) entrega un <strong>flujo de bytes fiable y en orden</strong>, es <strong>full-duplex</strong> y <strong>punto a punto</strong>. Su cabecera mide unos <strong>20 bytes</strong>.</p>
    <ul>
      <li><strong>Número de secuencia:</strong> cuenta <em>bytes</em> (es el nº del primer byte del segmento dentro del flujo).</li>
      <li><strong>Número de ACK:</strong> el nº del <strong>siguiente byte esperado</strong>; es un ACK <strong>acumulativo</strong>.</li>
      <li><strong>Banderas (flags):</strong> <span class="cmd">SYN</span> inicia, <span class="cmd">FIN</span> cierra, <span class="cmd">RST</span> resetea; además ACK, PSH, URG.</li>
    </ul>

    <h3>Establecimiento: saludo en 3 pasos (3-way handshake)</h3>
    <div class="formula-box">1) Cliente → <strong>SYN</strong> (nº de secuencia inicial)
2) Servidor → <strong>SYN-ACK</strong> (reconoce y manda su nº inicial)
3) Cliente → <strong>ACK</strong> (ya puede llevar datos)</div>
    <p>El cierre usa segmentos <strong>FIN</strong> + <strong>ACK</strong> en ambos sentidos (4 pasos).</p>

    <h2>Transferencia fiable (rdt)</h2>
    <p>TCP construye un servicio confiable sobre el IP <em>no fiable</em> combinando: <strong>números de secuencia</strong>, <strong>ACK</strong>, <strong>temporizadores + retransmisión</strong> y <strong>checksum</strong>. La retransmisión se dispara por:</p>
    <ul>
      <li><strong>Timeout</strong> (expira el temporizador). El timeout se estima: <span class="cmd">TimeoutInterval = EstimatedRTT + 4·DevRTT</span>.</li>
      <li><strong>3 ACK duplicados</strong> → <strong>retransmisión rápida</strong> (no espera al timeout).</li>
    </ul>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Protocolo ARQ</th><th>Idea</th></tr></thead>
      <tbody>
        <tr><td><strong>Parada y espera</strong></td><td>envía 1 trama y espera su ACK. Simple pero ineficiente.</td></tr>
        <tr><td><strong>Ventana deslizante</strong></td><td>envía varias tramas sin esperar ACK de cada una; la ventana avanza con los ACK.</td></tr>
        <tr><td><strong>Retroceder N</strong> (Go-Back-N)</td><td>ante una pérdida, retransmite el paquete y <em>todos</em> los siguientes (receptor sin buffer).</td></tr>
        <tr><td><strong>Repetición selectiva</strong></td><td>retransmite <em>solo</em> el paquete con error (receptor con buffer).</td></tr>
      </tbody>
    </table>
    </div>

    <h2>Control de flujo vs. control de congestión</h2>
    <div class="callout warn">
      <strong class="callout__tag">¡No confundir!</strong>
      <strong>Control de flujo:</strong> evita saturar al <em>receptor</em>. <strong>Control de congestión:</strong> evita saturar la <em>red</em>.
    </div>
    <ul>
      <li><strong>Flujo:</strong> el receptor anuncia el espacio libre de su buffer en el campo <strong>RcvWindow</strong>; el emisor no envía más bytes sin ACK que ese valor.</li>
      <li><strong>Congestión:</strong> el emisor mantiene una ventana <strong>cwnd</strong> y aplica <strong>AIMD</strong> (incremento aditivo +1 MSS por RTT; decremento multiplicativo: cwnd ÷ 2 al detectar pérdida) → curva en "diente de sierra". Al iniciar usa <strong>arranque lento</strong> (cwnd = 1 MSS y se duplica cada RTT).</li>
    </ul>

    <h2>TCP vs UDP — resumen</h2>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Aspecto</th><th>TCP</th><th>UDP</th></tr></thead>
      <tbody>
        <tr><td>Conexión</td><td>Sí (3-way handshake)</td><td>No (sin conexión)</td></tr>
        <tr><td>Fiabilidad</td><td>Fiable y en orden</td><td>Best effort</td></tr>
        <tr><td>Cabecera</td><td>~20 bytes</td><td>8 bytes</td></tr>
        <tr><td>Control de flujo / congestión</td><td>Sí / Sí</td><td>No / No</td></tr>
        <tr><td>Usos</td><td>Web, correo, FTP</td><td>DNS, streaming, juegos, VoIP</td></tr>
      </tbody>
    </table>
    </div>
    <div class="callout tip">
      <strong class="callout__tag">Practicá</strong>
      Repasá esta unidad con el <a href="#/quiz/transporte">quiz de Capa de Transporte</a> y poné a prueba los protocolos por capa en el juego <a href="#/tool/capas">Protocolos por capa</a>.
    </div>`,
  quiz: [
    { q: "¿Cómo se llama la PDU (unidad de datos) de la capa de transporte?", opts: ["Paquete", "Segmento", "Trama", "Mensaje"], a: 1,
      exp: "El transporte usa el segmento (en UDP también se lo llama datagrama)." },
    { q: "¿Qué protocolo de transporte es <strong>sin conexión</strong> y best effort?", opts: ["TCP", "UDP", "Los dos", "Ninguno"], a: 1,
      exp: "UDP no hace handshake ni garantiza entrega; TCP sí es orientado a conexión y fiable." },
    { q: "El <strong>saludo en 3 pasos</strong> de TCP es…", opts: ["SYN → ACK", "SYN → SYN-ACK → ACK", "FIN → ACK → FIN", "ACK → SYN → ACK"], a: 1,
      exp: "Cliente SYN, servidor SYN-ACK, cliente ACK (que ya puede llevar datos)." },
    { q: "El <strong>control de flujo</strong> en TCP evita saturar…", opts: ["la red", "al receptor", "al router", "al emisor"], a: 1,
      exp: "El flujo cuida al receptor (RcvWindow). Saturar la RED es tarea del control de congestión." },
    { q: "¿Cuántos bytes tiene la <strong>cabecera de UDP</strong>?", opts: ["8", "16", "20", "40"], a: 0,
      exp: "8 bytes: puerto origen, puerto destino, longitud y checksum." },
    { q: "¿Qué identifica a un <strong>socket TCP</strong>?", opts: ["Solo el puerto destino", "(IP destino, puerto destino)", "Una tupla de 4: IP y puerto de origen y destino", "La dirección MAC"], a: 2,
      exp: "TCP usa los 4 valores; UDP, en cambio, solo la 2-tupla (IP y puerto destino)." },
    { q: "La <strong>retransmisión rápida</strong> de TCP se dispara al recibir…", opts: ["1 ACK", "3 ACK duplicados", "un SYN", "un FIN"], a: 1,
      exp: "Con 3 ACK duplicados TCP reenvía el segmento sin esperar a que expire el temporizador." },
    { q: "En <strong>AIMD</strong>, ¿qué pasa con la ventana <em>cwnd</em> al detectar una pérdida?", opts: ["Aumenta 1 MSS", "Se duplica", "Se divide por 2", "Se pone en 0"], a: 2,
      exp: "Decremento multiplicativo: cwnd ÷ 2 (y crece +1 MSS por RTT cuando no hay pérdidas)." }
  ],
  cards: [
    { q: "TCP vs UDP: ¿en qué se diferencian?", a: "<strong>TCP:</strong> orientado a conexión (3-way handshake), fiable y en orden, con control de flujo y de congestión, cabecera ~20 bytes (web, correo, FTP). <strong>UDP:</strong> sin conexión, best effort, cabecera 8 bytes, rápido (DNS, streaming, juegos, VoIP)." },
    { q: "¿En qué consiste el saludo en 3 pasos (3-way handshake)?", a: "1) el cliente envía <strong>SYN</strong> con su nº de secuencia inicial; 2) el servidor responde <strong>SYN-ACK</strong>; 3) el cliente envía <strong>ACK</strong> (que ya puede transportar datos). Recién ahí queda establecida la conexión." },
    { q: "Diferencia entre control de flujo y control de congestión", a: "<strong>Flujo:</strong> evita saturar al <em>receptor</em> usando la ventana RcvWindow que él anuncia. <strong>Congestión:</strong> evita saturar la <em>red</em> ajustando cwnd con AIMD (sube +1 MSS por RTT, baja a la mitad al perder paquetes)." }
  ]
},

/* ===================================================================
   UNIDAD 4 — CAPA DE RED Y DIRECCIONAMIENTO IP
   =================================================================== */
{
  id: "red",
  glyph: "⊕",
  icon: "globe",
  title: "Capa de Red y Direccionamiento IP",
  desc: "IP, reenvío y enrutamiento, ICMP, NAT, clases, máscaras, CIDR y subnetting.",
  tool: "subredes",
  html: `
    <p class="lead">La <strong>capa de red</strong> lleva los datos desde el host de origen hasta el de destino, <strong>atravesando muchas redes</strong>. Su PDU es el <strong>paquete</strong> (o <strong>datagrama</strong> IP). Se llama "Internet" en el modelo TCP/IP y "Red" (capa 3) en OSI.</p>

    <h2>Reenvío vs. enrutamiento</h2>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Reenvío (forwarding)</th><th>Enrutamiento (routing)</th></tr></thead>
      <tbody>
        <tr><td>Acción <strong>local</strong> de un router: mover el paquete de la interfaz de entrada a la de salida.</td><td>Proceso de <strong>extremo a extremo</strong>: decidir la <em>ruta completa</em> que siguen los paquetes.</td></tr>
      </tbody>
    </table>
    </div>
    <p>El algoritmo de enrutamiento rellena la <strong>tabla de reenvío</strong> de cada router (dirección destino → interfaz de salida).</p>

    <h2>El protocolo IP</h2>
    <p>IP es <strong>no orientado a conexión</strong> y <strong>best effort</strong>: no garantiza entrega ni orden. Campos clave de la cabecera:</p>
    <ul>
      <li><strong>TTL</strong> (Time To Live): nº máximo de routers que puede atravesar. Se <strong>resta 1 en cada router</strong>; si llega a <strong>0, el paquete se descarta</strong> (evita bucles infinitos).</li>
      <li><strong>Protocolo:</strong> indica a qué protocolo superior entregar los datos (TCP o UDP).</li>
      <li><strong>Direcciones IP</strong> de origen y destino (32 bits cada una).</li>
      <li><strong>Fragmentación:</strong> si el datagrama supera la <strong>MTU</strong> (tamaño máximo de trama del enlace), se divide en fragmentos; el <strong>reensamblado se hace solo en el destino</strong>.</li>
    </ul>

    <h2>Direccionamiento IPv4</h2>
    <p>Una dirección IPv4 tiene <strong>32 bits</strong> = <strong>4 octetos</strong> (4 grupos de 8 bits), escritos en <strong>notación decimal punteada</strong>. Cada octeto va de <strong>0 a 255</strong>.</p>
    <div class="formula-box">192.168.1.23  =  11000000.10101000.00000001.00010111</div>
    <p>Se divide en <strong>parte de red</strong> (identifica la red) y <strong>parte de host</strong> (identifica el equipo). Cuánto ocupa cada parte lo define la <strong>clase</strong> o la <strong>máscara</strong>.</p>

    <h3>Clases de direcciones</h3>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Clase</th><th>1.er octeto</th><th>Máscara por defecto</th><th>Hosts por red</th></tr></thead>
      <tbody>
        <tr><td><strong>A</strong> (0xxxxxxx)</td><td>0 – 127</td><td>255.0.0.0 (/8)</td><td>16.777.214</td></tr>
        <tr><td><strong>B</strong> (10xxxxxx)</td><td>128 – 191</td><td>255.255.0.0 (/16)</td><td>65.534</td></tr>
        <tr><td><strong>C</strong> (110xxxxx)</td><td>192 – 223</td><td>255.255.255.0 (/24)</td><td>254</td></tr>
        <tr><td><strong>D</strong> (multicast)</td><td>224 – 239</td><td>—</td><td>—</td></tr>
        <tr><td><strong>E</strong> (reservada)</td><td>240 – 255</td><td>—</td><td>—</td></tr>
      </tbody>
    </table>
    </div>

    <h3>Direcciones especiales y privadas</h3>
    <ul>
      <li><strong>Dirección de red:</strong> todos los bits de host en <strong>0</strong> (la <em>primera</em> de la subred). No se asigna a equipos.</li>
      <li><strong>Dirección de broadcast:</strong> todos los bits de host en <strong>1</strong> (la <em>última</em>). Tampoco se asigna.</li>
      <li><strong>Loopback:</strong> <span class="cmd">127.0.0.1</span> = la propia máquina.</li>
      <li><strong>Privadas</strong> (no salen a Internet): <span class="cmd">10.0.0.0–10.255.255.255</span>, <span class="cmd">172.16.0.0–172.31.255.255</span>, <span class="cmd">192.168.0.0–192.168.255.255</span>.</li>
    </ul>
    <div class="callout def">
      <strong class="callout__tag">¿Por qué se restan 2?</strong>
      Los hosts útiles de una red son <strong>2<sup>h</sup> − 2</strong> (h = bits de host): se descuentan la <em>dirección de red</em> y la de <em>broadcast</em>, que no son asignables.
    </div>

    <h2>Máscara de subred, CIDR y subnetting</h2>
    <p>La <strong>máscara</strong> indica con <strong>1</strong> los bits de red y con <strong>0</strong> los de host. En <strong>CIDR</strong> se escribe <span class="cmd">a.b.c.d/x</span>, donde <strong>x</strong> = cantidad de bits de red (el prefijo).</p>
    <div class="callout">
      <strong class="callout__tag">Crear subredes</strong>
      Se "toman prestados" bits de la parte de <em>host</em> para crear subredes. Fórmulas: <strong>nº de subredes = 2<sup>n</sup></strong> (n = bits prestados) y <strong>hosts útiles = 2<sup>h</sup> − 2</strong>.
    </div>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Prefijo</th><th>Máscara</th><th>Hosts útiles</th></tr></thead>
      <tbody>
        <tr><td>/24</td><td>255.255.255.0</td><td>254</td></tr>
        <tr><td>/25</td><td>255.255.255.128</td><td>126</td></tr>
        <tr><td>/26</td><td>255.255.255.192</td><td>62</td></tr>
        <tr><td>/27</td><td>255.255.255.224</td><td>30</td></tr>
        <tr><td>/28</td><td>255.255.255.240</td><td>14</td></tr>
        <tr><td>/30</td><td>255.255.255.252</td><td>2</td></tr>
      </tbody>
    </table>
    </div>

    <h3>Ejemplo resuelto: 192.168.10.0 en 4 subredes</h3>
    <p>Para <strong>4 subredes</strong> se prestan <strong>2 bits</strong> (2² = 4). Quedan 6 bits de host → 2⁶ − 2 = <strong>62 hosts</strong>. Máscara: <span class="cmd">255.255.255.192</span> (/26). El "salto" de bloque es 64:</p>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>#</th><th>Dirección de red</th><th>Rango útil</th><th>Broadcast</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>192.168.10.0</td><td>.1 – .62</td><td>192.168.10.63</td></tr>
        <tr><td>2</td><td>192.168.10.64</td><td>.65 – .126</td><td>192.168.10.127</td></tr>
        <tr><td>3</td><td>192.168.10.128</td><td>.129 – .190</td><td>192.168.10.191</td></tr>
        <tr><td>4</td><td>192.168.10.192</td><td>.193 – .254</td><td>192.168.10.255</td></tr>
      </tbody>
    </table>
    </div>
    <div class="callout tip">
      <strong class="callout__tag">Practicá</strong>
      Resolvé subredes al instante con la <a href="#/tool/subredes">Calculadora de subredes</a> y entrená con los <a href="#/practica">ejercicios</a>.
    </div>

    <h2>ICMP, NAT y enrutamiento</h2>
    <ul>
      <li><strong>ICMP:</strong> protocolo de diagnóstico y errores. <span class="cmd">ping</span> usa eco (tipos 8 y 0); <span class="cmd">traceroute</span> usa TTL creciente y el mensaje "TTL caducado".</li>
      <li><strong>NAT/PAT:</strong> traduce muchas IP <em>privadas</em> a <strong>una sola IP pública</strong> (la del router). Ahorra direcciones IPv4 y aporta seguridad; con puertos soporta miles de conexiones por IP.</li>
      <li><strong>DHCP:</strong> asigna la IP automáticamente (discover → offer → request → ACK) y entrega también el <strong>gateway</strong>, el <strong>DNS</strong> y la <strong>máscara</strong>.</li>
    </ul>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Protocolo de enrutamiento</th><th>Tipo</th><th>Métrica</th></tr></thead>
      <tbody>
        <tr><td><strong>RIP</strong></td><td>Vector de distancias (intra-AS)</td><td>nº de saltos, máx. 15 (16 = ∞)</td></tr>
        <tr><td><strong>OSPF</strong></td><td>Estado de enlace, Dijkstra (intra-AS)</td><td>coste configurable</td></tr>
        <tr><td><strong>BGP</strong></td><td>Vector de ruta (inter-AS)</td><td>políticas entre Sistemas Autónomos</td></tr>
      </tbody>
    </table>
    </div>
    <p>El <strong>default gateway</strong> es el router de primer salto al que se envían los paquetes cuando no hay una ruta más específica.</p>

    <h2>IPv6 (en breve)</h2>
    <p><strong>IPv6</strong> usa direcciones de <strong>128 bits</strong> (8 grupos hexadecimales) porque las de IPv4 (32 bits, ~4.300 millones) se agotaron. Se abrevia omitiendo ceros a la izquierda y usando <span class="cmd">::</span> una sola vez para bloques de ceros. En IPv6 no existe broadcast (lo reemplaza multicast).</p>`,
  quiz: [
    { q: "¿Cómo se llama la PDU de la <strong>capa de red</strong>?", opts: ["Segmento", "Paquete / datagrama", "Trama", "Bits"], a: 1,
      exp: "Mensaje (app) → Segmento (transporte) → Paquete/datagrama (red) → Trama (enlace)." },
    { q: "¿Cuál es la <strong>máscara por defecto</strong> de una red Clase C?", opts: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"], a: 2,
      exp: "Clase C = /24 = 255.255.255.0 (3 octetos de red, 1 de host)." },
    { q: "¿Cuántos <strong>hosts útiles</strong> tiene una red /26?", opts: ["64", "62", "30", "126"], a: 1,
      exp: "/26 deja 6 bits de host → 2⁶ − 2 = 62 (se restan red y broadcast)." },
    { q: "La dirección 120.17.84.170 pertenece a la clase…", opts: ["A", "B", "C", "D"], a: 0,
      exp: "El primer octeto (120) está entre 0 y 127 → Clase A." },
    { q: "¿Qué rango es de direcciones <strong>privadas</strong>?", opts: ["8.0.0.0/8", "192.168.0.0/16", "200.17.0.0/16", "127.0.0.0/8"], a: 1,
      exp: "Privadas: 10.0.0.0/8, 172.16.0.0/12 y 192.168.0.0/16. 127 es loopback." },
    { q: "Si el campo <strong>TTL</strong> de un paquete llega a 0, el router…", opts: ["lo reenvía igual", "descarta el paquete", "lo fragmenta", "lo devuelve al origen"], a: 1,
      exp: "TTL se resta 1 por router; en 0 se descarta para evitar bucles infinitos." },
    { q: "¿Qué hace <strong>NAT</strong>?", opts: ["Traduce nombres a IP", "Traduce IP privadas a una IP pública", "Cifra los paquetes", "Enruta entre Sistemas Autónomos"], a: 1,
      exp: "NAT/PAT mapea las IP privadas de la LAN a la única IP pública del router." },
    { q: "Una dirección con <strong>todos los bits de host en 1</strong> es la…", opts: ["dirección de red", "dirección de broadcast", "puerta de enlace", "loopback"], a: 1,
      exp: "Host todo en 1 = broadcast (la última de la subred); todo en 0 = dirección de red (la primera)." }
  ],
  cards: [
    { q: "Clases A, B y C: rango del 1.er octeto, máscara y hosts", a: "<strong>A:</strong> 0–127, máscara 255.0.0.0 (/8), 16.777.214 hosts. <strong>B:</strong> 128–191, 255.255.0.0 (/16), 65.534. <strong>C:</strong> 192–223, 255.255.255.0 (/24), 254. (D = multicast, E = reservada.)" },
    { q: "¿Cómo calculo subredes y hosts? (ejemplo /26)", a: "Subredes = <strong>2<sup>n</sup></strong> (n bits prestados); hosts útiles = <strong>2<sup>h</sup> − 2</strong> (h bits de host). Ej.: prestar 2 bits a una clase C → 4 subredes, máscara 255.255.255.192 (/26), 62 hosts cada una, saltos de 64 (.0, .64, .128, .192)." },
    { q: "Dirección de red vs dirección de broadcast", a: "<strong>Red:</strong> bits de host todos en <strong>0</strong> (primera dirección de la subred). <strong>Broadcast:</strong> bits de host todos en <strong>1</strong> (última). Ninguna se asigna a equipos; por eso se restan 2 al contar hosts." },
    { q: "Reenvío vs enrutamiento; RIP vs OSPF", a: "<strong>Reenvío:</strong> acción local de mover un paquete de la entrada a la salida del router. <strong>Enrutamiento:</strong> calcular la ruta completa. <strong>RIP:</strong> vector de distancias, métrica = saltos (máx 15). <strong>OSPF:</strong> estado de enlace con Dijkstra, coste configurable." }
  ]
},

/* ===================================================================
   UNIDAD 5 — CAPA DE ENLACE DE DATOS
   =================================================================== */
{
  id: "enlace",
  glyph: "⇆",
  icon: "link",
  title: "Capa de Enlace de Datos",
  desc: "Tramas, direcciones MAC, ARP, acceso al medio (CSMA/CD), Ethernet y switches.",
  html: `
    <p class="lead">La <strong>capa de enlace</strong> (capa 2) transfiere datos entre <strong>nodos vecinos</strong> (directamente conectados por un enlace): host↔switch, switch↔router, etc. Su PDU es la <strong>trama</strong> (frame).</p>

    <div class="callout def">
      <strong class="callout__tag">Nodo a nodo</strong>
      La capa de red lleva el datagrama de <em>extremo a extremo</em>; la de enlace lo mueve <em>un salto a la vez</em>, encapsulándolo en una trama distinta en cada enlace del camino.
    </div>

    <h2>Servicios de la capa de enlace</h2>
    <ul>
      <li><strong>Entramado (framing):</strong> encapsula el datagrama agregando cabecera y cola → forma la <strong>trama</strong>.</li>
      <li><strong>Acceso al medio (MAC):</strong> reglas para usar un medio compartido sin pisarse.</li>
      <li><strong>Entrega entre nodos vecinos</strong> y, opcionalmente, <strong>entrega fiable</strong> (poco usada en enlaces de baja tasa de error).</li>
      <li><strong>Detección y corrección de errores</strong> (bits dañados por ruido en el medio).</li>
      <li><strong>Control de flujo</strong> entre nodos adyacentes.</li>
    </ul>
    <p>Se implementa en la <strong>placa de red (NIC)</strong> / adaptador: combina hardware, software y firmware. La emisora arma la trama y le agrega control de errores; la receptora la verifica y extrae el datagrama.</p>

    <h2>Direcciones MAC</h2>
    <p>Cada interfaz de red tiene una <strong>dirección MAC</strong> (física) de <strong>48 bits</strong>, escrita en hexadecimal (ej. <span class="cmd">1A:2B:3C:4D:5E:6F</span>). Viene "grabada" en la NIC por el fabricante y es <strong>plana</strong> (no jerárquica).</p>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th></th><th>Dirección IP</th><th>Dirección MAC</th></tr></thead>
      <tbody>
        <tr><td>Capa</td><td>Red (3)</td><td>Enlace (2)</td></tr>
        <tr><td>Alcance</td><td>extremo a extremo (toda la ruta)</td><td>solo el enlace local (un salto)</td></tr>
        <tr><td>Tipo</td><td>lógica, jerárquica, cambia de red</td><td>física, plana, fija</td></tr>
        <tr><td>Tamaño</td><td>32 bits (IPv4)</td><td>48 bits</td></tr>
      </tbody>
    </table>
    </div>
    <p>La dirección MAC de <strong>broadcast</strong> es <span class="cmd">FF:FF:FF:FF:FF:FF</span> (todos los bits en 1).</p>

    <h2>ARP — de IP a MAC</h2>
    <div class="callout">
      <strong class="callout__tag">Address Resolution Protocol</strong>
      <strong>ARP</strong> traduce una dirección <strong>IP</strong> (capa 3) a su dirección <strong>MAC</strong> (capa 2) dentro de la misma LAN.
    </div>
    <p>Cuando un host conoce la IP de destino pero no su MAC: envía una <strong>solicitud ARP en broadcast</strong> ("¿quién tiene la IP X?"); el dueño responde con un <strong>ARP reply en unicast</strong> con su MAC. El resultado se guarda en la <strong>tabla ARP</strong> (caché temporal). Si el destino está en otra red, se resuelve la MAC del <strong>router (gateway)</strong>, no la del destino final.</p>

    <h2>Acceso al medio (protocolos MAC)</h2>
    <p>En un medio <em>compartido</em>, si dos nodos transmiten a la vez hay <strong>colisión</strong>. Hay tres familias de protocolos:</p>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Familia</th><th>Idea</th><th>Ejemplo</th></tr></thead>
      <tbody>
        <tr><td><strong>Partición del canal</strong></td><td>repartir el canal en porciones fijas</td><td>TDM (tiempo), FDM (frecuencia)</td></tr>
        <tr><td><strong>Acceso aleatorio</strong></td><td>transmitir y resolver colisiones</td><td><strong>CSMA/CD</strong> (Ethernet), <strong>CSMA/CA</strong> (Wi-Fi)</td></tr>
        <tr><td><strong>Por turnos</strong></td><td>tomar turnos ordenados</td><td>paso de testigo (Token Ring)</td></tr>
      </tbody>
    </table>
    </div>
    <p><strong>CSMA/CD</strong> (Carrier Sense Multiple Access / Collision Detection): el nodo <em>escucha</em> el canal antes de transmitir (carrier sense); si detecta una colisión mientras envía, <strong>aborta</strong> y reintenta tras un tiempo aleatorio (backoff exponencial). Es el método clásico de Ethernet sobre medio compartido. En Wi-Fi se usa <strong>CSMA/CA</strong> (evita la colisión, porque no puede detectarla bien en el aire).</p>

    <h2>Ethernet</h2>
    <p>Es la tecnología LAN dominante. Formato de la <strong>trama Ethernet</strong>:</p>
    <div class="formula-box">Preámbulo · MAC destino · MAC origen · Tipo · Datos (payload) · CRC</div>
    <ul>
      <li><strong>Preámbulo:</strong> sincroniza a emisor y receptor.</li>
      <li><strong>MAC destino / origen:</strong> 48 bits cada una.</li>
      <li><strong>Tipo:</strong> indica el protocolo de capa superior (p. ej. IP).</li>
      <li><strong>CRC</strong> (comprobación de redundancia cíclica): detecta errores; si falla, la trama se descarta.</li>
    </ul>
    <p>Ethernet ofrece un servicio <strong>sin conexión y no fiable</strong> (no hay ACK): la fiabilidad, si hace falta, la dan las capas superiores (TCP).</p>

    <h2>Switches (conmutadores)</h2>
    <p>Un <strong>switch</strong> opera en capa 2: reenvía tramas según la <strong>dirección MAC de destino</strong>. Es <strong>"transparente"</strong> (los hosts no saben que está). Características:</p>
    <ul>
      <li><strong>Autoaprendizaje:</strong> arma su <strong>tabla de conmutación</strong> (MAC → puerto) observando la MAC de <em>origen</em> de las tramas que llegan.</li>
      <li><strong>Filtrado y reenvío:</strong> si conoce el puerto del destino, manda la trama solo por ahí; si no, la difunde por todos (flooding) menos por el de entrada.</li>
      <li>Cada puerto es su propio <strong>dominio de colisión</strong> y trabaja en <strong>full-duplex</strong> → no hay colisiones (a diferencia del hub).</li>
    </ul>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Dispositivo</th><th>Capa</th><th>Reenvía según</th></tr></thead>
      <tbody>
        <tr><td><strong>Hub / repetidor</strong></td><td>Física (1)</td><td>nada: repite los bits a todos los puertos</td></tr>
        <tr><td><strong>Switch</strong></td><td>Enlace (2)</td><td>dirección <strong>MAC</strong></td></tr>
        <tr><td><strong>Router</strong></td><td>Red (3)</td><td>dirección <strong>IP</strong></td></tr>
      </tbody>
    </table>
    </div>
    <div class="callout warn">
      <strong class="callout__tag">No confundir switch y router</strong>
      El <strong>switch</strong> conecta equipos <em>dentro</em> de una LAN usando MAC; el <strong>router</strong> conecta <em>redes distintas</em> usando IP y elige rutas.
    </div>

    <h2>Detección de errores</h2>
    <p>Para descubrir bits dañados en el medio, la capa de enlace agrega bits de control (EDC):</p>
    <ul>
      <li><strong>Bit de paridad:</strong> 1 bit que hace par (o impar) la cantidad de unos. Detecta errores de 1 bit.</li>
      <li><strong>Checksum:</strong> suma de bloques (como en TCP/UDP).</li>
      <li><strong>CRC</strong> (redundancia cíclica): el más robusto; el que usa Ethernet.</li>
    </ul>`,
  quiz: [
    { q: "¿Cuál es la PDU (unidad de datos) de la <strong>capa de enlace</strong>?", opts: ["Datagrama", "Segmento", "Trama", "Paquete"], a: 2,
      exp: "Enlace = trama (frame). Red = datagrama/paquete, transporte = segmento." },
    { q: "¿Cuántos bits tiene una <strong>dirección MAC</strong>?", opts: ["32", "48", "16", "128"], a: 1,
      exp: "La MAC es de 48 bits (en hexadecimal); la IPv4 es de 32 bits." },
    { q: "¿Qué hace el protocolo <strong>ARP</strong>?", opts: ["Traduce nombres a IP", "Traduce una IP a su dirección MAC", "Enruta entre redes", "Asigna IP automáticamente"], a: 1,
      exp: "ARP resuelve IP → MAC dentro de la LAN. Nombres→IP es DNS; asignar IP es DHCP." },
    { q: "¿Qué técnica de acceso al medio usa <strong>Ethernet</strong> en medio compartido?", opts: ["CSMA/CA", "Paso de testigo", "CSMA/CD", "TDM"], a: 2,
      exp: "Ethernet usa CSMA/CD (escucha y detecta colisiones). Wi-Fi usa CSMA/CA." },
    { q: "Un <strong>switch</strong> reenvía las tramas según…", opts: ["la dirección IP de destino", "la dirección MAC de destino", "el número de puerto", "el nombre de dominio"], a: 1,
      exp: "El switch opera en capa 2 y usa la MAC de destino; el router usa la IP." },
    { q: "¿Cómo arma el switch su tabla de conmutación?", opts: ["Se la configura el administrador", "Observando la MAC de origen de las tramas que llegan", "Preguntando por DNS", "Con ARP"], a: 1,
      exp: "Autoaprendizaje: aprende qué MAC está en cada puerto mirando la MAC de origen." },
    { q: "La dirección MAC de <strong>broadcast</strong> es…", opts: ["00:00:00:00:00:00", "FF:FF:FF:FF:FF:FF", "127.0.0.1", "255.255.255.255"], a: 1,
      exp: "Todos los bits en 1: FF:FF:FF:FF:FF:FF. (255.255.255.255 sería broadcast de IP.)" },
    { q: "¿En qué capa trabaja un <strong>hub</strong>?", opts: ["Física", "Enlace", "Red", "Transporte"], a: 0,
      exp: "El hub es capa física: solo repite los bits a todos los puertos (un único dominio de colisión)." }
  ],
  cards: [
    { q: "¿Qué hace la capa de enlace y cuál es su PDU?", a: "Transfiere datos entre <strong>nodos vecinos</strong> (un salto, sobre un mismo enlace). Su PDU es la <strong>trama</strong>. Servicios: entramado, acceso al medio (MAC), detección de errores y, opcionalmente, entrega fiable y control de flujo." },
    { q: "Dirección MAC vs dirección IP", a: "<strong>MAC:</strong> física, 48 bits (hex), plana, grabada en la NIC, alcance <em>local</em> (un salto). <strong>IP:</strong> lógica, 32 bits, jerárquica, alcance <em>extremo a extremo</em>. ARP traduce IP → MAC." },
    { q: "¿Qué es ARP y cómo funciona?", a: "<strong>ARP</strong> traduce una IP a su MAC en la misma LAN. El host manda una <strong>solicitud en broadcast</strong> ('¿quién tiene la IP X?'), el dueño responde en <strong>unicast</strong> con su MAC, y se guarda en la <strong>tabla ARP</strong>. Si el destino está en otra red, se resuelve la MAC del gateway." },
    { q: "¿Qué es CSMA/CD?", a: "El método de acceso de Ethernet: el nodo <strong>escucha</strong> el canal antes de transmitir (carrier sense); si detecta una <strong>colisión</strong> mientras envía, aborta y reintenta tras un tiempo aleatorio (backoff). Wi-Fi usa CSMA/CA (evita la colisión)." },
    { q: "Hub vs switch vs router", a: "<strong>Hub:</strong> capa física, repite los bits a todos los puertos. <strong>Switch:</strong> capa enlace, reenvía por <strong>MAC</strong> (autoaprende la tabla, full-duplex, sin colisiones). <strong>Router:</strong> capa red, reenvía por <strong>IP</strong> y elige rutas entre redes." }
  ]
},

/* ===================================================================
   MODELO DE CAPAS Y ENCAPSULAMIENTO (síntesis)
   =================================================================== */
{
  id: "capas",
  glyph: "≡",
  icon: "layers",
  title: "Modelo de Capas y Encapsulamiento",
  desc: "Las 5 capas, unidades de datos, encapsulamiento y qué capa procesa cada dispositivo.",
  tool: "capas",
  html: `
    <p class="lead">Internet organiza la comunicación en <strong>capas</strong>: cada una resuelve una parte del problema y ofrece un servicio a la capa de arriba. El modelo de estudio (Kurose) usa <strong>5 capas</strong>.</p>

    <h2>Las cinco capas de la pila de Internet</h2>
    <div class="layer-block"><div class="lh">5 · Aplicación</div>
      <strong>Función:</strong> interfaz con el usuario; las apps generan e interpretan los datos.<br>
      <strong>Unidad (PDU):</strong> Mensaje · <strong>Dispositivo:</strong> host (PC, servidor).<br>
      <strong>Protocolos:</strong> HTTP, SMTP, FTP, DNS, POP3, IMAP, RIP.</div>
    <div class="layer-block"><div class="lh">4 · Transporte</div>
      <strong>Función:</strong> comunicación lógica <em>proceso a proceso</em> (puertos); fiabilidad, control de flujo y congestión.<br>
      <strong>Unidad:</strong> Segmento (TCP) / Datagrama (UDP) · <strong>Dispositivo:</strong> host.<br>
      <strong>Protocolos:</strong> TCP, UDP.</div>
    <div class="layer-block"><div class="lh">3 · Red</div>
      <strong>Función:</strong> lleva los datos de origen a destino entre redes; direccionamiento lógico (IP) y enrutamiento.<br>
      <strong>Unidad:</strong> Datagrama / paquete · <strong>Dispositivo:</strong> router.<br>
      <strong>Protocolos:</strong> IP, ICMP, RIP.</div>
    <div class="layer-block"><div class="lh">2 · Enlace</div>
      <strong>Función:</strong> transfiere datos entre <em>nodos vecinos</em>; acceso al medio (MAC) y detección de errores.<br>
      <strong>Unidad:</strong> Trama · <strong>Dispositivo:</strong> switch, placa de red (NIC).<br>
      <strong>Protocolos:</strong> Ethernet, Wi-Fi, ARP, PPP, Frame Relay, ATM.</div>
    <div class="layer-block"><div class="lh">1 · Física</div>
      <strong>Función:</strong> transmite los bits "crudos" por el medio (señales, voltajes).<br>
      <strong>Unidad:</strong> Bits · <strong>Dispositivo:</strong> cable, fibra, hub, repetidor.<br>
      <strong>Protocolos:</strong> medios y normas físicas (UTP, fibra, RJ-45).</div>
    <p class="muted">Las capas se numeran <strong>desde abajo</strong>: la 1 es Física (los bits) y la 5 es Aplicación (los programas).</p>

    <h2>Encapsulamiento</h2>
    <p>Al <strong>descender</strong> por las capas, cada una agrega su propia cabecera al dato de la capa superior:</p>
    <div class="formula-box">Mensaje  →  + cab. transporte = Segmento
       →  + cab. red = Datagrama
       →  + cab. enlace = Trama  →  Bits</div>
    <p>En el receptor se hace al revés (<strong>desencapsulamiento</strong>): cada capa quita su cabecera. Regla mnemotécnica: <em>Mensaje → Segmento → Datagrama → Trama → Bits</em>.</p>

    <h2>¿Qué capas procesa cada dispositivo?</h2>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Dispositivo</th><th>Capas que procesa</th></tr></thead>
      <tbody>
        <tr><td><strong>Host</strong> (PC, servidor)</td><td>las 5: aplicación, transporte, red, enlace, física</td></tr>
        <tr><td><strong>Router</strong></td><td>red, enlace y física</td></tr>
        <tr><td><strong>Switch</strong> de enlace</td><td>enlace y física</td></tr>
        <tr><td><strong>Hub / repetidor</strong></td><td>solo física</td></tr>
      </tbody>
    </table>
    </div>

    <h2>Protocolo → capa</h2>
    <div class="tbl-wrap">
    <table class="layers">
      <tr><td class="cap">Aplicación</td><td>HTTP, SMTP, POP3, IMAP, FTP, DNS · RIP (corre sobre UDP)</td></tr>
      <tr><td class="cap">Transporte</td><td>TCP (fiable) · UDP (no fiable)</td></tr>
      <tr><td class="cap">Red</td><td>IP (direccionamiento/enrutamiento) · ICMP (control/errores)</td></tr>
      <tr><td class="cap">Enlace</td><td>Ethernet, Token Ring (LAN) · Frame Relay, ATM (WAN) · ARP (IP↔MAC)</td></tr>
    </table>
    </div>
    <div class="callout tip">
      <strong class="callout__tag">Practicá</strong>
      Poné a prueba la clasificación con el juego <a href="#/tool/capas">Protocolos por capa</a>.
    </div>

    <h2>TCP/IP vs OSI · ventajas de las capas</h2>
    <p>El modelo <strong>TCP/IP "puro" tiene 4 capas</strong> (junta enlace y física en "acceso a la red"); el de estudio usa 5. El modelo <strong>OSI</strong> tiene 7 (agrega Sesión y Presentación).</p>
    <p><strong>Ventajas</strong> de organizar en capas: simplifica el diseño, da modularidad (cambiar una capa sin tocar las demás) y facilita la estandarización. <strong>Desventaja:</strong> funciones duplicadas entre capas y sobrecarga por las cabeceras.</p>

    <h2>Las dos funciones del router</h2>
    <ul>
      <li><strong>Reenvío (forwarding):</strong> acción local y rápida — mira la IP de destino y manda el paquete por el enlace de salida correcto, según su tabla.</li>
      <li><strong>Enrutamiento (routing):</strong> determina el camino completo origen→destino, construyendo las tablas con algoritmos/protocolos (p. ej. RIP).</li>
    </ul>`,
  quiz: [
    { q: "La unidad de datos (PDU) de la <strong>capa de red</strong> se llama…", opts: ["Trama", "Segmento", "Datagrama", "Mensaje"], a: 2,
      exp: "Mensaje (aplicación) → Segmento (transporte) → Datagrama (red) → Trama (enlace)." },
    { q: "¿Qué capas procesa un <strong>router</strong>?", opts: ["Solo red", "Red, enlace y física", "Las cinco", "Enlace y física"], a: 1,
      exp: "El router opera en red, enlace y física. El host procesa las cinco." },
    { q: "¿Cuántas capas tiene el modelo <strong>TCP/IP 'puro'</strong>?", opts: ["4", "5", "6", "7"], a: 0,
      exp: "TCP/IP puro tiene 4 capas (junta enlace y física). El de estudio usa 5; OSI tiene 7." },
    { q: "Las dos funciones principales de un <strong>router</strong> son…", opts: ["Cifrar y comprimir", "Reenvío y enrutamiento", "Enviar y recibir correo", "Detección de errores y control de flujo"], a: 1,
      exp: "Reenvío (forwarding) decide la salida de cada paquete; enrutamiento (routing) arma las tablas." },
    { q: "¿En qué capa opera <strong>SSL/TLS</strong>?", opts: ["Física", "Enlace", "Aplicación", "Red"], a: 2,
      exp: "SSL/TLS opera a nivel de aplicación: el desarrollador incorpora la biblioteca." },
    { q: "La capa de <strong>enlace</strong> direcciona entre nodos vecinos usando…", opts: ["Direcciones IP", "Direcciones MAC", "Números de puerto", "Nombres de dominio"], a: 1,
      exp: "La capa de enlace usa direcciones MAC; la IP es de la capa de red." }
  ],
  cards: [
    { q: "Mensaje, segmento, datagrama y trama: ¿qué es cada uno?", a: "<strong>Mensaje</strong> (aplicación) · <strong>Segmento</strong> (transporte: + puertos) · <strong>Datagrama</strong> (red: + IP) · <strong>Trama</strong> (enlace: + MAC). Cada capa agrega su cabecera = encapsulamiento." },
    { q: "¿Qué es el encapsulamiento de datos?", a: "Al bajar por las capas, cada una agrega su cabecera: Mensaje → Segmento → Datagrama → Trama → Bits. En el receptor se quitan (desencapsulamiento)." },
    { q: "Ventajas y desventaja de organizar la red en capas", a: "<strong>Ventajas:</strong> simplifica el diseño, modularidad (cambiar una capa sin afectar otras), estandarización. <strong>Desventaja:</strong> funciones duplicadas y sobrecarga por cabeceras." }
  ]
},

/* ===================================================================
   SEGURIDAD EN REDES
   =================================================================== */
{
  id: "seguridad",
  glyph: "⚿",
  icon: "shield",
  title: "Seguridad en Redes",
  desc: "Malware, botnets y DDoS, sniffing, spoofing y ataques man-in-the-middle.",
  html: `
    <p class="lead">Internet no fue diseñada pensando en la seguridad. Conviene conocer las amenazas más comunes y por qué funcionan.</p>

    <h2>Malware</h2>
    <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th>Tipo</th><th>Cómo se propaga</th></tr></thead>
      <tbody>
        <tr><td><strong>Virus</strong></td><td>se adjunta a archivos/programas; se propaga al <em>ejecutarlos</em>.</td></tr>
        <tr><td><strong>Gusano</strong> (worm)</td><td>se propaga <em>solo</em> por la red, sin intervención del usuario, aprovechando vulnerabilidades.</td></tr>
        <tr><td><strong>Troyano</strong></td><td>se presenta como legítimo pero oculta código malicioso que se ejecuta al instalarlo.</td></tr>
      </tbody>
    </table>
    </div>

    <h2>Botnets y DoS / DDoS</h2>
    <div class="callout def">
      <strong class="callout__tag">Botnet</strong>
      El atacante infecta muchos dispositivos con malware y los controla remotamente sin que el usuario lo sepa (una red de "bots").
    </div>
    <ul>
      <li><strong>DoS</strong> (denegación de servicio): saturar los recursos de un servidor para dejarlo fuera de servicio.</li>
      <li><strong>DDoS</strong> (distribuido): usa la <strong>botnet</strong> para enviar tráfico masivo <em>desde muchos orígenes a la vez</em>, mucho más difícil de frenar.</li>
    </ul>

    <h2>Sniffing, spoofing y man-in-the-middle</h2>
    <ul>
      <li><strong>Packet sniffing:</strong> un dispositivo en el medio compartido "escucha" y copia todos los paquetes que pasan (útil para robar contraseñas no cifradas).</li>
      <li><strong>IP spoofing:</strong> inyectar paquetes con una <em>dirección de origen falsa</em> para suplantar a otro host.</li>
      <li><strong>Man-in-the-middle:</strong> alguien (p. ej. "Victoria") se ubica entre dos partes e intercepta/reenvía los paquetes.</li>
    </ul>
    <div class="callout warn">
      <strong class="callout__tag">MITM — daños posibles</strong>
      Interceptar datos, modificar mensajes, suplantar identidad, insertar información falsa, repetir mensajes (replay) o interrumpir la comunicación.
    </div>

    <h2>Defensas básicas</h2>
    <ul>
      <li><strong>Cifrado</strong> (SSL/TLS, HTTPS) para confidencialidad e integridad.</li>
      <li><strong>Autenticación</strong> de los extremos.</li>
      <li><strong>Firewalls</strong> y filtrado de tráfico; sistemas de detección de intrusiones.</li>
      <li>En el router hogareño (Linksys): cambiar contraseña por defecto, cifrado Wi-Fi (WPA2), filtrado MAC, desactivar SSID si hace falta.</li>
    </ul>`,
  quiz: [
    { q: "¿Qué malware se propaga <strong>solo</strong> por la red sin intervención del usuario?", opts: ["Virus", "Gusano (worm)", "Troyano", "Cookie"], a: 1,
      exp: "El gusano se propaga solo aprovechando vulnerabilidades; el virus necesita que ejecuten el archivo." },
    { q: "Una <strong>botnet</strong> es…", opts: ["Un antivirus", "Una red de dispositivos infectados controlados por el atacante", "Un protocolo de correo", "Un tipo de cable"], a: 1,
      exp: "Es una red de 'bots' (equipos infectados) que el atacante controla remotamente." },
    { q: "Un ataque <strong>DDoS</strong> se caracteriza por…", opts: ["Cifrar los archivos de la víctima", "Tráfico masivo desde muchos orígenes a la vez (botnet)", "Robar cookies", "Falsificar un correo"], a: 1,
      exp: "DDoS = denegación de servicio distribuida: usa una botnet para saturar al servidor." },
    { q: "Interceptar y reenviar paquetes entre dos partes es un ataque…", opts: ["De fuerza bruta", "Man-in-the-middle", "De phishing", "SQL injection"], a: 1,
      exp: "El atacante se ubica 'en el medio' y puede leer, modificar o suplantar mensajes." }
  ],
  cards: [
    { q: "Diferencia entre virus, gusano y troyano", a: "<strong>Virus:</strong> se adjunta a archivos y se propaga al ejecutarlos. <strong>Gusano:</strong> se propaga solo por la red. <strong>Troyano:</strong> parece legítimo pero oculta código malicioso." },
    { q: "¿Cómo se crea una botnet y cómo se usa en un DDoS?", a: "El atacante infecta muchos equipos con malware y los controla remotamente (botnet). En un <strong>DDoS</strong> usa esa botnet para enviar tráfico masivo a un servidor a la vez, saturándolo." }
  ]
}

];
