// Buduje fonts/andika.css — krój Andika zawężony do znaków używanych w projekcie,
// wpisany do CSS jako data: URI.  node tools/build-font.js
//
// Dlaczego data: URI, a nie zwykły plik .woff2 obok CSS: przeglądarki blokują
// wczytywanie krojów przez CORS, gdy stronę otwiera się dwuklikiem (file://).
// Wpisany w CSS krój działa i z serwera, i z folderu na pulpicie.
//
// Wymaga: pyftsubset (pip install fonttools brotli) oraz plików .ttf Andiki.
// Krój: Andika, SIL International, licencja OFL 1.1 (fonts/OFL.txt).

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SRC = process.argv[2];
if (!SRC) {
  console.error('Użycie: node tools/build-font.js <katalog-z-Andika-*.ttf>');
  process.exit(1);
}

// Znaki, które faktycznie trafiają na ekran i na wydruk.
function usedChars() {
  const files = [
    ...fs.readdirSync(path.join(ROOT, 'data')).filter((f) => f.endsWith('.js') && f !== 'icons.js')
      .map((f) => path.join(ROOT, 'data', f)),
    path.join(ROOT, 'app.js'),
    path.join(ROOT, 'index.html'),
  ];
  const text = files.map((f) => fs.readFileSync(f, 'utf8')).join('');
  const set = new Set(text);

  // Baza na wypadek treści dopisanych później: ASCII, polskie znaki, typografia.
  const base =
    ' !"#$%&\'()*+,-./0123456789:;<=>?@[\\]^_`{|}~' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' +
    'ĄĆĘŁŃÓŚŹŻąćęłńóśźż' +
    'ÄÖÜäöüßÉÈÊéèêÁÍÑáíñçÇ' +
    '„”“"’‘–—…·×÷°→←↔≥≤±§¶©®™€£$¢½¼¾';
  for (const c of base) set.add(c);

  // Emoji odcinamy — na kartach zastępują je ikony SVG, a w krojach tekstowych ich nie ma.
  return [...set].filter((c) => {
    const cp = c.codePointAt(0);
    return cp >= 0x20 && cp < 0x2600;
  });
}

function subset(ttf, chars) {
  const out = path.join(require('os').tmpdir(), path.basename(ttf, '.ttf') + '.subset.woff2');
  execFileSync('pyftsubset', [
    ttf,
    '--output-file=' + out,
    '--flavor=woff2',
    '--unicodes=' + chars.map((c) => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')).join(','),
    '--layout-features=ccmp,liga,locl,kern,mark,mkmk',
    '--no-hinting',
    '--desubroutinize',
    '--name-IDs=1,2,3,4,5,6',
  ]);
  return fs.readFileSync(out);
}

const chars = usedChars();
console.error(`znaków w podzbiorze: ${chars.length}`);

const faces = [
  ['Andika-Regular.ttf', 400, 'normal'],
  ['Andika-Bold.ttf', 700, 'normal'],
  ['Andika-Italic.ttf', 400, 'italic'],
];

let css = `/* PLIK GENEROWANY — nie edytuj ręcznie. Przebuduj: node tools/build-font.js <kat>
   Andika, SIL International — licencja OFL 1.1, patrz fonts/OFL.txt
   Krój dla dzieci uczących się czytać: jednopiętrowe "a" i "g", rozróżnialne I l 1.
   Zawężony do znaków używanych w projekcie i wpisany jako data: URI,
   żeby działał również po otwarciu index.html dwuklikiem (file://). */\n`;

let total = 0;
for (const [file, weight, style] of faces) {
  const src = path.join(SRC, file);
  if (!fs.existsSync(src)) throw new Error('brak pliku: ' + src);
  const buf = subset(src, chars);
  total += buf.length;
  console.error(`  ${file}: ${Math.round(buf.length / 1024)} KB`);
  css += `
@font-face {
  font-family: 'Andika';
  font-style: ${style};
  font-weight: ${weight};
  font-display: swap;
  src: url(data:font/woff2;base64,${buf.toString('base64')}) format('woff2');
}
`;
}

fs.mkdirSync(path.join(ROOT, 'fonts'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'fonts', 'andika.css'), css);
console.error(`zapisano fonts/andika.css — ${Math.round(fs.statSync(path.join(ROOT, 'fonts', 'andika.css')).size / 1024)} KB`);
