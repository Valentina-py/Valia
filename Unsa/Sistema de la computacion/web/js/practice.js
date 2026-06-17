window.APP_DATA.practica.push({
  id: "tp01",
  unit: "intro",
  glyph: "01",
  title: "TP01 · Introducción a los Sistemas de Computación",
  desc: "Supercomputadoras del mundo y argentinas, y comparación de arquitecturas x86, ARM y AVR.",
  exercises: [
    {
      q: `<p>Indicá, para las tres supercomputadoras más potentes del ranking TOP500, su rendimiento aproximado (Rmax), país y tecnología principal: <strong>El Capitán</strong>, <strong>Frontier</strong> y <strong>Summit</strong>.</p>`,
      sol: `<p>El rendimiento se mide en <strong>FLOPS</strong> (operaciones de punto flotante por segundo); 1 PFLOPS = \\(10^{15}\\) FLOPS.</p>
<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Nombre</th><th>Año</th><th>País</th><th>Rmax aprox.</th><th>Tecnología</th></tr></thead>
<tbody>
<tr><td>El Capitán</td><td>2024</td><td>EE.UU. (LLNL)</td><td>~1.742 PFLOPS</td><td>HPE Cray, AMD EPYC + Instinct MI300A</td></tr>
<tr><td>Frontier</td><td>2022</td><td>EE.UU. (Oak Ridge)</td><td>~1.353 PFLOPS</td><td>HPE Cray + AMD, refrigerado por agua</td></tr>
<tr><td>Summit</td><td>2018</td><td>EE.UU. (Oak Ridge)</td><td>~0.200 PFLOPS (200 PFLOPS pico)</td><td>IBM Power System AC922 + GPU NVIDIA Volta</td></tr>
</tbody>
</table>
</div>
<p>Conclusión: <strong>El Capitán</strong> es, a la fecha, la más potente del mundo; supera el umbral de <strong>1 ExaFLOPS</strong> (\\(10^{18}\\) FLOPS) de rendimiento sostenido, al igual que Frontier y Aurora.</p>`
    },
    {
      q: `<p>Completá los datos técnicos principales de la supercomputadora argentina más potente: <strong>Clementina XXI</strong>. Indicá año, institución, rendimiento y procesadores.</p>`,
      sol: `<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Dato</th><th>Valor</th></tr></thead>
<tbody>
<tr><td>Año</td><td>2023</td></tr>
<tr><td>Institución</td><td>Servicio Meteorológico Nacional</td></tr>
<tr><td>Rendimiento</td><td>15,7 PFLOPS (peta-FLOPS)</td></tr>
<tr><td>Procesadores</td><td>5.120 núcleos Intel Xeon CPU Max + 37.888 núcleos Intel Data Center GPU Max</td></tr>
<tr><td>Costo aprox.</td><td>US$ 5 millones</td></tr>
</tbody>
</table>
</div>
<p>Ubicación en el ranking: figura entre las <strong>100 supercomputadoras más potentes del mundo</strong>. Antecesoras argentinas: Clementina (1961, primera científica del país), Tupac (2015), Huayra Muyu (2018, 340 TFLOPS) y Serafín (2021).</p>`
    },
    {
      q: `<p>Compará las arquitecturas <strong>x86</strong>, <strong>ARM</strong> y <strong>AVR</strong>: enfoque de diseño (RISC/CISC), tipo de computadoras donde se usan y un ejemplo de fabricante.</p>`,
      sol: `<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Arquitectura</th><th>Enfoque</th><th>Se implementa en…</th><th>Fabricantes</th></tr></thead>
<tbody>
<tr><td>x86 / x86-64</td><td>CISC</td><td>PC, notebooks, servidores, supercomputadoras</td><td>Intel, AMD</td></tr>
<tr><td>ARM</td><td>RISC</td><td>Smartphones, tablets, embebidos, servidores y Apple Silicon</td><td>ARM Holdings (licencia: Apple, Qualcomm, Samsung)</td></tr>
<tr><td>AVR</td><td>RISC</td><td>Microcontroladores, placas Arduino, electrónica embebida</td><td>Microchip (ex Atmel)</td></tr>
</tbody>
</table>
</div>
<p>Claves para recordar: <strong>x86 es CISC</strong> (instrucciones complejas de longitud variable); <strong>ARM y AVR son RISC</strong> (instrucciones simples de longitud fija, acceso a memoria solo con Load/Store). AVR usa arquitectura <strong>Harvard</strong> (memoria de programa y de datos separadas), típica de microcontroladores.</p>`
    }
  ]
});

