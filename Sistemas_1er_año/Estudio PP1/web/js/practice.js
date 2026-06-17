/* ============================================================
   PRÁCTICA — Taller PSeInt y Proyecto Final
   Ejercicios de diagramación/algoritmos con solución revelable
   y la guía del Proyecto Final (armado de una PC).
   Cada ejercicio: { q: enunciado, sol: solución (HTML, admite <pre class="pseint">) }
   ============================================================ */
window.APP_DATA = window.APP_DATA || {};
window.APP_DATA.practica = [

  /* =============== TALLER PSEINT · VARIABLES SIMPLES =============== */
  {
    id: "pseint-simple", unit: "informatica", glyph: "🧮",
    title: "Taller PSeInt · Variables simples",
    desc: "Algoritmos secuenciales, condicionales y bucles con variables simples, resueltos en pseudocódigo.",
    exercises: [
      {
        q: `<strong>1.</strong> Leer dos valores distintos, determinar cuál es el mayor y escribirlo.`,
        sol: `<pre class="pseint">Algoritmo Mayor_de_dos
    Escribir "Ingrese el primer número:"
    Leer a
    Escribir "Ingrese el segundo número:"
    Leer b
    Si a > b Entonces
        Escribir "El mayor es: ", a
    SiNo
        Escribir "El mayor es: ", b
    FinSi
FinAlgoritmo</pre>
        <strong>Prueba:</strong> a=7, b=3 → 7 · &nbsp; a=2, b=9 → 9.`
      },
      {
        q: `<strong>2.</strong> Sumar dos números y mostrar el resultado.`,
        sol: `<pre class="pseint">Algoritmo Suma
    Leer a, b
    suma <- a + b
    Escribir "La suma es: ", suma
FinAlgoritmo</pre>
        Datos de entrada: <code class="inline">a</code>, <code class="inline">b</code>. Salida: <code class="inline">suma</code>.`
      },
      {
        q: `<strong>3.</strong> Leer tres valores distintos (A, B, C) e imprimir el mayor y el menor. Avisar si hay valores iguales.`,
        sol: `<pre class="pseint">Algoritmo Mayor_y_menor_de_tres
    Leer A, B, C
    Si A = B O B = C O A = C Entonces
        Escribir "Alerta: hay valores iguales"
    SiNo
        // Mayor
        mayor <- A
        Si B > mayor Entonces mayor <- B FinSi
        Si C > mayor Entonces mayor <- C FinSi
        // Menor
        menor <- A
        Si B < menor Entonces menor <- B FinSi
        Si C < menor Entonces menor <- C FinSi
        Escribir "Mayor: ", mayor, " - Menor: ", menor
    FinSi
FinAlgoritmo</pre>`
      },
      {
        q: `<strong>5.</strong> Sumatoria de los enteros del 1 al 10 (1 + 2 + … + 10).`,
        sol: `<pre class="pseint">Algoritmo Sumatoria_1_a_10
    suma <- 0
    Para i <- 1 Hasta 10 Con Paso 1 Hacer
        suma <- suma + i
    FinPara
    Escribir "La sumatoria es: ", suma
FinAlgoritmo</pre>
        Resultado: <strong>55</strong>.`
      },
      {
        q: `<strong>6.</strong> Sumatoria de los múltiplos de 5 entre 1 y 100 (5 + 10 + … + 100), imprimiéndolos.`,
        sol: `<pre class="pseint">Algoritmo Multiplos_de_5
    suma <- 0
    Para i <- 5 Hasta 100 Con Paso 5 Hacer
        Escribir i
        suma <- suma + i
    FinPara
    Escribir "Sumatoria: ", suma
FinAlgoritmo</pre>
        Resultado: <strong>1050</strong>.`
      },
      {
        q: `<strong>9.</strong> Determinar la hipotenusa de un triángulo rectángulo conocidos sus dos catetos.`,
        sol: `<pre class="pseint">Algoritmo Hipotenusa
    Leer cateto1, cateto2
    h <- raiz(cateto1^2 + cateto2^2)
    Escribir "La hipotenusa es: ", h
FinAlgoritmo</pre>
        Se aplica el Teorema de Pitágoras: <code class="inline">h = √(c1² + c2²)</code>.`
      },
      {
        q: `<strong>11.</strong> Determinar el área y el volumen de un cilindro dado su radio (R) y altura (H).`,
        sol: `<pre class="pseint">Algoritmo Cilindro
    Leer R, H
    area <- 2 * PI * R * (R + H)      // área total
    volumen <- PI * R^2 * H
    Escribir "Área: ", area
    Escribir "Volumen: ", volumen
FinAlgoritmo</pre>
        (En PSeInt, <code class="inline">PI</code> ≈ 3.1416.)`
      },
      {
        q: `<strong>13.</strong> Leer un valor N y decir si es par o impar.`,
        sol: `<pre class="pseint">Algoritmo Par_o_impar
    Leer N
    Si N MOD 2 = 0 Entonces
        Escribir N, " es PAR"
    SiNo
        Escribir N, " es IMPAR"
    FinSi
FinAlgoritmo</pre>
        El operador <code class="inline">MOD</code> da el resto de la división: si el resto entre 2 es 0, es par.`
      },
      {
        q: `<strong>16.</strong> Escribir los primeros 100 números naturales usando la estructura Mientras.`,
        sol: `<pre class="pseint">Algoritmo Naturales_Mientras
    i <- 1
    Mientras i <= 100 Hacer
        Escribir i
        i <- i + 1
    FinMientras
FinAlgoritmo</pre>`
      },
      {
        q: `<strong>17.</strong> Leer un entero positivo N y determinar si es primo.`,
        sol: `<pre class="pseint">Algoritmo Es_primo
    Leer N
    divisores <- 0
    Para i <- 1 Hasta N Con Paso 1 Hacer
        Si N MOD i = 0 Entonces
            divisores <- divisores + 1
        FinSi
    FinPara
    Si divisores = 2 Entonces
        Escribir N, " es PRIMO"
    SiNo
        Escribir N, " NO es primo"
    FinSi
FinAlgoritmo</pre>
        Un número es primo si tiene exactamente <strong>dos</strong> divisores: 1 y él mismo.`
      },
      {
        q: `<strong>20.</strong> Convertir la velocidad de un automóvil de km/h a m/s.`,
        sol: `<pre class="pseint">Algoritmo Kmh_a_ms
    Leer kmh
    ms <- kmh / 3.6
    Escribir kmh, " km/h equivalen a ", ms, " m/s"
FinAlgoritmo</pre>
        Para pasar de km/h a m/s se divide por 3,6 (y para el inverso, se multiplica).`
      },
      {
        q: `<strong>22.</strong> Calcular el promedio de notas; finaliza cuando se ingresa N = 0.`,
        sol: `<pre class="pseint">Algoritmo Promedio_notas
    suma <- 0
    cantidad <- 0
    Leer nota
    Mientras nota <> 0 Hacer
        suma <- suma + nota
        cantidad <- cantidad + 1
        Leer nota
    FinMientras
    Si cantidad > 0 Entonces
        Escribir "Promedio: ", suma / cantidad
    SiNo
        Escribir "No se ingresaron notas"
    FinSi
FinAlgoritmo</pre>
        El 0 actúa como <strong>valor centinela</strong> que corta el bucle.`
      },
    ]
  },

  /* =============== TALLER PSEINT · VECTORES =============== */
  {
    id: "pseint-vectores", unit: "informatica", glyph: "📊",
    title: "Taller PSeInt · Vectores",
    desc: "Algoritmos con arreglos (vectores): recorrido, acumuladores, contadores, búsqueda y máximos/mínimos.",
    exercises: [
      {
        q: `<strong>1.</strong> Dada una lista de números enteros, indicar la cantidad de positivos, negativos y nulos.`,
        sol: `<pre class="pseint">Algoritmo Pos_Neg_Nulos
    Dimension V[10]
    pos <- 0
    neg <- 0
    nulos <- 0
    Para i <- 1 Hasta 10 Con Paso 1 Hacer
        Leer V[i]
        Si V[i] > 0 Entonces
            pos <- pos + 1
        SiNo
            Si V[i] < 0 Entonces
                neg <- neg + 1
            SiNo
                nulos <- nulos + 1
            FinSi
        FinSi
    FinPara
    Escribir "Positivos: ", pos, " Negativos: ", neg, " Nulos: ", nulos
FinAlgoritmo</pre>`
      },
      {
        q: `<strong>2.</strong> Dada una lista de N elementos, mostrar los que están en posiciones pares.`,
        sol: `<pre class="pseint">Algoritmo Posiciones_pares
    Leer N
    Dimension V[N]
    Para i <- 1 Hasta N Con Paso 1 Hacer
        Leer V[i]
    FinPara
    Para i <- 2 Hasta N Con Paso 2 Hacer
        Escribir "V[", i, "] = ", V[i]
    FinPara
FinAlgoritmo</pre>
        Recorriendo con paso 2 desde la posición 2 se toman solo las posiciones pares.`
      },
      {
        q: `<strong>4.</strong> Calcular el promedio de N números enteros almacenados en un vector.`,
        sol: `<pre class="pseint">Algoritmo Promedio_vector
    Leer N
    Dimension V[N]
    suma <- 0
    Para i <- 1 Hasta N Con Paso 1 Hacer
        Leer V[i]
        suma <- suma + V[i]
    FinPara
    Escribir "Promedio: ", suma / N
FinAlgoritmo</pre>`
      },
      {
        q: `<strong>10.</strong> Determinar el menor y el mayor de un conjunto de N números positivos.`,
        sol: `<pre class="pseint">Algoritmo Mayor_y_menor
    Leer N
    Dimension V[N]
    Leer V[1]
    mayor <- V[1]
    menor <- V[1]
    Para i <- 2 Hasta N Con Paso 1 Hacer
        Leer V[i]
        Si V[i] > mayor Entonces mayor <- V[i] FinSi
        Si V[i] < menor Entonces menor <- V[i] FinSi
    FinPara
    Escribir "Mayor: ", mayor, " - Menor: ", menor
FinAlgoritmo</pre>
        Se inicializan <code class="inline">mayor</code> y <code class="inline">menor</code> con el primer elemento y luego se comparan los demás.`
      },
      {
        q: `<strong>14.</strong> Determinar si un número es capicúa (se lee igual al derecho y al revés).`,
        sol: `<pre class="pseint">Algoritmo Capicua
    Leer numero
    n <- numero
    invertido <- 0
    Mientras n > 0 Hacer
        invertido <- invertido * 10 + (n MOD 10)
        n <- trunc(n / 10)
    FinMientras
    Si invertido = numero Entonces
        Escribir numero, " es capicúa"
    SiNo
        Escribir numero, " no es capicúa"
    FinSi
FinAlgoritmo</pre>
        Se invierte el número con <code class="inline">MOD 10</code> (último dígito) y <code class="inline">trunc(n/10)</code> (saca el último dígito), y se compara con el original.`
      },
      {
        q: `<strong>23.</strong> Leer 20 números, guardarlos en un vector y mostrar la posición del mayor valor.`,
        sol: `<pre class="pseint">Algoritmo Posicion_del_mayor
    Dimension V[20]
    Para i <- 1 Hasta 20 Con Paso 1 Hacer
        Leer V[i]
    FinPara
    posMayor <- 1
    Para i <- 2 Hasta 20 Con Paso 1 Hacer
        Si V[i] > V[posMayor] Entonces
            posMayor <- i
        FinSi
    FinPara
    Escribir "El mayor es ", V[posMayor], " en la posición ", posMayor
FinAlgoritmo</pre>`
      },
      {
        q: `<strong>24.</strong> Dados dos vectores A y B de 15 elementos, obtener un vector C donde C[i] = A[i] + B[i].`,
        sol: `<pre class="pseint">Algoritmo Suma_de_vectores
    Dimension A[15], B[15], C[15]
    Para i <- 1 Hasta 15 Con Paso 1 Hacer
        Leer A[i]
    FinPara
    Para i <- 1 Hasta 15 Con Paso 1 Hacer
        Leer B[i]
    FinPara
    Para i <- 1 Hasta 15 Con Paso 1 Hacer
        C[i] <- A[i] + B[i]
        Escribir "C[", i, "] = ", C[i]
    FinPara
FinAlgoritmo</pre>`
      },
      {
        q: `<strong>27.</strong> Dado un vector A y un número leído, determinar si dicho número se encuentra en el vector (búsqueda).`,
        sol: `<pre class="pseint">Algoritmo Buscar_en_vector
    Dimension A[10]
    Para i <- 1 Hasta 10 Con Paso 1 Hacer
        Leer A[i]
    FinPara
    Leer buscado
    encontrado <- Falso
    Para i <- 1 Hasta 10 Con Paso 1 Hacer
        Si A[i] = buscado Entonces
            encontrado <- Verdadero
        FinSi
    FinPara
    Si encontrado Entonces
        Escribir "El número SÍ está en el vector"
    SiNo
        Escribir "El número NO está en el vector"
    FinSi
FinAlgoritmo</pre>`
      },
      {
        q: `<strong>31.</strong> Dado un vector de números, determinar cuáles son primos.`,
        sol: `<pre class="pseint">Algoritmo Primos_en_vector
    Dimension V[10]
    Para i <- 1 Hasta 10 Con Paso 1 Hacer
        Leer V[i]
    FinPara
    Para i <- 1 Hasta 10 Con Paso 1 Hacer
        divisores <- 0
        Para j <- 1 Hasta V[i] Con Paso 1 Hacer
            Si V[i] MOD j = 0 Entonces
                divisores <- divisores + 1
            FinSi
        FinPara
        Si divisores = 2 Entonces
            Escribir V[i], " es primo"
        FinSi
    FinPara
FinAlgoritmo</pre>
        Se usa un bucle dentro de otro (anidado): por cada elemento se cuentan sus divisores.`
      },
    ]
  },

  /* =============== PROYECTO FINAL =============== */
  {
    id: "proyecto-final", unit: "informe", glyph: "🛠️",
    title: "Proyecto Final · Armado de una PC",
    desc: "Guía del proyecto integrador: armar una computadora personal aplicando criterios técnicos y un presupuesto.",
    exercises: [
      {
        q: `<strong>Objetivo y formato.</strong> ¿Qué hay que demostrar y cómo se entrega?`,
        sol: `Demostrar conocimientos sobre los <strong>componentes, funciones y el proceso de ensamblaje</strong> de una PC, aplicando criterios técnicos y prácticos.<br><strong>Formato:</strong> documento escrito (Word o PDF) + presentación (PowerPoint o similar). Opcional: video del armado.<br>Se valora la <strong>claridad, la precisión técnica, el vocabulario adecuado y la presentación visual</strong>.`
      },
      {
        q: `<strong>1.</strong> Introducción: ¿qué incluir?`,
        sol: `Explicar <strong>qué es una computadora personal</strong> y <strong>cuál será su propósito</strong> (oficina/ofimática, juegos, diseño, etc.). El propósito define después qué componentes elegir.`
      },
      {
        q: `<strong>2.</strong> Listado de componentes obligatorios.`,
        sol: `<ul>
          <li>Placa madre (motherboard)</li>
          <li>Procesador (CPU)</li>
          <li>Memoria RAM</li>
          <li>Disco de almacenamiento (HDD/SSD)</li>
          <li>Fuente de alimentación</li>
          <li>Gabinete</li>
          <li>Placa de video (si es dedicada)</li>
          <li>Sistema de refrigeración (cooler/ventiladores)</li>
          <li>Periféricos: monitor, teclado y mouse</li>
        </ul>`
      },
      {
        q: `<strong>3.</strong> Función de cada componente.`,
        sol: `Explicar <strong>para qué sirve cada parte</strong> y <strong>cómo se relaciona</strong> con las demás (por ejemplo: la CPU procesa, la RAM guarda lo que está en uso, la fuente alimenta todo, la placa madre los conecta). Repasá esto en la <a href="#/unit/hardware">unidad de Hardware</a>.`
      },
      {
        q: `<strong>4.</strong> Pasos del armado.`,
        sol: `Describir el <strong>orden lógico del ensamblaje</strong>, las <strong>precauciones de seguridad</strong> (electricidad estática → pulsera antiestática, manejo cuidadoso de los componentes) y las <strong>herramientas necesarias</strong> (destornilladores, etc.).`
      },
      {
        q: `<strong>5.</strong> Presupuesto estimado.`,
        sol: `Simular la compra de los componentes con <strong>precios reales</strong> (tiendas locales o en línea) y <strong>justificar</strong> cada elección por rendimiento, compatibilidad y uso previsto.<br><span class="muted">Tip: usá el <a href="#/tool/cotizador">Cotizador de PC</a> para armar el presupuesto.</span>`
      },
      {
        q: `<strong>6.</strong> Sistema operativo y software.`,
        sol: `Indicar <strong>qué sistema operativo</strong> instalarías y por qué, y listar los <strong>programas básicos recomendados</strong> (navegador, ofimática, antivirus, etc.).`
      },
      {
        q: `<strong>7.</strong> Conclusión.`,
        sol: `Reflexionar sobre <strong>lo aprendido</strong> y comentar las <strong>dificultades</strong> encontradas o los aspectos más interesantes del proyecto. Recordá las reglas del informe: <strong>precisión, concisión y claridad</strong>.`
      },
    ]
  },

];
