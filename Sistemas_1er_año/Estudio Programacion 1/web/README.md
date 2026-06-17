# Estudio de Programación 1 · Plataforma interactiva (Lenguaje C)

Plataforma de estudio para **Programación 1** (1er año), centrada en el **lenguaje C**.
Es una aplicación web estática (SPA) sin compilación: solo HTML, CSS y JavaScript.

## ¿Qué incluye?

- **6 unidades** de teoría con ejemplos de código:
  1. De PSeInt a C (estructura de un programa, `printf`/`scanf`)
  2. Tipos de datos simples y enumerados
  3. Estructuras de control (`if`/`else`, `switch`, `for`, `while`)
  4. Arreglos (vectores)
  5. Caracteres y cadenas (`string.h`)
  6. Módulos (funciones)
- **Consola de C interactiva**: un mini-intérprete que ejecuta C en el navegador
  (variables, `printf`/`scanf`, `if`/`switch`/`for`/`while`/`do-while`, vectores,
  funciones, `string.h`) con **modo paso a paso** y seguimiento de variables.
- **6 herramientas**: Consola de C, De PSeInt a C, Tabla ASCII, Conversor de bases,
  Simulador de vectores y Explorador de tipos.
- **Ejercicios** de los Trabajos Prácticos (TP 0 a TP 3) con solución en C.
- **11 juegos** de aprendizaje (adiviná la salida, cazá el error, memotest, ordená el
  código, ahorcado, etc.).
- **Autoevaluación** (quiz por unidad), **flashcards** y **seguimiento de progreso**
  guardado en el dispositivo (`localStorage`).
- Modo **claro / oscuro** y buscador.

## Cómo verlo

Abrí `index.html` en un navegador, o servilo con cualquier servidor estático:

```bash
npx serve .
```

## Estructura

```
web/
├── index.html
├── css/styles.css
└── js/
    ├── cengine.js   # intérprete de C + resaltador de sintaxis
    ├── data.js      # unidades (teoría, quiz, flashcards)
    ├── practice.js  # ejercicios de los TP con solución
    ├── tools.js     # herramientas interactivas
    ├── games.js     # juegos
    └── app.js       # router, navegación, progreso, búsqueda
```

Hecho para estudiar mejor.
