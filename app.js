'use strict';

const LEVELS = ['1-3', '4', '5-6', '7-8'];
const LEVEL_NAMES = { '1-3': 'klasy 1–3', '4': 'klasa 4', '5-6': 'klasy 5–6', '7-8': 'klasy 7–8' };
const $ = (sel) => document.querySelector(sel);

const state = {
  level: '',
  area: '',
  search: '',
  deckId: null,
  game: null,
  boards: 4,
  showAnswers: true,
  printRules: false,
  printBacks: false,
  colouring: false,
};

// ── Logika danych ────────────────────────────────────────────────────────

// Fisher–Yates. ponytail: nie sort(()=>Math.random()-0.5) — skrzywiony rozkład,
// przy bingo dawałby powtarzalne plansze.
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Pula pojedynczych haseł z talii — do bingo i do liczenia pozycji.
function wordPool(deck) {
  if (deck.type === 'pairs') return deck.items.map((p) => p[0]);
  if (deck.type === 'groups') return Object.values(deck.items).flat();
  return deck.items.map((it) => it.q);
}

function countItems(deck) {
  return deck.type === 'groups' ? Object.values(deck.items).flat().length : deck.items.length;
}

// Które gry ma sens drukować z tej talii.
// Bingo tylko gdy starczy haseł na planszę 5×5 — inaczej pola by się powtarzały.
function gamesFor(deck) {
  const bingo = deck.type !== 'prompts' && wordPool(deck).length >= 25 ? ['bingo'] : [];
  if (deck.type === 'pairs') return ['memory', ...bingo];
  if (deck.type === 'groups') return ['piotrus', ...bingo];
  return ['qa'];
}

