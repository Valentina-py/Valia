window.COURSE_DATA = {
  slug: "programacion-2",
  title: "Programación II",
  shortTitle: "Programación II",
  meta: "Python · 2.º año · 2026",
  mark: "Py",
  kicker: "Valía · Sistemas · Segundo año",
  subtitle: "Python desde entrada y salida hasta funciones, listas, tuplas y diccionarios, con los trabajos prácticos y modelos de parcial de la cátedra.",
  accent: "#7C3AED",
  accent2: "#06B6D4",
  updated: "11/09/2026",
  coverage: "Incluye todo lo trabajado en los TP 1 a 4, la presentación de condicionales, el material de listas, el tutorial de funciones, tuplas y diccionarios y los dos modelos de primer parcial. Los libros generales quedan registrados como bibliografía de consulta.",
  units: [
    {
      id: "datos",
      glyph: "01",
      title: "Datos, entrada y salida",
      desc: "Variables, tipos, input, print, conversiones, operadores y formato con f-strings.",
      html: `
        <p class="lead">Todo programa empieza recibiendo datos, transformándolos y mostrando un resultado. En Python el tipo se asocia al valor: <code>25</code> es <code>int</code>, <code>29.9</code> es <code>float</code>, <code>"texto"</code> es <code>str</code> y <code>False</code> es <code>bool</code>.</p>
        <h2>Entrada y conversión</h2>
        <p><code>input()</code> siempre devuelve texto. Si necesitás calcular, convertí antes con <code>int()</code> o <code>float()</code>.</p>
        <pre><code>nombre = input("Nombre: ")
edad = int(input("Edad: "))
radio = float(input("Radio: "))
area = 3.14159265 * radio ** 2
print(f"{nombre}, el área es {area:.2f}")</code></pre>
        <h2>Tipos y conversiones</h2>
        <div class="table-wrap"><table><thead><tr><th>Dato</th><th>Tipo</th><th>Conversión habitual</th></tr></thead><tbody><tr><td>Edad, contador</td><td><code>int</code></td><td><code>int("25")</code></td></tr><tr><td>Precio, promedio</td><td><code>float</code></td><td><code>float("5.30")</code></td></tr><tr><td>Nombre, frase</td><td><code>str</code></td><td><code>str(10)</code></td></tr><tr><td>Estado lógico</td><td><code>bool</code></td><td><code>bool(valor)</code></td></tr></tbody></table></div>
        <div class="callout"><strong>Atención.</strong> <code>bool("False")</code> da <code>True</code> porque la cadena no está vacía. Para leer sí/no hay que comparar el texto ingresado.</div>
        <h2>Operadores y f-strings</h2>
        <p>Los operadores principales son <code>+ - * / // % **</code>. Las f-strings insertan expresiones dentro de llaves: <code>f"Total: {total:.2f}"</code>. El especificador <code>.2f</code> muestra dos decimales.</p>
        <h2>Diseño de una solución</h2>
        <ol><li>Identificá entradas y sus tipos.</li><li>Escribí la fórmula o transformación.</li><li>Validá los datos que podrían causar errores.</li><li>Mostrá el resultado con un mensaje claro y unidades.</li></ol>`,
      quiz: [
        { q: "¿Qué tipo devuelve siempre <code>input()</code>?", opts: ["int", "float", "str", "bool"], a: 2, exp: "La entrada llega como cadena; se convierte si hace falta." },
        { q: "¿Qué expresión calcula el área de un círculo?", opts: ["pi * radio", "pi * radio ** 2", "2 * pi * radio ** 2", "radio / pi"], a: 1, exp: "Área = π por radio al cuadrado." },
        { q: "¿Cómo se muestran dos decimales en una f-string?", opts: ["{x:2}", "{x:.2f}", "{x:float}", "{2:x}"], a: 1, exp: "El formato .2f fija dos cifras decimales." },
        { q: "El valor <code>False</code> sin comillas es de tipo…", opts: ["str", "int", "bool", "float"], a: 2, exp: "Es uno de los dos valores booleanos de Python." }
      ],
      cards: [
        { q: "¿Qué devuelve input()?", a: "Siempre devuelve una cadena <code>str</code>." },
        { q: "Conversión a entero", a: "<code>int(valor)</code>." },
        { q: "Potencia en Python", a: "Se usa <code>**</code>; por ejemplo <code>radio ** 2</code>." },
        { q: "Resto de una división", a: "Se calcula con <code>%</code>." },
        { q: "Dos decimales en f-string", a: "<code>f\"{valor:.2f}\"</code>." },
        { q: "Comprobar el tipo", a: "La función <code>type(variable)</code>." }
      ]
    },
    {
      id: "condiciones",
      glyph: "if",
      title: "Condiciones y decisiones",
      desc: "Operadores relacionales y lógicos, if/elif/else, rangos y decisiones excluyentes.",
      html: `
        <p class="lead">Una condición es una expresión que se evalúa como <code>True</code> o <code>False</code>. Con <code>if</code>, <code>elif</code> y <code>else</code> el programa elige qué bloque ejecutar.</p>
        <h2>Comparar y combinar</h2>
        <div class="table-wrap"><table><thead><tr><th>Grupo</th><th>Operadores</th><th>Uso</th></tr></thead><tbody><tr><td>Relacionales</td><td><code>== != &lt; &lt;= &gt; &gt;=</code></td><td>Comparar valores</td></tr><tr><td>Lógicos</td><td><code>and or not</code></td><td>Combinar o negar condiciones</td></tr><tr><td>Pertenencia</td><td><code>in</code>, <code>not in</code></td><td>Buscar dentro de una colección</td></tr></tbody></table></div>
        <pre><code>edad = int(input("Edad: "))
salario = float(input("Salario anual: "))

if edad >= 30 and salario <= 50000:
    porcentaje = 10
elif edad >= 25 and salario <= 40000:
    porcentaje = 5
elif edad >= 20 and salario <= 30000:
    porcentaje = 2
else:
    porcentaje = 0</code></pre>
        <div class="callout"><strong>El orden importa.</strong> En una cadena <code>if/elif</code> se ejecuta solo la primera condición verdadera. Los criterios del aumento se revisan desde el más restrictivo.</div>
        <h2>Rangos sin superposición</h2>
        <pre><code>if 0 <= numero <= 20:
    resultado = numero ** 2
elif numero <= 40:
    resultado = numero ** 0.5
elif numero <= 60:
    resultado = "par" if numero % 2 == 0 else "impar"</code></pre>
        <p>Cuando hay operaciones peligrosas, validá antes. Para dividir: <code>if divisor != 0</code>. Para comparar texto sin distinguir mayúsculas: <code>entrada.lower() == clave.lower()</code>.</p>`,
      quiz: [
        { q: "¿Qué operador comprueba igualdad?", opts: ["=", "==", "!=", "is not"], a: 1, exp: "Un solo = asigna; dos == comparan." },
        { q: "¿Qué expresión detecta un número par?", opts: ["n / 2 == 0", "n % 2 == 0", "n // 2 == 1", "n ** 2 == 0"], a: 1, exp: "El resto al dividir por 2 debe ser cero." },
        { q: "En una cadena if/elif, si dos condiciones son verdaderas…", opts: ["Se ejecutan ambas", "Se ejecuta la última", "Se ejecuta la primera verdadera", "Da error"], a: 2, exp: "La cadena se detiene en la primera rama verdadera." },
        { q: "Para evitar dividir por cero se comprueba…", opts: ["divisor == 0 antes de dividir", "divisor != 0 antes de dividir", "resultado != 0", "dividendo > 0"], a: 1, exp: "Solo se divide cuando el divisor es distinto de cero." }
      ],
      cards: [
        { q: "Asignación vs igualdad", a: "<code>=</code> asigna; <code>==</code> compara." },
        { q: "Operadores lógicos", a: "<code>and</code>, <code>or</code> y <code>not</code>." },
        { q: "¿Para qué sirve elif?", a: "Para evaluar otra condición solo si las anteriores fueron falsas." },
        { q: "Comparar texto sin mayúsculas", a: "Normalizar ambos textos con <code>.lower()</code> o <code>.casefold()</code>." },
        { q: "Validación de división", a: "Comprobar <code>divisor != 0</code>." },
        { q: "Condición de rango", a: "Python permite <code>inicio &lt;= x &lt;= fin</code>." }
      ]
    },
    {
      id: "repeticion",
      glyph: "↻",
      title: "Estructuras de repetición",
      desc: "for, while, contadores, acumuladores, centinelas, break y procesamiento de cadenas.",
      html: `
        <p class="lead">Los ciclos resuelven tareas repetitivas. <code>for</code> conviene cuando conocés la colección o la cantidad de iteraciones; <code>while</code>, cuando repetís mientras una condición siga siendo verdadera.</p>
        <h2>Contador y acumulador</h2>
        <pre><code>suma_pares = 0
cantidad_impares = 0

while True:
    numero = int(input("Número: "))
    if numero % 2 == 0:
        suma_pares += numero
    else:
        cantidad_impares += 1
    if numero % 5 == 0:
        break</code></pre>
        <p>Un <strong>contador</strong> suma uno por cada caso; un <strong>acumulador</strong> suma valores. Inicializalos antes del ciclo y actualizalos dentro.</p>
        <h2>Formas de finalizar</h2>
        <ul><li><strong>Cantidad fija:</strong> <code>for _ in range(16)</code>.</li><li><strong>Centinela:</strong> termina al ingresar un valor especial, como 999.</li><li><strong>Pedido del usuario:</strong> una respuesta s/n controla el <code>while</code>.</li><li><strong>Condición alcanzada:</strong> por ejemplo, más de siete números primos.</li><li><strong>Interrupción:</strong> <code>break</code> sale del ciclo actual.</li></ul>
        <h2>Procesar caracteres</h2>
        <pre><code>mayusculas = minusculas = vocales = digitos = 0
while True:
    caracter = input("Carácter: ")
    if caracter == " ":
        break
    if caracter.isupper(): mayusculas += 1
    if caracter.islower(): minusculas += 1
    if caracter.lower() in "aeiou": vocales += 1
    if caracter.isdigit(): digitos += 1</code></pre>
        <div class="callout"><strong>Promedios seguros.</strong> Antes de dividir un acumulador por un contador, comprobá que el contador sea mayor que cero.</div>`,
      quiz: [
        { q: "¿Cuándo suele convenir <code>while</code>?", opts: ["Cuando la cantidad es fija", "Cuando la repetición depende de una condición", "Solo para listas", "Nunca en Python"], a: 1, exp: "while repite mientras su condición sea verdadera." },
        { q: "¿Qué instrucción interrumpe el ciclo actual?", opts: ["stop", "return", "break", "exitloop"], a: 2, exp: "break sale del for o while más cercano." },
        { q: "Una variable que suma los valores ingresados es un…", opts: ["centinela", "acumulador", "índice", "booleano"], a: 1, exp: "El acumulador conserva la suma parcial." },
        { q: "¿Qué método detecta dígitos en una cadena?", opts: ["isdigit()", "isnumbered()", "numeric()", "isint()"], a: 0, exp: "str.isdigit() informa si los caracteres son dígitos." }
      ],
      cards: [
        { q: "for vs while", a: "for recorre una colección o rango; while depende de una condición." },
        { q: "¿Qué es un centinela?", a: "Un valor especial que indica el fin de la entrada, como 999." },
        { q: "Contador", a: "Variable que aumenta normalmente de uno en uno." },
        { q: "Acumulador", a: "Variable que va sumando o combinando valores." },
        { q: "break", a: "Interrumpe el ciclo actual." },
        { q: "Riesgo al calcular un promedio", a: "Dividir por cero si no hubo datos válidos." }
      ]
    },
    {
      id: "listas",
      glyph: "[ ]",
      title: "Listas y slicing",
      desc: "Creación, índices, cortes, mutabilidad, métodos, búsqueda, recorrido y borrado.",
      html: `
        <p class="lead">Una lista es una colección ordenada y mutable. Puede crecer, cambiar y contener elementos de distintos tipos, aunque normalmente se usa para datos del mismo tipo.</p>
        <pre><code>numeros = [1, 2, 3, 4, 5]
vacia = []
heterogenea = [1, 2.5, "hola", True]
matriz = [[1, 2], [3, 4]]</code></pre>
        <h2>Índices y cortes</h2>
        <div class="table-wrap"><table><thead><tr><th>Expresión</th><th>Resultado sobre [1,2,3,4,5,6,7,8,9]</th></tr></thead><tbody><tr><td><code>lista[2]</code></td><td>3</td></tr><tr><td><code>lista[:3]</code></td><td>[1, 2, 3]</td></tr><tr><td><code>lista[3:]</code></td><td>[4, 5, 6, 7, 8, 9]</td></tr><tr><td><code>lista[::2]</code></td><td>[1, 3, 5, 7, 9]</td></tr><tr><td><code>lista[::-1]</code></td><td>[9, 8, 7, 6, 5, 4, 3, 2, 1]</td></tr></tbody></table></div>
        <p>La forma general es <code>lista[inicio:fin:paso]</code>. El inicio se incluye y el fin se excluye.</p>
        <h2>Métodos esenciales</h2>
        <ul><li><code>append(x)</code>: agrega al final.</li><li><code>insert(i, x)</code>: inserta en una posición.</li><li><code>remove(x)</code>: elimina la primera aparición del valor.</li><li><code>pop(i)</code>: elimina y devuelve; sin índice quita el último.</li><li><code>count(x)</code> e <code>index(x)</code>: cuentan y localizan.</li><li><code>reverse()</code>: invierte la lista en el lugar.</li></ul>
        <h2>Eliminar con del</h2>
        <pre><code>lista = [1, 2, 3, 999, 4, 5]
del lista[3]

otra = [1, 2, 3, 4, 5, 6, 7, 8, 9]
del otra[4:7]</code></pre>
        <div class="callout"><strong>Mutabilidad.</strong> Una lista puede cambiar; una cadena y una tupla no permiten reemplazar o borrar un elemento por índice.</div>`,
      quiz: [
        { q: "¿Qué devuelve <code>[1,2,3,4][::-1]</code>?", opts: ["[1,2,3,4]", "[4,3,2,1]", "[2,4]", "Error"], a: 1, exp: "El paso -1 recorre desde el final." },
        { q: "¿Qué método agrega un elemento al final?", opts: ["add", "push", "append", "insertLast"], a: 2, exp: "list.append(x) lo agrega al final." },
        { q: "En un slicing, el índice final…", opts: ["Se incluye", "Se excluye", "Solo se incluye con paso 1", "Siempre es -1"], a: 1, exp: "El límite superior del corte no se incluye." },
        { q: "¿Qué método elimina y devuelve el último elemento?", opts: ["remove()", "pop()", "del()", "clearOne()"], a: 1, exp: "pop() sin índice trabaja con el último elemento." }
      ],
      cards: [
        { q: "Propiedad principal de una lista", a: "Es ordenada y mutable." },
        { q: "Slicing general", a: "<code>lista[inicio:fin:paso]</code>." },
        { q: "Invertir con slicing", a: "<code>lista[::-1]</code>." },
        { q: "append vs insert", a: "append agrega al final; insert coloca en un índice." },
        { q: "remove vs pop", a: "remove busca un valor; pop quita por índice y lo devuelve." },
        { q: "Longitud de una lista", a: "<code>len(lista)</code>." }
      ]
    },
    {
      id: "funciones",
      glyph: "def",
      title: "Funciones, tuplas y diccionarios",
      desc: "Código reutilizable, parámetros y retorno; colecciones inmutables y pares clave-valor.",
      html: `
        <p class="lead">Las funciones organizan y reutilizan lógica; las tuplas representan secuencias que no deberían cambiar; los diccionarios guardan datos asociados a claves.</p>
        <h2>Funciones</h2>
        <pre><code>def calcular_area(base, altura):
    return base * altura

area = calcular_area(7, 4)</code></pre>
        <p>Los <strong>parámetros</strong> aparecen en la definición. Los <strong>argumentos</strong> son los valores enviados al llamar. <code>return</code> devuelve el resultado; sin él la función devuelve <code>None</code>.</p>
        <h2>Tuplas</h2>
        <pre><code>estudiante = ("Carlos Pérez", 20, 8.75)
nombre, edad, promedio = estudiante
puntos = ((10, 20), (30, 40), (50, 60))
y_del_segundo = puntos[1][1]</code></pre>
        <p>Son ordenadas e inmutables. Admiten índices, <code>count()</code>, <code>index()</code>, concatenación y desempaquetado.</p>
        <h2>Diccionarios</h2>
        <pre><code>libro = {"titulo": "Cien años de soledad", "año": 1967}
libro["editorial"] = "Sudamericana"
for clave, valor in libro.items():
    print(clave, valor)</code></pre>
        <p>Cada clave es única. Se accede por clave, no por posición. Los diccionarios son mutables y pueden anidarse.</p>
        <div class="table-wrap"><table><thead><tr><th>Estructura</th><th>Ordenada</th><th>Mutable</th><th>Acceso</th></tr></thead><tbody><tr><td>Lista</td><td>Sí</td><td>Sí</td><td>Índice</td></tr><tr><td>Tupla</td><td>Sí</td><td>No</td><td>Índice</td></tr><tr><td>Diccionario</td><td>Conserva inserción</td><td>Sí</td><td>Clave</td></tr></tbody></table></div>`,
      quiz: [
        { q: "Si una función no ejecuta <code>return</code>, devuelve…", opts: ["0", "False", "None", "una cadena vacía"], a: 2, exp: "None es el retorno implícito." },
        { q: "¿Cuál colección es inmutable?", opts: ["list", "dict", "tuple", "set mutable"], a: 2, exp: "Una tupla no permite reemplazar sus elementos." },
        { q: "¿Cómo se recorren clave y valor de un diccionario?", opts: ["for k, v in d.items()", "for k + v in d", "for d[k]", "d.loop()"], a: 0, exp: "items() entrega pares clave-valor." },
        { q: "Parámetro y argumento se diferencian porque…", opts: ["Son exactamente lo mismo", "El parámetro está en la definición y el argumento en la llamada", "El argumento solo puede ser texto", "El parámetro siempre retorna"], a: 1, exp: "La definición declara parámetros; la llamada aporta argumentos." }
      ],
      cards: [
        { q: "Palabra para definir una función", a: "<code>def</code>." },
        { q: "¿Qué hace return?", a: "Finaliza la función y devuelve uno o más valores." },
        { q: "Tupla", a: "Colección ordenada e inmutable." },
        { q: "Desempaquetado", a: "Asignar los elementos a varias variables: <code>a, b = (1, 2)</code>." },
        { q: "Diccionario", a: "Colección mutable de pares clave-valor con claves únicas." },
        { q: "Recorrer un diccionario", a: "<code>for clave, valor in diccionario.items()</code>." }
      ]
    }
  ],
  practices: [
    {
      id: "tp1",
      unit: "datos",
      title: "TP 1 · Entrada y salida",
      desc: "Tipos, variables, f-strings, conversiones y cálculos directos.",
      exercises: [
        { q: "Clasificá por tipo Python: <code>25</code>, <code>29.9</code>, <code>\"Ingrese un número\"</code>, <code>False</code>, <code>'s'</code>.", sol: "Corresponden a <code>int</code>, <code>float</code>, <code>str</code>, <code>bool</code> y <code>str</code>. Python no tiene un tipo char separado." },
        { q: "Pedí nombre y edad y mostralos en una frase.", sol: "Leé el nombre con <code>input()</code>, la edad con <code>int(input(...))</code> y usá una f-string: <code>print(f\"{nombre} tiene {edad} años\")</code>." },
        { q: "Calculá el área de un círculo a partir del radio y mostrala con dos decimales.", sol: "<code>area = 3.14159265 * radio ** 2</code> y <code>print(f\"Área: {area:.2f}\")</code>." },
        { q: "Convertí <code>'5'</code> a entero, <code>10.52</code> a entero, <code>'5.30'</code> a float y <code>10</code> a texto.", sol: "Usá <code>int('5')</code>, <code>int(10.52)</code>, <code>float('5.30')</code> y <code>str(10)</code>; verificá con <code>type()</code>." },
        { q: "Armá la frase “la suma de 5 + 10 es igual a 15” a partir de variables numéricas y de texto.", sol: "La salida más clara es una f-string: <code>f\"{c}{a}{d}{b}{e}\"</code>. También se puede convertir cada número con <code>str()</code>." },
        { q: "Registrá tres productos, sus precios y la cantidad del primero; calculá subtotales y total.", sol: "Separá entrada, cálculo y salida. <code>subtotal1 = cantidad1 * precio1</code>; los otros subtotales dependen de sus cantidades; <code>total = subtotal1 + subtotal2 + subtotal3</code>." }
      ]
    },
    {
      id: "tp2",
      unit: "condiciones",
      title: "TP 2 · Condicionales",
      desc: "Comparaciones, operaciones seguras, descuentos, rangos y decisiones múltiples.",
      exercises: [
        { q: "Leé un número e indicá si es positivo o si es negativo/cero.", sol: "Usá <code>if numero &gt; 0</code>; en <code>else</code> quedan cero y negativos." },
        { q: "Guardá una contraseña y comparala sin distinguir mayúsculas y minúsculas.", sol: "Compará <code>entrada.casefold() == clave.casefold()</code>." },
        { q: "Calculá suma, resta, producto y división de dos números sin dividir por cero.", sol: "Las tres primeras operaciones siempre son válidas. Para la división, ejecutá solo si <code>b != 0</code>; si no, informá el error." },
        { q: "Calculá el salario semanal con horas extra pagadas a 1,5 veces después de 40 horas.", sol: "Si <code>horas &lt;= 40</code>, salario = horas × tarifa. Si no: <code>40*tarifa + (horas-40)*tarifa*1.5</code>." },
        { q: "Clasificá un número por signo, paridad y si es múltiplo de 3, guardando todo en una sola cadena.", sol: "Construí cada parte por separado y después concatená: signo según &gt;0/&lt;0, paridad con <code>% 2</code> y múltiplo con <code>% 3</code>." },
        { q: "Aplicá la operación indicada por los rangos 0–20, 21–40, 41–60, 61–80 y 81–99.", sol: "Usá una cadena <code>if/elif</code> de menor a mayor. En 61–80 podés invertir con división entera y resto; en 81–99 restá 45 y sumá sus dígitos." }
      ]
    },
    {
      id: "tp3-4",
      unit: "repeticion",
      title: "TP 3 y 4 · Repetición",
      desc: "Series numéricas, centinelas, primos, promedios, máximos, mínimos y caracteres.",
      exercises: [
        { q: "Ingresá N números y contá cuántos son pares, mostrando cada par.", sol: "Leé N, repetí <code>for _ in range(n)</code>, comprobá <code>numero % 2 == 0</code>, imprimí y aumentá el contador." },
        { q: "Sumá los N primeros impares; después adaptalo para pares y múltiplos de 3.", sol: "Podés recorrer naturales y contar cuántos valores cumplen, o generar directamente: impares <code>2*i+1</code>, pares <code>2*(i+1)</code>, múltiplos <code>3*(i+1)</code>." },
        { q: "Determiná si N es perfecto.", sol: "Sumá sus divisores propios recorriendo de 1 a N−1 (o hasta N/2). Es perfecto si la suma final es N; 28 = 1+2+4+7+14." },
        { q: "Ingresá números hasta 999; contá pares y sumá impares.", sol: "Usá un <code>while</code>. Leé el número, comprobá primero el centinela y luego actualizá contador o acumulador." },
        { q: "Ingresá caracteres hasta un espacio y contá mayúsculas, minúsculas, vocales, J y dígitos.", sol: "Usá <code>isupper()</code>, <code>islower()</code>, <code>lower() in 'aeiou'</code>, comparación con <code>'J'</code> e <code>isdigit()</code>." },
        { q: "Calculá el máximo de valores ingresados hasta que el usuario decida terminar.", sol: "Inicializá el máximo con el primer valor válido, no con cero. En cada vuelta: <code>if valor &gt; maximo: maximo = valor</code>." },
        { q: "Dibujá el triángulo invertido pedido para una altura mínima de 5.", sol: "En cada fila aumentan los espacios iniciales y disminuyen los asteriscos. Separá el cálculo de espacios, centro y signos <code>+</code>." }
      ]
    },
    {
      id: "listas-parcial",
      unit: "listas",
      title: "Listas y modelos de parcial",
      desc: "Slicing, canasta de compras, palíndromos y ejercicios integradores.",
      exercises: [
        { q: "Guardá los números del 1 al 10 y mostralos en orden inverso usando slicing.", sol: "<code>numeros = list(range(1, 11))</code> y <code>print(numeros[::-1])</code>." },
        { q: "Creá una canasta como lista de tuplas (artículo, precio) hasta que el usuario termine y calculá el total.", sol: "Agregá <code>(articulo, precio)</code> con <code>append</code>. Después recorré la lista, mostrá cada par y acumulá el segundo elemento." },
        { q: "Eliminá del abecedario las letras cuyas posiciones originales sean múltiplos de 3.", sol: "No borres mientras recorrés de izquierda a derecha porque cambian los índices. Construí una nueva lista filtrando los índices o eliminá desde el final." },
        { q: "Comprobá con slicing si una palabra es palíndromo sin distinguir mayúsculas.", sol: "Normalizá: <code>palabra = palabra.casefold()</code>. Es palíndromo si <code>palabra == palabra[::-1]</code>." },
        { q: "Analizá caracteres hasta un espacio y reportá letras, mayúsculas, minúsculas, vocales, J/j y dígitos.", sol: "Es un ejercicio integrador de condiciones y ciclos. Mantené contadores separados y actualizalos después de clasificar cada carácter." },
        { q: "Resolvé el modelo de aumento salarial con cuatro decimales.", sol: "Aplicá los criterios desde el más restrictivo y calculá <code>aumento = salario * porcentaje / 100</code>. Mostrá con <code>{aumento:.4f}</code>." }
      ]
    },
    {
      id: "funciones-estructuras",
      unit: "funciones",
      title: "Funciones, tuplas y diccionarios",
      desc: "Ejercicios resueltos del tutorial de la cátedra.",
      exercises: [
        { q: "Definí una función que reciba dos números y devuelva la suma.", sol: "<code>def sumar(a, b): return a + b</code>. Guardá o imprimí el valor retornado al llamar." },
        { q: "Definí una función que calcule el área de un rectángulo.", sol: "La función recibe base y altura y retorna <code>base * altura</code>." },
        { q: "Creá una tupla con nombre, edad y promedio y desempaquetala.", sol: "<code>estudiante = ('Carlos', 20, 8.75)</code> y <code>nombre, edad, promedio = estudiante</code>." },
        { q: "Contá cuántas veces aparece “manzana” en una tupla de frutas.", sol: "Usá <code>frutas.count('manzana')</code>." },
        { q: "Representá un libro con título, autor y año; agregá editorial y modificá el año.", sol: "Usá un diccionario. Agregá o cambiá con <code>libro['clave'] = valor</code>." },
        { q: "Recorré un diccionario de puntajes mostrando nombre y valor.", sol: "<code>for nombre, puntaje in puntajes.items(): print(nombre, puntaje)</code>." }
      ]
    }
  ],
  sources: [
    { title: "TP N.º 1 Entrada y Salida", note: "4 páginas · variables, tipos, f-strings y conversiones" },
    { title: "TP N.º 2 Estructura if", note: "6 páginas · condiciones y problemas aplicados" },
    { title: "TP N.º 3 Entrada y Salida", note: "14 consignas integradoras" },
    { title: "TP N.º 4 Estructuras de repetición", note: "21 consignas de ciclos, contadores y acumuladores" },
    { title: "Contenedores Listas", note: "21 páginas · índices, slicing, métodos y borrado" },
    { title: "Estructuras condicionales if", note: "25 diapositivas de la cátedra" },
    { title: "Modelo de primer parcial", note: "5 ejercicios" },
    { title: "Primer examen parcial", note: "Imagen con 5 ejercicios integradores" },
    { title: "Tutorial de Python Funciones Tuplas y Diccionarios", note: "9 páginas · teoría y ejercicios resueltos" },
    { title: "Python para todos", note: "Libro de consulta general" },
    { title: "Python 2.1 Bible", note: "Libro de consulta general" }
  ]
};

