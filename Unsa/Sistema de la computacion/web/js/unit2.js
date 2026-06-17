window.APP_DATA.units.push({
  id: "datos",
  glyph: "01",
  title: "Representación de Datos y Circuitos Digitales",
  desc: "Sistemas de numeración, enteros con signo, IEEE 754, códigos, álgebra de Boole y circuitos combinacionales/secuenciales.",
  tool: "bases",
  html: `
    <p class="lead">Toda la información dentro de una computadora se reduce a <strong>dos estados</strong> (0 y 1). En esta unidad vemos cómo representar números, texto y datos con esos bits, cómo opera la aritmética binaria y cómo se construyen los circuitos lógicos —combinacionales y secuenciales— que dan vida al hardware.</p>

    <div class="callout tip"><strong class="callout__tag">Practicá</strong> A lo largo de la unidad hay herramientas interactivas: <a href="#/tool/bases">conversor de bases</a>, <a href="#/tool/enteros">enteros con signo</a>, <a href="#/tool/ieee754">IEEE 754</a>, <a href="#/tool/boole">álgebra de Boole</a>, <a href="#/tool/karnaugh">mapas de Karnaugh</a> y <a href="#/tool/codigos">códigos</a>.</div>

    <h2>A. Representación de datos</h2>

    <h3>A.1 Sistemas de numeración</h3>
    <p>Un sistema posicional queda definido por una <strong>base</strong> \\( \\beta \\) y un conjunto de símbolos \\( C \\). El valor de cada dígito depende de su posición.</p>
    <div class="tbl-wrap"><table class="tbl tbl--left">
      <thead><tr><th>Sistema</th><th>Base \\( \\beta \\)</th><th>Símbolos \\( C \\)</th></tr></thead>
      <tbody>
        <tr><td>Decimal</td><td>10</td><td>0,1,2,3,4,5,6,7,8,9</td></tr>
        <tr><td>Binario</td><td>2</td><td>0,1</td></tr>
        <tr><td>Octal</td><td>8</td><td>0..7</td></tr>
        <tr><td>Hexadecimal</td><td>16</td><td>0..9, A,B,C,D,E,F</td></tr>
      </tbody>
    </table></div>
    <p>Octal y hexadecimal son <em>sistemas intermedios</em> para manejar binario de forma compacta: <strong>1 dígito octal = 3 bits</strong> y <strong>1 dígito hexadecimal = 4 bits</strong>.</p>

    <h3>A.2 Conversiones</h3>
    <h4>A decimal (suma ponderada)</h4>
    <p>Cada dígito se multiplica por la base elevada a su posición y se suman. A la izquierda del punto las posiciones son \\(0,1,2,\\dots\\); a la derecha \\(-1,-2,-3,\\dots\\).</p>
    <p>Ejemplo \\( 1011{,}1_2 \\):</p>
    <p>$$ 1\\times2^{3}+0\\times2^{2}+1\\times2^{1}+1\\times2^{0}+1\\times2^{-1}=8+0+2+1+0{,}5=11{,}5_{10} $$</p>

    <h4>De decimal a otra base</h4>
    <ul>
      <li><strong>Parte entera</strong>: división reiterada por la base; los restos se leen de <em>abajo hacia arriba</em>.</li>
      <li><strong>Parte fraccionaria</strong>: multiplicación reiterada por la base; las partes enteras se leen de <em>arriba hacia abajo</em>.</li>
    </ul>
    <pre class="code">25 / 2 = 12  resto 1   ↑
12 / 2 =  6  resto 0   |  se lee
 6 / 2 =  3  resto 0   |  hacia
 3 / 2 =  1  resto 1   |  arriba
 1 / 2 =  0  resto 1   ↑
25(10) = 11001(2)</pre>

    <h4>Binario ↔ octal / hexadecimal (método directo)</h4>
    <p>Se agrupan los bits <strong>desde el punto hacia afuera</strong>: de a 3 para octal, de a 4 para hexadecimal, completando con ceros el último grupo.</p>
    <pre class="code">1011110(2) -> octal:  001 011 110 = 136(8)
1011110(2) -> hex:    0101 1110   = 5E(16)</pre>
    <div class="callout tip"><strong class="callout__tag">Herramienta</strong> Probá todas estas conversiones en el <a href="#/tool/bases">conversor de bases</a>.</div>

    <h3>A.3 Aritmética binaria</h3>
    <p>Suma bit a bit: \\(0+0=0\\), \\(0+1=1\\), \\(1+0=1\\), \\(1+1=10\\) (escribe 0 y lleva 1). La resta usa préstamos análogos al decimal.</p>
    <pre class="code">  1 0 1 1   (11)
+ 0 1 1 0   ( 6)
---------
1 0 0 0 1   (17)</pre>

    <h3>A.4 Enteros con signo (n bits)</h3>
    <p>Sin signo el rango es \\( 0 \\le N \\le 2^{n}-1 \\). Para representar negativos existen tres convenios:</p>

    <h4>Magnitud y Signo (MS)</h4>
    <p>El bit más significativo es el <strong>signo</strong> (0 = +, 1 = −) y el resto es la magnitud. Rango \\( [-(2^{n-1}-1),\\,+(2^{n-1}-1)] \\). Tiene <strong>doble representación del 0</strong> (+0 y −0).</p>

    <h4>Complemento a 1 (Ca1, restringido)</h4>
    <p>Los positivos se escriben igual que en MS; los negativos se obtienen <strong>invirtiendo todos los bits</strong>. Mismo rango que MS y también <strong>doble 0</strong>.</p>
    <p>Ejemplo \\(n=4\\): \\(+5 = 0101\\), \\(-5 = 1010\\).</p>

    <h4>Complemento a 2 (Ca2, auténtico)</h4>
    <p>Los negativos se obtienen como <strong>Ca1 + 1</strong> (o desde la derecha: copiar hasta el primer 1 inclusive y complementar el resto). Rango <strong>asimétrico</strong> \\( [-2^{n-1},\\,+(2^{n-1}-1)] \\) y <strong>representación única del 0</strong>.</p>
    <p>Ejemplo \\(n=4\\): \\(+7 = 0111\\), \\(-7 = 1001\\).</p>
    <div class="tbl-wrap"><table class="tbl tbl--left">
      <thead><tr><th>Binario (n=4)</th><th>Ca2</th></tr></thead>
      <tbody>
        <tr><td>0111</td><td class="v-true">+7</td></tr>
        <tr><td>0001</td><td class="v-true">+1</td></tr>
        <tr><td>0000</td><td>0</td></tr>
        <tr><td>1111</td><td class="v-false">−1</td></tr>
        <tr><td>1000</td><td class="v-false">−8</td></tr>
      </tbody>
    </table></div>

    <h3>A.5 Operaciones con complementos</h3>
    <ul>
      <li><strong>Suma en Ca1</strong>: siempre se suma y el acarreo final se <strong>recircula</strong> (se vuelve a sumar al resultado).</li>
      <li><strong>Suma en Ca2</strong>: el acarreo de salida del bit más significativo se <strong>descarta</strong>.</li>
      <li><strong>Overflow (desbordamiento)</strong>: ocurre cuando los dos sumandos tienen el <em>mismo signo</em> y el resultado tiene signo distinto.</li>
    </ul>
    <pre class="code">Ca2 (n=4):
  0100 (+4)
+ 1101 (−3)
------
1 0001 -> descarto acarreo -> 0001 = +1  OK

  1100 (−4)
+ 1011 (−5)
------
1 0111 -> 0111 = +7  ¡OVERFLOW! (− + − dio +)</pre>
    <div class="callout tip"><strong class="callout__tag">Herramienta</strong> Convertí y sumá en MS, Ca1 y Ca2 en la herramienta de <a href="#/tool/enteros">enteros con signo</a>.</div>

    <h3>A.6 Punto fijo y punto flotante</h3>
    <ul>
      <li><strong>Punto fijo</strong>: la coma ocupa una posición fija. Simple, pero poco práctico para números muy grandes o muy pequeños.</li>
      <li><strong>Punto flotante</strong>: \\( N = M \\times b^{ex} \\), con mantisa \\(M\\) normalizada (\\(1 \\le |M| < base\\)) y exponente \\(ex\\). Permite un rango enorme con precisión relativa.</li>
    </ul>

    <h3>A.7 Norma IEEE 754</h3>
    <p>Estándar para representar reales en punto flotante.</p>
    <div class="tbl-wrap"><table class="tbl tbl--left">
      <thead><tr><th>Formato</th><th>Signo</th><th>Exponente</th><th>Mantisa</th><th>Exceso</th></tr></thead>
      <tbody>
        <tr><td>Simple precisión (32 bits)</td><td>1</td><td>8</td><td>23</td><td>127</td></tr>
        <tr><td>Doble precisión (64 bits)</td><td>1</td><td>11</td><td>52</td><td>1023</td></tr>
      </tbody>
    </table></div>
    <p>El signo: 0 = +, 1 = −. La mantisa se normaliza con un <strong>"1" implícito</strong> a la izquierda de la coma (no se almacena). El exponente se guarda en <strong>exceso 127</strong>: \\( exp_{almacenado} = exp_{real} + 127 \\) (almacenado \\(1..254\\), real \\(-126..+127\\)).</p>
    <p>Ejemplo \\(-25{,}148\\):</p>
    <ol>
      <li>A binario: \\(11001{,}0010\\dots\\)</li>
      <li>Normalizo: \\(1{,}10010010\\dots \\times 2^{4}\\)</li>
      <li>Exponente: \\(4 + 127 = 131 = 10000011\\)</li>
      <li>Signo: 1 (negativo)</li>
    </ol>
    <pre class="code">1 10000011 10010010000...   (signo | exp | mantisa)</pre>
    <div class="callout tip"><strong class="callout__tag">Herramienta</strong> Descomponé reales con el visor de <a href="#/tool/ieee754">IEEE 754</a>.</div>

    <h3>A.8 Códigos</h3>
    <div class="callout warn"><strong class="callout__tag">Ojo</strong> <strong>Codificar no es lo mismo que convertir.</strong> \\(94_{10}\\) en BCD natural es \\(1001\\;0100\\) (cada dígito por separado), pero convertido a binario natural es \\(1011110\\).</div>
    <p><strong>Ponderados</strong> (cada posición tiene un peso):</p>
    <ul>
      <li><strong>BCD natural (8-4-2-1)</strong>: el más usado; codifica cada dígito 0–9 en 4 bits.</li>
      <li><strong>BCD Aiken (2-4-2-1)</strong>: autocomplementario.</li>
      <li><strong>BCD 7-4-2-1</strong>.</li>
    </ul>
    <p><strong>Libres / no ponderados</strong>:</p>
    <ul>
      <li><strong>Exceso-3</strong>: se suma 3 al dígito BCD; autocomplementario; el 0 no es 0000 sino 0011.</li>
      <li><strong>Johnson</strong>: usa 5 bits para representar dígitos.</li>
    </ul>
    <p><strong>Progresivos</strong> (cambia un solo bit entre valores consecutivos):</p>
    <ul>
      <li><strong>Código Gray</strong> (no ponderado). Bin→Gray: el 1.er bit igual, el resto = XOR de bits binarios consecutivos. Gray→Bin: el 1.er bit igual, el resto = XOR del bit Gray con el bit binario ya obtenido.</li>
    </ul>
    <div class="tbl-wrap"><table class="tbl tbl--left">
      <thead><tr><th>Decimal</th><th>Binario</th><th>Gray</th></tr></thead>
      <tbody>
        <tr><td>0</td><td>000</td><td>000</td></tr>
        <tr><td>1</td><td>001</td><td>001</td></tr>
        <tr><td>2</td><td>010</td><td>011</td></tr>
        <tr><td>3</td><td>011</td><td>010</td></tr>
        <tr><td>4</td><td>100</td><td>110</td></tr>
      </tbody>
    </table></div>
    <p><strong>Detección / corrección de errores</strong>: bit de <strong>paridad</strong> (par o impar), código de <strong>Hamming</strong> (corrige 1 bit) y <strong>CRC</strong> (redundancia cíclica).</p>
    <p><strong>Alfanuméricos</strong>: <strong>ASCII</strong> 7 bits (128 caracteres: 0–31 control, 32 espacio, 48–57 dígitos, 65–90 'A'–'Z', 97–122 'a'–'z', 127 DEL), ASCII extendido 8 bits, <strong>EBCDIC</strong> (IBM) y <strong>Unicode/UTF</strong> (UTF-8/16/32, universal).</p>
    <div class="callout tip"><strong class="callout__tag">Herramienta</strong> Codificá en BCD, Exceso-3, Gray y ASCII en la herramienta de <a href="#/tool/codigos">códigos</a>.</div>

    <h2>B. Álgebra de Boole y compuertas</h2>

    <h3>B.1 Compuertas lógicas</h3>
    <p>Básicas: <strong>AND</strong> (\\(A\\cdot B\\)), <strong>OR</strong> (\\(A+B\\)), <strong>NOT</strong> (\\(\\overline{A}\\)). Derivadas: <strong>NAND</strong> (\\(\\overline{A\\cdot B}\\)), <strong>NOR</strong> (\\(\\overline{A+B}\\)), <strong>XOR</strong> (\\(A\\oplus B\\), vale 1 si son distintos), <strong>XNOR</strong> (\\(A\\odot B\\), vale 1 si son iguales).</p>
    <div class="callout def"><strong class="callout__tag">Universales</strong> Con solo compuertas <strong>NAND</strong> (o solo <strong>NOR</strong>) puede construirse cualquier función lógica.</div>
    <div class="tbl-wrap"><table class="tbl tbl--left">
      <thead><tr><th>A</th><th>B</th><th>AND</th><th>OR</th><th>NAND</th><th>NOR</th><th>XOR</th><th>XNOR</th></tr></thead>
      <tbody>
        <tr><td>0</td><td>0</td><td class="v-false">0</td><td class="v-false">0</td><td class="v-true">1</td><td class="v-true">1</td><td class="v-false">0</td><td class="v-true">1</td></tr>
        <tr><td>0</td><td>1</td><td class="v-false">0</td><td class="v-true">1</td><td class="v-true">1</td><td class="v-false">0</td><td class="v-true">1</td><td class="v-false">0</td></tr>
        <tr><td>1</td><td>0</td><td class="v-false">0</td><td class="v-true">1</td><td class="v-true">1</td><td class="v-false">0</td><td class="v-true">1</td><td class="v-false">0</td></tr>
        <tr><td>1</td><td>1</td><td class="v-true">1</td><td class="v-true">1</td><td class="v-false">0</td><td class="v-false">0</td><td class="v-false">0</td><td class="v-true">1</td></tr>
      </tbody>
    </table></div>

    <h3>B.2 Álgebra de Boole</h3>
    <p>Postulados: \\(A+0=A\\); \\(A\\cdot1=A\\); \\(A+1=1\\); \\(A\\cdot0=0\\); \\(A+A=A\\); \\(A\\cdot A=A\\); \\(A+\\overline{A}=1\\); \\(A\\cdot\\overline{A}=0\\); \\(\\overline{\\overline{A}}=A\\). Cumple conmutativa, asociativa y distributiva.</p>
    <p>Teoremas de absorción: \\(A+AB=A\\); \\(A+\\overline{A}B=A+B\\).</p>
    <div class="callout def"><strong class="callout__tag">De Morgan</strong> $$ \\overline{A+B}=\\overline{A}\\cdot\\overline{B} \\qquad \\overline{A\\cdot B}=\\overline{A}+\\overline{B} $$</div>

    <h3>B.3 Formas normales</h3>
    <ul>
      <li><strong>FND</strong> (Forma Normal Disyuntiva / <strong>Suma de Productos</strong> / mintérminos): OR de ANDs. Un mintérmino por cada fila con salida <strong>1</strong> (variable directa si vale 1, negada si vale 0).</li>
      <li><strong>FNC</strong> (Forma Normal Conjuntiva / <strong>Producto de Sumas</strong> / maxtérminos): AND de ORs. Un maxtérmino por cada fila con salida <strong>0</strong> (variable negada si vale 1, directa si vale 0).</li>
      <li><strong>Formas mínimas (SP / PS)</strong>: simplificación de FND/FNC por teoremas o mediante <strong>mapas de Karnaugh</strong> (las casillas se ordenan en código Gray y se agrupan los 1s en bloques de potencias de 2 lo más grandes posible).</li>
    </ul>
    <div class="callout tip"><strong class="callout__tag">Herramientas</strong> Simplificá expresiones en <a href="#/tool/boole">álgebra de Boole</a> y agrupá visualmente en <a href="#/tool/karnaugh">mapas de Karnaugh</a>.</div>

    <h3>B.4 Circuitos integrados (CI)</h3>
    <p>Pastilla de semiconductor (silicio). Encapsulados: DIP, PGA, LGA, BGA. Escalas de integración: <strong>SSI</strong> (≤10 puertas), <strong>MSI</strong> (≤100), <strong>LSI</strong> (≤1000), <strong>VLSI</strong> (&gt;1000).</p>

    <h2>C. Circuitos combinacionales</h2>
    <div class="callout def"><strong class="callout__tag">Definición</strong> Las salidas dependen <strong>solo</strong> del estado actual de las entradas (no tienen memoria).</div>
    <ul>
      <li><strong>Decodificador</strong>: \\(n\\) entradas y \\(m \\le 2^{n}\\) salidas; activa únicamente la salida correspondiente al código de entrada. Ej. 2 a 4: \\(D_0=\\overline{I_1}\\,\\overline{I_0}\\), \\(D_1=\\overline{I_1}I_0\\), \\(D_2=I_1\\overline{I_0}\\), \\(D_3=I_1 I_0\\).</li>
      <li><strong>Codificador</strong>: \\(m \\le 2^{n}\\) entradas y \\(n\\) salidas con el código de la entrada activa. Si pueden activarse dos a la vez se usa un codificador de <strong>prioridad</strong>.</li>
      <li><strong>Multiplexor (MUX)</strong>: selecciona 1 de \\(m\\) entradas hacia una salida usando \\(n\\) líneas de selección. MUX 2→1: \\(Y=\\overline{S}\\,I_0 + S\\,I_1\\).</li>
      <li><strong>Demultiplexor (DEMUX)</strong>: lleva 1 entrada hacia 1 de \\(m\\) salidas.</li>
      <li><strong>Comparador</strong>: \\(Z_{=}=\\overline{A}\\,\\overline{B}+A B\\) (XNOR), \\(Z_{<}=\\overline{A}B\\), \\(Z_{>}=A\\overline{B}\\).</li>
      <li><strong>Semisumador (Half-Adder)</strong>: \\(S=A\\oplus B\\), \\(C_{out}=A\\cdot B\\).</li>
      <li><strong>Sumador completo (Full-Adder)</strong>: \\(S=A\\oplus B\\oplus C_i\\), \\(C_{i+1}=A\\cdot B+(A\\oplus B)\\cdot C_i\\).</li>
      <li><strong>ALU</strong>: unidad aritmético-lógica; las líneas de control seleccionan la operación.</li>
      <li><strong>PLD</strong>: <strong>PROM</strong> (AND fija, OR programable), <strong>PAL</strong> (AND programable, OR fija), <strong>PLA</strong> (ambas programables). Evolución: GAL, CPLD, FPGA.</li>
    </ul>

    <h2>D. Circuitos secuenciales</h2>
    <div class="callout def"><strong class="callout__tag">Definición</strong> Las salidas dependen de las entradas <strong>y del estado actual</strong>. Son combinacional + memoria + <strong>reloj</strong>.</div>
    <p><strong>Reloj (clock)</strong>: señal periódica. Conceptos: flanco (transición), ciclo, periodo \\(T\\) y frecuencia \\( f = 1/T \\) (hertz). Puede ser activo por nivel o por flanco (subida/bajada).</p>

    <h3>D.1 Biestables (latches y flip-flops)</h3>
    <div class="tbl-wrap"><table class="tbl tbl--left">
      <thead><tr><th>Tipo</th><th>Entradas</th><th>Comportamiento</th><th>Ecuación</th></tr></thead>
      <tbody>
        <tr><td>Latch SR</td><td>S, R</td><td>00 mantiene · 01 reset(0) · 10 set(1) · 11 indeterminado</td><td>\\(Q^{+}=S+\\overline{R}\\,Q\\)</td></tr>
        <tr><td>FF D</td><td>D</td><td>copia D (elimina la ambigüedad)</td><td>\\(Q^{+}=D\\)</td></tr>
        <tr><td>FF JK</td><td>J, K</td><td>00 mantiene · 01 reset · 10 set · <strong>11 conmuta (toggle)</strong></td><td>\\(Q^{+}=J\\overline{Q}+\\overline{K}Q\\)</td></tr>
        <tr><td>FF T</td><td>T</td><td>T=1 conmuta · T=0 mantiene</td><td>\\(Q^{+}=T\\oplus Q\\)</td></tr>
      </tbody>
    </table></div>
    <div class="callout tip"><strong class="callout__tag">Latch vs Flip-Flop</strong> El <strong>latch</strong> es sensible al <em>nivel</em> del reloj; el <strong>flip-flop</strong> cambia solo en el <em>flanco</em>. Las entradas asíncronas <strong>PRESET</strong>/<strong>CLEAR</strong> fuerzan 1 o 0 de inmediato, independientes del reloj.</div>

    <h3>D.2 Registros</h3>
    <p>Conjunto de flip-flops (normalmente tipo D). Según cómo entran/salen los datos: <strong>SISO</strong> (serie-serie), <strong>SIPO</strong> (serie-paralelo), <strong>PISO</strong> (paralelo-serie) y <strong>PIPO</strong> (paralelo-paralelo). Los de desplazamiento mueven los bits con cada pulso de reloj.</p>

    <h3>D.3 Contadores</h3>
    <ul>
      <li><strong>Módulo M</strong> = número de estados; con \\(n\\) flip-flops y conteo binario completo \\(M = 2^{n}\\).</li>
      <li><strong>Asíncronos (de rizo / ripple)</strong>: cada FF recibe el reloj del anterior (más lentos por la propagación).</li>
      <li><strong>Síncronos</strong>: todos los FF comparten el mismo reloj (más rápidos).</li>
      <li><strong>Anillo</strong>: un único 1 circula entre los FF. <strong>Johnson / anillo trenzado</strong>: la salida negada del último realimenta al primero.</li>
      <li>Para módulo distinto de \\(2^{n}\\): se usa una NAND que detecta el estado de tope y activa el CLEAR para reiniciar.</li>
    </ul>

    <h2>E. Memorias</h2>
    <p>Latches, flip-flops y registros ya son memorias. Conceptos clave: celda, dirección, palabra, tiempo de acceso y volatilidad.</p>
    <p><strong>Jerarquía</strong> (de rápida/cara a lenta/barata): registros → caché L1/L2/L3 → RAM/ROM → disco/SSD → almacenamiento en red (SAN/NAS).</p>

    <h3>E.1 Cálculo de líneas</h3>
    <div class="callout def"><strong class="callout__tag">Fórmula</strong> Capacidad = nº de palabras × bits por palabra. Líneas de dirección \\(k\\): \\( 2^{k} = \\text{nº de palabras} \\Rightarrow k=\\log_2(\\text{palabras}) \\). Líneas de datos = bits por palabra.</div>
    <p>Ejemplos: una memoria <strong>256 × 8</strong> tiene 8 líneas de dirección (\\(2^{8}=256\\)) y 8 de datos. Una de <strong>1K palabras</strong> necesita 10 líneas de dirección (\\(2^{10}=1024\\)).</p>
    <p><strong>Expansión</strong>: en <em>palabra</em> (chips en paralelo para más bits por palabra) o en <em>capacidad</em> (apilar chips con un decodificador que use las direcciones altas).</p>

    <h3>E.2 Tipos</h3>
    <ul>
      <li><strong>RAM</strong> (volátil): <strong>SRAM</strong> (biestable, rápida, cara → caché) y <strong>DRAM</strong> (condensador, necesita refresco, barata y densa → memoria principal; DDR/DDR2…DDR5).</li>
      <li><strong>ROM</strong> (no volátil): de máscara (no reprogramable), <strong>PROM</strong> (grabable 1 vez), <strong>EPROM</strong> (se borra con luz UV), <strong>EEPROM</strong> (se borra eléctricamente byte a byte) y <strong>Flash</strong> (se borra eléctricamente por sector).</li>
      <li><strong>Firmware</strong>: <strong>BIOS</strong> / <strong>UEFI</strong>, con la rutina de arranque POST y el Setup.</li>
    </ul>
  `,
  quiz: [
    {
      q: "¿Cuál es el equivalente decimal del número binario 11001(2)?",
      opts: ["25", "26", "49", "21"],
      a: 0,
      exp: "16+8+0+0+1 = 25. Suma ponderada de las posiciones con 1."
    },
    {
      q: "En complemento a 2 con 4 bits, ¿cómo se representa el −7?",
      opts: ["1001", "0111", "1111", "1000"],
      a: 0,
      exp: "+7 = 0111; se invierte (1000) y se suma 1: 1001."
    },
    {
      q: "Con n bits sin signo, ¿cuál es el mayor valor representable?",
      opts: ["2^n − 1", "2^n", "2^(n-1) − 1", "2^(n-1)"],
      a: 0,
      exp: "Sin signo el rango es 0 a 2^n − 1."
    },
    {
      q: "¿Cuántos bits ocupa el exponente en IEEE 754 simple precisión y con qué exceso se almacena?",
      opts: ["8 bits, exceso 127", "11 bits, exceso 1023", "23 bits, exceso 127", "8 bits, exceso 128"],
      a: 0,
      exp: "Simple precisión: 1 signo + 8 exponente (exceso 127) + 23 mantisa."
    },
    {
      q: "Según el teorema de De Morgan, ¿a qué equivale la negación de (A·B)?",
      opts: ["Ā + B̄", "Ā · B̄", "A + B", "Ā · B"],
      a: 0,
      exp: "(A·B)' = Ā + B̄. La de un producto es la suma de las negadas."
    },
    {
      q: "Una compuerta cuya salida vale 1 solo cuando las entradas son distintas es la:",
      opts: ["XOR", "XNOR", "AND", "NOR"],
      a: 0,
      exp: "XOR (O exclusiva) = 1 si las entradas difieren. La XNOR es 1 si son iguales."
    },
    {
      q: "La FND (suma de productos) se construye tomando un término por cada fila cuya salida sea:",
      opts: ["1 (mintérminos)", "0 (maxtérminos)", "indeterminada", "cualquiera"],
      a: 0,
      exp: "FND = OR de mintérminos, uno por cada fila con salida 1. La FNC usa las filas con 0."
    },
    {
      q: "Un circuito que selecciona una de varias entradas hacia una única salida según líneas de selección es un:",
      opts: ["Multiplexor (MUX)", "Decodificador", "Demultiplexor", "Comparador"],
      a: 0,
      exp: "El MUX elige 1 de m entradas con n líneas de selección. El DEMUX hace lo inverso."
    },
    {
      q: "En un flip-flop JK, ¿qué ocurre cuando J=1 y K=1?",
      opts: ["Conmuta (toggle)", "Mantiene el estado", "Se pone en 0", "Queda indeterminado"],
      a: 0,
      exp: "JK con 1,1 conmuta la salida; eso resuelve la ambigüedad del latch SR (1,1)."
    },
    {
      q: "Una memoria de 1K palabras necesita ¿cuántas líneas de dirección?",
      opts: ["10", "8", "1024", "11"],
      a: 0,
      exp: "1K = 1024 = 2^10, por lo que k = log2(1024) = 10 líneas de dirección."
    },
    {
      q: "El código Gray se caracteriza porque entre dos valores consecutivos:",
      opts: ["cambia un solo bit", "cambian todos los bits", "es ponderado como el BCD", "se suma 3 a cada dígito"],
      a: 0,
      exp: "Gray es un código progresivo: solo un bit cambia entre valores consecutivos."
    },
    {
      q: "En la suma en complemento a 2, el acarreo de salida del bit más significativo se:",
      opts: ["descarta", "recircula sumándolo de nuevo", "convierte en el bit de signo", "usa para detectar overflow siempre"],
      a: 0,
      exp: "En Ca2 el acarreo final se descarta; recircularlo es propio de la suma en Ca1."
    }
  ],
  cards: [
    { q: "¿Cuántos bits representa un dígito octal y uno hexadecimal?", a: "Octal = 3 bits; hexadecimal = 4 bits." },
    { q: "¿Cómo se convierte la parte entera de decimal a binario?", a: "Por divisiones reiteradas entre 2; los restos se leen de abajo hacia arriba." },
    { q: "¿Qué representaciones de signo tienen doble representación del 0?", a: "Magnitud y Signo y Complemento a 1. El Complemento a 2 tiene un solo 0." },
    { q: "Rango de n bits en complemento a 2", a: "Asimétrico: de −2^(n-1) a +(2^(n-1) − 1)." },
    { q: "¿Cuándo hay overflow al sumar en complemento?", a: "Cuando los dos sumandos tienen el mismo signo y el resultado da el signo contrario." },
    { q: "Estructura de IEEE 754 simple precisión", a: "1 bit de signo + 8 de exponente (exceso 127) + 23 de mantisa, con un 1 implícito." },
    { q: "Diferencia entre codificar y convertir (ej. 94)", a: "94 en BCD = 1001 0100 (dígito a dígito); convertido a binario natural = 1011110." },
    { q: "¿Cuáles son las compuertas universales?", a: "NAND y NOR: con cualquiera de ellas se construyen todas las demás funciones." },
    { q: "¿Qué es un flip-flop frente a un latch?", a: "El flip-flop cambia solo en el flanco del reloj; el latch es sensible al nivel." },
    { q: "Fórmula de líneas de una memoria de 2^k palabras × b bits", a: "k líneas de dirección (2^k = nº de palabras) y b líneas de datos." }
  ]
});
