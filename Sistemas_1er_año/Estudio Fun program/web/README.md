# Estudio Programación · Fundamentos de la Programación

Plataforma web interactiva de estudio para **Fundamentos de la Programación** (1er año). SPA estática, sin build: solo HTML, CSS y JavaScript.

## Contenido

**4 unidades** con teoría, quiz y flashcards:
1. **Álgebra de Boole** — conjunto {0,1}, postulados, teoremas, De Morgan, minitérminos/maxitérminos y mapas de Karnaugh.
2. **Algoritmos y Datos** — qué es un algoritmo, variables y constantes, tipos de datos y operadores.
3. **Diagramación y Estructuras de Control** — diagramas de flujo y NS, secuencia, selección, iteración, contadores y acumuladores.
4. **Vectores (Arreglos)** — carga, recorrido, conteo, búsqueda y ordenamiento (selección, burbuja, inserción).

**6 herramientas interactivas:**
- **Tabla de verdad booleana** — evalúa expresiones con `+`, `·`, complemento y AND implícito.
- **Formas normales (FND/FNC)** — deriva minitérminos y maxitérminos desde una tabla de verdad editable.
- **Mapa de Karnaugh** — minimiza funciones booleanas (Quine-McCluskey) de 2 a 4 variables.
- **Conversor de bases** — entre bases 2–16 con división reiterada y suma ponderada.
- **Visualizador de ordenamiento** — anima burbuja, selección e inserción paso a paso.
- **Intérprete de pseudocódigo** — ejecuta algoritmos en español (Leer/Escribir, Si, Mientras, Repetir, Para, vectores).

**10 juegos** de aprendizaje y autoevaluación con quiz por unidad, examen general, progreso y modo claro/oscuro.

## Cómo correr

Es estático: abrí `index.html` con cualquier servidor estático. Por ejemplo:

```bash
npx serve .
# o
python -m http.server
```

## Estructura

```
web/
├── index.html
├── css/styles.css
└── js/
    ├── data.js        # unidades: teoría, quiz, flashcards
    ├── practice.js    # trabajos prácticos con soluciones
    ├── boole.js       # herramienta: tabla de verdad
    ├── formas.js      # herramienta: FND / FNC
    ├── karnaugh.js    # herramienta: mapa de Karnaugh
    ├── bases.js       # herramienta: conversor de bases
    ├── sorting.js     # herramienta: visualizador de ordenamiento
    ├── pseudo.js      # herramienta: intérprete de pseudocódigo
    ├── games.js       # juegos de aprendizaje
    └── app.js         # router, navegación, progreso, búsqueda
```

El progreso (teoría leída, mejores notas de quiz y marcas de juegos) se guarda en `localStorage`.
