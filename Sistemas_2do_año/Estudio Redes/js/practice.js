/* ============================================================
   PRÁCTICA — ejercicios con solución revelable
   Cálculos numéricos (retardos, throughput, probabilidad) y
   preguntas de teoría tipo parcial. Cada ejercicio: { q, sol }
   ============================================================ */
window.APP_DATA = window.APP_DATA || {};
window.APP_DATA.practica = [

  /* =================== EJERCICIOS DE CÁLCULO =================== */
  {
    id: "calculo", unit: "redes", glyph: "⇄",
    title: "Ejercicios de cálculo",
    desc: "Retardos, throughput y probabilidad, con la fórmula y el resultado paso a paso.",
    exercises: [
      {
        q: "<strong>1.</strong> Un paquete de 8.000 bits se envía por un enlace de 2 Mbps. ¿Cuál es el retardo de transmisión?",
        sol: `<div class="formula">d_trans = L / R = 8.000 / 2.000.000 = 0,004 s</div><strong>= 4 ms.</strong> El retardo de transmisión no depende de la distancia, solo de L y R.`
      },
      {
        q: "<strong>2.</strong> Dos hosts están a 3.000 km. Velocidad de propagación = 2,5×10⁸ m/s. ¿Retardo de propagación?",
        sol: `<div class="formula">d_prop = d / v = 3.000.000 m / 2,5×10⁸ = 0,012 s</div><strong>= 12 ms.</strong> Pasá los km a metros. No depende del tamaño del paquete.`
      },
      {
        q: "<strong>3.</strong> Paquete L=1.000 bits, enlace R=1 Mbps, distancia 2.500 km, v=2,5×10⁸ m/s. Retardo extremo a extremo (sin cola ni procesamiento).",
        sol: `<div class="formula">d_trans = 1.000 / 1.000.000 = 1 ms
d_prop = 2.500.000 / 2,5×10⁸ = 10 ms
Total = 1 + 10 = 11 ms</div>El total es la suma de transmisión + propagación.`
      },
      {
        q: "<strong>4.</strong> Un paquete de 4.000 bits atraviesa 3 enlaces de 2 Mbps (2 routers store-and-forward). Retardo total de transmisión.",
        sol: `Con store-and-forward, cada nodo recibe el paquete completo antes de reenviar:<div class="formula">d = N · (L/R) = 3 · (4.000 / 2.000.000) = 3 · 2 ms = 6 ms</div>N = cantidad de <strong>enlaces</strong> (no de routers).`
      },
      {
        q: "<strong>5.</strong> Tres enlaces en serie: 10 Mbps, 2 Mbps y 5 Mbps. Se baja un archivo de 5 MB. ¿Throughput y tiempo?",
        sol: `<div class="formula">Throughput = mín(10, 2, 5) = 2 Mbps  (cuello de botella)
5 MB = 5 × 8 = 40 Mbit = 40.000.000 bits
t = 40.000.000 / 2.000.000 = 20 s</div>Ojo: <strong>1 byte = 8 bits</strong>, por eso 5 MB = 40 Mbit.`
      },
      {
        q: "<strong>6.</strong> Enlace compartido. Cada usuario transmite el 10% del tiempo (p = 0,1). Hay 3 usuarios. ¿Probabilidad de que los 3 transmitan a la vez?",
        sol: `Como son independientes, se multiplican:<div class="formula">P = p³ = 0,1 × 0,1 × 0,1 = 0,001</div>Es decir, <strong>0,1%</strong>. Por eso la multiplexación estadística aprovecha mejor el enlace: rara vez todos transmiten juntos.`
      },
      {
        q: "<strong>7.</strong> Enlace de 10 Mbps. Cada usuario necesita 1 Mbps al transmitir. ¿Cuántos usuarios soporta con conmutación de circuitos?",
        sol: `<div class="formula">N = R_enlace / R_usuario = 10 / 1 = 10 usuarios</div>En circuitos cada usuario tiene su ancho de banda <strong>reservado</strong>, así que el máximo es fijo (10), transmitan o no.`
      },
      {
        q: "<strong>8.</strong> Paquetes de 1.000 bits llegan a razón de a=1.000 por segundo a un enlace de 1 Mbps. ¿Intensidad de tráfico? ¿Qué implica?",
        sol: `<div class="formula">La/R = (1.000 × 1.000) / 1.000.000 = 1</div><strong>La/R = 1</strong> → el enlace está al límite: el retardo de cola se dispara y, si sube un poco más, se <strong>pierden paquetes</strong>.`
      },
      {
        q: "<strong>9.</strong> Una web tiene 1 HTML + 5 imágenes. Con RTT conocido, ¿cuántos RTT tarda con HTTP no persistente (en serie) vs persistente?",
        sol: `<strong>No persistente:</strong> 2 RTT por objeto (abrir TCP + pedir/recibir):<div class="formula">(1 + 5) × 2 = 12 RTT</div><strong>Persistente:</strong> 1 conexión y luego 1 RTT por objeto:<div class="formula">2 RTT (abrir + HTML) + 5 RTT (imágenes) = 7 RTT</div>(Se desprecian los tiempos de transmisión.)`
      }
    ]
  },

  /* =================== PREGUNTAS TIPO PARCIAL =================== */
  {
    id: "parcial", unit: "capas", glyph: "≡",
    title: "Preguntas tipo parcial",
    desc: "Teoría que se suele tomar: capas, conmutación, router, retardos, puertos y FTP.",
    exercises: [
      {
        q: "<strong>1.</strong> Clasificá por capa: POP3, IMAP, Token Ring, UDP, SMTP, FTP, Frame Relay, IP, ARP, ATM, DNS, HTTP, TCP, RIP, Ethernet, ICMP.",
        sol: `<table class="layers">
          <tr><td class="cap">Aplicación</td><td>POP3, IMAP, SMTP, FTP, DNS, HTTP, RIP (sobre UDP)</td></tr>
          <tr><td class="cap">Transporte</td><td>TCP, UDP</td></tr>
          <tr><td class="cap">Red</td><td>IP, ICMP</td></tr>
          <tr><td class="cap">Enlace</td><td>Ethernet, Token Ring, Frame Relay, ATM, ARP</td></tr>
        </table>`
      },
      {
        q: "<strong>2.</strong> Resumí las funciones de las capas del modelo TCP/IP.",
        sol: `<strong>Aplicación:</strong> programas del usuario (genera el mensaje, define el protocolo). <strong>Transporte:</strong> proceso a proceso por puertos (TCP fiable / UDP rápido). <strong>Red:</strong> mueve datagramas entre redes (IP, enrutamiento). <strong>Enlace:</strong> tramas entre nodos vecinos (MAC, errores). <strong>Física:</strong> transmite los bits por el medio.`
      },
      {
        q: "<strong>3.</strong> Ventajas de la conmutación de circuitos frente a paquetes, y desventaja de TDM frente a FDM.",
        sol: `<strong>Circuitos:</strong> ancho de banda dedicado, retardo constante, sin congestión ni pérdidas, QoS garantizada.<br><strong>TDM</strong> divide en turnos de tiempo: si no transmitís en tu turno, ese intervalo se desperdicia y solo podés transmitir por turnos (agrega retardo). En <strong>FDM</strong> cada usuario tiene su banda todo el tiempo.`
      },
      {
        q: "<strong>4.</strong> ¿Cuáles son las dos funciones principales de un router?",
        sol: `<strong>Reenvío (forwarding):</strong> acción local — mira la IP de destino y manda el paquete por el enlace de salida según su tabla. <strong>Enrutamiento (routing):</strong> determina el camino completo origen→destino y arma las tablas (algoritmos como RIP).`
      },
      {
        q: "<strong>5.</strong> Nombrá las 4 causas que producen retardo nodal.",
        sol: `<strong>Procesamiento</strong> (examinar la cabecera), <strong>cola</strong> (espera por congestión — único variable), <strong>transmisión</strong> (L/R) y <strong>propagación</strong> (d/v).`
      },
      {
        q: "<strong>6.</strong> ¿Qué información usa un proceso para identificar a otro proceso en otro host?",
        sol: `La <strong>dirección IP</strong> del host de destino (la máquina) y el <strong>número de puerto</strong> de destino (el proceso). Ej.: web → 80, SMTP → 25, DNS → 53.`
      },
      {
        q: "<strong>7.</strong> ¿Por qué se dice que FTP envía la información de control \"fuera de banda\"?",
        sol: `Porque usa <strong>dos conexiones TCP</strong>: control (puerto 21, comandos y claves, abierta toda la sesión) y datos (puerto 20, el archivo). El control viaja por una conexión distinta a los datos. HTTP, en cambio, va "dentro de banda".`
      }
    ]
  },

  /* =================== SUBREDES Y DIRECCIONAMIENTO IP =================== */
  {
    id: "subredes", unit: "red", glyph: "⊕",
    title: "Ejercicios de subredes",
    desc: "Clases, máscaras, dirección de red y broadcast, y cálculo de subredes paso a paso.",
    exercises: [
      {
        q: "<strong>1.</strong> ¿A qué clase pertenece la IP <strong>200.45.20.15</strong>? Indicá su máscara por defecto y cuántos hosts admite.",
        sol: `El primer octeto es <strong>200</strong>, que cae entre 192 y 223 → <strong>Clase C</strong>.<div class="formula">Máscara por defecto = 255.255.255.0  (/24)
Hosts útiles = 2⁸ − 2 = 254</div>Se restan 2: la dirección de red (.0) y la de broadcast (.255).`
      },
      {
        q: "<strong>2.</strong> Dividí la red <strong>192.168.1.0/24</strong> en <strong>4 subredes</strong> iguales. Indicá la máscara, los hosts por subred y las 4 direcciones de red.",
        sol: `Para 4 subredes se prestan <strong>2 bits</strong> (2² = 4). Quedan 6 bits de host:<div class="formula">Máscara = 255.255.255.192  (/26)
Hosts por subred = 2⁶ − 2 = 62
Salto de bloque = 256 − 192 = 64</div>Direcciones de red: <strong>192.168.1.0 · .64 · .128 · .192</strong>.`
      },
      {
        q: "<strong>3.</strong> A una red Clase C le aplicás la máscara <strong>/27</strong> (255.255.255.224). ¿Cuántas subredes y cuántos hosts útiles por subred obtenés?",
        sol: `/27 toma <strong>3 bits</strong> del último octeto y deja 5 para host:<div class="formula">Subredes = 2³ = 8
Hosts útiles = 2⁵ − 2 = 30
Salto = 256 − 224 = 32</div>Las subredes empiezan en .0, .32, .64, .96, .128, .160, .192, .224.`
      },
      {
        q: "<strong>4.</strong> Una PC tiene IP <strong>192.168.10.130</strong> con máscara <strong>/26</strong>. ¿Cuál es la dirección de red, el broadcast y el rango de hosts de su subred?",
        sol: `/26 → bloques de 64 (.0, .64, .128, .192). Como <strong>128 ≤ 130 &lt; 192</strong>, la IP cae en el bloque que empieza en 128:<div class="formula">Dirección de red = 192.168.10.128
Rango de hosts = .129 a .190
Broadcast = 192.168.10.191</div>`
      },
      {
        q: "<strong>5.</strong> ¿Están <strong>192.168.1.10</strong> y <strong>192.168.1.200</strong> en la misma subred si la máscara es <strong>/25</strong> (255.255.255.128)?",
        sol: `/25 → bloques de 128. Hay dos subredes:<div class="formula">Subred A: .0 a .127   (red .0, broadcast .127)
Subred B: .128 a .255 (red .128, broadcast .255)</div><strong>No.</strong> .10 está en la subred A y .200 en la B → necesitan un <strong>router</strong> para comunicarse.`
      },
      {
        q: "<strong>6.</strong> Clasificá cada IP como <strong>pública o privada</strong>: 10.1.1.1 · 172.20.5.4 · 192.168.0.1 · 8.8.8.8.",
        sol: `<div class="formula">10.1.1.1     → privada (10.0.0.0/8)
172.20.5.4   → privada (172.16.0.0 a 172.31.255.255)
192.168.0.1  → privada (192.168.0.0/16)
8.8.8.8      → pública</div>Las privadas no salen a Internet directamente: necesitan <strong>NAT</strong>.`
      }
    ]
  }

];
