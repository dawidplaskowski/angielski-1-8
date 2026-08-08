'use strict';

const LEVELS = ['1-3', '4', '5-6', '7-8'];
const $ = (sel) => document.querySelector(sel);

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

// Pula pojedynczych słów z talii — do bingo.
function wordPool(deck) {
  if (deck.type === 'pairs') return deck.items.map((p) => p[0]);
  if (deck.type === 'groups') return Object.values(deck.items).flat();
  return deck.items.map((it) => it.q);
}

// Które mechaniki ma sens drukować z tej talii.
// Bingo tylko gdy starczy haseł na planszę 5×5 — inaczej pola by się powtarzały.
function gamesFor(deck) {
  const bingo = deck.type !== 'prompts' && wordPool(deck).length >= 25 ? ['bingo'] : [];
  if (deck.type === 'pairs') return ['memory', ...bingo];
  if (deck.type === 'groups') return ['piotrus', ...bingo];
  return ['qa'];
}

const GAME_NAMES = {
  memory: 'Memory / dobieranie par',
  piotrus: 'Piotruś (grupy po kilka kart)',
  qa: 'Karty zadań',
  bingo: 'Bingo 5×5',
};

// Krótkie słowo = duża czcionka. Progi dobrane pod kartę 63 mm.
function sizeClass(text) {
  const n = text.length;
  return n <= 10 ? 'xl' : n <= 22 ? 'lg' : n <= 45 ? 'md' : 'sm';
}

function card(main, corner, footer) {
  const el = document.createElement('div');
  el.className = 'card';
  if (corner) {
    const c = document.createElement('div');
    c.className = 'corner';
    c.textContent = corner;
    el.appendChild(c);
  }
  const body = document.createElement('div');
  body.className = 'body ' + sizeClass(main);
  body.textContent = main;
  el.appendChild(body);
  if (footer) {
    const f = document.createElement('div');
    f.className = 'answer';
    f.textContent = footer;
    el.appendChild(f);
  }
  return el;
}

function grid(cards) {
  const g = document.createElement('div');
  g.className = 'card-grid';
  cards.forEach((c) => g.appendChild(c));
  return g;
}

// ── Rendery ──────────────────────────────────────────────────────────────

function renderMemory(deck) {
  const cards = shuffle(deck.items.flat()).map((w) => card(w));
  return [grid(cards)];
}

function renderPiotrus(deck) {
  const cards = [];
  for (const [group, words] of Object.entries(deck.items)) {
    for (const w of words) cards.push(card(w, group));
  }
  return [grid(shuffle(cards))];
}

function renderQA(deck, opts) {
  const cards = deck.items.map((it) => card(it.q, null, opts.showAnswers ? it.a : null));
  return [grid(cards)];
}

function renderBingo(deck, opts) {
  const pool = wordPool(deck);
  const out = [];
  for (let n = 0; n < opts.boards; n++) {
    const words = shuffle(pool).slice(0, 25);
    const board = document.createElement('div');
    board.className = 'bingo';
    board.innerHTML = `<h2>BINGO — ${deck.title} <span>plansza ${n + 1}</span></h2>`;
    const g = document.createElement('div');
    g.className = 'bingo-grid';
    words.forEach((w) => {
      const cell = document.createElement('div');
      cell.className = 'bingo-cell ' + sizeClass(w);
      cell.textContent = w;
      g.appendChild(cell);
    });
    board.appendChild(g);
    out.push(board);
  }
  // Arkusz do losowania — nauczyciel tnie i ciągnie z woreczka.
  const draw = document.createElement('div');
  draw.className = 'bingo';
  draw.innerHTML = `<h2>Karteczki do losowania — ${deck.title}</h2>`;
  const strips = document.createElement('div');
  strips.className = 'strips';
  pool.forEach((w) => {
    const s = document.createElement('div');
    s.className = 'strip';
    s.textContent = w;
    strips.appendChild(s);
  });
  draw.appendChild(strips);
  out.push(draw);
  return out;
}

const RENDERERS = { memory: renderMemory, piotrus: renderPiotrus, qa: renderQA, bingo: renderBingo };

// ── UI ───────────────────────────────────────────────────────────────────

function currentFilters() {
  return {
    level: $('#f-level').value,
    area: $('#f-area').value,
  };
}

function visibleDecks() {
  const f = currentFilters();
  return DECKS.filter((d) => (!f.level || d.level === f.level) && (!f.area || d.area === f.area));
}

function renderDeckList() {
  const list = $('#deck-list');
  list.innerHTML = '';
  const decks = visibleDecks();
  if (!decks.length) {
    list.innerHTML = '<p class="empty">Brak talii dla tych filtrów.</p>';
    return;
  }
  for (const d of decks) {
    const btn = document.createElement('button');
    btn.className = 'deck' + (d.id === state.deckId ? ' active' : '');
    btn.innerHTML =
      `<strong></strong><span class="meta">kl. ${d.level} · ${d.area} · ${countItems(d)} poz.</span>`;
    btn.querySelector('strong').textContent = d.title;
    btn.onclick = () => selectDeck(d.id);
    list.appendChild(btn);
  }
}

function countItems(d) {
  return d.type === 'groups' ? Object.values(d.items).flat().length : d.items.length;
}

const state = { deckId: null, game: null, boards: 4, showAnswers: true };

function selectDeck(id) {
  state.deckId = id;
  const deck = DECKS.find((d) => d.id === id);
  const games = gamesFor(deck);
  if (!games.includes(state.game)) state.game = games[0];

  const sel = $('#f-game');
  sel.innerHTML = '';
  games.forEach((g) => {
    const o = document.createElement('option');
    o.value = g;
    o.textContent = GAME_NAMES[g];
    sel.appendChild(o);
  });
  sel.value = state.game;

  renderDeckList();
  renderPreview();
}

function renderPreview() {
  const out = $('#sheet');
  out.innerHTML = '';
  const deck = DECKS.find((d) => d.id === state.deckId);
  if (!deck) {
    out.innerHTML = '<p class="empty">Wybierz talię z listy po lewej.</p>';
    $('#opts-bingo').hidden = true;
    $('#opts-qa').hidden = true;
    $('#print-btn').disabled = true;
    return;
  }
  $('#opts-bingo').hidden = state.game !== 'bingo';
  $('#opts-qa').hidden = state.game !== 'qa';
  $('#print-btn').disabled = false;

  const title = document.createElement('h2');
  title.className = 'sheet-title no-print';
  title.textContent = `${deck.title} — ${GAME_NAMES[state.game]}`;
  out.appendChild(title);

  RENDERERS[state.game](deck, state).forEach((node) => out.appendChild(node));
}

function init() {
  const lvl = $('#f-level');
  LEVELS.forEach((l) => lvl.insertAdjacentHTML('beforeend', `<option value="${l}">klasy ${l}</option>`));

  lvl.onchange = $('#f-area').onchange = renderDeckList;
  $('#f-game').onchange = (e) => {
    state.game = e.target.value;
    renderPreview();
  };
  $('#f-boards').oninput = (e) => {
    state.boards = Math.max(1, Math.min(30, +e.target.value || 1));
    renderPreview();
  };
  $('#f-answers').onchange = (e) => {
    state.showAnswers = e.target.checked;
    renderPreview();
  };
  $('#shuffle-btn').onclick = renderPreview;
  $('#print-btn').onclick = () => window.print();

  renderDeckList();
  renderPreview();
}

if (typeof document !== 'undefined' && document.getElementById('deck-list')) init();