window.APP_DATA.practica.push({
  id: "tp02",
  unit: "datos",
  glyph: "02",
  title: "TP02 · Representación de números",
  desc: "Conversión de bases, complementos, punto fijo con signo, suma en Ca2, IEEE 754 y códigos (BCD, Gray, ASCII).",
  exercises: [
    {
      q: `<p>Convertí a binario natural el número hexadecimal <strong>\\((12{,}31)_{16}\\)</strong> y el octal <strong>\\((12{,}31)_{8}\\)</strong>, usando el método más directo en cada caso.</p>`,
      sol: `<p><strong>Método:</strong> cada dígito hexadecimal equivale a 4 bits y cada dígito octal a 3 bits. La coma fraccionaria se respeta.</p>
<p><strong>a) \\((12{,}31)_{16}\\)</strong> — cada dígito a 4 bits:</p>
<pre class="code">1 → 0001    2 → 0010    .    3 → 0011    1 → 0001
(12,31)16 = (0001 0010 , 0011 0001)2 = (10010,00110001)2</pre>
<p><strong>b) \\((12{,}31)_{8}\\)</strong> — cada dígito a 3 bits:</p>
<pre class="code">1 → 001    2 → 010    .    3 → 011    1 → 001
(12,31)8 = (001 010 , 011 001)2 = (1010,011001)2</pre>
<p>Quitando ceros no significativos a la izquierda de la parte entera: \\((12{,}31)_{16}=(10010{,}00110001)_2\\) y \\((12{,}31)_{8}=(1010{,}011001)_2\\).</p>`
    },
    {
      q: `<p>Pasá el binario <strong>\\((10{,}011)_2\\)</strong> a octal, a hexadecimal y a decimal.</p>`,
      sol: `<p><strong>A octal:</strong> agrupar de a 3 bits desde la coma (rellenar con ceros en los extremos).</p>
<pre class="code">parte entera: 10 → 010 = 2
parte fracc.: 011 → 011 = 3
(10,011)2 = (2,3)8</pre>
<p><strong>A hexadecimal:</strong> agrupar de a 4 bits desde la coma.</p>
<pre class="code">parte entera: 10 → 0010 = 2
parte fracc.: 011 → 0110 = 6
(10,011)2 = (2,6)16</pre>
<p><strong>A decimal:</strong> sumar los pesos de las posiciones con 1.</p>
<pre class="code">10,011 = 1·2¹ + 0·2⁰ + 0·2⁻¹ + 1·2⁻² + 1·2⁻³
       = 2 + 0,25 + 0,125 = 2,375</pre>
<p>Resultado: \\((10{,}011)_2 = (2{,}3)_8 = (2{,}6)_{16} = (2{,}375)_{10}\\).</p>`
    },
    {
      q: `<p>Hallá el <strong>complemento restringido (Ca1)</strong> y el <strong>complemento auténtico (Ca2)</strong> del número binario \\((10101110)_2\\).</p>`,
      sol: `<p><strong>Complemento restringido (a 1):</strong> se invierte cada bit.</p>
<pre class="code">N    = 1010 1110
Ca1  = 0101 0001   (cada 0→1 y cada 1→0)</pre>
<p><strong>Complemento auténtico (a 2):</strong> es el Ca1 + 1.</p>
<pre class="code">Ca1  = 0101 0001
+1   =         1
Ca2  = 0101 0010</pre>
<p>Verificación: \\(N + Ca2 = 10101110 + 01010010 = 1\\,00000000\\) (descartando el acarreo final queda 0), confirmando que Ca2 es el negativo de N en módulo \\(2^8\\).</p>`
    },
    {
      q: `<p>Representá los enteros decimales <strong>+34</strong>, <strong>0</strong> y <strong>−102</strong> en registros de <strong>8 bits</strong>, usando Magnitud con signo (MS), Complemento a 1 con signo (Ca1) y Complemento a 2 con signo (Ca2).</p>`,
      sol: `<p>El bit más significativo es el <strong>signo</strong> (0 = positivo, 1 = negativo). Para positivos las tres representaciones coinciden.</p>
<p><strong>+34</strong> → \\(34 = (0100010)_2\\), con signo: <code>0 0100010</code> = <code>00100010</code> en MS, Ca1 y Ca2.</p>
<p><strong>0</strong> → <code>00000000</code> en las tres (el cero positivo).</p>
<p><strong>−102</strong> → magnitud \\(102 = (1100110)_2\\):</p>
<pre class="code">MS : 1 1100110 = 1110 0110   (signo 1 + magnitud)
Ca1: invertir los bits de +102 (0110 0110) → 1001 1001
Ca2: Ca1 + 1 = 1001 1001 + 1 = 1001 1010</pre>
<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Decimal</th><th>MS</th><th>Ca1</th><th>Ca2</th></tr></thead>
<tbody>
<tr><td>+34</td><td>00100010</td><td>00100010</td><td>00100010</td></tr>
<tr><td>0</td><td>00000000</td><td>00000000</td><td>00000000</td></tr>
<tr><td>−102</td><td>11100110</td><td>10011001</td><td>10011010</td></tr>
</tbody>
</table>
</div>`
    },
    {
      q: `<p>Resolvé en <strong>Ca2 con signo de 8 bits</strong> las sumas: a) \\((+28)+(-20)\\) y b) \\((-13)+(-44)\\). Indicá el resultado decimal.</p>`,
      sol: `<p><strong>a) (+28) + (−20)</strong></p>
<pre class="code">+28 =  0001 1100
+20 =  0001 0100  →  −20 en Ca2 = 1110 1011 + 1 = 1110 1100

   0001 1100
 + 1110 1100
 -----------
 1 0000 1000   (se descarta el acarreo de salida)
   0000 1000 = +8</pre>
<p>Resultado: <strong>+8</strong>. Correcto (28 − 20 = 8).</p>
<p><strong>b) (−13) + (−44)</strong></p>
<pre class="code">+13 = 0000 1101 → −13 = 1111 0010 + 1 = 1111 0011
+44 = 0010 1100 → −44 = 1101 0011 + 1 = 1101 0100

   1111 0011
 + 1101 0100
 -----------
 1 1100 0111   (se descarta el acarreo)
   1100 0111  → negativo (bit signo 1)</pre>
<p>Para leerlo: \\(Ca2(1100\\,0111)= 0011\\,1000+1 = 0011\\,1001 = 57\\). Resultado: <strong>−57</strong>. Correcto (−13 − 44 = −57). No hay desbordamiento porque −57 entra en el rango \\([-128,127]\\).</p>`
    },
    {
      q: `<p>Representá \\((-13{,}44 \\times 10^{6})_{10}\\) según la norma <strong>IEEE 754 de simple precisión</strong> (32 bits).</p>`,
      sol: `<p>El número es \\(-13{,}44\\times10^6 = -13\\,440\\,000\\). Formato IEEE 754 simple: 1 bit de signo, 8 de exponente (exceso 127) y 23 de mantisa.</p>
<p><strong>1) Signo:</strong> negativo → \\(S=1\\).</p>
<p><strong>2) A binario.</strong> Parte entera \\(13\\,440\\,000\\):</p>
<pre class="code">13 440 000 = 1100 1101 0001 0010 1000 0000 (en binario)</pre>
<p><strong>3) Normalizar</strong> a la forma \\(1{,}M \\times 2^{E}\\). El bit más significativo está en la posición 23 (\\(2^{23}=8\\,388\\,608\\le 13\\,440\\,000 &lt; 2^{24}\\)):</p>
<pre class="code">13 440 000 = 1,1001101000100101 × 2²³</pre>
<p><strong>4) Exponente sesgado:</strong> \\(E = 23 + 127 = 150 = (1001\\,0110)_2\\).</p>
<p><strong>5) Mantisa</strong> (los 23 bits a la derecha de la coma, rellenando con ceros):</p>
<pre class="code">M = 100 1101 0001 0010 1000 0000</pre>
<p><strong>Resultado (32 bits):</strong></p>
<pre class="code">S  exponente   mantisa
1  10010110    10011010001001010000000
= 1100 1011 0100 1101 0001 0010 1000 0000
= C B 4 D 1 2 8 0 (hex)</pre>`
    },
    {
      q: `<p>Codificá el decimal <strong>(798)\\(_{10}\\)</strong> en <strong>BCD Natural</strong> y en <strong>BCD Exceso-3</strong>.</p>`,
      sol: `<p><strong>BCD Natural (8421):</strong> cada dígito decimal se escribe con 4 bits de su valor binario.</p>
<pre class="code">7 → 0111    9 → 1001    8 → 1000
(798)10 = 0111 1001 1000  (BCD natural)</pre>
<p><strong>BCD Exceso-3:</strong> a cada dígito se le suma 3 antes de pasarlo a binario de 4 bits.</p>
<pre class="code">7+3 = 10 → 1010
9+3 = 12 → 1100
8+3 = 11 → 1011
(798)10 = 1010 1100 1011  (Exceso-3)</pre>`
    }
  ]
});

