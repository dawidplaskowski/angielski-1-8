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
  const piratePositions = [
    [250,560],[295,545],[340,560],[380,535],[390,490],[350,465],[305,485],[260,460],
    [235,420],[280,390],[330,410],[375,375],[390,335],[350,270],[305,250],[260,270],
    [235,230],[190,250],[145,230],[100,250],[55,225],[25,180],[65,145],[110,165],
    [150,135],[190,155],[235,130],[280,150],[325,120],[370,95],[325,65],[270,45],
  ];
  const cityPositions = [
    [70,550],[110,565],[150,540],[190,560],[235,535],[280,555],[325,530],[370,545],
    [390,500],[350,470],[305,490],[260,465],[235,425],[275,400],[320,420],[365,390],
    [390,345],[350,330],[305,350],[260,330],[235,270],[190,250],[145,270],[100,245],
    [55,265],[25,220],[65,185],[110,205],[155,175],[180,135],[235,100],[285,65],
  ];
  const magicPositions = [
    [235,560],[190,540],[150,560],[110,535],[65,555],[25,515],[65,480],[110,500],
    [150,470],[235,500],[235,460],[280,480],[325,450],[370,470],[390,425],[350,395],
    [305,415],[260,385],[235,345],[280,330],[325,270],[370,250],[390,205],[350,175],
    [305,195],[260,165],[235,125],[190,145],[150,110],[180,75],[235,50],[285,30],
  ];
  const dinosaurPositions = [
    [70,550],[110,565],[150,540],[190,560],[235,535],[280,555],[325,530],[370,550],
    [390,505],[350,475],[305,495],[260,470],[235,430],[190,450],[145,425],[100,445],
    [55,415],[25,370],[70,345],[115,365],[160,340],[190,270],[145,245],[100,265],
    [55,235],[25,190],[70,165],[115,185],[160,150],[180,110],[235,75],[280,45],
  ];
  const foodPositions = [
    [250,560],[190,540],[145,545],[100,565],[55,540],[25,495],[70,470],[115,490],
    [160,460],[235,490],[235,450],[280,470],[325,440],[370,460],[390,415],[350,385],
    [305,405],[260,375],[235,335],[280,270],[325,250],[370,270],[390,225],[350,195],
    [305,215],[260,185],[235,145],[190,165],[145,135],[100,155],[145,105],[190,65],
  ];
  const seasonsPositions = [
    [70,560],[115,540],[160,560],[190,525],[150,495],[90,505],[60,485],[25,440],
    [70,415],[115,435],[160,405],[190,365],[150,340],[105,360],[60,330],[25,270],
    [70,245],[115,265],[160,235],[180,200],[235,175],[280,195],[325,165],[370,185],
    [390,140],[350,110],[305,130],[260,100],[235,60],[280,40],[325,65],[370,35],
  ];
  const specials = {
    5:{ icon:'🤝', effect:'Pomocnik przesuwa się o 1 pole.', tone:'help' },
    10:{ icon:'⏩', effect:'Przesuń się o 2 pola do przodu.', tone:'bonus' },
    15:{ icon:'↩️', effect:'Cofnij się o 1 pole.', tone:'penalty' },
    20:{ icon:'🎲', effect:'Rzuć kostką jeszcze raz.', tone:'bonus' },
    25:{ icon:'👥', effect:'Wszyscy odpowiadają. Ty przesuwasz się o 1 pole.', tone:'team' },
    30:{ icon:'⏩', effect:'Przesuń się o 2 pola do przodu.', tone:'bonus' },
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
      titlePosition:[150,200],
      startLabel:'START', finishLabel:'ANIMAL PARTY', fields:makeFields(animalPositions),
    },
    {
      id:'space', title:'Space Mission', subtitle:'Misja wśród gwiazd',
      description:'Podróż z Ziemi przez planety aż do kosmicznej stacji.',
      topics:['kosmos','liczby','mówienie'], levels:['1','2','3'],
      art:'assets/space-mission-bg-print.jpg', preview:'assets/space-mission-bg.png',
      accent:'#4d3eaa', accent2:'#ff9a48', backgroundSize:'420mm 630mm', cropY:18,
      titlePosition:[150,175],
      startLabel:'LAUNCH', finishLabel:'SPACE STATION', fields:makeFields(spacePositions),
    },
    {
      id:'pirate', title:'Pirate Treasure', subtitle:'Skarb ukrytej wyspy',
      description:'Od tropikalnego portu przez laguny i jaskinie aż do skarbu.',
      topics:['przygoda','kierunki','mówienie'], levels:['1','2','3'],
      art:'assets/pirate-treasure-bg-print.jpg', preview:'assets/pirate-treasure-bg.png',
      accent:'#176f78', accent2:'#f1aa3f', backgroundSize:'420mm 630mm', cropY:18,
      titlePosition:[70,25],
      startLabel:'HARBOR', finishLabel:'TREASURE', fields:makeFields(piratePositions),
    },
    {
      id:'city', title:'City Quest', subtitle:'Wyprawa przez miasto',
      description:'Park, rynek, most i miejska wieża na jednej trasie.',
      topics:['miasto','miejsca','kierunki'], levels:['1','2','3'],
      art:'assets/city-quest-bg-print.jpg', preview:'assets/city-quest-bg.png',
      accent:'#237a7a', accent2:'#ed9b45', backgroundSize:'420mm 630mm', cropY:18,
      titlePosition:[70,25],
      startLabel:'PARK', finishLabel:'CITY TOWER', fields:makeFields(cityPositions),
    },
    {
      id:'magic', title:'Magic Academy', subtitle:'Szkoła pełna magii',
      description:'Magiczny ogród, biblioteka i obserwatorium pełne niespodzianek.',
      topics:['fantasy','opisywanie','mówienie'], levels:['1','2','3'],
      art:'assets/magic-academy-bg-print.jpg', preview:'assets/magic-academy-bg.png',
      accent:'#6142a6', accent2:'#e99b52', backgroundSize:'420mm 630mm', cropY:18,
      titlePosition:[70,245],
      startLabel:'MAGIC GATE', finishLabel:'OBSERVATORY', fields:makeFields(magicPositions),
    },
    {
      id:'dinosaur', title:'Dinosaur Expedition', subtitle:'Prehistoryczna ekspedycja',
      description:'Wyprawa od obozu badaczy do spokojnego gniazda dinozaurów.',
      topics:['dinozaury','przygoda','opisywanie'], levels:['1','2','3'],
      art:'assets/dinosaur-expedition-bg-print.jpg', preview:'assets/dinosaur-expedition-bg.png',
      accent:'#47733a', accent2:'#e79a42', backgroundSize:'420mm 630mm', cropY:18,
      titlePosition:[70,25],
      startLabel:'BASE CAMP', finishLabel:'DINO NEST', fields:makeFields(dinosaurPositions),
    },
    {
      id:'food', title:'Food Festival', subtitle:'Kolorowy festiwal smaków',
      description:'Piknik, targ i festiwalowe stoiska na apetycznej trasie.',
      topics:['jedzenie','kolory','liczenie'], levels:['1','2','3'],
      art:'assets/food-festival-bg-print.jpg', preview:'assets/food-festival-bg.png',
      accent:'#ad493c', accent2:'#f3b93f', backgroundSize:'420mm 630mm', cropY:18,
      titlePosition:[70,270],
      startLabel:'PICNIC', finishLabel:'BIG FEAST', fields:makeFields(foodPositions),
    },
    {
      id:'seasons', title:'Four Seasons', subtitle:'Podróż przez cały rok',
      description:'Zimowa dolina zmienia się po drodze w wiosnę, lato i jesień.',
      topics:['pory roku','pogoda','przyroda'], levels:['1','2','3'],
      art:'assets/four-seasons-bg-print.jpg', preview:'assets/four-seasons-bg.png',
      accent:'#477c75', accent2:'#ed9a3e', backgroundSize:'420mm 630mm', cropY:18,
      titlePosition:[70,130],
      startLabel:'WINTER', finishLabel:'AUTUMN', fields:makeFields(seasonsPositions),
    },
  ];
})();
