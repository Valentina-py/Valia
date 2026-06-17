/* ============================================================
   HERRAMIENTA — Intérprete de Pseudocódigo (en español)
   Soporta: asignación (←), Escribir, Leer, Si/Sino/FinSi,
   Mientras/FinMientras, Repetir/Hasta que, Para/FinPara,
   vectores v[i], operadores + - * / ^ div mod = <> < > <= >=
   Y O NO, y funciones raiz, abs, trunc, redondear, longitud.
   ============================================================ */
(function () {
  "use strict";

  /* =================== LEXER =================== */
  const KW = new Set([
    "escribir", "leer", "si", "entonces", "sino", "finsi",
    "mientras", "hacer", "finmientras", "repetir", "hasta", "que",
    "para", "con", "paso", "finpara",
    "div", "mod", "y", "o", "no", "verdadero", "falso",
    "raiz", "abs", "trunc", "redondear", "longitud"
  ]);

  function lex(src) {
    const tokens = [];
    let i = 0, line = 1;
    const push = (t, v) => tokens.push({ t, v, line });
    while (i < src.length) {
      const c = src[i];
      if (c === "\n") { push("nl"); line++; i++; continue; }
      if (c === " " || c === "\t" || c === "\r") { i++; continue; }
      // comentarios
      if (c === "/" && src[i + 1] === "/") { while (i < src.length && src[i] !== "\n") i++; continue; }
      // números
      if (/[0-9]/.test(c)) {
        let j = i; while (j < src.length && /[0-9]/.test(src[j])) j++;
        if (src[j] === "." && /[0-9]/.test(src[j + 1])) { j++; while (j < src.length && /[0-9]/.test(src[j])) j++; }
        push("num", parseFloat(src.slice(i, j))); i = j; continue;
      }
      // cadenas
      if (c === '"' || c === "'") {
        let j = i + 1, s = "";
        while (j < src.length && src[j] !== c) { s += src[j]; j++; }
        if (j >= src.length) throw err(line, "Falta cerrar la comilla de una cadena");
        push("str", s); i = j + 1; continue;
      }
      // identificadores / palabras clave
      if (/[A-Za-zÁÉÍÓÚáéíóúÑñ_]/.test(c)) {
        let j = i; while (j < src.length && /[A-Za-zÁÉÍÓÚáéíóúÑñ0-9_]/.test(src[j])) j++;
        const w = src.slice(i, j); const lw = w.toLowerCase();
        if (KW.has(lw)) push("kw", lw); else push("id", w);
        i = j; continue;
      }
      // asignación ←
      if (c === "←") { push("asg"); i++; continue; }
      // operadores de 2 chars
      const two = src.substr(i, 2);
      if (two === "<-") { push("asg"); i += 2; continue; }
      if (two === "<=") { push("op", "<="); i += 2; continue; }
      if (two === ">=") { push("op", ">="); i += 2; continue; }
      if (two === "<>") { push("op", "<>"); i += 2; continue; }
      // 1 char
      if ("+-*/^".includes(c)) { push("op", c); i++; continue; }
      if (c === "<") { push("op", "<"); i++; continue; }
      if (c === ">") { push("op", ">"); i++; continue; }
      if (c === "=") { push("op", "="); i++; continue; }
      if (c === "(") { push("("); i++; continue; }
      if (c === ")") { push(")"); i++; continue; }
      if (c === "[") { push("["); i++; continue; }
      if (c === "]") { push("]"); i++; continue; }
      if (c === ",") { push(","); i++; continue; }
      throw err(line, "Símbolo no reconocido: «" + c + "»");
    }
    push("eof");
    return tokens;
  }

  function err(line, msg) { const e = new Error("Línea " + line + ": " + msg); e.pseudo = true; return e; }

  /* =================== PARSER =================== */
  function parse(tokens) {
    let p = 0;
    const peek = () => tokens[p];
    const isKw = (k) => peek().t === "kw" && peek().v === k;
    const eat = () => tokens[p++];
    const expect = (t, msg) => { if (peek().t !== t) throw err(peek().line, msg || ("Se esperaba " + t)); return eat(); };
    const expectKw = (k, msg) => { if (!isKw(k)) throw err(peek().line, msg || ("Se esperaba «" + k + "»")); return eat(); };
    const skipNl = () => { while (peek().t === "nl") eat(); };

    const STOP = new Set(["sino", "finsi", "finmientras", "finpara", "hasta", "que"]);

    function parseProgram() {
      const stmts = block(new Set());
      if (peek().t !== "eof") throw err(peek().line, "Instrucción no reconocida");
      return stmts;
    }

    // bloque hasta encontrar un terminador (kw en STOP que esté en 'terms') o eof
    function block(terms) {
      const stmts = [];
      for (;;) {
        skipNl();
        const tk = peek();
        if (tk.t === "eof") break;
        if (tk.t === "kw" && terms.has(tk.v)) break;
        stmts.push(statement());
      }
      return stmts;
    }

    function statement() {
      const tk = peek();
      if (tk.t === "kw") {
        switch (tk.v) {
          case "escribir": return sEscribir();
          case "leer": return sLeer();
          case "si": return sSi();
          case "mientras": return sMientras();
          case "repetir": return sRepetir();
          case "para": return sPara();
          default: throw err(tk.line, "No se puede empezar una instrucción con «" + tk.v + "»");
        }
      }
      if (tk.t === "id") return sAsignacion();
      throw err(tk.line, "Instrucción no reconocida");
    }

    function sEscribir() {
      const ln = eat().line; // escribir
      const args = [];
      if (peek().t !== "nl" && peek().t !== "eof") {
        args.push(expr());
        while (peek().t === ",") { eat(); args.push(expr()); }
      }
      return { k: "escribir", args, line: ln };
    }

    function sLeer() {
      const ln = eat().line; // leer
      const targets = [lvalue()];
      while (peek().t === ",") { eat(); targets.push(lvalue()); }
      return { k: "leer", targets, line: ln };
    }

    function lvalue() {
      const id = expect("id", "Se esperaba un nombre de variable");
      let index = null;
      if (peek().t === "[") { eat(); index = expr(); expect("]", "Falta cerrar «]»"); }
      return { name: id.v, index, line: id.line };
    }

    function sAsignacion() {
      const lv = lvalue();
      if (peek().t !== "asg") throw err(peek().line, "Se esperaba «←» (asignación) después de «" + lv.name + "»");
      eat();
      const value = expr();
      return { k: "asignacion", target: lv, value, line: lv.line };
    }

    function sSi() {
      const ln = eat().line; // si
      const cond = expr();
      expectKw("entonces", "Se esperaba «Entonces»");
      const then = block(STOP);
      let els = null;
      if (isKw("sino")) { eat(); els = block(STOP); }
      expectKw("finsi", "Falta «FinSi»");
      return { k: "si", cond, then, els, line: ln };
    }

    function sMientras() {
      const ln = eat().line; // mientras
      const cond = expr();
      expectKw("hacer", "Se esperaba «Hacer»");
      const body = block(STOP);
      expectKw("finmientras", "Falta «FinMientras»");
      return { k: "mientras", cond, body, line: ln };
    }

    function sRepetir() {
      const ln = eat().line; // repetir
      const body = block(STOP);
      expectKw("hasta", "Falta «Hasta» en el Repetir");
      if (isKw("que")) eat();
      const cond = expr();
      return { k: "repetir", cond, body, line: ln };
    }

    function sPara() {
      const ln = eat().line; // para
      const v = expect("id", "Se esperaba la variable del Para").v;
      if (peek().t !== "asg") throw err(peek().line, "Se esperaba «←» en el Para");
      eat();
      const from = expr();
      expectKw("hasta", "Se esperaba «Hasta» en el Para");
      const to = expr();
      let step = null;
      if (isKw("con")) { eat(); expectKw("paso", "Se esperaba «Paso»"); step = expr(); }
      expectKw("hacer", "Se esperaba «Hacer»");
      const body = block(STOP);
      expectKw("finpara", "Falta «FinPara»");
      return { k: "para", v, from, to, step, body, line: ln };
    }

    /* ---------- expresiones (precedencia) ---------- */
    function expr() { return orE(); }
    function orE() { let a = andE(); while (isKw("o")) { eat(); a = { k: "bin", op: "o", a, b: andE() }; } return a; }
    function andE() { let a = notE(); while (isKw("y")) { eat(); a = { k: "bin", op: "y", a, b: notE() }; } return a; }
    function notE() { if (isKw("no")) { eat(); return { k: "un", op: "no", a: notE() }; } return relE(); }
    function relE() {
      let a = addE();
      if (peek().t === "op" && ["=", "<>", "<", ">", "<=", ">="].includes(peek().v)) {
        const op = eat().v; a = { k: "bin", op, a, b: addE() };
      }
      return a;
    }
    function addE() {
      let a = mulE();
      while (peek().t === "op" && (peek().v === "+" || peek().v === "-")) { const op = eat().v; a = { k: "bin", op, a, b: mulE() }; }
      return a;
    }
    function mulE() {
      let a = powE();
      for (;;) {
        if (peek().t === "op" && (peek().v === "*" || peek().v === "/")) { const op = eat().v; a = { k: "bin", op, a, b: powE() }; }
        else if (isKw("div")) { eat(); a = { k: "bin", op: "div", a, b: powE() }; }
        else if (isKw("mod")) { eat(); a = { k: "bin", op: "mod", a, b: powE() }; }
        else break;
      }
      return a;
    }
    function powE() {
      const a = unary();
      if (peek().t === "op" && peek().v === "^") { eat(); return { k: "bin", op: "^", a, b: powE() }; }
      return a;
    }
    function unary() {
      if (peek().t === "op" && peek().v === "-") { eat(); return { k: "un", op: "-", a: unary() }; }
      if (peek().t === "op" && peek().v === "+") { eat(); return unary(); }
      return primary();
    }
    function primary() {
      const tk = peek();
      if (tk.t === "num") { eat(); return { k: "num", v: tk.v }; }
      if (tk.t === "str") { eat(); return { k: "str", v: tk.v }; }
      if (isKw("verdadero")) { eat(); return { k: "bool", v: true }; }
      if (isKw("falso")) { eat(); return { k: "bool", v: false }; }
      if (tk.t === "kw" && ["raiz", "abs", "trunc", "redondear", "longitud"].includes(tk.v)) {
        eat(); expect("(", "Se esperaba «(» después de " + tk.v);
        const arg = expr(); expect(")", "Falta «)»");
        return { k: "call", fn: tk.v, arg };
      }
      if (tk.t === "(") { eat(); const e = expr(); expect(")", "Falta «)»"); return e; }
      if (tk.t === "id") {
        eat();
        if (peek().t === "[") { eat(); const idx = expr(); expect("]", "Falta «]»"); return { k: "index", name: tk.v, index: idx, line: tk.line }; }
        return { k: "var", name: tk.v, line: tk.line };
      }
      throw err(tk.line, "Se esperaba un valor o variable");
    }

    return parseProgram();
  }

  /* =================== INTÉRPRETE =================== */
  function fmtNum(v) {
    if (Number.isInteger(v)) return String(v);
    return String(Math.round(v * 1e6) / 1e6);
  }
  function fmtVal(v) {
    if (typeof v === "boolean") return v ? "VERDADERO" : "FALSO";
    if (typeof v === "number") return fmtNum(v);
    return String(v);
  }
  function truthy(v) {
    if (typeof v === "boolean") return v;
    if (typeof v === "number") return v !== 0;
    return !!v;
  }

  function run(ast, inputs) {
    const env = Object.create(null);
    const out = [];
    let steps = 0;
    const MAX = 1000000;
    let inPos = 0;
    function tick(line) { if (++steps > MAX) throw err(line || 0, "Demasiados pasos: ¿hay un bucle infinito?"); }

    function getVar(name, line) {
      if (!(name in env)) throw err(line || 0, "La variable «" + name + "» no tiene un valor todavía");
      const v = env[name];
      if (Array.isArray(v)) throw err(line || 0, "«" + name + "» es un vector; usá " + name + "[i]");
      return v;
    }
    function getIndexed(name, idx, line) {
      const arr = env[name];
      if (!Array.isArray(arr)) throw err(line || 0, "El vector «" + name + "» todavía no fue cargado");
      const v = arr[idx];
      if (v === undefined) throw err(line || 0, "La posición " + idx + " del vector «" + name + "» no tiene valor");
      return v;
    }

    function ev(n) {
      switch (n.k) {
        case "num": return n.v;
        case "str": return n.v;
        case "bool": return n.v;
        case "var": return getVar(n.name, n.line);
        case "index": {
          const idx = Math.trunc(ev(n.index));
          return getIndexed(n.name, idx, n.line);
        }
        case "un":
          if (n.op === "-") return -toNum(ev(n.a));
          if (n.op === "no") return !truthy(ev(n.a));
          break;
        case "call": {
          const x = ev(n.arg);
          if (n.fn === "longitud") return String(x).length;
          const num = toNum(x);
          if (n.fn === "raiz") return Math.sqrt(num);
          if (n.fn === "abs") return Math.abs(num);
          if (n.fn === "trunc") return Math.trunc(num);
          if (n.fn === "redondear") return Math.round(num);
          break;
        }
        case "bin": return evBin(n);
      }
      throw err(0, "Expresión inválida");
    }

    function toNum(v) {
      if (typeof v === "number") return v;
      if (typeof v === "boolean") return v ? 1 : 0;
      const f = parseFloat(v);
      if (isNaN(f)) throw err(0, "Se esperaba un número y se obtuvo texto: «" + v + "»");
      return f;
    }

    function evBin(n) {
      const op = n.op;
      if (op === "y") return truthy(ev(n.a)) && truthy(ev(n.b));
      if (op === "o") return truthy(ev(n.a)) || truthy(ev(n.b));
      const a = ev(n.a), b = ev(n.b);
      switch (op) {
        case "+": return (typeof a === "string" || typeof b === "string") ? fmtVal(a) + fmtVal(b) : toNum(a) + toNum(b);
        case "-": return toNum(a) - toNum(b);
        case "*": return toNum(a) * toNum(b);
        case "/": { const d = toNum(b); if (d === 0) throw err(0, "División por cero"); return toNum(a) / d; }
        case "div": { const d = toNum(b); if (d === 0) throw err(0, "División por cero"); return Math.trunc(toNum(a) / d); }
        case "mod": { const d = toNum(b); if (d === 0) throw err(0, "División por cero (mod)"); return toNum(a) % d; }
        case "^": return Math.pow(toNum(a), toNum(b));
        case "=": return eq(a, b);
        case "<>": return !eq(a, b);
        case "<": return cmp(a, b) < 0;
        case ">": return cmp(a, b) > 0;
        case "<=": return cmp(a, b) <= 0;
        case ">=": return cmp(a, b) >= 0;
      }
      throw err(0, "Operador desconocido: " + op);
    }
    function eq(a, b) { if (typeof a === "number" && typeof b === "number") return a === b; return fmtVal(a) === fmtVal(b); }
    function cmp(a, b) {
      if (typeof a === "string" || typeof b === "string") { const sa = fmtVal(a), sb = fmtVal(b); return sa < sb ? -1 : sa > sb ? 1 : 0; }
      const na = toNum(a), nb = toNum(b); return na < nb ? -1 : na > nb ? 1 : 0;
    }

    function assign(target, val) {
      if (target.index === null) { env[target.name] = val; return; }
      const idx = Math.trunc(ev(target.index));
      if (idx < 0) throw err(target.line, "Índice negativo en «" + target.name + "»");
      if (!Array.isArray(env[target.name])) env[target.name] = [];
      env[target.name][idx] = val;
    }

    function exec(stmts) {
      for (const s of stmts) execOne(s);
    }
    function execOne(s) {
      tick(s.line);
      switch (s.k) {
        case "asignacion": assign(s.target, ev(s.value)); break;
        case "escribir": out.push(s.args.map(a => fmtVal(ev(a))).join(" ")); break;
        case "leer":
          for (const t of s.targets) {
            if (inPos >= inputs.length) throw err(s.line, "Faltan datos de entrada para «Leer». Agregá valores en el panel de entrada.");
            const raw = inputs[inPos++];
            const num = parseFloat(raw);
            assign(t, (raw.trim() !== "" && !isNaN(num) && /^-?\d*\.?\d+$/.test(raw.trim())) ? num : raw);
          }
          break;
        case "si": truthy(ev(s.cond)) ? exec(s.then) : (s.els && exec(s.els)); break;
        case "mientras": { let g = 0; while (truthy(ev(s.cond))) { tick(s.line); exec(s.body); if (++g > MAX) break; } break; }
        case "repetir": { do { tick(s.line); exec(s.body); } while (!truthy(ev(s.cond))); break; }
        case "para": {
          let i = toNum(ev(s.from));
          const end = toNum(ev(s.to));
          const step = s.step ? toNum(ev(s.step)) : 1;
          if (step === 0) throw err(s.line, "El paso del Para no puede ser 0");
          while (step > 0 ? i <= end : i >= end) {
            tick(s.line);
            env[s.v] = i;
            exec(s.body);
            i += step;
          }
          break;
        }
      }
    }

    exec(ast);
    return { out, env };
  }

  /* =================== EJEMPLOS =================== */
  const EXAMPLES = {
    pares: {
      label: "Números pares",
      code: `// Muestra los números pares del 1 al 20\nPara i ← 1 Hasta 20 Hacer\n  Si i mod 2 = 0 Entonces\n    Escribir i, "es par"\n  FinSi\nFinPara`,
      input: ""
    },
    factorial: {
      label: "Factorial",
      code: `// Factorial de un número (probá con 5)\nLeer n\nfact ← 1\nPara i ← 1 Hasta n Hacer\n  fact ← fact * i\nFinPara\nEscribir "El factorial de", n, "es", fact`,
      input: "5"
    },
    digitos: {
      label: "Suma de dígitos",
      code: `// Suma los dígitos de un número (probá con 1234)\nLeer n\nsuma ← 0\nMientras n > 0 Hacer\n  suma ← suma + (n mod 10)\n  n ← n div 10\nFinMientras\nEscribir "Suma de dígitos:", suma`,
      input: "1234"
    },
    promedio: {
      label: "Promedio (vector)",
      code: `// Carga N edades en un vector y promedia\nLeer N\nsuma ← 0\nPara i ← 0 Hasta N - 1 Hacer\n  Leer v[i]\n  suma ← suma + v[i]\nFinPara\nEscribir "Promedio:", suma / N`,
      input: "4\n18\n20\n22\n24"
    },
    tabla: {
      label: "Tabla de multiplicar",
      code: `// Tabla de multiplicar (probá con 7)\nLeer t\nPara i ← 1 Hasta 10 Hacer\n  Escribir t, "x", i, "=", t * i\nFinPara`,
      input: "7"
    }
  };

  /* =================== UI =================== */
  function build(container) {
    container.innerHTML = `
      <div class="tool">
        <div class="pseudo-examples" id="ps-examples"></div>
        <div class="field" style="margin-top:12px">
          <label>Pseudocódigo</label>
          <textarea class="pseudo-editor" id="ps-code" spellcheck="false"></textarea>
        </div>
        <div class="field">
          <label>Datos de entrada (uno por línea, para las instrucciones «Leer»)</label>
          <textarea class="pseudo-editor" id="ps-input" style="min-height:80px" spellcheck="false"></textarea>
        </div>
        <div class="btn-row">
          <button class="btn btn--primary" id="ps-run">▶ Ejecutar</button>
          <button class="btn" id="ps-clear">Limpiar salida</button>
        </div>
        <label>Salida</label>
        <div class="pseudo-console" id="ps-out"><span class="muted">La salida del programa aparecerá acá.</span></div>
        <div class="pseudo-vars" id="ps-vars"></div>
      </div>`;

    const codeEl = container.querySelector("#ps-code");
    const inputEl = container.querySelector("#ps-input");
    const outEl = container.querySelector("#ps-out");
    const varsEl = container.querySelector("#ps-vars");
    const examplesEl = container.querySelector("#ps-examples");

    Object.keys(EXAMPLES).forEach(key => {
      const b = document.createElement("button");
      b.className = "btn btn--ghost";
      b.textContent = EXAMPLES[key].label;
      b.addEventListener("click", () => { codeEl.value = EXAMPLES[key].code; inputEl.value = EXAMPLES[key].input; outEl.innerHTML = `<span class="muted">Listo para ejecutar.</span>`; varsEl.innerHTML = ""; });
      examplesEl.appendChild(b);
    });

    // ejemplo inicial
    codeEl.value = EXAMPLES.pares.code;
    inputEl.value = EXAMPLES.pares.input;

    function execute() {
      const src = codeEl.value;
      const inputs = inputEl.value.split("\n").map(s => s).filter((s, i, arr) => !(i === arr.length - 1 && s === ""));
      try {
        const ast = parse(lex(src));
        const { out, env } = run(ast, inputs);
        outEl.innerHTML = out.length
          ? out.map(l => `<span class="out-line">${escapeHtml(l)}</span>`).join("")
          : `<span class="muted">(el programa terminó sin escribir nada)</span>`;
        // variables finales
        const names = Object.keys(env);
        varsEl.innerHTML = names.length
          ? names.map(nm => {
              const v = env[nm];
              const val = Array.isArray(v) ? "[" + v.map(x => x === undefined ? "·" : fmtVal(x)).join(", ") + "]" : fmtVal(v);
              return `<span class="pseudo-var">${escapeHtml(nm)} = ${escapeHtml(val)}</span>`;
            }).join("")
          : "";
      } catch (e) {
        outEl.innerHTML = `<span class="out-err">⚠️ ${escapeHtml(e.message)}</span>`;
        varsEl.innerHTML = "";
      }
    }

    function escapeHtml(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

    container.querySelector("#ps-run").addEventListener("click", execute);
    container.querySelector("#ps-clear").addEventListener("click", () => { outEl.innerHTML = `<span class="muted">La salida del programa aparecerá acá.</span>`; varsEl.innerHTML = ""; });
    // Ctrl+Enter para ejecutar
    codeEl.addEventListener("keydown", e => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); execute(); } });
  }

  window.Tools = window.Tools || {};
  window.Tools.pseudo = build;
  // expongo el motor por si lo usan los juegos / tests
  window.Pseudo = { lex, parse, run };
})();