window.APP_DATA.practica.push({
  id: "tp03",
  unit: "datos",
  glyph: "03",
  title: "TP03 · Circuitos combinacionales",
  desc: "Funciones lógicas mínimas, Karnaugh, NAND/NOR universales, multiplexores y diseño de una ALU de 1 bit.",
  exercises: [
    {
      q: `<p>Una <strong>función de mayoría de 3 variables</strong> \\(M(A,B,C)\\) vale 1 cuando hay más unos que ceros en las entradas. Escribí su tabla de verdad, minimizala con un mapa de Karnaugh y dibujá la expresión final.</p>`,
      sol: `<p><strong>Tabla de verdad</strong> (sale 1 cuando hay 2 o 3 unos):</p>
<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>A</th><th>B</th><th>C</th><th>M</th></tr></thead>
<tbody>
<tr><td>0</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>0</td><td>0</td><td>1</td><td>0</td></tr>
<tr><td>0</td><td>1</td><td>0</td><td>0</td></tr>
<tr><td>0</td><td>1</td><td>1</td><td>1</td></tr>
<tr><td>1</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>1</td><td>0</td><td>1</td><td>1</td></tr>
<tr><td>1</td><td>1</td><td>0</td><td>1</td></tr>
<tr><td>1</td><td>1</td><td>1</td><td>1</td></tr>
</tbody>
</table>
</div>
<p><strong>Karnaugh:</strong> los unos se agrupan en tres pares adyacentes, dando:</p>
<pre class="code">M = AB + AC + BC</pre>
<p>Es la suma de los productos de cada par de variables. El circuito mínimo usa tres AND de 2 entradas y una OR de 3 entradas.</p>`
    },
    {
      q: `<p>Un sistema de alarma tiene 3 sensores: dos ventanas \\(V_1, V_2\\) y una puerta \\(P\\) (1 = abierta). La alarma \\(F\\) se activa cuando <strong>alguna ventana está abierta y la puerta está cerrada</strong>. Hallá la función mínima.</p>`,
      sol: `<p>Condición: (\\(V_1\\) abierta O \\(V_2\\) abierta) Y (puerta cerrada, es decir \\(P=0\\)).</p>
<pre class="code">F = (V1 + V2) · P̄</pre>
<p><strong>Tabla de verdad</strong> (F=1 solo cuando P=0 y al menos una ventana es 1):</p>
<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>V1</th><th>V2</th><th>P</th><th>F</th></tr></thead>
<tbody>
<tr><td>0</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>0</td><td>1</td><td>0</td><td>1</td></tr>
<tr><td>1</td><td>0</td><td>0</td><td>1</td></tr>
<tr><td>1</td><td>1</td><td>0</td><td>1</td></tr>
<tr><td>x</td><td>x</td><td>1</td><td>0</td></tr>
</tbody>
</table>
</div>
<p>La expresión mínima es \\(F = (V_1+V_2)\\,\\overline{P}\\): una OR de las ventanas, una negación de la puerta y una AND final.</p>`
    },
    {
      q: `<p>Expresá la función \\(F = AB + AC + BC\\) (mayoría de 3 variables) usando <strong>solo compuertas NAND</strong>. Justificá por qué NAND es universal.</p>`,
      sol: `<p>La NAND es <strong>universal</strong> porque permite construir NOT, AND y OR, y con ellas cualquier función. Aplicando el teorema de De Morgan a la suma de productos:</p>
<pre class="code">F = AB + AC + BC
Doble negación: F = ‾(‾(AB + AC + BC))
De Morgan:      F = ‾( ‾(AB) · ‾(AC) · ‾(BC) )</pre>
<p>Cada término \\(\\overline{AB}\\), \\(\\overline{AC}\\), \\(\\overline{BC}\\) es una NAND de 2 entradas, y la combinación final \\(\\overline{(\\cdot)\\cdot(\\cdot)\\cdot(\\cdot)}\\) es otra NAND de 3 entradas:</p>
<pre class="code">n1 = NAND(A,B)
n2 = NAND(A,C)
n3 = NAND(B,C)
F  = NAND(n1, n2, n3)</pre>
<p>Es decir, una SOP se implementa con dos niveles de NAND. (De forma dual, una POS se implementa con dos niveles de NOR.)</p>`
    },
    {
      q: `<p>Implementá la función \\(F(A,B,C)=\\sum m(1,2,4,7)\\) usando un <strong>multiplexor 8:1</strong> y, de forma más económica, con un <strong>MUX 4:1</strong>.</p>`,
      sol: `<p><strong>Con MUX 8:1:</strong> las variables \\(A,B,C\\) van a las líneas de selección \\(S_2 S_1 S_0\\). Cada entrada de datos \\(I_k\\) se fija al valor de F en ese mintérmino:</p>
<pre class="code">I0=0  I1=1  I2=1  I3=0  I4=1  I5=0  I6=0  I7=1
(unos en los mintérminos 1,2,4,7)</pre>
<p><strong>Con MUX 4:1:</strong> usamos \\(A,B\\) en selección y expresamos cada entrada en función de \\(C\\):</p>
<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>A B</th><th>mintérminos</th><th>F en función de C</th></tr></thead>
<tbody>
<tr><td>0 0</td><td>m0=0, m1=1</td><td>I0 = C</td></tr>
<tr><td>0 1</td><td>m2=1, m3=0</td><td>I1 = C̄</td></tr>
<tr><td>1 0</td><td>m4=1, m5=0</td><td>I2 = C̄</td></tr>
<tr><td>1 1</td><td>m6=0, m7=1</td><td>I3 = C</td></tr>
</tbody>
</table>
</div>
<p>Conectando \\(I_0=C,\\ I_1=\\overline C,\\ I_2=\\overline C,\\ I_3=C\\), un único inversor y un MUX 4:1 realizan la función.</p>`
    },
    {
      q: `<p>Diseñá la <strong>parte aritmética de una ALU de 1 bit</strong> que sume dos bits \\(A\\) y \\(B\\) con un acarreo de entrada \\(C_{in}\\). Indicá las ecuaciones de la suma \\(S\\) y del acarreo \\(C_{out}\\) (sumador completo).</p>`,
      sol: `<p>Un <strong>sumador completo</strong> (full adder) tiene entradas \\(A, B, C_{in}\\) y salidas \\(S\\) (suma) y \\(C_{out}\\) (acarreo). Tabla de verdad:</p>
<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>A</th><th>B</th><th>Cin</th><th>S</th><th>Cout</th></tr></thead>
<tbody>
<tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td></tr>
<tr><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td></tr>
<tr><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
<tr><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td></tr>
<tr><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td></tr>
<tr><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td></tr>
<tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
</tbody>
</table>
</div>
<p>Ecuaciones mínimas:</p>
<pre class="code">S    = A ⊕ B ⊕ Cin
Cout = AB + Cin·(A ⊕ B)</pre>
<p>Se construye con dos semisumadores (cada uno una XOR + una AND) y una OR para el acarreo. Encadenando \\(n\\) sumadores completos (acarreo en serie) se obtiene la unidad aritmética de \\(n\\) bits; las líneas de selección \\(S_2 S_1 S_0\\) eligen, mediante un MUX, entre la salida aritmética y la lógica (AND/OR/XOR/NOT).</p>`
    }
  ]
});

