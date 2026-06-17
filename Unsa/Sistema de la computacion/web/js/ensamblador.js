/* ============================================================
   HERRAMIENTA: Simulador / Ejecutor de Ensamblador 8086
   Parser por línea + ejecutor con registros, banderas y saltos.
   Instrucciones: MOV ADD SUB INC DEC MUL CMP AND OR XOR NOT NEG
                  JMP JZ/JE JNZ/JNE JG JL LOOP NOP HLT
   Aritmética en 16 bits (wrap a 0xFFFF), actualiza ZF/SF/CF/OF.
   ============================================================ */
(function () {
  "use strict";
  const Tools = (window.Tools = window.Tools || {});

  const EXAMPLE = `; Ejemplo: suma, bucle y comparacion
        MOV AX, 5      ; AX = 5
        ADD AX, 3      ; AX = 8
        MOV CX, 3      ; contador del bucle
        MOV BX, 0
bucle:
        ADD BX, AX     ; BX = BX + AX
        LOOP bucle     ; repite 3 veces -> BX = 24

        MOV DX, 0Ah    ; 0x0A = 10 (hexadecimal con sufijo h)
        CMP DX, 10
        JE  iguales    ; salta porque DX == 10
        MOV DX, 0FFFFh
iguales:
        HLT`;

  /* registros de 16 bits */
  const REG16 = ["AX", "BX", "CX", "DX", "SI", "DI", "BP", "SP"];
  /* mitades de 8 bits -> [registro padre, "H"|"L"] */
  const REG8 = {
    AH: ["AX", "H"], AL: ["AX", "L"],
    BH: ["BX", "H"], BL: ["BX", "L"],
    CH: ["CX", "H"], CL: ["CX", "L"],
    DH: ["DX", "H"], DL: ["DX", "L"],
  };

  function freshState() {
    const r = {};
    REG16.forEach(n => (r[n] = 0));
    return {
      reg: r,
      flags: { ZF: 0, SF: 0, CF: 0, OF: 0 },
      ip: 0,
      halted: false,
    };
  }

  const u16 = v => v & 0xffff;
  const hex4 = v => "0x" + u16(v).toString(16).toUpperCase().padStart(4, "0");

  function isReg(name) {
    const n = name.toUpperCase();
    return REG16.indexOf(n) >= 0 || Object.prototype.hasOwnProperty.call(REG8, n);
  }

  function readReg(st, name) {
    const n = name.toUpperCase();
    if (REG16.indexOf(n) >= 0) return st.reg[n];
    const [parent, half] = REG8[n];
    const v = st.reg[parent];
    return half === "H" ? (v >> 8) & 0xff : v & 0xff;
  }

  function writeReg(st, name, val) {
    const n = name.toUpperCase();
    if (REG16.indexOf(n) >= 0) { st.reg[n] = u16(val); return; }
    const [parent, half] = REG8[n];
    const cur = st.reg[parent];
    val = val & 0xff;
    st.reg[parent] = half === "H"
      ? ((val << 8) | (cur & 0x00ff)) & 0xffff
      : ((cur & 0xff00) | val) & 0xffff;
  }

  /* tamaño en bits de un operando registro (8 o 16) */
  function regBits(name) {
    return REG16.indexOf(name.toUpperCase()) >= 0 ? 16 : 8;
  }

  /* parsea un inmediato: decimal, 0x.., ..h, binario ..b. Devuelve número o null */
  function parseImm(tok) {
    let t = tok.trim();
    let neg = false;
    if (t[0] === "+") t = t.slice(1);
    else if (t[0] === "-") { neg = true; t = t.slice(1); }
    let val = null;
    if (/^0x[0-9a-f]+$/i.test(t)) val = parseInt(t.slice(2), 16);
    else if (/^[0-9a-f]+h$/i.test(t)) val = parseInt(t.slice(0, -1), 16);
    else if (/^[01]+b$/i.test(t)) val = parseInt(t.slice(0, -1), 2);
    else if (/^\d+$/.test(t)) val = parseInt(t, 10);
    if (val === null || isNaN(val)) return null;
    return neg ? -val : val;
  }

  /* lee el valor de un operando que es registro o inmediato */
  function readOperand(st, tok) {
    if (isReg(tok)) return readReg(st, tok);
    const imm = parseImm(tok);
    if (imm === null) throw new Error(`Operando inválido: "${tok}"`);
    return u16(imm);
  }

  /* ---- actualización de banderas ---- */
  function setZS(st, result, bits) {
    const mask = bits === 8 ? 0xff : 0xffff;
    const signbit = bits === 8 ? 0x80 : 0x8000;
    const r = result & mask;
    st.flags.ZF = r === 0 ? 1 : 0;
    st.flags.SF = (r & signbit) ? 1 : 0;
  }

  function setAddFlags(st, a, b, bits) {
    const mask = bits === 8 ? 0xff : 0xffff;
    const signbit = bits === 8 ? 0x80 : 0x8000;
    const full = (a & mask) + (b & mask);
    const r = full & mask;
    setZS(st, r, bits);
    st.flags.CF = full > mask ? 1 : 0;
    const sa = a & signbit, sb = b & signbit, sr = r & signbit;
    st.flags.OF = (sa === sb && sr !== sa) ? 1 : 0;
    return r;
  }

  function setSubFlags(st, a, b, bits) {
    const mask = bits === 8 ? 0xff : 0xffff;
    const signbit = bits === 8 ? 0x80 : 0x8000;
    a &= mask; b &= mask;
    const r = (a - b) & mask;
    setZS(st, r, bits);
    st.flags.CF = a < b ? 1 : 0;           // borrow
    const sa = a & signbit, sb = b & signbit, sr = r & signbit;
    st.flags.OF = (sa !== sb && sr !== sa) ? 1 : 0;
    return r;
  }

  function setLogicFlags(st, r, bits) {
    setZS(st, r, bits);
    st.flags.CF = 0;
    st.flags.OF = 0;
  }

  /* ---- parser: convierte una línea en {label, op, args} ---- */
  function parseLine(raw) {
    let line = raw;
    const c = line.indexOf(";");
    if (c >= 0) line = line.slice(0, c);
    line = line.trim();
    if (!line) return null;

    let label = null;
    const lm = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*:(.*)$/);
    if (lm) {
      label = lm[1];
      line = lm[2].trim();
    }
    if (!line) return { label, op: null, args: [] };

    const sp = line.match(/^(\S+)\s*(.*)$/);
    const op = sp[1].toUpperCase();
    const rest = sp[2].trim();
    const args = rest ? rest.split(",").map(s => s.trim()).filter(s => s.length) : [];
    return { label, op, args };
  }

  /* ---- compila el programa: lista de instrucciones + mapa de etiquetas ---- */
  function compile(source) {
    const lines = source.split("\n");
    const prog = [];        // {op, args, srcLine}
    const labels = {};      // nombre -> índice en prog

    lines.forEach((raw, i) => {
      const p = parseLine(raw);
      if (!p) return;
      if (p.label) {
        const key = p.label.toUpperCase();
        if (Object.prototype.hasOwnProperty.call(labels, key))
          throw new Error(`Etiqueta repetida: "${p.label}" (línea ${i + 1})`);
        labels[key] = prog.length;
      }
      if (p.op) prog.push({ op: p.op, args: p.args, srcLine: i + 1 });
    });
    return { prog, labels };
  }

  function need(ins, n) {
    if (ins.args.length !== n)
      throw new Error(`${ins.op} requiere ${n} operando(s) (línea ${ins.srcLine}).`);
  }

  function resolveLabel(labels, tok, ins) {
    const key = tok.toUpperCase();
    if (!Object.prototype.hasOwnProperty.call(labels, key))
      throw new Error(`Etiqueta no definida: "${tok}" (línea ${ins.srcLine}).`);
    return labels[key];
  }

  /* ---- ejecuta una instrucción; devuelve el próximo ip ---- */
  function exec(st, ins, labels) {
    const op = ins.op;
    const a = ins.args;
    let next = st.ip + 1;

    function destWrite(name, val) {
      if (!isReg(name)) throw new Error(`El destino debe ser un registro: "${name}" (línea ${ins.srcLine}).`);
      writeReg(st, name, val);
    }

    switch (op) {
      case "NOP":
        break;

      case "HLT":
        st.halted = true;
        break;

      case "MOV": {
        need(ins, 2);
        destWrite(a[0], readOperand(st, a[1]));
        break;
      }

      case "ADD": {
        need(ins, 2);
        const bits = regBits(a[0]);
        const r = setAddFlags(st, readReg(st, a[0]), readOperand(st, a[1]), bits);
        destWrite(a[0], r);
        break;
      }

      case "SUB": {
        need(ins, 2);
        const bits = regBits(a[0]);
        const r = setSubFlags(st, readReg(st, a[0]), readOperand(st, a[1]), bits);
        destWrite(a[0], r);
        break;
      }

      case "CMP": {
        need(ins, 2);
        const bits = regBits(a[0]);
        setSubFlags(st, readReg(st, a[0]), readOperand(st, a[1]), bits);
        break;
      }

      case "INC": {
        need(ins, 1);
        const bits = regBits(a[0]);
        const cf = st.flags.CF;                 // INC no toca CF
        const r = setAddFlags(st, readReg(st, a[0]), 1, bits);
        st.flags.CF = cf;
        destWrite(a[0], r);
        break;
      }

      case "DEC": {
        need(ins, 1);
        const bits = regBits(a[0]);
        const cf = st.flags.CF;                 // DEC no toca CF
        const r = setSubFlags(st, readReg(st, a[0]), 1, bits);
        st.flags.CF = cf;
        destWrite(a[0], r);
        break;
      }

      case "MUL": {
        // MUL fuente: AX = AX * fuente (resultado 16 bits en AX, alto en DX)
        need(ins, 1);
        const src = readOperand(st, a[0]);
        const prod = (st.reg.AX * src) >>> 0;
        st.reg.AX = prod & 0xffff;
        st.reg.DX = (prod >>> 16) & 0xffff;
        st.flags.CF = st.flags.OF = st.reg.DX !== 0 ? 1 : 0;
        break;
      }

      case "AND": {
        need(ins, 2);
        const bits = regBits(a[0]);
        const r = readReg(st, a[0]) & readOperand(st, a[1]);
        setLogicFlags(st, r, bits);
        destWrite(a[0], r);
        break;
      }

      case "OR": {
        need(ins, 2);
        const bits = regBits(a[0]);
        const r = readReg(st, a[0]) | readOperand(st, a[1]);
        setLogicFlags(st, r, bits);
        destWrite(a[0], r);
        break;
      }

      case "XOR": {
        need(ins, 2);
        const bits = regBits(a[0]);
        const r = readReg(st, a[0]) ^ readOperand(st, a[1]);
        setLogicFlags(st, r, bits);
        destWrite(a[0], r);
        break;
      }

      case "NOT": {
        // NOT no afecta banderas
        need(ins, 1);
        const bits = regBits(a[0]);
        const mask = bits === 8 ? 0xff : 0xffff;
        destWrite(a[0], (~readReg(st, a[0])) & mask);
        break;
      }

      case "NEG": {
        need(ins, 1);
        const bits = regBits(a[0]);
        const r = setSubFlags(st, 0, readReg(st, a[0]), bits);
        destWrite(a[0], r);
        break;
      }

      case "JMP":
        need(ins, 1);
        next = resolveLabel(labels, a[0], ins);
        break;

      case "JZ":
      case "JE":
        need(ins, 1);
        if (st.flags.ZF) next = resolveLabel(labels, a[0], ins);
        break;

      case "JNZ":
      case "JNE":
        need(ins, 1);
        if (!st.flags.ZF) next = resolveLabel(labels, a[0], ins);
        break;

      case "JG":   // mayor (con signo): ZF=0 y SF=OF
        need(ins, 1);
        if (st.flags.ZF === 0 && st.flags.SF === st.flags.OF)
          next = resolveLabel(labels, a[0], ins);
        break;

      case "JL":   // menor (con signo): SF != OF
        need(ins, 1);
        if (st.flags.SF !== st.flags.OF)
          next = resolveLabel(labels, a[0], ins);
        break;

      case "LOOP": {
        need(ins, 1);
        st.reg.CX = u16(st.reg.CX - 1);
        if (st.reg.CX !== 0) next = resolveLabel(labels, a[0], ins);
        break;
      }

      default:
        throw new Error(`Instrucción no reconocida: "${op}" (línea ${ins.srcLine}).`);
    }
    return next;
  }

  /* ---- corre el programa completo (o un solo paso) ---- */
  const MAX_STEPS = 10000;

  function run(state, prog, labels) {
    let steps = 0;
    while (!state.halted && state.ip < prog.length) {
      if (++steps > MAX_STEPS)
        throw new Error(`Límite de ${MAX_STEPS} pasos alcanzado (¿bucle infinito?).`);
      state.ip = exec(state, prog[state.ip], labels);
    }
    if (state.ip >= prog.length) state.halted = true;
    return steps;
  }

  function step(state, prog, labels) {
    if (state.halted || state.ip >= prog.length) { state.halted = true; return; }
    state.ip = exec(state, prog[state.ip], labels);
    if (state.ip >= prog.length) state.halted = true;
  }

  /* ============================ UI ============================ */
  Tools.ensamblador = function (mount) {
    mount.innerHTML = `
      <div class="tool asm-tool">
        <div class="field">
          <label>Programa ensamblador 8086</label>
          <textarea id="asm-src" spellcheck="false"
            style="width:100%;min-height:240px;font-family:ui-monospace,Consolas,monospace;font-size:13px;line-height:1.5;white-space:pre;tab-size:8"></textarea>
        </div>

        <div class="proc-actions" style="display:flex;gap:8px;flex-wrap:wrap;margin:10px 0">
          <button class="btn btn--primary" id="asm-run">▶ Ejecutar</button>
          <button class="btn" id="asm-step">⏭ Paso a paso</button>
          <button class="btn btn--ghost" id="asm-reset">↺ Reiniciar</button>
          <button class="btn btn--ghost" id="asm-ex">Cargar ejemplo</button>
        </div>

        <div id="asm-status" style="margin:8px 0"></div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;align-items:start">
          <div>
            <h3 style="margin:6px 0">Registros</h3>
            <div class="tbl-wrap"><table class="tbl tbl--left" id="asm-regs"></table></div>
          </div>
          <div>
            <h3 style="margin:6px 0">Banderas</h3>
            <div class="tbl-wrap"><table class="tbl tbl--left" id="asm-flags"></table></div>
            <h3 style="margin:14px 0 6px">Estado</h3>
            <pre class="code" id="asm-info" style="margin:0;font-size:12px"></pre>
          </div>
        </div>
      </div>`;

    const srcEl = mount.querySelector("#asm-src");
    const statusEl = mount.querySelector("#asm-status");
    const regsEl = mount.querySelector("#asm-regs");
    const flagsEl = mount.querySelector("#asm-flags");
    const infoEl = mount.querySelector("#asm-info");

    srcEl.value = EXAMPLE;

    let state = freshState();
    let compiled = null;     // {prog, labels} para modo paso a paso
    let lastSrc = null;

    function toSigned(v) {
      return v & 0x8000 ? v - 0x10000 : v;
    }

    function renderRegs() {
      const rows = REG16.map(n => {
        const v = state.reg[n];
        let halves = "";
        if (["AX", "BX", "CX", "DX"].indexOf(n) >= 0) {
          const hi = (v >> 8) & 0xff, lo = v & 0xff;
          halves = `${n[0]}H=${hi.toString(16).toUpperCase().padStart(2, "0")} ${n[0]}L=${lo.toString(16).toUpperCase().padStart(2, "0")}`;
        }
        return `<tr><td><strong>${n}</strong></td><td>${hex4(v)}</td><td>${v}</td><td>${toSigned(v)}</td><td style="font-family:monospace;font-size:11px;color:#64748b">${halves}</td></tr>`;
      }).join("");
      regsEl.innerHTML =
        `<thead><tr><th>Reg</th><th>Hex</th><th>Dec</th><th>Con signo</th><th>Mitades</th></tr></thead><tbody>${rows}</tbody>`;
    }

    function renderFlags() {
      const f = state.flags;
      const cell = (k, name) =>
        `<tr><td><strong>${k}</strong></td><td>${f[k]}</td><td style="color:#64748b">${name}</td></tr>`;
      flagsEl.innerHTML =
        `<thead><tr><th>Bandera</th><th>Valor</th><th></th></tr></thead><tbody>` +
        cell("ZF", "cero") + cell("SF", "signo") + cell("CF", "acarreo") + cell("OF", "overflow") +
        `</tbody>`;
    }

    function renderInfo() {
      let where = "—";
      if (compiled && state.ip < compiled.prog.length && !state.halted)
        where = "línea " + compiled.prog[state.ip].srcLine;
      infoEl.textContent =
        `IP (índice): ${state.ip}\n` +
        `Próxima:     ${where}\n` +
        `Detenido:    ${state.halted ? "sí" : "no"}`;
    }

    function renderAll() { renderRegs(); renderFlags(); renderInfo(); }

    function status(html, kind) {
      const color = kind === "err" ? "#b91c1c" : kind === "ok" ? "#15803d" : "#475569";
      statusEl.innerHTML = `<div class="result-box" style="border-left:3px solid ${color};color:${color}">${html}</div>`;
    }

    function reset() {
      state = freshState();
      compiled = null;
      lastSrc = null;
      renderAll();
      status("Listo. Escribí un programa y presioná <strong>Ejecutar</strong>.", "info");
    }

    function doRun() {
      try {
        const { prog, labels } = compile(srcEl.value);
        state = freshState();
        if (!prog.length) { renderAll(); status("El programa está vacío.", "info"); return; }
        const steps = run(state, prog, labels);
        compiled = { prog, labels };
        lastSrc = srcEl.value;
        renderAll();
        status(`Ejecución completa en <strong>${steps}</strong> paso(s).`, "ok");
      } catch (e) {
        renderAll();
        status("⚠️ " + e.message, "err");
      }
    }

    function doStep() {
      try {
        // (re)compilar si cambió el código o no hay sesión activa
        if (!compiled || lastSrc !== srcEl.value) {
          const { prog, labels } = compile(srcEl.value);
          state = freshState();
          compiled = { prog, labels };
          lastSrc = srcEl.value;
          if (!prog.length) { renderAll(); status("El programa está vacío.", "info"); return; }
          renderAll();
          status("Sesión paso a paso iniciada. Presioná <strong>Paso a paso</strong> para avanzar.", "info");
          return;
        }
        if (state.halted) { status("Programa finalizado. Presioná <strong>Reiniciar</strong>.", "info"); return; }
        const cur = compiled.prog[state.ip];
        step(state, compiled.prog, compiled.labels);
        renderAll();
        status(`Ejecutada: <code>${cur.op} ${cur.args.join(", ")}</code> (línea ${cur.srcLine}).`, "ok");
      } catch (e) {
        renderAll();
        status("⚠️ " + e.message, "err");
      }
    }

    mount.querySelector("#asm-run").addEventListener("click", doRun);
    mount.querySelector("#asm-step").addEventListener("click", doStep);
    mount.querySelector("#asm-reset").addEventListener("click", reset);
    mount.querySelector("#asm-ex").addEventListener("click", () => {
      srcEl.value = EXAMPLE; reset();
    });

    reset();
  };
})();
