/* ===========================================================
   Datos de las tarjetas de estudio
   Redes Informáticas y Comunicación
   =========================================================== */

const DECKS = {

  /* ============================ TP 1 ============================ */
  tp1: {
    id: "tp1",
    title: "TP N° 1 — Introducción a las Redes",
    short: "TP 1 · Introducción",
    color: "#6b1a3a",
    color2: "#9c3a5e",
    cards: [
      {
        q: "¿Diferencia entre host y sistema terminal? ¿Es un servidor web un sistema terminal?",
        a: `<strong>Host:</strong> cualquier dispositivo conectado a la red con dirección IP que envía o recibe datos.<br>
        <strong>Sistema terminal:</strong> dispositivos que usan directamente los usuarios o aplicaciones (PC, celular, servidor).<br>
        <strong>Sí</strong>, un servidor web es sistema terminal: está en el extremo, recibe solicitudes y envía respuestas (páginas).`
      },
      {
        q: "Ejemplo de un protocolo diplomático.",
        a: `Visita de un presidente a otro país:
        <ul>
          <li>Ceremonia de bienvenida oficial (himnos, banderas, guardia de honor).</li>
          <li>Orden de precedencia (quién saluda primero).</li>
          <li>Intercambio de discursos formales.</li>
          <li>Reunión privada y luego conferencia de prensa.</li>
        </ul>`
      },
      {
        q: "¿Programa cliente y programa servidor? ¿El servidor solicita servicios al cliente?",
        a: `<strong>Cliente:</strong> inicia la comunicación para solicitar un servicio o recurso.<br>
        <strong>Servidor:</strong> recibe solicitudes de los clientes y responde brindando servicios o recursos.<br>
        <strong>No:</strong> el servidor solo responde a las solicitudes, no las inicia.`
      },
      {
        q: "Seis tecnologías de acceso, clasificadas.",
        a: `<strong>Residencial:</strong> cable módem, fibra óptica.<br>
        <strong>Empresarial:</strong> Ethernet, Wi-Fi.<br>
        <strong>Móvil:</strong> redes 4G / 5G.`
      },
      {
        q: "HFC: ¿velocidad dedicada o compartida? ¿Hay colisiones en el canal de descarga?",
        a: `La velocidad es <strong>compartida</strong> entre los usuarios.<br>
        <strong>No hay colisiones en descarga:</strong> la transmisión va en un solo sentido y no hay múltiples dispositivos transmitiendo por ese mismo canal.`
      },
      {
        q: "Velocidad de Ethernet. ¿Pueden los usuarios transmitir continuamente a esa velocidad?",
        a: `<ul>
          <li>Ethernet clásica: <strong>10 Mbps</strong></li>
          <li>Fast Ethernet: <strong>100 Mbps</strong></li>
          <li>Gigabit Ethernet: <strong>1 Gbps</strong></li>
          <li>10 Gigabit Ethernet: <strong>10 Gbps</strong></li>
        </ul>
        <strong>No:</strong> aunque la red tenga esa velocidad, no siempre se puede usar al máximo de forma continua (se comparte el medio).`
      },
      {
        q: "Medios físicos sobre los que se puede usar Ethernet.",
        a: `<ul>
          <li><strong>UTP</strong> (par trenzado de cobre).</li>
          <li><strong>Fibra óptica.</strong></li>
        </ul>`
      },
      {
        q: "Acceso residencial: rango de velocidades y tipo (dedicada/compartida).",
        a: `<ul>
          <li><strong>Módem telefónico:</strong> hasta 56 kbps · dedicada.</li>
          <li><strong>HFC:</strong> 10 Mbps – 1 Gbps · compartida.</li>
          <li><strong>DSL:</strong> 1 – 100 Mbps · dedicada.</li>
          <li><strong>FTTH:</strong> 100 Mbps – 10 Gbps · gen. dedicada.</li>
        </ul>`
      },
      {
        q: "Ventajas de conmutación de circuitos vs paquetes. Desventaja de TDM frente a FDM.",
        a: `<strong>Ventajas de circuitos:</strong> ancho de banda dedicado, retardo constante, sin congestión, calidad de servicio estable.<br>
        <strong>TDM:</strong> divide el canal en intervalos de tiempo, cada usuario transmite en su turno.<br>
        <strong>FDM:</strong> divide el canal en bandas de frecuencia, todos transmiten a la vez en frecuencias distintas.`
      },
      {
        q: "¿Por qué la conmutación de paquetes usa multiplexación estadística? Compárala con TDM.",
        a: `Porque el ancho de banda se comparte <strong>dinámicamente según la demanda real</strong>.<br>
        <strong>Estadística:</strong> sin turnos fijos, el canal se usa solo cuando hay datos, más eficiente, pero puede haber colas y pérdidas.<br>
        <strong>TDM:</strong> turno fijo por usuario, ordenado y predecible, pero desperdicia capacidad si no se usa el turno.`
      },
      {
        q: "Retardo terminal a terminal con un switch de almacenamiento y reenvío (enlaces R1 y R2, paquete L).",
        a: `<div class="formula">Retardo = L/R1 + L/R2</div>
        Es la suma de los retardos de transmisión de cada enlace, porque el switch debe <strong>recibir el paquete completo antes de reenviarlo</strong> (store-and-forward).`
      },
      {
        q: "¿Diferencia entre un ISP de nivel 1 y uno de nivel 2?",
        a: `<strong>Nivel 1:</strong> los más grandes, cobertura global, no pagan a otros ISP, se conectan entre sí por <em>peering</em>.<br>
        <strong>Nivel 2:</strong> regionales/intermedios, alcance limitado, <strong>pagan</strong> a los de nivel 1 para acceso completo (aunque también pueden hacer peering).`
      },
      {
        q: "Enlace 2 Mbps, usuarios a 1 Mbps activos el 20% del tiempo.",
        a: `<strong>a)</strong> Con circuitos: soporta <strong>2 usuarios</strong> (2 Mbps / 1 Mbps).<br>
        <strong>b)</strong> Con ≤2 usuarios no hay cola (no superan los 2 Mbps); con 3 sí, porque pueden superar el recurso.<br>
        <strong>c)</strong> P(transmitir) = <strong>0,2</strong>.<br>
        <strong>d)</strong> Los 3 a la vez: 0,2³ = <strong>0,008</strong>.`
      },
      {
        q: "Componentes del retardo terminal a terminal. ¿Cuáles son constantes y cuáles variables?",
        a: `Componentes: retardo de <strong>procesamiento, cola, transmisión y propagación</strong>.<br>
        <strong>Constantes:</strong> procesamiento, transmisión y propagación.<br>
        <strong>Variable:</strong> el de cola, porque depende de la congestión de la red.`
      },
      {
        q: "Enlaces R1=500 kbps, R2=2 Mbps, R3=1 Mbps. Tasa y tiempo (archivo 4 MB).",
        a: `<strong>a)</strong> Tasa = enlace más lento (cuello de botella) = <strong>500 kbps</strong>.<br>
        <strong>b)</strong> 4 MB = 32 Mbit → 32.000.000 / 500.000 = <strong>64 s</strong>.<br>
        <strong>c)</strong> Si R2 = 100 kbps (nuevo cuello de botella): 32.000.000 / 100.000 = <strong>320 s</strong>.`
      },
      {
        q: "¿Cómo crea A los paquetes? ¿Qué dato usa el conmutador? Analogía con preguntar direcciones.",
        a: `A divide el archivo en <strong>paquetes</strong>, y a cada uno le agrega una <strong>cabecera</strong> con la dirección de destino.<br>
        El router usa la <strong>dirección de destino</strong> de la cabecera para decidir el enlace de salida.<br>
        Analogía: cada paquete viaja independiente y en cada nodo se decide el siguiente paso con la info del momento.`
      },
      {
        q: "Cinco tareas que puede realizar una capa. ¿Pueden repetirse en varias capas?",
        a: `<ul>
          <li>Control de errores</li>
          <li>Control de flujo</li>
          <li>Encapsulamiento de datos</li>
          <li>Direccionamiento</li>
          <li>Control de congestión</li>
        </ul>
        <strong>Sí</strong>, pueden superponerse en varias capas para mejorar confiabilidad y rendimiento.`
      },
      {
        q: "Las cinco capas de la pila de Internet y su responsabilidad.",
        a: `<ul>
          <li><strong>Aplicación:</strong> comunicación entre aplicaciones (web, correo).</li>
          <li><strong>Transporte:</strong> comunicación entre procesos; envío fiable, control de errores y flujo.</li>
          <li><strong>Red:</strong> direccionamiento lógico y enrutamiento origen→destino.</li>
          <li><strong>Enlace:</strong> transferencia entre nodos vecinos, acceso al medio.</li>
          <li><strong>Física:</strong> transmite los bits por el medio físico.</li>
        </ul>`
      },
      {
        q: "Mensaje, segmento, datagrama y trama: ¿qué es cada uno?",
        a: `<ul>
          <li><strong>Mensaje</strong> (aplicación): info que genera la app.</li>
          <li><strong>Segmento</strong> (transporte): mensaje + puertos y control de errores.</li>
          <li><strong>Datagrama</strong> (red): segmento + direcciones IP para enrutar.</li>
          <li><strong>Trama</strong> (enlace): datagrama + direcciones MAC y control de errores.</li>
        </ul>`
      },
      {
        q: "¿Qué capas procesa un router, un switch de enlace y un host?",
        a: `<strong>Router:</strong> red, enlace y física.<br>
        <strong>Switch de capa de enlace:</strong> enlace y física.<br>
        <strong>Host:</strong> las cinco — aplicación, transporte, red, enlace y física.`
      },
      {
        q: "¿Diferencia entre virus, gusano y caballo de Troya?",
        a: `<strong>Virus:</strong> se adjunta a archivos/programas y se propaga al ejecutarlos.<br>
        <strong>Gusano:</strong> se propaga solo por la red, sin intervención del usuario, aprovechando vulnerabilidades.<br>
        <strong>Troyano:</strong> se presenta como legítimo pero oculta código malicioso que se ejecuta al instalarlo.`
      },
      {
        q: "¿Cómo se crea una botnet y cómo se usa en un ataque DDoS?",
        a: `<strong>Botnet:</strong> el atacante infecta muchos dispositivos con malware; quedan controlados remotamente sin que el usuario lo sepa (red de "bots").<br>
        <strong>DDoS:</strong> usa la botnet para enviar tráfico masivo a un servidor al mismo tiempo, saturando sus recursos hasta dejarlo fuera de servicio.`
      },
      {
        q: "Victoria intercepta y reenvía paquetes entre Alicia y Benito. ¿Qué daños puede causar?",
        a: `Es un ataque <strong>man-in-the-middle</strong>. Puede:
        <ul>
          <li>Interceptar datos</li>
          <li>Modificar mensajes</li>
          <li>Suplantar identidad</li>
          <li>Insertar información falsa</li>
          <li>Repetir mensajes (replay)</li>
          <li>Interrumpir la comunicación</li>
        </ul>`
      },
      { tag: "Capas · Detalle",
        q: "Detalle de las 5 capas de la pila de Internet: función, unidad de datos, protocolos y dispositivo.",
        a: `<div class="layer-block">
          <div class="lh">5 · Aplicación</div>
          <strong>Función:</strong> interfaz con el usuario; las apps generan e interpretan los datos.<br>
          <strong>Unidad (PDU):</strong> Mensaje · <strong>Dispositivo:</strong> host (PC, servidor).<br>
          <strong>Protocolos:</strong> HTTP, SMTP, FTP, DNS, POP3, IMAP.
        </div>
        <div class="layer-block">
          <div class="lh">4 · Transporte</div>
          <strong>Función:</strong> comunicación lógica <em>proceso a proceso</em> (puertos); fiabilidad, control de flujo y congestión.<br>
          <strong>Unidad:</strong> Segmento (TCP) / Datagrama (UDP) · <strong>Dispositivo:</strong> host.<br>
          <strong>Protocolos:</strong> TCP (fiable), UDP (rápido, sin garantías).
        </div>
        <div class="layer-block">
          <div class="lh">3 · Red</div>
          <strong>Función:</strong> lleva los datos de origen a destino entre redes; direccionamiento lógico (IP) y enrutamiento.<br>
          <strong>Unidad:</strong> Datagrama / paquete · <strong>Dispositivo:</strong> router.<br>
          <strong>Protocolos:</strong> IP, ICMP, RIP.
        </div>
        <div class="layer-block">
          <div class="lh">2 · Enlace</div>
          <strong>Función:</strong> transfiere datos entre <em>nodos vecinos</em>; acceso al medio (MAC) y detección de errores.<br>
          <strong>Unidad:</strong> Trama · <strong>Dispositivo:</strong> switch, placa de red (NIC).<br>
          <strong>Protocolos:</strong> Ethernet, Wi-Fi, ARP, PPP.
        </div>
        <div class="layer-block">
          <div class="lh">1 · Física</div>
          <strong>Función:</strong> transmite los bits "crudos" por el medio (codificación, señales, voltajes).<br>
          <strong>Unidad:</strong> Bits · <strong>Dispositivo:</strong> cable, fibra, hub, repetidor.<br>
          <strong>Protocolos:</strong> medios y normas físicas (UTP, fibra óptica, RJ-45).
        </div>
        <div class="tip">Truco para memorizar (de arriba abajo): <em>Mensaje → Segmento → Datagrama → Trama → Bits</em>.</div>` }
    ]
  },

  /* ============================ TP 2 ============================ */
  tp2: {
    id: "tp2",
    title: "TP N° 2 — Capa de Aplicación",
    short: "TP 2 · Capa de Aplicación",
    color: "#1a3a6b",
    color2: "#3a5e9c",
    cards: [
      { tag: "A · 1",
        q: "Enumere cinco aplicaciones de Internet no propietarias y sus protocolos de capa de aplicación.",
        a: `<ul>
          <li>Web → <strong>HTTP</strong></li>
          <li>Correo electrónico → <strong>SMTP</strong></li>
          <li>Transferencia de archivos → <strong>FTP</strong></li>
          <li>Resolución de nombres → <strong>DNS</strong></li>
          <li>Terminal remota → <strong>Telnet / SSH</strong></li>
        </ul>` },
      { tag: "A · 2",
        q: "¿Diferencia entre arquitectura de red y arquitectura de aplicación?",
        a: `<strong>Arquitectura de red:</strong> es fija; son las 5 capas (pila TCP/IP). Define los servicios que la red ofrece a las aplicaciones.<br>
        <strong>Arquitectura de aplicación:</strong> la diseña el desarrollador. Define cómo se organiza la app sobre los sistemas terminales: <em>cliente-servidor</em> o <em>P2P</em>.` },
      { tag: "A · 3",
        q: "En una sesión entre dos procesos, ¿cuál es el cliente y cuál el servidor?",
        a: `El <strong>cliente</strong> es el proceso que <em>inicia</em> la comunicación (contacta primero).<br>
        El <strong>servidor</strong> es el proceso que <em>espera</em> a ser contactado para iniciar la sesión.` },
      { tag: "A · 4",
        q: "En P2P, ¿\"no existen lados de cliente y servidor\"? ¿Por qué?",
        a: `<strong>No es del todo cierto.</strong> En cada sesión individual entre dos pares, uno actúa como cliente (pide el fragmento) y otro como servidor (lo provee). Lo que pasa es que un mismo par puede ser <em>cliente y servidor a la vez</em> en distintas sesiones. Los roles sí existen, pero no son fijos.` },
      { tag: "A · 5",
        q: "¿Qué información usa un proceso para identificar a otro proceso en otro host?",
        a: `Necesita dos datos:
        <ul>
          <li>La <strong>dirección IP</strong> del host de destino.</li>
          <li>El <strong>número de puerto</strong> que identifica al proceso receptor en ese host.</li>
        </ul>` },
      { tag: "A · 6",
        q: "Transacción lo más rápida posible: ¿UDP o TCP? ¿Por qué?",
        a: `<strong>UDP.</strong> No tiene establecimiento de conexión (no hay <em>handshake</em>) ni control de congestión, por lo que ofrece menor retardo. Empieza a enviar de inmediato. La contra es que no es fiable, pero gana en velocidad.` },
      { tag: "A · 7",
        q: "Cuatro clases de servicios de transporte: ¿las da UDP o TCP?",
        a: `<ul>
          <li><strong>Transferencia fiable de datos:</strong> TCP sí, UDP no.</li>
          <li><strong>Tasa de transferencia (throughput):</strong> ninguno la garantiza.</li>
          <li><strong>Temporización (retardo):</strong> ninguno la garantiza.</li>
          <li><strong>Seguridad:</strong> ninguno nativamente (TCP puede mejorarse con SSL).</li>
        </ul>` },
      { tag: "A · 8",
        q: "¿En qué capa opera SSL? ¿Qué debe hacer el desarrollador para usarlo?",
        a: `SSL opera en la <strong>capa de aplicación</strong>.<br>
        El desarrollador debe <strong>incorporar la biblioteca SSL</strong> en su aplicación y hacer las llamadas a su API (cifrar/descifrar antes de entregar los datos a TCP).` },
      { tag: "B · 1",
        q: "¿Por qué HTTP, FTP, SMTP y POP3 corren sobre TCP y no UDP?",
        a: `Porque necesitan <strong>transferencia fiable de datos</strong>: páginas web, archivos y correos deben llegar <em>completos y sin errores</em>. TCP garantiza la entrega ordenada y sin pérdidas; UDP no lo asegura.` },
      { tag: "B · 2",
        q: "¿Cómo registra un sitio de e-commerce las compras de cada cliente con cookies?",
        a: `El servidor genera un <strong>ID único</strong> y lo guarda en su base de datos. Lo envía al navegador con la cabecera <em>Set-cookie</em>. El navegador lo almacena en su archivo de cookies y lo reenvía en cada pedido. Así el servidor <strong>reconoce al usuario</strong> y asocia sus compras a ese ID.` },
      { tag: "B · 3",
        q: "¿Cómo reduce el retardo la caché web? ¿Reduce el de todos los objetos?",
        a: `La caché guarda copias de objetos pedidos recientemente. Si el objeto está (acierto), se entrega local sin ir al servidor de origen → menos retardo.<br>
        <strong>No reduce el de todos:</strong> solo el de los objetos que están en caché. Si no está (fallo), igual hay que buscarlo en el servidor de origen.` },
      { tag: "B · 4",
        q: "¿Por qué se dice que FTP envía la información de control \"fuera de banda\"?",
        a: `Porque FTP usa <strong>dos conexiones TCP separadas</strong>:
        <ul>
          <li><strong>Control</strong> (puerto 21): comandos y contraseñas.</li>
          <li><strong>Datos</strong> (puerto 20): los archivos.</li>
        </ul>
        La info de control viaja por una conexión <em>distinta</em> a la de los datos → "fuera de banda".` },
      { tag: "B · 5",
        q: "Alicia (correo web) → Benito (POP3): ¿qué protocolos se usan?",
        a: `<ul>
          <li><strong>HTTP:</strong> Alicia sube el mensaje desde su navegador a su servidor de correo.</li>
          <li><strong>SMTP:</strong> el servidor de Alicia envía el mensaje al servidor de Benito.</li>
          <li><strong>POP3:</strong> Benito descarga el mensaje desde su servidor de correo.</li>
        </ul>
        Serie: <strong>HTTP → SMTP → POP3</strong>.` },
      { tag: "B · 6",
        q: "POP3: ¿diferencia entre \"descargar y borrar\" y \"descargar y mantener\"?",
        a: `<strong>Descargar y borrar:</strong> los mensajes se eliminan del servidor al bajarlos. Si cambia de dispositivo, no puede volver a verlos.<br>
        <strong>Descargar y mantener:</strong> los mensajes quedan en el servidor tras bajarlos, así puede acceder a ellos desde varios dispositivos.` },
      { tag: "C · 1",
        q: "BitTorrent: si Alicia da fragmentos cada 30 s, ¿Benito devolverá el favor igual?",
        a: `<strong>No necesariamente.</strong> BitTorrent usa <em>tit-for-tat</em> (toma y daca): Benito enviará a Alicia solo si ella está entre los pares que le dan a <strong>mejor velocidad</strong>. Depende de las tasas de envío, no del intervalo de tiempo; no tiene que ser el mismo intervalo.` },
      { tag: "C · 2",
        q: "Si Alicia entra a BitTorrent sin fragmentos, ¿cómo obtiene el primero?",
        a: `Mediante el <strong>desbloqueo optimista</strong> (<em>optimistically unchoked</em>): cada par elige periódicamente a otro par <strong>al azar</strong> y le envía fragmentos, aunque no esté entre sus mejores proveedores. Así Alicia, sin nada que ofrecer, recibe su primer fragmento.` },
      { tag: "C · 3",
        q: "¿Qué es una red solapada (overlay)? ¿Tiene routers? ¿Sus fronteras?",
        a: `Es una <strong>red lógica</strong> formada por los pares y las conexiones lógicas entre ellos, construida <em>por encima</em> de la red física (Internet).<br>
        <strong>No contiene routers</strong> (esos son de la red física). Sus nodos/fronteras son los <strong>propios pares (hosts)</strong>. Se crea y mantiene a nivel de aplicación: cada par abre conexiones TCP con otros y esas son las aristas.` },
      { tag: "C · 4",
        q: "¿Por qué la mensajería con índice centralizado es híbrida (C-S + P2P)?",
        a: `Es híbrida porque usa un <strong>servidor centralizado</strong> (cliente-servidor) para registrar y localizar a los usuarios (quién está en línea y con qué IP), pero el <strong>chat real</strong> entre los usuarios se hace <strong>directamente par a par (P2P)</strong>, sin pasar por el servidor.` },
      { tag: "C · 5",
        q: "DHT en malla vs DHT circular (sin atajos): ventajas y desventajas.",
        a: `<strong>Malla</strong> (cada par conoce a todos):<br>
        + Consultas en <strong>1 solo salto</strong> (muy rápido).<br>
        – Cada par mantiene info de los N–1 demás → no escala, mucho overhead.<br>
        <strong>Circular sin atajos:</strong><br>
        + Cada par guarda solo a pocos vecinos (poco estado, fácil de mantener).<br>
        – Consultas lentas: en promedio <strong>N/2 saltos</strong>.` },
      { tag: "C · 6",
        q: "¿Para qué dos funciones usa Skype técnicas P2P?",
        a: `<ul>
          <li><strong>Localización de usuarios:</strong> encontrar la IP del destino mediante superpares (<em>super nodes</em>).</li>
          <li><strong>Retransmisión (relay):</strong> cuando ambos están detrás de NAT/firewall, un par intermediario reenvía la comunicación.</li>
        </ul>` },
      { tag: "C · 7",
        q: "Cite cuatro aplicaciones que se adapten naturalmente a P2P.",
        a: `<ul>
          <li>Distribución de archivos (<strong>BitTorrent</strong>).</li>
          <li><strong>Mensajería instantánea.</strong></li>
          <li>Telefonía por Internet / VoIP (<strong>Skype</strong>).</li>
          <li>Streaming de video P2P (<strong>IPTV</strong>) / bases de datos distribuidas (DHT).</li>
        </ul>` },
      { tag: "Capas · Detalle",
        q: "Detalle de las 5 capas: función, unidad de datos, protocolos y dispositivo (la capa de aplicación es la de este TP).",
        a: `<div class="layer-block">
          <div class="lh">5 · Aplicación</div>
          <strong>Función:</strong> interfaz con el usuario; las apps generan e interpretan los datos.<br>
          <strong>Unidad (PDU):</strong> Mensaje · <strong>Dispositivo:</strong> host (PC, servidor).<br>
          <strong>Protocolos:</strong> HTTP, SMTP, FTP, DNS, POP3, IMAP.
        </div>
        <div class="layer-block">
          <div class="lh">4 · Transporte</div>
          <strong>Función:</strong> comunicación lógica <em>proceso a proceso</em> (puertos); fiabilidad, control de flujo y congestión.<br>
          <strong>Unidad:</strong> Segmento (TCP) / Datagrama (UDP) · <strong>Dispositivo:</strong> host.<br>
          <strong>Protocolos:</strong> TCP (fiable), UDP (rápido, sin garantías).
        </div>
        <div class="layer-block">
          <div class="lh">3 · Red</div>
          <strong>Función:</strong> lleva los datos de origen a destino entre redes; direccionamiento lógico (IP) y enrutamiento.<br>
          <strong>Unidad:</strong> Datagrama / paquete · <strong>Dispositivo:</strong> router.<br>
          <strong>Protocolos:</strong> IP, ICMP, RIP.
        </div>
        <div class="layer-block">
          <div class="lh">2 · Enlace</div>
          <strong>Función:</strong> transfiere datos entre <em>nodos vecinos</em>; acceso al medio (MAC) y detección de errores.<br>
          <strong>Unidad:</strong> Trama · <strong>Dispositivo:</strong> switch, placa de red (NIC).<br>
          <strong>Protocolos:</strong> Ethernet, Wi-Fi, ARP, PPP.
        </div>
        <div class="layer-block">
          <div class="lh">1 · Física</div>
          <strong>Función:</strong> transmite los bits "crudos" por el medio (codificación, señales, voltajes).<br>
          <strong>Unidad:</strong> Bits · <strong>Dispositivo:</strong> cable, fibra, hub, repetidor.<br>
          <strong>Protocolos:</strong> medios y normas físicas (UTP, fibra óptica, RJ-45).
        </div>
        <div class="tip">Truco para memorizar (de arriba abajo): <em>Mensaje → Segmento → Datagrama → Trama → Bits</em>.</div>` }
    ]
  },

  /* ====================== CAPA DE TRANSPORTE ====================== */
  transporte: {
    id: "transporte",
    title: "Capa de Transporte",
    short: "Transporte",
    color: "#4a2a7a",
    color2: "#6d4ca8",
    cards: [
      { tag: "Transporte · 1",
        q: "¿Qué hace la capa de transporte y cuál es su PDU?",
        a: `Da <strong>comunicación lógica proceso a proceso</strong>: conecta las aplicaciones de dos hosts como si estuvieran enlazadas directamente. Es la <strong>capa 4</strong> y su PDU es el <strong>segmento</strong>. La capa de red conecta <em>hosts</em>; la de transporte conecta <em>procesos</em>.` },
      { tag: "Transporte · 2",
        q: "¿Qué son la multiplexación y la demultiplexación? ¿Qué rango tienen los puertos?",
        a: `<strong>Multiplexación</strong> (emisor): junta datos de varios sockets y les agrega una cabecera con el número de puerto.<br>
        <strong>Demultiplexación</strong> (receptor): usa los puertos para entregar cada segmento al socket correcto.<br>
        Los puertos son de <strong>16 bits → 0 a 65535</strong>.` },
      { tag: "Transporte · 3",
        q: "¿Qué identifica a un socket UDP y a uno TCP?",
        a: `<strong>Socket UDP:</strong> una <strong>tupla de 2</strong> → (IP destino, puerto destino).<br>
        <strong>Socket TCP:</strong> una <strong>tupla de 4</strong> → IP origen, puerto origen, IP destino, puerto destino. Por eso un servidor TCP atiende muchos clientes a la vez.` },
      { tag: "Transporte · 4",
        q: "Características de UDP, su cabecera y usos típicos.",
        a: `<strong>UDP</strong> es <em>sin conexión</em> y <em>best effort</em> (puede perder o desordenar). Cabecera mínima de <strong>8 bytes</strong> (puerto origen, puerto destino, longitud, checksum) y <em>sin control de congestión</em>.<br>
        <strong>Usos:</strong> DNS, streaming de audio/video, juegos en línea, VoIP, TFTP.` },
      { tag: "Transporte · 5",
        q: "Características de TCP.",
        a: `<ul>
          <li><strong>Orientado a conexión</strong> (3-way handshake).</li>
          <li><strong>Fiable y en orden</strong> (ACK, retransmisión, nº de secuencia).</li>
          <li><strong>Full-duplex</strong> y <strong>punto a punto</strong>.</li>
          <li>Con <strong>control de flujo</strong> y <strong>de congestión</strong>. Cabecera ~20 bytes.</li>
        </ul>` },
      { tag: "Transporte · 6",
        q: "En TCP, ¿qué cuenta el número de secuencia y qué indica el ACK?",
        a: `El <strong>número de secuencia</strong> cuenta <em>bytes</em> (es el nº del primer byte del segmento dentro del flujo).<br>
        El <strong>número de ACK</strong> indica el <strong>siguiente byte esperado</strong> y es <strong>acumulativo</strong> (confirma todo lo anterior).` },
      { tag: "Transporte · 7",
        q: "¿En qué consiste el saludo en 3 pasos (3-way handshake)?",
        a: `<div class="formula">1) Cliente → SYN (nº de secuencia inicial)
2) Servidor → SYN-ACK (reconoce y manda su nº inicial)
3) Cliente → ACK (ya puede llevar datos)</div>
        El cierre usa segmentos <strong>FIN</strong> + <strong>ACK</strong> en ambos sentidos.` },
      { tag: "Transporte · 8",
        q: "¿Qué mecanismos usa TCP para la transferencia fiable? ¿Qué dispara una retransmisión?",
        a: `Combina <strong>números de secuencia</strong>, <strong>ACK</strong>, <strong>temporizadores + retransmisión</strong> y <strong>checksum</strong> sobre el IP no fiable.<br>
        Retransmite por <strong>timeout</strong> o por <strong>3 ACK duplicados</strong> (retransmisión rápida, sin esperar al temporizador).` },
      { tag: "Transporte · 9",
        q: "Protocolos ARQ: parada y espera, ventana deslizante, Go-Back-N y repetición selectiva.",
        a: `<ul>
          <li><strong>Parada y espera:</strong> envía 1 trama y espera su ACK. Simple pero lento.</li>
          <li><strong>Ventana deslizante:</strong> envía varias tramas sin esperar ACK de cada una.</li>
          <li><strong>Go-Back-N:</strong> ante una pérdida retransmite ese paquete y todos los siguientes (receptor sin buffer).</li>
          <li><strong>Repetición selectiva:</strong> retransmite solo el paquete con error (receptor con buffer).</li>
        </ul>` },
      { tag: "Transporte · 10",
        q: "Diferencia entre control de flujo y control de congestión.",
        a: `<strong>Control de flujo:</strong> evita saturar al <em>receptor</em>; el receptor anuncia el espacio libre de su buffer en <strong>RcvWindow</strong>.<br>
        <strong>Control de congestión:</strong> evita saturar la <em>red</em>; el emisor ajusta <strong>cwnd</strong> con <strong>AIMD</strong> (+1 MSS por RTT, ÷2 al perder) y arranca con <em>slow start</em> (cwnd = 1 MSS, se duplica cada RTT).` },
      { tag: "Transporte · 11",
        q: "TCP vs UDP: resumen.",
        a: `<table class="layers">
          <tr><td class="cap">TCP</td><td>Con conexión · fiable y en orden · cabecera ~20 B · control de flujo y congestión · web, correo, FTP.</td></tr>
          <tr><td class="cap">UDP</td><td>Sin conexión · best effort · cabecera 8 B · sin control · DNS, streaming, juegos, VoIP.</td></tr>
        </table>` }
    ]
  },

  /* ================== CAPA DE RED Y DIRECCIONAMIENTO IP ================== */
  red: {
    id: "red",
    title: "Capa de Red y Direccionamiento IP",
    short: "Red e IP",
    color: "#1a5b6b",
    color2: "#2e8b9c",
    cards: [
      { tag: "Red · 1",
        q: "¿Qué hace la capa de red y cuál es su PDU?",
        a: `Lleva los datos del host origen al host destino <strong>atravesando muchas redes</strong>. Su PDU es el <strong>paquete</strong> (o <strong>datagrama</strong> IP). Se llama "Internet" en el modelo TCP/IP y "Red" (capa 3) en OSI.` },
      { tag: "Red · 2",
        q: "Diferencia entre reenvío (forwarding) y enrutamiento (routing).",
        a: `<strong>Reenvío:</strong> acción <em>local</em> de un router: mover el paquete de la interfaz de entrada a la de salida.<br>
        <strong>Enrutamiento:</strong> proceso de <em>extremo a extremo</em>: calcular la ruta completa. El algoritmo de enrutamiento llena la <strong>tabla de reenvío</strong>.` },
      { tag: "Red · 3",
        q: "¿Qué tipo de servicio da IP? ¿Qué hace el campo TTL?",
        a: `IP es <strong>no orientado a conexión</strong> y <strong>best effort</strong> (no garantiza entrega ni orden).<br>
        El <strong>TTL</strong> es el máximo de routers que puede atravesar: se <strong>resta 1 en cada router</strong> y si llega a <strong>0 el paquete se descarta</strong> (evita bucles infinitos).` },
      { tag: "Red · 4",
        q: "¿Qué es la MTU y la fragmentación?",
        a: `La <strong>MTU</strong> (Maximum Transmission Unit) es el tamaño máximo de trama de un enlace. Si un datagrama la supera, se <strong>fragmenta</strong> en partes más chicas; el <strong>reensamblado se hace solo en el host destino</strong>.` },
      { tag: "Red · 5",
        q: "Estructura de una dirección IPv4.",
        a: `<strong>32 bits = 4 octetos</strong> (4 grupos de 8 bits), en <strong>notación decimal punteada</strong>; cada octeto va de <strong>0 a 255</strong>.<div class="formula">192.168.1.23 = 11000000.10101000.00000001.00010111</div>
        Se divide en <strong>parte de red</strong> y <strong>parte de host</strong>.` },
      { tag: "Red · 6",
        q: "Clases A, B y C: rango del 1.er octeto, máscara por defecto y hosts.",
        a: `<table class="layers">
          <tr><td class="cap">A</td><td>0–127 · 255.0.0.0 (/8) · 16.777.214 hosts</td></tr>
          <tr><td class="cap">B</td><td>128–191 · 255.255.0.0 (/16) · 65.534 hosts</td></tr>
          <tr><td class="cap">C</td><td>192–223 · 255.255.255.0 (/24) · 254 hosts</td></tr>
        </table>
        (D = multicast 224–239, E = reservada 240–255.)` },
      { tag: "Red · 7",
        q: "Dirección de red vs dirección de broadcast. ¿Por qué se restan 2 hosts?",
        a: `<strong>Dirección de red:</strong> bits de host todos en <strong>0</strong> (la primera de la subred).<br>
        <strong>Broadcast:</strong> bits de host todos en <strong>1</strong> (la última).<br>
        Ninguna se asigna a equipos; por eso los hosts útiles son <strong>2<sup>h</sup> − 2</strong>.` },
      { tag: "Red · 8",
        q: "Direcciones especiales y rangos privados.",
        a: `<strong>Loopback:</strong> 127.0.0.1 (la propia máquina).<br>
        <strong>Privadas</strong> (no salen a Internet):
        <ul>
          <li>10.0.0.0 – 10.255.255.255</li>
          <li>172.16.0.0 – 172.31.255.255</li>
          <li>192.168.0.0 – 192.168.255.255</li>
        </ul>` },
      { tag: "Red · 9",
        q: "¿Qué es la máscara de subred y la notación CIDR?",
        a: `La <strong>máscara</strong> marca con <strong>1</strong> los bits de red y con <strong>0</strong> los de host.<br>
        En <strong>CIDR</strong> se escribe <em>a.b.c.d/x</em>, donde <strong>x</strong> = cantidad de bits de red (el prefijo). Ej.: /24 = 255.255.255.0.` },
      { tag: "Red · 10",
        q: "Fórmulas de subnetting y ejemplo: dividir una Clase C en 4 subredes.",
        a: `<strong>Subredes = 2<sup>n</sup></strong> (n bits prestados) · <strong>hosts útiles = 2<sup>h</sup> − 2</strong>.<br>
        Para 4 subredes se prestan 2 bits (2² = 4):
        <div class="formula">Máscara 255.255.255.192 (/26) · 62 hosts c/u · saltos de 64
.0 / .64 / .128 / .192</div>` },
      { tag: "Red · 11",
        q: "Una PC tiene 192.168.10.130/26. ¿A qué subred pertenece (red, rango, broadcast)?",
        a: `/26 → bloques de 64 (.0, .64, .128, .192). Como 128 ≤ 130 &lt; 192:
        <div class="formula">Red = 192.168.10.128
Hosts = .129 a .190
Broadcast = 192.168.10.191</div>` },
      { tag: "Red · 12",
        q: "¿Qué hacen ICMP, NAT y DHCP?",
        a: `<strong>ICMP:</strong> diagnóstico y errores; <em>ping</em> (eco) y <em>traceroute</em> (TTL creciente).<br>
        <strong>NAT/PAT:</strong> traduce muchas IP privadas a una sola IP pública del router (ahorra IPv4 y da seguridad).<br>
        <strong>DHCP:</strong> asigna la IP automáticamente (discover → offer → request → ACK) y entrega gateway, DNS y máscara.` },
      { tag: "Red · 13",
        q: "Protocolos de enrutamiento: RIP, OSPF y BGP.",
        a: `<table class="layers">
          <tr><td class="cap">RIP</td><td>Vector de distancias · métrica = nº de saltos (máx. 15).</td></tr>
          <tr><td class="cap">OSPF</td><td>Estado de enlace (Dijkstra) · coste configurable.</td></tr>
          <tr><td class="cap">BGP</td><td>Vector de ruta · enruta entre Sistemas Autónomos (políticas).</td></tr>
        </table>
        El <strong>default gateway</strong> es el router de primer salto cuando no hay ruta más específica.` },
      { tag: "Red · 14",
        q: "¿Por qué existe IPv6 y cómo es su dirección?",
        a: `Porque las direcciones IPv4 (32 bits, ~4.300 millones) se agotaron. <strong>IPv6 usa 128 bits</strong>, en 8 grupos hexadecimales. Se abrevia omitiendo ceros a la izquierda y usando <strong>::</strong> una sola vez. En IPv6 no hay broadcast (lo reemplaza multicast).` }
    ]
  },

  /* ===================== CAPA DE ENLACE DE DATOS ===================== */
  enlace: {
    id: "enlace",
    title: "Capa de Enlace de Datos",
    short: "Enlace",
    color: "#6b4a1a",
    color2: "#9c7a2e",
    cards: [
      { tag: "Enlace · 1",
        q: "¿Qué hace la capa de enlace y cuál es su PDU?",
        a: `Transfiere datos entre <strong>nodos vecinos</strong> (un salto, sobre un mismo enlace). Su PDU es la <strong>trama</strong>.<br>
        Servicios: entramado, acceso al medio (MAC), detección de errores y, opcionalmente, entrega fiable y control de flujo. Se implementa en la <strong>placa de red (NIC)</strong>.` },
      { tag: "Enlace · 2",
        q: "Dirección MAC vs dirección IP.",
        a: `<table class="layers">
          <tr><td class="cap">MAC</td><td>física · 48 bits (hex) · plana · grabada en la NIC · alcance <em>local</em> (un salto)</td></tr>
          <tr><td class="cap">IP</td><td>lógica · 32 bits · jerárquica · alcance <em>extremo a extremo</em></td></tr>
        </table>
        ARP traduce IP → MAC.` },
      { tag: "Enlace · 3",
        q: "¿Qué es ARP y cómo funciona?",
        a: `<strong>ARP</strong> traduce una IP a su MAC dentro de la misma LAN.<br>
        El host manda una <strong>solicitud en broadcast</strong> ("¿quién tiene la IP X?"), el dueño responde en <strong>unicast</strong> con su MAC y se guarda en la <strong>tabla ARP</strong>. Si el destino está en otra red, se resuelve la MAC del <strong>gateway</strong>.` },
      { tag: "Enlace · 4",
        q: "Las tres familias de protocolos de acceso al medio (MAC).",
        a: `<ul>
          <li><strong>Partición del canal:</strong> TDM (tiempo), FDM (frecuencia).</li>
          <li><strong>Acceso aleatorio:</strong> CSMA/CD (Ethernet), CSMA/CA (Wi-Fi).</li>
          <li><strong>Por turnos:</strong> paso de testigo (Token Ring).</li>
        </ul>` },
      { tag: "Enlace · 5",
        q: "¿Qué es CSMA/CD?",
        a: `El método de acceso de Ethernet en medio compartido: el nodo <strong>escucha</strong> el canal antes de transmitir (carrier sense); si detecta una <strong>colisión</strong> mientras envía, aborta y reintenta tras un tiempo aleatorio (backoff exponencial). Wi-Fi usa <strong>CSMA/CA</strong> (evita la colisión).` },
      { tag: "Enlace · 6",
        q: "Formato de la trama Ethernet.",
        a: `<div class="formula">Preámbulo · MAC destino · MAC origen · Tipo · Datos · CRC</div>
        El <strong>tipo</strong> indica el protocolo superior (IP); el <strong>CRC</strong> detecta errores (si falla, se descarta). Ethernet es <strong>sin conexión y no fiable</strong> (sin ACK).` },
      { tag: "Enlace · 7",
        q: "Hub vs switch vs router.",
        a: `<table class="layers">
          <tr><td class="cap">Hub</td><td>capa física · repite los bits a todos los puertos</td></tr>
          <tr><td class="cap">Switch</td><td>capa enlace · reenvía por <strong>MAC</strong> (autoaprende, full-duplex, sin colisiones)</td></tr>
          <tr><td class="cap">Router</td><td>capa red · reenvía por <strong>IP</strong> y elige rutas entre redes</td></tr>
        </table>` },
      { tag: "Enlace · 8",
        q: "¿Cómo arma un switch su tabla de conmutación?",
        a: `Por <strong>autoaprendizaje</strong>: observa la dirección <strong>MAC de origen</strong> de las tramas que llegan y anota en qué puerto está cada MAC. Luego, si conoce el puerto del destino, reenvía solo por ahí; si no lo conoce, difunde por todos menos el de entrada.` }
    ]
  },

  /* ================ MODELO DE CAPAS Y ENCAPSULAMIENTO ================ */
  capas: {
    id: "capas",
    title: "Modelo de Capas y Encapsulamiento",
    short: "Capas",
    color: "#1a6b4a",
    color2: "#2e9c6e",
    cards: [
      { tag: "Capas · 1",
        q: "Las 5 capas de la pila de Internet y su función.",
        a: `<ul>
          <li><strong>Aplicación:</strong> programas del usuario (web, correo).</li>
          <li><strong>Transporte:</strong> comunicación proceso a proceso (puertos); fiabilidad y control de flujo/congestión.</li>
          <li><strong>Red:</strong> direccionamiento lógico (IP) y enrutamiento entre redes.</li>
          <li><strong>Enlace:</strong> transferencia entre nodos vecinos (MAC, errores).</li>
          <li><strong>Física:</strong> transmite los bits por el medio.</li>
        </ul>` },
      { tag: "Capas · 2",
        q: "¿Cuál es la PDU (unidad de datos) de cada capa?",
        a: `<div class="formula">Mensaje → Segmento → Datagrama → Trama → Bits</div>
        Aplicación = <strong>mensaje</strong>, transporte = <strong>segmento</strong>, red = <strong>datagrama/paquete</strong>, enlace = <strong>trama</strong>, física = <strong>bits</strong>.` },
      { tag: "Capas · 3",
        q: "¿Qué es el encapsulamiento?",
        a: `Al <em>descender</em> por las capas, cada una <strong>agrega su propia cabecera</strong>: Mensaje → +transporte = Segmento → +red = Datagrama → +enlace = Trama → Bits.<br>
        En el receptor se hace al revés (<strong>desencapsulamiento</strong>): cada capa quita su cabecera.` },
      { tag: "Capas · 4",
        q: "¿Qué capas procesa cada dispositivo?",
        a: `<ul>
          <li><strong>Host</strong> (PC, servidor): las 5.</li>
          <li><strong>Router:</strong> red, enlace y física.</li>
          <li><strong>Switch</strong> de enlace: enlace y física.</li>
          <li><strong>Hub / repetidor:</strong> solo física.</li>
        </ul>` },
      { tag: "Capas · 5",
        q: "Clasificá por capa: HTTP, TCP, UDP, IP, ICMP, Ethernet, ARP, DNS, RIP.",
        a: `<table class="layers">
          <tr><td class="cap">Aplicación</td><td>HTTP, DNS, RIP (sobre UDP)</td></tr>
          <tr><td class="cap">Transporte</td><td>TCP, UDP</td></tr>
          <tr><td class="cap">Red</td><td>IP, ICMP</td></tr>
          <tr><td class="cap">Enlace</td><td>Ethernet, ARP</td></tr>
        </table>` },
      { tag: "Capas · 6",
        q: "¿Cuántas capas tienen TCP/IP, el modelo de estudio y OSI?",
        a: `<strong>TCP/IP "puro": 4</strong> (junta enlace y física en "acceso a la red").<br>
        <strong>Modelo de estudio (Kurose): 5.</strong><br>
        <strong>OSI: 7</strong> (agrega Sesión y Presentación).` },
      { tag: "Capas · 7",
        q: "Ventajas y desventaja de organizar la red en capas.",
        a: `<strong>Ventajas:</strong> simplifica el diseño, modularidad (cambiar una capa sin tocar las demás) y estandarización.<br>
        <strong>Desventaja:</strong> funciones duplicadas entre capas y sobrecarga por las cabeceras.` },
      { tag: "Capas · 8",
        q: "Las dos funciones principales de un router.",
        a: `<strong>Reenvío (forwarding):</strong> acción local — mira la IP destino y manda el paquete por el enlace de salida según su tabla.<br>
        <strong>Enrutamiento (routing):</strong> determina el camino completo origen→destino y arma las tablas (p. ej. con RIP).` },
      { tag: "Capas · 9",
        q: "¿Qué tipo de dirección usa cada capa para direccionar?",
        a: `<strong>Transporte:</strong> número de <strong>puerto</strong> (proceso). <strong>Red:</strong> dirección <strong>IP</strong> (host/red). <strong>Enlace:</strong> dirección <strong>MAC</strong> (nodo vecino).` },
      { tag: "Capas · 10",
        q: "¿En qué capa opera SSL/TLS?",
        a: `En la <strong>capa de aplicación</strong>: el desarrollador incorpora la biblioteca SSL y cifra los datos antes de entregarlos a TCP.` }
    ]
  },

  /* ========================= SEGURIDAD ========================= */
  seguridad: {
    id: "seguridad",
    title: "Seguridad en Redes",
    short: "Seguridad",
    color: "#7a1a2a",
    color2: "#a83a4a",
    cards: [
      { tag: "Seguridad · 1",
        q: "Diferencia entre virus, gusano y troyano.",
        a: `<strong>Virus:</strong> se adjunta a archivos/programas y se propaga al <em>ejecutarlos</em>.<br>
        <strong>Gusano:</strong> se propaga <em>solo</em> por la red, sin intervención del usuario, aprovechando vulnerabilidades.<br>
        <strong>Troyano:</strong> parece legítimo pero oculta código malicioso que se ejecuta al instalarlo.` },
      { tag: "Seguridad · 2",
        q: "¿Qué es una botnet y cómo se usa en un DDoS?",
        a: `Una <strong>botnet</strong> es una red de equipos infectados con malware, controlados remotamente por el atacante sin que el usuario lo sepa.<br>
        En un <strong>DDoS</strong> se usa esa botnet para enviar tráfico masivo a un servidor al mismo tiempo, saturándolo.` },
      { tag: "Seguridad · 3",
        q: "Diferencia entre DoS y DDoS.",
        a: `<strong>DoS</strong> (denegación de servicio): saturar los recursos de un servidor desde un solo origen.<br>
        <strong>DDoS</strong> (distribuida): el mismo ataque pero desde <strong>muchos orígenes a la vez</strong> (una botnet), mucho más difícil de frenar.` },
      { tag: "Seguridad · 4",
        q: "¿Qué es el packet sniffing?",
        a: `Un dispositivo en un medio compartido (Ethernet, Wi-Fi) pone su interfaz en <strong>modo promiscuo</strong> y "escucha" y copia todos los paquetes que pasan, incluso contraseñas no cifradas. Software de ejemplo: <strong>Wireshark</strong>.` },
      { tag: "Seguridad · 5",
        q: "¿Qué es el IP spoofing?",
        a: `Enviar paquetes con una <strong>dirección de origen falsa</strong> para suplantar a otro host o esconder al atacante.` },
      { tag: "Seguridad · 6",
        q: "Ataque man-in-the-middle: ¿qué daños puede causar?",
        a: `El atacante se ubica <em>en el medio</em> de dos partes e intercepta/reenvía los paquetes. Puede: interceptar datos, modificar mensajes, suplantar identidad, insertar información falsa, repetir mensajes (replay) o interrumpir la comunicación.` },
      { tag: "Seguridad · 7",
        q: "Defensas básicas en una red.",
        a: `<ul>
          <li><strong>Cifrado</strong> (SSL/TLS, HTTPS, WPA2) para confidencialidad e integridad.</li>
          <li><strong>Autenticación</strong> de los extremos.</li>
          <li><strong>Firewalls</strong> y filtrado de tráfico; detección de intrusiones.</li>
          <li>En el router hogareño: cambiar la contraseña por defecto y activar el cifrado Wi-Fi.</li>
        </ul>` },
      { tag: "Seguridad · 8",
        q: "¿Por qué Internet es insegura \"por diseño\"?",
        a: `Porque se diseñó pensando en un grupo de usuarios <em>mutuamente confiables</em>, sin contemplar la seguridad. Hoy las consideraciones de seguridad se agregan en todas las capas (cifrado, autenticación, firewalls).` }
    ]
  },

  /* ========================== REPASO ========================== */
  repaso: {
    id: "repaso",
    title: "Repaso de Teoría general",
    short: "Repaso · Teoría general",
    color: "#1a5b3a",
    color2: "#2e8b57",
    cards: [
      { tag: "Ej. 1",
        q: "¿A qué capa corresponde cada protocolo? POP3, IMAP, Token Ring, UDP, SMTP, FTP, Frame Relay, IP, ARP, ATM, DNS, HTTP, TCP, RIP, Ethernet, ICMP.",
        a: `<table class="layers">
          <tr><td class="cap">Aplicación</td><td><strong>POP3, IMAP, SMTP</strong> (correo) · <strong>FTP</strong> (archivos) · <strong>DNS</strong> (nombres) · <strong>HTTP</strong> (web) · <strong>RIP</strong> (enrutamiento, corre sobre UDP)</td></tr>
          <tr><td class="cap">Transporte</td><td><strong>TCP</strong> (fiable) · <strong>UDP</strong> (no fiable)</td></tr>
          <tr><td class="cap">Red</td><td><strong>IP</strong> (direccionamiento/enrutamiento) · <strong>ICMP</strong> (mensajes de control/errores)</td></tr>
          <tr><td class="cap">Enlace</td><td><strong>Ethernet, Token Ring</strong> (LAN) · <strong>Frame Relay, ATM</strong> (WAN) · <strong>ARP</strong> (IP↔MAC)</td></tr>
        </table>` },
      { tag: "Ej. 2",
        q: "Resumen de las funciones de las capas del modelo TCP/IP.",
        a: `El modelo TCP/IP organiza la comunicación en capas; cada una agrega su cabecera y ofrece un servicio a la capa superior (encapsulamiento).
        <ul>
          <li><strong>Aplicación:</strong> donde residen los programas del usuario (web, correo, FTP). Genera el <em>mensaje</em> y define el protocolo (HTTP, SMTP, DNS…).</li>
          <li><strong>Transporte:</strong> comunicación lógica <em>proceso a proceso</em>. Divide en <em>segmentos</em>, usa puertos. TCP da entrega fiable y control de flujo/congestión; UDP es rápido y sin garantías.</li>
          <li><strong>Red (Internet):</strong> mueve <em>datagramas</em> de origen a destino entre redes. Direccionamiento lógico (IP) y enrutamiento.</li>
          <li><strong>Enlace:</strong> transfiere <em>tramas</em> entre nodos vecinos, controla el acceso al medio y detecta errores (MAC, Ethernet).</li>
          <li><strong>Física:</strong> transmite los <em>bits</em> por el medio (cable, fibra, aire).</li>
        </ul>
        <em>Nota:</em> el modelo TCP/IP "puro" tiene 4 capas (junta enlace y física en "acceso a la red").` },
      { tag: "Capas · Detalle",
        q: "Detalle de las 5 capas: función, unidad de datos, protocolos y dispositivo.",
        a: `<div class="layer-block">
          <div class="lh">5 · Aplicación</div>
          <strong>Función:</strong> interfaz con el usuario; las apps generan e interpretan los datos.<br>
          <strong>Unidad (PDU):</strong> Mensaje · <strong>Dispositivo:</strong> host (PC, servidor).<br>
          <strong>Protocolos:</strong> HTTP, SMTP, FTP, DNS, POP3, IMAP, RIP.
        </div>
        <div class="layer-block">
          <div class="lh">4 · Transporte</div>
          <strong>Función:</strong> comunicación lógica <em>proceso a proceso</em> (puertos); fiabilidad, control de flujo y congestión.<br>
          <strong>Unidad:</strong> Segmento (TCP) / Datagrama (UDP) · <strong>Dispositivo:</strong> host.<br>
          <strong>Protocolos:</strong> TCP (fiable), UDP (rápido, sin garantías).
        </div>
        <div class="layer-block">
          <div class="lh">3 · Red</div>
          <strong>Función:</strong> lleva los datos de origen a destino entre redes; direccionamiento lógico (IP) y enrutamiento.<br>
          <strong>Unidad:</strong> Datagrama / paquete · <strong>Dispositivo:</strong> router.<br>
          <strong>Protocolos:</strong> IP, ICMP, RIP.
        </div>
        <div class="layer-block">
          <div class="lh">2 · Enlace</div>
          <strong>Función:</strong> transfiere datos entre <em>nodos vecinos</em>; acceso al medio (MAC) y detección de errores.<br>
          <strong>Unidad:</strong> Trama · <strong>Dispositivo:</strong> switch, placa de red (NIC).<br>
          <strong>Protocolos:</strong> Ethernet, Wi-Fi, ARP, PPP, Frame Relay, ATM.
        </div>
        <div class="layer-block">
          <div class="lh">1 · Física</div>
          <strong>Función:</strong> transmite los bits "crudos" por el medio (codificación, señales, voltajes).<br>
          <strong>Unidad:</strong> Bits · <strong>Dispositivo:</strong> cable, fibra, hub, repetidor.<br>
          <strong>Protocolos:</strong> medios y normas físicas (UTP, fibra óptica, RJ-45).
        </div>
        <div class="tip">Truco para memorizar (de arriba abajo): <em>Mensaje → Segmento → Datagrama → Trama → Bits</em>.</div>` },
      { tag: "Ej. 3 · a",
        q: "Ventajas de una red de conmutación de circuitos frente a una de conmutación de paquetes.",
        a: `<ul>
          <li><strong>Ancho de banda dedicado</strong> y reservado durante toda la conexión.</li>
          <li><strong>Retardo constante</strong> y predecible (sin colas).</li>
          <li><strong>Sin congestión ni pérdida</strong> de datos una vez establecido el circuito.</li>
          <li><strong>Calidad de servicio (QoS) garantizada</strong>, ideal para voz/tiempo real.</li>
        </ul>` },
      { tag: "Ej. 3 · b",
        q: "Desventajas de la multiplexación TDM frente a FDM en conmutación de circuitos.",
        a: `<strong>TDM</strong> divide el enlace en <em>intervalos de tiempo</em> (turnos); <strong>FDM</strong> en <em>bandas de frecuencia</em>. Desventajas de TDM:
        <ul>
          <li>Si el usuario no transmite en su turno, ese intervalo <strong>se desperdicia</strong>.</li>
          <li>Solo puede transmitir <strong>en su turno</strong>, no de forma continua → agrega <strong>retardo</strong>.</li>
          <li>Requiere <strong>sincronización temporal precisa</strong> entre emisor y receptor.</li>
        </ul>
        (En FDM cada usuario dispone de su banda <em>todo el tiempo</em>, sin esperar turno.)` },
      { tag: "Ej. 4",
        q: "Dos funciones principales de los routers.",
        a: `<ul>
          <li><strong>Reenvío (forwarding):</strong> al llegar un paquete, mira la IP de destino y lo envía por el enlace de salida correcto, según su tabla de reenvío. Acción <em>local y rápida</em>.</li>
          <li><strong>Enrutamiento (routing):</strong> determina el <em>camino completo</em> origen→destino, construyendo las tablas mediante algoritmos/protocolos de enrutamiento (p. ej. RIP).</li>
        </ul>` },
      { tag: "Ej. 5",
        q: "Las 4 causas que producen retardo en una red (retardo nodal).",
        a: `<ul>
          <li><strong>Procesamiento:</strong> tiempo del nodo en examinar la cabecera y decidir a dónde enviar (y verificar errores).</li>
          <li><strong>Cola (espera):</strong> tiempo en el buffer antes de transmitir; depende de la <em>congestión</em> (único variable).</li>
          <li><strong>Transmisión:</strong> tiempo en "empujar" los bits al enlace = <strong>L/R</strong> (largo del paquete / tasa).</li>
          <li><strong>Propagación:</strong> tiempo que viaja el bit por el medio = <strong>d/v</strong> (distancia / velocidad).</li>
        </ul>` },
      { tag: "Ej. 6",
        q: "¿Qué información usa un proceso para identificar a otro proceso que se ejecuta en otro host?",
        a: `Necesita dos datos:
        <ul>
          <li>La <strong>dirección IP</strong> del host de destino (identifica la máquina en la red).</li>
          <li>El <strong>número de puerto</strong> de destino (identifica el proceso dentro de ese host).</li>
        </ul>
        Ej.: servidor web → puerto <strong>80</strong> (HTTP); correo → puerto <strong>25</strong> (SMTP).` },
      { tag: "Ej. 7",
        q: "¿Por qué se dice que FTP envía la información de control \"fuera de banda\"?",
        a: `Porque FTP usa <strong>dos conexiones TCP separadas</strong>:
        <ul>
          <li><strong>Conexión de control</strong> (puerto 21): comandos, usuario y contraseña. Abierta toda la sesión.</li>
          <li><strong>Conexión de datos</strong> (puerto 20): el archivo que se transfiere.</li>
        </ul>
        Como el control viaja por una conexión <em>distinta</em> a la de los datos, va <strong>"fuera de banda"</strong>. (HTTP envía control y datos juntos: <em>"dentro de banda"</em>.)` },

      { tag: "Repaso · 1",
        q: "¿Qué es un protocolo? Da una definición.",
        a: `Un <strong>protocolo</strong> define el <em>formato</em> y el <em>orden</em> de los mensajes que se intercambian dos o más entidades que se comunican, además de las <strong>acciones</strong> que se toman al enviar o recibir un mensaje.<br>
        En pocas palabras: las <strong>reglas</strong> que permiten que dos dispositivos "se entiendan". Analogía: el saludo entre dos personas (hola → hola → pregunta).` },
      { tag: "Repaso · 2",
        q: "¿Diferencia entre retardo de transmisión y retardo de propagación?",
        a: `<strong>Transmisión (L/R):</strong> tiempo en <em>poner todos los bits del paquete</em> en el enlace. Depende del tamaño del paquete (L) y la tasa del enlace (R). <em>No</em> depende de la distancia.<br>
        <strong>Propagación (d/v):</strong> tiempo que tarda <em>un bit</em> en viajar de un extremo al otro. Depende de la distancia (d) y la velocidad del medio (v ≈ 2×10⁸ m/s). <em>No</em> depende del tamaño del paquete.` },
      { tag: "Repaso · 3",
        q: "¿Qué es la tasa de transferencia (throughput)? ¿Qué es el cuello de botella?",
        a: `El <strong>throughput</strong> es la cantidad de datos por segundo que se transfieren <em>realmente</em> entre origen y destino.<br>
        En una ruta de varios enlaces, el throughput lo limita el <strong>enlace más lento</strong> = <em>cuello de botella</em> (bottleneck).<br>
        Ej.: enlaces de 2 Mbps y 500 kbps en serie → throughput = <strong>500 kbps</strong>.` },
      { tag: "Repaso · 4",
        q: "¿Qué es el RTT (Round-Trip Time)?",
        a: `Es el <strong>tiempo de ida y vuelta</strong>: lo que tarda un paquete pequeño en viajar del cliente al servidor <em>y</em> regresar la respuesta.<br>
        Incluye retardos de propagación, de cola y de procesamiento. Se usa, por ejemplo, para estimar el tiempo de establecer una conexión TCP (el <em>handshake</em>) o cargar una página.` },
      { tag: "Repaso · 5",
        q: "¿Qué es el encapsulamiento de datos?",
        a: `Es el proceso por el cual, al <em>descender</em> por las capas, cada una <strong>agrega su propia cabecera</strong> al dato recibido de la capa superior:
        <ul>
          <li>Aplicación → <strong>Mensaje</strong></li>
          <li>Transporte → + cabecera = <strong>Segmento</strong></li>
          <li>Red → + cabecera = <strong>Datagrama</strong></li>
          <li>Enlace → + cabecera = <strong>Trama</strong></li>
        </ul>
        En el receptor se hace al revés (<em>desencapsulamiento</em>): cada capa quita su cabecera.` },
      { tag: "Repaso · 6",
        q: "¿Para qué sirve el DNS? ¿Cómo está organizado?",
        a: `El <strong>DNS</strong> (Domain Name System) traduce <strong>nombres</strong> de dominio (www.ejemplo.com) a <strong>direcciones IP</strong>.<br>
        Es una base de datos <strong>jerárquica y distribuida</strong> en muchos servidores:
        <ul>
          <li>Servidores <strong>raíz</strong>.</li>
          <li>Servidores <strong>TLD</strong> (.com, .org, .ar…).</li>
          <li>Servidores <strong>autoritativos</strong> (los de cada organización).</li>
        </ul>
        Usa <strong>UDP</strong> (puerto 53) para ser rápido.` },
      { tag: "Repaso · 7",
        q: "HTTP: ¿diferencia entre conexión persistente y no persistente?",
        a: `<strong>No persistente:</strong> se abre <em>una conexión TCP por cada objeto</em> (HTML, cada imagen…). Más lento: gasta un RTT extra y recursos por objeto.<br>
        <strong>Persistente:</strong> se reutiliza <em>la misma conexión TCP</em> para enviar varios objetos. Menos retardo y menos sobrecarga. Es el modo por defecto de HTTP/1.1.` },
      { tag: "Repaso · 8",
        q: "¿Qué es un socket?",
        a: `Es la <strong>interfaz</strong> (la "puerta") entre el proceso de aplicación y la capa de transporte.<br>
        La app <em>envía</em> y <em>recibe</em> mensajes a través de su socket; del otro lado, la red se encarga de transportarlos. El desarrollador controla todo del lado de la aplicación, pero poco del lado del transporte (solo elige TCP o UDP y algunos parámetros).` },
      { tag: "Repaso · 9",
        q: "¿Diferencia entre arquitectura cliente-servidor y P2P? Ventaja de cada una.",
        a: `<strong>Cliente-servidor:</strong> un servidor <em>siempre activo</em>, con IP fija, atiende a los clientes (que no se comunican entre sí). Ej.: web. Ventaja: control y gestión centralizados. Desventaja: el servidor puede saturarse (no escala fácil).<br>
        <strong>P2P:</strong> los <em>pares (hosts)</em> se comunican directamente, sin servidor central. Ej.: BitTorrent. Ventaja: <strong>autoescalable</strong> (cada par aporta recursos). Desventaja: más difícil de gestionar y asegurar.` },
      { tag: "Repaso · 10",
        q: "Correo electrónico: ¿para qué se usan SMTP, POP3 e IMAP?",
        a: `<ul>
          <li><strong>SMTP:</strong> <em>envía</em> el correo; entre servidores y del cliente al servidor de salida. Es de "empuje" (push).</li>
          <li><strong>POP3:</strong> el destinatario <em>descarga</em> los mensajes a su dispositivo (modo "bajar y borrar" o "bajar y mantener").</li>
          <li><strong>IMAP:</strong> el destinatario <em>accede y gestiona</em> los mensajes <em>en el servidor</em> (carpetas, sincroniza varios dispositivos).</li>
        </ul>
        SMTP es de envío; POP3 e IMAP son de acceso/recepción.` },
      { tag: "Repaso · 11",
        q: "¿Qué es la intensidad de tráfico (La/R)? ¿Cuándo se pierden paquetes?",
        a: `La <strong>intensidad de tráfico</strong> = <strong>La/R</strong>, donde L = tamaño del paquete, a = tasa de llegada de paquetes y R = tasa del enlace.<br>
        <ul>
          <li><strong>La/R ≈ 0:</strong> retardo de cola bajo.</li>
          <li><strong>La/R → 1:</strong> el retardo crece mucho.</li>
          <li><strong>La/R &gt; 1:</strong> llega más de lo que sale → la cola se llena y se <strong>pierden paquetes</strong> (el buffer es finito).</li>
        </ul>` },
      { tag: "Repaso · 12",
        q: "¿Ventajas y desventaja de organizar la red en capas?",
        a: `<strong>Ventajas:</strong>
        <ul>
          <li>Simplifica el diseño: cada capa resuelve <em>una parte</em> del problema.</li>
          <li>Modularidad: se puede <strong>cambiar una capa</strong> sin afectar a las demás.</li>
          <li>Facilita el mantenimiento y la estandarización.</li>
        </ul>
        <strong>Desventaja:</strong> puede haber <em>funciones duplicadas</em> entre capas (p. ej. control de errores) y algo de <em>sobrecarga</em> por las cabeceras.` },
      { tag: "Repaso · 13",
        q: "¿Diferencia entre medios de transmisión guiados y no guiados? Ejemplos.",
        a: `<strong>Guiados:</strong> las ondas viajan por un <em>medio físico sólido</em>. Ej.: par trenzado (UTP), cable coaxial, fibra óptica.<br>
        <strong>No guiados:</strong> las ondas se propagan por el <em>aire/espacio</em> (inalámbricos). Ej.: Wi-Fi, radio, microondas, satélite.` },
      { tag: "Repaso · 14",
        q: "¿Qué significa que un conmutador use \"almacenar y reenviar\" (store-and-forward)?",
        a: `El conmutador (router/switch) debe <strong>recibir el paquete completo</strong> antes de empezar a transmitirlo por el enlace de salida. No puede reenviar bit a bit a medida que llegan.<br>
        Por eso, en un enlace, el retardo de transmisión se suma en cada nodo: con N enlaces de tasa R y paquete L → retardo ≈ <strong>N·(L/R)</strong>.` },

      { tag: "Cálculo · 1",
        q: "Un paquete de 8.000 bits se envía por un enlace de 2 Mbps. ¿Cuál es el retardo de transmisión?",
        a: `<div class="formula">d_trans = L / R = 8.000 / 2.000.000 = 0,004 s</div>
        <strong>= 4 ms.</strong><br>
        Recordá: el retardo de transmisión <em>no</em> depende de la distancia, solo del tamaño (L) y la tasa (R).` },
      { tag: "Cálculo · 2",
        q: "Dos hosts están a 3.000 km. Velocidad de propagación = 2,5×10⁸ m/s. ¿Retardo de propagación?",
        a: `<div class="formula">d_prop = d / v = 3.000.000 m / 2,5×10⁸ = 0,012 s</div>
        <strong>= 12 ms.</strong><br>
        Pasá los km a metros (3.000 km = 3.000.000 m). No depende del tamaño del paquete.` },
      { tag: "Cálculo · 3",
        q: "Paquete L=1.000 bits, enlace R=1 Mbps, distancia 2.500 km, v=2,5×10⁸ m/s. Retardo extremo a extremo (sin cola ni procesamiento).",
        a: `<div class="formula">d_trans = 1.000 / 1.000.000 = 1 ms
d_prop = 2.500.000 / 2,5×10⁸ = 10 ms
Total = 1 + 10 = 11 ms</div>
        El retardo total es la <strong>suma</strong> de transmisión + propagación.` },
      { tag: "Cálculo · 4",
        q: "Un paquete de 4.000 bits atraviesa 3 enlaces de 2 Mbps (con 2 routers store-and-forward). Retardo total de transmisión.",
        a: `Con <strong>store-and-forward</strong>, cada nodo recibe el paquete completo antes de reenviar:
        <div class="formula">d = N · (L/R) = 3 · (4.000 / 2.000.000)
d = 3 · 2 ms = 6 ms</div>
        N = cantidad de <strong>enlaces</strong> (no de routers).` },
      { tag: "Cálculo · 5",
        q: "Tres enlaces en serie: 10 Mbps, 2 Mbps y 5 Mbps. Se baja un archivo de 5 MB. ¿Throughput y tiempo?",
        a: `<div class="formula">Throughput = mín(10, 2, 5) = 2 Mbps  (cuello de botella)
5 MB = 5 × 8 = 40 Mbit = 40.000.000 bits
t = 40.000.000 / 2.000.000 = 20 s</div>
        Ojo: <strong>1 byte = 8 bits</strong>, por eso 5 MB = 40 Mbit.` },
      { tag: "Cálculo · 6",
        q: "Enlace compartido. Cada usuario transmite el 10% del tiempo (p = 0,1). Hay 3 usuarios. ¿Probabilidad de que los 3 transmitan a la vez?",
        a: `Como son independientes, se multiplican:
        <div class="formula">P = p³ = 0,1 × 0,1 × 0,1 = 0,001</div>
        Es decir, <strong>0,1%</strong>. Por eso la multiplexación estadística (paquetes) aprovecha mejor el enlace: rara vez todos transmiten juntos.` },
      { tag: "Cálculo · 7",
        q: "Enlace de 10 Mbps. Cada usuario necesita 1 Mbps cuando transmite. ¿Cuántos usuarios soporta con conmutación de circuitos?",
        a: `<div class="formula">N = R_enlace / R_usuario = 10 Mbps / 1 Mbps = 10 usuarios</div>
        En circuitos cada usuario tiene su ancho de banda <strong>reservado</strong>, así que el máximo es fijo (10), transmitan o no.` },
      { tag: "Cálculo · 8",
        q: "Paquetes de 1.000 bits llegan a razón de a=1.000 por segundo a un enlace de 1 Mbps. ¿Intensidad de tráfico? ¿Qué implica?",
        a: `<div class="formula">La/R = (1.000 × 1.000) / 1.000.000 = 1</div>
        <strong>La/R = 1</strong> → el enlace está al límite: el retardo de cola se dispara y, si sube un poco más, se <strong>pierden paquetes</strong>. (Ideal: La/R bien por debajo de 1.)` },
      { tag: "Cálculo · 9",
        q: "Una web tiene 1 HTML + 5 imágenes. Con RTT conocido, ¿cuántos RTT tarda con conexiones HTTP no persistentes (en serie) vs persistentes?",
        a: `<strong>No persistente:</strong> 2 RTT por objeto (1 para abrir TCP + 1 para pedir/recibir):
        <div class="formula">(1 + 5) × 2 = 12 RTT</div>
        <strong>Persistente:</strong> 1 conexión TCP y luego 1 RTT por objeto:
        <div class="formula">2 RTT (abrir + HTML) + 5 RTT (imágenes) = 7 RTT</div>
        (Más los tiempos de transmisión, que acá se desprecian.)` }
    ]
  }

};

/* Exponer al sistema de la SPA (sección Flashcards) y conservar compatibilidad. */
window.APP_DATA = window.APP_DATA || {};
window.APP_DATA.decks = DECKS;

if (typeof module !== "undefined") { module.exports = DECKS; }