window.APP_DATA.practica.push({
  id: "tp04",
  unit: "datos",
  glyph: "04",
  title: "TP04 · Circuitos secuenciales y memorias",
  desc: "Biestables JK, contadores módulo-n, número de estados según tipo y cálculo de buses en CI de memoria.",
  exercises: [
    {
      q: `<p>Para el <strong>biestable (flip-flop) JK</strong>, completá la tabla de función y deducí la ecuación característica \\(Q^{+}\\) (estado siguiente) en función de \\(J\\), \\(K\\) y \\(Q\\).</p>`,
      sol: `<p>Tabla de función del JK (con flanco de reloj activo):</p>
<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>J</th><th>K</th><th>Q⁺</th><th>Acción</th></tr></thead>
<tbody>
<tr><td>0</td><td>0</td><td>Q</td><td>Memoria (sin cambio)</td></tr>
<tr><td>0</td><td>1</td><td>0</td><td>Reset</td></tr>
<tr><td>1</td><td>0</td><td>1</td><td>Set</td></tr>
<tr><td>1</td><td>1</td><td>Q̄</td><td>Toggle (conmuta)</td></tr>
</tbody>
</table>
</div>
<p>Desarrollando los cuatro casos sobre las variables \\(J,K,Q\\) y minimizando con Karnaugh se obtiene la <strong>ecuación característica</strong>:</p>
<pre class="code">Q⁺ = J·Q̄ + K̄·Q</pre>
<p>El JK no tiene estado prohibido (a diferencia del SR): con \\(J=K=1\\) realiza la conmutación, lo que lo hace ideal para contadores.</p>`
    },
    {
      q: `<p>Si \\(n\\) es la cantidad de flip-flops usados, ¿cuántos estados distintos tiene la secuencia para un <strong>contador binario</strong>, un <strong>contador de anillo</strong> y un <strong>contador de anillo trenzado (Johnson)</strong>?</p>`,
      sol: `<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Tipo de contador</th><th>Nº de estados</th><th>Con n=4</th></tr></thead>
<tbody>
<tr><td>Binario (asíncrono o síncrono)</td><td>\\(2^{n}\\)</td><td>16</td></tr>
<tr><td>De anillo</td><td>\\(n\\)</td><td>4</td></tr>
<tr><td>De anillo trenzado (Johnson)</td><td>\\(2n\\)</td><td>8</td></tr>
</tbody>
</table>
</div>
<p>El binario aprovecha todas las combinaciones (\\(2^n\\)); el de anillo hace circular un único 1 entre \\(n\\) flip-flops; el Johnson realimenta la salida <em>negada</em>, duplicando la longitud a \\(2n\\) estados con la misma cantidad de FF.</p>`
    },
    {
      q: `<p>Diseñá conceptualmente un <strong>contador binario asíncrono Módulo 12 ascendente</strong>. ¿Cuántos flip-flops necesita y cómo se fuerza el reinicio al llegar a 12?</p>`,
      sol: `<p>Necesitamos \\(n\\) FF tales que \\(2^{n} \\ge 12\\). Con \\(n=3\\) solo llegamos a 8; con \\(n=4\\) llegamos a 16, así que se usan <strong>4 flip-flops</strong> tipo T/JK en modo toggle (cada salida actúa de reloj del siguiente).</p>
<p>Un Mod-16 cuenta de 0000 a 1111. Para un Mod-12 (cuenta de 0 a 11 y vuelve a 0), hay que <strong>detectar el estado 12</strong> y borrar el contador:</p>
<pre class="code">12 = 1100 (binario)
Se detecta con una NAND de las salidas que valen 1 en 1100:  Q3 y Q2
CLEAR = NAND(Q3, Q2)   → activa el reset asíncrono al alcanzar 1100</pre>
<p>Así, en cuanto el contador llega a 1100 (12) se autoborra a 0000, recorriendo 12 estados (0…11).</p>`
    },
    {
      q: `<p>Un CI de RAM tiene capacidad <strong>512K × 8</strong>. Indicá cuántas líneas tiene su <strong>bus de datos</strong> y su <strong>bus de direcciones</strong>.</p>`,
      sol: `<p>La notación "512K × 8" significa: <strong>512K posiciones</strong> de memoria, cada una de <strong>8 bits</strong>.</p>
<p><strong>Bus de datos:</strong> el ancho de cada palabra → <strong>8 líneas</strong>.</p>
<p><strong>Bus de direcciones:</strong> debe poder seleccionar 512K posiciones.</p>
<pre class="code">512K = 512 × 1024 = 2⁹ × 2¹⁰ = 2¹⁹ posiciones
líneas de dirección = 19</pre>
<p>Resultado: <strong>8 líneas de datos</strong> y <strong>19 líneas de direcciones</strong> (\\(A_0\\) a \\(A_{18}\\)).</p>`
    },
    {
      q: `<p>Con CI de RAM de <strong>512K × 8</strong> se quiere construir una memoria de <strong>2M × 32</strong>. Calculá la cantidad de chips necesarios y las líneas de los buses de datos y direcciones de la memoria final.</p>`,
      sol: `<p><strong>Expansión en ancho de palabra</strong> (de 8 a 32 bits): \\(32/8 = 4\\) chips en paralelo por fila.</p>
<p><strong>Expansión en cantidad de palabras</strong> (de 512K a 2M):</p>
<pre class="code">2M / 512K = (2 × 2²⁰) / (512 × 2¹⁰) = 2²¹ / 2¹⁹ = 4 filas (bancos)</pre>
<p><strong>Total de chips:</strong> \\(4 \\text{ (ancho)} \\times 4 \\text{ (bancos)} = \\mathbf{16}\\) CI.</p>
<p><strong>Bus de datos final:</strong> 32 líneas (\\(D_0\\)…\\(D_{31}\\)).</p>
<p><strong>Bus de direcciones final:</strong> \\(2M = 2^{21}\\) posiciones → <strong>21 líneas</strong> (\\(A_0\\)…\\(A_{20}\\)). De ellas, 19 van a cada chip y las 2 superiores (\\(A_{20},A_{19}\\)) entran a un <strong>decodificador 2:4</strong> que selecciona uno de los 4 bancos.</p>`
    }
  ]
});

