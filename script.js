/* La Guardiana Lorena · lógica del juego (JavaScript nativo, sin dependencias) */
(function () {
'use strict';
const C = CONFIG, R = C.recompensas, KEY = 'guardiana_lorena_v1';
const $ = (s, r) => (r || document).querySelector(s);
const rnd = a => a[Math.floor(Math.random() * a.length)];
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const fill = t => t.replace(/\{mote\}/g, rnd(C.motes)).replace(/\{nombre\}/g, C.jugadora);
const OBJ = {}; C.objetos.forEach(o => OBJ[o.id] = o);
const SHOP = {}; C.tienda.forEach(o => SHOP[o.id] = o);
const MIS = C.misiones, REG = C.regalos;
const RAR = { comun: 'Común', especial: 'Especial', epico: 'Épico', legendario: 'Legendario' };
const CATS = [['todo', 'Todo'], ['equipamiento', 'Equipamiento'], ['arma', 'Armas'], ['armadura', 'Armaduras'], ['consumible', 'Consumibles'], ['aliado', 'Aliados'], ['especial', 'Objetos especiales']];
const STATN = { poder: 'Poder', defensa: 'Defensa', movilidad: 'Movilidad', estilo: 'Estilo', moral: 'Moral', resistencia: 'Resistencia', exploracion: 'Exploración' };
const SLOTS = [['arma', 'Arma'], ['cuerpo', 'Armadura'], ['piernas', 'Pantalón'], ['accesorio', 'Accesorio'], ['cosmetico', 'Cosmético']];

/* ---------- Estado y guardado ---------- */
const def = () => ({ v: 1, iniciado: false, nivel: 0, xp: 0, anac: 0, anacTotal: 0, pts: 0, once: {}, items: {}, equip: {}, team: {}, logros: {}, mis: {}, compras: {}, consum: {}, vales: {}, energia: 100, ultimos: [], chat: [], final: false, evento: false, stats: { ayudas: 0, pruebas: 0 }, cfg: { vol: .6, mute: false } });
let S = load();
function load() { try { const j = JSON.parse(localStorage.getItem(KEY)); if (j && j.v === 1) { const d = def(); return Object.assign(d, j, { cfg: Object.assign(d.cfg, j.cfg || {}), stats: Object.assign(d.stats, j.stats || {}) }); } } catch (e) {} return def(); }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
const mis = i => S.mis[i] || (S.mis[i] = { parte: 0, pistas: [0, 0], extra: [0, 0], ayuda: false, escudo: false, pocion: false, sk: {}, prueba: false, done: false, sinAyuda: false, t0: null });
const lvl = () => 1 + Math.floor(S.xp / C.xpPorNivel);
const titulo = () => C.titulos[Math.min(lvl() - 1, C.titulos.length - 1)];
const regalosHallados = () => REG.filter(r => S.items[r]).length;
const missionsDone = () => MIS.filter((_, i) => S.mis[i] && S.mis[i].done).length;

/* ---------- Audio generado por código ---------- */
let AC, master, mG, sG, timer = null, track = null, stepN = 0;
function ac() { if (!AC) { AC = new (window.AudioContext || window.webkitAudioContext)(); master = AC.createGain(); master.connect(AC.destination); mG = AC.createGain(); mG.gain.value = .5; mG.connect(master); sG = AC.createGain(); sG.gain.value = .9; sG.connect(master); } if (AC.state === 'suspended') AC.resume(); vol(); return AC; }
function vol() { if (master) master.gain.value = S.cfg.mute ? 0 : S.cfg.vol; }
const mf = m => 440 * Math.pow(2, (m - 69) / 12);
function tone(f, t, d, type, g, out) { const o = AC.createOscillator(), e = AC.createGain(); o.type = type || 'sine'; o.frequency.value = f; e.gain.setValueAtTime(0.0001, t); e.gain.linearRampToValueAtTime(g || .15, t + .012); e.gain.exponentialRampToValueAtTime(.0001, t + d); o.connect(e); e.connect(out || sG); o.start(t); o.stop(t + d + .05); }
const seq = (notes, gap, type, g) => { const t = AC.currentTime; notes.forEach((n, i) => tone(mf(n), t + i * gap, gap * 2.4, type, g)); };
const SFX = {
  click() { tone(660, AC.currentTime, .09, 'triangle', .12); },
  coin() { const t = AC.currentTime; tone(mf(86), t, .1, 'square', .05); tone(mf(91), t + .08, .3, 'square', .05); },
  unlock() { seq([72, 76, 79, 84, 88], .09, 'triangle', .13); },
  win() { seq([72, 72, 76, 79, 84, 79, 84, 88], .12, 'triangle', .14); },
  ally() { seq([67, 72, 76, 79, 83, 88], .1, 'sine', .15); },
  level() { seq([69, 73, 76, 81], .1, 'triangle', .14); },
  error() { tone(190, AC.currentTime, .22, 'sawtooth', .07); },
  xmas() { seq([76, 79, 84, 83, 79, 76, 81, 84], .11, 'triangle', .12); }
};
function play(n) { if (S.cfg.mute) return; try { ac(); SFX[n](); } catch (e) {} }
const TR = {
  inicio: { bpm: 92, ch: [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]], mel: 'arp', w: 'triangle' },
  navidad: { bpm: 110, ch: [[60, 64, 67], [65, 69, 72], [67, 71, 74], [60, 64, 67]], mel: [84, 0, 88, 0, 86, 84, 0, 79, 81, 0, 84, 0, 83, 81, 0, 79, 79, 0, 83, 0, 86, 83, 0, 79, 84, 0, 88, 0, 91, 0, 0, 0], w: 'triangle' },
  final: { bpm: 62, ch: [[60, 64, 67], [55, 59, 62], [57, 60, 64], [53, 57, 60]], mel: [0, 0, 79, 0, 0, 0, 76, 0, 0, 0, 74, 0, 0, 0, 72, 0, 0, 0, 81, 0, 0, 0, 79, 0, 0, 0, 77, 0, 0, 0, 76, 0], w: 'sine' }
};
function setMusic(n) { track = n; startMusic(); }
function startMusic() {
  if (!AC || timer || !track) return;
  const tick = () => {
    if (S.cfg.mute || !TR[track]) return;
    const T = TR[track], d = 30 / T.bpm, t = AC.currentTime + .05, i = stepN++, ch = T.ch[Math.floor(i / 8) % T.ch.length];
    if (i % 8 === 0) { ch.forEach(n => tone(mf(n), t, d * 8, 'sine', .035, mG)); tone(mf(ch[0] - 12), t, d * 4, 'sine', .08, mG); }
    if (T.mel === 'arp') tone(mf(ch[[0, 1, 2, 1, 2, 1, 2, 1][i % 8]] + 12), t, d * 2.2, T.w, .045, mG);
    else { const n = T.mel[i % T.mel.length]; if (n) tone(mf(n), t, d * 3, T.w, .05, mG); }
  };
  const loop = () => { const T = TR[track]; timer = setTimeout(() => { tick(); timer = null; loop(); }, 30000 / T.bpm); };
  loop();
}
document.addEventListener('pointerdown', function f() { try { ac(); startMusic(); } catch (e) {} }, { once: true });

/* ---------- Utilidades de interfaz ---------- */
function toast(h, cls) { const d = document.createElement('div'); d.className = 'toast ' + (cls || ''); d.innerHTML = h; $('#toasts').appendChild(d); setTimeout(() => d.remove(), 3200); }
function confetti(n) { const f = $('#fx'), cs = ['#f5c46b', '#8b7bff', '#4fd1c5', '#ff6b81', '#3fae6a']; for (let i = 0; i < (n || 50); i++) { const e = document.createElement('i'); e.className = 'confetti'; e.style.left = Math.random() * 100 + 'vw'; e.style.background = rnd(cs); e.style.animationDuration = 2 + Math.random() * 2.5 + 's'; e.style.animationDelay = Math.random() * .6 + 's'; f.appendChild(e); setTimeout(() => e.remove(), 5500); } }
function hearts(n) { const f = $('#fx'); for (let i = 0; i < n; i++) { const e = document.createElement('span'); e.className = 'heart'; e.textContent = rnd(['💚', '✨', '🎄', '💛', '🤍']); e.style.left = Math.random() * 100 + 'vw'; e.style.fontSize = 14 + Math.random() * 20 + 'px'; e.style.animationDuration = 5 + Math.random() * 5 + 's'; e.style.animationDelay = Math.random() * 4 + 's'; f.appendChild(e); setTimeout(() => e.remove(), 11000); } }
function modal(h, mid) { const m = $('#modal'); m.innerHTML = `<div class="sheet ${mid ? 'mid' : ''}">${h}</div>`; m.hidden = false; m.onclick = e => { if (e.target === m) closeModal(); }; }
function closeModal() { $('#modal').hidden = true; $('#modal').innerHTML = ''; }
function confirmar(txt, ok, cb, tit) { window.__cb = cb; modal(`<h3>${tit || 'Confirmación del sistema'}</h3><p>${txt}</p><div class="row"><button class="btn grow" data-a="cerrar">Cancelar</button><button class="btn primary grow" data-a="okcb">${ok}</button></div>`, true); }
let ovq = [], ovOpen = false;
function ov(html, cb, color, rc) { ovq.push({ html, cb, color, rc }); if (!ovOpen) nextOv(); }
function nextOv() { const o = ovq.shift(), box = $('#ov'); if (!o) { box.hidden = true; box.innerHTML = ''; ovOpen = false; return; } ovOpen = true; box.hidden = false; box.innerHTML = `<div class="ovbox ${o.rc || ''}" style="--c:${o.color || '#8b7bff'}">${o.html}<button class="btn primary big" id="ovok">Continuar</button></div>`; $('#ovok').onclick = () => { play('click'); const c = o.cb; nextOv(); if (c) c(); }; }
function ico(n) { const p = { home: '<path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>', aventura: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>', personaje: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>', inventario: '<path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>', aliados: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.5 3-5 6-5s6 1.5 6 5M15 15c3 0 6 1 6 4"/>', tienda: '<path d="M4 7h16l-1.5 9h-13z"/><circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/>', logros: '<path d="M8 4h8v6a4 4 0 0 1-8 0z"/><path d="M8 6H4v2a3 3 0 0 0 4 3M16 6h4v2a3 3 0 0 1-4 3M12 14v4M8 21h8"/>', chat: '<path d="M4 5h16v11H9l-5 4z"/>', cfg: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>' }; return `<svg class="i" viewBox="0 0 24 24">${p[n]}</svg>`; }
const CASH = '<svg class="cash" viewBox="0 0 24 24"><path d="M4 14c0-5.5 4.5-9.5 10-9.5 3.3 0 5.7 2 5.7 4.3 0 1.3-1 2.4-2.3 2.4-2 0-2.3-2.2-4.2-2.2-2.6 0-3.8 2.8-3.8 5.7 0 2 .9 3.2 2.1 3.2 1 0 2-.9 2-.9l2.2 2.1c-1.2 1.3-3.2 2.3-5.3 2.3C6.7 23.1 4 19.3 4 14z"/></svg>';

/* ---------- Recompensas ---------- */
let busy = false;
function gain(o, key) {
  if (key) { if (S.once[key]) return false; S.once[key] = 1; }
  const pl = lvl(), t = [];
  if (o.xp) { S.xp += o.xp; t.push(`+${o.xp} XP`); }
  if (o.anac) { S.anac += o.anac; S.anacTotal += o.anac; t.push(`+${o.anac} ${CASH}`); }
  if (o.pts) { S.pts += o.pts; t.push(`+${o.pts} pts`); }
  save(); header();
  if (t.length) toast(t.join(' · '), 'reward');
  if (o.anac) play('coin');
  if (lvl() > pl) { play('level'); ov(`<div class="tag" style="color:var(--gold)">SUBIDA DE NIVEL</div><div class="orb lg" style="--c:#f5c46b">⬆️</div><h2 class="shine">¡Nivel ${lvl()}!</h2><p><b>${titulo()}</b></p><p class="mut">«El sistema registra una mejora notable. La paciencia, en cambio, sigue en revisión.»</p>`, null, '#f5c46b'); confetti(40); }
  checkLogros(); return true;
}
const LG = {
  inicio: () => S.iniciado, primer: () => regalosHallados() >= 1,
  m0: () => (S.mis[0] || {}).done, m1: () => (S.mis[1] || {}).done, m2: () => (S.mis[2] || {}).done, m3: () => (S.mis[3] || {}).done, m4: () => (S.mis[4] || {}).done,
  sinayuda: () => Object.values(S.mis).some(m => m.done && m.sinAyuda),
  paciencia: () => Object.values(S.mis).some(m => m.pistas.some(p => p >= 3)),
  anacardos: () => S.anacTotal >= 500, comprador: () => Object.keys(S.compras).length > 0, pruebas: () => S.stats.pruebas >= 3,
  equipo: () => ['groot1', 'groot2', 'rhaegal'].every(x => S.items[x]), nivel5: () => lvl() >= 5, dragon: () => !!S.items.rhaegal, final: () => S.final
};
let chk = false;
function checkLogros() { if (chk) return; chk = true; let again = true; while (again) { again = false; C.logros.forEach(l => { if (!S.logros[l.id] && LG[l.id] && LG[l.id]()) { S.logros[l.id] = 1; again = true; save(); toast(`🏆 <b>Logro:</b> ${l.nombre}`, 'ray'); play('unlock'); S.pts += R.logro.pts; S.once['lg_' + l.id] = 1; save(); header(); } }); } chk = false; }

/* ---------- Objetos ---------- */
function unlockItem(id) {
  if (S.items[id]) return; const o = OBJ[id]; S.items[id] = true;
  if (o.slot && !S.equip[o.slot]) S.equip[o.slot] = id;
  if (o.cat === 'aliado') S.team[id] = true;
  S.ultimos.unshift(id); S.ultimos = S.ultimos.slice(0, 6); save();
}
function showUnlock(o, extra) {
  play(o.cat === 'aliado' ? 'ally' : 'unlock');
  ov(`<div class="tag r-${o.rareza}" style="color:var(--rc)">${o.cat === 'aliado' ? 'NUEVO ALIADO' : 'OBJETO DESBLOQUEADO'} · ${RAR[o.rareza].toUpperCase()}</div><div class="orb lg" style="--c:${o.color}">${o.icono}</div><h2>${o.nombre}</h2><p class="mut">${o.tipo}</p><p>${o.desc}</p>${o.hab ? `<p><b>${o.hab.nombre}</b> · <small>${o.hab.tipo === 'pasiva' ? 'Pasiva' : 'Activa'}</small><br><small>${o.hab.desc}</small></p>` : ''}${o.msgFisico ? `<div class="msgbox">${o.msgFisico}</div>` : ''}<div class="bubble"><b>NARRADOR</b>${o.broma}</div>${extra || ''}`, null, o.color, 'r-' + o.rareza);
  confetti(60);
}

/* ---------- Misiones ---------- */
function tesoro(i) {
  const m = mis(i), mc = MIS[i], p = m.parte;
  confirmar('¿Seguro que tienes el tesoro en las manos? El sistema desbloqueará las recompensas. El narrador no acepta devoluciones.', '¡Lo tengo!', () => {
    const it = OBJ[mc.partes[p].regalo];
    unlockItem(it.id); closeModal();
    gain({ xp: R.objeto.xp, pts: R.objeto.pts, anac: it.anacExtra || 0 }, 'obj_' + it.id);
    showUnlock(it);
    if (p < mc.partes.length - 1) { m.parte++; m.t0 = Date.now(); save(); ov(`<div class="orb lg" style="--c:#4fd1c5">🔓</div><h2>Nueva pista desbloqueada</h2><p>La misión continúa: queda un tesoro más en este nivel.</p>`, null, '#4fd1c5'); }
    else completar(i);
    render();
  }, '¡Tesoro encontrado!');
}
function completar(i) {
  const m = mis(i), mc = MIS[i]; m.done = true; m.sinAyuda = !m.ayuda; save();
  gain(R.mision, 'm' + i);
  if (m.sinAyuda) gain(R.sinAyuda, 'sa' + i);
  if (S.items.groot1 && S.team.groot1) gain({ anac: 10 }, 'g1_' + i);
  const last = i === MIS.length - 1;
  if (last) { gain(R.final, 'final'); S.final = true; } else S.nivel = i + 1;
  save(); checkLogros(); play('win');
  ov(`<div class="tag" style="color:var(--gold)">MISIÓN ${i + 1} COMPLETADA</div><div class="orb lg" style="--c:#f5c46b">${mc.icono}</div><h2 class="shine">${mc.nombre}</h2><p>${mc.celebracion}</p><p class="mut">${m.sinAyuda ? '⭐ Sin ayudas: bonus conseguido.' : 'Ayudas utilizadas: sin bonus esta vez.'}</p>${last ? '<p><b>¡Toda la aventura completada! (+200 ANACARDOS)</b></p>' : '<p><b>Siguiente misión desbloqueada.</b></p>'}`, () => { if (last) go('final'); else go('aventura'); }, '#f5c46b');
  confetti(80);
}
function ayuda(i) {
  const m = mis(i), p = m.parte, k = m.pistas[p]; if (k >= 3 || m.done) return;
  const early = k === 0 && !m.pocion && m.t0 && (Date.now() - m.t0) < C.ayudaTempranaSegundos * 1000;
  const msg = m.pocion ? C.ayudaPocion[0] : early ? rnd(C.ayudaTemprana) : rnd(C.ayudaNormal);
  confirmar(fill(msg), 'Pedir ayuda ' + (k + 1) + '/3', () => {
    m.pistas[p]++; if (m.escudo) { m.escudo = false; toast('🛡️ El escudo absorbe el golpe: esta ayuda no cuenta para el bonus.'); } else m.ayuda = true;
    S.energia = Math.max(0, S.energia - 20); S.stats.ayudas++; save(); closeModal(); checkLogros(); render();
  }, 'Ayuda oficial');
}
function extraPista(i) {
  const m = mis(i), p = m.parte; if (!S.consum.pista || m.extra[p] || m.done) return;
  S.consum.pista--; m.extra[p] = 1; if (m.escudo) { m.escudo = false; toast('🛡️ El escudo absorbe la pista extra.'); } else m.ayuda = true; save(); render();
}
function prueba(i) { const q = MIS[i].prueba; modal(`<h3>Prueba del narrador</h3><p class="mut">Opcional · +${R.prueba.anac} ANACARDOS</p><p>${q.q}</p>` + q.o.map((o, k) => `<button class="btn big" style="margin-bottom:8px" data-a="pr" data-i="${i}" data-k="${k}">${o}</button>`).join('') + '<button class="btn big" data-a="cerrar">Cerrar</button>'); }
function pruebaResp(i, k) {
  const q = MIS[i].prueba, m = mis(i);
  if (k === q.c) { closeModal(); if (!m.prueba) { m.prueba = true; S.stats.pruebas++; save(); gain(R.prueba, 'pr' + i); toast('✅ Prueba superada. El narrador está (casi) impresionado.'); } render(); } else { play('error'); toast('❌ Respuesta incorrecta. Se permite reintentar, aunque el narrador ya está sonriendo.'); }
}
function openMision(i) { if (i > S.nivel) { play('error'); toast('🔒 Misión bloqueada. El sistema no permite saltos temporales.'); return; } go('mision', i); occasionalRhaegal(); }

/* ---------- Habilidades y consumibles ---------- */
function activeMis() { return S.final && missionsDone() === MIS.length ? null : S.nivel; }
function skills() { const out = []; Object.keys(S.items).forEach(id => { const o = OBJ[id]; if (o.hab && (o.cat !== 'aliado' || S.team[id])) out.push(o); }); return out; }
function useSkill(id) {
  const i = activeMis(); if (i === null) return toast('La aventura ya está completa. Descansa, heroína.');
  const m = mis(i); if (m.sk[id]) return toast('Habilidad ya utilizada en esta misión. Recarga al avanzar.');
  if (id === 'var') { if (!m.ayuda) return toast('⚖️ El VAR no encuentra ninguna infracción. Conserva tu revisión.'); m.ayuda = false; toast('⚖️ VAR: jugada revisada. Las ayudas de esta misión quedan anuladas. Decisión final: inapelable.'); }
  else if (id === 'zancada') { gain({ anac: 10 }, `sk_zancada_${i}`); toast('👖 Zancada libre: has encontrado ANACARDOS por el suelo.'); }
  else if (id === 'macarrones') { S.energia = Math.min(100, S.energia + 50); toast('🍝 Macarrones de emergencia: energía recuperada. El menú, igual.'); }
  else if (id === 'muro') { S.energia = 100; gain({ pts: 10 }, `sk_muro_${i}`); toast('🌳 Groot Guardián levanta un muro de raíces. Energía completa.'); }
  else if (id === 'mirada') { gain({ anac: 25 }, `sk_mirada_${i}`); toast('🐾 Mirada del dragón: oportunidad oculta detectada.'); }
  else if (id === 'espiritu') { gain({ pts: 15 }, `sk_esp_${i}`); play('xmas'); confetti(70); toast('🎄 ' + rnd(['Espíritu navideño devastador: el Lunes ha sido derrotado.', 'El enemigo imaginario ha huido ante un villancico.', 'La pereza ha sido vencida a base de luces y panderetas.'])); }
  m.sk[id] = 1; save(); render();
}
function usarConsumible(id) {
  const i = activeMis();
  if (id === 'pista') return toast('💡 Úsala desde la pantalla de misión, en el botón «Pista extra».');
  if (!S.consum[id]) return; if (i === null) return toast('No hay misión activa.');
  const m = mis(i);
  if (id === 'pocion') { if (m.pocion) return toast('Ya tienes una poción activa en esta misión.'); S.consum.pocion--; m.pocion = true; S.energia = 100; toast('🧪 Poción de paciencia activa. Energía al máximo.'); }
  if (id === 'escudo') { if (m.escudo) return toast('Ya hay un escudo activo.'); S.consum.escudo--; m.escudo = true; toast('🛡️ Escudo activo: la próxima ayuda no restará el bonus.'); }
  save(); render();
}
function occasionalRhaegal() { if (Math.random() < .3) setTimeout(() => toast('🐾 ' + rnd(C.rhaegalEventos), 'ray'), 900); }
let paw = 0;
function secretoRhaegal() {
  if (S.items.rhaegal) return toast('🐾 Rhaegal ya forma parte del equipo. No pulses más: se lo toma a mal.');
  paw++; if (paw < C.secretoRhaegal.pulsaciones) { play('click'); return; }
  paw = 0; unlockItem('rhaegal'); gain(R.secreto, 'sec_rhaegal'); showUnlock(OBJ.rhaegal, '<p class="mut">🏅 Logro secreto: «Aprobación del dragón»</p>'); checkLogros(); render();
}

/* ---------- Estadísticas y avatar ---------- */
const BASE = { poder: 10, defensa: 10, movilidad: 10, estilo: 10, moral: 10, resistencia: 10, exploracion: 10 };
function stats() { const s = Object.assign({}, BASE); Object.keys(S.items).forEach(id => { const o = OBJ[id]; if (!o.stats) return; const on = o.slot ? S.equip[o.slot] === id : o.cat === 'aliado' ? S.team[id] : true; if (on) for (const k in o.stats) s[k] += o.stats[k]; }); return s; }
const eq = id => Object.values(S.equip).includes(id);
function avatar() {
  const jeans = eq('pantalon'), shirt = eq('camiseta'), tree = eq('arbol'), aura = eq('aura'), br = eq('accesorio');
  let stripes = ''; for (let x = 78; x < 142; x += 16) stripes += `<rect x="${x}" y="100" width="8" height="76" fill="#1f9d55"/>`;
  const lights = [[148, 52], [172, 82], [143, 106], [177, 112]].map(p => `<circle class="tw" cx="${p[0]}" cy="${p[1]}" r="3.5" fill="#ffd86b"/>`).join('');
  return `<svg class="avatar" viewBox="0 0 220 280" aria-label="Personaje de Lorena"><defs><linearGradient id="gb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8acff"/><stop offset="1" stop-color="#5b4fd0"/></linearGradient><radialGradient id="ga"><stop offset="0" stop-color="${aura ? '#ffd86b' : '#8b7bff'}" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient><clipPath id="cs"><rect x="78" y="100" width="64" height="76" rx="22"/></clipPath></defs>
<circle cx="110" cy="140" r="${aura ? 120 : 98}" fill="url(#ga)"/>
<rect x="88" y="168" width="21" height="84" rx="10" fill="${jeans ? '#3d5fb8' : '#2b2f4a'}"/><rect x="112" y="168" width="21" height="84" rx="10" fill="${jeans ? '#3d5fb8' : '#2b2f4a'}"/>
${jeans ? '<path d="M98 176v70M122 176v70" stroke="#8fb0ff" stroke-width="1.2" stroke-dasharray="3 4"/>' : ''}
<line x1="84" y1="116" x2="62" y2="164" stroke="url(#gb)" stroke-width="15" stroke-linecap="round"/><line x1="136" y1="116" x2="158" y2="150" stroke="url(#gb)" stroke-width="15" stroke-linecap="round"/>
<rect x="78" y="100" width="64" height="76" rx="22" fill="${shirt ? '#fff' : 'url(#gb)'}"/>${shirt ? `<g clip-path="url(#cs)">${stripes}</g>` : ''}
<circle cx="110" cy="72" r="24" fill="#cfc6ff"/><path d="M92 66a20 20 0 0 1 36 0" stroke="#fff" stroke-opacity=".5" stroke-width="3" fill="none"/>
${br ? '<circle cx="62" cy="164" r="8" fill="none" stroke="#b58cff" stroke-width="4"/>' : ''}
${tree ? `<line x1="160" y1="70" x2="160" y2="208" stroke="#8a5a3b" stroke-width="6" stroke-linecap="round"/><polygon points="160,14 142,56 178,56" fill="#1f9d55"/><polygon points="160,40 134,92 186,92" fill="#23a85d"/><polygon points="160,68 128,126 192,126" fill="#2bb56a"/><text x="160" y="22" text-anchor="middle" font-size="16">⭐</text>${lights}` : ''}
${S.items.groot1 && S.team.groot1 ? '<text x="18" y="262" font-size="34">🌱</text>' : ''}${S.items.groot2 && S.team.groot2 ? '<text x="168" y="266" font-size="46">🌳</text>' : ''}${S.items.rhaegal && S.team.rhaegal ? '<text x="14" y="214" font-size="28">🐾</text>' : ''}</svg>`;
}

/* ---------- Cabecera, navegación, vistas ---------- */
let VIEW = 'welcome', ARG = null, INV = 'todo', SL = 0;
function header() {
  const per = S.xp % C.xpPorNivel, h = $('#hdr'); if (!h) return;
  h.innerHTML = `<div class="top"><div class="lvl">${lvl()}</div><div class="who"><b>${C.jugadora}</b><small>${titulo()} · ${per}/${C.xpPorNivel} XP</small></div><button class="ib" data-a="chat" aria-label="Chat">${ico('chat')}</button><button class="ib" data-a="cfg" aria-label="Ajustes">${ico('cfg')}</button></div>
<div class="bar"><i style="width:${per / C.xpPorNivel * 100}%"></i></div>
<div class="chips"><div class="chip"><b>${S.xp}</b><small class="mut">XP</small></div><div class="chip"><b>${CASH}${S.anac}</b><small class="mut">ANACARDOS</small></div><div class="chip"><b>${S.pts}</b><small class="mut">PUNTOS</small></div></div>`;
}
function navBar() { const n = [['home', 'Inicio'], ['aventura', 'Aventura'], ['personaje', 'Personaje'], ['inventario', 'Inventario'], ['aliados', 'Aliados'], ['tienda', 'Tienda'], ['logros', 'Logros']]; const on = VIEW === 'mision' ? 'aventura' : VIEW; $('#nav').innerHTML = n.map(x => `<button data-a="nav" data-v="${x[0]}" class="${on === x[0] ? 'on' : ''}">${ico(x[0])}<span>${x[1]}</span></button>`).join(''); }
function go(v, a) { VIEW = v; ARG = a; render(); window.scrollTo(0, 0); }
function render() {
  const game = VIEW !== 'welcome' && VIEW !== 'intro'; $('#hdr').hidden = !game; $('#nav').hidden = !game;
  const V = { welcome: vWelcome, intro: vIntro, home: vHome, aventura: vAventura, mision: vMision, personaje: vPersonaje, inventario: vInv, aliados: vAliados, tienda: vTienda, logros: vLogros, final: vFinal }[VIEW];
  const v = $('#view'); v.className = ''; void v.offsetWidth; v.className = 'enter'; v.innerHTML = V(ARG);
  if (game) { header(); navBar(); }
  setMusic(VIEW === 'final' ? 'final' : (VIEW === 'mision' && ARG === 3) ? 'navidad' : 'inicio');
  if (VIEW === 'final') hearts(18);
  save();
}
function vWelcome() {
  return `<div class="welcome"><div class="logo">🌳</div><h1>La Guardiana Lorena<em>La leyenda de los anacardos</em></h1><p class="mut">Un videojuego de cumpleaños, hecho a medida.</p>
<button class="btn gold big" data-a="start">${S.iniciado ? 'Continuar partida' : 'Comenzar aventura'}</button>
${S.iniciado ? '<button class="btn big" data-a="nueva">Nueva partida</button>' : ''}<button class="btn sm" data-a="cfg" style="align-self:center">${S.cfg.mute ? '🔇' : '🔊'} Sonido y ajustes</button><small class="mut">El progreso se guarda automáticamente en este dispositivo. Activa el sonido tocando cualquier botón.</small></div>`;
}
function vIntro() {
  const s = C.intro[SL];
  return `<div class="card slide" style="margin-top:8vh"><div class="e">${s.ico}</div><h2>${s.t}</h2><p>${s.x}</p></div><div class="dots">${C.intro.map((_, i) => `<i class="${i === SL ? 'on' : ''}"></i>`).join('')}</div><button class="btn gold big" data-a="introNext">${SL === C.intro.length - 1 ? 'Comenzar la aventura' : 'Continuar'}</button>`;
}
function vHome() {
  const i = Math.min(S.nivel, MIS.length - 1), mc = MIS[i], tot = REG.length, h = regalosHallados(), per = S.xp % C.xpPorNivel;
  const team = Object.keys(S.team).filter(k => S.team[k]).map(k => `<div class="orb" style="--c:${OBJ[k].color}" title="${OBJ[k].nombre}">${OBJ[k].icono}</div>`).join('') || '<small class="mut">Aún sin aliados. Aparecerán al encontrar regalos.</small>';
  const last = S.ultimos.slice(0, 3).map(id => `<div class="item r-${OBJ[id].rareza}" style="margin:0 0 8px"><div class="orb" style="--c:${OBJ[id].color}">${OBJ[id].icono}</div><div><div class="rar">${RAR[OBJ[id].rareza]}</div><div class="nm">${OBJ[id].nombre}</div></div></div>`).join('') || '<small class="mut">Todavía no has desbloqueado nada. El sistema espera.</small>';
  return `<div class="card"><div class="row"><div style="width:42%">${avatar()}</div><div class="grow"><h2>${C.jugadora}</h2><p class="mut">Nivel ${lvl()} · ${titulo()}</p><div class="bar"><i style="width:${per / C.xpPorNivel * 100}%"></i></div><small class="mut">${per}/${C.xpPorNivel} XP al siguiente nivel</small><p style="margin-top:10px"><span class="pill">Misiones ${missionsDone()}/${MIS.length}</span> <span class="pill">Regalos ${h}/${tot}</span></p></div></div></div>
<div class="bubble"><b>NARRADOR</b>${fill(rnd(C.narradorHome))}</div><div style="height:14px"></div>
<div class="card" style="border-color:rgba(245,196,107,.4)"><small class="mut">${S.final ? 'AVENTURA COMPLETADA' : 'MISIÓN ACTUAL · NIVEL ' + (i + 1)}</small><h3>${mc.icono} ${mc.nombre}</h3><div class="bar gold" style="margin:8px 0 12px"><i style="width:${missionsDone() / MIS.length * 100}%"></i></div>${S.final ? '<button class="btn gold big" data-a="fin">Ver pantalla final</button>' : `<button class="btn primary big" data-a="openm" data-i="${i}">Continuar misión</button>`}</div>
<div class="card"><h3>Tu equipo</h3><div class="row wrap">${team}</div></div><div class="card"><h3>Últimos objetos</h3>${last}</div>
<div style="text-align:center"><button class="paw" data-a="paw" aria-label="Supervisión felina">🐾</button></div>`;
}
function vAventura() {
  return `<h2>Aventuras</h2><p class="mut">Cinco misiones. Sin atajos.</p>` + MIS.map((m, i) => { const d = S.mis[i] && S.mis[i].done, cur = i === S.nivel && !d, lock = i > S.nivel; return `<button class="mrow ${d ? 'done' : ''} ${cur ? 'cur' : ''} ${lock ? 'lock' : ''}" data-a="openm" data-i="${i}"><div class="num">${lock ? '🔒' : d ? '✅' : m.icono}</div><div class="grow"><small class="mut">NIVEL ${i + 1}</small><div class="nm" style="font-family:var(--serif);font-size:1.05rem">${lock ? 'Misión bloqueada' : m.nombre}</div><small class="mut">${d ? 'Completada' : lock ? 'Completa la anterior' : 'En curso'}</small></div></button>`; }).join('');
}
function vMision(i) {
  if (i > S.nivel) return vAventura(); const mc = MIS[i], m = mis(i), p = Math.min(m.parte, mc.partes.length - 1), pa = mc.partes[p];
  if (!m.t0 && !m.done) { m.t0 = Date.now(); save(); }
  const hs = pa.pistas.slice(0, m.pistas[p]).map((h, k) => `<div class="hint"><b>AYUDA ${k + 1}</b><p>${h}</p></div>`).join('') + (m.extra[p] ? `<div class="hint extra"><b>PISTA EXTRA</b><p>${pa.pistaExtra}</p></div>` : '');
  const sk = !m.done ? skills().filter(o => o.hab.tipo === 'activa').map(o => `<button class="btn sm" data-a="skill" data-id="${o.hab.id}" ${m.sk[o.hab.id] ? 'disabled' : ''}>${o.icono} ${o.hab.nombre}</button>`).join('') : '';
  const cons = !m.done ? ['pocion', 'escudo'].filter(k => S.consum[k]).map(k => `<button class="btn sm" data-a="usar" data-id="${k}">${SHOP[k].icono} ${SHOP[k].nombre} ×${S.consum[k]}</button>`).join('') : '';
  const status = [m.escudo ? '🛡️ Escudo activo' : '', m.pocion ? '🧪 Poción activa' : '', S.energia < 40 ? '⚡ Energía baja' : ''].filter(Boolean).map(x => `<span class="pill">${x}</span>`).join(' ');
  return `<small class="mut">NIVEL ${i + 1}${mc.partes.length > 1 ? ` · TESORO ${p + 1}/${mc.partes.length}` : ''}</small><h2>${mc.icono} ${mc.nombre}</h2>
<div class="bubble"><b>NARRADOR</b>${mc.intro}</div><div style="height:12px"></div>
<div class="card"><small class="mut">ACERTIJO</small><p class="riddle">${pa.acertijo}</p></div>
<div class="card"><div class="row sp"><h3>Ayudas oficiales</h3><span class="pill">${m.pistas[p]}/3 usadas</span></div>${status ? `<p>${status}</p>` : ''}${hs || '<small class="mut">Aún no has pedido ayuda. Piensa un poco más.</small>'}
${m.done ? '' : `<div class="row wrap" style="margin-top:10px"><button class="btn grow" data-a="ayuda" data-i="${i}" ${m.pistas[p] >= 3 ? 'disabled' : ''}>🆘 Pedir ayuda</button>${S.consum.pista && !m.extra[p] ? `<button class="btn grow" data-a="extra" data-i="${i}">💡 Pista extra ×${S.consum.pista}</button>` : ''}</div>`}</div>
${sk || cons ? `<div class="card"><h3>Habilidades y objetos</h3><div class="row wrap">${sk}${cons}</div></div>` : ''}
${m.done ? '<div class="card"><b>✅ Misión completada</b></div>' : `<div class="row wrap" style="margin-bottom:12px"><button class="btn grow" data-a="chat">💬 Hablar con el narrador</button><button class="btn grow" data-a="prueba" data-i="${i}" ${m.prueba ? 'disabled' : ''}>❓ ${m.prueba ? 'Prueba superada' : 'Prueba opcional'}</button></div><button class="btn gold big" data-a="tesoro" data-i="${i}">¡TESORO ENCONTRADO!</button>`}`;
}
function statBars() { const s = stats(); return Object.keys(STATN).map(k => `<div class="stat"><span>${STATN[k]}</span><div class="bar ${k === 'poder' ? 'gold' : ''}"><i style="width:${Math.min(100, s[k])}%"></i></div><b>${s[k]}</b></div>`).join(''); }
function vPersonaje() {
  const per = S.xp % C.xpPorNivel, sk = skills();
  return `<h2>Mi personaje</h2><div class="card"><div class="avwrap">${avatar()}</div><h2 style="text-align:center">${C.jugadora}</h2><p class="mut" style="text-align:center">Nivel ${lvl()} · ${titulo()}</p><div class="bar"><i style="width:${per / C.xpPorNivel * 100}%"></i></div><small class="mut">${per}/${C.xpPorNivel} XP al siguiente nivel</small>
<div class="chips" style="margin-top:12px"><div class="chip"><b>${S.xp}</b><small>XP</small></div><div class="chip"><b>${CASH}${S.anac}</b><small>ANACARDOS</small></div><div class="chip"><b>${S.pts}</b><small>PUNTOS</small></div></div></div>
<div class="card"><h3>Atributos</h3>${statBars()}<div class="stat"><span>Energía ⚡</span><div class="bar gold"><i style="width:${S.energia}%"></i></div><b>${S.energia}</b></div></div>
<div class="card"><h3>Equipamiento actual</h3>${SLOTS.map(s => { const id = S.equip[s[0]], o = id && OBJ[id]; return `<div class="slot">${o ? `<div class="orb" style="--c:${o.color};width:42px;height:42px;font-size:1.3rem;border-radius:13px">${o.icono}</div><div class="grow"><small class="mut">${s[1]}</small><div>${o.nombre}</div></div>` : `<div class="grow"><small class="mut">${s[1]}</small><div class="mut">Vacío</div></div>`}</div>`; }).join('')}</div>
<div class="card"><h3>Habilidades especiales</h3>${sk.length ? sk.map(o => `<div class="slot"><div class="orb" style="--c:${o.color};width:42px;height:42px;font-size:1.3rem;border-radius:13px">${o.icono}</div><div class="grow"><b>${o.hab.nombre}</b> <span class="pill">${o.hab.tipo}</span><br><small class="mut">${o.hab.desc}</small></div></div>`).join('') : '<small class="mut">Las habilidades se desbloquean al encontrar regalos.</small>'}</div>`;
}
function itemCard(o, extra) { return `<button class="item r-${o.rareza}" data-a="item" data-id="${o.id}"><div class="orb" style="--c:${o.color}">${o.icono}</div><div class="grow"><div class="rar">${RAR[o.rareza]} · ${o.tipo}</div><div class="nm">${o.nombre}</div><small class="mut">${o.hab ? '✦ ' + o.hab.nombre : o.desc.slice(0, 60)}</small>${extra || ''}</div></button>`; }
function vInv() {
  const tabs = CATS.map(c => `<button data-a="cat" data-id="${c[0]}" class="${INV === c[0] ? 'on' : ''}">${c[1]}</button>`).join('');
  let list = C.objetos.filter(o => S.items[o.id] && (INV === 'todo' || o.cat === INV)).map(o => itemCard(o, `<br>${S.equip[o.slot] === o.id ? '<span class="pill">Equipado</span>' : o.cat === 'aliado' ? (S.team[o.id] ? '<span class="pill">En el equipo</span>' : '') : ''}`)).join('');
  if (INV === 'todo' || INV === 'consumible') list += ['pista', 'pocion', 'escudo'].filter(k => S.consum[k]).map(k => `<div class="item r-comun"><div class="orb" style="--c:#667">${SHOP[k].icono}</div><div class="grow"><div class="rar">Común · Consumible</div><div class="nm">${SHOP[k].nombre} ×${S.consum[k]}</div><small class="mut">${SHOP[k].desc}</small></div>${k !== 'pista' ? `<button class="btn sm" data-a="usar" data-id="${k}">Usar</button>` : ''}</div>`).join('');
  if (INV === 'todo' || INV === 'especial') list += C.tienda.filter(t => t.tipo === 'vale' && S.vales[t.id]).map(t => `<div class="item r-especial"><div class="orb" style="--c:#4fd1c5">${t.icono}</div><div class="grow"><div class="rar">Especial · Vale</div><div class="nm">${t.nombre.replace(/^Vale: /, '')}</div></div><button class="btn sm" data-a="canje" data-id="${t.id}" ${S.vales[t.id] === 'canjeado' ? 'disabled' : ''}>${S.vales[t.id] === 'canjeado' ? 'Canjeado' : 'Canjear'}</button></div>`).join('');
  const hid = INV === 'todo' ? REG.concat(['rhaegal']).filter(id => !S.items[id]).map(() => `<div class="item lock"><div class="orb sil">?</div><div><div class="nm">???</div><small class="mut">Objeto por descubrir</small></div></div>`).join('') : '';
  return `<h2>Inventario</h2><div class="tabs">${tabs}</div>${list || (hid ? '' : '<p class="mut">Nada por aquí todavía.</p>')}${hid ? `<h3 class="mut" style="margin-top:14px">Por descubrir</h3>${hid}` : ''}`;
}
function itemModal(id) {
  const o = OBJ[id]; if (!o || !S.items[id]) return; const st = o.stats ? Object.keys(o.stats).map(k => `<span class="pill">+${o.stats[k]} ${STATN[k]}</span>`).join(' ') : '';
  const btn = o.slot ? `<button class="btn primary big" data-a="equip" data-id="${id}">${S.equip[o.slot] === id ? 'Quitar' : 'Equipar'}</button>` : o.cat === 'aliado' ? `<button class="btn primary big" data-a="team" data-id="${id}">${S.team[id] ? 'Sacar del equipo' : 'Añadir al equipo'}</button>` : '';
  modal(`<div class="row"><div class="orb lg" style="--c:${o.color}">${o.icono}</div><div><div class="rar r-${o.rareza}" style="color:var(--rc)">${RAR[o.rareza]}</div><h3>${o.nombre}</h3><small class="mut">${o.tipo} · Desbloqueado</small></div></div><p style="margin-top:12px">${o.desc}</p><p>${st}</p>${o.hab ? `<div class="hint"><b>HABILIDAD · ${o.hab.tipo.toUpperCase()}</b><p><b>${o.hab.nombre}</b><br>${o.hab.desc}</p></div>` : ''}<div class="bubble"><b>NARRADOR</b>${o.broma}</div><div style="height:12px"></div>${btn}<button class="btn big" style="margin-top:8px" data-a="cerrar">Cerrar</button>`);
}
function vAliados() {
  const al = ['groot1', 'groot2', 'rhaegal'], teamN = al.filter(a => S.team[a]).length;
  return `<h2>Aliados</h2><p class="mut">Equipo activo: ${teamN}/3</p>` + al.map(id => { const o = OBJ[id]; if (!S.items[id]) return `<div class="card" style="opacity:.7"><div class="row"><div class="orb sil lg">?</div><div><h3>Aliado misterioso</h3><small class="mut">${id === 'rhaegal' ? 'Este aliado no se une por las buenas. El departamento felino exige una prueba.' : 'Aún no se ha dejado ver.'}</small></div></div></div>`; return `<div class="card r-${o.rareza}" style="border-color:var(--rc)"><div class="row"><div class="orb lg" style="--c:${o.color}">${o.icono}</div><div><div class="rar">${RAR[o.rareza]}</div><h3>${o.nombre}</h3></div></div><p style="margin-top:10px">${o.desc}</p><div class="hint"><b>HABILIDAD · ${o.hab.tipo.toUpperCase()}</b><p><b>${o.hab.nombre}</b><br>${o.hab.desc}</p></div><p>${Object.keys(o.stats).map(k => `<span class="pill">+${o.stats[k]} ${STATN[k]}</span>`).join(' ')}</p><button class="btn ${S.team[id] ? '' : 'primary'} big" data-a="team" data-id="${id}">${S.team[id] ? 'En el equipo · Descansar' : 'Añadir al equipo'}</button></div>`; }).join('');
}
function vTienda() {
  return `<h2>Tienda de ANACARDOS</h2><p class="mut">Opcional: nada de aquí es necesario para completar la aventura. Los regalos reales no se compran.</p>` + C.tienda.map(t => { const own = t.tipo !== 'consumible' && (S.compras[t.id] || 0) > 0, can = S.anac >= t.precio, n = t.tipo === 'consumible' ? (S.consum[t.id] || 0) : 0; return `<div class="card"><div class="row"><div class="orb" style="--c:#8b7bff">${t.icono}</div><div class="grow"><b>${t.nombre}</b><br><small class="mut">${t.desc}</small>${n ? `<br><span class="pill">En inventario: ${n}</span>` : ''}</div></div><div class="row sp" style="margin-top:10px"><span class="price">${CASH}${t.precio}</span>${t.tipo === 'evento' && own ? '<button class="btn sm" data-a="evento">Revivir</button>' : own ? '<span class="pill">Comprado</span>' : `<button class="btn sm ${can ? 'gold' : ''}" data-a="buy" data-id="${t.id}" ${can ? '' : 'disabled'}>${can ? 'Comprar' : 'Faltan ' + (t.precio - S.anac)}</button>`}</div></div>`; }).join('');
}
function buy(id) {
  const t = SHOP[id]; if (!t || S.anac < t.precio) return play('error'); if (t.tipo !== 'consumible' && S.compras[id]) return;
  S.anac -= t.precio; S.compras[id] = (S.compras[id] || 0) + 1; play('coin');
  if (t.tipo === 'consumible') S.consum[id] = (S.consum[id] || 0) + 1;
  else if (t.tipo === 'objeto') { unlockItem(id); showUnlock(OBJ[id]); }
  else if (t.tipo === 'vale') S.vales[id] = 'comprado';
  else if (t.tipo === 'evento') { S.evento = true; evento(); }
  save(); header(); toast(`🛍️ Compra realizada: ${t.nombre}`); checkLogros(); render();
}
function evento() { let k = 0; const step = () => { ov(`<div class="tag" style="color:var(--gold)">EVENTO ESPECIAL · ${k + 1}/${C.eventoNarrador.length}</div><div class="orb lg" style="--c:#8b7bff">🎙️</div><p>${C.eventoNarrador[k]}</p>`, () => { k++; if (k < C.eventoNarrador.length) step(); }, '#8b7bff'); }; step(); }
function canje(id) { const t = SHOP[id]; if (S.vales[id] !== 'comprado') return; confirmar('Una vez canjeado, el vale queda gastado. ¿Lo canjeas ahora?', 'Canjear', () => { S.vales[id] = 'canjeado'; save(); closeModal(); play('win'); confetti(50); ov(`<div class="orb lg" style="--c:#4fd1c5">${t.icono}</div><h2>${t.nombre.replace(/^Vale: /, '')}</h2><p>${t.canje}</p><p class="mut">Enséñaselo a tu pareja.</p>`, null, '#4fd1c5'); render(); }, 'Canjear vale'); }
function vLogros() {
  const n = Object.keys(S.logros).length;
  return `<h2>Logros</h2><p class="mut">${n}/${C.logros.length} conseguidos · cada logro suma ${R.logro.pts} puntos</p>` + C.logros.map(l => { const ok = S.logros[l.id], sec = l.secreto && !ok; return `<div class="item ${ok ? 'r-legendario' : 'lock'}"><div class="orb ${ok ? '' : 'sil'}" style="--c:#f5c46b">${ok ? l.icono : '?'}</div><div><div class="nm">${sec ? 'Logro secreto' : l.nombre}</div><small class="mut">${sec ? 'Descubre cómo desbloquearlo...' : l.desc}</small></div></div>`; }).join('');
}
function vFinal() {
  const F = C.final, msg = (C.mensajePersonal || '').trim();
  return `<div class="final"><div class="card" style="border-color:var(--gold)"><div class="tag" style="color:var(--gold);letter-spacing:3px;font-size:.7rem;font-weight:800">LOGRO LEGENDARIO</div><h1 class="shine">${F.titulo.replace('LOGRO LEGENDARIO DESBLOQUEADO: ', '')}</h1><div class="avwrap">${avatar()}</div><p class="mut">${C.jugadora} · Nivel ${lvl()} · ${titulo()}</p><div class="chips"><div class="chip"><b>${S.xp}</b><small>XP</small></div><div class="chip"><b>${CASH}${S.anac}</b><small>ANACARDOS</small></div><div class="chip"><b>${S.pts}</b><small>PUNTOS</small></div></div></div>
<div class="card"><div class="row"><div class="orb" style="--c:#e8b64c">🐾</div><p class="txt mut" style="margin:0;text-align:left">${F.rhaegal}</p></div></div>
<div class="card txt">${F.parrafos.map(p => `<p>${p}</p>`).join('')}</div>
${msg ? `<div class="card" style="border-color:var(--vio)"><small class="mut">MENSAJE PERSONAL</small><p class="txt" style="white-space:pre-line;margin-top:8px">${msg.replace(/</g, '&lt;')}</p></div>` : ''}
<div class="card" style="border-color:var(--gold)"><p class="txt shine" style="white-space:pre-line;text-align:center;font-size:1.15rem">${F.cierre}</p></div>
<button class="btn gold big" data-a="celebrar">🎉 Celebrar</button><div style="height:10px"></div><button class="btn big" data-a="nav" data-v="home">Volver al centro de operaciones</button></div>`;
}

/* ---------- Chat híbrido (sin IA: reglas y frases) ---------- */
const lastUsed = {};
function pick(key, arr) { let k; do { k = Math.floor(Math.random() * arr.length); } while (arr.length > 1 && k === lastUsed[key]); lastUsed[key] = k; return fill(arr[k]); }
function respuesta(txt) {
  const t = norm(txt), i = activeMis();
  if (i !== null) { const pa = MIS[i].partes[Math.min(mis(i).parte, MIS[i].partes.length - 1)]; if (!/pista|ayuda/.test(t) && pa.palabras.some(w => t.includes(w))) return pick('intento', C.chatIntento); }
  for (const e of C.chat) if (e.re.test(t)) {
    if (e.dyn === 'rhaegal') return S.items.rhaegal ? 'Rhaegal te mira desde su posición de supervisor. Sigue en el equipo. No ha emitido comentarios.' : C.secretoRhaegal.pista;
    if (e.dyn === 'equipo') { const l = SLOTS.map(s => S.equip[s[0]]).filter(Boolean).map(x => OBJ[x].nombre); return l.length ? `Equipamiento actual: ${l.join(', ')}. ${OBJ[S.equip.piernas || S.equip.cuerpo || S.equip.arma] ? OBJ[S.equip.piernas || S.equip.cuerpo || S.equip.arma].broma : ''}` : 'Equipamiento actual: ninguno. Se recomienda encontrar algo antes de salir a la aventura.'; }
    if (e.dyn === 'aliados') { const l = Object.keys(S.team).filter(k => S.team[k]).map(k => OBJ[k].nombre); return l.length ? `Aliados en el equipo: ${l.join(', ')}.` : 'Aliados en el equipo: ninguno. Vas más sola que el 9.'; }
    if (e.dyn === 'habilidades') { const l = skills().map(o => o.hab.nombre); return l.length ? `Habilidades disponibles: ${l.join(', ')}.` : 'Habilidades disponibles: ninguna. De momento solo tu carisma.'; }
    if (e.dyn === 'logros') { const n = Object.keys(S.logros).length; return `Llevas ${n} logros de ${C.logros.length}. ${n > 5 ? 'El sistema está impresionado.' : 'El sistema espera más.'}`; }
    if (e.dyn === 'stats') return `Nivel ${lvl()}, ${S.xp} XP, ${S.anac} ANACARDOS y ${S.pts} puntos. ${S.anac > 150 ? 'Cuidado, que ya eres rica.' : 'Se aceptan donaciones.'}`;
    return pick(e.re.source, e.r);
  }
  return pick('def', C.chatDefecto);
}
function chatView() {
  $('#chat').innerHTML = `<div class="sheet"><div class="row sp"><h3>💬 Narrador</h3><button class="ib" data-a="chatx">✕</button></div><p class="mut" style="font-size:.8rem">Conversación libre: no cambia tu progreso. Las pistas oficiales están en la pantalla de misión.</p><div class="cmsgs" id="cm">${S.chat.map(m => `<div class="m ${m.u ? 'u' : 'n'}">${m.t}</div>`).join('') || `<div class="m n">${fill('Aquí el narrador, {mote}. Escribe lo que quieras.')}</div>`}</div><div class="q">${['Dame una pista', 'Me rindo', 'Hablemos de Rhaegal', '¿Qué equipo llevo?'].map(q => `<button class="pill" data-a="quick" data-t="${q}">${q}</button>`).join('')}</div><div class="cin"><input id="ci" maxlength="200" placeholder="Escribe al narrador..." autocomplete="off"><button class="btn primary" data-a="send">Enviar</button></div></div>`;
  $('#chat').hidden = false; const c = $('#cm'); c.scrollTop = c.scrollHeight; $('#ci').addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
}
function send(t) {
  const inp = $('#ci'); t = (t || inp.value || '').trim(); if (!t) return; inp.value = '';
  S.chat.push({ u: 1, t: t.replace(/</g, '&lt;') }); S.chat.push({ t: respuesta(t) }); S.chat = S.chat.slice(-40); save(); play('click'); chatView();
}
function settings() {
  modal(`<h3>Ajustes</h3><p><label>Volumen</label><input type="range" id="vol" min="0" max="1" step=".05" value="${S.cfg.vol}"></p><div class="row sp"><span>Sonido</span><button class="btn sm" data-a="mute">${S.cfg.mute ? '🔇 Silenciado' : '🔊 Activado'}</button></div><p class="mut" style="margin-top:14px">💾 Guardado automático activado en este dispositivo.</p><button class="btn big" data-a="reset" style="border-color:var(--red);color:var(--red)">Reiniciar partida</button><button class="btn big" style="margin-top:8px" data-a="cerrar">Cerrar</button>`);
  $('#vol').oninput = e => { S.cfg.vol = +e.target.value; vol(); save(); };
}
function reset() { confirmar('Se borrará TODO el progreso: nivel, objetos, ANACARDOS... ¿Seguro?', 'Sí, continuar', () => { confirmar('Última confirmación. Esta acción es irreversible. ¿Reiniciar la partida?', 'Borrar todo', () => { try { localStorage.removeItem(KEY); } catch (e) {} S = def(); closeModal(); SL = 0; INV = 'todo'; go('welcome'); }, 'Confirmación final'); }, 'Reiniciar partida'); }

/* ---------- Eventos ---------- */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-a]'); if (!t) return; const a = t.dataset.a, d = t.dataset; if (!['paw', 'send'].includes(a)) { try { play('click'); } catch (x) {} }
  switch (a) {
    case 'start': if (S.iniciado) go('home'); else { SL = 0; go('intro'); } break;
    case 'nueva': reset(); break;
    case 'introNext': if (SL < C.intro.length - 1) { SL++; render(); } else { S.iniciado = true; save(); checkLogros(); go('home'); } break;
    case 'nav': go(d.v); break;
    case 'openm': openMision(+d.i); break;
    case 'ayuda': ayuda(+d.i); break; case 'extra': extraPista(+d.i); break;
    case 'tesoro': tesoro(+d.i); break; case 'prueba': prueba(+d.i); break; case 'pr': pruebaResp(+d.i, +d.k); break;
    case 'skill': useSkill(d.id); break; case 'usar': usarConsumible(d.id); break;
    case 'cerrar': closeModal(); break; case 'okcb': { const f = window.__cb; closeModal(); if (f) f(); break; }
    case 'chat': chatView(); break; case 'chatx': $('#chat').hidden = true; break; case 'send': send(); break; case 'quick': send(d.t); break;
    case 'cfg': settings(); break; case 'mute': S.cfg.mute = !S.cfg.mute; vol(); save(); if (!S.cfg.mute) startMusic(); settings(); break; case 'reset': closeModal(); reset(); break;
    case 'cat': INV = d.id; render(); break; case 'item': itemModal(d.id); break;
    case 'equip': { const o = OBJ[d.id]; S.equip[o.slot] = S.equip[o.slot] === d.id ? null : d.id; if (!S.equip[o.slot]) delete S.equip[o.slot]; save(); closeModal(); render(); break; }
    case 'team': { const o = OBJ[d.id]; if (S.team[d.id]) delete S.team[d.id]; else S.team[d.id] = true; if (S.team[d.id]) toast(fill(o.broma)); save(); closeModal(); render(); break; }
    case 'buy': buy(d.id); break; case 'canje': canje(d.id); break; case 'evento': evento(); break;
    case 'paw': secretoRhaegal(); break; case 'fin': go('final'); break;
    case 'celebrar': confetti(90); hearts(20); play('win'); break;
  }
});
if (S.cfg.mute) vol();
render();
})();
