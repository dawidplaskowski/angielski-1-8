// Uniwersalne plansze A2. Pola przechowują wyłącznie pozycję i mechanikę ruchu.
(function () {
  const animalPositions = [
    [25,560],[66,540],[107,560],[148,538],[188,558],[180,515],[145,470],[188,425],
    [232,450],[275,480],[325,510],[370,480],[390,420],[390,330],[390,270],[365,230],
    [390,185],[365,140],[390,95],[360,50],[315,70],[270,48],[230,75],[190,48],
    [145,70],[100,48],[55,75],[25,120],[50,165],[25,210],[55,255],[100,255],
  ];
  const spacePositions = [
    [185,560],[140,545],[95,560],[50,535],[25,490],[60,450],[105,465],[150,435],
    [190,405],[235,430],[280,455],[330,430],[375,455],[390,405],[365,360],[390,315],
    [365,270],[390,225],[365,180],[390,135],[365,90],[330,55],[285,75],[240,50],
    [190,75],[150,50],[105,75],[60,50],[25,90],[45,140],[25,195],[55,245],
  ];
  const journeyPositions = [
    [60,560],[105,540],[150,560],[190,535],[240,555],[285,535],[330,555],[380,530],
    [390,485],[350,455],[305,475],[260,450],[235,410],[190,430],[145,410],[100,435],
    [55,410],[25,365],[70,340],[115,365],[160,340],[190,270],[240,250],[285,270],
    [335,245],[380,265],[390,220],[345,190],[295,210],[250,175],[190,145],[140,65],
  ];
  const specials = {
    5:{ icon:'🤝', effect:'Pomocnik przesuwa się o 1 pole.', tone:'help' },
    10:{ icon:'⏩', effect:'Przesuń się o 2 pola do przodu.', tone:'good' },
    15:{ icon:'🔙', effect:'Cofnij się o 1 pole.', tone:'bad' },
    20:{ icon:'🎲', effect:'Rzuć kostką jeszcze raz.', tone:'good' },
    25:{ icon:'👥', effect:'Wszyscy odpowiadają. Ty przesuwasz się o 1 pole.', tone:'help' },
    30:{ icon:'⏩', effect:'Przesuń się o 2 pola do przodu.', tone:'good' },
  };
  const makeFields = (positions) => positions.map(([x,y], i) => ({
    n: i + 1, x, y,
    kind: i === 0 ? 'start' : i === 31 ? 'finish' : specials[i + 1] ? 'special' : 'normal',
    ...(specials[i + 1] || {}),
  }));

  window.BOARD_THEMES = [
    {
      id:'animal', title:'Animal Adventure', subtitle:'Wielka wyprawa zwierząt',
      description:'Farma, ocean, sawanna i las na jednej wielkiej planszy.',
      topics:['zwierzęta','ruch','opisywanie'], levels:['1','2','3'],
      art:'assets/animal-adventure-bg-print.jpg', preview:'assets/animal-adventure-bg.png',
      accent:'#26765c', accent2:'#f2b43c', backgroundSize:'420mm 630mm', cropY:18,
      startLabel:'START', finishLabel:'ANIMAL PARTY', fields:makeFields(animalPositions),
    },
    {
      id:'space', title:'Space Mission', subtitle:'Misja wśród gwiazd',
      description:'Podróż z Ziemi przez planety aż do kosmicznej stacji.',
      topics:['kosmos','liczby','mówienie'], levels:['1','2','3'],
      art:'assets/space-mission-bg-print.jpg', preview:'assets/space-mission-bg.png',
      accent:'#4d3eaa', accent2:'#ff9a48', backgroundSize:'420mm 630mm', cropY:18,
      startLabel:'LAUNCH', finishLabel:'SPACE STATION', fields:makeFields(spacePositions),
    },
    {
      id:'pirate', title:'Pirate Treasure', subtitle:'Skarb ukrytej wyspy',
      description:'Od tropikalnego portu przez laguny i jaskinie aż do skarbu.',
      topics:['przygoda','kierunki','mówienie'], levels:['1','2','3'],
      art:'assets/pirate-treasure-bg-print.jpg', preview:'assets/pirate-treasure-bg.png',
      accent:'#176f78', accent2:'#f1aa3f', backgroundSize:'420mm 630mm', cropY:18,
      startLabel:'HARBOR', finishLabel:'TREASURE', fields:makeFields(journeyPositions),
    },
    {
      id:'city', title:'City Quest', subtitle:'Wyprawa przez miasto',
      description:'Park, rynek, most i miejska wieża na jednej trasie.',
      topics:['miasto','miejsca','kierunki'], levels:['1','2','3'],
      art:'assets/city-quest-bg-print.jpg', preview:'assets/city-quest-bg.png',
      accent:'#237a7a', accent2:'#ed9b45', backgroundSize:'420mm 630mm', cropY:18,
      startLabel:'PARK', finishLabel:'CITY TOWER', fields:makeFields(journeyPositions),
    },
    {
      id:'magic', title:'Magic Academy', subtitle:'Szkoła pełna magii',
      description:'Magiczny ogród, biblioteka i obserwatorium pełne niespodzianek.',
      topics:['fantasy','opisywanie','mówienie'], levels:['1','2','3'],
      art:'assets/magic-academy-bg-print.jpg', preview:'assets/magic-academy-bg.png',
      accent:'#6142a6', accent2:'#e99b52', backgroundSize:'420mm 630mm', cropY:18,
      startLabel:'MAGIC GATE', finishLabel:'OBSERVATORY', fields:makeFields(journeyPositions),
    },
    {
      id:'dinosaur', title:'Dinosaur Expedition', subtitle:'Prehistoryczna ekspedycja',
      description:'Wyprawa od obozu badaczy do spokojnego gniazda dinozaurów.',
      topics:['dinozaury','przygoda','opisywanie'], levels:['1','2','3'],
      art:'assets/dinosaur-expedition-bg-print.jpg', preview:'assets/dinosaur-expedition-bg.png',
      accent:'#47733a', accent2:'#e79a42', backgroundSize:'420mm 630mm', cropY:18,
      startLabel:'BASE CAMP', finishLabel:'DINO NEST', fields:makeFields(journeyPositions),
    },
    {
      id:'food', title:'Food Festival', subtitle:'Kolorowy festiwal smaków',
      description:'Piknik, targ i festiwalowe stoiska na apetycznej trasie.',
      topics:['jedzenie','kolory','liczenie'], levels:['1','2','3'],
      art:'assets/food-festival-bg-print.jpg', preview:'assets/food-festival-bg.png',
      accent:'#ad493c', accent2:'#f3b93f', backgroundSize:'420mm 630mm', cropY:18,
      startLabel:'PICNIC', finishLabel:'BIG FEAST', fields:makeFields(journeyPositions),
    },
    {
      id:'seasons', title:'Four Seasons', subtitle:'Podróż przez cały rok',
      description:'Zimowa dolina zmienia się po drodze w wiosnę, lato i jesień.',
      topics:['pory roku','pogoda','przyroda'], levels:['1','2','3'],
      art:'assets/four-seasons-bg-print.jpg', preview:'assets/four-seasons-bg.png',
      accent:'#477c75', accent2:'#ed9a3e', backgroundSize:'420mm 630mm', cropY:18,
      startLabel:'WINTER', finishLabel:'AUTUMN', fields:makeFields(journeyPositions),
    },
  ];
})();