window.APP_DATA.practica.push({
  id: "tp05",
  unit: "organizacion",
  glyph: "05",
  title: "TP05 · Organización de la CPU",
  desc: "Rendimiento del data path en MIPS, tamaño del decodificador, formato de instrucción y dimensionamiento de buses.",
  exercises: [
    {
      q: `<p>En el data path de una CPU, cargar los registros de entrada de la ALU toma <strong>5 ns</strong>, ejecutar la operación en la ALU toma <strong>10 ns</strong> y almacenar el resultado toma <strong>5 ns</strong>. Sin pipeline, ¿cuántos <strong>MIPS</strong> como máximo puede ejecutar?</p>`,
      sol: `<p>Sin segmentación (pipeline), una instrucción debe recorrer las tres etapas en serie:</p>
<pre class="code">t_instrucción = 5 ns + 10 ns + 5 ns = 20 ns = 20 × 10⁻⁹ s</pre>
<p>Instrucciones por segundo:</p>
<pre class="code">f = 1 / 20 ns = 1 / (20 × 10⁻⁹) = 50 × 10⁶ = 50 000 000 instr/s</pre>
<p>Expresado en millones de instrucciones por segundo:</p>
<pre class="code">50 × 10⁶ instr/s = 50 MIPS</pre>
<p>Resultado: <strong>50 MIPS</strong>. (Con pipeline ideal de 3 etapas, el cuello de botella sería la etapa más lenta de 10 ns, permitiendo hasta 100 MIPS.)</p>`
    },
    {
      q: `<p>Si el conjunto de instrucciones de una CPU tuviera <strong>23 instrucciones</strong>, ¿qué dimensiones (entradas × salidas) tendría el <strong>decodificador</strong> que selecciona la operación en el paso de decodificación?</p>`,
      sol: `<p>El decodificador recibe el <strong>opcode</strong> codificado en binario y activa una línea por cada instrucción posible.</p>
<p><strong>Entradas:</strong> bits necesarios para codificar 23 opcodes distintos.</p>
<pre class="code">2⁴ = 16 < 23 ≤ 32 = 2⁵   ⇒   se necesitan 5 bits</pre>
<p><strong>Salidas:</strong> una línea por instrucción. Un decodificador de 5 entradas genera \\(2^5 = 32\\) salidas; se usan 23 y quedan 9 sin utilizar.</p>
<p>Resultado: un <strong>decodificador 5:32</strong> (5 líneas de entrada, 32 de salida, de las que 23 corresponden a instrucciones válidas).</p>`
    },
    {
      q: `<p>Una computadora usa memoria de <strong>2048K palabras de 32 bits</strong>. Cada instrucción ocupa una palabra y tiene 4 campos: 1 bit de tipo de direccionamiento, el código de operación, un campo para seleccionar 1 de <strong>64 registros</strong> y el resto para la dirección de memoria. Dibujá el formato y dimensioná los buses.</p>`,
      sol: `<p><strong>Bus de direcciones:</strong> \\(2048K = 2^{11} \\times 2^{10} = 2^{21}\\) palabras → <strong>21 bits</strong>.</p>
<p><strong>Bus de datos:</strong> ancho de palabra → <strong>32 bits</strong>.</p>
<p><strong>Campo de registro:</strong> \\(64 = 2^{6}\\) → <strong>6 bits</strong>.</p>
<p><strong>Campo de direccionamiento:</strong> 1 bit (dado).</p>
<p>La instrucción tiene 32 bits en total, por lo que el <strong>opcode</strong> ocupa lo restante:</p>
<pre class="code">opcode = 32 − (1 + 6 + 21) = 4 bits</pre>
<p>Formato de la instrucción (32 bits):</p>
<pre class="code">┌──────┬────────┬───────────┬────────────────────────┐
│ modo │ opcode │ registro  │      dirección         │
│ 1 bit│ 4 bits │  6 bits   │       21 bits          │
└──────┴────────┴───────────┴────────────────────────┘</pre>
<p>Con 4 bits de opcode pueden codificarse hasta \\(2^4=16\\) instrucciones.</p>`
    },
    {
      q: `<p>Dos computadoras C1 y C2 ejecutan toda instrucción en <strong>10 ns</strong> y <strong>5 ns</strong> respectivamente. ¿Se puede afirmar con certeza que C2 es más rápida?</p>`,
      sol: `<p><strong>No necesariamente.</strong> El tiempo por instrucción es solo uno de los factores del rendimiento. El tiempo total de un programa es:</p>
<pre class="code">T = (Nº de instrucciones) × (CPI) × (tiempo de ciclo)</pre>
<p>C2 tiene menor tiempo por instrucción, pero podría necesitar <strong>más instrucciones</strong> para realizar la misma tarea (por ejemplo, si es RISC y C1 es CISC con instrucciones más potentes). Si C2 requiere el doble de instrucciones que C1, ambas tardarían lo mismo.</p>
<p>Conclusión: para comparar el rendimiento real hay que considerar el <strong>conjunto de instrucciones</strong> y la cantidad de instrucciones del programa, no solo el tiempo de una instrucción aislada. La métrica correcta es el tiempo de ejecución de un programa representativo (benchmark).</p>`
    }
  ]
});

