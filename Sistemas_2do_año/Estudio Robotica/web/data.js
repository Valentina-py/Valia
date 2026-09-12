window.COURSE_DATA = {
  slug: "robotica-automatizacion",
  title: "Robótica y Automatización",
  shortTitle: "Robótica",
  meta: "Arduino y control · 2.º año · 2026",
  mark: "IO",
  kicker: "Valía · Sistemas · Segundo año",
  subtitle: "Sistemas automatizados, sensores y actuadores, programación de Arduino, control por estados y prácticas de laboratorio.",
  accent: "#EA580C",
  accent2: "#DC2626",
  updated: "11/09/2026",
  coverage: "Integra la Unidad 1 de automatización, el apunte de introducción a Arduino, el TP 1 y el Laboratorio 1. El material de clase queda registrado como apoyo visual.",
  units: [
    {
      id: "automatizacion",
      glyph: "01",
      title: "Automatización y sistemas",
      desc: "Automatización, mecanización, robótica y representación en bloques de un proceso.",
      html: `
        <p class="lead">Un sistema automatizado ejecuta una secuencia o toma decisiones con intervención humana reducida. No es lo mismo que <strong>mecanizar</strong>: una máquina puede aportar fuerza y seguir dependiendo por completo del operador.</p>
        <h2>Conceptos relacionados</h2>
        <div class="table-wrap"><table><thead><tr><th>Concepto</th><th>Idea central</th><th>Ejemplo</th></tr></thead><tbody><tr><td>Mecanización</td><td>La máquina facilita el trabajo; la persona controla la operación.</td><td>Taladro manual.</td></tr><tr><td>Automatización</td><td>El sistema sigue reglas usando entradas y control.</td><td>Tanque con llenado automático.</td></tr><tr><td>Robótica</td><td>Integra estructura, sensores, actuadores y programa para interactuar.</td><td>Brazo clasificador.</td></tr><tr><td>Domótica</td><td>Automatiza servicios de una vivienda.</td><td>Iluminación por presencia.</td></tr></tbody></table></div>
        <h2>Modelo de bloques</h2>
        <p><strong>Entradas</strong> → <strong>controlador</strong> → <strong>salidas</strong>. Los sensores informan sobre el entorno; el controlador aplica la lógica; los actuadores modifican el proceso. La realimentación devuelve el resultado medido para corregir la acción.</p>
        <div class="callout"><strong>Para describir un sistema.</strong> Definí objetivo, entradas, salidas, reglas, estados, perturbaciones y condiciones seguras.</div>`,
      quiz: [
        { q: "¿Qué distingue a la automatización de la mecanización?", opts: ["El color de la máquina", "La ejecución de reglas con menor intervención continua", "El uso obligatorio de Internet", "La ausencia total de energía"], a: 1, exp: "La automatización incorpora control para ejecutar decisiones o secuencias." },
        { q: "Un sensor pertenece normalmente a…", opts: ["las entradas", "las salidas", "la carcasa", "el código fuente"], a: 0, exp: "Mide una condición y entrega información al controlador." },
        { q: "¿Qué hace un actuador?", opts: ["Mide una variable", "Ejecuta una acción física", "Escribe el programa", "Guarda una contraseña"], a: 1, exp: "Motores, bombas y relés actúan sobre el proceso." }
      ],
      cards: [
        { q: "Automatización", a: "Uso de control para ejecutar tareas o decisiones con menor intervención continua." },
        { q: "Sensor", a: "Elemento de entrada que mide una condición del entorno o proceso." },
        { q: "Actuador", a: "Elemento de salida que produce una acción física." },
        { q: "Realimentación", a: "Medición del resultado que vuelve al controlador para ajustar la acción." }
      ]
    },
    {
      id: "placas-gpio",
      glyph: "02",
      title: "Arduino, ESP32 y GPIO",
      desc: "Microcontroladores, placas de desarrollo, alimentación y uso responsable de pines.",
      html: `
        <p class="lead">Una placa de desarrollo reúne un <strong>microcontrolador</strong>, conexiones, alimentación y componentes de apoyo para prototipar sistemas electrónicos.</p>
        <h2>Arduino y ESP32</h2>
        <p>Arduino ofrece placas y un entorno sencillo basado en C/C++. ESP32 incorpora un microcontrolador más potente y conectividad inalámbrica en muchas de sus variantes. El programa debe respetar el modelo y el mapa de pines de la placa usada.</p>
        <h2>GPIO</h2>
        <p>Los pines de propósito general pueden configurarse como entrada o salida. Algunos tienen funciones alternativas, límites eléctricos o estados especiales durante el arranque.</p>
        <ul><li>No conectes motores, bombas o cargas de potencia directamente a un GPIO.</li><li>Usá resistencias, transistores, relés o controladores según la carga.</li><li>Compartí masa cuando el circuito lo requiera.</li><li>Verificá tensión y corriente máximas en la documentación de la placa.</li><li>Desenergizá antes de cambiar el cableado.</li></ul>
        <div class="callout"><strong>Seguridad primero.</strong> El código correcto no compensa una conexión que excede los límites eléctricos.</div>`,
      quiz: [
        { q: "¿Qué significa GPIO?", opts: ["Entrada/salida de propósito general", "Programa gráfico integrado", "Protocolo global de Internet", "Generador de potencia"], a: 0, exp: "Son pines configurables para entrada o salida digital, entre otras funciones." },
        { q: "¿Debe conectarse un motor directamente a un pin?", opts: ["Sí, siempre", "No; necesita una etapa de potencia adecuada", "Solo con Wi‑Fi", "Solo si usa delay"], a: 1, exp: "El GPIO no está diseñado para alimentar una carga de potencia." },
        { q: "Antes de cablear una placa conviene…", opts: ["aumentar la tensión", "desenergizar y revisar el pinout", "borrar setup", "puentear todas las entradas"], a: 1, exp: "Evita cortocircuitos y conexiones en pines incorrectos." }
      ],
      cards: [
        { q: "Microcontrolador", a: "Circuito programable que integra procesador, memoria y periféricos." },
        { q: "GPIO", a: "Pin configurable de entrada o salida de propósito general." },
        { q: "Etapa de potencia", a: "Circuito que permite controlar cargas que un GPIO no puede alimentar." },
        { q: "Pinout", a: "Mapa de pines y funciones de una placa." }
      ]
    },
    {
      id: "programa-io",
      glyph: "03",
      title: "Programa, entradas y salidas",
      desc: "setup, loop, variables, pinMode, digitalRead, digitalWrite e INPUT_PULLUP.",
      html: `
        <p class="lead">En el entorno Arduino, <code>setup()</code> se ejecuta una vez al iniciar y <code>loop()</code> se repite mientras la placa esté encendida.</p>
        <pre><code>const int boton = 4;
const int led = 13;

void setup() {
  pinMode(boton, INPUT_PULLUP);
  pinMode(led, OUTPUT);
}

void loop() {
  bool pulsado = digitalRead(boton) == LOW;
  digitalWrite(led, pulsado ? HIGH : LOW);
}</code></pre>
        <h2>Entrada con resistencia interna</h2>
        <p><code>INPUT_PULLUP</code> activa una resistencia interna. La entrada queda normalmente en <code>HIGH</code> y pasa a <code>LOW</code> cuando el pulsador la conecta a masa; por eso la lógica parece invertida.</p>
        <h2>Rebote del pulsador</h2>
        <p>Los contactos mecánicos pueden alternar varias veces en pocos milisegundos. El <strong>antirrebote</strong> por software acepta un cambio solo después de que el valor permanezca estable durante un intervalo.</p>
        <div class="callout"><strong>Variables claras.</strong> Usá constantes para pines y nombres que expresen estados: <code>nivelAlto</code>, <code>bombaEncendida</code>, <code>alarmaActiva</code>.</div>`,
      quiz: [
        { q: "¿Cuántas veces se ejecuta setup normalmente?", opts: ["Una vez al inicio", "En cada lectura", "Nunca", "Solo al pulsar reset dos veces"], a: 0, exp: "setup inicializa el sistema; loop se repite." },
        { q: "Con INPUT_PULLUP, un pulsador conectado a masa se lee pulsado como…", opts: ["HIGH", "LOW", "OUTPUT", "NULL"], a: 1, exp: "La resistencia interna mantiene HIGH en reposo; al pulsar se conecta a GND." },
        { q: "¿Para qué sirve digitalWrite?", opts: ["Leer una entrada analógica", "Fijar HIGH o LOW en una salida digital", "Crear un pin físico", "Medir el tiempo"], a: 1, exp: "Controla el nivel lógico de un pin configurado como salida." }
      ],
      cards: [
        { q: "setup()", a: "Bloque de inicialización que se ejecuta una vez." },
        { q: "loop()", a: "Bloque que se repite continuamente." },
        { q: "INPUT_PULLUP", a: "Entrada con resistencia interna; en reposo suele leerse HIGH." },
        { q: "Antirrebote", a: "Técnica para evitar múltiples cambios falsos de un contacto mecánico." }
      ]
    },
    {
      id: "control-estados",
      glyph: "04",
      title: "Control, estados y tiempo",
      desc: "Condiciones, memoria de estado, detección de flancos y temporización con millis.",
      html: `
        <p class="lead">Un automatismo útil necesita recordar qué estaba ocurriendo. Una <strong>máquina de estados</strong> representa modos definidos y las condiciones que permiten pasar de uno a otro.</p>
        <h2>Ejemplo de tanque</h2>
        <p>Estados posibles: <strong>vacío</strong>, <strong>llenando</strong>, <strong>lleno</strong>, <strong>vaciando</strong> y <strong>alarma</strong>. Las entradas pueden ser sensores de nivel y pulsadores; las salidas, una bomba, una válvula y luces.</p>
        <h2>Nivel y flanco</h2>
        <ul><li><strong>Condición de nivel:</strong> se cumple mientras la entrada está activa.</li><li><strong>Flanco ascendente:</strong> detecta el paso de inactivo a activo.</li><li><strong>Flanco descendente:</strong> detecta el cambio contrario.</li></ul>
        <pre><code>bool actual = digitalRead(boton) == LOW;
bool flanco = actual && !anterior;
if (flanco) estado = !estado;
anterior = actual;</code></pre>
        <h2>Tiempo no bloqueante</h2>
        <p><code>delay()</code> detiene el programa. Con <code>millis()</code> se comprueba cuánto tiempo pasó mientras el ciclo continúa atendiendo entradas.</p>
        <pre><code>if (millis() - marca >= intervalo) {
  marca = millis();
  salida = !salida;
}</code></pre>`,
      quiz: [
        { q: "¿Qué representa una máquina de estados?", opts: ["Solo el cableado", "Modos y transiciones de un sistema", "El precio de la placa", "Una dirección IP"], a: 1, exp: "Permite organizar el comportamiento y recordar el modo actual." },
        { q: "Un flanco ascendente detecta…", opts: ["un valor activo permanente", "el cambio de inactivo a activo", "un cortocircuito", "el fin de setup"], a: 1, exp: "Compara la lectura actual con la anterior para detectar el cambio." },
        { q: "¿Qué ventaja ofrece millis frente a delay?", opts: ["Aumenta la tensión", "Permite temporizar sin detener toda la lógica", "Elimina sensores", "Compila sin placa"], a: 1, exp: "El loop sigue ejecutándose y puede atender otras tareas." }
      ],
      cards: [
        { q: "Estado", a: "Modo actual del sistema que determina qué acciones y transiciones son válidas." },
        { q: "Transición", a: "Cambio de un estado a otro al cumplirse una condición." },
        { q: "Flanco", a: "Instante en que una señal cambia de un nivel al otro." },
        { q: "millis()", a: "Tiempo transcurrido desde el arranque, útil para temporización no bloqueante." }
      ]
    },
    {
      id: "seguridad-pruebas",
      glyph: "05",
      title: "Seguridad y puesta a prueba",
      desc: "Interbloqueos, estados seguros, fallas de sensor y validación gradual.",
      html: `
        <p class="lead">Un sistema de control debe definir qué ocurre cuando una lectura es imposible, una comunicación falla o dos órdenes se contradicen.</p>
        <h2>Principios prácticos</h2>
        <ul><li><strong>Estado seguro:</strong> ante una falla, apagar o colocar las salidas en la condición menos peligrosa.</li><li><strong>Interbloqueo:</strong> impedir acciones incompatibles, como llenar y vaciar simultáneamente.</li><li><strong>Tiempo máximo:</strong> detener una acción que no alcanza su objetivo dentro del intervalo esperado.</li><li><strong>Validación:</strong> detectar combinaciones imposibles de sensores.</li><li><strong>Arranque controlado:</strong> inicializar salidas antes de habilitar el proceso.</li></ul>
        <h2>Prueba incremental</h2>
        <ol><li>Revisá el esquema sin energía.</li><li>Probá una entrada y observá su lectura.</li><li>Probá una salida de baja potencia.</li><li>Verificá cada transición de estado.</li><li>Simulá fallas y comprobá el estado seguro.</li><li>Recién entonces conectá la etapa de potencia definitiva.</li></ol>
        <div class="callout"><strong>Documentá.</strong> Una tabla entrada–estado–salida y un diagrama de transiciones permiten detectar contradicciones antes de cablear.</div>`,
      quiz: [
        { q: "¿Qué evita un interbloqueo?", opts: ["Acciones incompatibles simultáneas", "El uso de sensores", "La compilación", "El registro de estados"], a: 0, exp: "Bloquea combinaciones peligrosas o contradictorias." },
        { q: "Si dos sensores de nivel informan una combinación imposible, conviene…", opts: ["ignorarla siempre", "entrar en un estado seguro y señalar la falla", "activar todas las salidas", "subir la tensión"], a: 1, exp: "La falla debe tratarse explícitamente." },
        { q: "¿Cuál es un buen orden de prueba?", opts: ["Potencia completa primero", "Entradas y salidas por separado, luego estados", "Sin revisar conexiones", "Solo probar el caso ideal"], a: 1, exp: "La validación incremental reduce el riesgo y facilita encontrar errores." }
      ],
      cards: [
        { q: "Estado seguro", a: "Condición prevista para minimizar el riesgo ante una falla." },
        { q: "Interbloqueo", a: "Regla que impide acciones incompatibles." },
        { q: "Timeout", a: "Límite temporal tras el cual una operación se considera fallida." },
        { q: "Prueba incremental", a: "Validación del sistema por partes antes de integrar potencia y lógica completa." }
      ]
    }
  ],
  practices: [
    {
      id: "tp1",
      unit: "automatizacion",
      title: "TP 1 · Modelado de un proceso",
      desc: "Análisis de un sistema automatizado desde el objetivo hasta las condiciones de seguridad.",
      exercises: [
        { q: "Elegí un proceso cotidiano que pueda automatizarse y definí su objetivo.", sol: "Escribí un resultado observable, por ejemplo mantener el nivel de un tanque entre dos límites, no simplemente “automatizar el tanque”." },
        { q: "Identificá entradas, controlador y salidas del proceso.", sol: "Separá sensores y órdenes del usuario, la lógica de control y los actuadores. Indicá también alimentación e interfaz si aportan al modelo." },
        { q: "Describí la secuencia normal de funcionamiento.", sol: "Numerá los pasos y expresá cada decisión como condición. Evitá frases ambiguas como “cuando haga falta”." },
        { q: "Definí estados y transiciones.", sol: "Dale un nombre a cada modo estable y escribí qué evento permite salir de él. Incluí el estado inicial." },
        { q: "Agregá al menos tres situaciones de falla y su respuesta segura.", sol: "Podés considerar sensor incoherente, operación demasiado larga, pérdida de energía o dos órdenes incompatibles." }
      ]
    },
    {
      id: "laboratorio1",
      unit: "control-estados",
      title: "Laboratorio 1 · Control de tanque",
      desc: "Diseño, programación y prueba de un tanque con sensores y actuadores.",
      exercises: [
        { q: "Dibujá el diagrama de bloques y el esquema lógico del tanque.", sol: "Incluí sensores de nivel como entradas, placa como controlador y bomba/válvula/indicadores como salidas. Marcá qué señales son activas en HIGH o LOW." },
        { q: "Prepará una tabla con todas las combinaciones válidas de sensores.", sol: "Para cada combinación indicá nivel interpretado, estado esperado y salidas. Señalá como falla las combinaciones físicamente imposibles." },
        { q: "Programá el llenado automático con corte por nivel alto.", sol: "Inicializá las salidas apagadas. Activá la bomba solo si corresponde y desactivala inmediatamente al detectar nivel alto o una falla." },
        { q: "Incorporá vaciado sin permitir llenar y vaciar a la vez.", sol: "Usá un interbloqueo en la lógica de salidas o estados excluyentes. La prioridad de parada y alarma debe estar por encima de las órdenes normales." },
        { q: "Agregá detección de flanco y antirrebote a un pulsador de marcha/parada.", sol: "Guardá la lectura anterior, aceptá el cambio estable tras un intervalo y conmutá el estado solo ante el flanco elegido." },
        { q: "Definí y probá el timeout de llenado.", sol: "Guardá <code>millis()</code> al iniciar. Si supera el máximo sin alcanzar nivel alto, apagá la bomba, pasá a alarma y exigí una acción de recuperación." }
      ]
    }
  ],
  sources: [
    { title: "Unidad 1 · Robótica y Automatización", note: "Conceptos, sistemas y bloques funcionales" },
    { title: "Introducción a Arduino", note: "Placas, GPIO, estructura de programa, E/S, estados y tiempo" },
    { title: "Trabajo Práctico N.º 1", note: "Modelado de un proceso automatizado" },
    { title: "Laboratorio N.º 1 y material de clase", note: "Control de tanque y apoyo visual" }
  ]
};

