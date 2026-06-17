/* ============================================================
   TRABAJOS PRÁCTICOS — ejercicios con solución revelable
   Fundamentos de la Programación · 1er Año
   Cada ejercicio: { q: enunciado, sol: solución paso a paso }
   ============================================================ */
window.APP_DATA = window.APP_DATA || {};
window.APP_DATA.practica = [

  /* =============================== TP 1 — BOOLE: SIMPLIFICACIÓN =============================== */
  {
    id: "tp1", unit: "boole", glyph: "01",
    title: "TP N°1 · Álgebra de Boole — Simplificación",
    desc: "Aplicá postulados y teoremas para obtener expresiones más sencillas.",
    exercises: [
      {
        q: "<strong>1.</strong> Simplificá: \\(ab + a\\overline{b}\\)",
        sol: "Sacamos factor común \\(a\\): \\(ab + a\\overline{b} = a(b+\\overline{b})\\).<br>Por el postulado del complemento, \\(b+\\overline{b}=1\\).<br>Entonces \\(a\\cdot 1 = \\boldsymbol{a}\\)."
      },
      {
        q: "<strong>2.</strong> Simplificá: \\(a + ab\\)",
        sol: "Factor común \\(a\\): \\(a + ab = a(1+b)\\).<br>Por absorción, \\(1+b=1\\).<br>Luego \\(a\\cdot 1 = \\boldsymbol{a}\\). (Es la <em>ley de redundancia</em> \\(a+ab=a\\).)"
      },
      {
        q: "<strong>3.</strong> Simplificá: \\(a\\,(a+b)\\)",
        sol: "Distribuimos: \\(a(a+b) = a\\cdot a + a\\cdot b = a + ab\\).<br>Por idempotencia \\(a\\cdot a=a\\), y por absorción \\(a+ab=a\\).<br>Resultado: \\(\\boldsymbol{a}\\)."
      },
      {
        q: "<strong>4.</strong> Verificá la identidad: \\((a+b)(a+c) = a + bc\\)",
        sol: "Esta es la <strong>propiedad distributiva de la suma respecto del producto</strong> (postulado 3), que en Boole sí vale:<br>$$a+(b\\cdot c)=(a+b)\\cdot(a+c)$$<br>Por lo tanto \\((a+b)(a+c)=\\boldsymbol{a+bc}\\)."
      },
      {
        q: "<strong>5.</strong> Simplificá: \\(a + \\overline{a}\\,b\\)",
        sol: "Es la <em>ley de redundancia 2</em>. Demostración: \\(a+\\overline{a}b = (a+\\overline{a})(a+b)\\) (distributiva) \\(= 1\\cdot(a+b) = \\boldsymbol{a+b}\\)."
      },
      {
        q: "<strong>6.</strong> Simplificá: \\(a\\,(\\overline{a}+b)\\)",
        sol: "Distribuimos: \\(a\\overline{a} + ab\\). Como \\(a\\overline{a}=0\\): \\(0 + ab = \\boldsymbol{ab}\\)."
      },
      {
        q: "<strong>7.</strong> Simplificá: \\(ab + a\\overline{b} + \\overline{a}b\\)",
        sol: "Agrupamos los dos primeros: \\(ab + a\\overline{b} = a(b+\\overline{b}) = a\\).<br>Queda \\(a + \\overline{a}b\\), que por redundancia es \\(a+b\\).<br>Resultado: \\(\\boldsymbol{a+b}\\)."
      },
      {
        q: "<strong>8.</strong> Aplicá De Morgan y simplificá: \\(\\overline{\\overline{a}+\\overline{b}}\\)",
        sol: "De Morgan: \\(\\overline{\\overline{a}+\\overline{b}} = \\overline{\\overline{a}}\\cdot\\overline{\\overline{b}}\\).<br>Por involución \\(\\overline{\\overline{a}}=a\\) y \\(\\overline{\\overline{b}}=b\\).<br>Resultado: \\(\\boldsymbol{a\\cdot b}\\)."
      },
      {
        q: "<strong>9.</strong> Aplicá De Morgan: \\(\\overline{a\\cdot\\overline{b}}\\)",
        sol: "\\(\\overline{a\\cdot\\overline{b}} = \\overline{a} + \\overline{\\overline{b}} = \\boldsymbol{\\overline{a}+b}\\) (negación de un producto = suma de negaciones)."
      },
      {
        q: "<strong>10.</strong> Simplificá: \\(a + \\overline{a}\\)  y  \\(a\\cdot\\overline{a}\\)",
        sol: "Por el postulado del complemento: \\(a+\\overline{a}=\\boldsymbol{1}\\) (siempre verdadero) y \\(a\\cdot\\overline{a}=\\boldsymbol{0}\\) (siempre falso)."
      },
    ]
  },

  /* =============================== TP 2 — BOOLE: FND/FNC y KARNAUGH =============================== */
  {
    id: "tp2", unit: "boole", glyph: "01",
    title: "TP N°2 · Boole — Formas normales y Karnaugh",
    desc: "Derivá la FND y la FNC desde la tabla de verdad y minimizá con mapas de Karnaugh.",
    exercises: [
      {
        q: "<strong>1.</strong> Repaso: ¿cómo se arman un minitérmino y un maxitérmino para la fila \\(a=1,\\,b=0,\\,c=1\\)?",
        sol: "<strong>Minitérmino</strong> (producto, complemento si el bit es 0): \\(a\\overline{b}c\\).<br><strong>Maxitérmino</strong> (suma, complemento si el bit es 1): \\(\\overline{a}+b+\\overline{c}\\)."
      },
      {
        q: "<strong>2a.</strong> Dada la tabla de \\(f(a,b,c)\\), hallá la FND y la FNC.<br><span style='font-family:var(--mono);font-size:13px'>f=1 en las filas 010, 011, 101, 110 &nbsp;(minterms 2,3,5,6)</span>",
        sol: "<strong>FND</strong> (suma de minitérminos donde \\(f=1\\)):<br>$$f=\\overline{a}b\\overline{c}+\\overline{a}bc+a\\overline{b}c+ab\\overline{c}$$<strong>FNC</strong> (producto de maxitérminos donde \\(f=0\\): filas 0,1,4,7):<br>$$f=(a+b+c)(a+b+\\overline{c})(\\overline{a}+b+c)(\\overline{a}+\\overline{b}+\\overline{c})$$Podés verificarlo en la herramienta <a href='#/tool/formas'>Formas normales</a>."
      },
      {
        q: "<strong>2b.</strong> Dada la tabla de \\(g(a,b,c)\\), hallá la FND y la FNC.<br><span style='font-family:var(--mono);font-size:13px'>g=1 en las filas 000, 010, 101, 110 &nbsp;(minterms 0,2,5,6)</span>",
        sol: "<strong>FND</strong>: $$g=\\overline{a}\\,\\overline{b}\\,\\overline{c}+\\overline{a}b\\overline{c}+a\\overline{b}c+ab\\overline{c}$$<strong>FNC</strong> (filas con \\(g=0\\): 1,3,4,7): $$g=(a+b+\\overline{c})(a+\\overline{b}+\\overline{c})(\\overline{a}+b+c)(\\overline{a}+\\overline{b}+\\overline{c})$$"
      },
      {
        q: "<strong>3.</strong> Minimizá con Karnaugh: \\(f(a,b,c)=\\sum m(0,1,4,5)\\).",
        sol: "En el mapa, esas 4 casillas forman un único bloque donde \\(b=0\\) (cambian \\(a\\) y \\(c\\)).<br>Como solo \\(b\\) se mantiene fija (en 0), el bloque vale \\(\\overline{b}\\).<br>Resultado mínimo: \\(\\boldsymbol{f=\\overline{b}}\\). Comprobalo en el <a href='#/tool/karnaugh'>Mapa de Karnaugh</a>."
      },
      {
        q: "<strong>4.</strong> Minimizá con Karnaugh: \\(f(a,b,c)=\\sum m(0,1,2,3,4,5)\\).",
        sol: "Los únicos ceros están en las filas 6 y 7 (\\(a=1,b=1\\)).<br>Agrupando los seis 1 quedan dos bloques: \\(\\overline{a}\\) (filas 0–3) y \\(\\overline{b}\\) (filas 0,1,4,5).<br>Resultado: \\(\\boldsymbol{f=\\overline{a}+\\overline{b}}\\), que es \\(\\overline{ab}\\) (¡De Morgan!)."
      },
      {
        q: "<strong>5.</strong> Minimizá con Karnaugh (4 variables): \\(f(a,b,c,d)=\\sum m(0,1,4,5,8,9,12,13)\\).",
        sol: "Las 8 casillas comparten \\(c=0\\) (varían \\(a,b,d\\)).<br>Un bloque de 8 elimina 3 variables y deja solo la que no cambia.<br>Resultado: \\(\\boldsymbol{f=\\overline{c}}\\)."
      },
    ]
  },

  /* =============================== TP 3 — DIAGRAMACIÓN (DATOS SIMPLES) =============================== */
  {
    id: "tp3", unit: "diagramacion", glyph: "◇",
    title: "TP N°3 · Diagramación — Datos simples",
    desc: "Algoritmos con entrada, proceso y salida. Probá cada solución en el intérprete de pseudocódigo.",
    exercises: [
      {
        q: "<strong>1.</strong> Una persona invierte un capital en un banco que paga 2% de interés mensual. Calculá cuánto ganará y el total después de un mes.",
        sol: "<div class='code-box'>Leer capital\ninteres ← capital * 0.02\ntotal ← capital + interes\nEscribir \"Interés ganado:\", interes\nEscribir \"Total:\", total</div>"
      },
      {
        q: "<strong>3.</strong> Dado el radio de una esfera, calculá e imprimí su área y su volumen. \\(A=4\\pi r^2\\), \\(V=\\tfrac{4}{3}\\pi r^3\\).",
        sol: "<div class='code-box'>pi ← 3.1416\nLeer radio\narea ← 4 * pi * radio ^ 2\nvolumen ← (4 / 3) * pi * radio ^ 3\nEscribir \"Área:\", area\nEscribir \"Volumen:\", volumen</div>"
      },
      {
        q: "<strong>7.</strong> Calculá y mostrá cuántos segundos hay en el número de días ingresado por el usuario.",
        sol: "<div class='code-box'>Leer dias\nsegundos ← dias * 24 * 60 * 60\nEscribir \"Son\", segundos, \"segundos\"</div>"
      },
      {
        q: "<strong>9.</strong> Un profesor ingresa la cantidad de horas cátedra que trabaja. Convertilas a horas reloj mostrando horas y minutos. (1 hora cátedra = 45 minutos reloj).",
        sol: "<div class='code-box'>Leer horasCatedra\ntotalMin ← horasCatedra * 45\nhoras ← totalMin div 60\nminutos ← totalMin mod 60\nEscribir horas, \"h\", minutos, \"min\"</div>Usamos <code>div</code> para las horas completas y <code>mod</code> para los minutos sobrantes."
      },
      {
        q: "<strong>10.</strong> Contá cuántos dígitos pares e impares tiene un número dado.",
        sol: "<div class='code-box'>Leer n\npares ← 0\nimpares ← 0\nMientras n > 0 Hacer\n  d ← n mod 10\n  Si d mod 2 = 0 Entonces\n    pares ← pares + 1\n  Sino\n    impares ← impares + 1\n  FinSi\n  n ← n div 10\nFinMientras\nEscribir \"Pares:\", pares, \"Impares:\", impares</div><code>n mod 10</code> extrae el último dígito; <code>n div 10</code> lo elimina."
      },
      {
        q: "<strong>11.</strong> Dado un entero positivo, mostrá la suma de todos sus dígitos y determiná si esa suma es par o impar.",
        sol: "<div class='code-box'>Leer n\nsuma ← 0\nMientras n > 0 Hacer\n  suma ← suma + (n mod 10)\n  n ← n div 10\nFinMientras\nEscribir \"Suma de dígitos:\", suma\nSi suma mod 2 = 0 Entonces\n  Escribir \"La suma es par\"\nSino\n  Escribir \"La suma es impar\"\nFinSi</div>"
      },
      {
        q: "<strong>12.</strong> Calculá el factorial de un número. Recordá \\(n! = 1\\cdot2\\cdot3\\cdots n\\).",
        sol: "<div class='code-box'>Leer n\nfact ← 1\nPara i ← 1 Hasta n Hacer\n  fact ← fact * i\nFinPara\nEscribir n, \"! =\", fact</div>El acumulador del producto arranca en <strong>1</strong> (no en 0)."
      },
      {
        q: "<strong>17.</strong> Determiná si un número es <em>perfecto</em> (igual a la suma de sus divisores, excepto él mismo). Ej: 6 = 1+2+3.",
        sol: "<div class='code-box'>Leer n\nsuma ← 0\nPara i ← 1 Hasta n - 1 Hacer\n  Si n mod i = 0 Entonces\n    suma ← suma + i\n  FinSi\nFinPara\nSi suma = n Entonces\n  Escribir n, \"es perfecto\"\nSino\n  Escribir n, \"no es perfecto\"\nFinSi</div>"
      },
      {
        q: "<strong>14.</strong> Convertí un número \\(N\\) en base 10 a base \\(B\\) (con \\(1&lt;B&lt;10\\)) usando división reiterada.",
        sol: "<div class='code-box'>Leer N, B\nresultado ← 0\npotencia ← 1\nMientras N > 0 Hacer\n  resto ← N mod B\n  resultado ← resultado + resto * potencia\n  potencia ← potencia * 10\n  N ← N div B\nFinMientras\nEscribir \"En base\", B, \"es:\", resultado</div>Los restos, leídos de abajo hacia arriba, forman el número. Lo arma como entero para mostrarlo en orden. Probalo en el <a href='#/tool/bases'>Conversor de bases</a>."
      },
    ]
  },

  /* =============================== TP 4 — VECTORES =============================== */
  {
    id: "tp4", unit: "vectores", glyph: "[ ]",
    title: "TP N°4 · Diagramación — Vectores",
    desc: "Carga, recorrido, conteo, búsqueda y ordenamiento de arreglos.",
    exercises: [
      {
        q: "<strong>1.</strong> Permití al usuario ingresar 10 números enteros en un vector y luego mostrá la lista.",
        sol: "<div class='code-box'>Para i ← 0 Hasta 9 Hacer\n  Leer v[i]\nFinPara\n\nEscribir \"La lista es:\"\nPara i ← 0 Hasta 9 Hacer\n  Escribir v[i]\nFinPara</div>"
      },
      {
        q: "<strong>2.</strong> Cargá en un vector las edades de N estudiantes y calculá el promedio.",
        sol: "<div class='code-box'>Leer N\nsuma ← 0\nPara i ← 0 Hasta N - 1 Hacer\n  Leer v[i]\n  suma ← suma + v[i]\nFinPara\npromedio ← suma / N\nEscribir \"Promedio:\", promedio</div>"
      },
      {
        q: "<strong>4.</strong> Cargá un vector de N enteros y contá cuántos son positivos y cuántos negativos.",
        sol: "<div class='code-box'>Leer N\npos ← 0\nneg ← 0\nPara i ← 0 Hasta N - 1 Hacer\n  Leer v[i]\n  Si v[i] > 0 Entonces\n    pos ← pos + 1\n  Sino\n    Si v[i] < 0 Entonces\n      neg ← neg + 1\n    FinSi\n  FinSi\nFinPara\nEscribir \"Positivos:\", pos, \" Negativos:\", neg</div>El 0 no se cuenta ni como positivo ni como negativo."
      },
      {
        q: "<strong>5.</strong> Mostrá todos los números negativos de un vector de tamaño N.",
        sol: "<div class='code-box'>Para i ← 0 Hasta N - 1 Hacer\n  Si v[i] < 0 Entonces\n    Escribir v[i]\n  FinSi\nFinPara</div>"
      },
      {
        q: "<strong>7.</strong> Ordená un vector de menor a mayor con el método de <strong>selección</strong>.",
        sol: "<div class='code-box'>Para i ← 0 Hasta N - 2 Hacer\n  posMin ← i\n  Para j ← i + 1 Hasta N - 1 Hacer\n    Si v[j] < v[posMin] Entonces\n      posMin ← j\n    FinSi\n  FinPara\n  aux ← v[i]\n  v[i] ← v[posMin]\n  v[posMin] ← aux\nFinPara</div>En cada vuelta se busca el menor del resto y se lo intercambia a su posición."
      },
      {
        q: "<strong>8.</strong> Ordená un vector con el método de la <strong>burbuja</strong>.",
        sol: "<div class='code-box'>Para i ← 0 Hasta N - 2 Hacer\n  Para j ← 0 Hasta N - 2 - i Hacer\n    Si v[j] > v[j + 1] Entonces\n      aux ← v[j]\n      v[j] ← v[j + 1]\n      v[j + 1] ← aux\n    FinSi\n  FinPara\nFinPara</div>Compará vecinos e intercambialos; mirá la animación en el <a href='#/tool/sorting'>Visualizador de ordenamiento</a>."
      },
      {
        q: "<strong>9.</strong> Ordená un vector con el método de <strong>inserción</strong>.",
        sol: "<div class='code-box'>Para i ← 1 Hasta N - 1 Hacer\n  actual ← v[i]\n  j ← i - 1\n  Mientras j >= 0 Y v[j] > actual Hacer\n    v[j + 1] ← v[j]\n    j ← j - 1\n  FinMientras\n  v[j + 1] ← actual\nFinPara</div>Cada elemento se inserta en su lugar dentro de la parte ya ordenada de la izquierda."
      },
      {
        q: "<strong>6.</strong> Eliminá los elementos duplicados de un vector de enteros.",
        sol: "<div class='code-box'>// recorre y, por cada elemento, descarta repeticiones posteriores\ni ← 0\nMientras i < N Hacer\n  j ← i + 1\n  Mientras j < N Hacer\n    Si v[j] = v[i] Entonces\n      // correr todo a la izquierda y achicar N\n      Para k ← j Hasta N - 2 Hacer\n        v[k] ← v[k + 1]\n      FinPara\n      N ← N - 1\n    Sino\n      j ← j + 1\n    FinSi\n  FinMientras\n  i ← i + 1\nFinMientras</div>"
      },
    ]
  },

];
