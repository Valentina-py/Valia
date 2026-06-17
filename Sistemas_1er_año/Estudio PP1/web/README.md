# Estudio PP1 — Operador Básico de Computadora

Plataforma web interactiva de estudio para **Prácticas Profesionalizantes I**, con teoría,
herramientas interactivas, práctica guiada, autoevaluación, juegos y seguimiento de progreso.
Pensada para estudiar en cualquier momento: en la computadora o en el celular.

## Contenido

Siete unidades basadas en el material de la cátedra:

1. **Hardware** — sistema informático, CPU, placa madre, memorias (RAM/ROM), puertos, periféricos y fuente.
2. **Software y Humanware** — tipos y características del software, niveles de usuario, licencias, seguridad informática y humanware.
3. **Introducción a la Informática** — la PC, sistemas operativos, el escritorio de Windows, archivos, compresión y captura de pantalla.
4. **Configuración de Hardware y Software** — drivers, compatibilidad, panel de control, instalación de programas y de sistemas operativos, doble booteo.
5. **Mantenimiento y Reparación** — mantenimiento preventivo, correctivo y predictivo, herramientas, limpieza y mensajes de error.
6. **Gestión de la Información** — la información como activo, almacenamiento, pérdida y recuperación de datos, copias de seguridad.
7. **Informe Técnico y Cotización** — el informe técnico y sus etapas, cotización vs. presupuesto y cómo armar un presupuesto.

## Herramientas interactivas

- **Cotizador de PC** — armá una computadora, elegí componentes y calculá el presupuesto total (ideal para el Proyecto Final).
- **Conversor de almacenamiento** — convertí entre bits, bytes, KB, MB, GB y TB.
- **Diagnóstico de fallas** — elegí un síntoma y obtené la causa probable y la solución.
- **Armador de informe técnico** — checklist con las etapas y partes de un informe.

## Práctica y juegos

- **Taller PSeInt** (variables simples y vectores) con la solución en pseudocódigo y la guía del **Proyecto Final**.
- **Flashcards** por unidad y **autoevaluación** con quizzes por unidad y un quiz general.
- **7 juegos**: Clasificá el dispositivo, Verdadero o Falso, Memotest, Ahorcado, Conectá, Cazá el error y Ordená la secuencia.
- **Progreso** guardado en el navegador (localStorage): teoría leída, mejor puntaje y mejores marcas de los juegos.

## Probarlo localmente

Es un sitio **estático** (HTML/CSS/JS, sin build). Abrí `index.html` en el navegador, o levantá un servidor:

```bash
# con Python
python -m http.server 5173
# o con Node
npx serve .
```

Luego abrí <http://localhost:5173>.

## Cómo subirlo a Vercel

### Opción A — Arrastrar y soltar
1. Entrá a <https://vercel.com> e iniciá sesión.
2. **Add New → Project → Deploy** y arrastrá esta carpeta `web/`.

### Opción B — Desde GitHub
1. Subí el repositorio a GitHub.
2. En Vercel: **Add New → Project → Import** ese repo.
3. Framework Preset: **Other**. Root Directory: la carpeta donde está `index.html`.
4. **Deploy**.

> Al ser estático, Vercel sirve los archivos tal cual; no hace falta configurar build ni output.

## Estructura

```
web/
├── index.html
├── vercel.json
├── README.md
├── css/styles.css
└── js/
    ├── data.js      # teoría, quizzes y flashcards de las unidades
    ├── practice.js  # ejercicios de PSeInt y guía del Proyecto Final
    ├── tools.js     # cotizador, conversor, diagnóstico e informe
    ├── games.js     # los 7 juegos de aprendizaje
    └── app.js       # router, navegación, iconos, progreso, quiz, flashcards y práctica
```

El sitio necesita conexión a internet solo para cargar las fuentes; el resto funciona de forma local.
