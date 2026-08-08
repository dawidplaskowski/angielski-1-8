# Angielski 1–8 — karty i gry do druku

Statyczna strona: wybierasz talię i grę, klikasz **Drukuj**, dostajesz gotowe karty na A4.
Bez instalacji, bez konta, bez internetu (po pobraniu folderu).

**Użycie:** otwórz `index.html` w przeglądarce (albo wejdź na link GitHub Pages).
Filtruj po klasie i zakresie → kliknij talię → wybierz grę → **Drukuj**.

Drukuj na papierze 160–250 g. Karty tnij po przerywanej linii.
Przycisk **Przetasuj** losuje układ od nowa (przy bingo — nowe plansze).

## Gry

| Gra | Z czego powstaje |
|---|---|
| **Memory / dobieranie par** | talie z parami (przeciwieństwa, ang–pol, bezokolicznik–past simple) |
| **Piotruś** | talie z grupami; w rogu karty jest nazwa grupy, zbiera się komplety |
| **Karty zadań** | talie gramatyczne; odpowiedź drobnym drukiem u dołu (można ukryć) |
| **Bingo 5×5** | każda talia słownictwa z min. 25 hasłami; N plansz + arkusz do losowania |

## Dodawanie własnej talii

Otwórz `data/decks.js` w Notatniku, skopiuj dowolną talię, zmień treść.
Ważne: nowe `id` musi być unikalne. Trzy formaty:

```js
// pary — daje memory i bingo
{ id:'moje-slowka', title:'Moje słówka', level:'5-6', area:'słownictwo', type:'pairs',
  items:[ ['cat','kot'], ['dog','pies'] ] },

// grupy — daje Piotrusia i bingo
{ id:'moje-grupy', title:'Sporty', level:'4', area:'słownictwo', type:'groups',
  items:{ 'Ball games':['⚽ football','🏀 basketball','🎾 tennis'],
          'Water':['🏊 swimming','🤿 diving','🚣 rowing'] } },

// zadania — daje karty zadań
{ id:'moja-gramatyka', title:'Tryb rozkazujący', level:'7-8', area:'gramatyka', type:'prompts',
  items:[ {q:'___ (open) the window!', a:'Open'} ] },
```

- `level`: `'1-3'` | `'4'` | `'5-6'` | `'7-8'`
- `area`: `'słownictwo'` | `'gramatyka'`
- Emoji wklejasz wprost w tekst (`'🍎 apple'`) — drukują się kolorowo.
- Bingo pojawi się automatycznie, gdy talia ma co najmniej 25 haseł.

Po zmianie odśwież stronę. Jeśli talia zniknęła — otwórz `test.html`,
pokaże na czerwono co jest nie tak (literówka, brakujący przecinek, powtórzone `id`).

## Testy

Otwórz `test.html` w przeglądarce. Sprawdza poprawność wszystkich talii
i logikę tasowania/doboru gier. Uruchamiaj po każdej edycji `decks.js`.

## Publikacja na GitHub Pages

Wrzuć folder do repozytorium → Settings → Pages → Source: `main` / `root`.
Nic więcej — nie ma kroku budowania.
