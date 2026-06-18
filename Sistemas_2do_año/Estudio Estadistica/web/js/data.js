/* ============================================================
   CONTENIDO DE ESTUDIO — Estadística Descriptiva
   Basado en los apuntes de la cátedra (UNSa / IES): Introducción,
   Presentación de datos, Medidas de posición y de dispersión.
   ============================================================ */
window.APP_DATA = {
  units: [

  /* ===================================================================
     UNIDAD 1 — INTRODUCCIÓN A LA ESTADÍSTICA
     =================================================================== */
  {
    id: "intro",
    glyph: "Σ",
    icon: "book",
    title: "Introducción a la Estadística",
    desc: "Qué es la estadística, descriptiva vs inferencial, población y muestra, variables y etapas de una investigación.",
    tool: null,
    html: `
      <p class="lead">La <strong>Estadística</strong> estudia los fenómenos de masa para hallar las regularidades del comportamiento colectivo, que sirven para <em>describir</em> el fenómeno y para hacer <em>predicciones</em>.</p>

      <div class="callout def">
        <strong class="callout__tag">Definición</strong>
        La estadística es la disciplina que estudia los métodos científicos para <strong>recoger, organizar, resumir y analizar</strong> datos, y para sacar <strong>conclusiones válidas</strong> y tomar <strong>decisiones</strong> razonables a partir de ese análisis.
      </div>

      <h2>Descriptiva e inferencial</h2>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Estadística descriptiva</th><th>Estadística inferencial</th></tr></thead>
        <tbody>
          <tr>
            <td>Describe las regularidades de un conjunto de datos (la <strong>muestra</strong>): recolección, resumen y presentación.</td>
            <td>Estima características de la <strong>población</strong> a partir de la muestra; permite hacer inferencias y predicciones.</td>
          </tr>
        </tbody>
      </table>
      </div>
      <div class="callout tip">
        <strong class="callout__tag">Ejemplo</strong>
        «El promedio del curso es 6,9» es <em>descriptivo</em>. «El promedio de todo el instituto es aproximadamente 7» es <em>inferencial</em> (se generaliza a la población).
      </div>

      <h2>Conceptos fundamentales</h2>
      <ul>
        <li><strong>Población:</strong> conjunto de individuos, objetos o datos de interés. Puede ser <em>finita</em> o <em>infinita</em>. Se define teniendo presente la homogeneidad, el espacio y el tiempo.</li>
        <li><strong>Muestra:</strong> subconjunto de la población, obtenido mediante una <em>técnica de muestreo</em>.</li>
        <li><strong>Unidad de observación:</strong> cada elemento de la población o muestra.</li>
        <li><strong>Variable:</strong> la característica que se mide en cada unidad de observación.</li>
        <li><strong>Parámetro / estadístico:</strong> un valor de la <em>población</em> es un <strong>parámetro</strong>; el mismo valor calculado en la <em>muestra</em> es un <strong>estadístico</strong>.</li>
      </ul>

      <h2>Tipos de variables</h2>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Tipo</th><th>Subtipo</th><th>Ejemplos</th></tr></thead>
        <tbody>
          <tr><td rowspan="2"><strong>Cualitativa</strong> (categorías)</td><td>Nominal (sin orden)</td><td>color, sexo, marca</td></tr>
          <tr><td>Ordinal (con orden)</td><td>nivel (B, MB, R), rango militar</td></tr>
          <tr><td rowspan="2"><strong>Cuantitativa</strong> (números)</td><td>Discreta (valores aislados)</td><td>nº de hermanos, nº de interrupciones</td></tr>
          <tr><td>Continua (cualquier valor en un intervalo)</td><td>peso, altura, tiempo</td></tr>
        </tbody>
      </table>
      </div>

      <h2>Etapas de una investigación estadística</h2>
      <ol>
        <li>Planteamiento del problema.</li>
        <li>Fijación de los objetivos.</li>
        <li>Definición de la unidad de observación y de la unidad de medida.</li>
        <li>Selección de la población o muestra.</li>
        <li>Recolección de los datos (mediante un <em>indicador</em>: encuesta, medición…).</li>
        <li>Organización de los datos.</li>
        <li>Análisis descriptivo.</li>
        <li>Análisis inferencial.</li>
        <li>Elaboración de conclusiones.</li>
      </ol>
    `,
    quiz: [
      { q: "Calcular «el promedio del curso» a partir de las notas observadas es estadística:",
        opts: ["inferencial", "descriptiva", "predictiva", "teórica"],
        a: 1, exp: "Describir un conjunto de datos observados es estadística descriptiva." },
      { q: "Un subconjunto de la población obtenido por muestreo se llama:",
        opts: ["parámetro", "muestra", "variable", "indicador"],
        a: 1, exp: "La muestra es un subconjunto representativo de la población." },
      { q: "El «número de hermanos» es una variable:",
        opts: ["cualitativa nominal", "cualitativa ordinal", "cuantitativa discreta", "cuantitativa continua"],
        a: 2, exp: "Toma valores numéricos aislados (0,1,2,…): es discreta." },
      { q: "El «color preferido de auto» es una variable:",
        opts: ["cuantitativa continua", "cualitativa nominal", "cualitativa ordinal", "cuantitativa discreta"],
        a: 1, exp: "Son categorías sin orden: cualitativa nominal." },
    ],
    cards: [
      { q: "¿Qué estudia la estadística?", a: "Métodos para recoger, organizar, resumir y analizar datos, y sacar conclusiones." },
      { q: "Descriptiva vs inferencial", a: "Descriptiva: describe la muestra. Inferencial: generaliza a la población." },
      { q: "Población vs muestra", a: "Población: todo el conjunto de interés. Muestra: un subconjunto." },
      { q: "Variable cualitativa vs cuantitativa", a: "Cualitativa: categorías (nominal/ordinal). Cuantitativa: números (discreta/continua)." },
      { q: "Parámetro vs estadístico", a: "Parámetro: valor de la población. Estadístico: valor de la muestra." },
      { q: "¿Qué es la unidad de observación?", a: "Cada elemento de la población o muestra que se estudia." },
      { q: "Nominal vs ordinal", a: "Nominal: categorías sin orden. Ordinal: categorías con un orden." },
      { q: "Discreta vs continua", a: "Discreta: valores aislados (se cuentan). Continua: cualquier valor de un intervalo (se mide)." },
      { q: "¿Qué es un indicador?", a: "El medio con el que se obtienen los datos (encuesta, medición, etc.)." },
    ]
  },

  /* ===================================================================
     UNIDAD 2 — RESUMEN Y PRESENTACIÓN DE DATOS
     =================================================================== */
  {
    id: "datos",
    glyph: "▦",
    icon: "ruler",
    title: "Resumen y Presentación de Datos",
    desc: "Combinación ordenada, tablas de frecuencias (fi, hi, acumuladas), intervalos de clase y gráficos.",
    tool: "frecuencias",
    html: `
      <p class="lead">Una vez recolectados, los datos se <strong>organizan</strong> y <strong>resumen</strong> para poder interpretarlos. Hay tres formas de presentarlos: <strong>texto</strong>, <strong>tablas</strong> y <strong>gráficos</strong>.</p>

      <h2>Organización: combinación ordenada</h2>
      <p>Consiste en disponer los datos en orden ascendente (o descendente). Sirve para identificar <strong>valores máximos y mínimos</strong>, <strong>baches</strong> y <strong>valores atípicos</strong>.</p>
      <div class="callout tip">
        <strong class="callout__tag">Ejemplo</strong>
        Latidos de 15 estudiantes, ordenados: 62, 64, 70, 76, 82, 82, 82, 85, 87, 91, 92, 94, 95, 95, 110. El menor es 62, el mayor 110 y el valor más usual es 82.
      </div>

      <h2>Tabla de frecuencias</h2>
      <p>Presenta cada valor de la variable junto con la frecuencia con que aparece. Sus elementos:</p>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Símbolo</th><th>Nombre</th><th>Significado</th></tr></thead>
        <tbody>
          <tr><td>\\(f_i\\)</td><td>Frecuencia absoluta</td><td>cantidad de veces que aparece el valor</td></tr>
          <tr><td>\\(h_i\\)</td><td>Frecuencia relativa</td><td>\\(h_i=\\dfrac{f_i}{n}\\) (proporción)</td></tr>
          <tr><td>\\(F_i\\!\\uparrow\\)</td><td>Absoluta acumulada creciente</td><td>se van sumando las \\(f_i\\); el último valor es \\(n\\)</td></tr>
          <tr><td>\\(F_i\\!\\downarrow\\)</td><td>Absoluta acumulada decreciente</td><td>arranca en \\(n\\) y se van restando las \\(f_i\\)</td></tr>
          <tr><td>\\(H_i\\)</td><td>Relativa acumulada</td><td>acumula las \\(h_i\\); el último valor es \\(\\approx 1\\)</td></tr>
          <tr><td>%</td><td>Porcentaje</td><td>\\(h_i\\times100\\)</td></tr>
        </tbody>
      </table>
      </div>
      <div class="callout">
        <strong class="callout__tag">Según el tipo de variable</strong>
        <strong>Nominal:</strong> categorías + \\(f_i, h_i\\), %. &nbsp; <strong>Ordinal y cuantitativa:</strong> además se agregan las <em>acumuladas</em> (porque hay orden).
      </div>

      <h2>Variable continua: intervalos de clase</h2>
      <p>Cuando la variable es continua (o discreta con muchos valores), los datos se agrupan en <strong>intervalos de clase</strong> \\([L_i,\\ L_s)\\) (cerrado por izquierda; el último también por derecha).</p>
      <div class="formula-box">
        $$ \\text{N.º de intervalos } (k) = 1 + 3{,}32\\,\\log(n) \\qquad \\text{(regla de Sturges)} $$
        $$ \\text{Amplitud } a = \\dfrac{x_{\\max}-x_{\\min}}{k} \\qquad \\text{Marca de clase } m_i = \\dfrac{L_i+L_s}{2} $$
      </div>
      <div class="callout tip">
        <strong class="callout__tag">Ejemplo</strong>
        50 puntajes entre 33 y 97. Con \\(2^{6}=64\\ge50\\) tomamos \\(k=6\\). Amplitud \\(a=\\dfrac{97-33}{6}\\approx 10{,}7\\Rightarrow 11\\). Intervalos: [33–44), [44–55), … , [88–99].
      </div>

      <h2>Representación gráfica</h2>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Tipo de variable</th><th>Gráficos</th></tr></thead>
        <tbody>
          <tr><td>Cualitativa nominal</td><td>barras separadas, <strong>torta</strong> (con %), Pareto</td></tr>
          <tr><td>Cualitativa ordinal</td><td>barras separadas <em>en orden</em></td></tr>
          <tr><td>Cuantitativa discreta</td><td>gráfico de <strong>bastones</strong></td></tr>
          <tr><td>Cuantitativa continua</td><td><strong>histograma</strong> (barras contiguas), <strong>polígono de frecuencias</strong>, <strong>ojiva</strong> (acumuladas)</td></tr>
        </tbody>
      </table>
      </div>
      <ul>
        <li><strong>Histograma:</strong> barras contiguas; cada una es un intervalo y su altura es la frecuencia.</li>
        <li><strong>Polígono de frecuencias:</strong> une los puntos medios (marcas de clase) de las cimas del histograma.</li>
        <li><strong>Ojiva:</strong> grafica las <em>frecuencias acumuladas</em> (creciente o decreciente).</li>
      </ul>
    `,
    quiz: [
      { q: "La frecuencia relativa \\(h_i\\) se calcula como:",
        opts: ["\\(f_i\\cdot n\\)", "\\(\\dfrac{f_i}{n}\\)", "\\(\\dfrac{n}{f_i}\\)", "\\(f_i+n\\)"],
        a: 1, exp: "Es la proporción: frecuencia absoluta sobre el total." },
      { q: "La última frecuencia absoluta acumulada creciente \\(F_i\\!\\uparrow\\) debe ser igual a:",
        opts: ["\\(1\\)", "\\(100\\)", "\\(n\\) (el total)", "\\(0\\)"],
        a: 2, exp: "Al acumular todas las \\(f_i\\) se llega al total \\(n\\)." },
      { q: "La regla de Sturges sirve para determinar:",
        opts: ["la media", "el número de intervalos de clase", "la moda", "el rango"],
        a: 1, exp: "\\(k=1+3{,}32\\log(n)\\) estima la cantidad de clases." },
      { q: "El gráfico de barras contiguas para variable continua es:",
        opts: ["torta", "bastones", "histograma", "Pareto"],
        a: 2, exp: "El histograma usa barras contiguas (sin separación)." },
    ],
    cards: [
      { q: "Frecuencia absoluta y relativa", a: "\\(f_i\\): cuántas veces aparece. \\(h_i=f_i/n\\): proporción." },
      { q: "Frecuencias acumuladas", a: "\\(F_i\\): suma de \\(f_i\\) hasta ese valor. \\(H_i\\): suma de \\(h_i\\)." },
      { q: "Marca de clase", a: "\\(m_i=\\dfrac{L_i+L_s}{2}\\): punto medio del intervalo." },
      { q: "Regla de Sturges", a: "\\(k=1+3{,}32\\log(n)\\): nº de intervalos." },
      { q: "Histograma vs bastones", a: "Histograma: continua (barras contiguas). Bastones: discreta." },
      { q: "Ojiva", a: "Gráfico de las frecuencias acumuladas (creciente o decreciente)." },
      { q: "Tres formas de presentar datos", a: "Texto, tablas y gráficos." },
      { q: "Amplitud de un intervalo", a: "\\(a=\\dfrac{x_{\\max}-x_{\\min}}{k}\\)." },
      { q: "Polígono de frecuencias", a: "Une los puntos medios (marcas de clase) de las cimas del histograma." },
      { q: "Gráfico para cualitativa nominal", a: "Barras separadas, torta (con %) o Pareto." },
    ]
  },

  /* ===================================================================
     UNIDAD 3 — MEDIDAS DE POSICIÓN
     =================================================================== */
  {
    id: "posicion",
    glyph: "x̄",
    icon: "target",
    title: "Medidas de Posición",
    desc: "Media, mediana y moda; cuartiles y percentiles, para datos agrupados y no agrupados.",
    tool: "medidas",
    html: `
      <p class="lead">Las <strong>medidas de posición central</strong> resumen el conjunto en un valor «representativo». Las principales son la <strong>media</strong>, la <strong>mediana</strong> y la <strong>moda</strong>.</p>

      <h2>Media aritmética \\(\\bar{x}\\)</h2>
      <p>Es el promedio: suma de los datos dividida por la cantidad.</p>
      <div class="formula-box">
        $$ \\text{No agrupados: }\\ \\bar{x}=\\dfrac{\\sum_{i=1}^{n} x_i}{n} $$
        $$ \\text{Agrupados (sin intervalos): }\\ \\bar{x}=\\dfrac{\\sum x_i\\,f_i}{n} $$
        $$ \\text{Agrupados (con intervalos): }\\ \\bar{x}=\\dfrac{\\sum m_i\\,f_i}{n}\\ \\ (m_i=\\text{marca de clase}) $$
      </div>
      <div class="callout tip">
        <strong class="callout__tag">Ejemplo</strong>
        Materias aprobadas: 2, 9, 11, 5, 6, 10. \\(\\bar{x}=\\dfrac{2+9+11+5+6+10}{6}=7{,}17\\) materias en promedio.
      </div>
      <div class="callout warn">
        <strong class="callout__tag">Cuidado</strong>
        La media es <strong>sensible a los valores atípicos</strong>: un dato muy grande o muy chico la «arrastra». En esos casos la mediana representa mejor al conjunto.
      </div>

      <h2>Mediana \\(Me\\)</h2>
      <p>Ordenados los datos, la mediana es el valor <strong>central</strong>: deja la mitad de las observaciones de cada lado.</p>
      <ul>
        <li><strong>No agrupados, \\(n\\) impar:</strong> es el valor de la posición \\(\\dfrac{n+1}{2}\\).</li>
        <li><strong>No agrupados, \\(n\\) par:</strong> es el promedio de los dos valores centrales.</li>
        <li><strong>Agrupados (con intervalos):</strong> $$ Me = L_i + \\dfrac{\\frac{n}{2} - F_{i-1}}{f_i}\\cdot a $$ donde el intervalo de la mediana es el primero cuya \\(F_i\\) alcanza \\(\\frac{n}{2}\\).</li>
      </ul>
      <div class="callout tip">
        <strong class="callout__tag">Ejemplo</strong>
        Edades (8 personas): 17, 17, 19, 19, 22, 22, 23, 28. Los centrales son 19 y 22, así que \\(Me=\\dfrac{19+22}{2}=20{,}5\\) años.
      </div>

      <h2>Moda \\(Mo\\)</h2>
      <p>Es el valor que <strong>más se repite</strong> (mayor frecuencia). Un conjunto puede ser <em>amodal</em> (sin moda), <em>unimodal</em>, <em>bimodal</em>, etc. Es la única medida de posición que también sirve para variables <strong>cualitativas</strong>.</p>

      <h2>Cuartiles y percentiles</h2>
      <p>Generalizan la idea de la mediana dividiendo el conjunto ordenado en partes iguales:</p>
      <ul>
        <li><strong>Cuartiles</strong> \\(Q_1, Q_2, Q_3\\): dividen en 4 partes. \\(Q_2=Me\\). \\(Q_1\\) deja el 25 % por debajo y \\(Q_3\\) el 75 %.</li>
        <li><strong>Deciles</strong> \\(D_1,\\dots,D_9\\): dividen en 10 partes.</li>
        <li><strong>Percentiles</strong> \\(P_1,\\dots,P_{99}\\): dividen en 100 partes. \\(P_{50}=Me\\).</li>
      </ul>
      <div class="callout">
        <strong class="callout__tag">Para datos agrupados</strong>
        Se usa la misma fórmula que la mediana, cambiando \\(\\frac{n}{2}\\) por la fracción correspondiente. Ej.: para \\(Q_1\\) se usa \\(\\frac{n}{4}\\); para \\(P_k\\) se usa \\(\\frac{k\\,n}{100}\\).
      </div>
    `,
    quiz: [
      { q: "La media de 4, 6 y 11 es:",
        opts: ["\\(6\\)", "\\(7\\)", "\\(21\\)", "\\(5{,}5\\)"],
        a: 1, exp: "\\((4+6+11)/3 = 21/3 = 7\\)." },
      { q: "¿Qué medida es más sensible a los valores atípicos?",
        opts: ["la mediana", "la moda", "la media", "el percentil 50"],
        a: 2, exp: "La media se «arrastra» por datos extremos." },
      { q: "La mediana de 3, 5, 7, 9 (n par) es:",
        opts: ["\\(5\\)", "\\(6\\)", "\\(7\\)", "\\(5{,}5\\)"],
        a: 1, exp: "Promedio de los dos centrales: \\((5+7)/2 = 6\\)." },
      { q: "El \\(Q_2\\) (segundo cuartil) coincide con:",
        opts: ["la media", "la moda", "la mediana", "el rango"],
        a: 2, exp: "\\(Q_2 = P_{50} = Me\\)." },
      { q: "La única medida de posición válida para variables cualitativas es:",
        opts: ["la media", "la mediana", "la moda", "el cuartil"],
        a: 2, exp: "La moda (categoría más frecuente) sirve para cualitativas." },
    ],
    cards: [
      { q: "Media (no agrupados)", a: "\\(\\bar{x}=\\dfrac{\\sum x_i}{n}\\)." },
      { q: "Media (agrupados con intervalos)", a: "\\(\\bar{x}=\\dfrac{\\sum m_i f_i}{n}\\) con marca de clase." },
      { q: "¿Qué es la mediana?", a: "El valor central de los datos ordenados (50 % a cada lado)." },
      { q: "Mediana agrupada", a: "\\(Me=L_i+\\dfrac{\\frac{n}{2}-F_{i-1}}{f_i}\\,a\\)." },
      { q: "¿Qué es la moda?", a: "El valor más frecuente. Sirve también para cualitativas." },
      { q: "Cuartiles y percentiles", a: "\\(Q_1\\):25 %, \\(Q_2=Me\\):50 %, \\(Q_3\\):75 %. \\(P_{50}=Me\\)." },
      { q: "¿Cuándo conviene la mediana?", a: "Cuando hay valores atípicos que distorsionan la media." },
      { q: "Posición de la mediana (n impar)", a: "El valor de la posición \\(\\dfrac{n+1}{2}\\)." },
      { q: "Deciles", a: "Dividen el conjunto ordenado en 10 partes iguales (\\(D_1,\\dots,D_9\\))." },
      { q: "Media con frecuencias", a: "\\(\\bar{x}=\\dfrac{\\sum x_i f_i}{n}\\)." },
    ]
  },

  /* ===================================================================
     UNIDAD 4 — MEDIDAS DE DISPERSIÓN
     =================================================================== */
  {
    id: "dispersion",
    glyph: "σ",
    icon: "ruler",
    title: "Medidas de Dispersión",
    desc: "Rango, varianza, desvío estándar y coeficiente de variación: cuánto se alejan los datos del promedio.",
    tool: "medidas",
    html: `
      <p class="lead">Las <strong>medidas de dispersión</strong> indican cuán <em>concentrados o dispersos</em> están los datos alrededor de la media. Dos conjuntos pueden tener la misma media y dispersiones muy distintas.</p>

      <h2>Rango (recorrido)</h2>
      <p>Es la diferencia entre el mayor y el menor dato. Es muy simple, pero solo usa dos valores.</p>
      <div class="formula-box">$$ R = x_{\\max} - x_{\\min} $$</div>

      <h2>Varianza \\(s^{2}\\)</h2>
      <p>Es el promedio de los <strong>cuadrados</strong> de las desviaciones respecto de la media. Para una <em>muestra</em> se divide por \\(n-1\\); para la <em>población</em> por \\(N\\).</p>
      <div class="formula-box">
        $$ s^{2}=\\dfrac{\\sum (x_i-\\bar{x})^{2}}{n-1} \\qquad \\sigma^{2}=\\dfrac{\\sum (x_i-\\mu)^{2}}{N} $$
        $$ \\text{Agrupados: }\\ s^{2}=\\dfrac{\\sum (x_i-\\bar{x})^{2} f_i}{n-1} $$
      </div>
      <div class="callout warn">
        <strong class="callout__tag">Unidades</strong>
        La varianza queda en <strong>unidades al cuadrado</strong> (ej.: pesos²); por eso suele preferirse el desvío estándar.
      </div>

      <h2>Desvío estándar \\(s\\)</h2>
      <p>Es la raíz cuadrada de la varianza. Vuelve a las <strong>unidades originales</strong> y es la medida de dispersión más usada.</p>
      <div class="formula-box">$$ s=\\sqrt{s^{2}}=\\sqrt{\\dfrac{\\sum (x_i-\\bar{x})^{2}}{n-1}} $$</div>
      <div class="callout tip">
        <strong class="callout__tag">Interpretación</strong>
        Un desvío chico ⇒ datos agrupados cerca de la media (homogéneos). Un desvío grande ⇒ datos muy dispersos (heterogéneos).
      </div>

      <h2>Coeficiente de variación \\(CV\\)</h2>
      <p>Mide la dispersión <strong>relativa</strong> (en %), por lo que permite <strong>comparar</strong> conjuntos con medias o unidades distintas.</p>
      <div class="formula-box">$$ CV = \\dfrac{s}{\\bar{x}}\\times 100\\ \\,[\\%] $$</div>
      <div class="callout tip">
        <strong class="callout__tag">Ejemplo</strong>
        Grupo A: \\(\\bar{x}=50,\\ s=5 \\Rightarrow CV=10\\,\\%\\). Grupo B: \\(\\bar{x}=200,\\ s=10 \\Rightarrow CV=5\\,\\%\\). Aunque B tiene mayor desvío absoluto, es <strong>relativamente más homogéneo</strong>.
      </div>
    `,
    quiz: [
      { q: "El rango de 4, 9, 2, 15, 7 es:",
        opts: ["\\(7\\)", "\\(13\\)", "\\(15\\)", "\\(11\\)"],
        a: 1, exp: "\\(x_{\\max}-x_{\\min} = 15 - 2 = 13\\)." },
      { q: "La varianza muestral divide por:",
        opts: ["\\(n\\)", "\\(n-1\\)", "\\(n+1\\)", "\\(2n\\)"],
        a: 1, exp: "Para la muestra se divide por \\(n-1\\) (corrección)." },
      { q: "El desvío estándar es:",
        opts: ["la varianza al cuadrado", "la raíz de la varianza", "el rango sobre n", "la media de los datos"],
        a: 1, exp: "\\(s=\\sqrt{s^{2}}\\); vuelve a las unidades originales." },
      { q: "Para comparar la dispersión de dos grupos con medias distintas conviene usar:",
        opts: ["el rango", "la varianza", "el coeficiente de variación", "la moda"],
        a: 2, exp: "El CV es relativo (en %) y permite comparar." },
    ],
    cards: [
      { q: "Rango", a: "\\(R=x_{\\max}-x_{\\min}\\)." },
      { q: "Varianza muestral", a: "\\(s^{2}=\\dfrac{\\sum (x_i-\\bar{x})^{2}}{n-1}\\)." },
      { q: "Desvío estándar", a: "\\(s=\\sqrt{s^{2}}\\); en las unidades originales." },
      { q: "Coeficiente de variación", a: "\\(CV=\\dfrac{s}{\\bar{x}}\\times100\\,\\%\\); dispersión relativa." },
      { q: "¿Por qué el desvío y no la varianza?", a: "La varianza está en unidades al cuadrado; el desvío vuelve a las originales." },
      { q: "¿Qué miden las medidas de dispersión?", a: "Cuán concentrados o dispersos están los datos respecto de la media." },
      { q: "Desvío chico vs grande", a: "Chico: datos homogéneos (cerca de la media). Grande: heterogéneos." },
      { q: "Varianza: población vs muestra", a: "Población: \\(\\div N\\). Muestra: \\(\\div (n-1)\\)." },
    ]
  }

  ]
};
