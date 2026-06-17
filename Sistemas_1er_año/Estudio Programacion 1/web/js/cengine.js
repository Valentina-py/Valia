/* ============================================================
   CEngine — Mini-intérprete de C (subconjunto educativo)
   Soporta: int/float/double/char/void, unsigned/short/long,
   declaraciones y arreglos, printf/scanf, if/else, switch/case,
   for, while, do-while, break/continue/return, funciones del
   usuario, y un puñado de funciones de librería (sqrt, pow, abs,
   strlen, strcpy, strcmp, strcat, atoi, getchar, putchar, gets,
   puts, toupper/tolower, isdigit/isalpha/isupper/islower).
   Devuelve la salida (stdout), una traza de variables y errores.

   API:  window.CEngine.run(codigo, stdin) ->
         { output, error, errorLine, trace, steps }
   ============================================================ */
(function () {
  "use strict";

  /* ------------------------- TOKENIZER ------------------------- */
  const KEYWORDS = new Set([
    "int", "float", "double", "char", "void", "short", "long", "unsigned", "signed",
    "const", "if", "else", "for", "while", "do", "switch", "case", "default",
    "break", "continue", "return", "struct", "enum", "typedef", "sizeof"
  ]);

  function tokenize(src) {
    const toks = [];
    let i = 0, line = 1;
    const n = src.length;
    const push = (type, value) => toks.push({ type, value, line });
    while (i < n) {
      const c = src[i];
      if (c === "\n") { line++; i++; continue; }
      if (c === " " || c === "\t" || c === "\r") { i++; continue; }
      // comentarios
      if (c === "/" && src[i + 1] === "/") { while (i < n && src[i] !== "\n") i++; continue; }
      if (c === "/" && src[i + 1] === "*") {
        i += 2;
        while (i < n && !(src[i] === "*" && src[i + 1] === "/")) { if (src[i] === "\n") line++; i++; }
        i += 2; continue;
      }
      // preprocesador: tomamos toda la línea como un token 'pre'
      if (c === "#") {
        let j = i; let s = "";
        while (j < n && src[j] !== "\n") { s += src[j]; j++; }
        push("pre", s.trim()); i = j; continue;
      }
      // número
      if (/[0-9]/.test(c) || (c === "." && /[0-9]/.test(src[i + 1]))) {
        let s = ""; let isFloat = false;
        while (i < n && /[0-9.]/.test(src[i])) { if (src[i] === ".") isFloat = true; s += src[i]; i++; }
        if (src[i] === "e" || src[i] === "E") { isFloat = true; s += src[i]; i++; if (src[i] === "+" || src[i] === "-") { s += src[i]; i++; } while (i < n && /[0-9]/.test(src[i])) { s += src[i]; i++; } }
        if (src[i] === "f" || src[i] === "F") { isFloat = true; i++; }
        if (src[i] === "l" || src[i] === "L") { i++; }
        toks.push({ type: "num", value: parseFloat(s), isFloat, line });
        continue;
      }
      // identificador / keyword
      if (/[A-Za-z_]/.test(c)) {
        let s = "";
        while (i < n && /[A-Za-z0-9_]/.test(src[i])) { s += src[i]; i++; }
        push(KEYWORDS.has(s) ? "kw" : "id", s);
        continue;
      }
      // cadena
      if (c === '"') {
        i++; let s = "";
        while (i < n && src[i] !== '"') {
          if (src[i] === "\\") { s += readEscape(src, i); i += (src[i + 1] === "x" ? 4 : 2); }
          else { s += src[i]; i++; }
        }
        i++; push("str", s); continue;
      }
      // caracter
      if (c === "'") {
        i++; let ch;
        if (src[i] === "\\") { ch = readEscape(src, i); i += (src[i + 1] === "x" ? 4 : 2); }
        else { ch = src[i]; i++; }
        if (src[i] === "'") i++;
        toks.push({ type: "char", value: ch.charCodeAt(0), raw: ch, line });
        continue;
      }
      // operadores (multi-carácter primero)
      const three = src.substr(i, 3);
      if (three === "<<=" || three === ">>=") { push("op", three); i += 3; continue; }
      const two = src.substr(i, 2);
      if (["++", "--", "+=", "-=", "*=", "/=", "%=", "==", "!=", "<=", ">=", "&&", "||", "<<", ">>", "->"].includes(two)) {
        push("op", two); i += 2; continue;
      }
      if ("+-*/%=<>!&|^~?:.,;(){}[]".includes(c)) { push("op", c); i++; continue; }
      i++; // ignorar desconocido
    }
    push("eof", null);
    return toks;
  }

  // Expande macros object-like: #define NOMBRE valor
  function expandDefines(toks) {
    const defs = Object.create(null);
    const reDef = /^#\s*define\s+([A-Za-z_]\w*)\s+(.+)$/;
    for (const t of toks) {
      if (t.type === "pre") {
        const m = reDef.exec(t.value);
        if (m) defs[m[1]] = m[2].trim();
      }
    }
    if (!Object.keys(defs).length) return toks.filter(t => t.type !== "pre");
    const out = [];
    for (const t of toks) {
      if (t.type === "pre") continue;
      if (t.type === "id" && t.value in defs) {
        let sub = tokenize(defs[t.value]).filter(x => x.type !== "eof");
        for (const st of sub) { st.line = t.line; out.push(st); }
      } else out.push(t);
    }
    return out;
  }

  function readEscape(src, i) {
    // src[i] === '\\'
    const e = src[i + 1];
    const map = { n: "\n", t: "\t", r: "\r", "0": "\0", "\\": "\\", "'": "'", '"': '"', a: "\x07", b: "\b", f: "\f", v: "\v" };
    if (e in map) return map[e];
    return e;
  }

  /* ------------------------- PARSER ------------------------- */
  function Parser(rawToks) {
    const toks = expandDefines(rawToks);
    let p = 0;
    const peek = (k = 0) => toks[p + k];
    const next = () => toks[p++];
    const isOp = (v) => peek().type === "op" && peek().value === v;
    const isKw = (v) => peek().type === "kw" && peek().value === v;
    function eat(type, value) {
      const t = peek();
      if (t.type !== type || (value !== undefined && t.value !== value))
        err(`Se esperaba '${value || type}' pero se encontró '${t.value === null ? "fin de archivo" : t.value}'`, t.line);
      return next();
    }
    function err(msg, line) { throw { ceError: true, msg, line: line || (peek() && peek().line) }; }

    const TYPE_KW = new Set(["int", "float", "double", "char", "void", "short", "long", "unsigned", "signed", "const"]);
    function isTypeStart() {
      const t = peek();
      return t.type === "kw" && TYPE_KW.has(t.value);
    }
    function parseType() {
      let parts = [];
      while (isTypeStart()) { parts.push(next().value); }
      const isFloat = parts.includes("float") || parts.includes("double");
      const isVoid = parts.includes("void");
      const isChar = parts.includes("char");
      return { name: parts.join(" ") || "int", isFloat, isVoid, isChar };
    }

    // Programa: secuencia de declaraciones globales / funciones; ignora 'pre'
    function parseProgram() {
      const funcs = {};
      const globals = [];
      while (peek().type !== "eof") {
        if (peek().type === "pre") { next(); continue; }
        if (isKw("typedef")) { while (peek().type !== "eof" && !isOp(";")) next(); if (isOp(";")) next(); continue; }
        if (isKw("enum")) { for (const g of parseEnumTop()) globals.push(g); continue; }
        if (isTypeStart()) {
          const type = parseType();
          const name = eat("id").value;
          if (isOp("(")) { const fn = parseFuncRest(type, name); if (fn.type === "FuncDecl") funcs[name] = fn; }
          else { globals.push(parseGlobalVarRest(type, name)); }
        } else { next(); }
      }
      return { type: "Program", funcs, globals };
    }

    // Parsea 'enum [tag] [ { m1, m2=valor, ... } ]'  (sin el ';')
    function parseEnumHeader() {
      const line = peek().line; eat("kw", "enum");
      let tag = null;
      if (peek().type === "id") tag = next().value;
      let members = null;
      if (isOp("{")) {
        next(); members = [];
        while (!isOp("}")) {
          const mname = eat("id").value;
          if (isOp("=")) { next(); members.push({ name: mname, expr: parseAssign() }); }
          else members.push({ name: mname, expr: null });
          if (isOp(",")) next(); else break;
        }
        eat("op", "}");
      }
      return { line, tag, members };
    }
    const INT_TYPE = { name: "int", isFloat: false, isVoid: false, isChar: false };
    // a nivel de programa: devuelve un array de nodos (EnumDecl y/o VarDecl)
    function parseEnumTop() {
      const h = parseEnumHeader();
      const out = [];
      if (h.members) out.push({ type: "EnumDecl", members: h.members, line: h.line });
      if (peek().type === "id") {
        const name = eat("id").value;
        const decls = parseDeclList(INT_TYPE, name);
        out.push({ type: "VarDecl", varType: INT_TYPE, decls, line: h.line });
      }
      if (isOp(";")) next();
      return out;
    }
    // a nivel de sentencia: devuelve un único nodo (Seq si hay varios)
    function parseEnumStmt() {
      const nodes = parseEnumTop();
      if (nodes.length === 1) return nodes[0];
      return { type: "Seq", body: nodes, line: nodes[0].line };
    }

    function parseGlobalVarRest(type, name) {
      const decls = parseDeclList(type, name);
      eat("op", ";");
      return { type: "VarDecl", varType: type, decls, line: decls[0].line };
    }

    function parseFuncRest(retType, name) {
      eat("op", "(");
      const params = [];
      if (!isOp(")")) {
        do {
          if (isKw("void") && peek(1).type === "op" && peek(1).value === ")") { next(); break; }
          const pt = parseType();
          let pname = peek().type === "id" ? next().value : "_";
          let isArr = false;
          if (isOp("[")) { next(); while (!isOp("]")) next(); eat("op", "]"); isArr = true; }
          params.push({ ptype: pt, name: pname, isArr });
        } while (isOp(",") && next());
      }
      eat("op", ")");
      if (isOp(";")) { next(); return { type: "FuncProto", name }; } // prototipo: se ignora
      const body = parseBlock();
      return { type: "FuncDecl", retType, name, params, body };
    }

    function parseBlock() {
      const line = peek().line;
      eat("op", "{");
      const stmts = [];
      while (!isOp("}") && peek().type !== "eof") stmts.push(parseStmt());
      eat("op", "}");
      return { type: "Block", body: stmts, line };
    }

    function parseDeclList(type, firstName) {
      const decls = [];
      let name = firstName;
      while (true) {
        const line = peek().line;
        let arr = null;
        if (isOp("[")) {
          next();
          let sizeExpr = null;
          if (!isOp("]")) sizeExpr = parseExpr();
          eat("op", "]");
          arr = { sizeExpr };
        }
        let init = null;
        if (isOp("=")) {
          next();
          if (isOp("{")) { init = parseArrayInit(); }
          else init = parseAssign();
        }
        decls.push({ name, arr, init, line });
        if (isOp(",")) { next(); name = eat("id").value; }
        else break;
      }
      return decls;
    }

    function parseArrayInit() {
      eat("op", "{");
      const items = [];
      while (!isOp("}")) { items.push(parseAssign()); if (isOp(",")) next(); else break; }
      eat("op", "}");
      return { type: "ArrayInit", items };
    }

    function parseStmt() {
      const t = peek();
      if (t.type === "pre") { next(); return { type: "Empty" }; }
      if (isOp("{")) return parseBlock();
      if (isOp(";")) { next(); return { type: "Empty" }; }
      if (isKw("if")) return parseIf();
      if (isKw("for")) return parseFor();
      if (isKw("while")) return parseWhile();
      if (isKw("do")) return parseDoWhile();
      if (isKw("switch")) return parseSwitch();
      if (isKw("return")) { const line = next().line; let e = null; if (!isOp(";")) e = parseExpr(); eat("op", ";"); return { type: "Return", expr: e, line }; }
      if (isKw("break")) { const line = next().line; eat("op", ";"); return { type: "Break", line }; }
      if (isKw("continue")) { const line = next().line; eat("op", ";"); return { type: "Continue", line }; }
      if (isKw("enum")) return parseEnumStmt();
      if (isTypeStart()) {
        const type = parseType();
        const name = eat("id").value;
        const decls = parseDeclList(type, name);
        eat("op", ";");
        return { type: "VarDecl", varType: type, decls, line: decls[0].line };
      }
      // expresión-sentencia
      const line = peek().line;
      const e = parseExpr();
      eat("op", ";");
      return { type: "ExprStmt", expr: e, line };
    }

    function parseIf() {
      const line = next().line; // if
      eat("op", "("); const cond = parseExpr(); eat("op", ")");
      const then = parseStmt();
      let els = null;
      if (isKw("else")) { next(); els = parseStmt(); }
      return { type: "If", cond, then, els, line };
    }
    function parseWhile() {
      const line = next().line;
      eat("op", "("); const cond = parseExpr(); eat("op", ")");
      const body = parseStmt();
      return { type: "While", cond, body, line };
    }
    function parseDoWhile() {
      const line = next().line;
      const body = parseStmt();
      eat("kw", "while"); eat("op", "("); const cond = parseExpr(); eat("op", ")"); eat("op", ";");
      return { type: "DoWhile", cond, body, line };
    }
    function parseFor() {
      const line = next().line;
      eat("op", "(");
      let init = null;
      if (!isOp(";")) {
        if (isTypeStart()) { const type = parseType(); const name = eat("id").value; const decls = parseDeclList(type, name); init = { type: "VarDecl", varType: type, decls, line }; }
        else init = { type: "ExprStmt", expr: parseExpr(), line };
      }
      eat("op", ";");
      let cond = isOp(";") ? null : parseExpr(); eat("op", ";");
      let upd = isOp(")") ? null : parseExpr(); eat("op", ")");
      const body = parseStmt();
      return { type: "For", init, cond, upd, body, line };
    }
    function parseSwitch() {
      const line = next().line;
      eat("op", "("); const disc = parseExpr(); eat("op", ")");
      eat("op", "{");
      const cases = [];
      while (!isOp("}") && peek().type !== "eof") {
        if (isKw("case")) { next(); const test = parseExpr(); eat("op", ":"); cases.push({ test, body: [] }); }
        else if (isKw("default")) { next(); eat("op", ":"); cases.push({ test: null, body: [] }); }
        else { if (!cases.length) err("'case' esperado dentro de switch", peek().line); cases[cases.length - 1].body.push(parseStmt()); }
      }
      eat("op", "}");
      return { type: "Switch", disc, cases, line };
    }

    /* ---- Expresiones (precedencia) ---- */
    function parseExpr() {
      let e = parseAssign();
      while (isOp(",")) { next(); const r = parseAssign(); e = { type: "Comma", left: e, right: r }; }
      return e;
    }
    function parseAssign() {
      const left = parseTernary();
      if (peek().type === "op" && ["=", "+=", "-=", "*=", "/=", "%="].includes(peek().value)) {
        const op = next().value;
        const right = parseAssign();
        return { type: "Assign", op, target: left, value: right, line: left.line };
      }
      return left;
    }
    function parseTernary() {
      let c = parseBinary(0);
      if (isOp("?")) { next(); const a = parseAssign(); eat("op", ":"); const b = parseAssign(); return { type: "Ternary", cond: c, a, b }; }
      return c;
    }
    const BINOPS = [
      ["||"], ["&&"], ["|"], ["^"], ["&"], ["==", "!="],
      ["<", ">", "<=", ">="], ["<<", ">>"], ["+", "-"], ["*", "/", "%"]
    ];
    function parseBinary(lvl) {
      if (lvl >= BINOPS.length) return parseUnary();
      let left = parseBinary(lvl + 1);
      while (peek().type === "op" && BINOPS[lvl].includes(peek().value)) {
        const op = next().value;
        const right = parseBinary(lvl + 1);
        left = { type: "Binary", op, left, right, line: left.line };
      }
      return left;
    }
    function parseUnary() {
      const t = peek();
      if (t.type === "op" && ["!", "-", "+", "~", "&", "*"].includes(t.value)) {
        next(); const arg = parseUnary(); return { type: "Unary", op: t.value, arg, line: t.line };
      }
      if (t.type === "op" && (t.value === "++" || t.value === "--")) {
        next(); const arg = parseUnary(); return { type: "Update", op: t.value, prefix: true, arg, line: t.line };
      }
      if (isKw("sizeof")) { next(); if (isOp("(")) { next(); if (isTypeStart()) { parseType(); } else parseExpr(); eat("op", ")"); } else parseUnary(); return { type: "Num", value: 4, isFloat: false }; }
      return parsePostfix();
    }
    function parsePostfix() {
      let e = parsePrimary();
      while (true) {
        if (isOp("[")) { next(); const idx = parseExpr(); eat("op", "]"); e = { type: "Index", arr: e, index: idx, line: e.line }; }
        else if (isOp("(")) {
          next(); const args = [];
          if (!isOp(")")) { do { args.push(parseAssign()); } while (isOp(",") && next()); }
          eat("op", ")");
          e = { type: "Call", callee: e, args, line: e.line };
        }
        else if (peek().type === "op" && (peek().value === "++" || peek().value === "--")) {
          const op = next().value; e = { type: "Update", op, prefix: false, arg: e, line: e.line };
        }
        else if (isOp(".") || isOp("->")) { next(); eat("id"); } // miembros: ignorado
        else break;
      }
      return e;
    }
    function parsePrimary() {
      const t = peek();
      if (t.type === "num") { next(); return { type: "Num", value: t.value, isFloat: t.isFloat, line: t.line }; }
      if (t.type === "char") { next(); return { type: "Char", value: t.value, line: t.line }; }
      if (t.type === "str") { next(); return { type: "Str", value: t.value, line: t.line }; }
      if (t.type === "id") { next(); return { type: "Ident", name: t.value, line: t.line }; }
      if (isOp("(")) { next(); if (isTypeStart()) { parseType(); eat("op", ")"); return parseUnary(); } const e = parseExpr(); eat("op", ")"); return e; }
      err(`Token inesperado: '${t.value === null ? "fin de archivo" : t.value}'`, t.line);
    }

    return parseProgram();
  }

  /* ------------------------- RUNTIME ------------------------- */
  const MAX_STEPS = 2_000_000;
  const MAX_TRACE = 4000;

  // señales de control de flujo
  const BREAK = { sig: "break" }, CONTINUE = { sig: "continue" };

  function run(code, stdinRaw) {
    const out = { output: "", error: null, errorLine: null, trace: [], steps: 0 };
    let ast;
    try {
      const toks = tokenize(code);
      ast = Parser(toks);
    } catch (e) {
      if (e && e.ceError) { out.error = e.msg; out.errorLine = e.line; return out; }
      out.error = "Error de sintaxis: " + (e && e.message ? e.message : e); return out;
    }

    const stdin = makeStdin(stdinRaw || "");
    const ctx = {
      funcs: ast.funcs, output: "", steps: 0, trace: [], traceFull: false,
      consts: {}, // enum / #define constantes
    };

    function tick(line) {
      ctx.steps++;
      if (ctx.steps > MAX_STEPS) throw { ceError: true, msg: "Ejecución demasiado larga (¿bucle infinito?). Límite de pasos alcanzado.", line };
    }

    // ---- valores ----
    const V = (val, isFloat, isChar) => ({ val, isFloat: !!isFloat, isChar: !!isChar });

    // ---- scopes ----
    function Scope(parent) { return { vars: Object.create(null), parent }; }
    function lookup(scope, name) {
      let s = scope;
      while (s) { if (name in s.vars) return s.vars[name]; s = s.parent; }
      if (name in ctx.consts) return { cell: true, isConst: true, type: { isFloat: false }, value: ctx.consts[name] };
      return null;
    }
    function declareVar(scope, name, cell) { scope.vars[name] = cell; }

    // procesar constantes globales (enum)
    function processGlobals(scope) {
      for (const g of ast.globals) {
        if (g.type === "EnumDecl") {
          let v = 0;
          for (const m of g.members) {
            if (m.expr) v = toNum(evalExpr(m.expr, scope));
            ctx.consts[m.name] = v; v++;
          }
        } else if (g.type === "VarDecl") {
          execVarDecl(g, scope);
        }
      }
    }

    const globalScope = Scope(null);

    function defaultVal(type) { return V(0, type.isFloat, type.isChar); }

    function execVarDecl(node, scope) {
      const t = node.varType;
      for (const d of node.decls) {
        if (d.arr) {
          let size = 0;
          if (d.arr.sizeExpr) size = Math.trunc(toNum(evalExpr(d.arr.sizeExpr, scope)));
          let arr;
          if (d.init && d.init.type === "ArrayInit") {
            arr = d.init.items.map(it => toNum(evalExpr(it, scope)));
            if (!size) size = arr.length;
            while (arr.length < size) arr.push(0);
          } else if (d.init && d.init.type === "Str") {
            arr = [...d.init.value].map(ch => ch.charCodeAt(0)); arr.push(0);
            if (!size) size = arr.length; while (arr.length < size) arr.push(0);
          } else {
            if (!size) size = 0;
            arr = new Array(size).fill(0);
          }
          declareVar(scope, d.name, { cell: true, isArray: true, type: t, arr, len: size });
        } else {
          let val = d.init ? coerce(evalExpr(d.init, scope), t) : defaultVal(t);
          declareVar(scope, d.name, { cell: true, type: t, value: val.val, isFloat: t.isFloat, isChar: t.isChar });
        }
      }
    }

    function coerce(v, type) {
      let val = v.val;
      if (!type.isFloat) val = Math.trunc(val);
      return V(val, type.isFloat, type.isChar);
    }
    const toNum = (v) => (typeof v === "object" ? v.val : v);

    // ---- ejecución de sentencias ----
    function recordTrace(line, scope, fname) {
      if (ctx.trace.length >= MAX_TRACE) { ctx.traceFull = true; return; }
      const vars = {};
      let s = scope;
      while (s && s !== globalScope.parent) {
        for (const k in s.vars) {
          if (k in vars) continue;
          const c = s.vars[k];
          if (c.isArray) {
            if (c.len <= 24) vars[k] = "{" + c.arr.slice(0, c.len).map(x => fmtCell(x, c.type)).join(",") + "}";
            else vars[k] = "[" + c.len + " elems]";
          } else {
            vars[k] = fmtCell(c.value, c.type);
          }
        }
        s = s.parent;
        if (s === globalScope) break;
      }
      ctx.trace.push({ line, vars, out: ctx.output });
    }
    function fmtCell(val, type) {
      if (type && type.isChar) return "'" + (val === 0 ? "\\0" : String.fromCharCode(val)) + "'";
      if (type && type.isFloat) return (Math.round(val * 1e6) / 1e6).toString();
      return String(Math.trunc(val));
    }

    // Ejecuta una sentencia. Devuelve undefined, o una señal de control:
    // BREAK, CONTINUE o { sig:"return", value }. Toda sentencia compuesta
    // propaga la señal hacia arriba.
    function execStmt(node, scope, fname) {
      tick(node.line);
      switch (node.type) {
        case "Empty": return;
        case "Seq": { for (const s of node.body) { const r = execStmt(s, scope, fname); if (r) return r; } return; }
        case "EnumDecl": { let v = 0; for (const m of node.members) { if (m.expr) v = toNum(evalExpr(m.expr, scope)); ctx.consts[m.name] = v; v++; } return; }
        case "Block": {
          const inner = Scope(scope);
          for (const s of node.body) { const r = execStmt(s, inner, fname); if (r) return r; }
          return;
        }
        case "VarDecl": execVarDecl(node, scope); recordTrace(node.line, scope, fname); return;
        case "ExprStmt": evalExpr(node.expr, scope); recordTrace(node.line, scope, fname); return;
        case "If": {
          if (truth(evalExpr(node.cond, scope))) return execStmt(node.then, scope, fname);
          else if (node.els) return execStmt(node.els, scope, fname);
          return;
        }
        case "While": {
          while (truth(evalExpr(node.cond, scope))) {
            tick(node.line);
            const r = execStmt(node.body, scope, fname);
            if (r === BREAK) break;
            if (r && r.sig === "return") return r;
          }
          return;
        }
        case "DoWhile": {
          do {
            tick(node.line);
            const r = execStmt(node.body, scope, fname);
            if (r === BREAK) break;
            if (r && r.sig === "return") return r;
          } while (truth(evalExpr(node.cond, scope)));
          return;
        }
        case "For": {
          const inner = Scope(scope);
          if (node.init) execStmt(node.init, inner, fname);
          while (node.cond === null || truth(evalExpr(node.cond, inner))) {
            tick(node.line);
            const r = execStmt(node.body, inner, fname);
            if (r === BREAK) break;
            if (r && r.sig === "return") return r;
            if (node.upd) evalExpr(node.upd, inner);
          }
          return;
        }
        case "Switch": {
          const d = toNum(evalExpr(node.disc, scope));
          const inner = Scope(scope);
          let matched = false;
          for (const c of node.cases) {
            if (!matched) {
              if (c.test === null) continue; // default lo vemos en 2da pasada
              if (toNum(evalExpr(c.test, inner)) === d) matched = true;
            }
            if (matched) {
              for (const s of c.body) {
                const r = execStmt(s, inner, fname);
                if (r === BREAK) return;
                if (r) return r; // continue / return
              }
            }
          }
          if (!matched) {
            const di = node.cases.findIndex(c => c.test === null);
            if (di >= 0) {
              for (let ci = di; ci < node.cases.length; ci++) {
                for (const s of node.cases[ci].body) {
                  const r = execStmt(s, inner, fname);
                  if (r === BREAK) return;
                  if (r) return r;
                }
              }
            }
          }
          return;
        }
        case "Return": { const v = node.expr ? evalExpr(node.expr, scope) : V(0); return { sig: "return", value: v }; }
        case "Break": return BREAK;
        case "Continue": return CONTINUE;
        default: return;
      }
    }

    // ---- evaluación de expresiones ----
    function evalExpr(node, scope) {
      tick(node.line);
      switch (node.type) {
        case "Num": return V(node.value, node.isFloat);
        case "Char": return V(node.value, false, true);
        case "Str": return { str: node.value, val: 0, isFloat: false };
        case "Ident": {
          const c = lookup(scope, node.name);
          if (!c) throw { ceError: true, msg: `Variable '${node.name}' no declarada.`, line: node.line };
          if (c.isConst) return V(c.value, false);
          if (c.isArray) return { arrRef: c, val: 0 };
          return V(c.value, c.type.isFloat, c.type.isChar);
        }
        case "Comma": evalExpr(node.left, scope); return evalExpr(node.right, scope);
        case "Ternary": return truth(evalExpr(node.cond, scope)) ? evalExpr(node.a, scope) : evalExpr(node.b, scope);
        case "Assign": return doAssign(node, scope);
        case "Update": return doUpdate(node, scope);
        case "Unary": return doUnary(node, scope);
        case "Binary": return doBinary(node, scope);
        case "Index": { const ref = resolveLValue(node, scope); return V(ref.get(), ref.type.isFloat, ref.type.isChar); }
        case "Call": return doCall(node, scope);
        default: throw { ceError: true, msg: "Expresión no soportada: " + node.type, line: node.line };
      }
    }

    function truth(v) { return toNum(v) !== 0; }

    function resolveLValue(node, scope) {
      if (node.type === "Ident") {
        const c = lookup(scope, node.name);
        if (!c) throw { ceError: true, msg: `Variable '${node.name}' no declarada.`, line: node.line };
        return { get: () => c.value, set: (x) => { c.value = c.type.isFloat ? x : Math.trunc(x); }, type: c.type, cell: c };
      }
      if (node.type === "Index") {
        const base = node.arr;
        const c = lookup(scope, base.name);
        if (!c || !c.isArray) throw { ceError: true, msg: `'${base.name}' no es un arreglo.`, line: node.line };
        const idx = Math.trunc(toNum(evalExpr(node.index, scope)));
        return {
          get: () => (c.arr[idx] || 0),
          set: (x) => { c.arr[idx] = c.type.isFloat ? x : Math.trunc(x); },
          type: c.type, cell: c, index: idx
        };
      }
      if (node.type === "Unary" && node.op === "*") {
        return resolveLValue(node.arg, scope);
      }
      throw { ceError: true, msg: "Destino de asignación inválido.", line: node.line };
    }

    function doAssign(node, scope) {
      const lv = resolveLValue(node.target, scope);
      let rv = toNum(evalExpr(node.value, scope));
      if (node.op !== "=") {
        const cur = lv.get();
        if (node.op === "+=") rv = cur + rv;
        else if (node.op === "-=") rv = cur - rv;
        else if (node.op === "*=") rv = cur * rv;
        else if (node.op === "/=") rv = lv.type.isFloat ? cur / rv : Math.trunc(cur / rv);
        else if (node.op === "%=") rv = cur % rv;
      }
      lv.set(rv);
      return V(lv.get(), lv.type.isFloat, lv.type.isChar);
    }

    function doUpdate(node, scope) {
      const lv = resolveLValue(node.arg, scope);
      const old = lv.get();
      const nv = node.op === "++" ? old + 1 : old - 1;
      lv.set(nv);
      return V(node.prefix ? lv.get() : old, lv.type.isFloat);
    }

    function doUnary(node, scope) {
      if (node.op === "&") { return evalExpr(node.arg, scope); } // dirección: devolvemos el valor (uso en scanf se maneja aparte)
      const v = evalExpr(node.arg, scope);
      const x = toNum(v);
      switch (node.op) {
        case "-": return V(-x, v.isFloat);
        case "+": return V(x, v.isFloat);
        case "!": return V(x === 0 ? 1 : 0, false);
        case "~": return V(~Math.trunc(x), false);
        case "*": return v;
        default: return v;
      }
    }

    function doBinary(node, scope) {
      const a = evalExpr(node.left, scope);
      // cortocircuito
      if (node.op === "&&") return V(truth(a) ? (truth(evalExpr(node.right, scope)) ? 1 : 0) : 0, false);
      if (node.op === "||") return V(truth(a) ? 1 : (truth(evalExpr(node.right, scope)) ? 1 : 0), false);
      const b = evalExpr(node.right, scope);
      const x = toNum(a), y = toNum(b);
      const f = a.isFloat || b.isFloat;
      switch (node.op) {
        case "+": return V(x + y, f);
        case "-": return V(x - y, f);
        case "*": return V(x * y, f);
        case "/":
          if (y === 0) throw { ceError: true, msg: "División por cero.", line: node.line };
          return V(f ? x / y : Math.trunc(x / y), f);
        case "%":
          if (Math.trunc(y) === 0) throw { ceError: true, msg: "Módulo por cero.", line: node.line };
          return V(Math.trunc(x) % Math.trunc(y), false);
        case "<": return V(x < y ? 1 : 0, false);
        case ">": return V(x > y ? 1 : 0, false);
        case "<=": return V(x <= y ? 1 : 0, false);
        case ">=": return V(x >= y ? 1 : 0, false);
        case "==": return V(x === y ? 1 : 0, false);
        case "!=": return V(x !== y ? 1 : 0, false);
        case "&": return V(Math.trunc(x) & Math.trunc(y), false);
        case "|": return V(Math.trunc(x) | Math.trunc(y), false);
        case "^": return V(Math.trunc(x) ^ Math.trunc(y), false);
        case "<<": return V(Math.trunc(x) << Math.trunc(y), false);
        case ">>": return V(Math.trunc(x) >> Math.trunc(y), false);
        default: throw { ceError: true, msg: "Operador no soportado: " + node.op, line: node.line };
      }
    }

    // ---- llamadas a funciones ----
    function doCall(node, scope) {
      const name = node.callee.type === "Ident" ? node.callee.name : null;
      if (name && BUILTINS[name]) return BUILTINS[name](node, scope);
      if (name && ctx.funcs[name]) return callUser(ctx.funcs[name], node.args, scope, node.line);
      throw { ceError: true, msg: `Función '${name}' no definida.`, line: node.line };
    }

    function callUser(fn, argNodes, scope, line) {
      tick(line);
      const local = Scope(globalScope);
      fn.params.forEach((p, i) => {
        const an = argNodes[i];
        if (p.isArr) {
          // pasar arreglo por referencia
          if (an && an.type === "Ident") {
            const c = lookup(scope, an.name);
            if (c && c.isArray) { local.vars[p.name] = c; return; }
          }
          const v = an ? evalExpr(an, scope) : V(0);
          local.vars[p.name] = { cell: true, isArray: true, type: p.ptype, arr: v.arrRef ? v.arrRef.arr : [], len: v.arrRef ? v.arrRef.len : 0 };
        } else {
          const v = an ? coerce(evalExpr(an, scope), p.ptype) : V(0);
          local.vars[p.name] = { cell: true, type: p.ptype, value: v.val, isFloat: p.ptype.isFloat, isChar: p.ptype.isChar };
        }
      });
      try {
        for (const s of fn.body.body) {
          const r = execStmt(s, local, fn.name);
          if (r && r.sig === "return") return r.value || V(0);
        }
      } catch (e) {
        if (e && e.__return) return e.__return.value || V(0);
        throw e;
      }
      return V(0);
    }

    /* ---- funciones de librería ---- */
    function argList(node, scope) { return node.args.map(a => evalExpr(a, scope)); }

    const BUILTINS = {
      printf(node, scope) {
        const fmtNode = node.args[0];
        const fmt = fmtNode.type === "Str" ? fmtNode.value : strOf(evalExpr(fmtNode, scope), scope);
        const rest = node.args.slice(1);
        const s = doFormat(fmt, rest, scope);
        ctx.output += s;
        return V(s.length, false);
      },
      puts(node, scope) {
        const a = node.args[0];
        const s = a.type === "Str" ? a.value : strOf(evalExpr(a, scope), scope);
        ctx.output += s + "\n"; return V(0);
      },
      putchar(node, scope) { const v = toNum(evalExpr(node.args[0], scope)); ctx.output += String.fromCharCode(v); return V(v); },
      gets(node, scope) {
        const ref = arrRefOf(node.args[0], scope);
        const line = stdin.readLine();
        writeStr(ref, line); return V(0);
      },
      scanf(node, scope) {
        const fmt = node.args[0].type === "Str" ? node.args[0].value : "";
        const specs = (fmt.match(/%[ -0-9.lu]*[difcsu]/g) || []);
        let argi = 1; let count = 0;
        for (const sp of specs) {
          const conv = sp[sp.length - 1];
          const arg = node.args[argi++];
          if (!arg) break;
          if (conv === "s") {
            const ref = arrRefOf(arg, scope);
            const tok = stdin.readToken();
            if (tok === null) break;
            writeStr(ref, tok); count++;
          } else if (conv === "c") {
            const lv = lvalueForScanf(arg, scope);
            const ch = stdin.readChar();
            if (ch === null) break;
            lv.set(ch.charCodeAt(0)); count++;
          } else {
            const lv = lvalueForScanf(arg, scope);
            const tok = stdin.readToken();
            if (tok === null) break;
            const num = (conv === "f") ? parseFloat(tok) : parseInt(tok, 10);
            lv.set(isNaN(num) ? 0 : num); count++;
          }
        }
        return V(count, false);
      },
      getchar(node, scope) { const ch = stdin.readChar(); return V(ch === null ? -1 : ch.charCodeAt(0), false); },
      fflush() { return V(0); },
      sqrt(node, scope) { return V(Math.sqrt(toNum(evalExpr(node.args[0], scope))), true); },
      pow(node, scope) { return V(Math.pow(toNum(evalExpr(node.args[0], scope)), toNum(evalExpr(node.args[1], scope))), true); },
      abs(node, scope) { return V(Math.trunc(Math.abs(toNum(evalExpr(node.args[0], scope)))), false); },
      fabs(node, scope) { return V(Math.abs(toNum(evalExpr(node.args[0], scope))), true); },
      floor(node, scope) { return V(Math.floor(toNum(evalExpr(node.args[0], scope))), true); },
      ceil(node, scope) { return V(Math.ceil(toNum(evalExpr(node.args[0], scope))), true); },
      round(node, scope) { return V(Math.round(toNum(evalExpr(node.args[0], scope))), true); },
      strlen(node, scope) { return V(readStr(node.args[0], scope).length, false); },
      strcpy(node, scope) { const ref = arrRefOf(node.args[0], scope); writeStr(ref, readStr(node.args[1], scope)); return V(0); },
      strcat(node, scope) { const ref = arrRefOf(node.args[0], scope); const cur = readStr(node.args[0], scope); writeStr(ref, cur + readStr(node.args[1], scope)); return V(0); },
      strcmp(node, scope) { const a = readStr(node.args[0], scope), b = readStr(node.args[1], scope); return V(a < b ? -1 : a > b ? 1 : 0, false); },
      atoi(node, scope) { const s = readStr(node.args[0], scope); const n = parseInt(s, 10); return V(isNaN(n) ? 0 : n, false); },
      toupper(node, scope) { const c = toNum(evalExpr(node.args[0], scope)); return V(String.fromCharCode(c).toUpperCase().charCodeAt(0), false); },
      tolower(node, scope) { const c = toNum(evalExpr(node.args[0], scope)); return V(String.fromCharCode(c).toLowerCase().charCodeAt(0), false); },
      toascii(node, scope) { return V(toNum(evalExpr(node.args[0], scope)) & 0x7f, false); },
      isdigit(node, scope) { const c = toNum(evalExpr(node.args[0], scope)); return V(c >= 48 && c <= 57 ? 1 : 0, false); },
      isalpha(node, scope) { const c = toNum(evalExpr(node.args[0], scope)); return V(/[A-Za-z]/.test(String.fromCharCode(c)) ? 1 : 0, false); },
      isupper(node, scope) { const c = toNum(evalExpr(node.args[0], scope)); return V(c >= 65 && c <= 90 ? 1 : 0, false); },
      islower(node, scope) { const c = toNum(evalExpr(node.args[0], scope)); return V(c >= 97 && c <= 122 ? 1 : 0, false); },
      isspace(node, scope) { const c = toNum(evalExpr(node.args[0], scope)); return V(/\s/.test(String.fromCharCode(c)) ? 1 : 0, false); },
    };

    // helpers de cadenas/arreglos
    function arrRefOf(argNode, scope) {
      let n = argNode;
      if (n.type === "Unary" && n.op === "&") n = n.arg;
      if (n.type === "Ident") {
        const c = lookup(scope, n.name);
        if (c && c.isArray) return c;
      }
      if (n.type === "Index") {
        const c = lookup(scope, n.arr.name);
        const start = Math.trunc(toNum(evalExpr(n.index, scope)));
        if (c && c.isArray) return { _slice: c, _start: start, get arr() { return c.arr; }, len: c.len, type: c.type };
      }
      throw { ceError: true, msg: "Se esperaba un arreglo de caracteres.", line: argNode.line };
    }
    function writeStr(ref, str) {
      const arr = ref.arr; const start = ref._start || 0;
      for (let k = 0; k < str.length; k++) arr[start + k] = str.charCodeAt(k);
      arr[start + str.length] = 0;
    }
    function readStr(argNode, scope) {
      let n = argNode;
      if (n.type === "Str") return n.value;
      if (n.type === "Unary" && n.op === "&") n = n.arg;
      let c, start = 0;
      if (n.type === "Ident") { c = lookup(scope, n.name); }
      else if (n.type === "Index") { c = lookup(scope, n.arr.name); start = Math.trunc(toNum(evalExpr(n.index, scope))); }
      if (!c || !c.isArray) {
        const v = evalExpr(argNode, scope); if (v.str !== undefined) return v.str;
        throw { ceError: true, msg: "Se esperaba una cadena.", line: argNode.line };
      }
      let s = "";
      for (let k = start; k < c.arr.length; k++) { if (c.arr[k] === 0 || c.arr[k] === undefined) break; s += String.fromCharCode(c.arr[k]); }
      return s;
    }
    function lvalueForScanf(argNode, scope) {
      let n = argNode;
      if (n.type === "Unary" && n.op === "&") n = n.arg;
      return resolveLValue(n, scope);
    }
    function strOf(v, scope) { if (v && v.str !== undefined) return v.str; if (v && v.arrRef) { let s = ""; for (const code of v.arrRef.arr) { if (!code) break; s += String.fromCharCode(code); } return s; } return String(toNum(v)); }

    // ---- printf format ----
    function doFormat(fmt, argNodes, scope) {
      let res = ""; let ai = 0;
      for (let k = 0; k < fmt.length; k++) {
        const ch = fmt[k];
        if (ch === "%") {
          if (fmt[k + 1] === "%") { res += "%"; k++; continue; }
          let spec = "%"; k++;
          while (k < fmt.length && /[-+ 0-9.lhu]/.test(fmt[k]) && !/[difcsuxoeEgG]/.test(fmt[k])) { spec += fmt[k]; k++; }
          const conv = fmt[k]; spec += conv;
          const arg = argNodes[ai++];
          res += formatOne(spec, conv, arg, scope);
        } else res += ch;
      }
      return res;
    }
    function formatOne(spec, conv, argNode, scope) {
      if (conv === undefined) return spec;
      if (conv === "s") { return padStr(spec, readStr(argNode, scope)); }
      if (conv === "c") { const v = toNum(evalExpr(argNode, scope)); return String.fromCharCode(v); }
      const v = argNode ? toNum(evalExpr(argNode, scope)) : 0;
      if (conv === "f" || conv === "e" || conv === "g" || conv === "E" || conv === "G") {
        let prec = 6; const m = spec.match(/\.(\d+)/); if (m) prec = parseInt(m[1], 10);
        let s = v.toFixed(prec);
        return padNum(spec, s);
      }
      if (conv === "x") return padNum(spec, Math.trunc(v).toString(16));
      if (conv === "o") return padNum(spec, Math.trunc(v).toString(8));
      // enteros d i u
      let s = String(Math.trunc(v));
      return padNum(spec, s);
    }
    function padStr(spec, s) {
      const m = spec.match(/%(-?)(\d+)/); if (!m) return s;
      const left = m[1] === "-"; const w = parseInt(m[2], 10);
      if (s.length >= w) return s;
      const pad = " ".repeat(w - s.length);
      return left ? s + pad : pad + s;
    }
    function padNum(spec, s) {
      const m = spec.match(/%(-?)(0?)(\d+)/); if (!m) return s;
      const left = m[1] === "-"; const zero = m[2] === "0"; const w = parseInt(m[3], 10);
      if (s.length >= w) return s;
      const padChar = (zero && !left) ? "0" : " ";
      const pad = padChar.repeat(w - s.length);
      if (left) return s + " ".repeat(w - s.length);
      if (zero && s[0] === "-") return "-" + "0".repeat(w - s.length) + s.slice(1);
      return pad + s;
    }

    // ---- arranque: ejecutar main ----
    try {
      processGlobals(globalScope);
      const main = ctx.funcs["main"];
      if (!main) throw { ceError: true, msg: "No se encontró la función main(). Todo programa C necesita 'int main()'.", line: 1 };
      const local = Scope(globalScope);
      try {
        for (const s of main.body.body) {
          const r = execStmt(s, local, "main");
          if (r && r.sig === "return") break;
        }
      } catch (e) { if (e && e.__return) { /* return desde main */ } else throw e; }
    } catch (e) {
      if (e && e.ceError) { out.error = e.msg; out.errorLine = e.line; }
      else out.error = "Error en tiempo de ejecución: " + (e && e.message ? e.message : e);
    }

    out.output = ctx.output;
    out.trace = ctx.trace;
    out.traceFull = ctx.traceFull;
    out.steps = ctx.steps;
    return out;
  }

  /* ------------------------- STDIN ------------------------- */
  function makeStdin(raw) {
    let pos = 0;
    const s = raw;
    function skipWs() { while (pos < s.length && /\s/.test(s[pos])) pos++; }
    return {
      readToken() { skipWs(); if (pos >= s.length) return null; let t = ""; while (pos < s.length && !/\s/.test(s[pos])) { t += s[pos]; pos++; } return t; },
      readChar() { skipWs(); if (pos >= s.length) return null; return s[pos++]; },
      readLine() { if (pos >= s.length) return ""; let t = ""; while (pos < s.length && s[pos] !== "\n") { t += s[pos]; pos++; } if (s[pos] === "\n") pos++; return t; }
    };
  }

  /* ------------------------- HIGHLIGHTER ------------------------- */
  // Resalta código C para mostrar (no para editar). Devuelve HTML.
  const HL_KW = new Set(["if", "else", "for", "while", "do", "switch", "case", "default", "break", "continue", "return", "struct", "typedef", "enum", "sizeof", "const", "include", "define"]);
  const HL_TYPE = new Set(["int", "float", "double", "char", "void", "short", "long", "unsigned", "signed", "main"]);
  const HL_FN = new Set(["printf", "scanf", "puts", "gets", "getchar", "putchar", "sqrt", "pow", "abs", "fabs", "strlen", "strcpy", "strcmp", "strcat", "atoi", "toupper", "tolower", "isdigit", "isalpha", "isupper", "islower", "fflush"]);
  function escapeHtml(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function highlight(code) {
    let i = 0, n = code.length, out = "";
    while (i < n) {
      const c = code[i];
      // comentarios
      if (c === "/" && code[i + 1] === "/") { let j = i; while (j < n && code[j] !== "\n") j++; out += `<span class="c-com">${escapeHtml(code.slice(i, j))}</span>`; i = j; continue; }
      if (c === "/" && code[i + 1] === "*") { let j = i + 2; while (j < n && !(code[j] === "*" && code[j + 1] === "/")) j++; j += 2; out += `<span class="c-com">${escapeHtml(code.slice(i, Math.min(j, n)))}</span>`; i = j; continue; }
      // preprocesador
      if (c === "#") { let j = i; while (j < n && code[j] !== "\n") j++; out += `<span class="c-pre">${escapeHtml(code.slice(i, j))}</span>`; i = j; continue; }
      // cadena
      if (c === '"') { let j = i + 1; while (j < n && code[j] !== '"') { if (code[j] === "\\") j++; j++; } j++; out += `<span class="c-str">${escapeHtml(code.slice(i, Math.min(j, n)))}</span>`; i = j; continue; }
      // caracter
      if (c === "'") { let j = i + 1; while (j < n && code[j] !== "'") { if (code[j] === "\\") j++; j++; } j++; out += `<span class="c-str">${escapeHtml(code.slice(i, Math.min(j, n)))}</span>`; i = j; continue; }
      // número
      if (/[0-9]/.test(c)) { let j = i; while (j < n && /[0-9.xXa-fA-F]/.test(code[j])) j++; out += `<span class="c-num">${escapeHtml(code.slice(i, j))}</span>`; i = j; continue; }
      // identificador
      if (/[A-Za-z_]/.test(c)) {
        let j = i; while (j < n && /[A-Za-z0-9_]/.test(code[j])) j++;
        const w = code.slice(i, j);
        let cls = ""; if (HL_KW.has(w)) cls = "c-kw"; else if (HL_TYPE.has(w)) cls = "c-type"; else if (HL_FN.has(w)) cls = "c-fn";
        out += cls ? `<span class="${cls}">${w}</span>` : escapeHtml(w);
        i = j; continue;
      }
      out += escapeHtml(c); i++;
    }
    return out;
  }

  window.CEngine = { run, highlight, escapeHtml };
})();
