/* ============================================================
   EJERCICIOS PRÁCTICOS — con solución revelable
   Cada ejercicio: { q: enunciado, sol: solución paso a paso }
   ============================================================ */
window.APP_DATA = window.APP_DATA || {};
window.APP_DATA.practica = [

  /* =============================== TADs LINEALES =============================== */
  {
    id: "p-lineales", unit: "lineales", glyph: "⇄",
    title: "Práctica · TADs Lineales",
    desc: "Colas circulares, índices, listas dobles y colas de prioridad.",
    exercises: [
      {
        q: "<strong>1.</strong> Una cola circular con array de tamaño \\(n=5\\) (base 1) está con <code>Frente=4</code>, <code>Fin=5</code>. Se hace <code>Meter(x)</code>. ¿Cuánto vale <code>Fin</code> después y dónde se guarda x?",
        sol: "Como <code>Fin == n (5)</code>, el índice <strong>envuelve</strong>: <code>Fin = 1</code>. Se guarda <code>Cola[1] = x</code>. (Regla: si Fin==n ⇒ Fin=1, sino Fin=Fin+1.)"
      },
      {
        q: "<strong>2.</strong> Misma cola (\\(n=5\\)) con <code>Frente=2</code>, <code>Fin=1</code>. Se intenta <code>Meter(y)</code>. ¿Qué ocurre?",
        sol: "Se cumple <code>Frente == Fin + 1</code> (2 == 1+1), una de las condiciones de <strong>cola llena</strong>. Resultado: <strong>Overflow</strong>, no se inserta."
      },
      {
        q: "<strong>3.</strong> Partiendo de una cola circular vacía (\\(n=4\\)), ejecutá: Meter(a), Meter(b), Meter(c), Sacar(), Meter(d), Meter(e). Indicá Frente, Fin y contenido al final.",
        sol: "Vacía: F=0,Fn=0. Meter(a): F=1,Fn=1 [a]. Meter(b): Fn=2 [a,b]. Meter(c): Fn=3 [a,b,c]. Sacar(): saca a, F=2 [b,c]. Meter(d): Fn=4 [b,c,d]. Meter(e): Fn==n ⇒ Fn=1 [e,b,c,d]. <strong>Final: Frente=2, Fin=1</strong>, contenido b,c,d,e (e en la pos 1)."
      },
      {
        q: "<strong>4.</strong> En una cola de prioridad (menor número = mayor prioridad), se insertan en orden: B(3), A(1), C(3), D(2). ¿En qué orden salen al hacer 4 veces Sacar()?",
        sol: "La lista ordenada queda A(1) → D(2) → B(3) → C(3) (B antes que C por llegar primero con igual prioridad 3). <strong>Salen: A, D, B, C.</strong>"
      },
      {
        q: "<strong>5.</strong> ¿Por qué en una lista doblemente enlazada se puede eliminar un nodo conocido en \\(O(1)\\) y en una lista simple no?",
        sol: "En la doble, el nodo guarda <code>Ant</code>, así que conozco a su anterior y puedo reconectar <code>Ant.Sig = nodo.Sig</code> y <code>nodo.Sig.Ant = nodo.Ant</code> directamente. En la simple habría que <strong>recorrer desde el inicio</strong> para encontrar el anterior: \\(O(n)\\)."
      },
    ]
  },

  /* =============================== GRAFOS I =============================== */
  {
    id: "p-grafos1", unit: "grafos1", glyph: "⬡",
    title: "Práctica · Grafos y Representación",
    desc: "Grado, matrices, conexidad y terminología.",
    exercises: [
      {
        q: "<strong>1.</strong> Grafo con \\(N=\\{1,2,3,4\\}\\) y aristas \\(\\{1,2\\},\\{2,3\\},\\{1,3\\},\\{3,3\\}\\). Hallá el grado de cada nodo e indicá si hay nodos aislados o bucles.",
        sol: "Grad(1)=2 (con 2 y 3), Grad(2)=2 (con 1 y 3), Grad(3)=4 (con 1, 2 y el bucle {3,3} que cuenta 2), Grad(4)=0. <strong>Nodo 4 aislado</strong>; <strong>{3,3} es un bucle</strong> ⇒ el grafo es un multigrafo."
      },
      {
        q: "<strong>2.</strong> Escribí la matriz de adyacencia del grafo con \\(N=\\{1,2,3\\}\\) y aristas \\(\\{1,2\\}, \\{2,3\\}\\). ¿Es simétrica?",
        sol: "$$A=\\begin{pmatrix} 0&1&0 \\\\ 1&0&1 \\\\ 0&1&0 \\end{pmatrix}$$ Sí, es <strong>simétrica</strong> (grafo no dirigido) y la diagonal es 0 (no hay bucles)."
      },
      {
        q: "<strong>3.</strong> Para ese mismo grafo, dá la matriz de costos si \\(w(\\{1,2\\})=10\\) y \\(w(\\{2,3\\})=5\\).",
        sol: "$$C=\\begin{pmatrix} 0&10&0 \\\\ 10&0&5 \\\\ 0&5&0 \\end{pmatrix}$$ Los 0 fuera de la diagonal indican \"no adyacentes\"."
      },
      {
        q: "<strong>4.</strong> ¿La sucesión de aristas \\((\\{1,2\\}, \\{2,3\\}, \\{3,1\\})\\) es un camino, camino cerrado, simple y/o ciclo?",
        sol: "Recorrido de nodos: 1→2→3→1. Es un <strong>camino</strong> (consecutivas comparten nodo), <strong>cerrado</strong> (empieza y termina en 1), <strong>simple</strong> (no repite aristas) y como los nodos intermedios son distintos, es un <strong>ciclo</strong>."
      },
      {
        q: "<strong>5.</strong> Aplicá la idea de <code>conexos(1, 4)</code> sobre un grafo donde 1–2, 2–3, 3–4 son aristas. ¿Son conexos? Mostrá el conjunto Visitados.",
        sol: "Visitados={1} → vecino 2 → {1,2} → vecino 3 → {1,2,3} → vecino 4 = q ⇒ <strong>Son conexos</strong>. El camino es 1→2→3→4."
      },
    ]
  },

  /* =============================== GRAFOS II =============================== */
  {
    id: "p-grafos2", unit: "grafos2", glyph: "⇝",
    title: "Práctica · Caminos y Recorridos",
    desc: "Euler, Dijkstra, Floyd, Prim y DFS/BFS.",
    exercises: [
      {
        q: "<strong>1.</strong> Un grafo conexo tiene grados: A=2, B=2, C=3, D=3, E=2. ¿Tiene ciclo de Euler, camino de Euler o ninguno?",
        sol: "Nodos de grado impar: C y D ⇒ <strong>2 impares</strong>. No tiene ciclo de Euler (no todos pares), pero <strong>sí camino de Euler</strong>, que debe empezar en C y terminar en D (o viceversa)."
      },
      {
        q: "<strong>2.</strong> Con Dijkstra desde A: aristas A–B=2, A–D=1, D–C=3, B–E=2, E–H=1. ¿Cuál es el costo mínimo de A a H y por qué camino?",
        sol: "Etapas: agrega D (d=1), luego B (d=2 por A–B), luego E (d=4 por B–E), luego H (d=5 por E–H). <strong>Costo mínimo A→H = 5</strong>, camino A → B → E → H."
      },
      {
        q: "<strong>3.</strong> ¿Cuál es la complejidad del algoritmo de Floyd y cuándo se detiene?",
        sol: "Tres bucles anidados \\(i,j,t\\) de \\(1..n\\) ⇒ <strong>\\(O(n^3)\\)</strong>. Se detiene cuando \\(A_k = A_{k-1}\\) (las matrices se estabilizan) o cuando \\(k=n\\)."
      },
      {
        q: "<strong>4.</strong> Con Prim desde el nodo 1, costos: (1,5)=1, (5,3)=1, (5,4)=1, (3,2)=2. ¿Qué aristas forma el árbol cubridor mínimo y cuál es su costo total?",
        sol: "Se agregan por costo mínimo: (1,5), (5,3), (5,4), (3,2). <strong>MST = {(1,5),(5,3),(5,4),(3,2)}</strong>, costo total = 1+1+1+2 = <strong>5</strong>."
      },
      {
        q: "<strong>5.</strong> ¿Qué estructura auxiliar usa BFS y cuál usa DFS? Explicá la diferencia de orden de visita.",
        sol: "<strong>BFS</strong> usa una <strong>cola</strong> (FIFO): visita por niveles (primero todos los vecinos, luego los vecinos de éstos). <strong>DFS</strong> usa la <strong>pila</strong> de recursión: avanza por un camino hasta el fondo y retrocede (backtracking)."
      },
    ]
  },

  /* =============================== ÁRBOLES =============================== */
  {
    id: "p-arboles", unit: "arboles", glyph: "⋔",
    title: "Práctica · Árboles",
    desc: "Recorridos, ABB, eliminación y AVL.",
    exercises: [
      {
        q: "<strong>1.</strong> Insertá en un ABB vacío la secuencia 50, 30, 70, 20, 40, 60. Dá el recorrido inorden.",
        sol: "El ABB queda con raíz 50, izq 30 (hijos 20 y 40), der 70 (hijo izq 60). <strong>Inorden = 20, 30, 40, 50, 60, 70</strong> (siempre ordenado en un ABB)."
      },
      {
        q: "<strong>2.</strong> Para el árbol raíz 8 (izq 3 con hijos 1 y 6; der 10 con hijo der 14→13), dá preorden y postorden.",
        sol: "<strong>Preorden</strong> (R,I,D): 8, 3, 1, 6, 10, 14, 13. <strong>Postorden</strong> (I,D,R): 1, 6, 3, 13, 14, 10, 8."
      },
      {
        q: "<strong>3.</strong> En un ABB, ¿cómo se elimina un nodo con dos hijos? Aplicalo a borrar la raíz 50 del ejercicio 1.",
        sol: "Se reemplaza por el <strong>sucesor inorden</strong> = menor del subárbol derecho = 60. La nueva raíz es 60, y se elimina el viejo 60 (que era hoja). El ABB sigue ordenado."
      },
      {
        q: "<strong>4.</strong> Insertás 3, 2, 1 en un AVL. ¿Qué desbalance ocurre y qué rotación lo corrige?",
        sol: "Tras insertar 1, la raíz 3 queda con FE=−2 y su hijo 2 con FE=−1 (caso <strong>Izquierda-Izquierda</strong>). Se aplica <strong>rotación simple a la derecha</strong>: queda 2 como raíz con hijos 1 y 3, equilibrado."
      },
      {
        q: "<strong>5.</strong> ¿Por qué un árbol 2-3 garantiza búsqueda \\(O(\\log n)\\) y un ABB común no siempre?",
        sol: "El 2-3 está <strong>siempre balanceado</strong> (todas las hojas al mismo nivel) gracias a las divisiones (split). Un ABB común puede degenerar en una lista (altura n) si se insertan claves en orden, dando búsqueda \\(O(n)\\)."
      },
    ]
  },

  /* =============================== TEORÍA DE NÚMEROS I =============================== */
  {
    id: "p-teoria1", unit: "teoria1", glyph: "÷",
    title: "Práctica · Divisibilidad",
    desc: "División entera, primos, MCD, Bézout y factorización.",
    exercises: [
      {
        q: "<strong>1.</strong> Hallá cociente y resto enteros de \\(-23 \\div 2\\). ¿Por qué el resto no es \\(-1\\)?",
        sol: "Buscamos \\(c, r\\) con \\(-23 = 2c + r\\) y \\(0 \\le r < 2\\). Tomando \\(c=-12\\): \\(2(-12) = -24\\), y \\(r = -23-(-24) = 1\\). <strong>(c, r) = (−12, 1)</strong>. El resto entero es siempre ≥ 0; el <code>%</code> de JS daría −1 por usar truncamiento hacia 0."
      },
      {
        q: "<strong>2.</strong> Calculá \\(\\text{mcd}(70, 15)\\) con el algoritmo de Euclides, mostrando cada división.",
        sol: "70 = 15·4 + 10 ⇒ mcd(15,10). 15 = 10·1 + 5 ⇒ mcd(10,5). 10 = 5·2 + 0 ⇒ mcd(5,0). <strong>mcd = 5</strong> (último resto no nulo)."
      },
      {
        q: "<strong>3.</strong> Aplicá el algoritmo extendido para hallar \\(s, t\\) con \\(s\\cdot 18 + t\\cdot 24 = \\text{mcd}(18,24)\\).",
        sol: "Euclides: 18=24·0+18; 24=18·1+6; 18=6·3+0 ⇒ mcd=6. Retornos: st(6,0)=(1,0); st(18,6)=(0,1); st(24,18)=(1,−1); st(18,24)=(−1,1). <strong>(s,t)=(−1,1)</strong>: verificación \\((-1)18 + 1\\cdot24 = 6\\) ✓."
      },
      {
        q: "<strong>4.</strong> ¿Es 91 primo? Usá el test eficiente hasta \\(\\sqrt{91}\\).",
        sol: "\\(\\sqrt{91} \\approx 9.5\\). Probamos divisores impares 3, 5, 7, 9: 91 = 7·13 ⇒ <strong>7 lo divide</strong>. Por lo tanto <strong>91 NO es primo</strong> (es compuesto)."
      },
      {
        q: "<strong>5.</strong> Factorizá 1470 en primos y usalo para hallar \\(\\text{mcm}(60, 1470)\\).",
        sol: "1470 = 2·3·5·7². 60 = 2²·3·5. Tomando el máximo exponente de cada primo: mcm = 2²·3·5·7² = 4·3·5·49 = <strong>2940</strong>. (Verificación: mcm = 60·1470/mcd; mcd=2·3·5=30, 60·1470/30 = 2940 ✓.)"
      },
    ]
  },

  /* =============================== ARITMÉTICA MODULAR =============================== */
  {
    id: "p-teoria2", unit: "teoria2", glyph: "≡",
    title: "Práctica · Aritmética Modular",
    desc: "Congruencias, Zₙ, ecuaciones, sistemas y diofánticas.",
    exercises: [
      {
        q: "<strong>1.</strong> Construí la tabla de \\(\\times_5\\) para \\(\\mathbb{Z}_5 = \\{0,1,2,3,4\\}\\) e indicá el inverso multiplicativo de 2.",
        sol: "Fila del 2: 2×0=0, 2×1=2, 2×2=4, 2×3=1, 2×4=3. Como \\(2\\times_5 3 = 1\\), el <strong>inverso de 2 es 3</strong>. (En \\(\\mathbb{Z}_5\\), por ser 5 primo, todos los no nulos tienen inverso.)"
      },
      {
        q: "<strong>2.</strong> Resolvé \\(5x \\equiv 12 \\pmod{17}\\).",
        sol: "mcd(5,17)=1 ⇒ hay solución única. \\(5^{-1}=7\\) en \\(\\mathbb{Z}_{17}\\) (porque \\(7\\cdot5=35\\equiv1\\)). \\(x \\equiv 7\\cdot12 = 84 \\equiv 16 \\pmod{17}\\). <strong>x ≡ 16</strong>; general \\(x=16+17k\\)."
      },
      {
        q: "<strong>3.</strong> ¿Tiene solución \\(4x \\equiv 1 \\pmod 6\\)? ¿Y \\(4x \\equiv 2 \\pmod 6\\)?",
        sol: "mcd(4,6)=2. Para \\(4x\\equiv1\\): \\(2 \\nmid 1\\) ⇒ <strong>NO tiene solución</strong>. Para \\(4x\\equiv2\\): \\(2 \\mid 2\\) ⇒ <strong>SÍ</strong>, una solución es \\(x=2\\) (\\(4\\cdot2=8\\equiv2\\))."
      },
      {
        q: "<strong>4.</strong> Resolvé el sistema \\(x \\equiv 2 \\pmod 3\\), \\(x \\equiv 4 \\pmod 5\\).",
        sol: "De la 1ª: \\(x = 2 + 3k\\). En la 2ª: \\(2+3k \\equiv 4 \\pmod 5 ⇒ 3k \\equiv 2 \\pmod 5\\). Como \\(3^{-1}=2\\): \\(k \\equiv 4\\), \\(k=4+5k'\\). Sustituyendo: \\(x = 2+3(4+5k') = 14 + 15k'\\). <strong>x = 14</strong> (mod 15)."
      },
      {
        q: "<strong>5.</strong> Resolvé la diofántica \\(2x + 6y = 8\\) y dá una solución con \\(x, y > 0\\).",
        sol: "\\(d=\\text{mcd}(2,6)=2\\), \\(2 \\mid 8\\) ⇒ hay solución. \\((s,t)=\\text{st}(1,3)=(-2,1)\\). \\(x_0=-2\\cdot4=-8\\), \\(y_0=1\\cdot4=4\\). General: \\(x=-8+3\\lambda\\), \\(y=4-\\lambda\\). Con \\(\\lambda=3\\): <strong>(x,y)=(1,1)</strong>. Verificación: \\(2+6=8\\) ✓."
      },
    ]
  },

  /* =============================== DISEÑO Y PRUEBA =============================== */
  {
    id: "p-prueba", unit: "prueba", glyph: "✓",
    title: "Práctica · Diseño y Prueba",
    desc: "Estrategias de diseño y prueba del software.",
    exercises: [
      {
        q: "<strong>1.</strong> Clasificá cada algoritmo del curso según su estrategia de diseño: Dijkstra, Floyd, DFS, búsqueda en ABB.",
        sol: "<strong>Dijkstra</strong>: voraz (greedy). <strong>Floyd</strong>: programación dinámica. <strong>DFS</strong>: backtracking. <strong>Búsqueda en ABB</strong>: divide y vencerás (descarta medio árbol en cada paso)."
      },
      {
        q: "<strong>2.</strong> Indicá qué tipo de prueba corresponde: (a) verificar que <code>esVacia()</code> de una cola funcione; (b) que la cola se integre con el módulo de prioridades; (c) que el programa completo cumpla los requisitos.",
        sol: "(a) Prueba <strong>unitaria</strong>. (b) Prueba de <strong>integración</strong>. (c) Prueba de <strong>sistema</strong>."
      },
      {
        q: "<strong>3.</strong> Al probar un bucle <code>while</code> que recorre una cola circular, ¿qué dos cosas hay que verificar especialmente?",
        sol: "(1) El <strong>número correcto de iteraciones</strong> (que recorra todos los elementos sin saltarse ninguno por la envoltura de índices). (2) La <strong>ausencia de ciclos infinitos</strong> (que la condición de parada se alcance, p. ej. al volver al Frente)."
      },
      {
        q: "<strong>4.</strong> Diferenciá prueba de verificación y dá un ejemplo de técnica de verificación que NO ejecute el código.",
        sol: "<strong>Prueba</strong>: ejecutar con entradas para hallar errores. <strong>Verificación</strong>: garantizar que cumple los requisitos. Técnica sin ejecutar: <strong>análisis estático</strong> (p. ej. detectar variables no usadas) o la <strong>revisión de código</strong>."
      },
      {
        q: "<strong>5.</strong> Escribí un bloque <code>try/catch</code> en C++ que maneje una división por cero.",
        sol: "<pre class='code'>try {\n   if (b == 0) throw \"division por cero\";\n   c = a / b;\n}\ncatch (const char* msg) {\n   cout &lt;&lt; \"Error: \" &lt;&lt; msg;\n}</pre> El <code>throw</code> lanza la excepción y el <code>catch</code> la captura, evitando que el programa se detenga abruptamente."
      },
    ]
  },

];
