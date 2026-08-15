'use strict';

const BOARD = window.ANIMAL_ADVENTURE;
const SVG_NS = 'http://www.w3.org/2000/svg';

function node(tag, className, text) {
  const n = document.createElement(tag);
  if (className) n.className = className;
  if (text != null) n.textContent = text;
  return n;
}

function initIcons() {
  if (typeof OM_SPRITE === 'undefined') return;
  const host = node('div');
  host.hidden = true;
  host.innerHTML = OM_SPRITE;
  document.body.insertBefore(host, document.body.firstChild);
}

function boardIcon(emoji) {
  const hex = typeof OM_MAP !== 'undefined' && OM_MAP[emoji];
  const symbol = hex && document.getElementById('om-' + hex);
  if (!symbol) return node('span', null, emoji);
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 72 72');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', emoji);
  for (const child of symbol.children) svg.appendChild(child.cloneNode(true));
  return svg;
}

function createRoute(col, row) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'route');
  svg.setAttribute('viewBox', '0 0 210 297');
  svg.setAttribute('aria-hidden', 'true');
  const points = BOARD.fields.map((f) => `${f.x - col * 210},${f.y - row * 297}`).join(' ');
  for (const className of ['route-shadow', 'route-main']) {
    const line = document.createElementNS(SVG_NS, 'polyline');
    line.setAttribute('class', className);
    line.setAttribute('points', points);
    svg.appendChild(line);
  }
  return svg;
}

function createField(data, col, row) {
  const field = node('div', `field ${data.kind}`);
  field.style.left = (data.x - col * 210) + 'mm';
  field.style.top = (data.y - row * 297) + 'mm';
  field.setAttribute('aria-label', `Pole ${data.n}: ${data.easy} ${data.hard}`);
  field.appendChild(node('span', 'field-number', data.n));

  const iconWrap = node('div', data.icons ? 'field-icons' : 'field-icon');
  (data.icons || [data.icon]).filter(Boolean).forEach((emoji) => iconWrap.appendChild(boardIcon(emoji)));
  field.appendChild(iconWrap);
  field.appendChild(node('div', 'field-easy', data.easy));
  field.appendChild(node('div', 'field-hard', data.hard));
  return field;
}

function createWorld(col, row) {
  const world = node('div', 'board-world');
  world.appendChild(createRoute(col, row));
  BOARD.fields
    .filter((field) => Math.floor(field.x / 210) === col && Math.floor(field.y / 297) === row)
    .forEach((field) => world.appendChild(createField(field, col, row)));

  if (col === 0 && row === 0) {
    const title = node('div', 'world-title');
    title.appendChild(node('strong', null, 'ANIMAL ADVENTURE'));
    title.appendChild(node('span', null, 'Wielka wyprawa zwierząt'));
    world.appendChild(title);
  }
  return world;
}

function createBoardPage(code, col, row) {
  const page = node('section', 'print-page board-page');
  page.dataset.col = col;
  page.dataset.row = row;
  page.setAttribute('aria-label', `Część planszy ${code}`);
  page.appendChild(createWorld(col, row));
  page.appendChild(node('div', 'sheet-code', code));
  page.appendChild(node('div', 'seam-note', `${code} · druk 100% · grafiki tła: włączone`));
  return page;
}

function createRulesPage() {
  const page = node('section', 'print-page info-page');
  page.innerHTML = `
    <h1>🐾 Animal Adventure</h1>
    <p class="subtitle">Zasady gry · klasy 1–3</p>
    <div class="facts">
      <div class="fact"><b>Gracze</b><span>2–4</span></div>
      <div class="fact"><b>Czas</b><span>20–30 min</span></div>
      <div class="fact"><b>Potrzebne</b><span>kostka + pionki</span></div>
      <div class="fact"><b>Cel</b><span>Animal Party</span></div>
    </div>
    <h2>Przygotowanie</h2>
    <ol>
      <li>Wydrukuj arkusze A–D jednostronnie, w skali 100% i z włączonymi grafikami tła.</li>
      <li>Ułóż kartki w układzie A–B / C–D. Przytnij tylko białe wewnętrzne marginesy, dopasuj trasę i sklej kartki od spodu.</li>
      <li>Każdy wybiera pionek i ustawia go na polu 1. Zaczyna najmłodszy gracz.</li>
      <li>Przed grą wybierz poziom: polecenie bez gwiazdki dla klas 1–2 albo polecenie ★ dla klasy 3.</li>
    </ol>
    <h2>Jak grać</h2>
    <ol>
      <li>Rzuć kostką i przesuń pionek o odpowiednią liczbę pól.</li>
      <li>Wykonaj zadanie z pola. W klasie 3 wykonaj polecenie oznaczone ★.</li>
      <li>Dobra odpowiedź: zostajesz na polu. Brak odpowiedzi: wracasz na pole, z którego zaczynałeś tę turę.</li>
      <li>Nie musisz wyrzucić dokładnej liczby, aby wejść na metę. Pierwsza osoba na polu 32 wygrywa.</li>
    </ol>
    <h2>Pomagamy sobie</h2>
    <ul>
      <li>Po jednej własnej próbie gracz może powiedzieć <strong>“Help, please!”</strong> i wskazać pomocnika.</li>
      <li>Jeżeli wspólnie odpowiedzą dobrze, aktywny gracz zostaje na polu, a pomocnik przesuwa pionek o 1.</li>
      <li>Prowadzący uznaje poprawną wymowę odpowiednią do wieku — liczy się odwaga i komunikacja.</li>
    </ul>
    <div class="tip"><strong>Łagodny wariant:</strong> przy błędnej odpowiedzi gracz zostaje na nowym polu, ale nie wykonuje efektu specjalnego. <strong>Szybka gra:</strong> rozpocznijcie od pola 10.</div>
  `;
  return page;
}

