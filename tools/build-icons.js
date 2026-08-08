// Buduje data/icons.js — sprite z ikonami OpenMoji dla emoji użytych w taliach.
// Uruchamiasz TYLKO po dodaniu nowych emoji do talii:  node tools/build-icons.js
// Wymaga internetu. Wynik (data/icons.js) jest w repo, więc aplikacja działa offline.
//
// Ikony: OpenMoji — the open-source emoji and icon project. Licencja CC BY-SA 4.0.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const VERSION = '17.0.0';
const CDN = `https://cdn.jsdelivr.net/npm/openmoji@${VERSION}`;
const CACHE = path.join(require('os').tmpdir(), 'openmoji-cache-' + VERSION);
const DECK_FILES = fs.readdirSync(path.join(ROOT, 'data')).filter((f) => f.startsWith('decks-'));

const EMOJI_RE = /\p{Extended_Pictographic}(️|‍\p{Extended_Pictographic}|[\u{1F3FB}-\u{1F3FF}])*|[0-9#*]️?⃣/gu;

async function getText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

// openmoji.json waży 2 MB — trzymamy poza repo, w cache systemowym.
async function loadIndex() {
  fs.mkdirSync(CACHE, { recursive: true });
  const file = path.join(CACHE, 'openmoji.json');
  if (!fs.existsSync(file)) {
    process.stderr.write('pobieram indeks OpenMoji…\n');
    fs.writeFileSync(file, await getText(`${CDN}/data/openmoji.json`));
  }
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function usedEmoji() {
  const sandbox = { window: {} };
  sandbox.window.DECKS = [];
  const src = DECK_FILES.map((f) => fs.readFileSync(path.join(ROOT, 'data', f), 'utf8')).join('\n');
  new Function('window', src + '\nreturn window.DECKS;')(sandbox.window);
  const decks = sandbox.window.DECKS;

  const strings = [];
  for (const d of decks) {
    if (d.type === 'pairs') strings.push(...d.items.flat());
    else if (d.type === 'groups') strings.push(...Object.values(d.items).flat());
    else d.items.forEach((it) => strings.push(it.q, it.a));
    if (d.note) strings.push(d.note);
  }
  const set = new Set();
  for (const s of strings) for (const m of String(s).match(EMOJI_RE) || []) set.add(m);
  return [...set];
}

// SVG OpenMoji mają id="color"/"line" — w jednym dokumencie dałyby duplikaty.
// Zamieniamy je na klasy, żeby dało się ukryć warstwę koloru (tryb do kolorowania).
// Wolno tak robić tylko dlatego, że pliki nie mają wewnętrznych odwołań (url(#…), href="#…").
// Gdyby OpenMoji kiedyś dodało gradienty czy maski, asercja niżej zerwie build.
function toSymbol(svg, id) {
  if (/url\(#|href="#/.test(svg)) {
    throw new Error(`${id}: SVG ma wewnętrzne odwołanie do id — zamiana id na klasy zepsułaby ikonę`);
  }
  const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  const cleaned = inner
    .replace(/\s+id="([^"]*)"/g, (_, v) => ' class="om-' + v.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') + '"')
    .replace(/>\s+</g, '><')
    .trim();
  if (/\sid="/.test(cleaned)) throw new Error(`${id}: został atrybut id`);
  return `<symbol id="om-${id}" viewBox="0 0 72 72">${cleaned}</symbol>`;
}

async function fetchIcon(hex) {
  const file = path.join(CACHE, hex + '.svg');
  if (fs.existsSync(file)) return fs.readFileSync(file, 'utf8');
  const svg = await getText(`${CDN}/color/svg/${hex}.svg`);
  fs.writeFileSync(file, svg);
  return svg;
}

// Nazwy plików OpenMoji idą po `hexcode`, który pomija selektor wariantu FE0F,
// choć pole `emoji` w indeksie go zawiera. Dlatego mapujemy po kodzie, nie po znaku.
function hexOf(emoji) {
  return [...emoji].map((c) => c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')).join('-');
}

function resolveHex(emoji, known) {
  const candidates = [hexOf(emoji), hexOf(emoji.replace(/️/g, ''))];
  return candidates.find((h) => known.has(h)) || null;
}

async function main() {
  const index = await loadIndex();
  const known = new Set(index.map((o) => o.hexcode));
  const emojis = usedEmoji();
  process.stderr.write(`emoji w taliach: ${emojis.length}\n`);

  const missing = emojis.filter((e) => !resolveHex(e, known));
  if (missing.length) throw new Error('brak w OpenMoji: ' + missing.join(' '));

  const map = {};
  const symbols = [];
  const seen = new Set();
  let done = 0;

  // partiami, żeby nie wysycić połączenia setkami równoległych żądań
  for (let i = 0; i < emojis.length; i += 20) {
    const batch = emojis.slice(i, i + 20);
    await Promise.all(batch.map(async (e) => {
      const hex = resolveHex(e, known);
      map[e] = hex;
      const svg = await fetchIcon(hex);
      if (!seen.has(hex)) { seen.add(hex); symbols.push(toSymbol(svg, hex)); }
      done++;
    }));
    process.stderr.write(`\r${done}/${emojis.length}`);
  }
  process.stderr.write('\n');

  symbols.sort();
  const out = `// PLIK GENEROWANY — nie edytuj ręcznie. Przebuduj: node tools/build-icons.js
// Ikony: OpenMoji ${VERSION} — the open-source emoji and icon project. Licencja CC BY-SA 4.0.
// ${symbols.length} ikon użytych w taliach.
window.OM_MAP = ${JSON.stringify(map)};
window.OM_SPRITE = ${JSON.stringify(`<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">${symbols.join('')}</svg>`)};
`;
  const dest = path.join(ROOT, 'data', 'icons.js');
  fs.writeFileSync(dest, out);
  process.stderr.write(`zapisano data/icons.js — ${symbols.length} ikon, ${Math.round(out.length / 1024)} KB\n`);
}

main().catch((e) => { process.stderr.write('BŁĄD: ' + e.message + '\n'); process.exit(1); });