window.COURSE_TOOL = {
  title: "Laboratorio de listas",
  desc: "Probá índices y slicing con tus propios datos y observá el resultado sin instalar Python.",
  mount(root, helpers) {
    root.innerHTML = `
      <div class="form-grid">
        <div class="field"><label for="listValues">Valores separados por coma</label><input id="listValues" value="1, 2, 3, 4, 5, 6, 7, 8, 9"></div>
        <div class="field"><label for="sliceExpression">Corte inicio:fin:paso</label><input id="sliceExpression" value="::-1" placeholder="2:7:2"></div>
      </div>
      <div class="btn-row"><button class="btn btn--primary" id="runSlice">Evaluar slicing</button></div>
      <div class="tool-result" id="sliceResult">Ingresá un corte y evaluá.</div>
      <div class="callout"><strong>Recordatorio.</strong> El inicio se incluye, el fin se excluye y un paso negativo recorre hacia atrás.</div>`;

    const parseIndex = (text, length, fallback) => {
      if (text === "") return fallback;
      const value = Number(text);
      if (!Number.isInteger(value)) throw new Error("Los índices deben ser enteros.");
      return value < 0 ? Math.max(0, length + value) : Math.min(length, value);
    };
    root.querySelector("#runSlice").addEventListener("click", () => {
      const values = root.querySelector("#listValues").value.split(",").map(value => value.trim()).filter(Boolean);
      const expression = root.querySelector("#sliceExpression").value.trim();
      const parts = expression.split(":");
      const result = root.querySelector("#sliceResult");
      try {
        if (parts.length < 2 || parts.length > 3) throw new Error("Usá la forma inicio:fin:paso.");
        const step = parts[2] === undefined || parts[2] === "" ? 1 : Number(parts[2]);
        if (!Number.isInteger(step) || step === 0) throw new Error("El paso debe ser un entero distinto de cero.");
        let start = parseIndex(parts[0], values.length, step > 0 ? 0 : values.length - 1);
        let end;
        if (parts[1] === "") end = step > 0 ? values.length : -1;
        else {
          end = Number(parts[1]);
          if (!Number.isInteger(end)) throw new Error("El fin debe ser entero.");
          if (end < 0) end = values.length + end;
        }
        const output = [];
        if (step > 0) for (let i = start; i < Math.min(end, values.length); i += step) output.push(values[i]);
        else for (let i = Math.min(start, values.length - 1); i > end && i >= 0; i += step) output.push(values[i]);
        result.innerHTML = `<strong>lista[${helpers.escapeHtml(expression)}]</strong><br><code>[${output.map(helpers.escapeHtml).join(", ")}]</code>`;
      } catch (error) {
        result.textContent = error.message;
      }
    });
  }
};