function createAnswersPage() {
  const page = node('section', 'print-page info-page');
  page.appendChild(node('h1', null, 'Klucz odpowiedzi'));
  page.appendChild(node('p', 'subtitle', 'Najpierw odpowiedź dla klas 1–2, po kropce wariant ★ dla klasy 3. Akceptuj równoważne poprawne zdania.'));
  const grid = node('div', 'answer-grid');
  BOARD.fields.filter((f) => f.kind === 'task').forEach((f) => {
    const row = node('div', 'answer-row');
    row.appendChild(node('span', 'answer-n', f.n));
    const text = node('div');
    const prompt = node('b', null, `${f.easy} ★ ${f.hard}`);
    text.appendChild(prompt);
    text.appendChild(document.createTextNode(f.answer));
    row.appendChild(text);
    grid.appendChild(row);
  });
  page.appendChild(grid);
  const tip = node('div', 'tip');
  tip.innerHTML = '<strong>Wymowa:</strong> nie przerywaj płynności dla drobnych błędów. Popraw modelowo po odpowiedzi i poproś grupę o jedno wspólne powtórzenie.';
  page.appendChild(tip);
  return page;
}

function createHelpPage() {
  const page = node('section', 'print-page info-page');
  page.innerHTML = `
    <h1>Language Help</h1>
    <p class="subtitle">Ściąga językowa i składanie planszy</p>
    <div class="phrase-grid">
      <div class="phrase"><strong>It is a cat.</strong><span>To jest kot.</span></div>
      <div class="phrase"><strong>It is big / small.</strong><span>To jest duże / małe.</span></div>
      <div class="phrase"><strong>It is fast / slow.</strong><span>To jest szybkie / wolne.</span></div>
      <div class="phrase"><strong>It can run.</strong><span>Ono potrafi biegać.</span></div>
      <div class="phrase"><strong>It can swim / fly.</strong><span>Ono potrafi pływać / latać.</span></div>
      <div class="phrase"><strong>It has got four legs.</strong><span>Ono ma cztery nogi.</span></div>
      <div class="phrase"><strong>My answer is…</strong><span>Moja odpowiedź to…</span></div>
      <div class="phrase"><strong>Help, please!</strong><span>Pomocy, proszę!</span></div>
    </div>
    <h2>Pola specjalne</h2>
    <div class="legend-grid">
      <div class="legend"><strong>🌈 / 🌉 Skrót</strong>Przesuń pionek o 2 pola do przodu.</div>
      <div class="legend"><strong>🟤 / 💨 Przeszkoda</strong>Cofnij pionek o wskazaną liczbę pól.</div>
      <div class="legend"><strong>🤝 / 🗣️ Drużyna</strong>Poproś o pomoc albo wspólnie nazwijcie zwierzę.</div>
    </div>
    <h2>Jak połączyć arkusze</h2>
    <div class="assembly">
      <div class="assembly-map"><div>A</div><div>B</div><div>C</div><div>D</div></div>
      <ol>
        <li>Drukuj jednostronnie, pionowo, w skali 100%.</li>
        <li>Włącz opcję „grafiki tła”. Nie wybieraj „dopasuj do strony”.</li>
        <li>Jeżeli drukarka zostawia białe marginesy, przytnij tylko krawędzie stykające się pośrodku.</li>
        <li>Dopasuj przerywaną żółtą trasę i środkowy tytuł, po czym sklej kartki taśmą od spodu.</li>
        <li>Zalaminuj arkusze osobno albo całość po sklejeniu.</li>
      </ol>
    </div>
    <h2>Wariant ruchowy</h2>
    <p style="font-size:9pt;margin:0">Przed pozostaniem na polu każdy gracz pokazuje ruchem zwierzę z obrazka. Pozostali mówią jego nazwę po angielsku. Ten wariant szczególnie dobrze działa z klasą 1.</p>
    <p class="credits">Ilustracja tła: wygenerowana dla tego projektu z użyciem GPT Image 2. Ikony: OpenMoji — CC BY-SA 4.0. Krój Andika: SIL Open Font License 1.1.</p>
  `;
  return page;
}

function render() {
  initIcons();
  const pages = document.getElementById('pages');
  [['A',0,0], ['B',1,0], ['C',0,1], ['D',1,1]]
    .forEach(([code,col,row]) => pages.appendChild(createBoardPage(code,col,row)));
  pages.appendChild(createRulesPage());
  pages.appendChild(createAnswersPage());
  pages.appendChild(createHelpPage());
}

function printPages(boardOnly) {
  document.body.classList.toggle('board-only', boardOnly);
  window.print();
}

document.getElementById('print-board').addEventListener('click', () => printPages(true));
document.getElementById('print-pack').addEventListener('click', () => printPages(false));
window.addEventListener('afterprint', () => document.body.classList.remove('board-only'));
render();
