/* ============================================================
   CONTENIDO DE ESTUDIO — ELECTRÓNICA
   Basado en "Introducción al Análisis de Circuitos" (R. Boylestad, 12ª ed.)
   Unidades: Ley de Ohm · Resistencia · Serie · Paralelo · Serie-Paralelo ·
   Métodos de análisis · Teoremas · Capacitores · Inductores · Corriente alterna
   ============================================================ */
window.APP_DATA = {
  units: [

  /* ===================================================================
     UNIDAD 1 — LEY DE OHM, POTENCIA Y ENERGÍA
     =================================================================== */
  {
    id: "ohm",
    glyph: "Ω",
    title: "Ley de Ohm, Potencia y Energía",
    desc: "Voltaje, corriente y resistencia; la ley de Ohm, la potencia eléctrica, la energía y la eficiencia.",
    tool: "ohm",
    html: `
      <p class="lead">La <strong>ley de Ohm</strong> es la relación fundamental entre las tres magnitudes de un circuito: la <strong>corriente</strong> que circula, el <strong>voltaje</strong> aplicado y la <strong>resistencia</strong> que se opone al paso de carga.</p>

      <div class="callout def">
        <strong class="callout__tag">Magnitudes y unidades</strong>
        <ul style="margin:6px 0 0">
          <li><strong>Voltaje (tensión)</strong> \\(V\\) o \\(E\\): energía por unidad de carga. Se mide en <strong>voltios (V)</strong>.</li>
          <li><strong>Corriente</strong> \\(I\\): flujo de carga por unidad de tiempo \\(I=\\dfrac{Q}{t}\\). Se mide en <strong>amperios (A)</strong>.</li>
          <li><strong>Resistencia</strong> \\(R\\): oposición al paso de la corriente. Se mide en <strong>ohmios (Ω)</strong>.</li>
        </ul>
      </div>

      <h2>La ley de Ohm</h2>
      <p>La corriente es <strong>directamente proporcional</strong> al voltaje aplicado e <strong>inversamente proporcional</strong> a la resistencia:</p>
      <div class="formula-box">
        $$ I = \\frac{V}{R} \\qquad V = I\\cdot R \\qquad R = \\frac{V}{I} $$
      </div>
      <p>El truco del <strong>triángulo de Ohm</strong>: tapá la magnitud que buscás y leés la fórmula. Tapando \\(V\\) queda \\(I\\cdot R\\); tapando \\(I\\) queda \\(V/R\\); tapando \\(R\\) queda \\(V/I\\).</p>
      <div class="callout tip">
        <strong class="callout__tag">Calculadora</strong>
        Ingresá dos valores cualesquiera y obtené los otros dos en la <a href="#/tool/ohm">Calculadora de la ley de Ohm</a>.
      </div>

      <h3>Gráfica de la ley de Ohm</h3>
      <p>Si representamos \\(I\\) en función de \\(V\\), una resistencia fija da una <strong>recta</strong> que pasa por el origen. Su pendiente es \\(1/R\\): a mayor resistencia, menor pendiente (menos corriente para el mismo voltaje).</p>

      <h2>Potencia eléctrica</h2>
      <p>La <strong>potencia</strong> es la rapidez con que se entrega o se consume energía. Se mide en <strong>watts (W)</strong>:</p>
      <div class="formula-box">
        $$ P = \\frac{W}{t} = V\\cdot I = I^{2}\\cdot R = \\frac{V^{2}}{R} $$
      </div>
      <p>Las tres formas son equivalentes por la ley de Ohm. Usá la que tenga los datos disponibles. \\(1\\text{ W} = 1\\text{ V}\\cdot1\\text{ A}\\). En un resistor la potencia siempre se <strong>disipa</strong> como calor.</p>
      <div class="callout">
        <strong class="callout__tag">Caballos de fuerza</strong>
        En equipos motrices se usa el <em>horsepower</em>: \\(1\\ \\text{hp} = 746\\ \\text{W}\\).
      </div>

      <h2>Energía</h2>
      <p>La <strong>energía</strong> consumida es la potencia por el tiempo durante el cual se aplica:</p>
      <div class="formula-box">$$ W = P\\cdot t $$</div>
      <p>Si \\(P\\) está en watts y \\(t\\) en segundos, \\(W\\) sale en <strong>joules (J)</strong>. La compañía eléctrica factura en <strong>kilowatt-hora (kWh)</strong>:</p>
      <div class="formula-box">$$ W_{\\text{kWh}} = \\frac{P_{\\text{(W)}}\\cdot t_{\\text{(h)}}}{1000} $$</div>
      <p>Ejemplo: una plancha de \\(1500\\ \\text{W}\\) usada \\(2\\) horas consume \\(\\dfrac{1500\\cdot2}{1000}=3\\ \\text{kWh}\\).</p>

      <h2>Eficiencia</h2>
      <p>Ninguna máquina entrega toda la energía que recibe; parte se pierde (calor, fricción). La <strong>eficiencia</strong> \\(\\eta\\) relaciona la potencia de salida con la de entrada:</p>
      <div class="formula-box">
        $$ \\eta\\,(\\%) = \\frac{P_{\\text{salida}}}{P_{\\text{entrada}}}\\times 100 $$
      </div>
      <p>En sistemas encadenados, la eficiencia total es el <strong>producto</strong> de las eficiencias (en forma decimal): \\(\\eta_T=\\eta_1\\cdot\\eta_2\\cdot\\eta_3\\).</p>

      <h2>Protección: fusibles y disyuntores</h2>
      <p>Cuando la corriente supera un valor seguro, los dispositivos de protección abren el circuito:</p>
      <ul>
        <li><strong>Fusible:</strong> un hilo que se funde con el exceso de corriente (de un solo uso).</li>
        <li><strong>Disyuntor (interruptor térmico/magnético):</strong> se dispara y se puede rearmar.</li>
        <li><strong>GFCI (interruptor por falla a tierra):</strong> corta ante pequeñas fugas de corriente a tierra, protegiendo a las personas.</li>
      </ul>
    `,
    quiz: [
      { q: "Si \\(V = 12\\,\\text{V}\\) y \\(R = 4\\,\\Omega\\), la corriente es:",
        opts: ["\\(48\\,\\text{A}\\)", "\\(3\\,\\text{A}\\)", "\\(0{,}33\\,\\text{A}\\)", "\\(16\\,\\text{A}\\)"],
        a: 1, exp: "\\(I=V/R=12/4=3\\,\\text{A}\\)." },
      { q: "La ley de Ohm establece que la corriente es:",
        opts: ["Proporcional a \\(V\\) e inversamente a \\(R\\)", "Proporcional a \\(R\\)", "Proporcional a \\(V\\cdot R\\)", "Independiente de \\(V\\)"],
        a: 0, exp: "\\(I=V/R\\): aumenta con el voltaje y disminuye con la resistencia." },
      { q: "¿Cuál NO es una expresión válida de la potencia?",
        opts: ["\\(P=V\\cdot I\\)", "\\(P=I^2 R\\)", "\\(P=V^2/R\\)", "\\(P=V/I\\)"],
        a: 3, exp: "\\(V/I\\) es resistencia, no potencia. Las otras tres sí dan potencia." },
      { q: "Una resistencia de \\(10\\,\\Omega\\) conduce \\(2\\,\\text{A}\\). La potencia disipada es:",
        opts: ["\\(20\\,\\text{W}\\)", "\\(40\\,\\text{W}\\)", "\\(5\\,\\text{W}\\)", "\\(0{,}2\\,\\text{W}\\)"],
        a: 1, exp: "\\(P=I^2R=2^2\\cdot10=40\\,\\text{W}\\)." },
      { q: "El kilowatt-hora es una unidad de:",
        opts: ["Potencia", "Corriente", "Energía", "Voltaje"],
        a: 2, exp: "El kWh mide energía (potencia × tiempo)." },
      { q: "Si \\(R\\) se duplica y \\(V\\) se mantiene, la corriente:",
        opts: ["Se duplica", "Se reduce a la mitad", "No cambia", "Se cuadruplica"],
        a: 1, exp: "\\(I=V/R\\): al duplicar \\(R\\), la corriente cae a la mitad." },
      { q: "Un motor recibe \\(1000\\,\\text{W}\\) y entrega \\(750\\,\\text{W}\\). Su eficiencia es:",
        opts: ["133 %", "25 %", "75 %", "750 %"],
        a: 2, exp: "\\(\\eta=P_{sal}/P_{ent}=750/1000=75\\%\\)." },
      { q: "\\(1\\ \\text{hp}\\) equivale aproximadamente a:",
        opts: ["\\(100\\,\\text{W}\\)", "\\(746\\,\\text{W}\\)", "\\(1000\\,\\text{W}\\)", "\\(550\\,\\text{W}\\)"],
        a: 1, exp: "\\(1\\ \\text{hp}=746\\ \\text{W}\\)." },
      { q: "Una lámpara de \\(60\\,\\text{W}\\) encendida \\(5\\,\\text{h}\\) consume:",
        opts: ["\\(300\\,\\text{kWh}\\)", "\\(0{,}3\\,\\text{kWh}\\)", "\\(12\\,\\text{kWh}\\)", "\\(3\\,\\text{kWh}\\)"],
        a: 1, exp: "\\(W=\\dfrac{60\\cdot5}{1000}=0{,}3\\,\\text{kWh}\\)." },
      { q: "¿Qué dispositivo protege a las personas cortando ante fugas a tierra?",
        opts: ["Fusible común", "GFCI", "Resistor", "Voltímetro"],
        a: 1, exp: "El GFCI detecta pequeñas corrientes de fuga a tierra y abre el circuito." },
      { q: "Para hallar \\(R\\) conociendo \\(P\\) e \\(I\\) usamos:",
        opts: ["\\(R=P/I^2\\)", "\\(R=P\\cdot I\\)", "\\(R=I/P\\)", "\\(R=P\\cdot I^2\\)"],
        a: 0, exp: "De \\(P=I^2R\\) se despeja \\(R=P/I^2\\)." },
      { q: "Si duplico el voltaje sobre una resistencia fija, la potencia disipada:",
        opts: ["Se duplica", "Se cuadruplica", "No cambia", "Se reduce a la mitad"],
        a: 1, exp: "\\(P=V^2/R\\): al duplicar \\(V\\), \\(P\\) crece con el cuadrado (×4)." },
    ],
    cards: [
      { q: "Ley de Ohm (tres formas)", a: "\\(I=\\dfrac{V}{R}\\), \\(V=IR\\), \\(R=\\dfrac{V}{I}\\)." },
      { q: "Unidades de V, I y R", a: "Voltaje en voltios (V), corriente en amperios (A), resistencia en ohmios (Ω)." },
      { q: "Potencia eléctrica", a: "\\(P=VI=I^2R=\\dfrac{V^2}{R}\\), en watts (W)." },
      { q: "Energía", a: "\\(W=P\\cdot t\\). En joules (s) o kWh (horas)." },
      { q: "kWh", a: "\\(W_{kWh}=\\dfrac{P_{(W)}\\,t_{(h)}}{1000}\\)." },
      { q: "Eficiencia", a: "\\(\\eta=\\dfrac{P_{salida}}{P_{entrada}}\\times100\\%\\). En cadena se multiplican." },
      { q: "1 hp", a: "\\(1\\ \\text{hp}=746\\ \\text{W}\\)." },
      { q: "¿En un resistor la potencia se…?", a: "Se DISIPA como calor (no se almacena)." },
      { q: "GFCI vs fusible", a: "El fusible protege el circuito por sobrecorriente; el GFCI protege personas ante fugas a tierra." },
    ]
  },

  /* ===================================================================
     UNIDAD 2 — RESISTENCIA Y CÓDIGO DE COLORES
     =================================================================== */
  {
    id: "resistencia",
    glyph: "R",
    title: "Resistencia y Código de Colores",
    desc: "Resistividad, efecto de la temperatura, resistores fijos y variables, y el código de bandas de colores.",
    tool: "colores",
    html: `
      <p class="lead">La <strong>resistencia</strong> de un conductor depende del material, de su geometría y de la temperatura. Es la oposición que ofrece al paso de la corriente.</p>

      <h2>Resistencia de un conductor</h2>
      <div class="formula-box">$$ R = \\rho\\,\\frac{l}{A} $$</div>
      <p>donde \\(\\rho\\) es la <strong>resistividad</strong> del material, \\(l\\) la longitud y \\(A\\) la sección transversal. Conclusiones:</p>
      <ul>
        <li>A <strong>mayor longitud</strong>, mayor resistencia.</li>
        <li>A <strong>mayor sección</strong> (cable más grueso), menor resistencia.</li>
        <li>El cobre y la plata tienen baja \\(\\rho\\) → buenos conductores.</li>
      </ul>

      <h3>Efecto de la temperatura</h3>
      <p>En los <strong>metales</strong>, la resistencia <strong>aumenta</strong> con la temperatura (coeficiente positivo). En semiconductores y carbón ocurre lo contrario (coeficiente negativo). La conductancia \\(G=\\dfrac{1}{R}\\) se mide en <strong>siemens (S)</strong>.</p>

      <h2>Tipos de resistores</h2>
      <ul>
        <li><strong>Fijos:</strong> de película de carbón, de película metálica, de alambre devanado.</li>
        <li><strong>Variables:</strong> el <strong>potenciómetro</strong> (3 terminales) y el <strong>reóstato</strong> (2 terminales).</li>
        <li><strong>Dependientes:</strong> termistor (varía con la temperatura), fotorresistor o LDR (varía con la luz).</li>
      </ul>

      <h2>Código de colores (4 bandas)</h2>
      <p>Los resistores de película llevan bandas de colores que codifican su valor:</p>
      <ul>
        <li><strong>Banda 1:</strong> primer dígito.</li>
        <li><strong>Banda 2:</strong> segundo dígito.</li>
        <li><strong>Banda 3 (multiplicador):</strong> número de ceros (potencia de 10).</li>
        <li><strong>Banda 4 (tolerancia):</strong> oro ±5 %, plata ±10 %.</li>
      </ul>
      <div class="tbl-wrap">
      <table class="tbl">
        <thead><tr><th>Color</th><th>Dígito</th><th>Multiplicador</th></tr></thead>
        <tbody>
          <tr><td>Negro</td><td>0</td><td>×1</td></tr>
          <tr><td>Marrón</td><td>1</td><td>×10</td></tr>
          <tr><td>Rojo</td><td>2</td><td>×100</td></tr>
          <tr><td>Naranja</td><td>3</td><td>×1 k</td></tr>
          <tr><td>Amarillo</td><td>4</td><td>×10 k</td></tr>
          <tr><td>Verde</td><td>5</td><td>×100 k</td></tr>
          <tr><td>Azul</td><td>6</td><td>×1 M</td></tr>
          <tr><td>Violeta</td><td>7</td><td>×10 M</td></tr>
          <tr><td>Gris</td><td>8</td><td>—</td></tr>
          <tr><td>Blanco</td><td>9</td><td>—</td></tr>
        </tbody>
      </table>
      </div>
      <p>Regla mnemotécnica: «<em>Negro, Marrón, Rojo, Naranja, Amarillo, Verde, Azul, Violeta, Gris, Blanco</em>» = 0…9.</p>
      <div class="callout">
        <strong class="callout__tag">Ejemplo</strong>
        Bandas <em>marrón–negro–rojo–oro</em>: \\(1\\;0\\) y multiplicador \\(\\times100\\) → \\(1000\\,\\Omega = 1\\,\\text{k}\\Omega\\), tolerancia ±5 %.
      </div>
      <div class="callout tip">
        <strong class="callout__tag">Practicá</strong>
        Convertí bandas a valores (y al revés) en la <a href="#/tool/colores">Calculadora de código de colores</a> y jugá <a href="#/games/colorcode">Código de colores</a>.
      </div>

      <h2>Prefijos métricos</h2>
      <div class="tbl-wrap">
      <table class="tbl">
        <thead><tr><th>Prefijo</th><th>Símbolo</th><th>Factor</th></tr></thead>
        <tbody>
          <tr><td>mega</td><td>M</td><td>\\(10^{6}\\)</td></tr>
          <tr><td>kilo</td><td>k</td><td>\\(10^{3}\\)</td></tr>
          <tr><td>mili</td><td>m</td><td>\\(10^{-3}\\)</td></tr>
          <tr><td>micro</td><td>μ</td><td>\\(10^{-6}\\)</td></tr>
          <tr><td>nano</td><td>n</td><td>\\(10^{-9}\\)</td></tr>
          <tr><td>pico</td><td>p</td><td>\\(10^{-12}\\)</td></tr>
        </tbody>
      </table>
      </div>
    `,
    quiz: [
      { q: "La resistencia de un conductor \\(R=\\rho\\,l/A\\) aumenta si:",
        opts: ["Aumenta la sección", "Aumenta la longitud", "Disminuye la longitud", "Es de plata"],
        a: 1, exp: "A mayor longitud, mayor resistencia. La sección grande la reduce." },
      { q: "Bandas marrón–negro–rojo. El valor es:",
        opts: ["\\(10\\,\\Omega\\)", "\\(100\\,\\Omega\\)", "\\(1\\,\\text{k}\\Omega\\)", "\\(10\\,\\text{k}\\Omega\\)"],
        a: 2, exp: "1, 0 y ×100 → 1000 Ω = 1 kΩ." },
      { q: "El multiplicador del color naranja es:",
        opts: ["×100", "×1 k", "×10 k", "×10"],
        a: 1, exp: "Naranja = dígito 3 → multiplicador ×1000 (×1 k)." },
      { q: "La conductancia se mide en:",
        opts: ["Ohmios", "Siemens", "Watts", "Faradios"],
        a: 1, exp: "\\(G=1/R\\) se mide en siemens (S)." },
      { q: "En un metal, al subir la temperatura la resistencia:",
        opts: ["Aumenta", "Disminuye", "No cambia", "Se hace cero"],
        a: 0, exp: "Los metales tienen coeficiente de temperatura positivo: R aumenta." },
      { q: "Una banda de tolerancia dorada significa:",
        opts: ["±1 %", "±5 %", "±10 %", "±20 %"],
        a: 1, exp: "Oro = ±5 %, plata = ±10 %." },
      { q: "Un dispositivo de 3 terminales para variar resistencia es:",
        opts: ["Reóstato", "Termistor", "Potenciómetro", "Fusible"],
        a: 2, exp: "El potenciómetro tiene 3 terminales; el reóstato, 2." },
      { q: "El color del dígito 5 es:",
        opts: ["Amarillo", "Verde", "Azul", "Violeta"],
        a: 1, exp: "Negro0, Marrón1, Rojo2, Naranja3, Amarillo4, Verde5…" },
      { q: "\\(2{,}2\\,\\text{M}\\Omega\\) en ohmios es:",
        opts: ["\\(2200\\,\\Omega\\)", "\\(2{,}2\\times10^{6}\\,\\Omega\\)", "\\(2{,}2\\times10^{3}\\,\\Omega\\)", "\\(0{,}0000022\\,\\Omega\\)"],
        a: 1, exp: "M = \\(10^6\\) → \\(2{,}2\\times10^{6}\\,\\Omega\\)." },
      { q: "Un componente cuya resistencia baja al iluminarlo es un:",
        opts: ["Termistor", "LDR (fotorresistor)", "Reóstato", "Resistor de alambre"],
        a: 1, exp: "El LDR varía su resistencia con la luz." },
    ],
    cards: [
      { q: "Resistencia de un conductor", a: "\\(R=\\rho\\dfrac{l}{A}\\): aumenta con la longitud, baja con la sección." },
      { q: "Conductancia", a: "\\(G=\\dfrac{1}{R}\\), en siemens (S)." },
      { q: "Orden de colores 0–9", a: "Negro, Marrón, Rojo, Naranja, Amarillo, Verde, Azul, Violeta, Gris, Blanco." },
      { q: "Banda 3 (código)", a: "Es el multiplicador (cantidad de ceros / potencia de 10)." },
      { q: "Tolerancias", a: "Oro ±5 %, Plata ±10 %." },
      { q: "Potenciómetro vs reóstato", a: "Potenciómetro: 3 terminales. Reóstato: 2 terminales." },
      { q: "Temperatura en metales", a: "Coeficiente positivo: la resistencia aumenta con la temperatura." },
      { q: "Prefijos", a: "M=10⁶, k=10³, m=10⁻³, μ=10⁻⁶, n=10⁻⁹, p=10⁻¹²." },
    ]
  },

  /* ===================================================================
     UNIDAD 3 — CIRCUITOS EN SERIE
     =================================================================== */
  {
    id: "serie",
    glyph: "S",
    title: "Circuitos en Serie",
    desc: "Misma corriente, resistencia total, ley de tensiones de Kirchhoff (LVK) y divisor de tensión.",
    tool: "divisor",
    html: `
      <p class="lead">En un circuito <strong>en serie</strong> los elementos se conectan uno tras otro, formando un <strong>único camino</strong> para la corriente.</p>

      <div class="callout def">
        <strong class="callout__tag">Característica clave</strong>
        La <strong>corriente es la misma</strong> en todos los elementos en serie: \\(I_T=I_1=I_2=\\dots\\)
      </div>

      <h2>Resistencia total</h2>
      <p>Las resistencias en serie se <strong>suman</strong>:</p>
      <div class="formula-box">$$ R_T = R_1 + R_2 + R_3 + \\dots + R_N $$</div>
      <p>La corriente del circuito sale de la fuente por la ley de Ohm:</p>
      <div class="formula-box">$$ I_T = \\frac{E}{R_T} $$</div>

      <h2>Ley de tensiones de Kirchhoff (LVK)</h2>
      <div class="callout">
        <strong class="callout__tag">LVK</strong>
        La suma algebraica de las subidas y caídas de tensión alrededor de una malla cerrada es <strong>cero</strong>: \\(\\sum V = 0\\). Equivale a decir que la tensión de la fuente se reparte entre las resistencias:
        $$ E = V_1 + V_2 + V_3 + \\dots $$
      </div>
      <p>Cada caída se calcula con la ley de Ohm: \\(V_k=I\\cdot R_k\\). La resistencia más grande tiene la mayor caída de tensión.</p>

      <h2>Regla del divisor de tensión (RDT)</h2>
      <p>Permite hallar la tensión sobre cualquier resistencia <strong>sin calcular la corriente</strong>:</p>
      <div class="formula-box">$$ V_x = E\\cdot\\frac{R_x}{R_T} $$</div>
      <p>La tensión se reparte en <strong>proporción</strong> a cada resistencia. Ejemplo: con \\(E=20\\,\\text{V}\\), \\(R_1=2\\,\\Omega\\) y \\(R_2=8\\,\\Omega\\) (\\(R_T=10\\,\\Omega\\)):</p>
      <div class="formula-box">$$ V_2 = 20\\cdot\\frac{8}{10} = 16\\,\\text{V} $$</div>
      <div class="callout tip">
        <strong class="callout__tag">Calculadora</strong>
        Resolvé cualquier divisor en la <a href="#/tool/divisor">herramienta de Divisor de tensión y corriente</a>.
      </div>

      <h2>Potencia en serie</h2>
      <p>La potencia entregada por la fuente es la suma de las disipadas por cada resistencia:</p>
      <div class="formula-box">$$ P_T = E\\cdot I_T = P_1 + P_2 + \\dots + P_N $$</div>

      <h2>Fuentes en serie</h2>
      <p>Si las fuentes se conectan en el <strong>mismo sentido</strong>, sus tensiones se suman; en sentido opuesto, se restan. Las baterías de una linterna se ponen en serie para sumar voltaje.</p>
    `,
    quiz: [
      { q: "En un circuito en serie, ¿qué es igual en todos los elementos?",
        opts: ["El voltaje", "La corriente", "La potencia", "La resistencia"],
        a: 1, exp: "Hay un único camino: la corriente es la misma en todos." },
      { q: "Tres resistencias \\(2\\,\\Omega\\), \\(3\\,\\Omega\\) y \\(5\\,\\Omega\\) en serie dan \\(R_T=\\):",
        opts: ["\\(10\\,\\Omega\\)", "\\(0{,}97\\,\\Omega\\)", "\\(30\\,\\Omega\\)", "\\(1{,}03\\,\\Omega\\)"],
        a: 0, exp: "En serie se suman: 2+3+5 = 10 Ω." },
      { q: "La ley de tensiones de Kirchhoff dice que en una malla:",
        opts: ["\\(\\sum I = 0\\)", "\\(\\sum V = 0\\)", "\\(R_T=\\sum 1/R\\)", "\\(I=V\\cdot R\\)"],
        a: 1, exp: "LVK: la suma algebraica de tensiones en la malla es cero." },
      { q: "Con \\(E=24\\,\\text{V}\\), \\(R_1=4\\,\\Omega\\), \\(R_2=8\\,\\Omega\\), la tensión sobre \\(R_2\\) es:",
        opts: ["\\(8\\,\\text{V}\\)", "\\(16\\,\\text{V}\\)", "\\(12\\,\\text{V}\\)", "\\(24\\,\\text{V}\\)"],
        a: 1, exp: "RDT: \\(V_2=24\\cdot8/12=16\\,\\text{V}\\)." },
      { q: "En serie, la resistencia con mayor valor tiene:",
        opts: ["La menor caída de tensión", "La mayor caída de tensión", "Cero tensión", "La misma corriente diferente"],
        a: 1, exp: "La caída \\(V=IR\\) es proporcional a R: la mayor R, mayor V." },
      { q: "La regla del divisor de tensión es:",
        opts: ["\\(V_x=E\\,R_T/R_x\\)", "\\(V_x=E\\,R_x/R_T\\)", "\\(V_x=I/R_x\\)", "\\(V_x=E-R_x\\)"],
        a: 1, exp: "\\(V_x=E\\cdot R_x/R_T\\)." },
      { q: "Con \\(R_T=20\\,\\Omega\\) y \\(E=10\\,\\text{V}\\), la corriente es:",
        opts: ["\\(2\\,\\text{A}\\)", "\\(200\\,\\text{A}\\)", "\\(0{,}5\\,\\text{A}\\)", "\\(30\\,\\text{A}\\)"],
        a: 2, exp: "\\(I=E/R_T=10/20=0{,}5\\,\\text{A}\\)." },
      { q: "La potencia total entregada en serie es:",
        opts: ["La mayor de las potencias", "La suma de las potencias", "El promedio", "Siempre cero"],
        a: 1, exp: "\\(P_T=P_1+P_2+\\dots\\)" },
      { q: "Dos baterías de 1,5 V en serie y mismo sentido dan:",
        opts: ["\\(0\\,\\text{V}\\)", "\\(1{,}5\\,\\text{V}\\)", "\\(3\\,\\text{V}\\)", "\\(0{,}75\\,\\text{V}\\)"],
        a: 2, exp: "En el mismo sentido las tensiones se suman: 3 V." },
      { q: "Si una resistencia en serie se abre (corta), la corriente del circuito:",
        opts: ["Aumenta", "Se vuelve cero", "No cambia", "Se duplica"],
        a: 1, exp: "Al haber un solo camino, una apertura interrumpe toda la corriente." },
    ],
    cards: [
      { q: "Corriente en serie", a: "Es la misma en todos los elementos: \\(I_T=I_1=I_2=\\dots\\)" },
      { q: "Resistencia total en serie", a: "\\(R_T=R_1+R_2+\\dots+R_N\\) (se suman)." },
      { q: "LVK (Kirchhoff de tensiones)", a: "\\(\\sum V=0\\) en la malla; \\(E=V_1+V_2+\\dots\\)" },
      { q: "Divisor de tensión", a: "\\(V_x=E\\dfrac{R_x}{R_T}\\)." },
      { q: "Caída de tensión", a: "\\(V_k=I\\cdot R_k\\); la mayor R tiene la mayor caída." },
      { q: "Potencia en serie", a: "\\(P_T=EI_T=P_1+P_2+\\dots\\)" },
      { q: "Fuentes en serie", a: "Mismo sentido: se suman. Sentido opuesto: se restan." },
      { q: "Si se abre un elemento en serie", a: "La corriente se hace cero (único camino interrumpido)." },
    ]
  },

  /* ===================================================================
     UNIDAD 4 — CIRCUITOS EN PARALELO
     =================================================================== */
  {
    id: "paralelo",
    glyph: "P",
    title: "Circuitos en Paralelo",
    desc: "Mismo voltaje, resistencia equivalente, ley de corrientes de Kirchhoff (LCK) y divisor de corriente.",
    tool: "equivalente",
    html: `
      <p class="lead">En un circuito <strong>en paralelo</strong> los elementos comparten los <strong>mismos dos nodos</strong>: hay varios caminos para la corriente.</p>

      <div class="callout def">
        <strong class="callout__tag">Característica clave</strong>
        El <strong>voltaje es el mismo</strong> en todas las ramas en paralelo: \\(V=V_1=V_2=\\dots\\)
      </div>

      <h2>Resistencia equivalente</h2>
      <p>Se suman los <strong>inversos</strong> (conductancias):</p>
      <div class="formula-box">$$ \\frac{1}{R_T} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots + \\frac{1}{R_N} $$</div>
      <p>La resistencia equivalente <strong>siempre es menor</strong> que la rama más pequeña. Para <strong>dos</strong> resistencias conviene la forma «producto sobre suma»:</p>
      <div class="formula-box">$$ R_T = \\frac{R_1\\cdot R_2}{R_1 + R_2} $$</div>
      <p>Para \\(N\\) resistencias <strong>iguales</strong> de valor \\(R\\): \\(R_T=\\dfrac{R}{N}\\).</p>

      <h2>Ley de corrientes de Kirchhoff (LCK)</h2>
      <div class="callout">
        <strong class="callout__tag">LCK</strong>
        La suma de corrientes que <strong>entran</strong> a un nodo es igual a la suma de las que <strong>salen</strong>: \\(\\sum I_{ent}=\\sum I_{sal}\\). La corriente total se reparte entre las ramas:
        $$ I_T = I_1 + I_2 + \\dots $$
      </div>

      <h2>Regla del divisor de corriente (RDC)</h2>
      <p>La corriente se reparte <strong>inversamente</strong> a la resistencia (más corriente por la rama de menor R). Para dos ramas:</p>
      <div class="formula-box">
        $$ I_1 = I_T\\cdot\\frac{R_2}{R_1+R_2} \\qquad I_2 = I_T\\cdot\\frac{R_1}{R_1+R_2} $$
      </div>
      <p>En general: \\(I_x = I_T\\cdot\\dfrac{R_T}{R_x}\\) (con \\(R_T\\) la equivalente del paralelo).</p>
      <div class="callout tip">
        <strong class="callout__tag">Calculadora</strong>
        Calculá la equivalente de varias ramas en <a href="#/tool/equivalente">Resistencia equivalente</a> y el reparto en <a href="#/tool/divisor">Divisor de corriente</a>.
      </div>

      <h2>Potencia en paralelo</h2>
      <div class="formula-box">$$ P_T = P_1 + P_2 + \\dots = E\\cdot I_T $$</div>
      <p>Como el voltaje es común, la rama de <strong>menor</strong> resistencia disipa <strong>más</strong> potencia (\\(P=V^2/R\\)).</p>

      <h2>Comparación serie vs paralelo</h2>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th></th><th>Serie</th><th>Paralelo</th></tr></thead>
        <tbody>
          <tr><td>Igual en todos</td><td>Corriente \\(I\\)</td><td>Voltaje \\(V\\)</td></tr>
          <tr><td>Resistencia total</td><td>\\(R_T=\\sum R\\) (mayor)</td><td>\\(1/R_T=\\sum 1/R\\) (menor)</td></tr>
          <tr><td>Se reparte</td><td>El voltaje</td><td>La corriente</td></tr>
          <tr><td>Si se abre una rama</td><td>Se corta todo</td><td>Las demás siguen</td></tr>
        </tbody>
      </table>
      </div>
    `,
    quiz: [
      { q: "En paralelo, ¿qué es igual en todas las ramas?",
        opts: ["La corriente", "El voltaje", "La resistencia", "La potencia"],
        a: 1, exp: "Comparten los mismos nodos: el voltaje es común." },
      { q: "Dos resistencias de \\(6\\,\\Omega\\) en paralelo dan \\(R_T=\\):",
        opts: ["\\(12\\,\\Omega\\)", "\\(6\\,\\Omega\\)", "\\(3\\,\\Omega\\)", "\\(0{,}33\\,\\Omega\\)"],
        a: 2, exp: "Iguales: \\(R/N=6/2=3\\,\\Omega\\)." },
      { q: "\\(R_1=4\\,\\Omega\\) y \\(R_2=12\\,\\Omega\\) en paralelo:",
        opts: ["\\(16\\,\\Omega\\)", "\\(3\\,\\Omega\\)", "\\(8\\,\\Omega\\)", "\\(48\\,\\Omega\\)"],
        a: 1, exp: "Producto sobre suma: \\(4\\cdot12/16=3\\,\\Omega\\)." },
      { q: "La resistencia equivalente de un paralelo es:",
        opts: ["Mayor que la rama más grande", "Menor que la rama más pequeña", "El promedio", "La suma"],
        a: 1, exp: "Siempre es menor que la rama de menor valor." },
      { q: "La ley de corrientes de Kirchhoff dice que en un nodo:",
        opts: ["\\(\\sum V=0\\)", "Entran = salen", "\\(R_T=\\sum R\\)", "\\(I=V/R^2\\)"],
        a: 1, exp: "LCK: la corriente que entra iguala a la que sale." },
      { q: "Por la rama de MENOR resistencia circula:",
        opts: ["Menos corriente", "Más corriente", "Cero corriente", "La misma que las demás"],
        a: 1, exp: "La corriente se reparte inversamente a R: menor R, más I." },
      { q: "El divisor de corriente para dos ramas: \\(I_1=I_T\\cdot\\dots\\)",
        opts: ["\\(R_1/(R_1+R_2)\\)", "\\(R_2/(R_1+R_2)\\)", "\\(R_T/R_2\\)", "\\((R_1+R_2)/R_2\\)"],
        a: 1, exp: "La corriente de R₁ usa la resistencia OPUESTA: \\(I_1=I_T R_2/(R_1+R_2)\\)." },
      { q: "Tres resistencias de \\(30\\,\\Omega\\) en paralelo:",
        opts: ["\\(90\\,\\Omega\\)", "\\(30\\,\\Omega\\)", "\\(10\\,\\Omega\\)", "\\(15\\,\\Omega\\)"],
        a: 2, exp: "\\(R/N=30/3=10\\,\\Omega\\)." },
      { q: "Si una rama de un paralelo se abre, las demás:",
        opts: ["Se apagan", "Siguen funcionando", "Duplican su voltaje", "Se cortan"],
        a: 1, exp: "Cada rama es un camino independiente con el mismo voltaje." },
      { q: "Con voltaje común, la rama que más potencia disipa es la de:",
        opts: ["Mayor resistencia", "Menor resistencia", "Resistencia media", "Todas igual"],
        a: 1, exp: "\\(P=V^2/R\\): a menor R, mayor potencia." },
    ],
    cards: [
      { q: "Voltaje en paralelo", a: "Es el mismo en todas las ramas: \\(V=V_1=V_2=\\dots\\)" },
      { q: "Resistencia equivalente", a: "\\(\\dfrac{1}{R_T}=\\sum\\dfrac{1}{R_i}\\); siempre menor que la rama más chica." },
      { q: "Dos en paralelo (atajo)", a: "\\(R_T=\\dfrac{R_1 R_2}{R_1+R_2}\\) (producto sobre suma)." },
      { q: "N iguales en paralelo", a: "\\(R_T=\\dfrac{R}{N}\\)." },
      { q: "LCK (Kirchhoff de corrientes)", a: "Entran = salen en cada nodo; \\(I_T=I_1+I_2+\\dots\\)" },
      { q: "Divisor de corriente (2 ramas)", a: "\\(I_1=I_T\\dfrac{R_2}{R_1+R_2}\\) (usa la R opuesta)." },
      { q: "¿Por dónde va más corriente?", a: "Por la rama de MENOR resistencia." },
      { q: "Si se abre una rama del paralelo", a: "Las otras siguen funcionando (caminos independientes)." },
    ]
  },

  /* ===================================================================
     UNIDAD 5 — REDES SERIE-PARALELO
     =================================================================== */
  {
    id: "serieparalelo",
    glyph: "⇄",
    title: "Redes Serie-Paralelo",
    desc: "Reducción y retorno, divisor de tensión con carga, redes en escalera y diseño de medidores.",
    tool: "equivalente",
    html: `
      <p class="lead">Una red <strong>serie-paralelo</strong> combina ambos tipos de conexión. La estrategia general es <strong>reducir y retornar</strong>.</p>

      <h2>Método de reducción y retorno</h2>
      <ol>
        <li><strong>Reducir:</strong> simplificá los grupos en serie y en paralelo hasta obtener una única \\(R_T\\) vista por la fuente.</li>
        <li>Calculá la <strong>corriente total</strong> \\(I_T=E/R_T\\).</li>
        <li><strong>Retornar:</strong> volvé hacia atrás aplicando la ley de Ohm, la LVK/LCK y los divisores para hallar las corrientes y tensiones de cada elemento.</li>
      </ol>
      <div class="callout">
        <strong class="callout__tag">Cómo identificar</strong>
        Dos elementos están en <strong>serie</strong> si comparten un solo nodo por el que pasa toda la corriente (sin ramificación). Están en <strong>paralelo</strong> si comparten <strong>ambos</strong> nodos.
      </div>

      <h2>Divisor de tensión con carga</h2>
      <p>Al conectar una carga \\(R_L\\) a la salida de un divisor, esta queda en <strong>paralelo</strong> con la resistencia inferior, bajando la resistencia y por tanto la <strong>tensión de salida</strong>. Cuanto mayor sea \\(R_L\\) frente al divisor, menor es el efecto de carga.</p>

      <h2>Redes en escalera</h2>
      <p>Estructuras que se repiten en «peldaños». Se resuelven empezando por el extremo <strong>más alejado</strong> de la fuente, combinando hacia atrás serie y paralelo hasta llegar a \\(R_T\\).</p>

      <h2>Diseño de medidores</h2>
      <ul>
        <li><strong>Amperímetro:</strong> se usa una resistencia <strong>shunt</strong> en paralelo con el galvanómetro para ampliar el rango. Se conecta <strong>en serie</strong> con el circuito y debe tener resistencia muy baja.</li>
        <li><strong>Voltímetro:</strong> se agrega una resistencia <strong>multiplicadora</strong> en serie. Se conecta <strong>en paralelo</strong> y debe tener resistencia muy alta.</li>
        <li><strong>Óhmetro:</strong> mide resistencia con su propia fuente interna.</li>
      </ul>
      <div class="callout tip">
        <strong class="callout__tag">Calculadora</strong>
        Combiná resistencias serie/paralelo paso a paso en <a href="#/tool/equivalente">Resistencia equivalente</a>.
      </div>

      <h2>Estrategia práctica</h2>
      <div class="callout warn">
        <strong class="callout__tag">Recordá</strong>
        Antes de calcular, <strong>redibujá</strong> el circuito identificando claramente qué está en serie y qué en paralelo. La mayoría de los errores vienen de leer mal la topología.
      </div>
    `,
    quiz: [
      { q: "El método general para redes serie-paralelo es:",
        opts: ["Superposición", "Reducción y retorno", "Thévenin", "Mallas"],
        a: 1, exp: "Se reduce a una R_T y luego se retorna para hallar V e I de cada elemento." },
      { q: "Dos elementos están en paralelo si comparten:",
        opts: ["Un solo nodo", "Ambos nodos", "Ningún nodo", "La misma corriente"],
        a: 1, exp: "El paralelo comparte los dos nodos (mismo voltaje)." },
      { q: "Al conectar una carga a un divisor de tensión, la salida:",
        opts: ["Sube", "Baja", "No cambia", "Se duplica"],
        a: 1, exp: "La carga en paralelo baja la resistencia y la tensión de salida." },
      { q: "El primer paso de reducción y retorno es:",
        opts: ["Hallar I de cada rama", "Simplificar hasta R_T", "Aplicar LVK", "Medir la carga"],
        a: 1, exp: "Primero se reduce todo a la R_T vista por la fuente." },
      { q: "Para ampliar el rango de un amperímetro se usa:",
        opts: ["Una multiplicadora en serie", "Un shunt en paralelo", "Un capacitor", "Un fusible"],
        a: 1, exp: "El shunt en paralelo deriva parte de la corriente." },
      { q: "Un voltímetro ideal debe tener resistencia:",
        opts: ["Muy baja", "Muy alta", "Igual a la carga", "Cero"],
        a: 1, exp: "Alta resistencia para no cargar el circuito; se conecta en paralelo." },
      { q: "Un amperímetro se conecta:",
        opts: ["En paralelo", "En serie", "A tierra", "A la carga"],
        a: 1, exp: "En serie, para que pase por él toda la corriente a medir." },
      { q: "Las redes en escalera se resuelven empezando:",
        opts: ["Desde la fuente", "Desde el extremo más alejado", "Por el centro", "Por la carga mayor"],
        a: 1, exp: "Se combina hacia atrás desde el peldaño más lejano hasta R_T." },
      { q: "Cuanto mayor es \\(R_L\\) frente al divisor, el efecto de carga es:",
        opts: ["Mayor", "Menor", "Igual", "Infinito"],
        a: 1, exp: "Una carga grande casi no altera la salida (menor efecto de carga)." },
    ],
    cards: [
      { q: "Método para serie-paralelo", a: "Reducción y retorno: simplificar a \\(R_T\\), hallar \\(I_T\\), volver con Ohm/divisores." },
      { q: "¿Serie o paralelo?", a: "Serie: comparten 1 nodo sin ramificar. Paralelo: comparten los 2 nodos." },
      { q: "Divisor con carga", a: "La carga en paralelo baja la tensión de salida (efecto de carga)." },
      { q: "Amperímetro", a: "Shunt en paralelo, baja resistencia, se conecta en serie." },
      { q: "Voltímetro", a: "Multiplicadora en serie, alta resistencia, se conecta en paralelo." },
      { q: "Redes en escalera", a: "Se resuelven desde el extremo más alejado de la fuente hacia atrás." },
    ]
  },

  /* ===================================================================
     UNIDAD 6 — MÉTODOS DE ANÁLISIS
     =================================================================== */
  {
    id: "analisis",
    glyph: "∑",
    title: "Métodos de Análisis",
    desc: "Fuentes de corriente y voltaje, conversión de fuentes, análisis de mallas y análisis de nodos.",
    tool: null,
    html: `
      <p class="lead">Cuando una red tiene varias fuentes o no se reduce por serie-paralelo, se usan métodos <strong>sistemáticos</strong>: mallas y nodos.</p>

      <h2>Fuentes ideales</h2>
      <ul>
        <li><strong>Fuente de voltaje ideal:</strong> mantiene \\(E\\) fijo sin importar la corriente (resistencia interna \\(0\\,\\Omega\\)).</li>
        <li><strong>Fuente de corriente ideal:</strong> entrega \\(I\\) fijo sin importar la tensión (resistencia interna \\(\\infty\\)).</li>
      </ul>

      <h2>Conversión de fuentes</h2>
      <p>Una fuente real de voltaje \\(E\\) con resistencia serie \\(R\\) equivale a una fuente de corriente \\(I\\) con la misma \\(R\\) en paralelo:</p>
      <div class="formula-box">$$ I = \\frac{E}{R} \\qquad\\Longleftrightarrow\\qquad E = I\\cdot R $$</div>
      <p>La resistencia \\(R\\) es la misma en ambos modelos; cambia su posición (serie ↔ paralelo).</p>

      <h2>Análisis de mallas</h2>
      <p>Se basa en la <strong>LVK</strong>. Procedimiento (método general):</p>
      <ol>
        <li>Asigná una <strong>corriente de malla</strong> a cada lazo cerrado (por convención, en sentido horario).</li>
        <li>Escribí la LVK en cada malla: \\(\\sum V = 0\\).</li>
        <li>En una resistencia compartida, la caída depende de <strong>ambas</strong> corrientes de malla.</li>
        <li>Resolvé el sistema de ecuaciones.</li>
      </ol>

      <h2>Análisis de nodos</h2>
      <p>Se basa en la <strong>LCK</strong>. Procedimiento:</p>
      <ol>
        <li>Elegí un nodo como <strong>referencia</strong> (tierra, \\(0\\,\\text{V}\\)).</li>
        <li>Asigná una <strong>tensión de nodo</strong> a los demás.</li>
        <li>Escribí la LCK en cada nodo: \\(\\sum I = 0\\).</li>
        <li>Resolvé el sistema para hallar las tensiones de nodo.</li>
      </ol>
      <div class="callout">
        <strong class="callout__tag">¿Mallas o nodos?</strong>
        Conviene <strong>mallas</strong> si hay pocas mallas y fuentes de voltaje; conviene <strong>nodos</strong> si hay pocos nodos y fuentes de corriente. El número de ecuaciones es lo que decide.
      </div>

      <h2>Redes en puente</h2>
      <p>El <strong>puente de Wheatstone</strong> está <strong>equilibrado</strong> cuando no circula corriente por la rama central. La condición es:</p>
      <div class="formula-box">$$ \\frac{R_1}{R_3} = \\frac{R_2}{R_4} \\quad\\Leftrightarrow\\quad R_1 R_4 = R_2 R_3 $$</div>
      <p>En equilibrio, la rama central puede tratarse como abierta o como cortocircuito sin alterar el resto.</p>
    `,
    quiz: [
      { q: "La resistencia interna de una fuente de voltaje ideal es:",
        opts: ["Infinita", "Cero", "Igual a la carga", "1 Ω"],
        a: 1, exp: "Ideal de voltaje: 0 Ω, mantiene E constante." },
      { q: "Una fuente de corriente ideal tiene resistencia interna:",
        opts: ["Cero", "Infinita", "Negativa", "Variable"],
        a: 1, exp: "Ideal de corriente: resistencia interna infinita." },
      { q: "Para convertir \\(E=10\\,\\text{V}\\) con \\(R=5\\,\\Omega\\) a fuente de corriente:",
        opts: ["\\(I=2\\,\\text{A}\\), \\(R\\) en paralelo", "\\(I=50\\,\\text{A}\\)", "\\(I=0{,}5\\,\\text{A}\\)", "\\(I=15\\,\\text{A}\\)"],
        a: 0, exp: "\\(I=E/R=10/5=2\\,\\text{A}\\); la misma R queda en paralelo." },
      { q: "El análisis de mallas se basa en:",
        opts: ["LCK", "LVK", "Ley de Coulomb", "Faraday"],
        a: 1, exp: "Mallas usa la ley de tensiones de Kirchhoff (LVK)." },
      { q: "El análisis de nodos se basa en:",
        opts: ["LVK", "LCK", "Ley de Ohm sola", "Thévenin"],
        a: 1, exp: "Nodos usa la ley de corrientes de Kirchhoff (LCK)." },
      { q: "En el análisis de nodos, el nodo de referencia se toma como:",
        opts: ["La fuente", "\\(0\\,\\text{V}\\) (tierra)", "El de mayor tensión", "La carga"],
        a: 1, exp: "Se elige un nodo de referencia a 0 V (tierra)." },
      { q: "El puente de Wheatstone está equilibrado cuando:",
        opts: ["\\(R_1=R_2\\)", "\\(R_1 R_4=R_2 R_3\\)", "\\(R_T=0\\)", "\\(E=0\\)"],
        a: 1, exp: "Equilibrio: \\(R_1/R_3=R_2/R_4\\), o sea \\(R_1R_4=R_2R_3\\)." },
      { q: "En el puente equilibrado, la corriente por la rama central es:",
        opts: ["Máxima", "Cero", "Negativa", "Igual a I_T"],
        a: 1, exp: "Equilibrado = sin corriente por el galvanómetro central." },
      { q: "Conviene usar análisis de nodos cuando hay:",
        opts: ["Muchos nodos", "Pocos nodos y fuentes de corriente", "Solo fuentes de voltaje", "Una sola malla"],
        a: 1, exp: "Menos nodos → menos ecuaciones; ideal con fuentes de corriente." },
    ],
    cards: [
      { q: "Fuente de voltaje ideal", a: "Resistencia interna 0 Ω; mantiene E fijo." },
      { q: "Fuente de corriente ideal", a: "Resistencia interna ∞; mantiene I fijo." },
      { q: "Conversión de fuentes", a: "\\(I=E/R\\); la misma R pasa de serie a paralelo." },
      { q: "Análisis de mallas", a: "Basado en LVK; corrientes de malla y \\(\\sum V=0\\)." },
      { q: "Análisis de nodos", a: "Basado en LCK; tensiones de nodo y \\(\\sum I=0\\); referencia a 0 V." },
      { q: "Puente de Wheatstone equilibrado", a: "\\(R_1R_4=R_2R_3\\): sin corriente por la rama central." },
    ]
  },

  /* ===================================================================
     UNIDAD 7 — TEOREMAS DE RED
     =================================================================== */
  {
    id: "teoremas",
    glyph: "Θ",
    title: "Teoremas de Red",
    desc: "Superposición, Thévenin, Norton y máxima transferencia de potencia.",
    tool: null,
    html: `
      <p class="lead">Los <strong>teoremas de red</strong> simplifican el análisis de circuitos complejos, especialmente cuando interesa una sola parte del circuito.</p>

      <h2>Teorema de superposición</h2>
      <div class="callout def">
        <strong class="callout__tag">Enunciado</strong>
        En una red lineal con varias fuentes, la corriente (o tensión) en un elemento es la <strong>suma</strong> de las contribuciones de cada fuente actuando <strong>por separado</strong>.
      </div>
      <p>Para «apagar» fuentes: las de <strong>voltaje</strong> se reemplazan por un <strong>cortocircuito</strong>; las de <strong>corriente</strong> por un <strong>circuito abierto</strong>. ⚠️ La potencia <strong>no</strong> se superpone (es cuadrática).</p>

      <h2>Teorema de Thévenin</h2>
      <div class="callout def">
        <strong class="callout__tag">Enunciado</strong>
        Cualquier red lineal de dos terminales puede reemplazarse por una <strong>fuente de voltaje</strong> \\(E_{Th}\\) en <strong>serie</strong> con una resistencia \\(R_{Th}\\).
      </div>
      <p>Procedimiento:</p>
      <ol>
        <li>Quitá la carga \\(R_L\\) de los terminales de interés.</li>
        <li>\\(E_{Th}\\): tensión de <strong>circuito abierto</strong> entre esos terminales.</li>
        <li>\\(R_{Th}\\): resistencia vista desde los terminales con las <strong>fuentes apagadas</strong>.</li>
        <li>Volvé a conectar la carga y resolvé el circuito simple.</li>
      </ol>

      <h2>Teorema de Norton</h2>
      <div class="callout def">
        <strong class="callout__tag">Enunciado</strong>
        Equivale a una <strong>fuente de corriente</strong> \\(I_N\\) en <strong>paralelo</strong> con \\(R_N\\).
      </div>
      <p>Se relaciona con Thévenin directamente:</p>
      <div class="formula-box">$$ R_N = R_{Th} \\qquad I_N = \\frac{E_{Th}}{R_{Th}} $$</div>
      <p>\\(I_N\\) es la corriente de <strong>cortocircuito</strong> entre los terminales.</p>

      <h2>Máxima transferencia de potencia</h2>
      <div class="callout">
        <strong class="callout__tag">Condición</strong>
        Una fuente entrega la <strong>máxima potencia</strong> a la carga cuando:
        $$ R_L = R_{Th} $$
      </div>
      <p>En esa condición la potencia máxima es:</p>
      <div class="formula-box">$$ P_{max} = \\frac{E_{Th}^{2}}{4\\,R_{Th}} $$</div>
      <p>Con \\(R_L=R_{Th}\\), la eficiencia es solo del <strong>50 %</strong> (la mitad de la potencia se disipa en \\(R_{Th}\\)).</p>
    `,
    quiz: [
      { q: "Para apagar una fuente de voltaje en superposición:",
        opts: ["Se abre", "Se cortocircuita", "Se duplica", "Se invierte"],
        a: 1, exp: "Fuente de voltaje apagada = cortocircuito (0 V)." },
      { q: "Para apagar una fuente de corriente:",
        opts: ["Se cortocircuita", "Se abre (circuito abierto)", "Se pone a tierra", "Se suma"],
        a: 1, exp: "Fuente de corriente apagada = circuito abierto (0 A)." },
      { q: "La potencia, ¿se puede superponer?",
        opts: ["Sí, siempre", "No, es cuadrática", "Solo en CA", "Solo con 2 fuentes"],
        a: 1, exp: "La potencia depende del cuadrado: NO se superpone." },
      { q: "El equivalente de Thévenin es:",
        opts: ["\\(E_{Th}\\) en serie con \\(R_{Th}\\)", "\\(I_N\\) en paralelo con \\(R_N\\)", "Solo una resistencia", "Una fuente ideal"],
        a: 0, exp: "Thévenin: fuente de voltaje en serie con R_Th." },
      { q: "\\(E_{Th}\\) es la tensión de:",
        opts: ["Cortocircuito", "Circuito abierto en los terminales", "La carga", "La fuente interna"],
        a: 1, exp: "E_Th = tensión de circuito abierto entre los terminales." },
      { q: "\\(R_{Th}\\) se calcula:",
        opts: ["Con la carga puesta", "Con las fuentes apagadas", "Cortocircuitando la salida", "Sumando todo"],
        a: 1, exp: "Se apagan las fuentes y se mide la resistencia vista desde los terminales." },
      { q: "El equivalente de Norton es:",
        opts: ["\\(E_{Th}\\) en serie con \\(R_{Th}\\)", "\\(I_N\\) en paralelo con \\(R_N\\)", "Una malla", "Un nodo"],
        a: 1, exp: "Norton: fuente de corriente en paralelo con R_N." },
      { q: "Relación entre Norton y Thévenin:",
        opts: ["\\(I_N=E_{Th}\\cdot R_{Th}\\)", "\\(I_N=E_{Th}/R_{Th}\\), \\(R_N=R_{Th}\\)", "\\(R_N=2R_{Th}\\)", "No hay relación"],
        a: 1, exp: "\\(R_N=R_{Th}\\) e \\(I_N=E_{Th}/R_{Th}\\)." },
      { q: "Hay máxima transferencia de potencia cuando:",
        opts: ["\\(R_L=0\\)", "\\(R_L=R_{Th}\\)", "\\(R_L=\\infty\\)", "\\(R_L=2R_{Th}\\)"],
        a: 1, exp: "Máxima potencia con \\(R_L=R_{Th}\\)." },
      { q: "Con \\(R_L=R_{Th}\\), la eficiencia es:",
        opts: ["100 %", "75 %", "50 %", "25 %"],
        a: 2, exp: "La mitad de la potencia se pierde en R_Th: eficiencia 50 %." },
    ],
    cards: [
      { q: "Superposición", a: "Aporte de cada fuente por separado; se suman corrientes/tensiones (la potencia NO)." },
      { q: "Apagar fuentes", a: "Voltaje → cortocircuito. Corriente → circuito abierto." },
      { q: "Thévenin", a: "\\(E_{Th}\\) (circuito abierto) en serie con \\(R_{Th}\\) (fuentes apagadas)." },
      { q: "Norton", a: "\\(I_N\\) (cortocircuito) en paralelo con \\(R_N=R_{Th}\\)." },
      { q: "Norton ↔ Thévenin", a: "\\(I_N=\\dfrac{E_{Th}}{R_{Th}}\\), \\(R_N=R_{Th}\\)." },
      { q: "Máxima transferencia", a: "\\(R_L=R_{Th}\\); \\(P_{max}=\\dfrac{E_{Th}^2}{4R_{Th}}\\); eficiencia 50 %." },
    ]
  },

  /* ===================================================================
     UNIDAD 8 — CAPACITORES
     =================================================================== */
  {
    id: "capacitores",
    glyph: "C",
    title: "Capacitores y Transitorios RC",
    desc: "Capacitancia, carga y descarga, constante de tiempo, combinaciones y energía almacenada.",
    tool: null,
    html: `
      <p class="lead">Un <strong>capacitor</strong> almacena energía en forma de <strong>campo eléctrico</strong> entre dos placas separadas por un dieléctrico.</p>

      <h2>Capacitancia</h2>
      <div class="formula-box">$$ C = \\frac{Q}{V} \\qquad C = \\varepsilon\\,\\frac{A}{d} $$</div>
      <p>Se mide en <strong>faradios (F)</strong>. Depende del área \\(A\\) de las placas, la distancia \\(d\\) entre ellas y la permitividad \\(\\varepsilon\\) del dieléctrico. Valores típicos: μF, nF, pF.</p>

      <h2>Transitorio de carga (RC)</h2>
      <p>Al conectar un capacitor a través de una resistencia, la tensión crece exponencialmente:</p>
      <div class="formula-box">$$ v_C(t) = E\\left(1 - e^{-t/\\tau}\\right) \\qquad \\tau = R\\,C $$</div>
      <p>La <strong>constante de tiempo</strong> \\(\\tau=RC\\) (en segundos) marca la velocidad. En la práctica el capacitor se considera <strong>cargado en \\(5\\tau\\)</strong>.</p>
      <div class="tbl-wrap">
      <table class="tbl">
        <thead><tr><th>Tiempo</th><th>% de carga</th></tr></thead>
        <tbody>
          <tr><td>\\(1\\tau\\)</td><td>63,2 %</td></tr>
          <tr><td>\\(2\\tau\\)</td><td>86,5 %</td></tr>
          <tr><td>\\(3\\tau\\)</td><td>95 %</td></tr>
          <tr><td>\\(5\\tau\\)</td><td>≈ 99,3 % (≈ completo)</td></tr>
        </tbody>
      </table>
      </div>
      <p>La corriente, en cambio, <strong>decae</strong>: \\(i_C(t)=\\dfrac{E}{R}\\,e^{-t/\\tau}\\).</p>

      <h2>Descarga</h2>
      <div class="formula-box">$$ v_C(t) = E\\,e^{-t/\\tau} $$</div>

      <h2>Condiciones especiales</h2>
      <div class="callout">
        <strong class="callout__tag">Régimen estacionario (CD)</strong>
        Un capacitor totalmente cargado se comporta como un <strong>circuito abierto</strong> (no deja pasar corriente continua). En el <strong>instante inicial</strong> (descargado) se comporta como un <strong>cortocircuito</strong>.
      </div>

      <h2>Combinaciones</h2>
      <p>Los capacitores se combinan al <strong>revés</strong> que las resistencias:</p>
      <div class="formula-box">
        $$ \\text{Paralelo: } C_T = C_1 + C_2 + \\dots $$
        $$ \\text{Serie: } \\frac{1}{C_T} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\dots $$
      </div>

      <h2>Energía almacenada</h2>
      <div class="formula-box">$$ W_C = \\tfrac{1}{2}\\,C\\,V^{2} $$</div>
    `,
    quiz: [
      { q: "La capacitancia se define como:",
        opts: ["\\(C=Q\\cdot V\\)", "\\(C=Q/V\\)", "\\(C=V/Q\\)", "\\(C=Q/t\\)"],
        a: 1, exp: "\\(C=Q/V\\), en faradios." },
      { q: "La constante de tiempo de un circuito RC es:",
        opts: ["\\(\\tau=R/C\\)", "\\(\\tau=RC\\)", "\\(\\tau=C/R\\)", "\\(\\tau=R+C\\)"],
        a: 1, exp: "\\(\\tau=RC\\), en segundos." },
      { q: "Tras una constante de tiempo, el capacitor alcanza:",
        opts: ["50 %", "63,2 %", "95 %", "100 %"],
        a: 1, exp: "En \\(1\\tau\\) llega al 63,2 % de la tensión final." },
      { q: "Se considera cargado prácticamente en:",
        opts: ["\\(1\\tau\\)", "\\(2\\tau\\)", "\\(5\\tau\\)", "\\(10\\tau\\)"],
        a: 2, exp: "A los \\(5\\tau\\) está al ≈99,3 %: prácticamente cargado." },
      { q: "En régimen de CD, un capacitor cargado actúa como:",
        opts: ["Cortocircuito", "Circuito abierto", "Resistencia", "Fuente"],
        a: 1, exp: "Cargado bloquea la CD: circuito abierto." },
      { q: "En el instante inicial (descargado), el capacitor actúa como:",
        opts: ["Circuito abierto", "Cortocircuito", "Resistencia infinita", "Fuente de voltaje"],
        a: 1, exp: "Descargado al inicio = cortocircuito (su tensión es 0)." },
      { q: "Dos capacitores en paralelo:",
        opts: ["\\(1/C_T=\\sum 1/C\\)", "\\(C_T=C_1+C_2\\)", "\\(C_T=C_1 C_2\\)", "\\(C_T=C/2\\)"],
        a: 1, exp: "En paralelo los capacitores se SUMAN (al revés que las R)." },
      { q: "La energía almacenada en un capacitor es:",
        opts: ["\\(\\tfrac12 CV^2\\)", "\\(CV\\)", "\\(\\tfrac12 C^2 V\\)", "\\(QV^2\\)"],
        a: 0, exp: "\\(W=\\tfrac12 CV^2\\)." },
      { q: "Un capacitor almacena energía en forma de:",
        opts: ["Campo magnético", "Campo eléctrico", "Calor", "Corriente"],
        a: 1, exp: "El capacitor almacena energía en un campo eléctrico." },
      { q: "Durante la carga, la corriente del capacitor:",
        opts: ["Crece", "Decae exponencialmente", "Es constante", "Es cero siempre"],
        a: 1, exp: "\\(i_C=\\dfrac{E}{R}e^{-t/\\tau}\\): parte de un máximo y decae." },
    ],
    cards: [
      { q: "Capacitancia", a: "\\(C=\\dfrac{Q}{V}=\\varepsilon\\dfrac{A}{d}\\), en faradios (F)." },
      { q: "Constante de tiempo RC", a: "\\(\\tau=RC\\) (s). Cargado en ≈ \\(5\\tau\\)." },
      { q: "Carga del capacitor", a: "\\(v_C=E(1-e^{-t/\\tau})\\); en \\(1\\tau\\) → 63,2 %." },
      { q: "Descarga", a: "\\(v_C=E\\,e^{-t/\\tau}\\)." },
      { q: "Capacitor en CD", a: "Cargado: circuito abierto. Inicial (descargado): cortocircuito." },
      { q: "Combinaciones (al revés que R)", a: "Paralelo: \\(C_T=\\sum C\\). Serie: \\(1/C_T=\\sum 1/C\\)." },
      { q: "Energía", a: "\\(W=\\tfrac12 CV^2\\)." },
      { q: "¿Qué almacena?", a: "Energía en forma de campo eléctrico." },
    ]
  },

  /* ===================================================================
     UNIDAD 9 — INDUCTORES
     =================================================================== */
  {
    id: "inductores",
    glyph: "L",
    title: "Inductores y Transitorios RL",
    desc: "Inductancia, voltaje inducido, constante de tiempo RL, combinaciones y energía.",
    tool: null,
    html: `
      <p class="lead">Un <strong>inductor</strong> (bobina) almacena energía en un <strong>campo magnético</strong> y se opone a los cambios de corriente.</p>

      <h2>Inductancia y voltaje inducido</h2>
      <p>La <strong>ley de Faraday/Lenz</strong> dice que la tensión inducida se opone a la variación de corriente:</p>
      <div class="formula-box">$$ v_L = L\\,\\frac{di}{dt} $$</div>
      <p>La <strong>inductancia</strong> \\(L\\) se mide en <strong>henrios (H)</strong>. Si la corriente no cambia, \\(v_L=0\\).</p>

      <h2>Transitorio RL</h2>
      <p>Al aplicar tensión, la corriente <strong>crece</strong> exponencialmente (no instantáneamente):</p>
      <div class="formula-box">$$ i_L(t) = \\frac{E}{R}\\left(1 - e^{-t/\\tau}\\right) \\qquad \\tau = \\frac{L}{R} $$</div>
      <p>La constante de tiempo es \\(\\tau=L/R\\). A los \\(5\\tau\\) la corriente alcanza prácticamente su valor final \\(E/R\\). La tensión sobre el inductor <strong>decae</strong>: \\(v_L(t)=E\\,e^{-t/\\tau}\\).</p>

      <h2>Condiciones especiales</h2>
      <div class="callout">
        <strong class="callout__tag">Dualidad con el capacitor</strong>
        En <strong>CD estacionaria</strong>, un inductor actúa como <strong>cortocircuito</strong> (deja pasar la corriente, sin caída). En el <strong>instante inicial</strong> actúa como <strong>circuito abierto</strong> (se opone al cambio brusco). Es el comportamiento <em>opuesto</em> al capacitor.
      </div>

      <h2>Combinaciones</h2>
      <p>Los inductores se combinan <strong>igual que las resistencias</strong>:</p>
      <div class="formula-box">
        $$ \\text{Serie: } L_T = L_1 + L_2 + \\dots $$
        $$ \\text{Paralelo: } \\frac{1}{L_T} = \\frac{1}{L_1} + \\frac{1}{L_2} + \\dots $$
      </div>

      <h2>Energía almacenada</h2>
      <div class="formula-box">$$ W_L = \\tfrac{1}{2}\\,L\\,I^{2} $$</div>

      <h2>Resumen: capacitor vs inductor</h2>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th></th><th>Capacitor</th><th>Inductor</th></tr></thead>
        <tbody>
          <tr><td>Almacena en</td><td>Campo eléctrico</td><td>Campo magnético</td></tr>
          <tr><td>Se opone a cambios de</td><td>Voltaje</td><td>Corriente</td></tr>
          <tr><td>\\(\\tau\\)</td><td>\\(RC\\)</td><td>\\(L/R\\)</td></tr>
          <tr><td>En CD estacionaria</td><td>Circuito abierto</td><td>Cortocircuito</td></tr>
          <tr><td>Energía</td><td>\\(\\tfrac12 CV^2\\)</td><td>\\(\\tfrac12 LI^2\\)</td></tr>
        </tbody>
      </table>
      </div>
    `,
    quiz: [
      { q: "La inductancia se mide en:",
        opts: ["Faradios", "Henrios", "Ohmios", "Watts"],
        a: 1, exp: "La inductancia L se mide en henrios (H)." },
      { q: "El voltaje inducido en un inductor es:",
        opts: ["\\(v_L=L\\,di/dt\\)", "\\(v_L=L\\,i\\)", "\\(v_L=i/L\\)", "\\(v_L=L/i\\)"],
        a: 0, exp: "\\(v_L=L\\,di/dt\\): depende de la variación de corriente." },
      { q: "La constante de tiempo de un circuito RL es:",
        opts: ["\\(\\tau=RL\\)", "\\(\\tau=L/R\\)", "\\(\\tau=R/L\\)", "\\(\\tau=L+R\\)"],
        a: 1, exp: "\\(\\tau=L/R\\)." },
      { q: "Un inductor almacena energía en forma de:",
        opts: ["Campo eléctrico", "Campo magnético", "Calor", "Voltaje"],
        a: 1, exp: "El inductor almacena energía en un campo magnético." },
      { q: "En CD estacionaria, un inductor actúa como:",
        opts: ["Circuito abierto", "Cortocircuito", "Capacitor", "Fuente"],
        a: 1, exp: "Con corriente constante \\(v_L=0\\): se comporta como cortocircuito." },
      { q: "En el instante inicial, el inductor actúa como:",
        opts: ["Cortocircuito", "Circuito abierto", "Resistencia 0", "Fuente de corriente"],
        a: 1, exp: "Se opone al cambio brusco de corriente: circuito abierto inicial." },
      { q: "Dos inductores en serie:",
        opts: ["\\(1/L_T=\\sum 1/L\\)", "\\(L_T=L_1+L_2\\)", "\\(L_T=L_1 L_2\\)", "\\(L_T=L/2\\)"],
        a: 1, exp: "En serie se suman, igual que las resistencias." },
      { q: "La energía almacenada en un inductor es:",
        opts: ["\\(\\tfrac12 LI^2\\)", "\\(LI\\)", "\\(\\tfrac12 L^2 I\\)", "\\(\\tfrac12 CV^2\\)"],
        a: 0, exp: "\\(W=\\tfrac12 LI^2\\)." },
      { q: "El inductor se opone a los cambios de:",
        opts: ["Voltaje", "Corriente", "Resistencia", "Temperatura"],
        a: 1, exp: "Por la ley de Lenz, se opone a los cambios de corriente." },
      { q: "Si la corriente por un inductor es constante, \\(v_L\\) vale:",
        opts: ["Máximo", "Cero", "\\(E\\)", "Infinito"],
        a: 1, exp: "\\(v_L=L\\,di/dt=0\\) si la corriente no cambia." },
    ],
    cards: [
      { q: "Voltaje inducido", a: "\\(v_L=L\\dfrac{di}{dt}\\); si \\(i\\) no cambia, \\(v_L=0\\)." },
      { q: "Unidad de inductancia", a: "Henrio (H)." },
      { q: "Constante de tiempo RL", a: "\\(\\tau=\\dfrac{L}{R}\\); valor final en ≈ \\(5\\tau\\)." },
      { q: "Corriente en RL", a: "\\(i_L=\\dfrac{E}{R}(1-e^{-t/\\tau})\\)." },
      { q: "Inductor en CD", a: "Estacionario: cortocircuito. Inicial: circuito abierto (opuesto al capacitor)." },
      { q: "Combinaciones (como R)", a: "Serie: \\(L_T=\\sum L\\). Paralelo: \\(1/L_T=\\sum 1/L\\)." },
      { q: "Energía", a: "\\(W=\\tfrac12 LI^2\\) (campo magnético)." },
      { q: "Se opone a cambios de…", a: "Corriente (ley de Lenz)." },
    ]
  },

  /* ===================================================================
     UNIDAD 10 — CORRIENTE ALTERNA
     =================================================================== */
  {
    id: "ca",
    glyph: "∿",
    title: "Corriente Alterna (CA)",
    desc: "Onda senoidal, frecuencia, valor eficaz (rms), reactancia, impedancia y fasores.",
    tool: "reactancia",
    html: `
      <p class="lead">En <strong>corriente alterna</strong> la tensión y la corriente varían en el tiempo siguiendo una <strong>onda senoidal</strong>, cambiando de polaridad periódicamente.</p>

      <h2>La onda senoidal</h2>
      <div class="formula-box">$$ v(t) = V_m\\,\\sin(\\omega t + \\phi) $$</div>
      <ul>
        <li>\\(V_m\\): valor <strong>pico</strong> (amplitud máxima).</li>
        <li>\\(\\omega = 2\\pi f\\): velocidad angular (rad/s).</li>
        <li>\\(T\\): <strong>período</strong> (s); \\(f=\\dfrac{1}{T}\\) es la <strong>frecuencia</strong> en <strong>hertz (Hz)</strong>.</li>
        <li>\\(\\phi\\): ángulo de <strong>fase</strong>.</li>
      </ul>

      <h2>Valor eficaz (rms)</h2>
      <p>El valor <strong>eficaz</strong> o <strong>rms</strong> es el valor de CD que produciría el mismo calentamiento. Para una senoide:</p>
      <div class="formula-box">$$ V_{rms} = \\frac{V_m}{\\sqrt{2}} \\approx 0{,}707\\,V_m $$</div>
      <p>Los \\(220\\,\\text{V}\\) de la red son rms; el pico es \\(220\\sqrt2\\approx311\\,\\text{V}\\). El <strong>valor promedio</strong> de una senoide completa es <strong>cero</strong>.</p>

      <h2>Respuesta de los elementos básicos</h2>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Elemento</th><th>Oposición</th><th>Fase (V respecto de I)</th></tr></thead>
        <tbody>
          <tr><td>Resistor</td><td>\\(R\\)</td><td>En fase (0°)</td></tr>
          <tr><td>Inductor</td><td>\\(X_L=\\omega L=2\\pi f L\\)</td><td>V adelanta 90°</td></tr>
          <tr><td>Capacitor</td><td>\\(X_C=\\dfrac{1}{\\omega C}=\\dfrac{1}{2\\pi f C}\\)</td><td>V atrasa 90°</td></tr>
        </tbody>
      </table>
      </div>
      <p>La <strong>reactancia</strong> se mide en ohmios. Regla mnemotécnica <strong>«ELI the ICE man»</strong>: en el inductor (L) la tensión E va antes que I; en el capacitor (C) la I va antes que E.</p>
      <div class="callout tip">
        <strong class="callout__tag">Calculadora</strong>
        Calculá \\(X_L\\), \\(X_C\\) e impedancia en la <a href="#/tool/reactancia">herramienta de Reactancia e impedancia</a>.
      </div>

      <h2>Impedancia</h2>
      <p>La <strong>impedancia</strong> \\(Z\\) generaliza la resistencia para CA; es un número complejo (módulo y ángulo). En un circuito RLC serie:</p>
      <div class="formula-box">
        $$ Z = \\sqrt{R^{2} + (X_L - X_C)^{2}} \\qquad \\theta = \\arctan\\frac{X_L - X_C}{R} $$
      </div>
      <p>La ley de Ohm en CA se escribe con fasores: \\(\\mathbf{V}=\\mathbf{I}\\cdot\\mathbf{Z}\\).</p>

      <h2>Resonancia</h2>
      <div class="callout">
        <strong class="callout__tag">Frecuencia de resonancia</strong>
        Cuando \\(X_L=X_C\\), la reactancia se cancela y \\(Z=R\\) (mínima). Ocurre en:
        $$ f_0 = \\frac{1}{2\\pi\\sqrt{LC}} $$
      </div>

      <h2>Potencia en CA</h2>
      <ul>
        <li><strong>Potencia activa</strong> \\(P=VI\\cos\\theta\\) (W) — la que realiza trabajo.</li>
        <li><strong>Potencia reactiva</strong> \\(Q=VI\\sin\\theta\\) (VAR).</li>
        <li><strong>Potencia aparente</strong> \\(S=VI\\) (VA).</li>
        <li><strong>Factor de potencia</strong> \\(\\text{FP}=\\cos\\theta=P/S\\).</li>
      </ul>
    `,
    quiz: [
      { q: "La frecuencia es la inversa del:",
        opts: ["Pico", "Período", "Voltaje", "Ángulo"],
        a: 1, exp: "\\(f=1/T\\), en hertz." },
      { q: "El valor rms de una senoide de pico \\(V_m\\) es:",
        opts: ["\\(V_m\\)", "\\(V_m/\\sqrt2\\)", "\\(V_m\\sqrt2\\)", "\\(2V_m\\)"],
        a: 1, exp: "\\(V_{rms}=V_m/\\sqrt2\\approx0{,}707V_m\\)." },
      { q: "El valor promedio de una senoide completa es:",
        opts: ["\\(V_m\\)", "\\(0{,}707V_m\\)", "Cero", "\\(0{,}637V_m\\)"],
        a: 2, exp: "En un ciclo completo el promedio es cero." },
      { q: "La reactancia inductiva es:",
        opts: ["\\(X_L=1/(\\omega L)\\)", "\\(X_L=\\omega L\\)", "\\(X_L=\\omega C\\)", "\\(X_L=R\\)"],
        a: 1, exp: "\\(X_L=\\omega L=2\\pi f L\\): crece con la frecuencia." },
      { q: "La reactancia capacitiva es:",
        opts: ["\\(X_C=\\omega C\\)", "\\(X_C=1/(\\omega C)\\)", "\\(X_C=\\omega L\\)", "\\(X_C=2\\pi f C\\)"],
        a: 1, exp: "\\(X_C=1/(\\omega C)\\): disminuye con la frecuencia." },
      { q: "En un inductor, la tensión respecto de la corriente:",
        opts: ["Está en fase", "Adelanta 90°", "Atrasa 90°", "Adelanta 45°"],
        a: 1, exp: "En el inductor V adelanta 90° a I (ELI)." },
      { q: "En un capacitor, la corriente respecto de la tensión:",
        opts: ["Atrasa 90°", "Adelanta 90°", "En fase", "Adelanta 45°"],
        a: 1, exp: "En el capacitor I adelanta 90° a V (ICE)." },
      { q: "En un RLC serie, la impedancia es:",
        opts: ["\\(R+X_L+X_C\\)", "\\(\\sqrt{R^2+(X_L-X_C)^2}\\)", "\\(R\\cdot X_L\\)", "\\(X_L-X_C\\)"],
        a: 1, exp: "\\(Z=\\sqrt{R^2+(X_L-X_C)^2}\\)." },
      { q: "En resonancia (\\(X_L=X_C\\)), la impedancia es:",
        opts: ["Máxima", "Igual a R (mínima)", "Cero", "Infinita"],
        a: 1, exp: "Se cancelan las reactancias: \\(Z=R\\), mínima." },
      { q: "El factor de potencia es:",
        opts: ["\\(\\sin\\theta\\)", "\\(\\cos\\theta=P/S\\)", "\\(VI\\)", "\\(\\tan\\theta\\)"],
        a: 1, exp: "\\(\\text{FP}=\\cos\\theta=P/S\\)." },
      { q: "Si \\(220\\,\\text{V}\\) es el valor rms, el pico es aprox.:",
        opts: ["\\(155\\,\\text{V}\\)", "\\(311\\,\\text{V}\\)", "\\(220\\,\\text{V}\\)", "\\(440\\,\\text{V}\\)"],
        a: 1, exp: "\\(V_m=V_{rms}\\sqrt2=220\\cdot1{,}414\\approx311\\,\\text{V}\\)." },
      { q: "La frecuencia de resonancia es:",
        opts: ["\\(f_0=2\\pi\\sqrt{LC}\\)", "\\(f_0=\\dfrac{1}{2\\pi\\sqrt{LC}}\\)", "\\(f_0=\\dfrac{1}{LC}\\)", "\\(f_0=\\sqrt{LC}\\)"],
        a: 1, exp: "\\(f_0=\\dfrac{1}{2\\pi\\sqrt{LC}}\\)." },
    ],
    cards: [
      { q: "Onda senoidal", a: "\\(v=V_m\\sin(\\omega t+\\phi)\\), con \\(\\omega=2\\pi f\\), \\(f=1/T\\)." },
      { q: "Valor rms (eficaz)", a: "\\(V_{rms}=\\dfrac{V_m}{\\sqrt2}\\approx0{,}707V_m\\)." },
      { q: "Promedio de una senoide", a: "Cero en un ciclo completo." },
      { q: "Reactancia inductiva", a: "\\(X_L=\\omega L=2\\pi f L\\); crece con f." },
      { q: "Reactancia capacitiva", a: "\\(X_C=\\dfrac{1}{2\\pi f C}\\); baja con f." },
      { q: "ELI the ICE man", a: "En L: E adelanta a I. En C: I adelanta a E." },
      { q: "Impedancia RLC serie", a: "\\(Z=\\sqrt{R^2+(X_L-X_C)^2}\\), \\(\\theta=\\arctan\\frac{X_L-X_C}{R}\\)." },
      { q: "Resonancia", a: "\\(X_L=X_C\\Rightarrow Z=R\\); \\(f_0=\\dfrac{1}{2\\pi\\sqrt{LC}}\\)." },
      { q: "Potencias en CA", a: "Activa \\(P=VI\\cos\\theta\\) (W); reactiva \\(Q=VI\\sin\\theta\\) (VAR); aparente \\(S=VI\\) (VA)." },
      { q: "Factor de potencia", a: "\\(\\text{FP}=\\cos\\theta=P/S\\)." },
    ]
  }

  ],

  /* ===================================================================
     PRÁCTICA — ejercicios resueltos
     =================================================================== */
  practica: [
    {
      id: "tp-cd",
      glyph: "Ω",
      unit: "ohm",
      title: "Práctica 1 · Circuitos de corriente continua",
      desc: "Ley de Ohm, potencia, serie, paralelo y serie-paralelo con soluciones paso a paso.",
      exercises: [
        { q: "Una resistencia de \\(220\\,\\Omega\\) se conecta a \\(11\\,\\text{V}\\). Hallá la corriente y la potencia disipada.",
          sol: "\\(I=\\dfrac{V}{R}=\\dfrac{11}{220}=0{,}05\\,\\text{A}=50\\,\\text{mA}\\).<br>\\(P=VI=11\\cdot0{,}05=0{,}55\\,\\text{W}\\) (o \\(I^2R=0{,}05^2\\cdot220=0{,}55\\,\\text{W}\\))." },
        { q: "Tres resistencias de \\(10\\,\\Omega\\), \\(20\\,\\Omega\\) y \\(30\\,\\Omega\\) en serie con \\(E=120\\,\\text{V}\\). Hallá \\(R_T\\), \\(I\\) y la tensión sobre cada una.",
          sol: "\\(R_T=10+20+30=60\\,\\Omega\\).<br>\\(I=\\dfrac{120}{60}=2\\,\\text{A}\\) (igual en todas).<br>\\(V_1=2\\cdot10=20\\,\\text{V}\\), \\(V_2=2\\cdot20=40\\,\\text{V}\\), \\(V_3=2\\cdot30=60\\,\\text{V}\\). Verificación: \\(20+40+60=120\\,\\text{V}=E\\). ✓" },
        { q: "Dos resistencias de \\(6\\,\\Omega\\) y \\(3\\,\\Omega\\) en paralelo alimentadas con \\(E=12\\,\\text{V}\\). Hallá \\(R_T\\), \\(I_T\\) y la corriente de cada rama.",
          sol: "\\(R_T=\\dfrac{6\\cdot3}{6+3}=\\dfrac{18}{9}=2\\,\\Omega\\).<br>\\(I_T=\\dfrac{12}{2}=6\\,\\text{A}\\).<br>El voltaje es común (12 V): \\(I_{6}=\\dfrac{12}{6}=2\\,\\text{A}\\), \\(I_{3}=\\dfrac{12}{3}=4\\,\\text{A}\\). Verificación: \\(2+4=6\\,\\text{A}=I_T\\). ✓" },
        { q: "Aplicá el divisor de tensión: \\(E=24\\,\\text{V}\\), \\(R_1=1\\,\\text{k}\\Omega\\), \\(R_2=3\\,\\text{k}\\Omega\\) en serie. Hallá \\(V_2\\).",
          sol: "\\(R_T=1+3=4\\,\\text{k}\\Omega\\).<br>\\(V_2=E\\dfrac{R_2}{R_T}=24\\cdot\\dfrac{3}{4}=18\\,\\text{V}\\)." },
        { q: "Una estufa de \\(2000\\,\\text{W}\\) funciona \\(3\\) horas por día durante \\(30\\) días. Si el kWh cuesta $50, ¿cuánto se gasta?",
          sol: "Energía diaria: \\(\\dfrac{2000\\cdot3}{1000}=6\\,\\text{kWh}\\).<br>Mensual: \\(6\\cdot30=180\\,\\text{kWh}\\).<br>Costo: \\(180\\cdot50=\\$9000\\)." },
        { q: "Divisor de corriente: \\(I_T=9\\,\\text{A}\\) entra a dos ramas \\(R_1=2\\,\\Omega\\) y \\(R_2=4\\,\\Omega\\). Hallá \\(I_1\\) e \\(I_2\\).",
          sol: "\\(I_1=I_T\\dfrac{R_2}{R_1+R_2}=9\\cdot\\dfrac{4}{6}=6\\,\\text{A}\\).<br>\\(I_2=I_T\\dfrac{R_1}{R_1+R_2}=9\\cdot\\dfrac{2}{6}=3\\,\\text{A}\\). Por la rama de menor R (2 Ω) circula más corriente. ✓" },
      ]
    },
    {
      id: "tp-ca",
      glyph: "∿",
      unit: "ca",
      title: "Práctica 2 · Corriente alterna y reactancias",
      desc: "Valor rms, reactancias, impedancia y resonancia con soluciones paso a paso.",
      exercises: [
        { q: "Una tensión senoidal tiene pico \\(V_m=170\\,\\text{V}\\) y frecuencia \\(60\\,\\text{Hz}\\). Hallá \\(V_{rms}\\) y el período \\(T\\).",
          sol: "\\(V_{rms}=\\dfrac{170}{\\sqrt2}\\approx120\\,\\text{V}\\).<br>\\(T=\\dfrac{1}{f}=\\dfrac{1}{60}\\approx16{,}7\\,\\text{ms}\\)." },
        { q: "Hallá la reactancia de un inductor de \\(L=0{,}1\\,\\text{H}\\) a \\(50\\,\\text{Hz}\\).",
          sol: "\\(X_L=2\\pi f L=2\\pi\\cdot50\\cdot0{,}1\\approx31{,}4\\,\\Omega\\)." },
        { q: "Hallá la reactancia de un capacitor de \\(C=10\\,\\mu\\text{F}\\) a \\(60\\,\\text{Hz}\\).",
          sol: "\\(X_C=\\dfrac{1}{2\\pi f C}=\\dfrac{1}{2\\pi\\cdot60\\cdot10\\times10^{-6}}\\approx265\\,\\Omega\\)." },
        { q: "Un circuito RLC serie tiene \\(R=30\\,\\Omega\\), \\(X_L=70\\,\\Omega\\) y \\(X_C=30\\,\\Omega\\). Hallá la impedancia \\(Z\\) y el ángulo \\(\\theta\\).",
          sol: "\\(X_L-X_C=70-30=40\\,\\Omega\\).<br>\\(Z=\\sqrt{30^2+40^2}=\\sqrt{900+1600}=\\sqrt{2500}=50\\,\\Omega\\).<br>\\(\\theta=\\arctan\\dfrac{40}{30}=\\arctan1{,}33\\approx53{,}1^\\circ\\) (inductivo, V adelanta)." },
        { q: "Hallá la frecuencia de resonancia de un circuito con \\(L=1\\,\\text{mH}\\) y \\(C=1\\,\\mu\\text{F}\\).",
          sol: "\\(f_0=\\dfrac{1}{2\\pi\\sqrt{LC}}=\\dfrac{1}{2\\pi\\sqrt{10^{-3}\\cdot10^{-6}}}=\\dfrac{1}{2\\pi\\sqrt{10^{-9}}}\\approx5033\\,\\text{Hz}\\approx5{,}03\\,\\text{kHz}\\)." },
        { q: "Una carga consume \\(P=800\\,\\text{W}\\) con tensión \\(V=200\\,\\text{V}\\) y corriente \\(I=5\\,\\text{A}\\). Hallá la potencia aparente \\(S\\) y el factor de potencia.",
          sol: "\\(S=VI=200\\cdot5=1000\\,\\text{VA}\\).<br>\\(\\text{FP}=\\cos\\theta=\\dfrac{P}{S}=\\dfrac{800}{1000}=0{,}8\\) (es decir \\(\\theta\\approx36{,}9^\\circ\\))." },
      ]
    }
  ]
};