window.COURSE_TOOL = {
  title: "Simulador lógico de tanque",
  desc: "Cambiá los sensores y el modo para comprobar salidas, interbloqueos y fallas.",
  mount(root) {
    root.innerHTML = `
      <div class="form-grid">
        <div class="field"><label for="modeSelect">Orden</label><select id="modeSelect"><option value="auto">Automático</option><option value="llenar">Llenar</option><option value="vaciar">Vaciar</option><option value="parar">Parar</option></select></div>
        <label class="check-row"><input type="checkbox" id="lowSensor"> Sensor de nivel bajo activo</label>
        <label class="check-row"><input type="checkbox" id="highSensor"> Sensor de nivel alto activo</label>
      </div>
      <div class="btn-row"><button class="btn btn--primary" id="runTank">Evaluar control</button></div>
      <div class="tool-result" id="tankResult">Elegí el estado de los sensores.</div>`;
    root.querySelector("#runTank").addEventListener("click", () => {
      const low = root.querySelector("#lowSensor").checked;
      const high = root.querySelector("#highSensor").checked;
      const mode = root.querySelector("#modeSelect").value;
      let state = "En espera", pump = false, valve = false, alarm = false;
      if (high && !low) {
        state = "Falla: combinación incoherente"; alarm = true;
      } else if (mode === "parar") {
        state = "Parada segura";
      } else if (mode === "vaciar") {
        state = low ? "Vaciando" : "Tanque vacío"; valve = low;
      } else if (mode === "llenar") {
        state = high ? "Tanque lleno" : "Llenando"; pump = !high;
      } else if (!low) {
        state = "Llenando desde nivel bajo"; pump = true;
      } else if (high) {
        state = "Tanque lleno";
      } else {
        state = "Nivel intermedio";
      }
      root.querySelector("#tankResult").innerHTML = `<strong>${state}</strong><br>Bomba: ${pump ? "encendida" : "apagada"} · Válvula: ${valve ? "abierta" : "cerrada"} · Alarma: ${alarm ? "activa" : "apagada"}`;
    });
  }
};
