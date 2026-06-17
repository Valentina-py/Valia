/* ============================================================
   LABORATORIOS — Cisco Packet Tracer
   Redes Informáticas y Comunicación · 2026
   Cada lab: { id, glyph, title, desc, intro, activities: [
     { name, objetivos:[], topologia, pasos:[], notas? } ] }
   ============================================================ */
window.APP_DATA = window.APP_DATA || {};
window.APP_DATA.labs = [

/* ============================ LAB 1 ============================ */
{
  id: "lab1",
  glyph: "⇄",
  title: "Laboratorio N° 1 · Red hogareña",
  desc: "Primeros pasos en Packet Tracer: armar una red simple y una red con router Linksys y DHCP.",
  intro: `Te familiarizás con la plataforma de simulación <strong>Packet Tracer</strong>, identificás los componentes de una topología simple y los clasificás según el modelo <strong>TCP/IP</strong>.`,
  activities: [
    {
      name: "Actividad 1 · Red simple hogareña",
      objetivos: [
        "Familiarizarse con la plataforma de simulación Packet Tracer.",
        "Identificar los componentes de una topología simple y clasificarlos según el modelo TCP/IP."
      ],
      topologia: `Una <strong>PC</strong> y un <strong>Servidor</strong> conectados por <strong>cable de cobre cruzado UTP</strong>. PC0: <span class="cmd">192.168.0.2</span> /24 · Servidor0: <span class="cmd">192.168.0.1</span> /24 · Red <span class="cmd">192.168.0.0/24</span>.`,
      pasos: [
        `En "Dispositivos Finales" arrastrar un <strong>Generic PC-PT</strong> y un <strong>Generic Server-PT</strong> al área de trabajo.`,
        `En "Conexiones" elegir "tipo de conexión automáticamente", hacer clic en la PC y luego en el Servidor (toma un cable cruzado UTP entre las FastEthernet).`,
        `Configurar IP en la PC: clic en el dispositivo → pestaña <strong>Escritorio</strong> → <strong>Configuración IP</strong> → ingresar IP y máscara del gráfico.`,
        `Hacer lo mismo en el Servidor con la otra dirección IP.`,
        `Identificar los componentes y asociarlos a una capa del modelo TCP/IP.`,
        `Probar conectividad desde la línea de comando de la PC0: <span class="cmd">ping 192.168.0.1</span>.`,
        `Probar un ping a una IP inexistente, p. ej. <span class="cmd">ping 192.168.0.5</span>, y observar la respuesta (Request timed out / Destino inalcanzable).`,
        `Probar la utilidad <strong>Agregar PDU simple</strong> desde la PC0 y desde el Servidor0 (similar al ping) en <strong>Modo Simulación</strong>.`,
        `Desde el navegador de la PC0, apuntar a la IP del Servidor Web configurado en Servidor0.`,
        `Cambiar la IP del Servidor0 por 192.168.1.1 /24 y volver a probar el ping: ahora <strong>falla</strong> porque quedan en redes distintas.`,
        `Cambiar el cable por uno <strong>directo</strong> y sacar conclusiones: entre dos equipos del mismo tipo (PC↔Servidor) el enlace correcto es el cruzado.`
      ],
      notas: `Un servidor web es un <strong>sistema terminal</strong>: procesa las 5 capas. El cable cruzado se usa entre dispositivos del mismo tipo (PC–PC, PC–Router, switch–switch).`
    },
    {
      name: "Actividad 2 · Red hogareña 2 (con router e Internet)",
      objetivos: [
        "Realizar una configuración TCP/IP básica en un ambiente hogareño o de oficina pequeña.",
        "Compartir una conexión a Internet (enlace ADSL o CableModem) mediante un router Linksys con DHCP."
      ],
      topologia: `Un <strong>Router Linksys</strong>, dos PCs cableadas, una PC inalámbrica (LAN interna) y un <strong>Servidor en la red externa</strong> (puerto Internet/WAN). LAN: <span class="cmd">192.168.0.0/24</span> · Red pública: <span class="cmd">11.0.0.0/8</span>.`,
      pasos: [
        `Configurar el Servidor0 con IP <span class="cmd">11.0.0.1</span> máscara <span class="cmd">255.0.0.0</span> (queda como servidor DHCP). Describir el rango de direcciones que asignará.`,
        `El Router0 tiene config inicial: la puerta <strong>WAN/Internet</strong> obtiene IP por DHCP y la <strong>LAN</strong> usa 192.168.0.1/24. Verificar las interfaces: ¿qué IP tomó el puerto Internet?`,
        `Modificar el router asignando una IP <strong>estática</strong> del rango de la red externa.`,
        `Verificar la configuración dinámica de la PC2 inalámbrica: ¿qué valores se asignaron?`,
        `Configurar la PC0 para que tome valores por <strong>DHCP</strong> (Solapa Config o Escritorio).`,
        `Configurar la PC1 manualmente: IP <span class="cmd">192.168.0.3</span> máscara <span class="cmd">255.255.255.0</span>.`,
        `Probar ping en la red local: de PC0 a PC1, PC2 y Router, y desde las otras PCs.`,
        `Probar ping desde cada PC de la LAN al Servidor0. ¿Hay algún problema? Describirlo.`,
        `¿Cuál es la diferencia de configuración entre PC0 y PC1? Corregir la PC1 (le falta puerta de enlace/DNS) y volver a probar.`,
        `Modificar el rango de direcciones del servidor DHCP del Router y verificar con PC0 y PC2.`,
        `Probar conectividad del Servidor0 a las PCs de la LAN y sacar conclusiones (el NAT del router oculta la LAN).`,
        `¿Por qué en la "Solapa Física" del Router aparecen 5 puertos y en config aparecen Internet, LAN e Inalámbrico?`,
        `Investigar qué características de seguridad ofrece el router Linksys.`,
        `Analizar la salida del comando <span class="cmd">tracert</span> desde una PC interna al servidor.`
      ],
      notas: `Para forzar la actualización por DHCP, cambiar de DHCP a Estático y nuevamente a DHCP.`
    }
  ]
},

/* ============================ LAB 2 ============================ */
{
  id: "lab2",
  glyph: "@",
  title: "Laboratorio N° 2 · Capa de Aplicación",
  desc: "Protocolos de aplicación en Packet Tracer: HTTP, FTP, SMTP/POP3, DNS y TFTP, con análisis en modo simulación.",
  intro: `Configurás y analizás los principales <strong>protocolos de la capa de aplicación</strong> con clientes y servidores en Packet Tracer, observando los mensajes paso a paso en <strong>Modo Simulación</strong>.`,
  activities: [
    {
      name: "Actividad 1 · HTTP — Vista del usuario",
      objetivos: ["Realizar una sesión simple con un agente HTTP.", "Comprender la configuración básica del Servidor HTTP en Packet Tracer."],
      topologia: `PC y Servidor con cable UTP cruzado. Red <span class="cmd">192.168.0.0/24</span> (PC0 cliente HTTP, Servidor0 servidor HTTP en 192.168.0.1).`,
      pasos: [
        `En el navegador de la PC0 apuntar a <span class="cmd">http://192.168.0.1</span>.`,
        `La página principal se transfiere del servidor al cliente y se muestra en el navegador.`,
        `Recorrer los distintos enlaces que trae el servidor HTTP por defecto.`,
        `Modificar la página 3 (HTML) del Servidor0 para incluir una referencia a una segunda imagen.`,
        `Modificar las páginas usando distintos tags HTML soportados por Packet Tracer.`
      ],
      notas: `Si no se ven las imágenes referenciadas, copiar imágenes con esos nombres a la carpeta del proyecto (.pkt).`
    },
    {
      name: "Actividad 2 · HTTP — Análisis del protocolo",
      objetivos: ["Comprender la funcionalidad de HTTP a partir de una sesión web simple."],
      topologia: `Misma topología que la actividad anterior (PC0 ↔ Servidor0, 192.168.0.0/24).`,
      pasos: [
        `Pasar el simulador a <strong>Modo Simulación</strong> y limpiar la lista de eventos.`,
        `Configurar un filtro para ver solo <strong>HTTP y TCP</strong>.`,
        `En la PC0 apuntar a <span class="cmd">http://192.168.0.1</span> y avanzar con "Capturar/Reenviar".`,
        `Identificar los segmentos TCP del <strong>establecimiento</strong> de la conexión (handshake).`,
        `Identificar los paquetes HTTP (solicitud/respuesta) y analizar su contenido.`,
        `Identificar los segmentos TCP del <strong>cierre</strong> de la conexión.`,
        `Determinar si la sesión es <strong>persistente o no persistente</strong> y justificar.`,
        `Cambiar el filtro a solo HTTP y abrir la página "Image page" (dos imágenes); repetir el análisis.`,
        `Intentar generar una respuesta HTTP con código de estado <span class="cmd">404 Not Found</span>.`
      ]
    },
    {
      name: "Actividad 3 · FTP — Vista del usuario",
      objetivos: ["Usar un cliente FTP para transferir archivos a un servidor FTP."],
      topologia: `PC Cliente y PC/Servidor con cable cruzado UTP, TCP/IP configurado. Servidor FTP en <span class="cmd">10.0.0.1</span>.`,
      pasos: [
        `En la PC0 crear <span class="cmd">prueba.txt</span> con el Editor de texto del escritorio y guardarlo en el disco local.`,
        `Abrir una ventana de comandos y verificar el archivo con <span class="cmd">dir</span>.`,
        `Conectar al servidor: <span class="cmd">ftp 10.0.0.1</span>, usuario <span class="cmd">cisco</span>, clave <span class="cmd">cisco</span>.`,
        `Ver los comandos disponibles con <span class="cmd">ftp>help</span> y listar el servidor con <span class="cmd">ftp>dir</span>.`,
        `Subir el archivo: <span class="cmd">ftp>put prueba.txt</span> y volver a listar para confirmar.`,
        `Renombrar: <span class="cmd">ftp>rename prueba.txt pp.txt</span>.`,
        `Descargar: <span class="cmd">ftp>get pp.txt</span> y cerrar con <span class="cmd">ftp>quit</span>.`,
        `Verificar localmente con <span class="cmd">dir</span> que pp.txt se descargó.`,
        `En el Servidor0 (Config → Servicio FTP) definir un usuario nuevo (p. ej. test/test) con todos los permisos.`
      ],
      notas: `FTP usa dos conexiones TCP: control (21) y datos (20). Se ve reflejado en los comandos put/get.`
    },
    {
      name: "Actividad 4 · FTP — Usuario avanzado (backup IOS)",
      objetivos: ["Usar el cliente FTP de un router y un switch para respaldar la configuración / imagen IOS en un servidor FTP."],
      topologia: `Router, switch, servidor FTP y dos PCs. LAN del switch <span class="cmd">192.168.1.0/24</span>, enlace al servidor <span class="cmd">192.168.0.0/24</span>.`,
      pasos: [
        `En el Router0/Switch0 entrar a modo privilegio: <span class="cmd">enable</span> y luego <span class="cmd">copy run ftp</span>.`,
        `Ingresar la IP del servidor (o el dominio <span class="cmd">www.ftpserver.com</span>) y un nombre de archivo.`,
        `Verificar en el Servidor FTP (espacio Archivo) que la config se escribió.`,
        `Desde la PC0: <span class="cmd">ftp www.ftpserver.com</span>, usuario/clave cisco, y subir con <span class="cmd">put sampleFile.txt</span>.`,
        `Probar lectura/listado con <span class="cmd">get</span> y <span class="cmd">dir</span>, renombrar con <span class="cmd">rename</span> y borrar con <span class="cmd">delete</span>.`,
        `Salir con <span class="cmd">quit</span>.`
      ],
      notas: `Para autorizar el cliente FTP del router: <span class="cmd">conf t</span> → <span class="cmd">ip ftp username cisco</span> → <span class="cmd">ip ftp password cisco</span> → <span class="cmd">end</span>. El DNS resuelve www.ftpserver.com a 192.168.0.2.`
    },
    {
      name: "Actividad 5 · FTP — Análisis del protocolo",
      objetivos: ["Comprender FTP a partir de una sesión simple entre un cliente y un servidor FTP."],
      topologia: `PC Cliente y Servidor con cable cruzado UTP. Red <span class="cmd">10.0.0.0/8</span>.`,
      pasos: [
        `Pasar a <strong>Modo Simulación</strong>.`,
        `Conectar con <span class="cmd">ftp 10.0.0.1</span> (cisco/cisco) y avanzar con "Capturar/Reenviar".`,
        `Analizar los segmentos de la conexión TCP y los paquetes de autenticación FTP.`,
        `Descargar con <span class="cmd">ftp>get pp.txt</span> y analizar paso a paso los mensajes de la conexión de datos.`,
        `Cerrar con <span class="cmd">ftp>quit</span> y describir en una línea de tiempo los mensajes y su significado.`,
        `Repetir el análisis para los comandos <span class="cmd">dir</span> y <span class="cmd">put</span>.`
      ]
    },
    {
      name: "Actividad 6 · SMTP — Vista del usuario",
      objetivos: ["Configurar dos servidores de e-mail (SMTP) y dos clientes SMTP/POP3 para enviar y recibir correos."],
      topologia: `Dos Servidores y dos PCs vinculados por un switch. Red <span class="cmd">1.0.0.0/8</span>. Dominios <span class="cmd">correo.com</span> (1.1.1.1) y <span class="cmd">example.com</span> (1.1.1.2).`,
      pasos: [
        `En el Server (correo.com): Solapa EMAIL → dominio correo.com, usuario <span class="cmd">alicia</span> / clave alicia.`,
        `En ese servidor, Solapa DNS → dos registros tipo A: correo.com → 1.1.1.1 y example.com → 1.1.1.2.`,
        `En el Server (example.com): Solapa EMAIL → dominio example.com, usuario <span class="cmd">benito</span> / clave benito.`,
        `En la PC de alicia configurar el cliente de correo: alicia@correo.com, servidor entrante y saliente correo.com, usuario/clave alicia.`,
        `En la PC de benito: benito@example.com, servidores example.com, usuario/clave benito.`,
        `Desde una PC redactar y enviar un e-mail al usuario de la otra PC y viceversa; verificar la recepción.`
      ],
      notas: `El DNS se configuró de forma sencilla en ambos servidores para que funcionen los nombres de dominio del correo.`
    },
    {
      name: "Actividad 7 · SMTP — Análisis del protocolo",
      objetivos: ["Comprender SMTP y POP3 con dos servidores de distinto dominio."],
      topologia: `Igual a la Actividad 6 (dos servidores correo.com / example.com, dos PCs, switch, red 1.0.0.0/8).`,
      pasos: [
        `Pasar a <strong>Modo Simulación</strong> y filtrar solo <strong>TCP, SMTP y POP3</strong>.`,
        `Desde la PC de alicia, redactar y enviar un e-mail a benito@example.com.`,
        `Verificar: conexión TCP PC→servidor correo.com, entrega con <strong>SMTP</strong>, conexión TCP entre servidor correo.com y example.com, y entrega de correos pendientes.`,
        `Abrir el cliente de benito y ejecutar "recibir": verificar la conexión TCP y la recepción con <strong>POP3</strong>.`,
        `Repetir con dos correos para verificar la conexión persistente de SMTP.`
      ]
    },
    {
      name: "Actividad 8 · DNS — Vista del usuario",
      objetivos: ["Configurar el servicio DNS en un servidor central."],
      topologia: `Router Linksys con un servidor en la puerta WAN y tres PCs en la LAN interna. LAN <span class="cmd">192.168.0.0/24</span>, servidor <span class="cmd">10.0.0.1</span>.`,
      pasos: [
        `En el servidor (Config → DNS) cargar registros tipo <strong>A Record</strong>: server → 10.0.0.1, router → 192.168.0.1.`,
        `Si las PCs están en manual, agregarles la IP del servidor DNS.`,
        `En el DHCP del Router (GUI → Setup → Basic Setup → Static DNS1) especificar la IP del servidor DNS.`,
        `Probar <span class="cmd">ping</span> desde el command prompt usando los <strong>nombres</strong> asignados.`,
        `Probar HTTP y FTP desde los clientes usando nombres.`,
        `Si las PCs se autoconfiguran por DHCP, ¿qué problemas puede traer con DNS?`
      ],
      notas: `Este esquema de DNS central sirve en redes hogareñas o intranets de empresa, pero no en una red conectada a Internet real.`
    },
    {
      name: "Actividad 9 · TFTP — Vista del usuario",
      objetivos: ["Familiarizarse con TFTP.", "Copiar y restaurar una imagen IOS en un servidor TFTP."],
      topologia: `Servidor y router con cable cruzado UTP. Red <span class="cmd">10.0.0.0/8</span>, servidor TFTP en <span class="cmd">10.1.1.2</span>.`,
      pasos: [
        `En el Router0 (cliente TFTP) entrar a privilegio con <span class="cmd">enable</span> y ejecutar <span class="cmd">copy run tftp</span>.`,
        `Ingresar la IP del servidor TFTP (10.1.1.2).`,
        `Ingresar un nombre de archivo o aceptar el sugerido.`,
        `Verificar en TFTP_Server (Config → TFTP) que el archivo se escribió.`
      ],
      notas: `TFTP corre sobre UDP (sin conexión). Para restaurar el backup de la IOS: <span class="cmd">copy tftp run</span>.`
    },
    {
      name: "Actividad 10 · TFTP — Análisis del protocolo",
      objetivos: ["Comprender TFTP en una sesión de copia/restauración de una imagen IOS."],
      topologia: `Servidor TFTP y router con cable cruzado UTP. Red <span class="cmd">10.0.0.0/8</span>.`,
      pasos: [
        `Pasar a <strong>Modo Simulación</strong>.`,
        `Filtrar solo <strong>TFTP y UDP</strong>.`,
        `Ejecutar <span class="cmd">copy run tftp</span> en el router (IP 10.1.1.2 y nombre del archivo).`,
        `Analizar paso a paso los paquetes generados y notar que viajan sobre <strong>UDP</strong> (a diferencia de FTP, que usa TCP).`
      ]
    }
  ]
}

];