window.APP_DATA.practica.push({
  id: "tp06",
  unit: "avanzadas",
  glyph: "06",
  title: "TP06 · Arquitecturas avanzadas: Cloud Computing",
  desc: "Definición de la nube, modelos de servicio NIST (IaaS/PaaS/SaaS), modelos de despliegue y selección de escenarios.",
  exercises: [
    {
      q: `<p>Definí <strong>Computación en la Nube</strong> y explicá su diferencia principal frente a tener la tecnología "en casa", usando la analogía de "alquilar en lugar de comprar".</p>`,
      sol: `<p>La <strong>computación en la nube</strong> es el suministro de recursos informáticos (servidores, almacenamiento, bases de datos, redes, software) <strong>bajo demanda a través de Internet</strong>, pagando solo por lo que se usa.</p>
<p><strong>Analogía alquilar vs comprar:</strong> tener la tecnología "en casa" (on-premise) es como <em>comprar</em> un auto: pagás todo por adelantado, te ocupás del mantenimiento, y queda inutilizado cuando no lo usás. La nube es como <em>alquilar</em>: usás el recurso cuando lo necesitás, no inmovilizás capital, y el proveedor se encarga del mantenimiento, las actualizaciones y la disponibilidad.</p>
<p><strong>Diferencia clave:</strong> en on-premise el costo es de inversión inicial (CAPEX) y la capacidad es fija; en la nube el costo es operativo (OPEX) y la capacidad es elástica.</p>`
    },
    {
      q: `<p>Explicá los <strong>tres modelos de servicio definidos por el NIST</strong>: IaaS, PaaS y SaaS. Indicá qué ofrece cada uno, quién administra qué, y un ejemplo real.</p>`,
      sol: `<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Modelo</th><th>Qué ofrece</th><th>El usuario administra…</th><th>Ejemplo</th></tr></thead>
<tbody>
<tr><td><strong>IaaS</strong> (Infraestructura)</td><td>Máquinas virtuales, almacenamiento, redes</td><td>SO, middleware y aplicaciones</td><td>Amazon EC2, Azure VMs</td></tr>
<tr><td><strong>PaaS</strong> (Plataforma)</td><td>Entorno listo para desarrollar y desplegar apps</td><td>Solo el código y los datos de la app</td><td>Google App Engine, Heroku</td></tr>
<tr><td><strong>SaaS</strong> (Software)</td><td>Aplicación completa lista para usar por Internet</td><td>Nada (solo usa el software)</td><td>Gmail, Office 365, Dropbox</td></tr>
</tbody>
</table>
</div>
<p>La regla práctica: a medida que se sube de IaaS a SaaS, <strong>el proveedor administra cada vez más</strong> y el usuario cada vez menos. En IaaS controlás el sistema operativo; en SaaS solo usás la aplicación desde el navegador.</p>`
    },
    {
      q: `<p>Describí los tres <strong>modelos de despliegue</strong> de la nube (pública, privada e híbrida): quién la opera y para quién está reservada.</p>`,
      sol: `<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Modelo</th><th>Operada por</th><th>Para quién</th><th>Característica</th></tr></thead>
<tbody>
<tr><td><strong>Pública</strong></td><td>Un proveedor externo (AWS, Azure, GCP)</td><td>Compartida por muchos clientes</td><td>Bajo costo, gran escalabilidad, menor control</td></tr>
<tr><td><strong>Privada</strong></td><td>La propia organización (o un tercero dedicado)</td><td>Una única organización</td><td>Máximo control y seguridad, mayor costo</td></tr>
<tr><td><strong>Híbrida</strong></td><td>Combinación de pública + privada</td><td>Mixto, según el tipo de dato</td><td>Datos sensibles en privada, picos de carga en pública</td></tr>
</tbody>
</table>
</div>
<p>La <strong>ventaja de la híbrida</strong> es combinar la seguridad/control de la privada con la escalabilidad y el bajo costo de la pública: se puede mantener lo crítico "en casa" y derivar a la nube pública la demanda variable.</p>`
    },
    {
      q: `<p>Indicá qué <strong>modelo de despliegue</strong> conviene en cada escenario y justificá: a) una empresa pequeña que necesita lanzar una app web rápido y barato; b) una agencia gubernamental con datos muy sensibles; c) una empresa con sistemas antiguos "en casa" que quiere absorber picos de demanda.</p>`,
      sol: `<p><strong>a) Empresa pequeña, lanzamiento rápido y barato → Nube Pública.</strong> No requiere inversión inicial en hardware, paga por uso, escala al instante y delega el mantenimiento al proveedor. Ideal para bajo costo y rapidez (incluso PaaS sobre nube pública).</p>
<p><strong>b) Agencia gubernamental con datos confidenciales → Nube Privada.</strong> Prioriza el control total, el cumplimiento normativo y la seguridad. La infraestructura queda reservada exclusivamente al organismo, sin compartir recursos con terceros.</p>
<p><strong>c) Sistemas antiguos en casa + picos inesperados → Nube Híbrida.</strong> Mantiene los sistemas heredados en su infraestructura privada y usa la nube pública para escalar (cloud bursting) cuando la demanda supera la capacidad local, sin migrar todo.</p>`
    }
  ]
});

