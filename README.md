# English Toolbox — plansze, karty i gry do druku

Statyczna biblioteka materiałów: wybierasz planszę, talię albo grę, konfigurujesz wariant
i klikasz **Drukuj**. Wszystkie materiały są przygotowane na A4.
Bez instalacji, bez konta, bez internetu (po pobraniu folderu).

**73 talie · ok. 1900 haseł** — słownictwo i gramatyka dla klas 1–3, 4, 5–6 i 7–8.

Biblioteka zawiera osiem pełnokolorowych plansz dla klas 1–3: **Animal Adventure**,
**Space Mission**, **Pirate Treasure**, **City Quest**, **Magic Academy**,
**Dinosaur Expedition**, **Food Festival** i **Four Seasons**. Cztery arkusze A4 tworzą
jedną planszę A2. Każda ma własną trasę, wariant numerowany i pusty oraz trzy
tematyczne zestawy po 32 zadania — osobno dla klasy 1, 2 i 3.

**Użycie:** otwórz `index.html` w przeglądarce (albo wejdź na link GitHub Pages).
Filtruj po klasie, temacie i rodzaju materiału. Przy planszy wybierz wygląd pól, klasę,
listę lub karty, pola specjalne oraz widoczność odpowiedzi. Konfigurator pokazuje całą
złożoną planszę i pozwala otworzyć jej powiększenie. Osobne przyciski drukują wyłącznie
4 arkusze planszy albo wyłącznie wybraną listę/karty; nie trzeba drukować całego pakietu.
Przy talii wybierz grę, a potem **Drukuj**.
Drukuj na papierze 160–250 g, karty tnij po przerywanej linii.

## Trzy typy talii

Typ talii mówi, jak zbudowane są karty — i decyduje, w co można nią zagrać.

| Typ | Co jest na karcie | Gry |
|---|---|---|
| 🔗 **Talia par** | jedno hasło, duża czcionka; karty łączą się w pary (słowo–tłumaczenie, przeciwieństwa, formy czasownika) | Memory, Bingo |
| 🗂️ **Talia grup tematycznych** | hasło + nazwa kategorii drobnym drukiem w rogu; karty tworzą komplety po kilka sztuk | Piotruś, Bingo |
| 📝 **Talia zadań** | polecenie (luka, poprawa błędu, tłumaczenie) + odpowiedź drobnym drukiem u dołu | Karty zadań |

## Cztery gry

| Gra | Co drukuje | Gracze | Czas |
|---|---|---|---|
| 🃏 **Memory / dobieranie par** | całą talię potasowaną, 9 kart na stronę | 2–4 osoby | 10–15 min |
| 👨‍🌾 **Piotruś / Go Fish** | całą talię z kategoriami w rogu | 3–5 osób | 15–20 min |
| ❓ **Karty zadań** | po jednym poleceniu na kartę | cała klasa lub pary | dowolnie |
| 🎱 **Bingo 5×5** | wybraną liczbę różnych plansz + arkusz karteczek do losowania | cała klasa | 10–15 min |

Pełne zasady każdej gry, warianty na łatwiej/trudniej i wskazówki do konkretnych talii
są w aplikacji — w rozwijanym panelu **„Jak grać"** nad podglądem wydruku.
Zaznacz **„dołącz kartkę z zasadami"**, żeby wydrukowały się razem z kartami jako pierwsza strona.

Bingo pojawia się tylko przy taliach z min. 25 hasłami — inaczej pola powtarzałyby się na planszy.

## Opcje wydruku

Nad podglądem, obok wyboru gry:

- **kartka z zasadami** — dokłada na początek stronę z instrukcją dla nauczyciela.
- **rewersy (druk dwustronny)** — dokłada strony z rewersami w kolorze poziomu.
  Drukuj dwustronnie, obracaniem wzdłuż dłuższej krawędzi. Bez tego przy memory
  widać przez cienki papier, co jest na karcie.
- **wersja do kolorowania** — zostawia z ikon sam kontur. Mniej tonera i osobna
  aktywność plastyczna. Pojawia się tylko przy taliach, które mają obrazki.
- **odpowiedzi na kartach** — przy kartach zadań; odznacz, żeby zrobić z talii kartkówkę.

