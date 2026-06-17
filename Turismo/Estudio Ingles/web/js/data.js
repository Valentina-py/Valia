/* ============================================================
   CONTENIDO DE ESTUDIO — Inglés para el Turismo I
   Basado en el programa de "Inglés para el Turismo I",
   nivel elemental (A1). Estructura por unidades temáticas de gramática
   y vocabulario, con foco en situaciones de turismo.
   Las explicaciones están en español; los ejemplos, en inglés.
   ============================================================ */
window.APP_DATA = {
  units: [

  /* ===================================================================
     UNIDAD 1 — SALUDOS Y PRESENTACIONES (verb be · singular)
     =================================================================== */
  {
    id: "saludos",
    icon: "greet",
    title: "Saludos y presentaciones",
    desc: "El verbo to be, pronombres, números 0–10, días y el alfabeto.",
    tool: "verbs",
    html: `
      <p class="lead">En esta unidad aprendés a <strong>saludar</strong>, <strong>presentarte</strong> y usar el verbo más importante del inglés: <span class="en">to be</span> (ser / estar).</p>

      <h2>Saludos (Greetings)</h2>
      <div class="phrase-list">
        <div class="phrase"><span class="phrase__en">Hello / Hi</span><span class="phrase__es">Hola</span></div>
        <div class="phrase"><span class="phrase__en">Good morning</span><span class="phrase__es">Buenos días (mañana)</span></div>
        <div class="phrase"><span class="phrase__en">Good afternoon</span><span class="phrase__es">Buenas tardes (12–6 pm)</span></div>
        <div class="phrase"><span class="phrase__en">Good evening</span><span class="phrase__es">Buenas noches (al llegar)</span></div>
        <div class="phrase"><span class="phrase__en">Goodbye / Bye</span><span class="phrase__es">Adiós / Chau</span></div>
        <div class="phrase"><span class="phrase__en">See you tomorrow / on Friday</span><span class="phrase__es">Nos vemos mañana / el viernes</span></div>
      </div>

      <h2>Pronombres personales (Subject pronouns)</h2>
      <p>Reemplazan al sujeto. Siempre se usan (el inglés no omite el sujeto como el español).</p>
      <div class="tbl-wrap">
      <table class="tbl">
        <thead><tr><th>Inglés</th><th>Español</th><th>Inglés</th><th>Español</th></tr></thead>
        <tbody>
          <tr><td class="en">I</td><td>yo</td><td class="en">we</td><td>nosotros/as</td></tr>
          <tr><td class="en">you</td><td>tú / usted</td><td class="en">you</td><td>ustedes</td></tr>
          <tr><td class="en">he</td><td>él</td><td class="en">they</td><td>ellos/as</td></tr>
          <tr><td class="en">she</td><td>ella</td><td class="en">it</td><td>(cosa / animal)</td></tr>
        </tbody>
      </table>
      </div>
      <div class="callout warn"><strong class="callout__tag">Ojo</strong> <span class="en">I</span> (yo) se escribe SIEMPRE con mayúscula, en cualquier parte de la oración.</div>

      <h2>El verbo <span class="en">to be</span> (singular)</h2>
      <p>Tiene tres formas en singular: <span class="en">am</span>, <span class="en">is</span>, <span class="en">are</span>. En el habla casi siempre se usan <strong>contracciones</strong>.</p>
      <div class="conj">
        <div class="conj__cell"><b>I am</b> = I'm <span class="gloss">yo soy/estoy</span></div>
        <div class="conj__cell"><b>You are</b> = You're <span class="gloss">tú eres/estás</span></div>
        <div class="conj__cell"><b>He is</b> = He's <span class="gloss">él es/está</span></div>
        <div class="conj__cell"><b>She is</b> = She's <span class="gloss">ella es/está</span></div>
        <div class="conj__cell"><b>It is</b> = It's <span class="gloss">(eso) es/está</span></div>
      </div>

      <h3>Forma negativa</h3>
      <p>Se agrega <span class="en">not</span> después del verbo.</p>
      <div class="formula-box"><span class="en">I'm not</span> · <span class="en">You aren't</span> (you're not) · <span class="en">He isn't</span> (he's not)</div>

      <h3>Preguntas y respuestas cortas</h3>
      <p>Para preguntar, se <strong>invierte</strong> el orden: verbo + sujeto.</p>
      <div class="dialogue">
        <p><span class="sp">A:</span> <span class="en">Are you Penelope Cruz?</span> <span class="gloss">¿Eres Penélope Cruz?</span></p>
        <p><span class="sp">B:</span> <span class="en">No, I'm not. I'm Julia Roberts.</span></p>
        <p><span class="sp">A:</span> <span class="en">Is she good?</span> — <span class="en">Yes, she is. / No, she isn't.</span></p>
      </div>
      <div class="callout tip"><strong class="callout__tag">Respuestas cortas</strong> En la respuesta corta afirmativa NO se contrae: se dice <span class="en">Yes, I am</span> (no «Yes, I'm»).</div>

      <h2>Presentarse (Introductions)</h2>
      <div class="dialogue">
        <p><span class="sp">A:</span> <span class="en">Hi, I'm Caroline. What's your name?</span></p>
        <p><span class="sp">B:</span> <span class="en">Hello, I'm Harry. Nice to meet you.</span></p>
        <p><span class="sp">A:</span> <span class="en">Nice to meet you too.</span></p>
      </div>

      <h2>Números 0–10</h2>
      <div class="voc-grid">
        <div class="voc"><span class="voc__en">0 zero</span><span class="voc__es">cero</span></div>
        <div class="voc"><span class="voc__en">1 one</span><span class="voc__es">uno</span></div>
        <div class="voc"><span class="voc__en">2 two</span><span class="voc__es">dos</span></div>
        <div class="voc"><span class="voc__en">3 three</span><span class="voc__es">tres</span></div>
        <div class="voc"><span class="voc__en">4 four</span><span class="voc__es">cuatro</span></div>
        <div class="voc"><span class="voc__en">5 five</span><span class="voc__es">cinco</span></div>
        <div class="voc"><span class="voc__en">6 six</span><span class="voc__es">seis</span></div>
        <div class="voc"><span class="voc__en">7 seven</span><span class="voc__es">siete</span></div>
        <div class="voc"><span class="voc__en">8 eight</span><span class="voc__es">ocho</span></div>
        <div class="voc"><span class="voc__en">9 nine</span><span class="voc__es">nueve</span></div>
        <div class="voc"><span class="voc__en">10 ten</span><span class="voc__es">diez</span></div>
      </div>

      <h2>Días de la semana (Days of the week)</h2>
      <p>En inglés se escriben con <strong>mayúscula inicial</strong>.</p>
      <div class="voc-grid">
        <div class="voc"><span class="voc__en">Monday</span><span class="voc__es">lunes</span></div>
        <div class="voc"><span class="voc__en">Tuesday</span><span class="voc__es">martes</span></div>
        <div class="voc"><span class="voc__en">Wednesday</span><span class="voc__es">miércoles</span></div>
        <div class="voc"><span class="voc__en">Thursday</span><span class="voc__es">jueves</span></div>
        <div class="voc"><span class="voc__en">Friday</span><span class="voc__es">viernes</span></div>
        <div class="voc"><span class="voc__en">Saturday</span><span class="voc__es">sábado</span></div>
        <div class="voc"><span class="voc__en">Sunday</span><span class="voc__es">domingo</span></div>
      </div>

      <h2>El alfabeto y deletrear (The alphabet)</h2>
      <p>Saber deletrear es clave para tomar nombres y apellidos. Se pregunta:</p>
      <div class="dialogue">
        <p><span class="sp">A:</span> <span class="en">How do you spell your name?</span> <span class="gloss">¿Cómo se escribe tu nombre?</span></p>
        <p><span class="sp">B:</span> <span class="en">It's W-A-L-K-E-R.</span></p>
      </div>

      <h2 id="hotel1">Turismo: llegar a un hotel</h2>
      <div class="phrase-list">
        <div class="phrase"><span class="phrase__en">I have a reservation.</span><span class="phrase__es">Tengo una reserva.</span></div>
        <div class="phrase"><span class="phrase__en">My name is Rob Walker.</span><span class="phrase__es">Mi nombre es Rob Walker.</span></div>
        <div class="phrase"><span class="phrase__en">What's your surname?</span><span class="phrase__es">¿Cuál es su apellido?</span></div>
        <div class="phrase"><span class="phrase__en">You're in room 321.</span><span class="phrase__es">Usted está en la habitación 321.</span></div>
      </div>
    `,
    quiz: [
      { q: "¿Cuál es la contracción correcta de «I am»?",
        opts: ["I're", "I'm", "Im", "I's"], a: 1,
        exp: "I am se contrae como I'm." },
      { q: "Completá: «She ___ from Spain.»",
        opts: ["am", "are", "is", "be"], a: 2,
        exp: "Con he/she/it se usa is." },
      { q: "La forma negativa de «He is» es:",
        opts: ["He amn't", "He isn't", "He aren't", "He not is"], a: 1,
        exp: "is + not = isn't." },
      { q: "¿Cómo se responde corto y afirmativo a «Are you Harry?»",
        opts: ["Yes, I'm.", "Yes, I am.", "Yes, I are.", "Yes, am I."], a: 1,
        exp: "En la respuesta corta afirmativa NO se contrae: Yes, I am." },
      { q: "El pronombre para una cosa o un animal es:",
        opts: ["he", "she", "it", "they"], a: 2,
        exp: "it se usa para objetos y animales." },
      { q: "«Buenos días» (a la mañana) se dice:",
        opts: ["Good evening", "Good night", "Good morning", "Good afternoon"], a: 2,
        exp: "Good morning = buenos días (mañana)." },
      { q: "¿Qué número es «eight»?",
        opts: ["6", "7", "8", "9"], a: 2,
        exp: "eight = 8." },
      { q: "¿Qué día es «Wednesday»?",
        opts: ["martes", "miércoles", "jueves", "viernes"], a: 1,
        exp: "Wednesday = miércoles." },
      { q: "Para preguntar el nombre se dice:",
        opts: ["How are you?", "What's your name?", "Where are you?", "Who is you?"], a: 1,
        exp: "What's your name? = ¿Cómo te llamás?" },
      { q: "«Encantado/a de conocerte» es:",
        opts: ["See you tomorrow", "Nice to meet you", "How do you spell it?", "Good evening"], a: 1,
        exp: "Nice to meet you se usa al presentarse." },
      { q: "El pronombre «I» se escribe:",
        opts: ["siempre en minúscula", "siempre con mayúscula", "solo al inicio", "con tilde"], a: 1,
        exp: "I (yo) va SIEMPRE en mayúscula." },
      { q: "Completá: «You ___ in room 321.»",
        opts: ["is", "am", "are", "be"], a: 2,
        exp: "Con you se usa are." },
    ],
    cards: [
      { q: "I am (contracción)", a: "I'm" },
      { q: "He is / She is (contracción)", a: "He's / She's" },
      { q: "¿Cómo se hace la negación de to be?", a: "Agregando not: isn't, aren't, I'm not." },
      { q: "Respuesta corta afirmativa a «Are you…?»", a: "Yes, I am. (sin contraer)" },
      { q: "¿Para qué se usa «it»?", a: "Para cosas y animales." },
      { q: "Good morning / afternoon / evening", a: "Buenos días / buenas tardes / buenas noches (al llegar)." },
      { q: "How do you spell…?", a: "¿Cómo se deletrea / escribe…?" },
      { q: "Nice to meet you", a: "Encantado/a de conocerte." },
      { q: "eight · nine · ten", a: "ocho · nueve · diez" },
      { q: "Tuesday · Thursday", a: "martes · jueves" },
      { q: "I have a reservation.", a: "Tengo una reserva." },
      { q: "What's your surname?", a: "¿Cuál es su apellido?" },
    ]
  },

  /* ===================================================================
     UNIDAD 2 — PAÍSES Y NACIONALIDADES (be plural · Wh- questions)
     =================================================================== */
  {
    id: "paises",
    icon: "globe",
    title: "Países y nacionalidades",
    desc: "Verbo be plural, preguntas con Wh-, países, nacionalidades y números 11–100.",
    tool: "vocab",
    html: `
      <p class="lead">Aprendés a preguntar de dónde es alguien, a dar y pedir datos personales y a usar el verbo <span class="en">to be</span> en plural.</p>

      <h2>Verbo <span class="en">to be</span> (plural)</h2>
      <div class="conj">
        <div class="conj__cell"><b>We are</b> = We're <span class="gloss">nosotros somos/estamos</span></div>
        <div class="conj__cell"><b>You are</b> = You're <span class="gloss">ustedes son/están</span></div>
        <div class="conj__cell"><b>They are</b> = They're <span class="gloss">ellos son/están</span></div>
      </div>
      <p>Negativo: <span class="en">We aren't / You aren't / They aren't</span>. Pregunta: <span class="en">Are we…? Are you…? Are they…?</span></p>
      <div class="dialogue">
        <p><span class="sp">A:</span> <span class="en">Are you English?</span></p>
        <p><span class="sp">B:</span> <span class="en">No, we aren't. We're American.</span></p>
      </div>

      <h2>Preguntas con palabras interrogativas (Wh- questions)</h2>
      <p>Se ponen al inicio, antes del verbo <span class="en">be</span>.</p>
      <div class="tbl-wrap">
      <table class="tbl">
        <thead><tr><th>Pregunta</th><th>Uso</th><th>Ejemplo</th></tr></thead>
        <tbody>
          <tr><td class="en">What…?</td><td>qué / cuál</td><td class="en">What's your name?</td></tr>
          <tr><td class="en">Where…?</td><td>dónde / de dónde</td><td class="en">Where are you from?</td></tr>
          <tr><td class="en">Who…?</td><td>quién</td><td class="en">Who's that?</td></tr>
          <tr><td class="en">How old…?</td><td>qué edad</td><td class="en">How old are you?</td></tr>
        </tbody>
      </table>
      </div>
      <div class="callout def"><strong class="callout__tag">Clave de turismo</strong> <span class="en">Where are you from?</span> = ¿De dónde es usted? Respuesta: <span class="en">I'm from Argentina.</span></div>

      <h2>Países y nacionalidades</h2>
      <p>La nacionalidad es un adjetivo y va con <strong>mayúscula</strong>.</p>
      <div class="tbl-wrap">
      <table class="tbl">
        <thead><tr><th>Country (país)</th><th>Nationality (nacionalidad)</th></tr></thead>
        <tbody>
          <tr><td class="en">Argentina</td><td class="en">Argentinian</td></tr>
          <tr><td class="en">Brazil</td><td class="en">Brazilian</td></tr>
          <tr><td class="en">The United States</td><td class="en">American</td></tr>
          <tr><td class="en">The United Kingdom (UK)</td><td class="en">British</td></tr>
          <tr><td class="en">England</td><td class="en">English</td></tr>
          <tr><td class="en">Spain</td><td class="en">Spanish</td></tr>
          <tr><td class="en">France</td><td class="en">French</td></tr>
          <tr><td class="en">Italy</td><td class="en">Italian</td></tr>
          <tr><td class="en">China</td><td class="en">Chinese</td></tr>
          <tr><td class="en">Japan</td><td class="en">Japanese</td></tr>
        </tbody>
      </table>
      </div>

      <h2>Números 11–100</h2>
      <div class="voc-grid">
        <div class="voc"><span class="voc__en">11 eleven</span></div>
        <div class="voc"><span class="voc__en">12 twelve</span></div>
        <div class="voc"><span class="voc__en">13 thirteen</span></div>
        <div class="voc"><span class="voc__en">14 fourteen</span></div>
        <div class="voc"><span class="voc__en">15 fifteen</span></div>
        <div class="voc"><span class="voc__en">16 sixteen</span></div>
        <div class="voc"><span class="voc__en">17 seventeen</span></div>
        <div class="voc"><span class="voc__en">18 eighteen</span></div>
        <div class="voc"><span class="voc__en">19 nineteen</span></div>
        <div class="voc"><span class="voc__en">20 twenty</span></div>
        <div class="voc"><span class="voc__en">30 thirty</span></div>
        <div class="voc"><span class="voc__en">40 forty</span></div>
        <div class="voc"><span class="voc__en">50 fifty</span></div>
        <div class="voc"><span class="voc__en">60 sixty</span></div>
        <div class="voc"><span class="voc__en">70 seventy</span></div>
        <div class="voc"><span class="voc__en">80 eighty</span></div>
        <div class="voc"><span class="voc__en">90 ninety</span></div>
        <div class="voc"><span class="voc__en">100 a hundred</span></div>
      </div>
      <div class="callout warn"><strong class="callout__tag">Atención</strong> <span class="en">13 thirteen</span> ↔ <span class="en">30 thirty</span>: la terminación <span class="en">-teen</span> es 13–19; <span class="en">-ty</span> son las decenas (20, 30…). Se distinguen por el acento: thir<u>teen</u> / <u>thir</u>ty.</div>

      <h2 id="datos2">Turismo: tomar datos de un pasajero</h2>
      <div class="phrase-list">
        <div class="phrase"><span class="phrase__en">What's your first name?</span><span class="phrase__es">¿Cuál es tu nombre?</span></div>
        <div class="phrase"><span class="phrase__en">What's your surname / last name?</span><span class="phrase__es">¿Cuál es tu apellido?</span></div>
        <div class="phrase"><span class="phrase__en">What's your phone number?</span><span class="phrase__es">¿Cuál es tu número de teléfono?</span></div>
        <div class="phrase"><span class="phrase__en">What's your email?</span><span class="phrase__es">¿Cuál es tu correo?</span></div>
        <div class="phrase"><span class="phrase__en">How old are you?</span><span class="phrase__es">¿Cuántos años tenés?</span></div>
      </div>
      <div class="callout tip"><strong class="callout__tag">Teléfono</strong> Los números se dicen de a uno: 0113 4960792 → «oh-one-one-three…». El 0 suele decirse <span class="en">oh</span>, y dos iguales seguidos, <span class="en">double</span> (22 = double two).</div>
    `,
    quiz: [
      { q: "Completá: «We ___ American.»",
        opts: ["is", "am", "are", "be"], a: 2,
        exp: "Con we/you/they se usa are." },
      { q: "La negación de «They are» es:",
        opts: ["They isn't", "They aren't", "They amn't", "They not are"], a: 1,
        exp: "are + not = aren't." },
      { q: "Para preguntar de dónde es alguien:",
        opts: ["What are you?", "Who are you?", "Where are you from?", "How are you?"], a: 2,
        exp: "Where are you from? = ¿De dónde sos?" },
      { q: "La nacionalidad de «Japan» es:",
        opts: ["Japanish", "Japanese", "Japanian", "Japan"], a: 1,
        exp: "Japan → Japanese." },
      { q: "La nacionalidad de «Spain» es:",
        opts: ["Spanish", "Spainish", "Spainese", "Espanish"], a: 0,
        exp: "Spain → Spanish." },
      { q: "¿Qué número es «fifteen»?",
        opts: ["50", "14", "15", "5"], a: 2,
        exp: "fifteen = 15." },
      { q: "¿Qué número es «thirty»?",
        opts: ["13", "30", "3", "33"], a: 1,
        exp: "thirty = 30 (la terminación -ty es decenas)." },
      { q: "«How old are you?» pregunta por:",
        opts: ["el nombre", "el país", "la edad", "el teléfono"], a: 2,
        exp: "How old…? = ¿qué edad…?" },
      { q: "Para preguntar el apellido:",
        opts: ["What's your first name?", "What's your surname?", "Where are you from?", "How old are you?"], a: 1,
        exp: "surname / last name = apellido." },
      { q: "El número de teléfono en inglés se dice…",
        opts: ["en miles", "dígito por dígito", "de a dos", "al revés"], a: 1,
        exp: "Se leen los dígitos uno por uno; 0 = oh." },
      { q: "La nacionalidad de «The United States» es:",
        opts: ["United", "States", "American", "USAan"], a: 2,
        exp: "The United States → American." },
      { q: "¿Cuál es la respuesta a «Are you English?» si sos de EE. UU.?",
        opts: ["Yes, I am.", "No, I'm not. I'm American.", "No, I aren't English.", "Yes, we are."], a: 1,
        exp: "Se niega y se corrige la nacionalidad." },
    ],
    cards: [
      { q: "We are / They are (contracción)", a: "We're / They're" },
      { q: "Where are you from?", a: "¿De dónde sos? → I'm from…" },
      { q: "Country vs Nationality", a: "Japan → Japanese; Spain → Spanish; Italy → Italian." },
      { q: "13 vs 30", a: "thirteen (-teen) vs thirty (-ty)." },
      { q: "What's your surname?", a: "¿Cuál es tu apellido?" },
      { q: "How old are you?", a: "¿Cuántos años tenés?" },
      { q: "twenty · forty · ninety", a: "20 · 40 · 90 (ojo: forty sin u)." },
      { q: "Nacionalidad de The UK", a: "British." },
      { q: "Negación de be en plural", a: "aren't (we/you/they aren't)." },
      { q: "Teléfono: 0 y números repetidos", a: "0 = oh; 22 = double two." },
    ]
  },

  /* ===================================================================
     UNIDAD 3 — OBJETOS Y PRECIOS (a/an · plurales · this/that)
     =================================================================== */
  {
    id: "objetos",
    icon: "bag",
    title: "Objetos, compras y precios",
    desc: "a/an, plurales, this/that/these/those, colores, precios y pedir comida.",
    tool: "phrases",
    html: `
      <p class="lead">Vocabulario de objetos y souvenirs, cómo señalar cosas, decir precios y pedir comida y bebida.</p>

      <h2>Artículo indefinido: <span class="en">a / an</span></h2>
      <p>Significa «un / una» y se usa con sustantivos contables en singular.</p>
      <ul>
        <li><span class="en">a</span> + sonido de consonante: <span class="en">a bag, a hat, a key</span></li>
        <li><span class="en">an</span> + sonido de vocal: <span class="en">an umbrella, an apple, an orange juice</span></li>
      </ul>
      <div class="callout tip"><strong class="callout__tag">Truco</strong> Lo que importa es el <em>sonido</em>, no la letra: <span class="en">an hour</span> (la h es muda) pero <span class="en">a university</span> (suena «iu»).</div>

      <h2>Plural de los sustantivos</h2>
      <div class="tbl-wrap">
      <table class="tbl">
        <thead><tr><th>Regla</th><th>Ejemplo</th></tr></thead>
        <tbody>
          <tr><td>+ s (general)</td><td class="en">bag → bags, key → keys</td></tr>
          <tr><td>+ es (s, ss, sh, ch, x)</td><td class="en">watch → watches, glass → glasses</td></tr>
          <tr><td>consonante + y → -ies</td><td class="en">city → cities, country → countries</td></tr>
          <tr><td>irregulares</td><td class="en">man → men, woman → women, child → children, person → people</td></tr>
        </tbody>
      </table>
      </div>

      <h2>Demostrativos: <span class="en">this / that / these / those</span></h2>
      <div class="tbl-wrap">
      <table class="tbl">
        <thead><tr><th></th><th>Cerca (here)</th><th>Lejos (there)</th></tr></thead>
        <tbody>
          <tr><td>Singular</td><td class="en">this <span class="gloss">este/a</span></td><td class="en">that <span class="gloss">ese/a, aquel</span></td></tr>
          <tr><td>Plural</td><td class="en">these <span class="gloss">estos/as</span></td><td class="en">those <span class="gloss">esos/as</span></td></tr>
        </tbody>
      </table>
      </div>
      <div class="dialogue">
        <p><span class="en">What's this?</span> — <span class="en">It's a hat.</span></p>
        <p><span class="en">What are those?</span> — <span class="en">They're key rings.</span></p>
        <p><span class="en">Is that a hat?</span> — <span class="en">Yes, it is.</span></p>
      </div>

      <h2>Souvenirs y objetos</h2>
      <div class="voc-grid">
        <div class="voc"><span class="voc__en">a bag</span><span class="voc__es">una bolsa</span></div>
        <div class="voc"><span class="voc__en">a hat</span><span class="voc__es">un sombrero</span></div>
        <div class="voc"><span class="voc__en">a key ring</span><span class="voc__es">un llavero</span></div>
        <div class="voc"><span class="voc__en">a postcard</span><span class="voc__es">una postal</span></div>
        <div class="voc"><span class="voc__en">a T-shirt</span><span class="voc__es">una remera</span></div>
        <div class="voc"><span class="voc__en">a map</span><span class="voc__es">un mapa</span></div>
        <div class="voc"><span class="voc__en">an umbrella</span><span class="voc__es">un paraguas</span></div>
        <div class="voc"><span class="voc__en">a mug</span><span class="voc__es">una taza</span></div>
      </div>

      <h2>Colores (Colours)</h2>
      <div class="voc-grid">
        <div class="voc"><span class="voc__en">red</span><span class="voc__es">rojo</span></div>
        <div class="voc"><span class="voc__en">blue</span><span class="voc__es">azul</span></div>
        <div class="voc"><span class="voc__en">green</span><span class="voc__es">verde</span></div>
        <div class="voc"><span class="voc__en">yellow</span><span class="voc__es">amarillo</span></div>
        <div class="voc"><span class="voc__en">black</span><span class="voc__es">negro</span></div>
        <div class="voc"><span class="voc__en">white</span><span class="voc__es">blanco</span></div>
      </div>

      <h2 id="precios3">Precios (Prices)</h2>
      <p>Las monedas: <span class="en">£ pound(s)</span> (libra), <span class="en">€ euro(s)</span>, <span class="en">$ dollar(s)</span>; los centavos son <span class="en">pence / cents</span>.</p>
      <div class="phrase-list">
        <div class="phrase"><span class="phrase__en">How much is it?</span><span class="phrase__es">¿Cuánto cuesta? (singular)</span></div>
        <div class="phrase"><span class="phrase__en">How much are they?</span><span class="phrase__es">¿Cuánto cuestan?</span></div>
        <div class="phrase"><span class="phrase__en">It's £12.75</span><span class="phrase__es">twelve pounds seventy-five</span></div>
        <div class="phrase"><span class="phrase__en">That's expensive! / It's cheap.</span><span class="phrase__es">¡Es caro! / Es barato.</span></div>
      </div>

      <h2 id="restaurante3">Turismo: pedir comida y bebida</h2>
      <div class="dialogue">
        <p><span class="sp">Waiter:</span> <span class="en">Can I help you?</span></p>
        <p><span class="sp">You:</span> <span class="en">Can I have a chicken sandwich and an orange juice, please?</span></p>
        <p><span class="sp">Waiter:</span> <span class="en">Sure. Anything else?</span></p>
        <p><span class="sp">You:</span> <span class="en">No, thanks. How much is it?</span></p>
      </div>
      <div class="callout def"><strong class="callout__tag">Pedir</strong> La fórmula clave es <span class="en">Can I have…, please?</span> = ¿Me da…, por favor?</div>
    `,
    quiz: [
      { q: "¿«a» o «an»? ___ umbrella",
        opts: ["a", "an", "the", "—"], a: 1,
        exp: "umbrella empieza con sonido vocálico → an." },
      { q: "¿«a» o «an»? ___ hotel",
        opts: ["a", "an", "the", "—"], a: 0,
        exp: "hotel empieza con sonido consonántico /h/ → a." },
      { q: "El plural de «watch» es:",
        opts: ["watchs", "watches", "watchies", "watch"], a: 1,
        exp: "Termina en -ch, se agrega -es." },
      { q: "El plural de «city» es:",
        opts: ["citys", "cityes", "cities", "cityies"], a: 2,
        exp: "consonante + y → -ies." },
      { q: "El plural irregular de «person» es:",
        opts: ["persons", "people", "peoples", "persones"], a: 1,
        exp: "person → people." },
      { q: "Para señalar UN objeto que está LEJOS:",
        opts: ["this", "these", "that", "those"], a: 2,
        exp: "that = ese/aquel (singular, lejos)." },
      { q: "«What are these?» se responde:",
        opts: ["It's a hat.", "They're key rings.", "This is a bag.", "That's a map."], a: 1,
        exp: "these es plural → They're…" },
      { q: "¿Cómo se pide algo en un bar?",
        opts: ["How are you?", "Can I have a coffee, please?", "Where is the coffee?", "What's a coffee?"], a: 1,
        exp: "Can I have…, please? = ¿Me da…?" },
      { q: "«How much is it?» pregunta por:",
        opts: ["la cantidad", "el precio", "el color", "el día"], a: 1,
        exp: "How much…? pregunta el precio." },
      { q: "Para preguntar el precio de VARIAS cosas:",
        opts: ["How much is it?", "How much are they?", "How many is it?", "What is they?"], a: 1,
        exp: "Plural → How much are they?" },
      { q: "El plural de «child» es:",
        opts: ["childs", "childes", "children", "childrens"], a: 2,
        exp: "child → children (irregular)." },
      { q: "Los centavos de la libra se llaman:",
        opts: ["cents", "pence", "coins", "pounds"], a: 1,
        exp: "£ → pence; $/€ → cents." },
    ],
    cards: [
      { q: "¿Cuándo se usa «an»?", a: "Antes de sonido vocálico: an apple, an hour." },
      { q: "Plural tras s, ss, sh, ch, x", a: "Se agrega -es: glasses, watches, boxes." },
      { q: "Plural de consonante + y", a: "-ies: city → cities, country → countries." },
      { q: "Plurales irregulares clave", a: "man→men, woman→women, child→children, person→people." },
      { q: "this / that / these / those", a: "este / ese / estos / esos." },
      { q: "What's this? — respuesta", a: "It's a + (objeto). Ej.: It's a hat." },
      { q: "Can I have…, please?", a: "¿Me da…, por favor? (pedir en bar/restaurante)" },
      { q: "How much is it? / are they?", a: "¿Cuánto cuesta / cuestan?" },
      { q: "£ · € · $", a: "pound · euro · dollar (centavos: pence/cents)." },
      { q: "expensive / cheap", a: "caro / barato." },
    ]
  },

  /* ===================================================================
     UNIDAD 4 — FAMILIA Y DESCRIPCIONES (possessives · adjectives)
     =================================================================== */
  {
    id: "familia",
    icon: "family",
    title: "Familia y descripciones",
    desc: "Adjetivos posesivos, el genitivo 's, adjetivos y vocabulario de familia.",
    tool: "verbs",
    html: `
      <p class="lead">Hablás de tu familia, de a quién pertenece algo y describís personas y objetos con adjetivos.</p>

      <h2>Adjetivos posesivos (Possessive adjectives)</h2>
      <p>Indican de quién es algo y van <strong>antes</strong> del sustantivo. No cambian en plural.</p>
      <div class="tbl-wrap">
      <table class="tbl">
        <thead><tr><th>Pronombre</th><th>Posesivo</th><th>Ejemplo</th></tr></thead>
        <tbody>
          <tr><td class="en">I</td><td class="en">my</td><td class="en">my husband</td></tr>
          <tr><td class="en">you</td><td class="en">your</td><td class="en">your name</td></tr>
          <tr><td class="en">he</td><td class="en">his</td><td class="en">his sister</td></tr>
          <tr><td class="en">she</td><td class="en">her</td><td class="en">her brother</td></tr>
          <tr><td class="en">it</td><td class="en">its</td><td class="en">its colour</td></tr>
          <tr><td class="en">we</td><td class="en">our</td><td class="en">our house</td></tr>
          <tr><td class="en">they</td><td class="en">their</td><td class="en">their children</td></tr>
        </tbody>
      </table>
      </div>
      <div class="callout warn"><strong class="callout__tag">No confundir</strong> <span class="en">its</span> (posesivo: «su») ≠ <span class="en">it's</span> (it is). · <span class="en">their</span> (su, de ellos) ≠ <span class="en">they're</span> (they are) ≠ <span class="en">there</span> (ahí).</div>

      <h2>El genitivo sajón: <span class="en">'s</span></h2>
      <p>Para decir «de» con personas se usa <span class="en">'s</span>: el poseedor va primero.</p>
      <div class="formula-box"><span class="en">Maria's son</span> <span class="gloss">el hijo de María</span> · <span class="en">my sister's husband</span> <span class="gloss">el marido de mi hermana</span></div>

      <h2>Vocabulario de familia (Family)</h2>
      <div class="voc-grid">
        <div class="voc"><span class="voc__en">mother / mum</span><span class="voc__es">madre / mamá</span></div>
        <div class="voc"><span class="voc__en">father / dad</span><span class="voc__es">padre / papá</span></div>
        <div class="voc"><span class="voc__en">husband</span><span class="voc__es">esposo</span></div>
        <div class="voc"><span class="voc__en">wife</span><span class="voc__es">esposa</span></div>
        <div class="voc"><span class="voc__en">son</span><span class="voc__es">hijo</span></div>
        <div class="voc"><span class="voc__en">daughter</span><span class="voc__es">hija</span></div>
        <div class="voc"><span class="voc__en">brother</span><span class="voc__es">hermano</span></div>
        <div class="voc"><span class="voc__en">sister</span><span class="voc__es">hermana</span></div>
        <div class="voc"><span class="voc__en">parents</span><span class="voc__es">padres</span></div>
        <div class="voc"><span class="voc__en">children</span><span class="voc__es">hijos</span></div>
        <div class="voc"><span class="voc__en">grandmother</span><span class="voc__es">abuela</span></div>
        <div class="voc"><span class="voc__en">grandfather</span><span class="voc__es">abuelo</span></div>
      </div>

      <h2>Adjetivos (Adjectives)</h2>
      <p>Describen al sustantivo. En inglés:</p>
      <ul>
        <li>Van <strong>antes</strong> del sustantivo: <span class="en">a big car</span> (no «a car big»).</li>
        <li>O <strong>después</strong> del verbo <span class="en">be</span>: <span class="en">The car is big.</span></li>
        <li><strong>No tienen plural</strong>: <span class="en">red cars</span> (no «reds cars»).</li>
        <li>El orden típico: opinión + tamaño + color: <span class="en">a beautiful small red car.</span></li>
      </ul>
      <div class="voc-grid">
        <div class="voc"><span class="voc__en">big / small</span><span class="voc__es">grande / pequeño</span></div>
        <div class="voc"><span class="voc__en">new / old</span><span class="voc__es">nuevo / viejo</span></div>
        <div class="voc"><span class="voc__en">good / bad</span><span class="voc__es">bueno / malo</span></div>
        <div class="voc"><span class="voc__en">expensive / cheap</span><span class="voc__es">caro / barato</span></div>
        <div class="voc"><span class="voc__en">fast / slow</span><span class="voc__es">rápido / lento</span></div>
        <div class="voc"><span class="voc__en">beautiful</span><span class="voc__es">hermoso</span></div>
      </div>
      <div class="dialogue">
        <p><span class="en">My car is a Peugeot 207. It's French. It's new and it's small.</span></p>
        <p><span class="gloss">Mi auto es un Peugeot 207. Es francés. Es nuevo y pequeño.</span></p>
      </div>
    `,
    quiz: [
      { q: "Completá: «This is ___ husband.» (de ella)",
        opts: ["his", "her", "your", "their"], a: 1,
        exp: "de ella → her." },
      { q: "El posesivo de «they» es:",
        opts: ["them", "theirs", "their", "they're"], a: 2,
        exp: "they → their." },
      { q: "«El hijo de María» en inglés:",
        opts: ["the son of Maria", "Maria son", "Maria's son", "son's Maria"], a: 2,
        exp: "Genitivo sajón: poseedor + 's." },
      { q: "¿Cuál es correcto?",
        opts: ["a car red", "a red car", "a reds car", "red a car"], a: 1,
        exp: "El adjetivo va antes del sustantivo y sin plural." },
      { q: "«Its» (con s, sin apóstrofo) significa:",
        opts: ["it is", "su (posesivo)", "esto", "ahí"], a: 1,
        exp: "its = posesivo de it; it's = it is." },
      { q: "El plural de «red car» es:",
        opts: ["reds cars", "red cars", "red car", "reds car"], a: 1,
        exp: "Los adjetivos no tienen plural en inglés." },
      { q: "«Daughter» significa:",
        opts: ["hermana", "hija", "madre", "esposa"], a: 1,
        exp: "daughter = hija." },
      { q: "«Wife» significa:",
        opts: ["esposa", "esposo", "hermana", "abuela"], a: 0,
        exp: "wife = esposa; husband = esposo." },
      { q: "El posesivo de «we» es:",
        opts: ["us", "our", "ours", "we're"], a: 1,
        exp: "we → our." },
      { q: "Elegí la oración correcta:",
        opts: ["The car is big.", "The car big is.", "Is the car big it.", "The big is car."], a: 0,
        exp: "Tras be: sujeto + be + adjetivo." },
      { q: "«Their» NO debe confundirse con:",
        opts: ["there / they're", "his", "her", "our"], a: 0,
        exp: "their (posesivo) ≠ there (ahí) ≠ they're (they are)." },
      { q: "«Grandfather» es:",
        opts: ["abuelo", "padre", "hermano", "abuela"], a: 0,
        exp: "grandfather = abuelo." },
    ],
    cards: [
      { q: "my · your · his · her", a: "mi · tu · su (de él) · su (de ella)" },
      { q: "our · their · its", a: "nuestro · su (de ellos) · su (de una cosa)" },
      { q: "Genitivo sajón 's", a: "posesión con personas: Anna's bag = la bolsa de Anna." },
      { q: "Posición del adjetivo", a: "antes del sustantivo (a big car) o tras be (it is big)." },
      { q: "¿Los adjetivos llevan plural?", a: "No: red cars, no «reds cars»." },
      { q: "its vs it's", a: "its = posesivo (su); it's = it is." },
      { q: "their / there / they're", a: "posesivo / lugar / they are." },
      { q: "husband · wife", a: "esposo · esposa" },
      { q: "son · daughter · children", a: "hijo · hija · hijos" },
      { q: "Orden de adjetivos", a: "opinión + tamaño + color: a beautiful small red car." },
    ]
  },

  /* ===================================================================
     UNIDAD 5 — PRESENT SIMPLE: COMIDA Y VIAJES + LA HORA
     =================================================================== */
  {
    id: "presente",
    icon: "coffee",
    title: "Rutinas, comida y la hora",
    desc: "Present simple (I/you/we/they), comida y bebida, viajes y decir la hora.",
    tool: "numbers",
    html: `
      <p class="lead">El <strong>present simple</strong> sirve para hablar de hábitos y rutinas: lo que hacés siempre. Lo aplicás a la comida, los viajes y la hora.</p>

      <h2>Present simple — afirmativo (I / you / we / they)</h2>
      <p>Se usa el verbo en su forma base, igual para todos estos sujetos.</p>
      <div class="formula-box"><span class="en">I have breakfast at home.</span> <span class="gloss">Desayuno en casa.</span><br><span class="en">They live in London.</span> <span class="gloss">Ellos viven en Londres.</span></div>

      <h2>Present simple — negativo: <span class="en">don't</span></h2>
      <p>Se forma con el auxiliar <span class="en">don't</span> (= do not) + verbo base.</p>
      <div class="conj">
        <div class="conj__cell"><b>I don't drink</b> coffee. <span class="gloss">No tomo café.</span></div>
        <div class="conj__cell"><b>We don't live</b> here. <span class="gloss">No vivimos acá.</span></div>
        <div class="conj__cell"><b>They don't like</b> tea. <span class="gloss">No les gusta el té.</span></div>
      </div>
      <div class="callout tip"><strong class="callout__tag">Preguntas</strong> Con <span class="en">do</span>: <span class="en">Do you like coffee?</span> — <span class="en">Yes, I do. / No, I don't.</span></div>

      <h2>Comida y bebida (Food and drink)</h2>
      <div class="voc-grid">
        <div class="voc"><span class="voc__en">bread</span><span class="voc__es">pan</span></div>
        <div class="voc"><span class="voc__en">cheese</span><span class="voc__es">queso</span></div>
        <div class="voc"><span class="voc__en">eggs</span><span class="voc__es">huevos</span></div>
        <div class="voc"><span class="voc__en">fruit</span><span class="voc__es">fruta</span></div>
        <div class="voc"><span class="voc__en">meat / fish</span><span class="voc__es">carne / pescado</span></div>
        <div class="voc"><span class="voc__en">coffee / tea</span><span class="voc__es">café / té</span></div>
        <div class="voc"><span class="voc__en">milk / water</span><span class="voc__es">leche / agua</span></div>
        <div class="voc"><span class="voc__en">orange juice</span><span class="voc__es">jugo de naranja</span></div>
      </div>

      <h2>Frases verbales de viaje y rutina</h2>
      <div class="voc-grid">
        <div class="voc"><span class="voc__en">have breakfast</span><span class="voc__es">desayunar</span></div>
        <div class="voc"><span class="voc__en">go to work</span><span class="voc__es">ir al trabajo</span></div>
        <div class="voc"><span class="voc__en">go home</span><span class="voc__es">ir a casa</span></div>
        <div class="voc"><span class="voc__en">like the book</span><span class="voc__es">gustar el libro</span></div>
        <div class="voc"><span class="voc__en">live in…</span><span class="voc__es">vivir en…</span></div>
        <div class="voc"><span class="voc__en">work for…</span><span class="voc__es">trabajar para…</span></div>
      </div>

      <h2 id="hora5">Decir la hora (Telling the time)</h2>
      <p>Se pregunta: <span class="en">What time is it?</span> = ¿Qué hora es?</p>
      <div class="tbl-wrap">
      <table class="tbl">
        <thead><tr><th>Hora</th><th>Inglés</th></tr></thead>
        <tbody>
          <tr><td>3:00</td><td class="en">It's three o'clock.</td></tr>
          <tr><td>3:15</td><td class="en">It's quarter past three.</td></tr>
          <tr><td>3:30</td><td class="en">It's half past three.</td></tr>
          <tr><td>3:45</td><td class="en">It's quarter to four.</td></tr>
          <tr><td>3:20</td><td class="en">It's twenty past three.</td></tr>
          <tr><td>3:50</td><td class="en">It's ten to four.</td></tr>
        </tbody>
      </table>
      </div>
      <div class="callout def"><strong class="callout__tag">Regla</strong> <span class="en">past</span> = «y» (pasada/s) hasta y media; <span class="en">to</span> = «menos» (para la próxima hora) después de la media. También se puede decir simple: 7:20 = <span class="en">seven twenty</span>.</div>

      <h2 id="vuelo5">Turismo: a bordo de un vuelo</h2>
      <div class="dialogue">
        <p><span class="sp">Attendant:</span> <span class="en">Would you like fish, meat or pasta?</span></p>
        <p><span class="sp">Passenger:</span> <span class="en">Pasta for me, please.</span></p>
        <p><span class="sp">Attendant:</span> <span class="en">Do you want a drink?</span></p>
        <p><span class="sp">Passenger:</span> <span class="en">Yes, can I have a water, please?</span></p>
      </div>
    `,
    quiz: [
      { q: "Completá: «I ___ breakfast at home.»",
        opts: ["has", "have", "haves", "having"], a: 1,
        exp: "Con I se usa la forma base: have." },
      { q: "La negación de «They like tea» es:",
        opts: ["They don't like tea", "They doesn't like tea", "They not like tea", "They aren't like tea"], a: 0,
        exp: "I/you/we/they → don't + base." },
      { q: "Pregunta correcta:",
        opts: ["You like coffee?", "Do you like coffee?", "Are you like coffee?", "Like you coffee?"], a: 1,
        exp: "Auxiliar do al inicio: Do you like…?" },
      { q: "Respuesta corta a «Do you live here?»",
        opts: ["Yes, I like.", "Yes, I do.", "Yes, I am.", "Yes, I live."], a: 1,
        exp: "Se responde con el auxiliar: Yes, I do." },
      { q: "«Orange juice» es:",
        opts: ["jugo de naranja", "leche", "té", "agua"], a: 0,
        exp: "orange juice = jugo de naranja." },
      { q: "Las 3:30 se dicen:",
        opts: ["quarter past three", "half past three", "three o'clock", "half to three"], a: 1,
        exp: "half past three = tres y media." },
      { q: "Las 3:45 se dicen:",
        opts: ["quarter past four", "quarter to four", "quarter past three", "three forty"], a: 1,
        exp: "Tras la media se usa to: quarter to four." },
      { q: "«What time is it?» significa:",
        opts: ["¿Qué hora es?", "¿Cuántas veces?", "¿A qué hora?", "¿Qué tiempo hace?"], a: 0,
        exp: "What time is it? = ¿Qué hora es?" },
      { q: "«Would you like…?» se usa para:",
        opts: ["ordenar", "ofrecer algo amablemente", "negar", "saludar"], a: 1,
        exp: "Would you like…? = ¿Querría…? (oferta amable)." },
      { q: "«go to work» significa:",
        opts: ["estar en casa", "ir al trabajo", "desayunar", "trabajar para"], a: 1,
        exp: "go to work = ir al trabajo." },
      { q: "Las 3:00 en punto:",
        opts: ["three past", "three to", "three o'clock", "half three"], a: 2,
        exp: "o'clock = en punto." },
      { q: "«have breakfast» significa:",
        opts: ["tener desayuno listo", "desayunar", "comprar pan", "cocinar"], a: 1,
        exp: "have breakfast = desayunar." },
    ],
    cards: [
      { q: "Present simple afirmativo (I/you/we/they)", a: "verbo en forma base: I live, they have." },
      { q: "Present simple negativo", a: "don't + base: I don't like, they don't live." },
      { q: "Pregunta en present simple", a: "Do + sujeto + base: Do you like…?" },
      { q: "Respuestas cortas con do", a: "Yes, I do. / No, I don't." },
      { q: "What time is it?", a: "¿Qué hora es?" },
      { q: "past vs to", a: "past = y (hasta y media); to = menos (tras la media)." },
      { q: "quarter / half past", a: "y cuarto / y media." },
      { q: "Would you like…?", a: "¿Querría…? (ofrecer comida/bebida)." },
      { q: "have breakfast · go to work", a: "desayunar · ir al trabajo." },
      { q: "coffee · tea · water · milk", a: "café · té · agua · leche." },
    ]
  },

  /* ===================================================================
     UNIDAD 6 — TRABAJOS Y RUTINA (present simple 3rd person · adverbs)
     =================================================================== */
  {
    id: "trabajos",
    icon: "work",
    title: "Trabajos y rutina diaria",
    desc: "Present simple con he/she/it (-s), adverbios de frecuencia y profesiones.",
    tool: "verbs",
    html: `
      <p class="lead">Hablás de lo que hacen otras personas (he/she/it) y con qué frecuencia: la base del relato de una rutina.</p>

      <h2>Present simple — tercera persona (he / she / it)</h2>
      <p>Con <span class="en">he, she, it</span> el verbo lleva <strong>-s</strong>.</p>
      <div class="tbl-wrap">
      <table class="tbl">
        <thead><tr><th>Regla</th><th>Ejemplo</th></tr></thead>
        <tbody>
          <tr><td>+ s (general)</td><td class="en">work → works, live → lives</td></tr>
          <tr><td>+ es (o, s, sh, ch, x)</td><td class="en">go → goes, watch → watches, finish → finishes</td></tr>
          <tr><td>consonante + y → -ies</td><td class="en">study → studies</td></tr>
          <tr><td>irregular</td><td class="en">have → has</td></tr>
        </tbody>
      </table>
      </div>
      <div class="dialogue"><p><span class="en">She works for Armani. He lives in New York. She has a good job.</span></p></div>

      <h3>Negativo y preguntas con <span class="en">doesn't / does</span></h3>
      <p>En tercera persona el auxiliar es <span class="en">does</span>. ¡Y el verbo vuelve a la forma base!</p>
      <div class="conj">
        <div class="conj__cell"><b>He doesn't work</b> here. <span class="gloss">No trabaja acá.</span></div>
        <div class="conj__cell"><b>Does she like</b> it? <span class="gloss">¿Le gusta?</span></div>
        <div class="conj__cell"><b>Yes, he does. / No, she doesn't.</b></div>
      </div>
      <div class="callout warn"><strong class="callout__tag">Error típico</strong> Con doesn't / does el verbo NO lleva -s: «He doesn't <s>works</s>» → <span class="en">He doesn't work.</span></div>

      <h2>Adverbios de frecuencia (Adverbs of frequency)</h2>
      <div class="formula-box"><span class="en">always</span> (100%) · <span class="en">usually</span> · <span class="en">often</span> · <span class="en">sometimes</span> · <span class="en">never</span> (0%)</div>
      <p>Van <strong>antes</strong> del verbo principal, pero <strong>después</strong> del verbo <span class="en">be</span>.</p>
      <ul>
        <li><span class="en">I always get up at 8.00.</span> <span class="gloss">(antes del verbo)</span></li>
        <li><span class="en">She is never late.</span> <span class="gloss">(después de be)</span></li>
        <li><span class="en">We sometimes watch TV.</span></li>
      </ul>

      <h2>Trabajos y lugares (Jobs and places of work)</h2>
      <div class="voc-grid">
        <div class="voc"><span class="voc__en">a waiter / waitress</span><span class="voc__es">mozo / moza</span></div>
        <div class="voc"><span class="voc__en">a receptionist</span><span class="voc__es">recepcionista</span></div>
        <div class="voc"><span class="voc__en">a tour guide</span><span class="voc__es">guía de turismo</span></div>
        <div class="voc"><span class="voc__en">a journalist</span><span class="voc__es">periodista</span></div>
        <div class="voc"><span class="voc__en">a doctor / nurse</span><span class="voc__es">médico / enfermero</span></div>
        <div class="voc"><span class="voc__en">a shop assistant</span><span class="voc__es">vendedor/a</span></div>
        <div class="voc"><span class="voc__en">in a hotel</span><span class="voc__es">en un hotel</span></div>
        <div class="voc"><span class="voc__en">in a restaurant</span><span class="voc__es">en un restaurante</span></div>
      </div>
      <div class="dialogue">
        <p><span class="sp">A:</span> <span class="en">What do you do?</span> <span class="gloss">¿A qué te dedicás?</span></p>
        <p><span class="sp">B:</span> <span class="en">I'm a tour guide. I work for a travel agency.</span></p>
        <p><span class="sp">A:</span> <span class="en">Where do you work?</span> — <span class="en">In Salta.</span></p>
      </div>

      <h2>Un día típico (A typical day)</h2>
      <div class="voc-grid">
        <div class="voc"><span class="voc__en">get up</span><span class="voc__es">levantarse</span></div>
        <div class="voc"><span class="voc__en">have a shower</span><span class="voc__es">ducharse</span></div>
        <div class="voc"><span class="voc__en">start work</span><span class="voc__es">empezar a trabajar</span></div>
        <div class="voc"><span class="voc__en">have lunch</span><span class="voc__es">almorzar</span></div>
        <div class="voc"><span class="voc__en">finish work</span><span class="voc__es">terminar el trabajo</span></div>
        <div class="voc"><span class="voc__en">go to bed</span><span class="voc__es">irse a dormir</span></div>
      </div>
    `,
    quiz: [
      { q: "Completá: «He ___ in New York.»",
        opts: ["live", "lives", "living", "lifes"], a: 1,
        exp: "Con he/she/it se agrega -s: lives." },
      { q: "La tercera persona de «go» es:",
        opts: ["gos", "goes", "goies", "goer"], a: 1,
        exp: "go → goes (+es)." },
      { q: "La tercera persona de «study» es:",
        opts: ["studys", "studyes", "studies", "study"], a: 2,
        exp: "consonante + y → -ies." },
      { q: "La tercera persona de «have» es:",
        opts: ["haves", "has", "haves", "hasse"], a: 1,
        exp: "have → has (irregular)." },
      { q: "Negativo correcto:",
        opts: ["He doesn't works here.", "He don't work here.", "He doesn't work here.", "He not work here."], a: 2,
        exp: "doesn't + base, sin -s." },
      { q: "Pregunta correcta con she:",
        opts: ["Do she like it?", "Does she likes it?", "Does she like it?", "She does like it?"], a: 2,
        exp: "Does + sujeto + base." },
      { q: "¿Dónde va «always» con un verbo normal?",
        opts: ["antes del verbo", "después del verbo", "al final", "al inicio"], a: 0,
        exp: "Los adverbios de frecuencia van antes del verbo principal." },
      { q: "¿Dónde va «never» con el verbo be?",
        opts: ["antes de be", "después de be", "al final", "no se puede"], a: 1,
        exp: "Tras be: She is never late." },
      { q: "«What do you do?» pregunta:",
        opts: ["qué estás haciendo", "a qué te dedicás", "qué te gusta", "dónde vivís"], a: 1,
        exp: "What do you do? = ¿Cuál es tu trabajo?" },
      { q: "«a waitress» es:",
        opts: ["recepcionista", "moza", "guía", "vendedora"], a: 1,
        exp: "waiter/waitress = mozo/moza." },
      { q: "Respuesta corta a «Does he work here?»",
        opts: ["Yes, he do.", "Yes, he does.", "Yes, he works.", "Yes, he is."], a: 1,
        exp: "Con does: Yes, he does." },
      { q: "«get up» significa:",
        opts: ["acostarse", "levantarse", "ducharse", "almorzar"], a: 1,
        exp: "get up = levantarse." },
    ],
    cards: [
      { q: "Present simple 3ª persona", a: "verbo + -s: he works, she lives." },
      { q: "Verbos en -o, -ch, -sh, -x", a: "+ es: goes, watches, finishes." },
      { q: "have en 3ª persona", a: "has." },
      { q: "Negativo/pregunta con he/she/it", a: "doesn't / does + verbo BASE (sin -s)." },
      { q: "Adverbios de frecuencia", a: "always, usually, often, sometimes, never." },
      { q: "Posición de los adverbios de frecuencia", a: "antes del verbo principal, después de be." },
      { q: "What do you do?", a: "¿A qué te dedicás?" },
      { q: "waiter · receptionist · tour guide", a: "mozo · recepcionista · guía de turismo." },
      { q: "get up · have lunch · go to bed", a: "levantarse · almorzar · irse a dormir." },
      { q: "Does she like it? — respuesta corta", a: "Yes, she does. / No, she doesn't." },
    ]
  },

  /* ===================================================================
     UNIDAD 7 — TIEMPO LIBRE, PREGUNTAS, IMPERATIVOS Y FECHAS
     =================================================================== */
  {
    id: "tiempolibre",
    icon: "ticket",
    title: "Tiempo libre, preguntas y fechas",
    desc: "Orden de la pregunta, imperativos, pronombres objeto, meses y fechas.",
    tool: "numbers",
    html: `
      <p class="lead">Aprendés a armar preguntas correctamente, a dar instrucciones y a decir la fecha; todo con vocabulario de tiempo libre.</p>

      <h2>El orden de la pregunta (Word order)</h2>
      <p>La estructura típica de pregunta en present simple es:</p>
      <div class="formula-box"><span class="en">(Wh-) + do/does + sujeto + verbo + …?</span></div>
      <ul>
        <li><span class="en">What sports do you do?</span> <span class="gloss">¿Qué deportes practicás?</span></li>
        <li><span class="en">Where does he live?</span></li>
        <li><span class="en">Do you like football?</span></li>
      </ul>
      <div class="callout tip"><strong class="callout__tag">Regla ASI</strong> Auxiliar + Sujeto + Infinitivo. La palabra interrogativa (what, where…) va primero.</div>

      <h2>Imperativos (Imperatives)</h2>
      <p>Dan órdenes, instrucciones o consejos. Se usa el verbo base, sin sujeto.</p>
      <div class="conj">
        <div class="conj__cell"><b>Open</b> the door. <span class="gloss">Abre la puerta.</span></div>
        <div class="conj__cell"><b>Sit down,</b> please. <span class="gloss">Siéntese.</span></div>
        <div class="conj__cell"><b>Don't talk!</b> <span class="gloss">¡No hables!</span></div>
      </div>

      <h2>Pronombres objeto (Object pronouns)</h2>
      <p>Reemplazan al objeto del verbo (van después del verbo o preposición).</p>
      <div class="tbl-wrap">
      <table class="tbl">
        <thead><tr><th>Sujeto</th><th>Objeto</th><th>Sujeto</th><th>Objeto</th></tr></thead>
        <tbody>
          <tr><td class="en">I</td><td class="en">me</td><td class="en">we</td><td class="en">us</td></tr>
          <tr><td class="en">you</td><td class="en">you</td><td class="en">you</td><td class="en">you</td></tr>
          <tr><td class="en">he</td><td class="en">him</td><td class="en">they</td><td class="en">them</td></tr>
          <tr><td class="en">she</td><td class="en">her</td><td class="en">it</td><td class="en">it</td></tr>
        </tbody>
      </table>
      </div>
      <div class="dialogue"><p><span class="en">I love Scarlett. I love her.</span> · <span class="en">Listen to me.</span> · <span class="en">Help us, please.</span></p></div>

      <h2>Tiempo libre (Free time)</h2>
      <div class="voc-grid">
        <div class="voc"><span class="voc__en">football</span><span class="voc__es">fútbol</span></div>
        <div class="voc"><span class="voc__en">tennis</span><span class="voc__es">tenis</span></div>
        <div class="voc"><span class="voc__en">swimming</span><span class="voc__es">natación</span></div>
        <div class="voc"><span class="voc__en">go to the cinema</span><span class="voc__es">ir al cine</span></div>
        <div class="voc"><span class="voc__en">watch TV</span><span class="voc__es">mirar tele</span></div>
        <div class="voc"><span class="voc__en">listen to music</span><span class="voc__es">escuchar música</span></div>
      </div>

      <h2>Meses y números ordinales</h2>
      <p>Los meses van con mayúscula. La fecha usa <strong>ordinales</strong>.</p>
      <div class="voc-grid">
        <div class="voc"><span class="voc__en">January</span><span class="voc__es">enero</span></div>
        <div class="voc"><span class="voc__en">February</span><span class="voc__es">febrero</span></div>
        <div class="voc"><span class="voc__en">March</span><span class="voc__es">marzo</span></div>
        <div class="voc"><span class="voc__en">April</span><span class="voc__es">abril</span></div>
        <div class="voc"><span class="voc__en">May</span><span class="voc__es">mayo</span></div>
        <div class="voc"><span class="voc__en">June</span><span class="voc__es">junio</span></div>
        <div class="voc"><span class="voc__en">July</span><span class="voc__es">julio</span></div>
        <div class="voc"><span class="voc__en">August</span><span class="voc__es">agosto</span></div>
        <div class="voc"><span class="voc__en">September</span><span class="voc__es">septiembre</span></div>
        <div class="voc"><span class="voc__en">October</span><span class="voc__es">octubre</span></div>
        <div class="voc"><span class="voc__en">November</span><span class="voc__es">noviembre</span></div>
        <div class="voc"><span class="voc__en">December</span><span class="voc__es">diciembre</span></div>
      </div>
      <div class="formula-box"><span class="en">first (1st), second (2nd), third (3rd), fourth (4th), fifth (5th)… twentieth (20th)</span></div>
      <div class="callout def"><strong class="callout__tag">La fecha</strong> <span class="en">What's the date?</span> — <span class="en">It's the 25th of May.</span> / <span class="en">It's May 25th.</span></div>
    `,
    quiz: [
      { q: "Pregunta correcta:",
        opts: ["Where he lives?", "Where does he live?", "Where does he lives?", "Where do he live?"], a: 1,
        exp: "Wh- + does + sujeto + verbo base." },
      { q: "Imperativo negativo de «talk»:",
        opts: ["No talk", "Don't talk", "Doesn't talk", "Not talk"], a: 1,
        exp: "Imperativo negativo: Don't + base." },
      { q: "El pronombre objeto de «he» es:",
        opts: ["his", "him", "he", "her"], a: 1,
        exp: "he → him." },
      { q: "Completá: «I love Scarlett. I love ___.»",
        opts: ["she", "her", "hers", "herself"], a: 1,
        exp: "Objeto femenino → her." },
      { q: "El pronombre objeto de «they» es:",
        opts: ["their", "them", "they", "theirs"], a: 1,
        exp: "they → them." },
      { q: "«What sports do you do?» pregunta por:",
        opts: ["dónde vivís", "qué deportes hacés", "cuándo jugás", "con quién"], a: 1,
        exp: "Pregunta por los deportes que practicás." },
      { q: "Un imperativo afirmativo es:",
        opts: ["You open the door.", "Open the door.", "Do you open?", "Opening the door."], a: 1,
        exp: "Verbo base sin sujeto: Open the door." },
      { q: "El ordinal de «3» es:",
        opts: ["threeth", "thirth", "third", "threed"], a: 2,
        exp: "3 → third (3rd)." },
      { q: "«What's the date?» se responde:",
        opts: ["It's Monday.", "It's three o'clock.", "It's the 25th of May.", "It's May."], a: 2,
        exp: "Se da el día con ordinal y el mes." },
      { q: "El mes «August» es:",
        opts: ["abril", "agosto", "octubre", "enero"], a: 1,
        exp: "August = agosto." },
      { q: "El pronombre objeto de «we» es:",
        opts: ["our", "us", "we", "ours"], a: 1,
        exp: "we → us." },
      { q: "El ordinal de «1» es:",
        opts: ["oneth", "first", "onest", "firstth"], a: 1,
        exp: "1 → first (1st)." },
    ],
    cards: [
      { q: "Orden de la pregunta (present simple)", a: "(Wh-) + do/does + sujeto + verbo base." },
      { q: "Imperativo afirmativo / negativo", a: "Open the door. / Don't open the door." },
      { q: "Pronombres objeto", a: "me, you, him, her, it, us, them." },
      { q: "I love her / Listen to me", a: "el pronombre objeto va tras el verbo o preposición." },
      { q: "What's the date?", a: "¿Qué fecha es? → It's the 25th of May." },
      { q: "Ordinales 1–3", a: "first, second, third (1st, 2nd, 3rd)." },
      { q: "Meses con…", a: "mayúscula inicial: January, February…" },
      { q: "go to the cinema · watch TV", a: "ir al cine · mirar tele." },
      { q: "him vs his", a: "him = objeto (lo/le); his = posesivo (su)." },
      { q: "What do you do in your free time?", a: "¿Qué hacés en tu tiempo libre?" },
    ]
  },

  /* ===================================================================
     UNIDAD 8 — CAN / CAN'T Y LIKE + -ING
     =================================================================== */
  {
    id: "can",
    icon: "star",
    title: "Habilidad, pedidos y gustos",
    desc: "can / can't (poder), like / love / hate + verbo-ing y pedidos útiles.",
    tool: "verbs",
    html: `
      <p class="lead">Con <span class="en">can</span> expresás habilidad, pedidos y permiso; con <span class="en">like + -ing</span> hablás de lo que te gusta hacer.</p>

      <h2>El verbo <span class="en">can / can't</span></h2>
      <p>Es un verbo modal: va seguido del verbo en <strong>forma base</strong> (sin to) e <strong>igual para todos</strong> los sujetos.</p>
      <div class="conj">
        <div class="conj__cell"><b>I can swim.</b> <span class="gloss">Sé/puedo nadar.</span></div>
        <div class="conj__cell"><b>She can't come.</b> <span class="gloss">No puede venir.</span></div>
        <div class="conj__cell"><b>Can you help me?</b> <span class="gloss">¿Podés ayudarme?</span></div>
      </div>
      <div class="callout def"><strong class="callout__tag">Usos</strong> Habilidad (<span class="en">I can drive</span>), pedido (<span class="en">Can you start the car?</span>), permiso (<span class="en">Can I come on Monday?</span>). Respuestas: <span class="en">Yes, I can. / No, I can't.</span></div>

      <h2><span class="en">like / love / hate</span> + verbo-<span class="en">ing</span></h2>
      <p>Para decir qué actividades te gustan, el segundo verbo va en <strong>-ing</strong>.</p>
      <div class="tbl-wrap">
      <table class="tbl">
        <thead><tr><th>Símbolo</th><th>Verbo</th><th>Ejemplo</th></tr></thead>
        <tbody>
          <tr><td>♥♥</td><td class="en">love</td><td class="en">I love playing the piano.</td></tr>
          <tr><td>♥</td><td class="en">like</td><td class="en">I like camping.</td></tr>
          <tr><td>✗</td><td class="en">don't like</td><td class="en">I don't like reading.</td></tr>
          <tr><td>✗✗</td><td class="en">hate</td><td class="en">I hate flying.</td></tr>
        </tbody>
      </table>
      </div>
      <div class="callout warn"><strong class="callout__tag">Recordá</strong> Tras like/love/hate el verbo va en -ing: <span class="en">I like swimming</span> (no «I like swim»).</div>

      <h2>Actividades (Activities)</h2>
      <div class="voc-grid">
        <div class="voc"><span class="voc__en">camping</span><span class="voc__es">acampar</span></div>
        <div class="voc"><span class="voc__en">cooking</span><span class="voc__es">cocinar</span></div>
        <div class="voc"><span class="voc__en">reading</span><span class="voc__es">leer</span></div>
        <div class="voc"><span class="voc__en">travelling</span><span class="voc__es">viajar</span></div>
        <div class="voc"><span class="voc__en">flying</span><span class="voc__es">volar (en avión)</span></div>
        <div class="voc"><span class="voc__en">shopping</span><span class="voc__es">ir de compras</span></div>
        <div class="voc"><span class="voc__en">dancing</span><span class="voc__es">bailar</span></div>
        <div class="voc"><span class="voc__en">walking</span><span class="voc__es">caminar</span></div>
      </div>

      <h2 id="pedidos8">Turismo: pedidos útiles con <span class="en">can</span></h2>
      <div class="phrase-list">
        <div class="phrase"><span class="phrase__en">Can I have the menu, please?</span><span class="phrase__es">¿Me trae el menú?</span></div>
        <div class="phrase"><span class="phrase__en">Can you help me, please?</span><span class="phrase__es">¿Puede ayudarme?</span></div>
        <div class="phrase"><span class="phrase__en">Can I pay by card?</span><span class="phrase__es">¿Puedo pagar con tarjeta?</span></div>
        <div class="phrase"><span class="phrase__en">Can you call a taxi for me?</span><span class="phrase__es">¿Puede pedirme un taxi?</span></div>
      </div>
    `,
    quiz: [
      { q: "Forma correcta:",
        opts: ["I can to swim", "I can swim", "I can swimming", "I cans swim"], a: 1,
        exp: "can + verbo base (sin to, sin -ing, sin -s)." },
      { q: "Negativo de can:",
        opts: ["can not has", "don't can", "can't", "doesn't can"], a: 2,
        exp: "can + not = can't." },
      { q: "Tercera persona de can:",
        opts: ["He cans swim", "He can swims", "He can swim", "He can to swim"], a: 2,
        exp: "can es igual para todos: He can swim." },
      { q: "Pregunta de pedido correcta:",
        opts: ["You can help me?", "Can you help me?", "Do you can help me?", "Are you can help?"], a: 1,
        exp: "Can + sujeto + base." },
      { q: "Después de «like» el verbo va en:",
        opts: ["base", "-ing", "infinitivo con to", "pasado"], a: 1,
        exp: "like/love/hate + verbo-ing." },
      { q: "Forma correcta:",
        opts: ["I love play piano", "I love playing the piano", "I love to playing", "I love plays piano"], a: 1,
        exp: "love + -ing: playing." },
      { q: "«I hate flying» significa:",
        opts: ["me encanta volar", "odio volar", "no sé volar", "puedo volar"], a: 1,
        exp: "hate = odiar; flying = volar." },
      { q: "Respuesta corta a «Can you swim?»",
        opts: ["Yes, I do.", "Yes, I am.", "Yes, I can.", "Yes, I swim."], a: 2,
        exp: "Con can: Yes, I can. / No, I can't." },
      { q: "«Can I pay by card?» significa:",
        opts: ["¿Tiene tarjeta?", "¿Puedo pagar con tarjeta?", "¿Dónde pago?", "¿Cuánto es?"], a: 1,
        exp: "Pedido de permiso con can." },
      { q: "«shopping» es:",
        opts: ["cocinar", "acampar", "ir de compras", "caminar"], a: 2,
        exp: "shopping = ir de compras." },
      { q: "Elegí lo correcto:",
        opts: ["She don't like cooking", "She doesn't like cook", "She doesn't like cooking", "She not like cooking"], a: 2,
        exp: "doesn't like + verbo-ing." },
      { q: "«Can you call a taxi for me?» es un:",
        opts: ["saludo", "pedido", "permiso", "gusto"], a: 1,
        exp: "Es un pedido amable con can." },
    ],
    cards: [
      { q: "Estructura de can", a: "can + verbo base, igual para todos los sujetos." },
      { q: "Negativo de can", a: "can't (cannot)." },
      { q: "Usos de can", a: "habilidad, pedido y permiso." },
      { q: "Respuestas cortas con can", a: "Yes, I can. / No, I can't." },
      { q: "like / love / hate + …", a: "+ verbo-ing: I like swimming." },
      { q: "♥♥ / ♥ / ✗ / ✗✗", a: "love / like / don't like / hate." },
      { q: "Can I have…, please?", a: "¿Me trae…? (pedido en restaurante/hotel)." },
      { q: "Can I pay by card?", a: "¿Puedo pagar con tarjeta?" },
      { q: "flying · travelling · shopping", a: "volar · viajar · ir de compras." },
      { q: "Error frecuente con like", a: "no «I like swim», sí «I like swimming»." },
    ]
  },

  /* ===================================================================
     UNIDAD 9 — PRESENT CONTINUOUS Y ROPA
     =================================================================== */
  {
    id: "ahora",
    icon: "action",
    title: "Acciones en este momento",
    desc: "Present continuous (am/is/are + -ing), present simple vs continuous y ropa.",
    tool: "verbs",
    html: `
      <p class="lead">El <strong>present continuous</strong> describe lo que está pasando <em>ahora mismo</em>: ideal para describir escenas, llamadas y situaciones de viaje.</p>

      <h2>Formación</h2>
      <div class="formula-box"><span class="en">be (am / is / are) + verbo-ing</span></div>
      <div class="conj">
        <div class="conj__cell"><b>I'm driving</b> to the airport. <span class="gloss">Estoy yendo al aeropuerto.</span></div>
        <div class="conj__cell"><b>She's having</b> dinner. <span class="gloss">Está cenando.</span></div>
        <div class="conj__cell"><b>They're closing</b> the door. <span class="gloss">Están cerrando la puerta.</span></div>
      </div>

      <h3>Reglas de ortografía del -ing</h3>
      <div class="tbl-wrap">
      <table class="tbl">
        <thead><tr><th>Regla</th><th>Ejemplo</th></tr></thead>
        <tbody>
          <tr><td>general: + ing</td><td class="en">work → working</td></tr>
          <tr><td>termina en -e muda: quita e</td><td class="en">have → having, drive → driving</td></tr>
          <tr><td>consonante-vocal-consonante: dobla</td><td class="en">sit → sitting, run → running</td></tr>
        </tbody>
      </table>
      </div>

      <h3>Negativo y preguntas</h3>
      <div class="conj">
        <div class="conj__cell"><b>I'm not working</b> today.</div>
        <div class="conj__cell"><b>Are you working?</b> — Yes, I am.</div>
        <div class="conj__cell"><b>What are you doing?</b></div>
      </div>

      <h2>Present simple vs Present continuous</h2>
      <div class="tbl-wrap">
      <table class="tbl">
        <thead><tr><th>Present simple</th><th>Present continuous</th></tr></thead>
        <tbody>
          <tr><td>rutinas, siempre, todos los días</td><td>ahora, en este momento</td></tr>
          <tr><td class="en">He usually works in an office.</td><td class="en">Today he's working in a hotel.</td></tr>
          <tr><td>palabras: <span class="en">every day, usually, always</span></td><td>palabras: <span class="en">now, today, at the moment</span></td></tr>
        </tbody>
      </table>
      </div>
      <div class="callout warn"><strong class="callout__tag">Atención</strong> «Estoy» NO siempre se traduce con continuous: «soy/estoy alto» = <span class="en">I am tall</span>; pero «estoy comiendo» = <span class="en">I am eating</span>.</div>

      <h2>Ropa (Clothes)</h2>
      <div class="voc-grid">
        <div class="voc"><span class="voc__en">a shirt</span><span class="voc__es">camisa</span></div>
        <div class="voc"><span class="voc__en">a T-shirt</span><span class="voc__es">remera</span></div>
        <div class="voc"><span class="voc__en">a skirt</span><span class="voc__es">pollera</span></div>
        <div class="voc"><span class="voc__en">a dress</span><span class="voc__es">vestido</span></div>
        <div class="voc"><span class="voc__en">trousers</span><span class="voc__es">pantalón</span></div>
        <div class="voc"><span class="voc__en">jeans</span><span class="voc__es">jeans</span></div>
        <div class="voc"><span class="voc__en">a jacket</span><span class="voc__es">campera</span></div>
        <div class="voc"><span class="voc__en">shoes</span><span class="voc__es">zapatos</span></div>
        <div class="voc"><span class="voc__en">a sweater</span><span class="voc__es">suéter</span></div>
        <div class="voc"><span class="voc__en">a coat</span><span class="voc__es">abrigo</span></div>
      </div>
      <div class="dialogue"><p><span class="en">She's wearing a shirt and a skirt.</span> <span class="gloss">Lleva puesta una camisa y una pollera.</span></p></div>

      <h2 id="llamada9">Turismo: hablar por teléfono mientras viajás</h2>
      <div class="dialogue">
        <p><span class="sp">A:</span> <span class="en">Hi! What are you doing?</span></p>
        <p><span class="sp">B:</span> <span class="en">I'm waiting at passport control now. Call me later.</span></p>
        <p><span class="sp">A:</span> <span class="en">OK. Where's Mia?</span> — <span class="en">She's checking in.</span></p>
      </div>
    `,
    quiz: [
      { q: "El present continuous se forma con:",
        opts: ["do + verbo", "be + verbo-ing", "have + verbo", "can + verbo"], a: 1,
        exp: "am/is/are + verbo-ing." },
      { q: "El -ing de «have» es:",
        opts: ["haveing", "having", "haviing", "haves"], a: 1,
        exp: "Se quita la -e muda: having." },
      { q: "El -ing de «sit» es:",
        opts: ["siting", "sitting", "sitteing", "siteing"], a: 1,
        exp: "CVC: se dobla la consonante → sitting." },
      { q: "Completá: «They ___ closing the door.»",
        opts: ["is", "am", "are", "do"], a: 2,
        exp: "they → are closing." },
      { q: "«What are you doing?» pregunta por:",
        opts: ["tu trabajo", "lo que hacés ahora", "lo que hacés siempre", "dónde vivís"], a: 1,
        exp: "Continuous = acción de ahora." },
      { q: "¿Cuál es rutina (present simple)?",
        opts: ["He's working now", "He usually works in an office", "He is working today", "Look! He's working"], a: 1,
        exp: "usually + present simple = rutina." },
      { q: "Negativo correcto:",
        opts: ["I not working", "I don't working", "I'm not working", "I aren't work"], a: 2,
        exp: "be + not + verbo-ing: I'm not working." },
      { q: "«She's wearing a skirt» significa:",
        opts: ["compra una pollera", "lleva puesta una pollera", "vende una pollera", "quiere una pollera"], a: 1,
        exp: "wear = llevar puesto; continuous = ahora." },
      { q: "«trousers» son:",
        opts: ["zapatos", "pantalón", "camisa", "abrigo"], a: 1,
        exp: "trousers = pantalón." },
      { q: "Palabra típica del continuous:",
        opts: ["every day", "usually", "now / at the moment", "always"], a: 2,
        exp: "now, today, at the moment indican acción presente." },
      { q: "El -ing de «run» es:",
        opts: ["runing", "running", "runnning", "runs"], a: 1,
        exp: "CVC: running." },
      { q: "Pregunta correcta:",
        opts: ["What you are doing?", "What are you doing?", "What do you doing?", "What are you do?"], a: 1,
        exp: "Wh- + be + sujeto + verbo-ing." },
    ],
    cards: [
      { q: "Present continuous", a: "am/is/are + verbo-ing (acción de ahora)." },
      { q: "-ing con verbos en -e", a: "se quita la e: have → having, drive → driving." },
      { q: "-ing con CVC", a: "se dobla la consonante: sit → sitting, run → running." },
      { q: "Negativo del continuous", a: "be + not + -ing: I'm not working." },
      { q: "Simple vs continuous", a: "simple = rutina; continuous = ahora mismo." },
      { q: "Palabras clave continuous", a: "now, today, at the moment, Look!" },
      { q: "wear", a: "llevar puesto: She's wearing jeans." },
      { q: "shirt · skirt · trousers · shoes", a: "camisa · pollera · pantalón · zapatos." },
      { q: "What are you doing?", a: "¿Qué estás haciendo (ahora)?" },
      { q: "jacket · coat · dress", a: "campera · abrigo · vestido." },
    ]
  },

  /* ===================================================================
     UNIDAD 10 — HOTELES: THERE IS/ARE Y EL PASADO DE BE
     =================================================================== */
  {
    id: "hoteles",
    icon: "bed",
    title: "Hoteles, lugares y el pasado",
    desc: "there is / there are, preposiciones de lugar y past simple de be (was/were).",
    tool: "phrases",
    html: `
      <p class="lead">Describís un hotel y sus instalaciones, decís dónde están las cosas y hablás del pasado con <span class="en">was / were</span>.</p>

      <h2><span class="en">There is / There are</span></h2>
      <p>Sirve para decir que algo <strong>existe</strong> o hay en un lugar.</p>
      <div class="tbl-wrap">
      <table class="tbl">
        <thead><tr><th></th><th>Singular</th><th>Plural</th></tr></thead>
        <tbody>
          <tr><td>Afirmativo</td><td class="en">There's a lift. <span class="gloss">Hay un ascensor.</span></td><td class="en">There are some shops.</td></tr>
          <tr><td>Negativo</td><td class="en">There isn't a pool.</td><td class="en">There aren't any shops.</td></tr>
          <tr><td>Pregunta</td><td class="en">Is there a TV?</td><td class="en">Are there any shops?</td></tr>
        </tbody>
      </table>
      </div>
      <div class="callout def"><strong class="callout__tag">a / some / any</strong> Singular: <span class="en">a</span>. Plural afirmativo: <span class="en">some</span>. Plural en negativo y preguntas: <span class="en">any</span>.</div>
      <div class="dialogue">
        <p><span class="en">Is there a restaurant?</span> — <span class="en">Yes, there is.</span></p>
        <p><span class="en">Are there any shops near the hotel?</span> — <span class="en">No, there aren't.</span></p>
      </div>

      <h2>Preposiciones de lugar (Prepositions of place)</h2>
      <div class="voc-grid">
        <div class="voc"><span class="voc__en">in</span><span class="voc__es">en (dentro)</span></div>
        <div class="voc"><span class="voc__en">on</span><span class="voc__es">sobre / en</span></div>
        <div class="voc"><span class="voc__en">under</span><span class="voc__es">debajo de</span></div>
        <div class="voc"><span class="voc__en">next to</span><span class="voc__es">al lado de</span></div>
        <div class="voc"><span class="voc__en">near</span><span class="voc__es">cerca de</span></div>
        <div class="voc"><span class="voc__en">behind</span><span class="voc__es">detrás de</span></div>
      </div>
      <div class="dialogue"><p><span class="en">The remote control is on the table. The bag is under the bed.</span></p></div>

      <h2>Vocabulario de hotel (Hotels)</h2>
      <div class="voc-grid">
        <div class="voc"><span class="voc__en">a single / double room</span><span class="voc__es">habitación simple / doble</span></div>
        <div class="voc"><span class="voc__en">a lift</span><span class="voc__es">ascensor</span></div>
        <div class="voc"><span class="voc__en">a swimming pool</span><span class="voc__es">piscina</span></div>
        <div class="voc"><span class="voc__en">Wi-Fi</span><span class="voc__es">wifi</span></div>
        <div class="voc"><span class="voc__en">a key / key card</span><span class="voc__es">llave / tarjeta</span></div>
        <div class="voc"><span class="voc__en">reception</span><span class="voc__es">recepción</span></div>
        <div class="voc"><span class="voc__en">a view</span><span class="voc__es">vista</span></div>
        <div class="voc"><span class="voc__en">breakfast included</span><span class="voc__es">desayuno incluido</span></div>
      </div>

      <h2>Past simple del verbo <span class="en">be</span>: <span class="en">was / were</span></h2>
      <p>Es el pasado de <span class="en">am/is/are</span> (era / fue / estaba).</p>
      <div class="tbl-wrap">
      <table class="tbl">
        <thead><tr><th>Sujeto</th><th>Pasado</th><th>Negativo</th></tr></thead>
        <tbody>
          <tr><td class="en">I / he / she / it</td><td class="en">was</td><td class="en">wasn't</td></tr>
          <tr><td class="en">you / we / they</td><td class="en">were</td><td class="en">weren't</td></tr>
        </tbody>
      </table>
      </div>
      <div class="dialogue">
        <p><span class="en">She is an actor now. She was a waitress.</span> <span class="gloss">Ahora es actriz. Era moza.</span></p>
        <p><span class="en">Where were you yesterday?</span> — <span class="en">I was at home.</span></p>
      </div>
      <div class="callout tip"><strong class="callout__tag">Preguntas</strong> <span class="en">Was it good?</span> — <span class="en">Yes, it was. / No, it wasn't.</span></div>
    `,
    quiz: [
      { q: "Completá: «There ___ a lift in the hotel.»",
        opts: ["is", "are", "be", "have"], a: 0,
        exp: "Singular → There is." },
      { q: "Plural afirmativo correcto:",
        opts: ["There is some shops", "There are some shops", "There are a shops", "There have shops"], a: 1,
        exp: "Plural afirmativo: There are some…" },
      { q: "Negativo plural correcto:",
        opts: ["There aren't any shops", "There isn't any shops", "There aren't some shops", "There not shops"], a: 0,
        exp: "Negativo plural: aren't any." },
      { q: "Pregunta correcta:",
        opts: ["There is a TV?", "Is there a TV?", "Are there a TV?", "Is a TV there?"], a: 1,
        exp: "Pregunta: Is there…? / Are there…?" },
      { q: "Con plural negativo y preguntas se usa:",
        opts: ["a", "some", "any", "the"], a: 2,
        exp: "any en negativos y preguntas en plural." },
      { q: "«The bag is ___ the bed» (debajo):",
        opts: ["on", "in", "under", "next"], a: 2,
        exp: "under = debajo de." },
      { q: "El pasado de «is» es:",
        opts: ["was", "were", "be", "been"], a: 0,
        exp: "is → was." },
      { q: "El pasado de «are» es:",
        opts: ["was", "were", "wasn't", "are"], a: 1,
        exp: "are → were." },
      { q: "Completá: «Where ___ you yesterday?»",
        opts: ["was", "were", "is", "are"], a: 1,
        exp: "Con you → were." },
      { q: "«a single room» es:",
        opts: ["habitación doble", "habitación simple", "suite", "recepción"], a: 1,
        exp: "single = simple; double = doble." },
      { q: "Respuesta corta a «Was it good?»",
        opts: ["Yes, it is.", "Yes, it was.", "Yes, it were.", "Yes, it does."], a: 1,
        exp: "Pasado de be: Yes, it was." },
      { q: "«a lift» es:",
        opts: ["llave", "ascensor", "vista", "piscina"], a: 1,
        exp: "lift = ascensor (UK)." },
    ],
    cards: [
      { q: "There is / There are", a: "hay (singular / plural): There's a lift / There are shops." },
      { q: "a / some / any", a: "a (singular) · some (plural +) · any (plural −/¿?)." },
      { q: "Negativo de there is/are", a: "There isn't a… / There aren't any…" },
      { q: "Preguntas de existencia", a: "Is there…? / Are there…? — Yes, there is/are." },
      { q: "in · on · under · next to", a: "en (dentro) · sobre · debajo · al lado de." },
      { q: "Pasado de be (was/were)", a: "I/he/she/it was; you/we/they were." },
      { q: "Negativo de was/were", a: "wasn't / weren't." },
      { q: "single / double room", a: "habitación simple / doble." },
      { q: "lift · pool · reception · view", a: "ascensor · piscina · recepción · vista." },
      { q: "Where were you yesterday?", a: "¿Dónde estuviste ayer? → I was at…" },
    ]
  }

  ]
};
