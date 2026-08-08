// Opisy typów kart i zasady gier. To, co widzi nauczyciel na ekranie
// i co można dołączyć do wydruku jako kartkę z zasadami.

// Typy talii — czym RÓŻNIĄ SIĘ karty, które dostaniesz.
window.DECK_TYPES = {
  pairs: {
    icon: '🔗',
    name: 'Talia par',
    what: 'Każda karta to jedna połówka pary: słowo i jego tłumaczenie, przeciwieństwo albo druga forma czasownika.',
    looks: 'Na karcie jedno hasło, duża czcionka, nic więcej. Kart jest dwa razy tyle co par.',
  },
  groups: {
    icon: '🗂️',
    name: 'Talia grup tematycznych',
    what: 'Karty należą do kategorii po kilka sztuk (Fruit, Drinks, Sweets…). Cel to zebrać komplet z jednej kategorii.',
    looks: 'Na karcie hasło, a u góry drobnym drukiem nazwa kategorii — to podpowiedź, do której grupy karta należy.',
  },
  prompts: {
    icon: '📝',
    name: 'Talia zadań',
    what: 'Każda karta to jedno polecenie: luka do uzupełnienia, zdanie do poprawienia albo zdanie do przetłumaczenia.',
    looks: 'Na karcie polecenie, a pod kreską odpowiedź drobnym drukiem. Odpowiedzi można wyłączyć przed wydrukiem.',
  },
};

// Gry — co ZROBIĆ z wydrukowanymi kartami.
window.GAMES = {
  memory: {
    icon: '🃏',
    name: 'Memory / dobieranie par',
    from: 'pairs',
    short: 'Odkrywanie zakrytych kart i szukanie pasujących par.',
    prints: 'Wszystkie karty talii, potasowane, po 9 na stronę A4.',
    players: '2–4 osoby lub cała klasa w grupach',
    time: '10–15 minut',
    rules: [
      'Rozłóż wszystkie karty obrazkiem do dołu, w kratkę.',
      'Uczeń odkrywa dwie karty i czyta je na głos po angielsku.',
      'Jeśli karty tworzą parę (np. big – small, cat – kot) — zabiera je i gra dalej.',
      'Jeśli nie pasują — odwraca je z powrotem, kolej na następną osobę.',
      'Wygrywa ten, kto zbierze najwięcej par.',
    ],
    variants: [
      'Trudniej: żeby zatrzymać parę, uczeń musi ułożyć z nią zdanie.',
      'Łatwiej dla klas 1–3: użyj tylko połowy talii (12–16 par).',
      'Bez planszy: rozdaj karty na ręce i graj w „Piotrusia parami” — kto pierwszy pozbędzie się kart.',
    ],
  },

  piotrus: {
    icon: '👨‍🌾',
    name: 'Piotruś / Go Fish',
    from: 'groups',
    short: 'Zbieranie kompletów kart z jednej kategorii tematycznej.',
    prints: 'Wszystkie karty talii z nazwą kategorii w rogu, potasowane.',
    players: '3–5 osób',
    time: '15–20 minut',
    rules: [
      'Rozdaj każdemu po 5 kart, resztę połóż na środku jako stos.',
      'Uczeń pyta wybraną osobę po angielsku: “Have you got any fruit?”',
      'Jeśli tamten ma karty z tej kategorii — oddaje wszystkie. Jeśli nie, mówi “Go fish!” i pytający dobiera ze stosu.',
      'Komplet całej kategorii odkłada się przed sobą — to punkt.',
      'Gra kończy się, gdy skończą się karty. Wygrywa najwięcej kompletów.',
    ],
    variants: [
      'Wersja „Piotruś”: wyjmij jedną kartę z talii przed grą — kto zostanie z niesparowaną, przegrywa.',
      'Trudniej: pytanie musi zawierać konkretne słowo — “Have you got an apple?”',
      'Sortowanie na czas: rozsyp karty, uczniowie ścigają się w układaniu ich w kategorie.',
    ],
  },

  qa: {
    icon: '❓',
    name: 'Karty zadań',
    from: 'prompts',
    short: 'Losowanie poleceń gramatycznych — do gry planszowej, wyścigu lub odpytywania.',
    prints: 'Po jednym poleceniu na kartę, odpowiedź drobnym drukiem u dołu (można ukryć).',
    players: 'cała klasa, grupy lub praca w parach',
    time: 'dowolnie — od 5 minut do całej lekcji',
    rules: [
      'Potasuj karty i połóż je zakryte na środku.',
      'Uczeń ciągnie kartę i odpowiada na głos.',
      'Dobra odpowiedź — zatrzymuje kartę. Zła — karta wraca pod spód.',
      'Wygrywa ten, kto zbierze najwięcej kart.',
    ],
    variants: [
      'Do gry planszowej: pionek staje na polu → uczeń ciągnie kartę; dobra odpowiedź pozwala rzucić jeszcze raz.',
      'Praca w parach: jeden trzyma kartę i sprawdza po odpowiedzi wydrukowanej u dołu, drugi odpowiada. Potem zamiana.',
      'Wydrukuj BEZ odpowiedzi (odznacz opcję) i użyj jako kartkówki — uczniowie zapisują odpowiedzi w zeszycie.',
      'Sztafeta: dwie drużyny, po jednej karcie na osobę, liczy się czas całej drużyny.',
    ],
  },

  bingo: {
    icon: '🎱',
    name: 'Bingo 5×5',
    from: 'pairs / groups',
    short: 'Każdy uczeń dostaje inną planszę; nauczyciel losuje hasła.',
    prints: 'Wybraną liczbę różnych plansz (po jednej na stronę) plus arkusz karteczek do losowania.',
    players: 'cała klasa',
    time: '10–15 minut',
    rules: [
      'Rozdaj każdemu inną planszę. Potnij arkusz karteczek i wrzuć je do woreczka.',
      'Losuj karteczkę i czytaj hasło — po polsku, jeśli plansze są po angielsku, albo definicją.',
      'Uczniowie zakreślają pole, jeśli mają je u siebie.',
      'Kto zapełni cały rząd, kolumnę lub przekątną, krzyczy “BINGO!”.',
      'Sprawdź zakreślone słowa — uczeń musi je poprawnie odczytać.',
    ],
    variants: [
      'Trudniej: zamiast czytać hasło, opisz je po angielsku („It’s a red fruit”).',
      'Pełna plansza zamiast rzędu — dłuższa gra na całą lekcję.',
      'Uczniowie sami losują i czytają — więcej mówienia niż przy nauczycielu-lektorze.',
    ],
  },
};