Pasek u dołu każdej karty koduje poziom (1–3 zielony, 4 niebieski, 5–6 fioletowy,
7–8 ceglasty) — pozwala posortować rozsypane pudełko.

## Struktura plików

```
index.html          biblioteka plansz, kart i gier
library.js          filtry, kafle i nawigacja biblioteki
app.js              filtrowanie, 4 rendery gier, ikony, tasowanie
style.css           ekran + wymiary karty 63×88 mm
print.css           @page A4, 9 kart na stronę, ukrycie interfejsu
board.html          wspólny konfigurator plansz
board.js            warianty planszy, listy, karty i zasady
board.css           podgląd oraz wydruk A2 z 4 stron A4
fonts/andika.css    krój Andika (SIL, OFL) wpisany jako data: URI
data/icons.js       PLIK GENEROWANY — sprite ikon OpenMoji
data/games.js       opisy typów talii i zasady gier
data/boards.js      motywy, kolory i współrzędne pól plansz
data/task-packs.js  24 zestawy zadań planszowych po 32 pozycje
data/decks-1-3.js   talie dla klas 1–3
data/decks-4.js     talie dla klasy 4
data/decks-5-6.js   talie dla klas 5–6
data/decks-7-8.js   talie dla klas 7–8
test.html           testy w przeglądarce
animal-adventure.html  zgodnościowe przekierowanie do konfiguratora
run-tests.js        te same testy w konsoli: node run-tests.js
tools/build-icons.js  przebudowa sprite'u ikon (wymaga internetu)
tools/build-font.js   przebudowa zawężonego kroju pisma
```

## Obrazki na kartach

Ikony pochodzą z [OpenMoji](https://openmoji.org) (CC BY-SA 4.0). W plikach z taliami
wpisujesz zwykłe emoji — aplikacja podmienia je na ikonę wektorową, która wygląda tak samo
na każdym komputerze i drukarce, a dzięki czarnemu konturowi przeżywa druk czarno-biały.

**Po dodaniu emoji, którego wcześniej nie było w żadnej talii, przebuduj sprite:**

```bash
node tools/build-icons.js     # wymaga internetu, aktualizuje data/icons.js
```

Testy powiedzą wprost, jeśli o tym zapomnisz („brak ikon dla: …").

Emoji na początku hasła (`'🍎 apple'`) staje się dużym obrazkiem nad tekstem.
Emoji w środku zdania (`'Znak 🚭 → You ___ smoke.'`) staje się małą ikonką w linii.

## Dodawanie własnej talii

Otwórz plik `data/decks-*.js` odpowiadający poziomowi, skopiuj dowolną talię i zmień treść.
Nowe `id` musi być unikalne. Trzy formaty:

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
- `note` (opcjonalnie): wskazówka dla nauczyciela, pokazywana w panelu „Jak grać" i na kartce z zasadami.
- Emoji wklejasz wprost w tekst (`'🍎 apple'`) — drukują się kolorowo.
- Bingo pojawi się automatycznie, gdy talia ma co najmniej 25 haseł.

Po zmianie odśwież stronę. Jeśli coś nie działa — otwórz `test.html`,
pokaże na czerwono, co jest nie tak (literówka, brakujący przecinek, powtórzone `id` lub hasło).

## Testy

`node run-tests.js` w konsoli albo `test.html` w przeglądarce.
Sprawdzają poprawność wszystkich talii (pola, format, duplikaty, długość tekstu na karcie),
spójność opisów gier oraz logikę tasowania, filtrów i doboru gier.
Uruchamiaj po każdej edycji plików z taliami.

## Publikacja na GitHub Pages

Repozytorium → Settings → Pages → Source: `main` / `root`. Nie ma kroku budowania —
`data/icons.js` i `fonts/andika.css` są w repo gotowe.

## Licencje materiałów

- Ikony: [OpenMoji](https://openmoji.org) — CC BY-SA 4.0.
  „All emojis designed by OpenMoji – the open-source emoji and icon project. License: CC BY-SA 4.0."
- Krój pisma: Andika, [SIL International](https://software.sil.org/andika/) — OFL 1.1, pełny tekst w `fonts/OFL.txt`.
  Krój dla dzieci uczących się czytać: jednopiętrowe `a` i `g`, celowo rozróżnialne `I`, `l`, `1`.