window.APP_DATA.practica.push({
  id: "tp07",
  unit: "so",
  glyph: "07",
  title: "TP07 · Sistemas Operativos: CPU y memoria",
  desc: "Planificación FIFO/SJF/Round Robin con diagramas de Gantt y métricas, mapa de bits, paginación y traducción de direcciones.",
  exercises: [
    {
      q: `<p>Dados los procesos de la tabla, esquematizá la ejecución con <strong>FIFO</strong> y con <strong>SJF (no apropiativo)</strong> mediante diagramas de Gantt, y calculá el <strong>tiempo de espera promedio</strong> de cada política.</p>
<div class="tbl-wrap"><table class="tbl tbl--left">
<thead><tr><th>Proceso</th><th>Llegada</th><th>CPU</th></tr></thead>
<tbody>
<tr><td>A</td><td>0</td><td>2</td></tr>
<tr><td>B</td><td>0</td><td>1</td></tr>
<tr><td>C</td><td>1</td><td>2</td></tr>
<tr><td>D</td><td>2</td><td>5</td></tr>
<tr><td>E</td><td>6</td><td>1</td></tr>
</tbody></table></div>`,
      sol: `<p><strong>FIFO</strong> (orden de llegada; con empate A antes que B):</p>
<pre class="code">| A  | B | C  |   D     | E |
0    2   3    5         10  11</pre>
<p>Tiempo de espera = (inicio − llegada):</p>
<pre class="code">A: 0−0=0   B: 2−0=2   C: 3−1=2   D: 5−2=3   E: 10−6=4
Espera promedio = (0+2+2+3+4)/5 = 11/5 = 2,2</pre>
<p><strong>SJF no apropiativo</strong> (en cada decisión elige el de menor ráfaga entre los llegados):</p>
<pre class="code">t0: llegan A(2),B(1) → elige B
t1: B termina; llegan A(2),C(2),D(5) → elige A (empate, llegó antes)
t3: elige C(2)
t5: queda D(5)
t10: llega E(1) ya esperando → E
| B | A  | C  |   D     | E |
0   1   3    5         10  11</pre>
<pre class="code">B: 0−0=0   A: 1−0=1   C: 3−1=2   D: 5−2=3   E: 10−6=4
Espera promedio = (0+1+2+3+4)/5 = 10/5 = 2,0</pre>
<p><strong>SJF (2,0) mejora a FIFO (2,2)</strong>: priorizar los procesos cortos reduce la espera media. Cambios de contexto: 4 en ambos (5 procesos, sin apropiación).</p>`
    },
    {
      q: `<p>Con la misma tabla del ejercicio anterior, esquematizá la ejecución con <strong>Round Robin (Q = 2)</strong> mediante un diagrama de Gantt e indicá los cambios de contexto.</p>`,
      sol: `<p>Round Robin con quantum <strong>Q = 2</strong>. Cola de listos por orden de llegada; al agotar el quantum el proceso vuelve al final.</p>
<pre class="code">Restos iniciales: A=2 B=1 C=2 D=5 E=1 (E llega en t=6)

t0  A usa 2 → A termina (A=0)            [0-2]
t2  B usa 1 → B termina (B=0)            [2-3]
t3  C usa 2 → C termina (C=0)            [3-5]
t5  D usa 2 → D=3, vuelve a la cola      [5-7]   (E llega en t6, entra a la cola)
t7  E usa 1 → E termina (E=0)            [7-8]
t8  D usa 2 → D=1, vuelve a la cola      [8-10]
t10 D usa 1 → D termina (D=0)            [10-11]

| A  | B | C  | D  | E | D  | D|
0    2   3    5    7   8   10  11</pre>
<p><strong>Cambios de contexto:</strong> se produce uno cada vez que la CPU pasa de un proceso a otro. En la secuencia A→B→C→D→E→D→D hay <strong>6 conmutaciones</strong> (una más que en FIFO/SJF, por el fraccionamiento de D). RR mejora el tiempo de respuesta a costa de más cambios de contexto.</p>`
    },
    {
      q: `<p>Una RAM de <strong>2 MB</strong> tiene cargado el SO (100 KB) y se administra con bloques fijos de <strong>16 KB</strong>, registrados en un <strong>mapa de bits</strong>. a) ¿Qué tamaño en bytes tiene el mapa de bits? b) Para un proceso de <strong>202 KB</strong>, ¿cuántos bloques y bits ocupa, y cuánta fragmentación interna genera?</p>`,
      sol: `<p><strong>a) Tamaño del mapa de bits.</strong> Cantidad de bloques en 2 MB:</p>
<pre class="code">2 MB / 16 KB = (2 × 1024 KB) / 16 KB = 2048 / 16 = 128 bloques</pre>
<p>El mapa usa 1 bit por bloque → 128 bits:</p>
<pre class="code">128 bits / 8 = 16 bytes</pre>
<p><strong>b) Proceso de 202 KB.</strong> Bloques necesarios (redondeo hacia arriba):</p>
<pre class="code">202 KB / 16 KB = 12,625 → 13 bloques (13 bits en el mapa)
Espacio asignado = 13 × 16 KB = 208 KB</pre>
<p><strong>Fragmentación interna</strong> (espacio asignado y no usado en el último bloque):</p>
<pre class="code">208 KB − 202 KB = 6 KB</pre>
<p>Resultado: el mapa de bits ocupa <strong>16 bytes</strong>; el proceso usa <strong>13 bloques</strong> (13 bits) y genera <strong>6 KB</strong> de fragmentación interna.</p>`
    },
    {
      q: `<p>Una memoria virtual tiene <strong>64 páginas de 32 KB</strong> y la física <strong>8 marcos</strong>. a) Tamaño de cada memoria. b) ¿Qué nº de página y desplazamiento tiene la dirección virtual <strong>240.300</strong>? c) Si esa página está en el marco 2, ¿cuál es su dirección física?</p>`,
      sol: `<p><strong>a) Tamaños:</strong></p>
<pre class="code">Memoria virtual = 64 páginas × 32 KB = 2048 KB = 2 MB
Memoria física  = 8 marcos × 32 KB  = 256 KB</pre>
<p><strong>b) Página y desplazamiento de la dirección 240300.</strong> Tamaño de página = 32 KB = 32768 bytes (\\(2^{15}\\)):</p>
<pre class="code">nº de página      = 240300 ÷ 32768 = 7  (cociente entero)
desplazamiento    = 240300 − 7×32768 = 240300 − 229376 = 10924</pre>
<p>Es decir, la dirección virtual 240300 corresponde a <strong>página 7, desplazamiento 10924</strong>.</p>
<p><strong>c) Dirección física</strong> (marco 2, mismo desplazamiento):</p>
<pre class="code">dir. física = marco × tamaño_página + desplazamiento
            = 2 × 32768 + 10924 = 65536 + 10924 = 76460</pre>
<p>Resultado: la dirección física es <strong>76460</strong>. (El desplazamiento dentro de la página no cambia al traducir; solo se sustituye el número de página por el de marco.)</p>`
    },
    {
      q: `<p>Una memoria de <strong>3 marcos</strong> recibe la serie de referencias de páginas: <strong>7, 0, 1, 2, 0, 3, 0, 4, 2, 3</strong>. Aplicá el algoritmo <strong>FIFO</strong> y contá la cantidad de <strong>fallos de página</strong>.</p>`,
      sol: `<p><strong>FIFO:</strong> se reemplaza la página que lleva más tiempo cargada. Cada vez que la página referida no está en memoria se produce un fallo (F).</p>
<div class="tbl-wrap">
<table class="tbl tbl--left">
<thead><tr><th>Ref.</th><th>Marco0</th><th>Marco1</th><th>Marco2</th><th>¿Fallo?</th></tr></thead>
<tbody>
<tr><td>7</td><td>7</td><td>-</td><td>-</td><td>F</td></tr>
<tr><td>0</td><td>7</td><td>0</td><td>-</td><td>F</td></tr>
<tr><td>1</td><td>7</td><td>0</td><td>1</td><td>F</td></tr>
<tr><td>2</td><td>2</td><td>0</td><td>1</td><td>F (sale 7)</td></tr>
<tr><td>0</td><td>2</td><td>0</td><td>1</td><td>—</td></tr>
<tr><td>3</td><td>2</td><td>3</td><td>1</td><td>F (sale 0)</td></tr>
<tr><td>0</td><td>2</td><td>3</td><td>0</td><td>F (sale 1)</td></tr>
<tr><td>4</td><td>4</td><td>3</td><td>0</td><td>F (sale 2)</td></tr>
<tr><td>2</td><td>4</td><td>2</td><td>0</td><td>F (sale 3)</td></tr>
<tr><td>3</td><td>4</td><td>2</td><td>3</td><td>F (sale 0)</td></tr>
</tbody>
</table>
</div>
<p>Total: <strong>9 fallos de página</strong> sobre 10 referencias (solo la 5.ª referencia, a la página 0, fue acierto). FIFO es simple pero puede sufrir la <strong>anomalía de Belady</strong> (más marcos no siempre implican menos fallos).</p>`
    },
    {
      q: `<p>Memoria segmentada con la tabla de segmentos siguiente. Calculá la <strong>dirección física</strong> de las direcciones segmentadas (segmento, desplazamiento): (4, 92), (1, 10) y (2, 50). Detectá si alguna provoca error.</p>
<div class="tbl-wrap"><table class="tbl tbl--left">
<thead><tr><th>Seg.</th><th>Base</th><th>Límite</th></tr></thead>
<tbody>
<tr><td>0</td><td>219</td><td>600</td></tr>
<tr><td>1</td><td>2300</td><td>14</td></tr>
<tr><td>2</td><td>90</td><td>100</td></tr>
<tr><td>3</td><td>1327</td><td>580</td></tr>
<tr><td>4</td><td>1952</td><td>96</td></tr>
</tbody></table></div>`,
      sol: `<p>En segmentación: <strong>dirección física = Base(seg) + desplazamiento</strong>, válida solo si <strong>desplazamiento &lt; Límite</strong> (si no, hay violación de segmento / error).</p>
<p><strong>(4, 92):</strong> límite del segmento 4 = 96. Como \\(92 &lt; 96\\), es válida.</p>
<pre class="code">dir. física = 1952 + 92 = 2044</pre>
<p><strong>(1, 10):</strong> límite del segmento 1 = 14. Como \\(10 &lt; 14\\), es válida.</p>
<pre class="code">dir. física = 2300 + 10 = 2310</pre>
<p><strong>(2, 50):</strong> límite del segmento 2 = 100. Como \\(50 &lt; 100\\), es válida.</p>
<pre class="code">dir. física = 90 + 50 = 140</pre>
<p>Resultados: \\((4,92)\\to 2044\\), \\((1,10)\\to 2310\\), \\((2,50)\\to 140\\). Las tres son válidas porque su desplazamiento no supera el límite del segmento; una dirección como \\((1, 20)\\) sí daría error porque \\(20 &gt; 14\\).</p>`
    }
  ]
});
