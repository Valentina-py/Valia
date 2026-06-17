/* ============================================================
   CONTENIDO DE ESTUDIO — Algoritmos y Estructuras de Datos
   Unidades: TADs Lineales · Grafos (representación) · Grafos (caminos)
             · Árboles · Teoría de Números · Aritmética Modular
             · Diseño y Prueba de Algoritmos
   ============================================================ */
window.APP_DATA = {
  units: [

  /* ===================================================================
     UNIDAD 1 — TADs LINEALES: LISTAS Y COLAS
     =================================================================== */
  {
    id: "lineales",
    glyph: "⇄",
    title: "TADs Lineales: Listas y Colas",
    desc: "Lista doblemente enlazada, cola con lista doble, cola circular (array y enlazada) y cola de prioridad.",
    tool: "colacircular",
    html: `
      <p class="lead">Un <strong>Tipo Abstracto de Datos (TAD)</strong> describe un conjunto de datos y las operaciones permitidas sobre ellos, sin atarse a una implementación concreta. En esta unidad vemos contenedores <strong>lineales</strong>: los elementos se organizan uno detrás de otro.</p>

      <h2>Lista doblemente enlazada</h2>
      <p>Cada <strong>nodo</strong> guarda un dato y <strong>dos enlaces</strong>: <code>Ant</code> (anterior) y <code>Sig</code> (siguiente). Dos punteros externos marcan los extremos: <code>Fr</code> (Frente) y <code>Fn</code> (Fin). El primer nodo tiene <code>Ant = Null</code> y el último <code>Sig = Null</code>.</p>
      <pre class="code"><span class="cm">// nodo de lista doble</span>
struct nodo {
   int dato;
   struct nodo *Ant, *Sig;
};</pre>
      <p>La ventaja sobre la lista simple: se puede recorrer en <strong>ambos sentidos</strong> (ascendente sobre <code>Sig</code> desde el Frente; descendente sobre <code>Ant</code> desde el Fin) y eliminar un nodo conocido en \\(O(1)\\) sin buscar su anterior. Operaciones típicas: <em>inicializar, esVacia, insertarDelante, insertarDetras, insertarOrdenado, buscar, eliminar, mostrarAscendente/Descendente</em>.</p>

      <h2>Cola (FIFO)</h2>
      <div class="callout def">
        <strong class="callout__tag">Definición</strong>
        Una <strong>cola</strong> es una lista donde los elementos se insertan por un extremo (<strong>Final</strong>) y se eliminan por el otro (<strong>Frente</strong>). Es una estructura <strong>FIFO</strong>: <em>First In, First Out</em> (el primero en entrar es el primero en salir).
      </div>
      <p>Operaciones: <code>Meter(x)</code> agrega por el Final, <code>Sacar()</code> elimina del Frente. Errores: <strong>Overflow</strong> (desbordamiento: meter sin espacio) y <strong>Underflow</strong> (subdesbordamiento: sacar de cola vacía).</p>

      <h3>Cola con lista doblemente enlazada</h3>
      <pre class="code"><span class="kw">Meter</span>(x):
   Nuevo = nuevo nodo(x); Nuevo.Sig = Null; Nuevo.Ant = Final;
   <span class="kw">si</span> (Frente == Null) Frente = Nuevo;   <span class="cm">// cola vacía</span>
   <span class="kw">sino</span> Final.Sig = Nuevo;
   Final = Nuevo;

<span class="kw">Sacar</span>():
   <span class="kw">si</span> (Frente == Null) <span class="kw">retornar</span> error;   <span class="cm">// underflow</span>
   x = Frente.dato; Libre = Frente;
   <span class="kw">si</span> (Frente == Final) { Frente = Null; Final = Null; }   <span class="cm">// 1 elemento</span>
   <span class="kw">sino</span> { Frente.Sig.Ant = Null; Frente = Frente.Sig; }
   liberar(Libre); <span class="kw">retornar</span> x;</pre>

      <h2>Cola circular con array</h2>
      <p>Una cola lineal con array <strong>malgasta memoria</strong>: cuando el Fin llega al tope no se reutilizan los lugares liberados al frente. La <strong>cola circular</strong> trata el array como un <strong>anillo</strong>: después de la posición \\(n\\) se vuelve a la \\(1\\).</p>
      <div class="callout tip">
        <strong class="callout__tag">Avance de índices (envoltura)</strong>
        Al <strong>meter</strong>: si <code>Fin == n</code> ⇒ <code>Fin = 1</code>, sino <code>Fin = Fin + 1</code>.<br>
        Al <strong>sacar</strong>: si <code>Frente == n</code> ⇒ <code>Frente = 1</code>, sino <code>Frente = Frente + 1</code>.<br>
        En forma compacta: <code>idx = (idx mod n) + 1</code> (con índices base 1).
      </div>
      <p>Con convención base 1, el valor <strong>0</strong> en ambos punteros marca <strong>cola vacía</strong> (<code>Frente == Fin == 0</code>). La cola está <strong>llena</strong> cuando <code>Frente == 1 y Fin == n</code>, o cuando <code>Frente == Fin + 1</code> (el Fin quedó justo detrás del Frente en el anillo). Probalo en la <a href="#/tool/colacircular">herramienta de cola circular</a>.</p>

      <h3>Cola circular con lista enlazada</h3>
      <p>Con un solo puntero <code>Frente</code> y una lista <strong>circular</strong>: el último nodo apunta de vuelta al Frente. Con un único nodo, este se apunta a sí mismo (<code>Nuevo.Sig = Nuevo</code>). Para meter o sacar se recorre con un auxiliar hasta el último nodo (<code>while (i.Sig != Frente)</code>) y se reconectan los enlaces para mantener la circularidad.</p>

      <h2>Cola de prioridad</h2>
      <div class="callout def">
        <strong class="callout__tag">Definición</strong>
        En una <strong>cola de prioridad</strong> cada elemento tiene asignada una <strong>prioridad</strong>. No es FIFO puro: se procesa primero el de <strong>mayor prioridad</strong>; entre elementos de igual prioridad se respeta el orden de llegada (FIFO dentro del nivel).
      </div>
      <p>Convención habitual: <strong>a menor número, mayor prioridad</strong> (prioridad 1 = máxima). Aplicaciones: <em>triage</em> hospitalario y <strong>planificación de procesos</strong> en sistemas operativos.</p>
      <ul>
        <li><strong>Implementación con lista ordenada:</strong> se inserta cada elemento delante del primer nodo cuyo número de prioridad sea mayor que el suyo; así <code>Sacar</code> siempre extrae el primero (el de mayor prioridad).</li>
        <li><strong>Implementación con arrays:</strong> una subcola por nivel — matriz <code>Cola[Prioridad][Long]</code> con vectores <code>Frente[]</code> y <code>Fin[]</code>. <code>Sacar</code> busca el menor nivel <code>N</code> con <code>Frente[N] ≠ 0</code> y extrae su frente.</li>
      </ul>
      <p>Ejemplo: insertando <code>B(2), C(2), D(4), A(1), X(3)</code> la lista ordenada queda <strong>A(1) → B(2) → C(2) → X(3) → D(4)</strong> (B antes que C por llegar primero con igual prioridad).</p>
    `,
    quiz: [
      { q: "¿Qué política de acceso sigue una cola?", opts: ["LIFO (último en entrar, primero en salir)", "FIFO (primero en entrar, primero en salir)", "Acceso aleatorio", "Por prioridad siempre"], a: 1, exp: "Cola = FIFO: se mete por el Final y se saca por el Frente." },
      { q: "En una cola circular con array de tamaño \\(n\\) (base 1), ¿cómo avanza el Fin al meter si <code>Fin == n</code>?", opts: ["Fin = n + 1", "Fin = 0", "Fin = 1 (envuelve)", "Da overflow siempre"], a: 2, exp: "Al llegar al tope, el índice envuelve: Fin = 1. En general idx = (idx mod n) + 1." },
      { q: "¿Cuál es la condición de cola circular vacía (base 1)?", opts: ["Frente == Fin == 0", "Frente == 1", "Fin == n", "Frente == Fin + 1"], a: 0, exp: "Con base 1, ambos punteros en 0 marcan la cola vacía." },
      { q: "¿Qué error ocurre al sacar de una cola vacía?", opts: ["Overflow", "Underflow / subdesbordamiento", "Segfault siempre", "Ninguno"], a: 1, exp: "Sacar de cola vacía es underflow; meter sin espacio es overflow." },
      { q: "En una lista doblemente enlazada, ¿qué guarda cada nodo además del dato?", opts: ["Solo un enlace Sig", "Dos enlaces: Ant y Sig", "Un índice numérico", "El tamaño de la lista"], a: 1, exp: "El doble enlace (Ant y Sig) permite recorrer en ambos sentidos." },
      { q: "En una cola de prioridad con 'menor número = mayor prioridad', si llegan B(2) y luego C(2), ¿cuál se procesa primero?", opts: ["C, porque llegó después", "B, porque con igual prioridad se respeta el orden de llegada", "Cualquiera al azar", "Ninguno hasta que llegue prioridad 1"], a: 1, exp: "Entre igual prioridad la cola es FIFO: B llegó antes, sale antes." },
      { q: "¿Por qué se usa una cola circular en vez de una cola lineal con array?", opts: ["Para ordenar los datos", "Para reutilizar las posiciones liberadas al frente y no malgastar memoria", "Porque es más fácil de programar", "Para permitir prioridades"], a: 1, exp: "La circular reaprovecha el espacio liberado tratando el array como un anillo." },
    ],
    cards: [
      { q: "¿Qué es un TAD?", a: "Tipo Abstracto de Datos: define los datos y las operaciones permitidas, sin fijar la implementación." },
      { q: "Cola: política y operaciones", a: "FIFO. Meter por el Final, Sacar por el Frente. Errores: overflow y underflow." },
      { q: "Avance de índice en cola circular (base 1)", a: "idx = (idx mod n) + 1. Si idx == n, vuelve a 1 (envuelve el anillo)." },
      { q: "Condición de cola circular llena", a: "Frente == 1 y Fin == n, o bien Frente == Fin + 1 (Fin justo detrás del Frente)." },
      { q: "Ventaja de la lista doblemente enlazada", a: "Recorrido en ambos sentidos (Ant/Sig) y eliminación de un nodo conocido en O(1)." },
      { q: "Cola de prioridad: criterio", a: "Sale primero el de mayor prioridad (menor número); entre iguales, orden de llegada (FIFO)." },
      { q: "Cola de prioridad con arrays", a: "Una subcola por nivel: matriz Cola[prio][long] con vectores Frente[] y Fin[]; Sacar toma el menor nivel no vacío." },
      { q: "Cola circular con lista enlazada y 1 nodo", a: "El nodo se apunta a sí mismo: Nuevo.Sig = Nuevo; Frente lo señala." },
    ],
  },

  /* ===================================================================
     UNIDAD 2 — GRAFOS: TERMINOLOGÍA Y REPRESENTACIÓN
     =================================================================== */
  {
    id: "grafos1",
    glyph: "⬡",
    title: "Grafos: Terminología y Representación",
    desc: "Definiciones, grado, caminos y ciclos, conexidad; matriz de adyacencia, matriz de costos y listas de adyacencia.",
    tool: "grafos",
    html: `
      <p class="lead">Un <strong>grafo</strong> es un conjunto de nodos (vértices) conectados por aristas. Es un contenedor <strong>no lineal</strong>: modela relaciones entre objetos (redes, mapas, dependencias).</p>

      <div class="callout def">
        <strong class="callout__tag">Definición formal</strong>
        Un grafo es una terna \\(G = (N, A, P)\\): \\(N\\) conjunto de <strong>nodos</strong>, \\(A\\) conjunto de <strong>aristas</strong>, y \\(P\\) una función que a cada arista \\(a\\) le asigna su par de extremos \\(P(a) = \\{p, q\\}\\), con \\(p, q \\in N\\).
      </div>

      <h2>Terminología</h2>
      <ul>
        <li><strong>Adyacentes / vecinos:</strong> dos nodos \\(u, v\\) son adyacentes si existe una arista \\(\\{u,v\\}\\).</li>
        <li><strong>Grado</strong> \\(\\text{Grad}(u)\\): cantidad de aristas que inciden en \\(u\\). Si \\(\\text{Grad}(u)=0\\), \\(u\\) es <strong>aislado</strong>.</li>
        <li><strong>Camino:</strong> sucesión de aristas \\((a_1, a_2, \\dots)\\) tal que cada par consecutivo comparte un nodo. La sucesión de nodos es el <strong>recorrido</strong>. La <strong>longitud</strong> es la cantidad de aristas.</li>
        <li><strong>Camino simple:</strong> no repite aristas. <strong>Camino cerrado:</strong> el primer y último nodo coinciden.</li>
        <li><strong>Ciclo:</strong> camino cerrado simple con todos los nodos distintos (salvo el primero = último).</li>
        <li><strong>Conexos:</strong> \\(p\\) y \\(q\\) son conexos si existe un camino entre ellos. <strong>Grafo conexo:</strong> todo par de nodos es conexo.</li>
        <li><strong>Grafo completo:</strong> cada nodo es adyacente a todos los demás.</li>
        <li><strong>Ponderado / con peso:</strong> cada arista \\(a\\) tiene un valor \\(w(a) \\geq 0\\). Si no hay peso, se asume \\(w = 1\\).</li>
        <li><strong>Multigrafo:</strong> admite <strong>aristas múltiples</strong> (dos aristas con los mismos extremos) o <strong>bucles/lazos</strong> (arista \\(\\{u,u\\}\\)).</li>
      </ul>

      <h2>Representación secuencial (matricial)</h2>
      <h3>Matriz de adyacencia</h3>
      <p>Para un grafo de \\(m\\) nodos numerados \\(1\\dots m\\), una matriz \\(m \\times m\\):</p>
      <div class="formula-box">$$ A[i,j] = \\begin{cases} 1 & \\text{si } i \\text{ es adyacente a } j \\\\ 0 & \\text{en otro caso} \\end{cases} $$</div>
      <p>En un grafo <strong>no dirigido</strong> la matriz es <strong>simétrica</strong> (\\(A[i,j]=A[j,i]\\)) y la diagonal es 0 si no hay bucles.</p>
      <h3>Matriz de costos</h3>
      <p>Igual, pero guarda el <strong>peso</strong>: \\(C[i,j] = w(i,j)\\) si son adyacentes, y \\(0\\) (o \\(\\infty\\)) si no.</p>

      <h2>Representación enlazada (listas de adyacencia)</h2>
      <p>Una lista de nodos y, por cada nodo, una lista enlazada de sus adyacentes. Cada <code>NodoVertice</code> tiene su <code>Info</code>, un puntero <code>Ady</code> a su lista de adyacentes y un puntero <code>Sig</code> al siguiente vértice.</p>
      <pre class="code">1 → 2 → 3 → 4 → X
2 → 1 → 3 → X
3 → 1 → 2 → 4 → 5 → X
4 → 1 → 3 → 5 → X
5 → 3 → 4 → X</pre>
      <div class="callout tip">
        <strong class="callout__tag">¿Cuándo conviene cada una?</strong>
        La <strong>matriz</strong> consulta adyacencia en \\(O(1)\\) pero ocupa \\(O(m^2)\\) (buena para grafos densos). Las <strong>listas</strong> ocupan \\(O(m + |A|)\\) y recorren vecinos rápido (mejor para grafos ralos). Construí las tres representaciones en el <a href="#/tool/grafos">editor de grafos</a>.
      </div>

      <h2>Conexidad y caminos (algoritmos)</h2>
      <p>El algoritmo <code>conexos(p, q)</code> parte de un conjunto <code>Visitados = {p}</code> y lo va <strong>extendiendo</strong> con vecinos no visitados hasta encontrar \\(q\\) (son conexos) o agotar la frontera (no lo son).</p>
      <pre class="code"><span class="kw">conexos</span>(G, p, q):
   <span class="kw">si</span> (p == q) "Son conexos"
   <span class="kw">sino</span> extender(G, {p}, q)

<span class="kw">extender</span>(G, Visitados, q):
   <span class="kw">si</span> hay s ∈ Visitados con vecino r ∉ Visitados:
      <span class="kw">si</span> (r == q) "Son conexos"
      <span class="kw">sino</span> extender(G, Visitados ∪ {r}, q)
   <span class="kw">sino</span> "No son conexos"</pre>
      <p>Al terminar, <code>Visitados</code> contiene todos los nodos conexos con \\(p\\). Si \\(|Visitados| = |N|\\), el grafo es <strong>conexo</strong>. El algoritmo <code>camino(G,p,q)</code> agrega una función <strong>predecesor</strong> para reconstruir las aristas del camino encontrado.</p>
    `,
    quiz: [
      { q: "¿Qué es el grado de un nodo en un grafo?", opts: ["La cantidad de nodos del grafo", "La cantidad de aristas que inciden en él", "La longitud del camino más largo", "El peso de sus aristas"], a: 1, exp: "Grad(u) = número de aristas que inciden en u. Grado 0 = nodo aislado." },
      { q: "La matriz de adyacencia de un grafo NO dirigido es siempre…", opts: ["Triangular", "Simétrica", "Diagonal", "Nula"], a: 1, exp: "A[i,j] = A[j,i] porque la arista {i,j} no tiene dirección." },
      { q: "¿Cuándo un grafo es conexo?", opts: ["Cuando no tiene ciclos", "Cuando todo par de nodos está unido por algún camino", "Cuando es completo", "Cuando todos los grados son pares"], a: 1, exp: "Conexo = cualquier par de nodos es conexo (hay camino entre ellos)." },
      { q: "Un <strong>ciclo</strong> es…", opts: ["Cualquier camino", "Un camino cerrado simple con todos los nodos distintos (salvo extremos)", "Un camino que repite aristas", "Una arista con extremos iguales"], a: 1, exp: "Ciclo = camino cerrado simple sin nodos repetidos salvo el primero=último." },
      { q: "Un grafo es <strong>multigrafo</strong> si…", opts: ["Tiene más de 10 nodos", "Tiene aristas múltiples o bucles", "Es dirigido", "Tiene pesos"], a: 1, exp: "Aristas múltiples (mismos extremos) o bucles/lazos {u,u} lo hacen multigrafo." },
      { q: "¿Qué representación consulta adyacencia en O(1) pero gasta O(m²) de memoria?", opts: ["Listas de adyacencia", "Matriz de adyacencia", "Cola de prioridad", "Árbol binario"], a: 1, exp: "La matriz es directa para consultar A[i,j] pero ocupa m×m." },
      { q: "En <code>conexos(p,q)</code>, al terminar el conjunto Visitados contiene…", opts: ["Todos los nodos del grafo", "Solo p y q", "Todos los nodos conexos con p", "Las aristas del camino"], a: 2, exp: "Quedan todos los nodos alcanzables desde p; si son |N|, el grafo es conexo." },
    ],
    cards: [
      { q: "Grafo (definición formal)", a: "Terna G=(N,A,P): nodos N, aristas A y función P que asigna a cada arista sus extremos {p,q}." },
      { q: "Grado de un nodo", a: "Cantidad de aristas que inciden en él. Grado 0 = nodo aislado." },
      { q: "Camino vs recorrido vs longitud", a: "Camino = sucesión de aristas; recorrido = sucesión de nodos; longitud = cantidad de aristas." },
      { q: "Grafo conexo", a: "Todo par de nodos está unido por algún camino." },
      { q: "Matriz de adyacencia", a: "A[i,j]=1 si i adyacente a j, 0 si no. Simétrica en grafos no dirigidos." },
      { q: "Matriz de costos", a: "C[i,j]=peso de la arista {i,j}; 0 o ∞ si no son adyacentes." },
      { q: "Multigrafo", a: "Grafo con aristas múltiples (mismos extremos) o bucles/lazos {u,u}." },
      { q: "Algoritmo conexos(p,q)", a: "Extiende Visitados={p} con vecinos no visitados hasta hallar q o agotar la frontera." },
    ],
  },

  /* ===================================================================
     UNIDAD 3 — GRAFOS: CAMINOS, EULER Y RECORRIDOS
     =================================================================== */
  {
    id: "grafos2",
    glyph: "⇝",
    title: "Grafos: Caminos, Euler y Recorridos",
    desc: "Ciclo y camino de Euler, Dijkstra, Floyd, árbol cubridor mínimo (Prim) y recorridos DFS/BFS.",
    tool: "caminos",
    html: `
      <p class="lead">Con la representación de grafos lista, vemos los <strong>algoritmos clásicos</strong>: recorrer todas las aristas (Euler), hallar caminos de costo mínimo (Dijkstra, Floyd), conectar todo al mínimo costo (Prim) y visitar todos los nodos (DFS/BFS). Probá todos en la <a href="#/tool/caminos">herramienta de caminos y recorridos</a>.</p>

      <h2>Ciclo y camino de Euler</h2>
      <p>El problema nace de los <strong>puentes de Königsberg</strong> (Euler, 1736): ¿se puede recorrer todos los puentes exactamente una vez?</p>
      <div class="callout def">
        <strong class="callout__tag">Definiciones</strong>
        <strong>Ciclo de Euler:</strong> recorre <strong>todas las aristas exactamente una vez</strong> y vuelve al nodo de partida.<br>
        <strong>Camino de Euler:</strong> recorre todas las aristas una vez, pero no necesariamente vuelve al inicio.
      </div>
      <div class="callout tip">
        <strong class="callout__tag">Teorema de Euler</strong>
        Un grafo conexo (sin nodos aislados) tiene <strong>ciclo de Euler ⟺ todos sus nodos tienen grado par</strong>.<br>
        Tiene <strong>camino de Euler ⟺ tiene 0 o 2 nodos de grado impar</strong>. Si son 2, el camino debe empezar en uno y terminar en el otro.
      </div>
      <p>La cantidad de nodos de grado impar siempre es par; por eso nunca hay exactamente 1 o 3. Al trazar conviene no elegir una <strong>arista puente</strong> (la que al quitarla desconecta el grafo) mientras haya otra opción.</p>

      <h2>Caminos mínimos: Dijkstra</h2>
      <p>Algoritmo <strong>voraz (greedy)</strong> para el camino de costo mínimo desde un origen \\(n\\). Mantiene un conjunto \\(C\\) de nodos con distancia ya conocida (\\(d(n)=0\\)). En cada etapa elige la arista \\(\\{p,q\\}\\) con \\(p \\in C\\), \\(q \\notin C\\) que minimiza \\(d(p) + c(a)\\), y agrega \\(q\\).</p>
      <pre class="code"><span class="kw">Dijkstra</span> desde n:
   C = {n}; d(n) = 0
   <span class="kw">mientras</span> falten nodos:
      elegir arista {p,q}, p∈C, q∉C, que minimice d(p)+c(a)
      d(q) = d(p) + c(a);  agregar q a C
      predecesor(q) = arista {p,q}     <span class="cm">// para reconstruir el camino</span></pre>
      <p>Ejemplo: en un grafo con A→B=2, A→D=1, B→E=2, E→H=1… el costo mínimo de A a H da <strong>5</strong>, por el camino A → B → E → H.</p>

      <h2>Caminos mínimos: Floyd</h2>
      <p>Halla el costo mínimo entre <strong>todos los pares</strong> de nodos, con matrices. Parte de la matriz de costos \\(C\\) (0 en la diagonal, \\(\\infty\\) donde no hay arista) y aplica:</p>
      <div class="formula-box">$$ A_k(i,j) = \\min\\big\\{\\, A_{k-1}(i,j),\\ \\ A_{k-1}(i,t) + A_{k-1}(t,j) \\,\\big\\}, \\quad 1 \\le t \\le n $$</div>
      <pre class="code"><span class="kw">Floyd</span>(C):
   A = C;  A[i][i] = 0
   <span class="kw">para</span> i, j, t <span class="kw">en</span> 1..n:
      <span class="kw">si</span> (A[i][t] + A[t][j] &lt; A[i][j])
         A[i][j] = A[i][t] + A[t][j]</pre>
      <p>Es el método de los <strong>tres bucles anidados</strong>, de complejidad \\(O(n^3)\\). Se detiene cuando \\(A_k = A_{k-1}\\) o \\(k = n\\).</p>

      <h2>Árbol cubridor mínimo (Prim)</h2>
      <p>Un <strong>árbol cubridor</strong> es un árbol (conexo, sin ciclos) que contiene <strong>todos los nodos</strong> del grafo. El <strong>mínimo (MST)</strong> es el de menor costo total. <strong>Prim</strong> es voraz: parte de un nodo y agrega en cada paso la arista de <strong>menor costo</strong> que conecta un nodo nuevo.</p>
      <pre class="code"><span class="kw">Prim</span>(G):  C = {p}; B = {}
   <span class="kw">mientras</span> C ≠ N:
      elegir arista {p,q}, p∈C, q∉C, de costo mínimo
      agregar q a C; agregar la arista a B
   <span class="kw">retornar</span> B</pre>

      <h2>Recorridos: DFS y BFS</h2>
      <ul>
        <li><strong>En profundidad (DFS):</strong> avanza por un camino hasta un punto muerto y luego retrocede (<em>backtracking</em>). Es recursivo (usa la pila de llamadas).</li>
        <li><strong>En anchura (BFS):</strong> visita por <strong>niveles</strong> usando una <strong>cola</strong>: primero el nodo, después todos sus vecinos, después los vecinos de éstos.</li>
      </ul>
      <pre class="code"><span class="kw">profundidad</span>(v):           <span class="cm">// DFS</span>
   visitado(v) = True; mostrar(v)
   <span class="kw">para</span> cada w adyacente a v:
      <span class="kw">si</span> ¬visitado(w): profundidad(w)

<span class="kw">anchura</span>(inicio):           <span class="cm">// BFS, con Cola</span>
   Meter(Cola, inicio); estado(inicio)=encolado
   <span class="kw">mientras</span> ¬Vacía(Cola):
      v = Sacar(Cola); mostrar(v)
      <span class="kw">para</span> cada w adyacente a v no encolado:
         Meter(Cola, w); estado(w)=encolado</pre>
    `,
    quiz: [
      { q: "¿Cuándo un grafo conexo tiene ciclo de Euler?", opts: ["Cuando todos sus nodos tienen grado par", "Cuando tiene exactamente 2 nodos de grado impar", "Cuando es completo", "Cuando no tiene ciclos"], a: 0, exp: "Ciclo de Euler ⟺ conexo y todos los grados pares." },
      { q: "Un grafo conexo tiene camino de Euler (no ciclo) cuando…", opts: ["Todos los grados son pares", "Tiene exactamente 2 nodos de grado impar", "Tiene 1 nodo de grado impar", "Tiene 4 nodos de grado impar"], a: 1, exp: "Con 2 impares hay camino que empieza en uno y termina en el otro." },
      { q: "Dijkstra es un algoritmo…", opts: ["De fuerza bruta", "Voraz (greedy)", "De backtracking", "Divide y vencerás"], a: 1, exp: "En cada etapa elige la mejor opción local: la arista que minimiza d(p)+c(a)." },
      { q: "El algoritmo de Floyd resuelve…", opts: ["El camino mínimo desde un solo origen", "El camino mínimo entre todos los pares de nodos", "El árbol cubridor", "El ciclo de Euler"], a: 1, exp: "Floyd calcula la matriz de costos mínimos entre todo par (i,j), en O(n³)." },
      { q: "¿Qué construye el algoritmo de Prim?", opts: ["El camino de Euler", "El árbol cubridor mínimo (MST)", "La matriz de adyacencia", "El recorrido en anchura"], a: 1, exp: "Prim arma el árbol que conecta todos los nodos con costo total mínimo." },
      { q: "El recorrido BFS (en anchura) usa como estructura auxiliar una…", opts: ["Pila", "Cola", "Cola de prioridad", "Matriz"], a: 1, exp: "BFS visita por niveles con una cola FIFO; DFS usa la pila (recursión)." },
      { q: "La complejidad del algoritmo de Floyd (tres bucles anidados) es…", opts: ["O(n)", "O(n log n)", "O(n²)", "O(n³)"], a: 3, exp: "Tres bucles i,j,t de 1..n dan O(n³)." },
    ],
    cards: [
      { q: "Ciclo de Euler", a: "Recorre todas las aristas exactamente una vez y vuelve al inicio. Existe ⟺ conexo y todos los grados pares." },
      { q: "Camino de Euler", a: "Recorre todas las aristas una vez. Existe ⟺ 0 o 2 nodos de grado impar (si 2, empieza y termina en ellos)." },
      { q: "Dijkstra", a: "Voraz: desde un origen, agrega el nodo q∉C que minimiza d(p)+c(a). Da el camino mínimo desde un origen." },
      { q: "Floyd", a: "Todos los pares: A_k(i,j)=min{A_{k-1}(i,j), A_{k-1}(i,t)+A_{k-1}(t,j)}. Tres bucles, O(n³)." },
      { q: "Árbol cubridor mínimo (Prim)", a: "Árbol que conecta todos los nodos con costo total mínimo; en cada paso agrega la arista más barata que suma un nodo nuevo." },
      { q: "DFS vs BFS", a: "DFS (profundidad): recursión/pila, avanza y retrocede. BFS (anchura): cola, visita por niveles." },
      { q: "Arista puente", a: "Arista cuya eliminación desconecta el grafo; al trazar un Euler conviene no usarla si hay otra opción." },
    ],
  },

  /* ===================================================================
     UNIDAD 4 — ÁRBOLES
     =================================================================== */
  {
    id: "arboles",
    glyph: "⋔",
    title: "Árboles: AB, ABB, 2-3 y AVL",
    desc: "Árbol binario y recorridos, árbol binario de búsqueda, árboles 2-3 y árboles AVL con rotaciones.",
    tool: "arboles",
    html: `
      <p class="lead">Un <strong>árbol</strong> es un grafo conexo sin ciclos. De forma recursiva: tiene una <strong>raíz</strong> y los demás nodos se reparten en subárboles disjuntos. Modela jerarquías y permite búsquedas logarítmicas.</p>

      <h2>Árbol binario (AB)</h2>
      <p>Cada nodo tiene <strong>a lo sumo dos hijos</strong>: izquierdo y derecho. Terminología: <strong>raíz</strong>, <strong>hoja</strong> (sin hijos), <strong>padre/hijo</strong>, <strong>ancestro/descendiente</strong>. El <strong>nivel</strong> de un nodo es la longitud del camino a la raíz; la <strong>altura</strong> es el nivel máximo + 1.</p>

      <h3>Recorridos</h3>
      <p>Tres formas según cuándo se procesa la raíz (R), el subárbol izquierdo (I) y el derecho (D):</p>
      <ul>
        <li><strong>Preorden</strong> (R, I, D): procesar raíz, luego izq, luego der.</li>
        <li><strong>Inorden</strong> (I, R, D): izq, raíz, der. <em>En un ABB devuelve los valores ordenados.</em></li>
        <li><strong>Postorden / Posorden</strong> (I, D, R): izq, der, raíz.</li>
      </ul>
      <p>Para el árbol con raíz 15 (izq 10 con hijos 7 y 12→11; der 30 con hijo 21→25):</p>
      <div class="formula-box">
        Preorden: 15, 10, 7, 12, 11, 30, 21, 25<br>
        Inorden: 7, 10, 11, 12, 15, 21, 25, 30<br>
        Postorden: 7, 11, 12, 10, 25, 21, 30, 15
      </div>

      <h2>Árbol Binario de Búsqueda (ABB)</h2>
      <div class="callout def">
        <strong class="callout__tag">Propiedad de orden</strong>
        En cada nodo: <strong>todos los valores del subárbol izquierdo ≤ valor del nodo ≤ todos los del derecho</strong>. Por eso el recorrido inorden sale ordenado.
      </div>
      <pre class="code"><span class="kw">buscar</span>(x, A):
   <span class="kw">si</span> (A == Ø) "NO"
   <span class="kw">sino si</span> (x == valor(A)) "SI"
   <span class="kw">sino si</span> (x &lt; valor(A)) buscar(x, izq(A))
   <span class="kw">sino</span> buscar(x, der(A))</pre>
      <p>La <strong>inserción</strong> baja como la búsqueda y crea una <strong>hoja nueva</strong> en el lugar vacío. La <strong>eliminación</strong> tiene 3 casos:</p>
      <ol>
        <li><strong>Hoja:</strong> se borra directamente.</li>
        <li><strong>Un hijo:</strong> el padre pasa a apuntar al único hijo (se "sube" el subárbol).</li>
        <li><strong>Dos hijos:</strong> se reemplaza por el <strong>sucesor inorden</strong> (menor del subárbol derecho) y se elimina ese nodo de reemplazo.</li>
      </ol>
      <div class="callout warn">
        <strong class="callout__tag">Costo de búsqueda</strong>
        Depende de la <strong>altura</strong>. Un ABB equilibrado da \\(a \\approx \\log_2 n\\); pero si se inserta en orden creciente, degenera en una <strong>lista</strong> con \\(a = n\\). Para n=2000: equilibrado ≈ 11 comparaciones, degenerado = 2000.
      </div>

      <h2>Árboles 2-3</h2>
      <p>Mantienen el árbol <strong>siempre equilibrado</strong> (todas las hojas al mismo nivel). Un nodo puede ser:</p>
      <ul>
        <li><strong>Nodo-2:</strong> una clave \\(x\\) y dos hijos (como un AB).</li>
        <li><strong>Nodo-3:</strong> dos claves \\(x \\le y\\) y <strong>tres</strong> hijos (izq, central, der).</li>
      </ul>
      <p>Se inserta siempre en una hoja. Si un nodo "crece", un nodo-2 se convierte en <strong>nodo-3</strong>; si un nodo-3 recibe una clave más, se <strong>divide (split)</strong>: la clave del medio sube al padre y el crecimiento se propaga. Garantiza búsqueda \\(O(\\log n)\\) sin el peor caso del ABB.</p>

      <h2>Árboles AVL</h2>
      <div class="callout def">
        <strong class="callout__tag">Definición (Adelson-Velskii y Landis, 1962)</strong>
        Un AVL es un ABB donde, en <strong>cada</strong> nodo, las alturas de los dos subárboles difieren a lo sumo en 1: \\(|h_I - h_D| \\le 1\\).
      </div>
      <p>Se anota el <strong>factor de equilibrio</strong> \\(FE = h_D - h_I\\) (válido en \\(\\{-1, 0, +1\\}\\)). Cuando tras una inserción un nodo llega a \\(|FE| = 2\\), se <strong>rebalancea con rotaciones</strong>:</p>
      <div class="tbl-wrap">
      <table class="tbl tbl--left">
        <thead><tr><th>Desbalance</th><th>FE nodo</th><th>FE hijo</th><th>Rotación</th></tr></thead>
        <tbody>
          <tr><td>Izquierda-Izquierda</td><td>−2</td><td>−1</td><td>Simple a la derecha</td></tr>
          <tr><td>Izquierda-Derecha</td><td>−2</td><td>+1</td><td>Doble izq-der</td></tr>
          <tr><td>Derecha-Derecha</td><td>+2</td><td>+1</td><td>Simple a la izquierda</td></tr>
          <tr><td>Derecha-Izquierda</td><td>+2</td><td>−1</td><td>Doble der-izq</td></tr>
        </tbody>
      </table>
      </div>
      <p>La rotación reabsorbe el aumento de altura, así que tras rebalancear el crecimiento <strong>no se propaga</strong> hacia arriba. Insertá valores y mirá las rotaciones en la <a href="#/tool/arboles">herramienta de árboles</a>.</p>
    `,
    quiz: [
      { q: "¿Qué recorrido de un ABB devuelve los valores ordenados de menor a mayor?", opts: ["Preorden", "Inorden", "Postorden", "Por niveles"], a: 1, exp: "Inorden (izq, raíz, der) recorre el ABB en orden ascendente." },
      { q: "Propiedad de orden de un ABB:", opts: ["Izq ≥ nodo ≥ der", "Izq ≤ nodo ≤ der", "Todos los hijos iguales", "Las hojas al mismo nivel"], a: 1, exp: "Subárbol izquierdo ≤ valor del nodo ≤ subárbol derecho, en cada nodo." },
      { q: "Al eliminar un nodo con DOS hijos en un ABB, se lo reemplaza por…", opts: ["Su padre", "El sucesor inorden (menor del subárbol derecho)", "Cualquier hoja", "La raíz"], a: 1, exp: "Se copia el menor del subárbol derecho (sucesor inorden) y se borra ese nodo." },
      { q: "¿Por qué un ABB puede degenerar y volverse lento?", opts: ["Por tener pocos nodos", "Porque si se insertan en orden creciente queda como una lista (altura n)", "Porque el inorden falla", "Porque usa demasiada memoria"], a: 1, exp: "Sin balanceo, insertar ordenado da altura n y búsqueda O(n)." },
      { q: "En un árbol 2-3, ¿qué pasa cuando un nodo-3 recibe una clave más?", opts: ["Se ignora", "Se divide (split): la clave del medio sube al padre", "Se convierte en hoja", "Se elimina"], a: 1, exp: "El nodo-3 se parte y la clave central sube, propagando el crecimiento." },
      { q: "Un árbol AVL exige que en cada nodo…", opts: ["Haya exactamente 2 hijos", "|altura_izq − altura_der| ≤ 1", "Todas las claves sean pares", "La raíz sea la mayor"], a: 1, exp: "Condición de equilibrio AVL: las alturas de los subárboles difieren a lo sumo en 1." },
      { q: "Si un nodo AVL queda con FE = −2 y su hijo izquierdo con FE = −1, se aplica…", opts: ["Rotación simple a la derecha", "Rotación simple a la izquierda", "Doble der-izq", "Nada"], a: 0, exp: "Caso Izquierda-Izquierda → rotación simple a la derecha." },
      { q: "La altura de un ABB equilibrado con n nodos es del orden de…", opts: ["n", "n²", "log₂ n", "√n"], a: 2, exp: "Equilibrado ⇒ altura ≈ log₂ n, y la búsqueda cuesta esa cantidad de comparaciones." },
    ],
    cards: [
      { q: "Árbol (definición)", a: "Grafo conexo sin ciclos. Recursivo: una raíz y subárboles disjuntos." },
      { q: "Recorridos: pre, in, post", a: "Preorden R,I,D · Inorden I,R,D (ABB → ordenado) · Postorden I,D,R." },
      { q: "Propiedad de orden del ABB", a: "En cada nodo: subárbol izq ≤ valor ≤ subárbol der." },
      { q: "Eliminar en ABB: 3 casos", a: "Hoja: borrar. Un hijo: subir el hijo. Dos hijos: reemplazar por el sucesor inorden." },
      { q: "Costo de búsqueda en ABB", a: "Proporcional a la altura: ≈ log₂ n si equilibrado; n si degenera en lista." },
      { q: "Árbol 2-3", a: "Equilibrado: nodos de 2 (1 clave, 2 hijos) o de 3 (2 claves, 3 hijos). Hojas al mismo nivel." },
      { q: "Split en árbol 2-3", a: "Un nodo-3 que crece se divide: la clave del medio sube al padre y propaga el crecimiento." },
      { q: "AVL: condición y FE", a: "ABB con |h_izq − h_der| ≤ 1 en cada nodo. FE = h_der − h_izq ∈ {−1,0,+1}." },
      { q: "Rotaciones AVL", a: "II→simple derecha; DD→simple izquierda; ID→doble izq-der; DI→doble der-izq." },
    ],
  },

  /* ===================================================================
     UNIDAD 5 — TEORÍA DE NÚMEROS: DIVISIBILIDAD
     =================================================================== */
  {
    id: "teoria1",
    glyph: "÷",
    title: "Teoría de Números: Divisibilidad",
    desc: "Teorema de la división, divisibilidad y primos, criba, MCD (Euclides), identidad de Bézout y TFA.",
    tool: "euclides",
    html: `
      <p class="lead">La teoría de números estudia los enteros y sus relaciones de divisibilidad. Es la base de algoritmos de criptografía, hashing y aritmética modular.</p>

      <h2>Teorema de la división</h2>
      <div class="callout def">
        <strong class="callout__tag">Enunciado</strong>
        Para \\(a, b \\in \\mathbb{Z}\\), \\(b \\neq 0\\), existen <strong>únicos</strong> \\(c\\) (cociente) y \\(r\\) (resto) tales que
        $$ a = b \\cdot c + r, \\qquad 0 \\le r < |b| $$
      </div>
      <p>Lo clave: el <strong>resto siempre es \\(\\ge 0\\)</strong>, aun con negativos. Esto difiere del operador <code>%</code> de muchos lenguajes: en JS <code>-23 % 2</code> da \\(-1\\), pero el resto entero correcto es \\(1\\) (porque \\(-23 = 2\\cdot(-12) + 1\\)). La <a href="#/tool/division">herramienta de cociente y resto</a> calcula los 4 casos de signos.</p>

      <h2>Divisibilidad y primos</h2>
      <p>\\(b \\mid a\\) ("\\(b\\) divide a \\(a\\)") si existe \\(k\\) entero con \\(a = b\\cdot k\\) (resto 0). Todo entero tiene al menos 4 divisores: \\(1, -1, a, -a\\) (impropios).</p>
      <div class="callout def">
        <strong class="callout__tag">Primo</strong>
        \\(p\\) con \\(|p| > 1\\) es <strong>primo</strong> si tiene exactamente 4 divisores (solo los impropios). Si no, es <strong>compuesto</strong>. El 0 y el 1 no son primos ni compuestos; 2 es el primer primo.
      </div>
      <div class="callout tip">
        <strong class="callout__tag">Test eficiente \\(\\sqrt{p}\\)</strong>
        Basta probar divisores impares hasta \\(\\sqrt{p}\\): si ninguno divide a \\(p\\), es primo. Complejidad \\(O(\\sqrt{p})\\). Para 4001, solo ~63 pruebas en vez de 4001.
      </div>
      <h3>Criba de Eratóstenes</h3>
      <p>Para hallar todos los primos hasta \\(M\\): listar \\(2..M\\), y por cada \\(i\\) sin tachar, tachar sus múltiplos (menos él mismo). Se termina cuando \\(i^2 > M\\). Mirala animada en la <a href="#/tool/criba">criba</a>.</p>
      <div class="formula-box">$$ \\text{Criba}(50) = \\{2,3,5,7,11,13,17,19,23,29,31,37,41,43,47\\} $$</div>
      <p>Hay <strong>infinitos primos</strong> (Euclides): si fueran finitos \\(\\{P_1,\\dots,P_n\\}\\), el número \\(a = P_1\\cdots P_n + 1\\) deja resto 1 al dividir por cada \\(P_i\\), así que tendría un divisor primo fuera de la lista. Contradicción.</p>

      <h2>Máximo Común Divisor (Euclides)</h2>
      <p>\\(\\text{mcd}(a,b)\\) es el mayor entero que divide a ambos. El <strong>lema de Euclides</strong>: si \\(r = \\text{resto}(a,b)\\), entonces \\(\\text{mcd}(a,b) = \\text{mcd}(b,r)\\). El mcd es <strong>el último resto no nulo</strong>.</p>
      <pre class="code"><span class="kw">mcd</span>(a, b):
   <span class="kw">si</span> (b == 0) <span class="kw">retornar</span> a
   <span class="kw">sino</span> mcd(b, resto(a, b))</pre>
      <div class="formula-box">$$ \\text{mcd}(70,15) = \\text{mcd}(15,10) = \\text{mcd}(10,5) = \\text{mcd}(5,0) = 5 $$</div>

      <h2>Identidad de Bézout</h2>
      <div class="callout def">
        <strong class="callout__tag">Identidad de Bézout</strong>
        Existen enteros \\(s, t\\) tales que
        $$ s \\cdot a + t \\cdot b = \\text{mcd}(a,b) $$
        Se hallan con el <strong>algoritmo extendido de Euclides</strong> <code>st(a,b)</code>, que devuelve \\((t,\\ s - t\\cdot c)\\) en cada nivel (caso base \\(b=0\\): \\((1,0)\\)).
      </div>
      <p>Ejemplo: \\(\\text{st}(18,24) = (-1, 1)\\), y en efecto \\((-1)\\cdot 18 + 1\\cdot 24 = 6 = \\text{mcd}(18,24)\\). Bézout es la base para hallar inversos modulares y resolver ecuaciones diofánticas. Ver la tabla completa en la <a href="#/tool/euclides">herramienta de MCD/Bézout</a>.</p>

      <h2>Teorema Fundamental de la Aritmética (TFA)</h2>
      <div class="callout def">
        <strong class="callout__tag">TFA</strong>
        Todo entero \\(a > 1\\) se escribe de manera <strong>única (salvo el orden)</strong> como producto de primos.
      </div>
      <div class="formula-box">$$ 60 = 2^2 \\cdot 3 \\cdot 5 \\qquad 1470 = 2 \\cdot 3 \\cdot 5 \\cdot 7^2 $$</div>
      <p>La unicidad se prueba con el <strong>lema de Euclides</strong>: si \\(p\\) es primo y \\(p \\mid a\\cdot b\\), entonces \\(p \\mid a\\) o \\(p \\mid b\\). Con la factorización se obtienen mcd y mcm: \\(\\text{mcm}(a,b) = \\dfrac{a\\cdot b}{\\text{mcd}(a,b)}\\).</p>
    `,
    quiz: [
      { q: "En el teorema de la división \\(a = b\\cdot c + r\\), el resto cumple…", opts: ["\\(r\\) puede ser negativo", "\\(0 \\le r < |b|\\) siempre", "\\(r > b\\)", "\\(r = a\\)"], a: 1, exp: "El resto entero es siempre ≥ 0 y menor que |b|, también con negativos." },
      { q: "¿Por qué \\(\\text{resto}(-23, 2) = 1\\) y no \\(-1\\)?", opts: ["Porque el resto debe ser ≥ 0", "Porque JS lo calcula así", "Porque -23 es impar", "Es un error"], a: 0, exp: "Como -23 = 2·(-12) + 1 con 0 ≤ 1 < 2, el resto entero es 1 (no -1 como el % de JS)." },
      { q: "Un número primo tiene exactamente…", opts: ["2 divisores positivos (4 en total con signos)", "1 divisor", "Infinitos divisores", "3 divisores"], a: 0, exp: "Solo los impropios: 1, -1, p, -p (es decir 1 y sí mismo en positivos)." },
      { q: "El test de primalidad eficiente prueba divisores hasta…", opts: ["p", "p/2", "√p", "log p"], a: 2, exp: "Basta hasta √p: si no hay factor ahí, p es primo. Complejidad O(√p)." },
      { q: "El algoritmo de Euclides calcula el mcd usando que…", opts: ["mcd(a,b) = a·b", "mcd(a,b) = mcd(b, resto(a,b))", "mcd(a,b) = a + b", "mcd(a,b) = min(a,b)"], a: 1, exp: "Lema de Euclides: el mcd es el último resto no nulo de las divisiones sucesivas." },
      { q: "La identidad de Bézout dice que existen s,t con…", opts: ["s·a + t·b = mcd(a,b)", "s·a · t·b = mcd(a,b)", "s + t = mcd(a,b)", "a/b = s/t"], a: 0, exp: "El mcd es combinación lineal entera de a y b; se halla con Euclides extendido." },
      { q: "El Teorema Fundamental de la Aritmética afirma que todo entero > 1…", opts: ["Es primo", "Se factoriza de forma única (salvo orden) en primos", "Es par o impar", "Tiene 4 divisores"], a: 1, exp: "Factorización en primos única salvo el orden de los factores." },
    ],
    cards: [
      { q: "Teorema de la división", a: "a = b·c + r con 0 ≤ r < |b|, únicos. El resto entero siempre es ≥ 0." },
      { q: "resto(-23, 2)", a: "1, porque -23 = 2·(-12) + 1. Ojo: el % de JS daría -1." },
      { q: "Número primo", a: "|p|>1 con exactamente 4 divisores (1, -1, p, -p). 0 y 1 no son primos." },
      { q: "Test de primalidad eficiente", a: "Probar divisores impares hasta √p. Complejidad O(√p)." },
      { q: "Criba de Eratóstenes", a: "Tachar múltiplos de cada i sin tachar (menos él); termina cuando i² > M. Sobreviven los primos." },
      { q: "Algoritmo de Euclides", a: "mcd(a,b) = mcd(b, resto(a,b)); el mcd es el último resto no nulo." },
      { q: "Identidad de Bézout", a: "s·a + t·b = mcd(a,b). Se obtiene con Euclides extendido st(a,b)." },
      { q: "TFA", a: "Todo entero > 1 se factoriza de forma única (salvo orden) en primos. Ej: 60 = 2²·3·5." },
      { q: "mcm vía mcd", a: "mcm(a,b) = (a·b) / mcd(a,b)." },
    ],
  },

  /* ===================================================================
     UNIDAD 6 — ARITMÉTICA MODULAR
     =================================================================== */
  {
    id: "teoria2",
    glyph: "≡",
    title: "Aritmética Modular",
    desc: "Relación de equivalencia, congruencia módulo n, el sistema (Zₙ, +ₙ, ×ₙ), ecuaciones en Zₙ, sistemas y diofánticas.",
    tool: "modular",
    html: `
      <p class="lead">La aritmética modular trabaja con los restos al dividir por \\(n\\). Es la matemática de los relojes, los códigos de control y la criptografía.</p>

      <h2>Relación de equivalencia</h2>
      <div class="callout def">
        <strong class="callout__tag">Definición</strong>
        Una relación \\(R\\) sobre un conjunto es de <strong>equivalencia</strong> si es <strong>reflexiva</strong> (\\(a\\,R\\,a\\)), <strong>simétrica</strong> (\\(a\\,R\\,b \\Rightarrow b\\,R\\,a\\)) y <strong>transitiva</strong> (\\(a\\,R\\,b \\wedge b\\,R\\,c \\Rightarrow a\\,R\\,c\\)).
      </div>
      <p>Cada relación de equivalencia parte el conjunto en <strong>clases de equivalencia</strong> disjuntas. La relación \\(R = \\{(x,y) : \\text{resto}(x,3) = \\text{resto}(y,3)\\}\\) genera 3 clases en \\(\\mathbb{Z}\\):</p>
      <div class="formula-box">
        \\([0] = \\{\\dots,-3,0,3,6,\\dots\\}\\) &nbsp;·&nbsp; \\([1] = \\{\\dots,-2,1,4,7,\\dots\\}\\) &nbsp;·&nbsp; \\([2] = \\{\\dots,-1,2,5,8,\\dots\\}\\)
      </div>
      <p>El conjunto de todas las clases es el <strong>conjunto cociente</strong> \\(\\mathbb{Z}/R = \\{[0],[1],[2]\\}\\).</p>

      <h2>Congruencia módulo n</h2>
      <div class="callout def">
        <strong class="callout__tag">Definición</strong>
        $$ a \\equiv b \\pmod{n} \\iff \\text{resto}(a,n) = \\text{resto}(b,n) \\iff n \\mid (a - b) $$
      </div>
      <p>El conjunto cociente da \\(\\mathbb{Z}_n = \\{0, 1, 2, \\dots, n-1\\}\\). Sobre él se definen dos operaciones:</p>
      <div class="formula-box">$$ a +_n b = \\text{resto}(a+b,\\ n) \\qquad a \\times_n b = \\text{resto}(a\\cdot b,\\ n) $$</div>
      <p>Generá las tablas de \\(+_n\\) y \\(\\times_n\\) en la <a href="#/tool/modular">herramienta de aritmética modular</a>.</p>

      <h3>Inversos en Zₙ</h3>
      <ul>
        <li><strong>Inverso aditivo:</strong> todo \\(a\\) tiene uno: \\(n - a\\) (y el de 0 es 0). Neutro: 0.</li>
        <li><strong>Inverso multiplicativo:</strong> \\(a \\neq 0\\) tiene inverso \\(\\iff \\text{mcd}(a,n) = 1\\) (es coprimo con \\(n\\)). Neutro: 1.</li>
      </ul>
      <p>Si \\(n = p\\) es primo, <strong>todo</strong> elemento no nulo de \\(\\mathbb{Z}_p\\) tiene inverso multiplicativo. El inverso se halla con Bézout: si \\(s\\cdot a + t\\cdot n = 1\\), entonces \\(a^{-1} = s\\) (ajustado a \\(\\mathbb{Z}_n\\)). Ej: \\(5^{-1} = 7\\) en \\(\\mathbb{Z}_{17}\\) porque \\(7\\cdot 5 = 35 \\equiv 1\\).</p>

      <h2>Ecuaciones en Zₙ</h2>
      <p>Para resolver \\(a\\cdot x \\equiv b \\pmod{n}\\):</p>
      <div class="callout tip">
        <strong class="callout__tag">Existencia de solución</strong>
        \\(a\\cdot x \\equiv b \\pmod n\\) tiene solución \\(\\iff \\text{mcd}(a,n) \\mid b\\). Si \\(\\text{mcd}(a,n)=1\\), la solución es \\(x \\equiv a^{-1}\\cdot b\\).
      </div>
      <p>Ejemplo: \\(5x \\equiv 12 \\pmod{17}\\). Como \\(5^{-1}=7\\): \\(x \\equiv 7\\cdot 12 = 84 \\equiv 16 \\pmod{17}\\). Solución general \\(x = 16 + 17k\\).</p>

      <h2>Sistemas de ecuaciones (Teorema Chino del Resto)</h2>
      <p>Para congruencias simultáneas \\(x \\equiv a \\pmod m\\), \\(x \\equiv b \\pmod n\\): si los módulos son <strong>coprimos dos a dos</strong>, hay solución <strong>única módulo \\(m\\cdot n\\)</strong>. Se resuelve por sustitución:</p>
      <div class="formula-box">
        \\(x \\equiv 2 \\pmod 3,\\ x \\equiv 4 \\pmod 5 \\ \\Rightarrow\\ x = 14 + 15k\\)
      </div>

      <h2>Ecuaciones diofánticas</h2>
      <div class="callout def">
        <strong class="callout__tag">Definición</strong>
        Ecuación \\(a\\cdot x + b\\cdot y = c\\) con \\(a,b,c \\in \\mathbb{Z}\\) y soluciones <strong>enteras</strong>. Tiene solución \\(\\iff \\text{mcd}(a,b) \\mid c\\).
      </div>
      <p>Con \\(d = \\text{mcd}(a,b)\\) y \\((s,t) = \\text{st}(a/d, b/d)\\), una solución particular es \\(x_0 = s\\cdot(c/d)\\), \\(y_0 = t\\cdot(c/d)\\), y la general:</p>
      <div class="formula-box">$$ x = x_0 + \\tfrac{b}{d}\\lambda, \\qquad y = y_0 - \\tfrac{a}{d}\\lambda, \\qquad \\lambda \\in \\mathbb{Z} $$</div>
      <p>Ejemplo \\(2x + 6y = 8\\): \\(d=2\\), \\((s,t)=\\text{st}(1,3)=(-2,1)\\), \\(x_0=-8\\), \\(y_0=4\\); con \\(\\lambda=3\\) se obtiene la solución positiva \\((1,1)\\). Resolvelas con la <a href="#/tool/modular">herramienta</a>.</p>
    `,
    quiz: [
      { q: "Una relación de equivalencia debe ser…", opts: ["Reflexiva, simétrica y transitiva", "Solo transitiva", "Reflexiva y antisimétrica", "Total y acotada"], a: 0, exp: "Las tres propiedades a la vez definen una relación de equivalencia." },
      { q: "\\(a \\equiv b \\pmod n\\) significa que…", opts: ["a y b son primos", "n divide a (a − b)", "a = b", "a + b = n"], a: 1, exp: "Equivalente a resto(a,n)=resto(b,n), o sea n | (a−b)." },
      { q: "¿Cuál es el inverso aditivo de \\(a\\) en \\(\\mathbb{Z}_n\\)?", opts: ["a", "n − a", "1/a", "a²"], a: 1, exp: "n − a (y el de 0 es 0). Su suma da el neutro 0." },
      { q: "\\(a \\neq 0\\) tiene inverso multiplicativo en \\(\\mathbb{Z}_n\\) si y solo si…", opts: ["a es par", "mcd(a,n) = 1 (a coprimo con n)", "n es par", "a < n/2"], a: 1, exp: "Necesita ser coprimo con n; si n es primo, todos los no nulos lo tienen." },
      { q: "La ecuación \\(a\\cdot x \\equiv b \\pmod n\\) tiene solución si y solo si…", opts: ["a > b", "mcd(a,n) divide a b", "a es primo", "n divide a a"], a: 1, exp: "Condición de existencia: mcd(a,n) | b. Si mcd=1, x ≡ a⁻¹·b." },
      { q: "En un sistema \\(x\\equiv a\\ (m)\\), \\(x\\equiv b\\ (n)\\) con m,n coprimos, la solución es única módulo…", opts: ["m + n", "m · n", "mcd(m,n)", "máx(m,n)"], a: 1, exp: "Teorema Chino del Resto: solución única módulo m·n cuando son coprimos." },
      { q: "La ecuación diofántica \\(a x + b y = c\\) tiene solución entera si y solo si…", opts: ["mcd(a,b) divide a c", "a divide a b", "c es primo", "a = b"], a: 0, exp: "Condición: mcd(a,b) | c. La solución usa Bézout." },
    ],
    cards: [
      { q: "Relación de equivalencia", a: "Reflexiva + simétrica + transitiva. Parte el conjunto en clases de equivalencia disjuntas." },
      { q: "Congruencia mod n", a: "a ≡ b (mod n) ⟺ resto(a,n)=resto(b,n) ⟺ n | (a−b)." },
      { q: "Conjunto Zₙ", a: "Zₙ = {0,1,…,n−1}, el conjunto cociente de las clases módulo n." },
      { q: "Operaciones en Zₙ", a: "a +ₙ b = resto(a+b, n); a ×ₙ b = resto(a·b, n)." },
      { q: "Inverso aditivo y multiplicativo", a: "Aditivo: n−a (siempre). Multiplicativo: existe ⟺ mcd(a,n)=1." },
      { q: "Inverso multiplicativo vía Bézout", a: "Si s·a + t·n = 1, entonces a⁻¹ = s ajustado a Zₙ. Ej: 5⁻¹=7 en Z₁₇." },
      { q: "Ecuación a·x ≡ b (mod n)", a: "Tiene solución ⟺ mcd(a,n) | b. Si mcd=1, x ≡ a⁻¹·b." },
      { q: "Teorema Chino del Resto", a: "Módulos coprimos dos a dos ⇒ solución única módulo el producto de los módulos." },
      { q: "Ecuación diofántica", a: "a·x+b·y=c tiene solución entera ⟺ mcd(a,b) | c. General: x=x₀+(b/d)λ, y=y₀−(a/d)λ." },
    ],
  },

  /* ===================================================================
     UNIDAD 7 — DISEÑO Y PRUEBA DE ALGORITMOS
     =================================================================== */
  {
    id: "prueba",
    glyph: "✓",
    title: "Diseño y Prueba de Algoritmos",
    desc: "Estrategias de diseño (voraz, divide y vencerás…) y prueba/verificación del software.",
    tool: null,
    html: `
      <p class="lead">Esta unidad cierra el curso: cómo se <strong>diseñan</strong> algoritmos eficientes y cómo se <strong>prueba</strong> que el software hace lo que debe.</p>

      <h2>Estrategias de diseño de algoritmos</h2>
      <p>Patrones generales para construir algoritmos, varios ya vistos en el curso:</p>
      <ul>
        <li><strong>Algoritmos voraces (greedy):</strong> en cada paso eligen la mejor opción local con la esperanza de un óptimo global. Ej: <strong>Dijkstra</strong> y <strong>Prim</strong>.</li>
        <li><strong>Divide y vencerás:</strong> dividir el problema en subproblemas, resolverlos y combinar. Ej: la búsqueda binaria del <strong>ABB</strong>, el <code>cr10</code> de la división.</li>
        <li><strong>Programación dinámica:</strong> resolver subproblemas solapados una sola vez y guardar resultados. Ej: <strong>Floyd</strong> (matrices \\(A_k\\)).</li>
        <li><strong>Backtracking (vuelta atrás):</strong> explorar candidatos y retroceder al fallar. Ej: el recorrido <strong>DFS</strong>.</li>
        <li><strong>Recursión:</strong> definir la solución en términos de casos más chicos. Ej: <code>mcd</code>, recorridos de árboles, <code>cr</code>.</li>
      </ul>

      <h2>Prueba vs verificación</h2>
      <div class="callout def">
        <strong class="callout__tag">Definiciones</strong>
        <strong>Prueba:</strong> ejecutar el software con distintas entradas para <strong>descubrir errores y defectos</strong>.<br>
        <strong>Verificación:</strong> garantizar que el software <strong>cumple sus especificaciones y requisitos</strong>.
      </div>

      <h2>Tipos de prueba</h2>
      <ul>
        <li><strong>Prueba unitaria:</strong> prueba cada componente por separado (p. ej. que una función <code>suma</code> sume bien).</li>
        <li><strong>Prueba de integración:</strong> prueba la interacción entre componentes (que la base de datos se comunique con el servidor).</li>
        <li><strong>Prueba de sistema:</strong> prueba el sistema completo contra los requisitos.</li>
      </ul>

      <h3>Pruebas sobre estructuras de control</h3>
      <p>Al probar <code>if/else</code>, <code>for</code>, <code>while</code>, <code>switch</code> se busca:</p>
      <ul>
        <li><strong>Rama V y F:</strong> que se ejecuten correctamente el bloque del <code>if</code> y el del <code>else</code>.</li>
        <li><strong>Prueba de límites:</strong> valores mínimos/máximos y puntos críticos de las condiciones.</li>
        <li><strong>Prueba de bucles:</strong> número correcto de iteraciones y ausencia de ciclos infinitos.</li>
        <li><strong>Condiciones múltiples:</strong> combinaciones de condiciones.</li>
      </ul>

      <h2>Depuración (debugging)</h2>
      <p>Identificar, analizar y corregir errores. Pasos: (1) identificar el error, (2) reproducirlo de forma consistente, (3) analizar el código, (4) usar herramientas de depuración (breakpoints, inspección de variables), (5) corregir, (6) re-probar para confirmar.</p>

      <h2>Técnicas de verificación y excepciones</h2>
      <ul>
        <li><strong>Revisión de código:</strong> otros programadores revisan el código.</li>
        <li><strong>Análisis estático:</strong> analizar el código <strong>sin ejecutarlo</strong> (p. ej. detectar variables no usadas).</li>
        <li><strong>Modelado formal:</strong> técnicas matemáticas para verificar propiedades.</li>
      </ul>
      <p>Las <strong>excepciones</strong> son eventos inesperados que interrumpen el flujo (división por cero, índice fuera de rango). C no las soporta; C++ sí, con <code>try / throw / catch</code> (y <code>finally</code> para liberar recursos):</p>
      <pre class="code"><span class="kw">try</span> {
   <span class="cm">// código que puede fallar</span>
   <span class="kw">throw</span> argumento;
}
<span class="kw">catch</span> (excepcion) {
   <span class="cm">// manejo de la excepción</span>
}</pre>
    `,
    quiz: [
      { q: "Dijkstra y Prim son ejemplos de la estrategia…", opts: ["Divide y vencerás", "Voraz (greedy)", "Backtracking", "Fuerza bruta"], a: 1, exp: "Ambos eligen en cada paso la mejor opción local (arista mínima)." },
      { q: "El algoritmo de Floyd es un ejemplo de…", opts: ["Programación dinámica", "Voraz", "Backtracking", "Recursión simple"], a: 0, exp: "Construye soluciones a subproblemas (matrices A_k) reutilizándolas." },
      { q: "¿Cuál es la diferencia entre prueba y verificación?", opts: ["Son lo mismo", "La prueba ejecuta para hallar errores; la verificación garantiza el cumplimiento de requisitos", "La verificación ejecuta y la prueba no", "Ninguna ejecuta el software"], a: 1, exp: "Prueba = ejecutar y buscar errores; verificación = cumplir especificaciones." },
      { q: "Probar cada función por separado es una prueba…", opts: ["De integración", "Unitaria", "De sistema", "De aceptación"], a: 1, exp: "La prueba unitaria valida cada componente de forma aislada." },
      { q: "Verificar que la base de datos se comunique con el servidor web es una prueba…", opts: ["Unitaria", "De integración", "De límites", "Estática"], a: 1, exp: "La integración prueba la interacción entre componentes." },
      { q: "El análisis estático consiste en…", opts: ["Ejecutar el programa muchas veces", "Analizar el código sin ejecutarlo", "Medir el tiempo de ejecución", "Probar la interfaz"], a: 1, exp: "Examina el código fuente sin correrlo (p. ej. detecta variables no usadas)." },
      { q: "En C++, el bloque que captura una excepción lanzada con throw es…", opts: ["catch", "finally", "except", "rescue"], a: 0, exp: "try lanza con throw y catch maneja la excepción del tipo correspondiente." },
    ],
    cards: [
      { q: "Algoritmo voraz (greedy)", a: "Elige la mejor opción local en cada paso. Ej: Dijkstra, Prim." },
      { q: "Divide y vencerás", a: "Dividir en subproblemas, resolver y combinar. Ej: búsqueda binaria, cr10." },
      { q: "Programación dinámica", a: "Resolver subproblemas solapados una vez y guardar resultados. Ej: Floyd." },
      { q: "Backtracking", a: "Explorar candidatos y retroceder al fallar. Ej: DFS." },
      { q: "Prueba vs verificación", a: "Prueba: ejecutar para hallar errores. Verificación: cumplir las especificaciones." },
      { q: "Tipos de prueba", a: "Unitaria (componente), integración (interacción), sistema (completo vs requisitos)." },
      { q: "Análisis estático", a: "Analizar el código sin ejecutarlo (detectar variables no usadas, etc.)." },
      { q: "Excepciones en C++", a: "try / throw / catch (y finally para liberar recursos). C no las soporta." },
    ],
  },

  ],
};
