/* ============================================================
   TRABAJOS PRÁCTICOS — Estadística (ejercicios con solución revelable)
   Basados en los TP N°1 a N°3 de la cátedra. Cada ejercicio:
   { q: enunciado, sol: solución paso a paso }
   ============================================================ */
window.APP_DATA = window.APP_DATA || {};
window.APP_DATA.practica = [

  /* =============================== TP 1 =============================== */
  {
    id: "tp1", unit: "intro", glyph: "Σ",
    title: "TP N°1 · Población, muestra y variables",
    desc: "Distinguir población de muestra, clasificar variables y evaluar la representatividad.",
    exercises: [
      {
        q: "<strong>1.</strong> Para cada caso decidí si el conjunto descrito es <em>población</em> o <em>muestra</em>:<br>a) Un hospital selecciona al azar 50 pacientes dados de alta el mes pasado y les pide una encuesta.<br>b) Un investigador pesa a los 35 ratones blancos que hay en el laboratorio para conocer su peso promedio.<br>c) Una empresa estudia un analgésico nuevo probándolo en 200 empleados voluntarios.",
        sol: "a) <strong>Muestra</strong>: son 50 elegidos de entre todos los pacientes.<br>b) <strong>Población</strong>: se estudian <em>todos</em> los ratones del laboratorio (no un subconjunto).<br>c) <strong>Muestra</strong>: los 200 empleados son un subconjunto de todos los posibles consumidores del analgésico."
      },
      {
        q: "<strong>2.</strong> Verdadero o Falso (corregí el error):<br>a) La población ha de ser representativa de la muestra.<br>b) Los índices que describen una muestra se llaman parámetros.<br>c) Muestra es un subconjunto de la población.<br>e) La estadística inferencial obtiene inferencias sobre poblaciones a partir de muestras.",
        sol: "a) <strong>Falso</strong>: es la <em>muestra</em> la que debe ser representativa de la población.<br>b) <strong>Falso</strong>: se llaman <em>estadísticos</em>; los <em>parámetros</em> describen a la población.<br>c) <strong>Verdadero</strong>.<br>e) <strong>Verdadero</strong>."
      },
      {
        q: "<strong>3.</strong> Clasificá cada variable (cualitativa nominal/ordinal · cuantitativa discreta/continua):<br>b.1) Talla de 20 niños.<br>b.3) Atención recibida: muy buena, buena, regular, mala.<br>b.4) Diámetro de 40 tuercas.<br>b.6) Modalidad de capacitación preferida.<br>b.7) Cantidad de materias aprobadas.",
        sol: "b.1) Cuantitativa <strong>continua</strong> (se mide).<br>b.3) Cualitativa <strong>ordinal</strong> (categorías con orden).<br>b.4) Cuantitativa <strong>continua</strong>.<br>b.6) Cualitativa <strong>nominal</strong> (categorías sin orden).<br>b.7) Cuantitativa <strong>discreta</strong> (se cuenta)."
      },
      {
        q: "<strong>4.</strong> ¿Conviene estudiar <em>toda la población</em> o tomar una <em>muestra</em>?<br>a) Promedio de notas de un estudiante en todas las materias de su carrera.<br>c) Cantidad promedio de autos que pasan por una autopista del país en un día.<br>d) Tiempo de respuesta a un correo de los 100 empleados del área de Sistemas.<br>e) Opinión de los ciudadanos de Salta sobre el transporte público.",
        sol: "a) <strong>Población</strong>: son pocas materias, se pueden tomar todas.<br>c) <strong>Muestra</strong>: es inviable medir todos los autos del país.<br>d) <strong>Población</strong>: son solo 100, accesibles.<br>e) <strong>Muestra</strong>: la población es enorme; se encuesta a un subconjunto representativo."
      },
      {
        q: "<strong>5.</strong> ¿La muestra es representativa? Justificá:<br>a) Para estimar el tiempo en redes de los jóvenes, se encuesta a 500 estudiantes de una facultad de ingeniería.<br>b) Para estudiar la preferencia de helados de los clientes de un super, se encuesta a las primeras 20 personas un sábado a la mañana.<br>c) Para conocer la opinión sobre el horario laboral, se elige aleatoriamente al 10 % de cada departamento.",
        sol: "a) <strong>No</strong> representativa: solo ingeniería, sesga hacia un perfil; no refleja a «los jóvenes» en general.<br>b) <strong>No</strong>: las primeras 20 de un horario puntual es muestra por conveniencia (sesgada).<br>c) <strong>Sí</strong>: muestreo aleatorio estratificado por departamento → representativo."
      },
    ]
  },

  /* =============================== TP 2 =============================== */
  {
    id: "tp2", unit: "datos", glyph: "▦",
    title: "TP N°2 · Tablas de frecuencias y gráficos",
    desc: "Construir tablas de frecuencias, interpretar porcentajes y elegir el gráfico adecuado.",
    exercises: [
      {
        q: "<strong>1.</strong> Cantidad de hijos de 20 familias:<br>2, 3, 2, 0, 2, 3, 1, 1, 2, 4, 0, 0, 1, 2, 2, 4, 5, 0, 1, 2<br>a) Clasificá la variable. &nbsp; b) Armá la tabla \\((x_i, f_i)\\). &nbsp; c) ¿Cuál es el valor más frecuente y qué % representa? &nbsp; d) ¿Cuántas familias tienen menos de 3 hijos?",
        sol: "a) Cuantitativa <strong>discreta</strong>.<br>b) \\(x=0\\): 4 · \\(x=1\\): 4 · \\(x=2\\): 7 · \\(x=3\\): 2 · \\(x=4\\): 2 · \\(x=5\\): 1 &nbsp;(n=20).<br>c) El más frecuente es <strong>2 hijos</strong> (7 familias = \\(7/20=35\\,\\%\\)).<br>d) Menos de 3 hijos = \\(4+4+7=\\) <strong>15 familias</strong>."
      },
      {
        q: "<strong>2.</strong> Especialidades de 64 miembros (Contabilidad C, Mercadotecnia M, Estadística E, Finanzas F). a) ¿Qué tipo de variable es? b) ¿Qué gráficos se pueden usar?",
        sol: "a) Cualitativa <strong>nominal</strong> (categorías sin orden).<br>b) Gráfico de <strong>barras separadas</strong> (con \\(f_i\\) o \\(h_i\\)), gráfico de <strong>torta</strong> (con %) y de <strong>Pareto</strong>. No corresponde histograma (es para variable continua)."
      },
      {
        q: "<strong>7.</strong> Duración de 400 tubos (intervalos de 100 h, desde [300–400) hasta [1100–1200)). Frecuencias: 14, 46, 58, 76, 68, 62, 48, 22, 6.<br>a) Límite superior de la 5.ª clase y marca de clase de la 7.ª. b) % de tubos con duración menor a 600 h. c) % con duración \\(\\ge 900\\) h.",
        sol: "a) 5.ª clase [700–800): límite superior <strong>800</strong>. 7.ª clase [900–1000): marca \\(m=\\dfrac{900+1000}{2}=\\) <strong>950</strong>. Amplitud \\(a=100\\).<br>b) Menores a 600: \\(14+46+58=118\\Rightarrow 118/400=\\) <strong>29,5 %</strong>.<br>c) \\(\\ge 900\\): \\(48+22+6=76\\Rightarrow 76/400=\\) <strong>19 %</strong>."
      },
      {
        q: "<strong>(Navegadores).</strong> Encuesta a 200 usuarios: Chrome 40 %, Firefox 30 %, Edge 20 %, Otros 10 %.<br>a) Armá la tabla de \\(f_i\\). b) ¿Cuál es el más usado? c) ¿Qué % usa un navegador distinto de Chrome? d) ¿Cuántos usuarios usan Edge?",
        sol: "a) \\(f_i\\): Chrome \\(0{,}40\\cdot200=80\\) · Firefox \\(60\\) · Edge \\(40\\) · Otros \\(20\\). Total 200.<br>b) <strong>Chrome</strong>.<br>c) \\(100\\%-40\\%=\\) <strong>60 %</strong>.<br>d) Edge: \\(0{,}20\\cdot200=\\) <strong>40 usuarios</strong>."
      },
    ]
  },

  /* =============================== TP 3 =============================== */
  {
    id: "tp3", unit: "posicion", glyph: "x̄",
    title: "TP N°3 · Medidas de posición y dispersión",
    desc: "Calcular media, mediana, moda, rango, varianza, desvío estándar y coeficiente de variación.",
    exercises: [
      {
        q: "<strong>1.</strong> Consultas de 10 usuarios en una sesión: 2, 5, 3, 2, 4, 2, 6, 3, 5, 8. Calculá media, mediana y moda.",
        sol: "Ordenados: 2, 2, 2, 3, 3, 4, 5, 5, 6, 8 &nbsp;(n=10).<br><strong>Media</strong>: \\(\\bar{x}=\\dfrac{2+5+3+2+4+2+6+3+5+8}{10}=\\dfrac{40}{10}=4\\).<br><strong>Mediana</strong> (n par): promedio de los centrales (3 y 4) = \\(3{,}5\\).<br><strong>Moda</strong>: \\(2\\) (aparece 3 veces)."
      },
      {
        q: "<strong>2.</strong> Para el mismo conjunto (2,2,2,3,3,4,5,5,6,8) calculá rango, varianza muestral y desvío estándar.",
        sol: "<strong>Rango</strong>: \\(8-2=6\\).<br>Desvíos respecto de \\(\\bar{x}=4\\) al cuadrado: \\(4,4,4,1,1,0,1,1,4,16\\) → suma \\(=36\\).<br><strong>Varianza muestral</strong>: \\(s^2=\\dfrac{36}{10-1}=4\\).<br><strong>Desvío estándar</strong>: \\(s=\\sqrt{4}=2\\)."
      },
      {
        q: "<strong>3.</strong> Tabla de frecuencias (datos agrupados sin intervalos):<br>\\(x_i\\): 0, 1, 2, 3, 4 &nbsp;·&nbsp; \\(f_i\\): 8, 10, 6, 4, 2 &nbsp;(n=30). Calculá la media.",
        sol: "\\(\\bar{x}=\\dfrac{\\sum x_i f_i}{n}=\\dfrac{0\\cdot8+1\\cdot10+2\\cdot6+3\\cdot4+4\\cdot2}{30}=\\dfrac{0+10+12+12+8}{30}=\\dfrac{42}{30}=1{,}4\\). En promedio, 1,4 por unidad."
      },
      {
        q: "<strong>4.</strong> Dos grupos: A tiene \\(\\bar{x}=50,\\ s=5\\); B tiene \\(\\bar{x}=200,\\ s=10\\). ¿Cuál es <em>relativamente</em> más homogéneo?",
        sol: "Se compara con el <strong>coeficiente de variación</strong> \\(CV=\\dfrac{s}{\\bar{x}}\\cdot100\\).<br>A: \\(CV=\\dfrac{5}{50}\\cdot100=10\\,\\%\\). &nbsp; B: \\(CV=\\dfrac{10}{200}\\cdot100=5\\,\\%\\).<br>Aunque B tiene mayor desvío absoluto, su \\(CV\\) es menor ⇒ <strong>B es más homogéneo</strong>."
      },
    ]
  },

];
