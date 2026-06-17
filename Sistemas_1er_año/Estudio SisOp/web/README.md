# Estudio de Sistemas Operativos — Plataforma interactiva

Sitio web de estudio de **Sistemas Operativos**, con teoría clara, **simuladores
interactivos**, práctica guiada con los Trabajos Prácticos, autoevaluación y
seguimiento de progreso. Pensado para estudiar en la compu o en el celular.

## Contenido

Cinco unidades:

1. **Fundamentos de los SO** — qué es un SO, evolución histórica, características modernas, Windows/Linux, arquitecturas y virtualización.
2. **Procesos y Planificación de CPU** — procesos, estados, PCB, hilos, monitoreo (Linux/Windows), algoritmos de planificación y sección crítica (semáforos, Peterson).
3. **Gestión de Memoria** — direcciones lógicas/físicas, particiones, fragmentación, paginación, segmentación y memoria virtual.
4. **Sistemas de Archivos** — archivos, atributos, métodos de acceso, directorios, asignación de espacio y FAT/NTFS/ext4.
5. **Sistema de Entrada/Salida** — dispositivos, controladores, técnicas de E/S (polling, interrupciones, DMA), buffers, planificación de disco y RAID.

## Herramientas interactivas

- **Planificador de CPU** — simula FCFS, SJF, SRTF, Round Robin y Prioridades; dibuja el **diagrama de Gantt** y calcula espera, retorno y penalización.
- **Laboratorio de memoria** — traducción de direcciones por **paginación** y **segmentación**, y simulador de **reemplazo de páginas** (FIFO / LRU / Óptimo).
- **Planificación de disco** — FCFS, SSTF, SCAN, C-SCAN, LOOK; muestra el recorrido y el **desplazamiento total del cabezal**.
- **Conversor de bases** — binario, octal, decimal y hexadecimal, con potencias de 2 y bytes.
- **Terminal interactiva** — shell de Linux simulado con archivos y procesos (`ls`, `cd`, `cat`, `ps`, `top`, `kill`, `free`…).

## Práctica y autoevaluación

- **Ejercicios de los Trabajos Prácticos** con solución paso a paso revelable (planificación de CPU, paginación, segmentación, E/S, RAID).
- **Flashcards** por unidad (tarjetas que se dan vuelta).
- **Autoevaluación** con quizzes por unidad y un **quiz general** mezclado.
- **8 juegos** de aprendizaje (clasificación, V/F, memotest, conversión binaria, ordená la secuencia, ahorcado, conectá y mini-planificador).
- **Progreso** guardado en el navegador (localStorage): teoría leída + mejor puntaje + récords de juegos.

## Probarlo localmente

Es un sitio **estático** (HTML/CSS/JS, sin build). Abrí `index.html` en el navegador,
o levantá un servidor:

```bash
# con Python
python -m http.server 5173
# o con Node
npx serve .
```

Luego abrí <http://localhost:5173>.

## Cómo subirlo a la web (Vercel)

1. Subí esta carpeta a un repositorio de GitHub.
2. En Vercel: **Add New → Project → Import** ese repo.
3. Framework Preset: **Other**. Root Directory: la carpeta donde está `index.html`.
4. **Deploy**. Al ser estático, no hace falta configurar build ni output.

## Estructura

```
web/
├── index.html
├── vercel.json
├── css/styles.css
└── js/
    ├── data.js       # teoría, quizzes, flashcards y ejercicios de las 5 unidades
    ├── cpu.js        # planificador de CPU (Gantt + métricas)
    ├── memory.js     # paginación, reemplazo de páginas y segmentación
    ├── disk.js       # planificación de disco
    ├── bases.js      # conversor de bases y unidades
    ├── terminal.js   # terminal Linux simulada
    ├── games.js      # 8 juegos de aprendizaje
    └── app.js        # router, navegación, progreso, quiz, flashcards, práctica
```

El sitio funciona de forma local; solo necesita conexión a internet para cargar las
fuentes tipográficas.
