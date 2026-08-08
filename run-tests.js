// Uruchamia testy z test.html w node (bez przeglądarki): node run-tests.js
// W przeglądarce te same testy pokazuje test.html.
const fs = require('fs');

global.window = global;
global.document = { getElementById: () => null, querySelector: () => null };

const files = ['data/games.js', 'data/decks-1-3.js', 'data/decks-4.js', 'data/decks-5-6.js', 'data/decks-7-8.js'];
const src = files.map((f) => fs.readFileSync(f, 'utf8')).join('\n');
const app = fs.readFileSync('app.js', 'utf8');
const tests = fs.readFileSync('test.html', 'utf8').split('<script>').pop().split('</script>')[0];

// eval-owane deklaracje nie wyciekają tutaj — oddajemy wynik jawnie ostatnim wyrażeniem.
const out = eval(
  src + '\n' + app + '\n' + tests +
  '\n({ results, decks: DECKS, count: countItems })'
);

out.results.forEach(([ok, name]) => console.log(ok ? 'PASS' : 'FAIL', name));
const failed = out.results.filter((r) => !r[0]);
const cards = out.decks.reduce((n, d) => n + out.count(d), 0);
console.log(`\n${out.decks.length} talii · ${cards} haseł · ` +
  ['1-3', '4', '5-6', '7-8'].map((l) => `kl.${l}: ${out.decks.filter((d) => d.level === l).length}`).join(' · '));
console.log(failed.length ? `\n${failed.length} testów nie przeszło` : `\nWszystkie ${out.results.length} testy OK`);
process.exit(failed.length ? 1 : 0);
