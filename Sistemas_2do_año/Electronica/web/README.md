# Estudio de Electrónica · Análisis de Circuitos

Plataforma interactiva de estudio basada en *Introducción al Análisis de Circuitos* (R. Boylestad, 12ª ed.). Misma estética y arquitectura que la web de **Estudio Matemática**.

## Contenido

- **10 unidades** con teoría, quiz y flashcards: Ley de Ohm · Resistencia y código de colores · Circuitos en serie · en paralelo · serie-paralelo · Métodos de análisis · Teoremas de red · Capacitores · Inductores · Corriente alterna.
- **5 herramientas interactivas**: Ley de Ohm, Código de colores, Resistencia equivalente, Divisor de tensión/corriente, Reactancia e impedancia.
- **9 juegos**: Resolvé con Ohm, Verdadero/Falso, Clasificá el componente, Código de colores, Memotest, Conectá, Ahorcado, Ordená resistencias, Cazá el error.
- **Ejercicios resueltos** paso a paso (CD y CA).
- Modo claro/oscuro, búsqueda, progreso guardado en `localStorage`.

## Cómo usarla

Abrí `index.html` en cualquier navegador. No requiere servidor ni build. Usa KaTeX (CDN) para las fórmulas.

## Estructura

```
web/
├── index.html
├── css/styles.css
└── js/
    ├── data.js     ← contenido (teoría, quiz, flashcards, ejercicios)
    ├── tools.js    ← herramientas interactivas (window.Tools)
    ├── games.js    ← juegos (window.Games)
    └── app.js      ← router, progreso, quiz, flashcards, búsqueda
```

## Deploy

Compatible con Vercel (sitio estático). Subir la carpeta `web/`.
