/* ============================================================
   HERRAMIENTA: Terminal interactiva (shell Linux simulado)
   Sistema de archivos y procesos ficticios para practicar comandos:
   ls, cd, cat, pwd, mkdir, touch, rm, ps, top, kill, free, df, uname...
   ============================================================ */
(function () {
  "use strict";

  const USER = "alumno", HOST = "sisop";

  function makeFS() {
    return {
      type: "dir", children: {
        home: { type: "dir", children: {
          alumno: { type: "dir", children: {
            "readme.txt": { type: "file", content: "Bienvenido/a a la terminal de práctica de Sistemas Operativos.\nProbá: ls, cd practicas, cat hola.c, ps aux, top, free, uname -a\nEscribí 'help' para ver todos los comandos." },
            "hola.c": { type: "file", content: "#include <stdio.h>\nint main(){ printf(\"Hola, SO!\\n\"); return 0; }" },
            practicas: { type: "dir", children: {
              "tp1.txt": { type: "file", content: "TP1 - Fundamentos: evolución y arquitecturas de los SO." },
              "notas.md": { type: "file", content: "# Notas\n- Proceso = programa en ejecución\n- PCB guarda el estado del proceso" },
            }},
          }},
        }},
        etc: { type: "dir", children: {
          hostname: { type: "file", content: "sisop-pc" },
          "os-release": { type: "file", content: "NAME=\"SisOp Linux\"\nVERSION=\"1.0 (Estudio)\"" },
        }},
        dev: { type: "dir", children: { null: { type: "file", content: "" }, sda: { type: "file", content: "" } } },
        bin: { type: "dir", children: { ls: { type: "file", content: "" }, ps: { type: "file", content: "" }, top: { type: "file", content: "" } } },
      }
    };
  }

  const PROCS = [
    { pid: 1, user: "root", cpu: "0.0", mem: "0.1", stat: "S", cmd: "/sbin/init" },
    { pid: 412, user: "root", cpu: "0.3", mem: "0.5", stat: "S", cmd: "systemd-journald" },
    { pid: 845, user: "alumno", cpu: "1.2", mem: "2.1", stat: "S", cmd: "bash" },
    { pid: 1203, user: "alumno", cpu: "8.5", mem: "12.4", stat: "R", cmd: "firefox" },
    { pid: 1456, user: "alumno", cpu: "0.7", mem: "3.2", stat: "S", cmd: "code" },
    { pid: 1789, user: "root", cpu: "0.0", mem: "0.2", stat: "S", cmd: "sshd" },
    { pid: 2051, user: "alumno", cpu: "2.4", mem: "0.8", stat: "R", cmd: "top" },
  ];

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function pad(s, n) { s = String(s); return s + " ".repeat(Math.max(0, n - s.length)); }

  function build(container) {
    let procs = PROCS.map(p => ({ ...p }));
    const fs = makeFS();
    let cwd = ["home", "alumno"]; // path array
    const history = []; let hi = 0;

    container.innerHTML = `
      <div class="tool" style="padding:0;background:none;border:none;box-shadow:none">
        <div class="terminal">
          <div class="terminal__bar">
            <span class="terminal__dot" style="background:#ff5f56"></span>
            <span class="terminal__dot" style="background:#ffbd2e"></span>
            <span class="terminal__dot" style="background:#27c93f"></span>
            <span class="terminal__title">${USER}@${HOST}: terminal de práctica</span>
          </div>
          <div class="terminal__body" id="tm-body"></div>
          <div class="terminal__input-row">
            <span class="prompt" id="tm-prompt"></span>
            <input class="terminal__input" id="tm-input" autocomplete="off" spellcheck="false" />
          </div>
        </div>
        <div class="term-hints" id="tm-hints"></div>
      </div>`;

    const body = container.querySelector("#tm-body");
    const input = container.querySelector("#tm-input");
    const promptEl = container.querySelector("#tm-prompt");

    const pathStr = () => "/" + cwd.join("/");
    const shortPath = () => { const s = pathStr(); return s.startsWith("/home/" + USER) ? "~" + s.slice(("/home/" + USER).length) : s; };
    function updatePrompt() { promptEl.textContent = `${USER}@${HOST}:${shortPath()}$`; }

    function nodeAt(parts) {
      let n = fs;
      for (const p of parts) { if (n.type !== "dir" || !n.children[p]) return null; n = n.children[p]; }
      return n;
    }
    function resolve(arg) {
      if (!arg) return cwd.slice();
      let parts = arg.startsWith("/") ? [] : cwd.slice();
      arg.split("/").forEach(seg => {
        if (seg === "" || seg === ".") return;
        if (seg === "..") parts.pop();
        else parts.push(seg);
      });
      return parts;
    }

    function print(html, cls) { const d = document.createElement("div"); d.className = "terminal__line" + (cls ? " " + cls : ""); d.innerHTML = html; body.appendChild(d); body.scrollTop = body.scrollHeight; }
    function printPrompt(cmd) { print(`<span class="prompt">${USER}@${HOST}:${esc(shortPath())}$</span> ${esc(cmd)}`); }

    const HELP = [
      ["ls [-l] [dir]", "lista archivos y carpetas"],
      ["cd <dir>", "cambia de directorio (.. para subir)"],
      ["pwd", "muestra la ruta actual"],
      ["cat <archivo>", "muestra el contenido de un archivo"],
      ["mkdir <dir>", "crea un directorio"],
      ["touch <archivo>", "crea un archivo vacío"],
      ["rm <nombre>", "elimina un archivo o carpeta"],
      ["echo <texto>", "imprime texto"],
      ["ps [aux]", "lista los procesos"],
      ["top", "monitor de procesos (instantánea)"],
      ["kill <pid>", "termina un proceso por su PID"],
      ["free", "uso de memoria"],
      ["df", "uso del disco"],
      ["uname [-a]", "información del sistema"],
      ["whoami", "usuario actual"],
      ["date", "fecha y hora"],
      ["clear", "limpia la pantalla"],
    ];

    function run(line) {
      const parts = line.trim().split(/\s+/);
      const cmd = parts[0]; const args = parts.slice(1);
      if (!cmd) return;
      switch (cmd) {
        case "help": print("Comandos disponibles:"); HELP.forEach(([c, d]) => print(`  <span class="ok">${pad(c, 16)}</span><span class="dim">${d}</span>`)); break;
        case "clear": body.innerHTML = ""; break;
        case "pwd": print(pathStr()); break;
        case "whoami": print(USER); break;
        case "date": print(new Date().toLocaleString("es")); break;
        case "echo": print(esc(args.join(" "))); break;
        case "uname": print(args.includes("-a") ? "SisOp-Linux 6.1.0 x86_64 GNU/Linux" : "Linux"); break;
        case "free": print("              total        usado       libre"); print("Mem:        8000 MB     3120 MB     4880 MB"); print("Swap:       2048 MB        0 MB     2048 MB"); break;
        case "df": print("Sistema    Tamaño  Usado  Disp  Uso%  Montado"); print("/dev/sda1   100G    42G   58G   42%  /"); break;
        case "ls": cmdLs(args); break;
        case "cd": cmdCd(args[0]); break;
        case "cat": cmdCat(args[0]); break;
        case "mkdir": cmdMk(args[0], "dir"); break;
        case "touch": cmdMk(args[0], "file"); break;
        case "rm": cmdRm(args[0]); break;
        case "ps": cmdPs(args); break;
        case "top": cmdTop(); break;
        case "kill": cmdKill(args[0]); break;
        case "man": { const h = HELP.find(x => x[0].split(" ")[0] === args[0]); print(h ? `${h[0]} — ${h[1]}` : `No hay manual para «${esc(args[0] || "")}».`, h ? "" : "err"); break; }
        default: print(`${esc(cmd)}: comando no encontrado. Escribí 'help'.`, "err");
      }
    }

    function cmdLs(args) {
      const flags = args.filter(a => a.startsWith("-")).join("");
      const target = args.find(a => !a.startsWith("-"));
      const n = nodeAt(resolve(target));
      if (!n) { print(`ls: no se encuentra «${esc(target)}»`, "err"); return; }
      if (n.type === "file") { print(esc(target)); return; }
      const names = Object.keys(n.children);
      if (!names.length) { return; }
      if (flags.includes("l")) {
        names.forEach(name => {
          const c = n.children[name];
          const perm = c.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--";
          const size = c.type === "dir" ? 4096 : (c.content ? c.content.length : 0);
          print(`${perm}  ${pad(USER, 7)} ${pad(size, 6)} ${name.endsWith("/") ? name : name}${c.type === "dir" ? "/" : ""}`);
        });
      } else {
        print(names.map(name => n.children[name].type === "dir" ? `<span class="path">${esc(name)}/</span>` : esc(name)).join("   "));
      }
    }
    function cmdCd(arg) {
      if (!arg || arg === "~") { cwd = ["home", USER]; updatePrompt(); return; }
      const parts = resolve(arg); const n = nodeAt(parts);
      if (!n) { print(`cd: no existe el directorio «${esc(arg)}»`, "err"); return; }
      if (n.type !== "dir") { print(`cd: «${esc(arg)}» no es un directorio`, "err"); return; }
      cwd = parts; updatePrompt();
    }
    function cmdCat(arg) {
      if (!arg) { print("cat: falta el nombre del archivo", "err"); return; }
      const n = nodeAt(resolve(arg));
      if (!n) { print(`cat: «${esc(arg)}»: no existe`, "err"); return; }
      if (n.type !== "file") { print(`cat: «${esc(arg)}»: es un directorio`, "err"); return; }
      print(esc(n.content || "").replace(/\n/g, "<br>"));
    }
    function cmdMk(arg, type) {
      if (!arg) { print(`${type === "dir" ? "mkdir" : "touch"}: falta el nombre`, "err"); return; }
      const parts = resolve(arg); const name = parts.pop(); const parent = nodeAt(parts);
      if (!parent || parent.type !== "dir") { print("ruta inválida", "err"); return; }
      if (parent.children[name]) { print(`«${esc(name)}» ya existe`, "err"); return; }
      parent.children[name] = type === "dir" ? { type: "dir", children: {} } : { type: "file", content: "" };
    }
    function cmdRm(arg) {
      if (!arg) { print("rm: falta el nombre", "err"); return; }
      const parts = resolve(arg); const name = parts.pop(); const parent = nodeAt(parts);
      if (!parent || !parent.children[name]) { print(`rm: «${esc(arg)}»: no existe`, "err"); return; }
      delete parent.children[name];
    }
    function cmdPs(args) {
      if (args.includes("aux") || args.join("").includes("aux")) {
        print(`<span class="dim">USER       PID  %CPU %MEM STAT  COMMAND</span>`);
        procs.forEach(p => print(`${pad(p.user, 9)} ${pad(p.pid, 5)} ${pad(p.cpu, 4)} ${pad(p.mem, 4)} ${pad(p.stat, 4)}  ${esc(p.cmd)}`));
      } else {
        print(`<span class="dim">  PID CMD</span>`);
        procs.filter(p => p.user === USER).forEach(p => print(`${pad(p.pid, 5)} ${esc(p.cmd)}`));
      }
    }
    function cmdTop() {
      print(`<span class="dim">top - ${new Date().toLocaleTimeString("es")}  carga: 0,42</span>`);
      print(`<span class="dim">Tareas: ${procs.length} total · ${procs.filter(p => p.stat === "R").length} ejecutando</span>`);
      print(`<span class="dim">%CPU  %MEM  PID  USER       COMMAND</span>`);
      procs.slice().sort((a, b) => parseFloat(b.cpu) - parseFloat(a.cpu)).forEach(p =>
        print(`${pad(p.cpu, 5)} ${pad(p.mem, 5)} ${pad(p.pid, 4)} ${pad(p.user, 9)} ${esc(p.cmd)}`));
    }
    function cmdKill(arg) {
      const pid = parseInt(arg);
      if (!pid) { print("kill: PID inválido", "err"); return; }
      const i = procs.findIndex(p => p.pid === pid);
      if (i < 0) { print(`kill: (${pid}) no existe ese proceso`, "err"); return; }
      if (procs[i].pid === 1) { print("kill: no se puede terminar init (PID 1)", "err"); return; }
      const c = procs[i].cmd; procs.splice(i, 1); print(`<span class="ok">Proceso ${pid} (${esc(c)}) terminado.</span>`);
    }

    // hints
    const hints = ["ls", "cd practicas", "cat hola.c", "ps aux", "top", "free", "uname -a", "kill 1203", "help", "clear"];
    container.querySelector("#tm-hints").innerHTML = hints.map(h => `<button data-cmd="${h}">${h}</button>`).join("");
    container.querySelector("#tm-hints").addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      input.value = b.dataset.cmd; input.focus();
    });

    input.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        const line = input.value;
        printPrompt(line);
        if (line.trim()) { history.push(line); hi = history.length; }
        run(line); input.value = "";
      } else if (e.key === "ArrowUp") { if (hi > 0) { hi--; input.value = history[hi] || ""; } e.preventDefault(); }
      else if (e.key === "ArrowDown") { if (hi < history.length) { hi++; input.value = history[hi] || ""; } e.preventDefault(); }
    });
    container.querySelector(".terminal").addEventListener("click", () => input.focus());

    updatePrompt();
    print(`<span class="dim">Terminal de práctica · escribí <span class="ok">help</span> para ver los comandos.</span>`);
    print("");
    run("cat readme.txt");
  }

  window.Tools = window.Tools || {};
  window.Tools.terminal = build;
})();
