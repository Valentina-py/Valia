/* ============================================================
   HERRAMIENTA — Tabla de verdad BOOLEANA
   Evalúa expresiones del Álgebra de Boole:
     +  suma (OR) · ·,* producto (AND) · yuxtaposición = AND (ab)
     '  complemento postfijo (a') · !,~ complemento prefijo · 0 1 constantes
   Genera la tabla de verdad y clasifica (tautología/contradicción/contingencia).
   ============================================================ */
(function () {
  "use strict";

  function normalize(src) {
    return src
      .replace(/[×∙·]/g, "*")
      .replace(/[∧]/g, "*")
      .replace(/[∨]/g, "+")
      .replace(/[¬~]/g, "!")
      .replace(/[′’]/g, "'")
      .replace(/\s+/g, "");
  }

  function tokenize(s) {
    const tk = [];
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (/[a-zA-Z]/.test(c)) tk.push({ t: "var", v: c });
      else if (c === "0" || c === "1") tk.push({ t: "const", v: +c });
      else if (c === "+") tk.push({ t: "+" });
      else if (c === "*") tk.push({ t: "*" });
      else if (c === "!") tk.push({ t: "!" });
      else if (c === "'") tk.push({ t: "'" });
      else if (c === "(") tk.push({ t: "(" });
      else if (c === ")") tk.push({ t: ")" });
      else throw new Error("Símbolo no reconocido: «" + c + "»");
    }
    return tk;
  }

  // Parser recursivo-descendente con AND implícito (yuxtaposición)
  function parse(tokens) {
    let pos = 0;
    const peek = () => tokens[pos];
    const next = () => tokens[pos++];
    const startsFactor = t => t && (t.t === "var" || t.t === "const" || t.t === "(" || t.t === "!");

    function parseExpr() {
      let node = parseTerm();
      while (peek() && peek().t === "+") { next(); node = orNode(node, parseTerm()); }
      return node;
    }
    function parseTerm() {
      let node = parseFactor();
      while (peek() && (peek().t === "*" || startsFactor(peek()))) {
        if (peek().t === "*") next();
        node = andNode(node, parseFactor());
      }
      return node;
    }
    function parseFactor() {
      let node = parsePrimary();
      while (peek() && peek().t === "'") { next(); node = notNode(node); }
      return node;
    }
    function parsePrimary() {
      const t = peek();
      if (!t) throw new Error("Expresión incompleta");
      if (t.t === "!") { next(); return notNode(parseFactor()); }
      if (t.t === "(") {
        next();
        const node = parseExpr();
        if (!peek() || peek().t !== ")") throw new Error("Falta cerrar un paréntesis");
        next();
        return node;
      }
      if (t.t === "var") { next(); return env => env[t.v]; }
      if (t.t === "const") { next(); return () => t.v; }
      throw new Error("Se esperaba una variable, constante o «(»");
    }

    const orNode = (a, b) => env => (a(env) || b(env)) ? 1 : 0;
    const andNode = (a, b) => env => (a(env) && b(env)) ? 1 : 0;
    const notNode = a => env => a(env) ? 0 : 1;

    const tree = parseExpr();
    if (pos < tokens.length) throw new Error("Sobra algo en la expresión");
    return tree;
  }

  function getVars(tokens) {
    const set = [];
    tokens.forEach(t => { if (t.t === "var" && !set.includes(t.v)) set.push(t.v); });
    return set.sort();
  }

  function build(container) {
    container.innerHTML = `
      <div class="tool">
        <div class="field">
          <label>Escribí una expresión booleana</label>
          <input class="input input--mono" id="bl-expr" placeholder="ej: a b + a' c" value="a b + a'c" autocomplete="off" />
        </div>
        <div class="op-keys" id="bl-keys">
          <button data-ins="a">a</button>
          <button data-ins="b">b</button>
          <button data-ins="c">c</button>
          <button data-ins="d">d</button>
          <button data-ins="+">+</button>
          <button data-ins="*">·</button>
          <button data-ins="'">'</button>
          <button data-ins="(">(</button>
          <button data-ins=")">)</button>
          <button data-ins="0">0</button>
          <button data-ins="1">1</button>
        </div>
        <div class="btn-row">
          <button class="btn btn--primary" id="bl-go">Generar tabla</button>
          <button class="btn" id="bl-clear">Limpiar</button>
        </div>
        <p class="muted" style="font-size:12.5px">
          <code>+</code> suma (OR) · <code>· *</code> o juntar letras <code>ab</code> = producto (AND) ·
          <code>'</code> complemento (a') · también <code>!a</code> · constantes <code>0</code> y <code>1</code>.
        </p>
        <div id="bl-out"></div>
      </div>`;

    const input = container.querySelector("#bl-expr");
    const out = container.querySelector("#bl-out");

    container.querySelector("#bl-keys").addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      const ins = b.dataset.ins;
      const s = input.selectionStart ?? input.value.length;
      const eN = input.selectionEnd ?? input.value.length;
      input.value = input.value.slice(0, s) + ins + input.value.slice(eN);
      input.focus();
      input.selectionStart = input.selectionEnd = s + ins.length;
    });

    function run() {
      const raw = input.value.trim();
      if (!raw) { out.innerHTML = `<div class="result-box empty">Escribí una expresión para ver su tabla.</div>`; return; }
      try {
        const tokens = tokenize(normalize(raw));
        const vars = getVars(tokens);
        if (vars.length === 0) throw new Error("Falta al menos una variable (a, b, …)");
        if (vars.length > 5) throw new Error("Máximo 5 variables para que la tabla sea legible.");
        const fn = parse(tokens);

        const rows = 1 << vars.length;
        let body = "", ones = 0;
        for (let i = 0; i < rows; i++) {
          const env = {};
          vars.forEach((v, k) => { env[v] = (i >> (vars.length - 1 - k)) & 1; });
          const res = fn(env) ? 1 : 0;
          if (res) ones++;
          const cells = vars.map(v => `<td class="${env[v] ? "v-true" : "v-false"}">${env[v]}</td>`).join("");
          body += `<tr>${cells}<td class="${res ? "v-true" : "v-false"}"><strong>${res}</strong></td></tr>`;
        }
        const head = vars.map(v => `<th>${v}</th>`).join("") + `<th>f</th>`;

        let tipo, chip;
        if (ones === rows) { tipo = "Tautología (siempre 1)"; chip = "tip"; }
        else if (ones === 0) { tipo = "Contradicción (siempre 0)"; chip = "warn"; }
        else { tipo = "Contingencia"; chip = ""; }

        out.innerHTML = `
          <div class="callout ${chip}" style="margin-top:18px">
            <strong class="callout__tag">Clasificación</strong>
            <strong>${tipo}</strong> · la función vale 1 en ${ones} de ${rows} filas.
          </div>
          <div class="tbl-wrap">
            <table class="tbl"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>
          </div>
          <p class="muted" style="font-size:12.5px">Las filas siguen el orden binario, de ${"0".repeat(vars.length)} a ${"1".repeat(vars.length)}.</p>`;
      } catch (err) {
        out.innerHTML = `<div class="error-text">⚠️ ${err.message}</div>`;
      }
    }

    container.querySelector("#bl-go").addEventListener("click", run);
    container.querySelector("#bl-clear").addEventListener("click", () => { input.value = ""; input.focus(); run(); });
    input.addEventListener("keydown", e => { if (e.key === "Enter") run(); });
    run();
  }

  window.Tools = window.Tools || {};
  window.Tools.boole = build;
})();