function matchesFilters(deck) {
  if (state.level && deck.level !== state.level) return false;
  if (state.area && deck.area !== state.area) return false;
  if (state.search) {
    const q = state.search.toLowerCase();
    const hay = (deck.title + ' ' + deck.area + ' ' + wordPool(deck).join(' ')).toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

function currentDeck() {
  return DECKS.find((d) => d.id === state.deckId) || null;
}

// Czy w talii jest cokolwiek do narysowania — decyduje o pokazaniu trybu kolorowania.
function deckHasIcons(deck) {
  return wordPool(deck).some((w) => splitIcon(w).emoji !== null);
}

// ── Budowanie kart ───────────────────────────────────────────────────────

const EMOJI_RE = /\p{Extended_Pictographic}(️|‍\p{Extended_Pictographic}|[\u{1F3FB}-\u{1F3FF}])*|[0-9#*]️?⃣/gu;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

// Ikona OpenMoji ze sprite'u wstrzykniętego do dokumentu (patrz initIcons).
// Kopiujemy zawartość symbolu zamiast używać <use>, bo <use> renderuje klon
// w shadow DOM — arkusz stylów strony go nie dosięga, więc tryb kolorowania
// (ukrycie warstwy koloru) nie miałby żadnego efektu na to, co widać i co się drukuje.
function icon(emoji, className) {
  const hex = typeof OM_MAP !== 'undefined' && OM_MAP[emoji];
  if (!hex) return null;
  const sym = document.getElementById('om-' + hex);
  if (!sym) return null;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', className);
  svg.setAttribute('viewBox', '0 0 72 72');
  svg.setAttribute('role', 'img');
  for (const child of sym.children) svg.appendChild(child.cloneNode(true));
  return svg;
}

// Rozdziela hasło na ikonę wiodącą i resztę tekstu: '🍎 apple' → { emoji:'🍎', text:'apple' }.
function splitIcon(str) {
  const m = String(str).match(EMOJI_RE);
  if (!m) return { emoji: null, text: String(str) };
  const first = m[0];
  if (!String(str).startsWith(first)) return { emoji: null, text: String(str) };
  return { emoji: first, text: String(str).slice(first.length).trim() };
}

// Emoji w środku zdania (np. 'Znak 🚭 → You ___ smoke.') zamienia na małą ikonę w linii.
function fillText(node, str) {
  const s = String(str);
  let last = 0;
  for (const m of s.matchAll(EMOJI_RE)) {
    const ic = icon(m[0], 'icon-inline');
    if (!ic) continue;
    if (m.index > last) node.appendChild(document.createTextNode(s.slice(last, m.index)));
    node.appendChild(ic);
    last = m.index + m[0].length;
  }
  node.appendChild(document.createTextNode(s.slice(last)));
  return node;
}

// Krótkie hasło = duża czcionka. Progi dobrane pod kartę 63 mm.
// Ikona nie zmniejsza tekstu: najdłuższe hasło z ikoną ma 20 znaków, a zmniejszanie
// robiło asymetrię w parze (obrazkowe 'goat' drobniej niż tekstowe 'koza').
function sizeClass(text) {
  const n = text.length;
  return n <= 10 ? 'xl' : n <= 22 ? 'lg' : n <= 45 ? 'md' : 'sm';
}

function card(main, corner, footer) {
  const c = el('div', 'card');
  if (corner) c.appendChild(el('div', 'corner', corner));

  const { emoji, text } = splitIcon(main);
  const ic = emoji ? icon(emoji, 'icon-card') : null;
  if (ic) c.appendChild(ic);

  const body = el('div', 'body ' + sizeClass(text));
  fillText(body, text);
  c.appendChild(body);

  if (footer) c.appendChild(fillText(el('div', 'answer'), footer));
  return c;
}

// Kolorowy pasek u dołu karty koduje poziom — po roku pozwala posortować pudełko.
function levelClass(deck) {
  return 'lv' + deck.level.replace('-', '');
}

function grid(cards, deck) {
  const g = el('div', 'card-grid ' + levelClass(deck));
  cards.forEach((c) => g.appendChild(c));
  return g;
}

// Rewersy do druku dwustronnego — bez nich przy memory prześwituje przez cienki papier.
// Siatka musi mieć tyle samo pól co przód, żeby po obróceniu kartki nic się nie przesunęło.
function renderBacks(deck, count) {
  const pages = [];
  const perPage = 9;
  for (let p = 0; p < Math.ceil(count / perPage); p++) {
    const tiles = [];
    for (let i = 0; i < perPage; i++) {
      const back = el('div', 'card card-back');
      back.appendChild(el('div', 'back-title', deck.title));
      back.appendChild(el('div', 'back-level', LEVEL_NAMES[deck.level]));
      tiles.push(back);
    }
    pages.push(grid(tiles, deck));
  }
  return pages;
}

// ── Rendery gier ─────────────────────────────────────────────────────────

function withBacks(deck, front, count) {
  return state.printBacks ? [...front, ...renderBacks(deck, count)] : front;
}

function renderMemory(deck) {
  const words = shuffle(deck.items.flat());
  return withBacks(deck, [grid(words.map((w) => card(w)), deck)], words.length);
}

function renderPiotrus(deck) {
  const cards = [];
  for (const [group, words] of Object.entries(deck.items)) {
    for (const w of words) cards.push(card(w, group));
  }
  return withBacks(deck, [grid(shuffle(cards), deck)], cards.length);
}

function renderQA(deck) {
  const cards = deck.items.map((it) => card(it.q, null, state.showAnswers ? it.a : null));
  return withBacks(deck, [grid(cards, deck)], cards.length);
}

function renderBingo(deck) {
  const pool = wordPool(deck);
  const out = [];
  for (let n = 0; n < state.boards; n++) {
    const board = el('div', 'sheet-page');
    const h = el('h2', 'bingo-title', 'BINGO — ' + deck.title);
    h.appendChild(el('span', null, ' plansza ' + (n + 1)));
    board.appendChild(h);
    const g = el('div', 'bingo-grid');
    shuffle(pool).slice(0, 25).forEach((w) => {
      const { emoji, text } = splitIcon(w);
      const ic = emoji ? icon(emoji, 'icon-bingo') : null;
      const cell = el('div', 'bingo-cell ' + sizeClass(text));
      if (ic) cell.appendChild(ic);
      fillText(cell.appendChild(el('span')), text);
      g.appendChild(cell);
    });
    board.appendChild(g);
    out.push(board);
  }
  // Arkusz do losowania — nauczyciel tnie i ciągnie z woreczka.
  const draw = el('div', 'sheet-page');
  draw.appendChild(el('h2', 'bingo-title', 'Karteczki do losowania — ' + deck.title));
  const strips = el('div', 'strips');
  pool.forEach((w) => {
    const { emoji, text } = splitIcon(w);
    const strip = el('div', 'strip');
    const ic = emoji ? icon(emoji, 'icon-strip') : null;
    if (ic) strip.appendChild(ic);
    fillText(strip.appendChild(el('span')), text);
    strips.appendChild(strip);
  });
  draw.appendChild(strips);
  out.push(draw);
  return out;
}

const RENDERERS = { memory: renderMemory, piotrus: renderPiotrus, qa: renderQA, bingo: renderBingo };

// Kartka z zasadami — pierwsza strona wydruku, dla nauczyciela.
function renderRules(deck, gameId) {
  const g = GAMES[gameId];
  const t = DECK_TYPES[deck.type];
  const page = el('div', 'sheet-page rules-page');

  page.appendChild(el('h2', 'rules-title', g.icon + '  ' + g.name));
  page.appendChild(el('p', 'rules-deck', deck.title + '  ·  ' + LEVEL_NAMES[deck.level] + '  ·  ' + deck.area));

  const facts = el('div', 'rules-facts');
  [['Gracze', g.players], ['Czas', g.time], ['Kart w talii', countItems(deck)], ['Typ kart', t.icon + ' ' + t.name]]
    .forEach(([k, v]) => {
      const f = el('div', 'fact');
      f.appendChild(el('span', 'fact-k', k));
      f.appendChild(el('span', 'fact-v', String(v)));
      facts.appendChild(f);
    });
  page.appendChild(facts);

  const section = (title, items, ordered) => {
    page.appendChild(el('h3', null, title));
    const list = el(ordered ? 'ol' : 'ul');
    items.forEach((r) => list.appendChild(el('li', null, r)));
    page.appendChild(list);
  };
  section('Jak grać', g.rules, true);
  section('Warianty', g.variants, false);

  if (deck.note) {
    const tip = el('p', 'rules-note', '💡 ' + deck.note);
    page.appendChild(tip);
  }
  page.appendChild(el('p', 'rules-foot', 'Drukuj na papierze 160–250 g. Karty tnij po przerywanej linii.'));
  return page;
}

// ── Interfejs ────────────────────────────────────────────────────────────

function renderDeckList() {
  const list = $('#deck-list');
  list.innerHTML = '';
  const decks = DECKS.filter(matchesFilters);

  $('#deck-count').textContent = decks.length
    ? decks.length + (decks.length === 1 ? ' talia' : decks.length < 5 ? ' talie' : ' talii')
    : 'brak wyników';

  if (!decks.length) {
    list.appendChild(el('p', 'empty', 'Nic nie pasuje do tych filtrów.'));
    return;
  }

  // Grupowanie po poziomie — bez tego przy 70+ taliach lista jest nie do przejrzenia.
  for (const lvl of LEVELS) {
    const group = decks.filter((d) => d.level === lvl);
    if (!group.length) continue;
    list.appendChild(el('h3', 'level-head', LEVEL_NAMES[lvl]));
    for (const d of group) {
      const btn = el('button', 'deck' + (d.id === state.deckId ? ' active' : ''));
      btn.appendChild(el('span', 'deck-title', d.title));
      const meta = el('span', 'deck-meta');
      meta.appendChild(el('span', 'tag tag-' + (d.area === 'gramatyka' ? 'g' : 's'), d.area));
      meta.appendChild(el('span', 'tag tag-type', DECK_TYPES[d.type].icon + ' ' + DECK_TYPES[d.type].name));
      meta.appendChild(el('span', 'deck-n', countItems(d) + ' kart'));
      btn.appendChild(meta);
      btn.onclick = () => selectDeck(d.id);
      list.appendChild(btn);
    }
  }
}

function selectDeck(id) {
  state.deckId = id;
  const games = gamesFor(currentDeck());
  if (!games.includes(state.game)) state.game = games[0];
  renderDeckList();
  renderMain();
}

// Ekran startowy: wyjaśnia trzy typy talii i cztery gry — zanim cokolwiek wybierzesz.
function renderWelcome(main) {
  const w = el('div', 'welcome');
  w.appendChild(el('h2', null, 'Wybierz talię z listy po lewej'));
  w.appendChild(el('p', 'lead',
    'Talie różnią się tym, jak zbudowane są karty. Od typu talii zależy, w co można nią zagrać.'));

  const wrap = el('div', 'type-cards');
  for (const [key, t] of Object.entries(DECK_TYPES)) {
    const c = el('div', 'type-card');
    c.appendChild(el('div', 'type-icon', t.icon));
    c.appendChild(el('h3', null, t.name));
    c.appendChild(el('p', null, t.what));
    c.appendChild(el('p', 'type-looks', t.looks));

    const games = Object.entries(GAMES).filter(([, g]) => g.from.includes(key));
    const row = el('div', 'type-games');
    row.appendChild(el('span', 'type-games-label', 'Gry:'));
    games.forEach(([, g]) => row.appendChild(el('span', 'chip', g.icon + ' ' + g.name)));
    c.appendChild(row);

    const n = DECKS.filter((d) => d.type === key).length;
    c.appendChild(el('div', 'type-count', n + ' talii w tym formacie'));
    wrap.appendChild(c);
  }
  w.appendChild(wrap);
  main.appendChild(w);
}

function renderGamePicker(deck, bar) {
  const games = gamesFor(deck);
  const picker = el('div', 'game-picker');
  games.forEach((id) => {
    const g = GAMES[id];
    const b = el('button', 'game-tab' + (id === state.game ? ' active' : ''));
    b.appendChild(el('span', 'game-icon', g.icon));
    const txt = el('span', 'game-txt');
    txt.appendChild(el('strong', null, g.name));
    txt.appendChild(el('span', null, g.short));
    b.appendChild(txt);
    b.onclick = () => { state.game = id; renderMain(); };
    picker.appendChild(b);
  });
  bar.appendChild(picker);

  // Gdy bingo jest niedostępne, powiedz dlaczego — inaczej wygląda to jak brak funkcji.
  if (deck.type !== 'prompts' && !games.includes('bingo')) {
    bar.appendChild(el('p', 'hint',
      `Bingo wymaga min. 25 haseł, a ta talia ma ${wordPool(deck).length}. Dobierz większą talię z tego samego tematu.`));
  }
}

function checkbox(label, key, title) {
  const l = el('label', 'opt check');
  if (title) l.title = title;
  const inp = el('input');
  inp.type = 'checkbox';
  inp.checked = state[key];
  inp.onchange = (e) => { state[key] = e.target.checked; renderSheet(); };
  l.appendChild(inp);
  l.appendChild(el('span', null, label));
  return l;
}

function renderOptions(bar, deck) {
  const opts = el('div', 'options');

  if (state.game === 'bingo') {
    const l = el('label', 'opt');
    l.appendChild(el('span', null, 'Liczba plansz'));
    const inp = el('input');
    inp.type = 'number'; inp.min = '1'; inp.max = '30'; inp.value = String(state.boards);
    inp.oninput = (e) => { state.boards = Math.max(1, Math.min(30, +e.target.value || 1)); renderSheet(); };
    l.appendChild(inp);
    opts.appendChild(l);
  }

  if (state.game === 'qa') opts.appendChild(checkbox('odpowiedzi na kartach', 'showAnswers'));

  opts.appendChild(checkbox('kartka z zasadami', 'printRules',
    'Dokłada na początek wydruku stronę z zasadami gry.'));

  if (state.game !== 'bingo') {
    opts.appendChild(checkbox('rewersy (druk dwustronny)', 'printBacks',
      'Dokłada strony z rewersami. Drukuj dwustronnie, obracaniem wzdłuż dłuższej krawędzi.'));
  }

  // Ma sens tylko tam, gdzie są ikony — inaczej przełącznik nic nie robi.
  if (deckHasIcons(deck)) {
    opts.appendChild(checkbox('wersja do kolorowania', 'colouring',
      'Ukrywa wypełnienia ikon, zostawia sam kontur. Mniej tonera, dodatkowa aktywność plastyczna.'));
  }

  const btns = el('div', 'buttons');
  const sh = el('button', '', '🔀 Przetasuj');
  sh.onclick = renderSheet;
  const pr = el('button', 'primary', '🖨️ Drukuj');
  pr.onclick = () => window.print();
  btns.appendChild(sh);
  btns.appendChild(pr);
  opts.appendChild(btns);

  return opts;
}

// Panel „Jak grać" na ekranie — zwijany, żeby nie zasłaniał podglądu.
function renderRulesPanel(deck) {
  const g = GAMES[state.game];
  const det = el('details', 'rules-panel no-print');
  const sum = el('summary');
  sum.appendChild(el('strong', null, 'Jak grać: ' + g.name));
  sum.appendChild(el('span', 'rules-meta', g.players + ' · ' + g.time));
  det.appendChild(sum);

  const body = el('div', 'rules-body');
  body.appendChild(el('p', 'rules-prints', '🖨️ Wydruk zawiera: ' + g.prints));

  const cols = el('div', 'rules-cols');
  const mk = (title, items, ordered) => {
    const col = el('div');
    col.appendChild(el('h4', null, title));
    const list = el(ordered ? 'ol' : 'ul');
    items.forEach((r) => list.appendChild(el('li', null, r)));
    col.appendChild(list);
    return col;
  };
  cols.appendChild(mk('Przebieg gry', g.rules, true));
  cols.appendChild(mk('Warianty', g.variants, false));
  body.appendChild(cols);

  if (deck.note) body.appendChild(el('p', 'rules-note', '💡 ' + deck.note));
  det.appendChild(body);
  return det;
}

// Sam arkusz do druku — przerysowywany osobno przy tasowaniu i zmianie opcji.
function renderSheet() {
  const out = $('#sheet');
  out.innerHTML = '';
  const deck = currentDeck();
  if (!deck) return;
  // klasa na <body>, bo reguła trybu kolorowania celuje w sprite, a ten leży poza arkuszem
  document.body.classList.toggle('colouring', state.colouring);
  if (state.printRules) out.appendChild(renderRules(deck, state.game));
  RENDERERS[state.game](deck).forEach((node) => out.appendChild(node));
}

function renderMain() {
  const main = $('#main');
  main.innerHTML = '';
  const deck = currentDeck();

  if (!deck) {
    renderWelcome(main);
    return;
  }

  const bar = el('div', 'workbench no-print');
  const head = el('div', 'wb-head');
  head.appendChild(el('h2', null, deck.title));
  const sub = el('p', 'wb-sub');
  sub.appendChild(el('span', 'tag tag-' + (deck.area === 'gramatyka' ? 'g' : 's'), deck.area));
  sub.appendChild(el('span', 'tag tag-type', DECK_TYPES[deck.type].icon + ' ' + DECK_TYPES[deck.type].name));
  sub.appendChild(el('span', null, LEVEL_NAMES[deck.level] + ' · ' + countItems(deck) + ' kart'));
  head.appendChild(sub);
  bar.appendChild(head);

  renderGamePicker(deck, bar);
  bar.appendChild(renderOptions(bar, deck));
  bar.appendChild(renderRulesPanel(deck));
  main.appendChild(bar);

  main.appendChild(el('div', 'sheet-label no-print', 'Podgląd wydruku'));
  const sheet = el('div', '');
  sheet.id = 'sheet';
  main.appendChild(sheet);
  renderSheet();
}

// Sprite z ikonami wstrzykujemy raz do dokumentu. Musi być w TYM SAMYM dokumencie,
// bo <use href="plik.svg#id"> nie działa po otwarciu strony dwuklikiem (file://).
function initIcons() {
  if (typeof OM_SPRITE === 'undefined') return;
  const host = el('div');
  host.style.display = 'none';
  host.innerHTML = OM_SPRITE;
  document.body.insertBefore(host, document.body.firstChild);
}

function init() {
  initIcons();
  const lvl = $('#f-level');
  LEVELS.forEach((l) => {
    const o = el('option', null, LEVEL_NAMES[l]);
    o.value = l;
    lvl.appendChild(o);
  });

  lvl.onchange = (e) => { state.level = e.target.value; renderDeckList(); };
  $('#f-area').onchange = (e) => { state.area = e.target.value; renderDeckList(); };
  $('#f-search').oninput = (e) => { state.search = e.target.value.trim(); renderDeckList(); };
  $('#reset-btn').onclick = () => {
    state.deckId = null;
    renderDeckList();
    renderMain();
  };

  renderDeckList();
  renderMain();
}

if (typeof document !== 'undefined' && document.getElementById('deck-list')) init();
