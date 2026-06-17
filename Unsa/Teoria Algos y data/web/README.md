# Algoritmos y Estructuras de Datos · Plataforma interactiva

Sitio web estático (SPA sin build) para estudiar **Algoritmos y Estructuras de Datos**:
teoría, herramientas interactivas, práctica guiada, autoevaluación y juegos.

## Contenido

**7 unidades**

1. TADs Lineales: Listas y Colas
2. Grafos: Terminología y Representación
3. Grafos: Caminos, Euler y Recorridos
4. Árboles: AB, ABB, 2-3 y AVL
5. Teoría de Números: Divisibilidad
6. Aritmética Modular
7. Diseño y Prueba de Algoritmos

Cada unidad tiene teoría con fórmulas (KaTeX), quiz y flashcards.

**8 herramientas interactivas**

- **Cola circular**: simulador con array, índices Frente/Fin y envoltura.
- **Editor de grafos**: dibujá un grafo y obtené su matriz de adyacencia, de costos y listas de adyacencia.
- **Caminos y recorridos**: Dijkstra, Floyd, DFS/BFS, árbol cubridor (Prim) y detector de Euler.
- **Árbol ABB / AVL**: insertar, buscar, eliminar; recorridos y rotaciones, dibujado en SVG.
- **Cociente y resto en ℤ**: división entera con resto siempre ≥ 0 (los 4 casos de signos).
- **Criba de Eratóstenes**: primos hasta M, paso a paso.
- **MCD · Bézout · TFA**: Euclides, algoritmo extendido y factorización en primos.
- **Aritmética modular**: tablas de Zₙ, inversos, ecuaciones a·x ≡ b y diofánticas.

**8 juegos** · ejercicios prácticos · simulacro de parcial con cronómetro · progreso en `localStorage`
· modo claro/oscuro · buscador.

## Estructura

```
web/
├── index.html
├── css/styles.css
└── js/
    ├── data.js        # teoría, quiz y flashcards de las 7 unidades
    ├── practice.js    # ejercicios resueltos
    ├── tad.js         # herramienta: cola circular
    ├── grafos.js      # herramienta: editor de grafos → matrices
    ├── caminos.js     # herramienta: Dijkstra/Floyd/DFS/BFS/Prim/Euler
    ├── arboles.js     # herramienta: árbol ABB/AVL
    ├── numeros.js     # herramientas: división, criba, Euclides/Bézout/TFA
    ├── modular.js     # herramienta: aritmética modular
    ├── games.js       # 8 juegos
    └── app.js         # router, navegación, quiz, flashcards, progreso, examen, búsqueda
```

## Uso

Es un sitio estático: se abre `index.html` directamente o se sirve con cualquier
servidor estático. Listo para desplegar en Vercel (`vercel.json` incluido).

No requiere instalación ni build. KaTeX y las fuentes se cargan por CDN.
