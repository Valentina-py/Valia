# Inglés para el Turismo I · Plataforma de estudio

Sitio web interactivo (sin dependencias, 100% estático) para estudiar **Inglés para el Turismo I** — nivel elemental (A1).

Mismo estilo y arquitectura que la plataforma de *Estudio Matemática*, adaptado al inglés.

## Contenido

**10 unidades** con teoría bilingüe (explicación en español, ejemplos en inglés), tablas, diálogos, vocabulario y frases de turismo:

1. Saludos y presentaciones — verbo *to be*, números 0–10, días, alfabeto.
2. Países y nacionalidades — *be* plural, preguntas *Wh-*, números 11–100.
3. Objetos, compras y precios — *a/an*, plurales, *this/that/these/those*.
4. Familia y descripciones — posesivos, genitivo *'s*, adjetivos.
5. Rutinas, comida y la hora — *present simple*, comida, vuelos, la hora.
6. Trabajos y rutina diaria — *present simple* 3ª persona, adverbios de frecuencia.
7. Tiempo libre, preguntas y fechas — orden de la pregunta, imperativos, pronombres objeto, meses.
8. Habilidad, pedidos y gustos — *can/can't*, *like + -ing*.
9. Acciones en este momento — *present continuous*, ropa.
10. Hoteles, lugares y el pasado — *there is/are*, preposiciones, *was/were*.

Cada unidad incluye **quiz** (autoevaluación) y **flashcards**.

## Herramientas interactivas

- **Conjugador de verbos** — *to be*, *present simple*, *present continuous* y *can*.
- **Números y la hora** — número → palabras (0–1000) y reloj interactivo.
- **Frases para turismo** — frasebook por situación (aeropuerto, hotel, restaurante…).
- **Vocabulario por temas** — tarjetas de países, trabajos, comida, familia, ropa y hotel.

## Juegos

- **Memotest** — emparejar palabras en inglés con su traducción (por tema).
- **Contrarreloj** — responder la mayor cantidad de preguntas en 60 segundos.
- **Ordená la oración** — armar la oración correcta colocando las palabras en orden.
- **Ahorcado** — adivinar la palabra letra por letra, con pista en español.

## Examen

- **Examen · Unidades 1–4** — 20 preguntas integradoras de las primeras 4 unidades, con cuenta regresiva de 15 minutos, corrección con explicaciones y nota final sobre 10 (guarda la mejor nota).

## Otras secciones

- **Ejercicios** de práctica con solución revelable (uno por unidad).
- **Mi progreso** con anillo circular (se guarda en el navegador con `localStorage`).
- Buscador, modo claro/oscuro y diseño totalmente responsive (móvil, tablet y escritorio).

## Interacción y experiencia

- **Color propio por unidad**, encabezados con degradé y *hero* de inicio.
- **Atajos de teclado**: en el quiz, teclas **1–4** para responder y **Enter** para avanzar; en las flashcards, **barra espaciadora** para girar y **flechas** para navegar.
- **Botón flotante** para volver arriba.
- **Listo como web pública**: favicon, manifiesto PWA (instalable) y metadatos Open Graph/Twitter para compartir el enlace.

## Uso

Abrí `index.html` en cualquier navegador. No requiere instalación ni conexión (salvo las fuentes de Google, opcionales).

### Servir localmente
```bash
# con Python
python -m http.server 8080
# o con Node
npx serve .
```
Luego abrí http://localhost:8080

## Estructura

```
web/
├── index.html
├── favicon.svg
├── site.webmanifest
├── css/styles.css
└── js/
    ├── data.js       # unidades: teoría, quiz, flashcards
    ├── practice.js   # ejercicios de práctica
    ├── tools.js      # herramientas interactivas
    ├── games.js      # juegos (memotest, contrarreloj, oraciones, ahorcado)
    └── app.js        # router, navegación, progreso, examen
```
