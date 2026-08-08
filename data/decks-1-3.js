// KLASY 1–3 — słownictwo obrazkowe, proste polecenia.
// Format opisany w README.md
window.DECKS = (window.DECKS || []).concat([

{ id:'opposites-1', title:'Przeciwieństwa', level:'1-3', area:'słownictwo', type:'pairs',
  note:'Klasyk na memory — dziecko szuka pary o przeciwnym znaczeniu, nie identycznej.',
  items:[
    ['big','small'],['hot','cold'],['happy','sad'],['old','new'],['fast','slow'],
    ['long','short'],['open','closed'],['day','night'],['up','down'],['in','out'],
    ['yes','no'],['good','bad'],['tall','short'],['clean','dirty'],['full','empty'],
    ['young','old'],['easy','hard'],['loud','quiet'],['wet','dry'],['light','dark'],
    ['left','right'],['first','last'],['near','far'],['rich','poor'],['strong','weak'],
    ['thick','thin'],['soft','hard'],['front','back'],['boy','girl'],['sit','stand'],
  ]},

{ id:'animals-pets-1', title:'Zwierzęta domowe i wiejskie', level:'1-3', area:'słownictwo', type:'pairs',
  items:[
    ['🐱 cat','kot'],['🐶 dog','pies'],['🐭 mouse','mysz'],['🐦 bird','ptak'],['🐟 fish','ryba'],
    ['🐰 rabbit','królik'],['🐴 horse','koń'],['🐮 cow','krowa'],['🐷 pig','świnia'],['🐔 hen','kura'],
    ['🐑 sheep','owca'],['🦆 duck','kaczka'],['🐐 goat','koza'],['🐹 hamster','chomik'],['🐢 turtle','żółw'],
    ['🦜 parrot','papuga'],['🐓 cock','kogut'],['🐈 kitten','kociak'],['🐕 puppy','szczeniak'],['🐁 rat','szczur'],
    ['🦃 turkey','indyk'],['🐝 bee','pszczoła'],['🐛 worm','robak'],['🕷️ spider','pająk'],['🐌 snail','ślimak'],
    ['🦢 goose','gęś'],['🐖 piglet','prosiaczek'],['🐴 pony','kucyk'],
  ]},

{ id:'animals-wild-1', title:'Dzikie zwierzęta i zoo', level:'1-3', area:'słownictwo', type:'pairs',
  items:[
    ['🦁 lion','lew'],['🐯 tiger','tygrys'],['🐘 elephant','słoń'],['🦒 giraffe','żyrafa'],['🐒 monkey','małpa'],
    ['🐻 bear','niedźwiedź'],['🦊 fox','lis'],['🐺 wolf','wilk'],['🦌 deer','jeleń'],['🦓 zebra','zebra'],
    ['🐍 snake','wąż'],['🐊 crocodile','krokodyl'],['🐧 penguin','pingwin'],['🦉 owl','sowa'],['🦅 eagle','orzeł'],
    ['🐋 whale','wieloryb'],['🦈 shark','rekin'],['🐬 dolphin','delfin'],['🦋 butterfly','motyl'],['🐸 frog','żaba'],
    ['🦔 hedgehog','jeż'],['🐿️ squirrel','wiewiórka'],['🦇 bat','nietoperz'],['🦘 kangaroo','kangur'],
    ['🐨 koala','koala'],['🦏 rhino','nosorożec'],['🦛 hippo','hipopotam'],['🐪 camel','wielbłąd'],
  ]},

{ id:'colours-numbers-1', title:'Kolory, liczby i kształty', level:'1-3', area:'słownictwo', type:'groups',
  items:{
    'Colours':['🔴 red','🔵 blue','🟢 green','🟡 yellow','⚫ black','⚪ white','🟤 brown','🟠 orange','🟣 purple','🩷 pink'],
    'Numbers':['1️⃣ one','2️⃣ two','3️⃣ three','4️⃣ four','5️⃣ five','6️⃣ six','7️⃣ seven','8️⃣ eight','9️⃣ nine','🔟 ten'],
    'Shapes':['⬛ square','🔺 triangle','⚪ circle','⭐ star','❤️ heart','➖ line'],
    'Size':['🐘 big','🐭 small','📏 long','✂️ short','🎈 light','🪨 heavy'],
  }},

{ id:'numbers-20-1', title:'Liczby 1–20', level:'1-3', area:'słownictwo', type:'pairs',
  note:'Memory: cyfra do słowa. Świetne też jako bingo — nauczyciel mówi liczbę, dzieci zakrywają.',
  items:[
    ['1','one'],['2','two'],['3','three'],['4','four'],['5','five'],
    ['6','six'],['7','seven'],['8','eight'],['9','nine'],['10','ten'],
    ['11','eleven'],['12','twelve'],['13','thirteen'],['14','fourteen'],['15','fifteen'],
    ['16','sixteen'],['17','seventeen'],['18','eighteen'],['19','nineteen'],['20','twenty'],
    ['30','thirty'],['40','forty'],['50','fifty'],['60','sixty'],['70','seventy'],
    ['80','eighty'],['90','ninety'],['100','a hundred'],
  ]},

{ id:'food-1', title:'Jedzenie i picie', level:'1-3', area:'słownictwo', type:'groups',
  items:{
    'Fruit':['🍎 apple','🍌 banana','🍇 grapes','🍓 strawberry','🍊 orange','🍐 pear','🍒 cherries','🍉 watermelon'],
    'Vegetables':['🥕 carrot','🥔 potato','🍅 tomato','🥒 cucumber','🧅 onion','🥬 lettuce','🌽 sweetcorn','🫑 pepper'],
    'Drinks':['🥛 milk','🧃 juice','💧 water','☕ tea','🥤 lemonade','🍫 cocoa'],
    'Sweets':['🍰 cake','🍪 biscuit','🍫 chocolate','🍦 ice cream','🍬 sweets','🍩 doughnut'],
    'Meals':['🍞 bread','🧀 cheese','🥚 egg','🍕 pizza','🍜 soup','🍚 rice','🍗 chicken','🐟 fish'],
  }},

{ id:'clothes-1', title:'Ubrania', level:'1-3', area:'słownictwo', type:'pairs',
  items:[
    ['👕 T-shirt','koszulka'],['👖 trousers','spodnie'],['👗 dress','sukienka'],['👞 shoes','buty'],
    ['🧦 socks','skarpetki'],['🧢 cap','czapka z daszkiem'],['🧥 coat','płaszcz'],['🧤 gloves','rękawiczki'],
    ['🧣 scarf','szalik'],['👚 blouse','bluzka'],['🩳 shorts','krótkie spodenki'],['👘 skirt','spódnica'],
    ['🥾 boots','kozaki'],['🩱 swimsuit','strój kąpielowy'],['👔 shirt','koszula'],['🎒 backpack','plecak'],
    ['🧶 sweater','sweter'],['👟 trainers','adidasy'],['🎩 hat','kapelusz'],['👜 handbag','torebka'],
    ['🕶️ sunglasses','okulary słoneczne'],['⌚ watch','zegarek'],['👝 pyjamas','piżama'],['🦺 jacket','kurtka'],
    ['👡 sandals','sandały'],['🧦 tights','rajstopy'],['🧣 hood','kaptur'],['👛 pocket','kieszeń'],
  ]},

{ id:'toys-1', title:'Zabawki i zabawa', level:'1-3', area:'słownictwo', type:'groups',
  items:{
    'Toys':['🧸 teddy bear','🪁 kite','🎈 balloon','🚗 toy car','🪀 yo-yo','🧩 puzzle'],
    'Outside':['⚽ ball','🚲 bike','🛴 scooter','🛼 roller skates','🪃 boomerang','🏀 basketball'],
    'Games':['🎲 dice','♟️ chess','🃏 cards','🎯 darts','🎮 computer game','🪅 piñata'],
    'Music':['🥁 drum','🎸 guitar','🎹 piano','🎺 trumpet','🎻 violin','🎤 microphone'],
    'Craft':['✏️ pencil','🖍️ crayons','✂️ scissors','🎨 paints','📄 paper','🧵 string'],
  }},

{ id:'body-1', title:'Części ciała', level:'1-3', area:'słownictwo', type:'pairs',
  note:'Po memory zagrajcie w „Simon says” — Simon says touch your nose!',
  items:[
    ['👤 head','głowa'],['👁️ eye','oko'],['👂 ear','ucho'],['👃 nose','nos'],['👄 mouth','usta'],
    ['🦷 tooth','ząb'],['💇 hair','włosy'],['✋ hand','ręka (dłoń)'],['💪 arm','ramię'],['🦵 leg','noga'],
    ['🦶 foot','stopa'],['👆 finger','palec u ręki'],['🦴 bone','kość'],['🫀 heart','serce'],['🧠 brain','mózg'],
    ['😊 face','twarz'],['🤲 shoulder','bark'],['🦵 knee','kolano'],['👅 tongue','język'],['🫁 tummy','brzuszek'],
    ['🖐️ thumb','kciuk'],['🦶 toe','palec u nogi'],['💅 nail','paznokieć'],['🧑 neck','szyja'],
    ['👂 cheek','policzek'],['🤔 chin','broda (podbródek)'],['👁️ eyebrow','brew'],['🦵 back','plecy'],
  ]},

{ id:'house-basic-1', title:'Mój dom', level:'1-3', area:'słownictwo', type:'groups',
  items:{
    'Rooms':['🛏️ bedroom','🍳 kitchen','🛁 bathroom','🛋️ living room','🚪 hall','🌳 garden'],
    'Furniture':['🛏️ bed','🪑 chair','🪟 window','🚪 door','🛋️ sofa','🗄️ cupboard'],
    'Kitchen':['🍽️ plate','🥄 spoon','🍴 fork','🔪 knife','☕ cup','🍳 pan'],
    'Bathroom':['🛁 bath','🚿 shower','🪥 toothbrush','🧼 soap','🪞 mirror','🧻 towel'],
    'Things':['💡 lamp','📺 TV','🕰️ clock','🖼️ picture','🧸 toy box','🪴 plant'],
  }},

{ id:'school-basic-1', title:'W klasie', level:'1-3', area:'słownictwo', type:'pairs',
  items:[
    ['✏️ pencil','ołówek'],['🖊️ pen','długopis'],['📕 book','książka'],['📓 notebook','zeszyt'],
    ['📏 ruler','linijka'],['🧽 rubber','gumka'],['✂️ scissors','nożyczki'],['🖍️ crayons','kredki'],
    ['🎒 bag','tornister'],['🪑 chair','krzesło'],['🧑‍🏫 teacher','pan/pani'],['🧒 pupil','uczeń'],
    ['🏫 school','szkoła'],['🖼️ board','tablica'],['🖇️ glue','klej'],['🗑️ bin','kosz'],
    ['🎨 paints','farby'],['📐 desk','ławka'],['🚪 door','drzwi'],['🪟 window','okno'],
    ['🎈 playground','plac zabaw'],['🔔 bell','dzwonek'],['📖 page','strona'],['🎽 sports kit','strój na wf'],
    ['🥪 lunch','drugie śniadanie'],['👫 friend','kolega/koleżanka'],
  ]},

{ id:'days-months-1', title:'Dni tygodnia i miesiące', level:'1-3', area:'słownictwo', type:'groups',
  items:{
    'Days':['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    'Spring & summer':['March','April','May','June','July','August'],
    'Autumn & winter':['September','October','November','December','January','February'],
    'Time words':['☀️ today','➡️ tomorrow','⬅️ yesterday','📅 week','🗓️ month','🎂 year'],
    'Day parts':['🌅 morning','☀️ afternoon','🌆 evening','🌙 night','🕛 noon','⏰ o’clock'],
  }},

{ id:'action-verbs-1', title:'Czasowniki ruchu', level:'1-3', area:'słownictwo', type:'pairs',
  note:'Idealne do gry ruchowej: uczeń losuje kartę i pokazuje czynność, reszta zgaduje po angielsku.',
  items:[
    ['🏃 run','biegać'],['🚶 walk','iść'],['🦘 jump','skakać'],['🏊 swim','pływać'],['🕺 dance','tańczyć'],
    ['🎤 sing','śpiewać'],['😴 sleep','spać'],['🍽️ eat','jeść'],['🥤 drink','pić'],['📖 read','czytać'],
    ['✍️ write','pisać'],['🎨 draw','rysować'],['🧗 climb','wspinać się'],['👏 clap','klaskać'],['🪑 sit','siedzieć'],
    ['🧍 stand','stać'],['👀 look','patrzeć'],['👂 listen','słuchać'],['🗣️ speak','mówić'],['🤸 fly','latać'],
    ['🚴 ride','jeździć'],['⚽ kick','kopać'],['🤾 throw','rzucać'],['🤲 catch','łapać'],['🫳 touch','dotykać'],
    ['🚪 open','otwierać'],['🔒 close','zamykać'],['🎁 give','dawać'],
  ]},

{ id:'feelings-1', title:'Uczucia i nastroje', level:'1-3', area:'słownictwo', type:'pairs',
  items:[
    ['😀 happy','szczęśliwy'],['😢 sad','smutny'],['😠 angry','zły'],['😨 scared','przestraszony'],
    ['😴 tired','zmęczony'],['🤒 ill','chory'],['🥵 hot','gorąco mi'],['🥶 cold','zimno mi'],
    ['🍽️ hungry','głodny'],['🥤 thirsty','spragniony'],['😮 surprised','zaskoczony'],['😳 shy','nieśmiały'],
    ['😂 funny','zabawny'],['😐 bored','znudzony'],['🤗 excited','podekscytowany'],['😌 calm','spokojny'],
    ['💪 strong','silny'],['🫤 worried','zmartwiony'],['🤩 proud','dumny'],['🥰 loved','kochany'],
    ['😖 sorry','przepraszający'],['🙂 fine','w porządku'],['😵 dizzy','zakręcony'],['😤 cross','naburmuszony'],
    ['🥳 glad','rad'],['😔 lonely','samotny'],
  ]},

{ id:'transport-1', title:'Pojazdy i podróż', level:'1-3', area:'słownictwo', type:'pairs',
  items:[
    ['🚗 car','samochód'],['🚌 bus','autobus'],['🚲 bike','rower'],['🚂 train','pociąg'],['✈️ plane','samolot'],
    ['🚢 ship','statek'],['🚁 helicopter','helikopter'],['🚑 ambulance','karetka'],['🚒 fire engine','wóz strażacki'],
    ['🚓 police car','radiowóz'],['🛵 scooter','skuter'],['🏍️ motorbike','motocykl'],['🚕 taxi','taksówka'],
    ['🚚 lorry','ciężarówka'],['🚜 tractor','traktor'],['⛵ boat','łódka'],['🚀 rocket','rakieta'],
    ['🛴 kick scooter','hulajnoga'],['🚊 tram','tramwaj'],['🚇 underground','metro'],['🎈 balloon','balon'],
    ['🛷 sledge','sanki'],['🐴 horse','koń'],['🚶 on foot','pieszo'],['🛬 airport','lotnisko'],
    ['🚉 station','dworzec'],['🎫 ticket','bilet'],['🗺️ map','mapa'],
  ]},

{ id:'classroom-language-1', title:'Polecenia w klasie', level:'1-3', area:'gramatyka', type:'prompts',
  note:'Karty zadań, ale bez pisania — uczeń losuje i WYKONUJE polecenie. Odpowiedź to tłumaczenie dla nauczyciela.',
  items:[
    {q:'Stand up!', a:'Wstań!'},
    {q:'Sit down, please.', a:'Usiądź, proszę.'},
    {q:'Open your book.', a:'Otwórz książkę.'},
    {q:'Close your book.', a:'Zamknij książkę.'},
    {q:'Listen carefully!', a:'Słuchaj uważnie!'},
    {q:'Look at the board.', a:'Popatrz na tablicę.'},
    {q:'Put up your hand.', a:'Podnieś rękę.'},
    {q:'Be quiet, please.', a:'Cisza, proszę.'},
    {q:'Come here.', a:'Chodź tutaj.'},
    {q:'Go to the door.', a:'Idź do drzwi.'},
    {q:'Take your pencil.', a:'Weź ołówek.'},
    {q:'Give me the rubber.', a:'Daj mi gumkę.'},
    {q:'Clap your hands!', a:'Klaśnij w dłonie!'},
    {q:'Touch your nose.', a:'Dotknij nosa.'},
    {q:'Jump three times!', a:'Podskocz trzy razy!'},
    {q:'Turn around.', a:'Obróć się.'},
    {q:'Point to something red.', a:'Wskaż coś czerwonego.'},
    {q:'Count to ten.', a:'Policz do dziesięciu.'},
    {q:'Say your name.', a:'Powiedz swoje imię.'},
    {q:'Draw a cat.', a:'Narysuj kota.'},
    {q:'Colour it blue.', a:'Pokoloruj na niebiesko.'},
    {q:'Tidy your desk.', a:'Posprzątaj ławkę.'},
    {q:'Line up, please.', a:'Ustawcie się w rzędzie.'},
    {q:'Work in pairs.', a:'Pracujcie w parach.'},
  ]},

{ id:'holidays-1', title:'Święta i uroczystości', level:'1-3', area:'słownictwo', type:'groups',
  items:{
    'Christmas':['🎄 Christmas tree','🎅 Santa','🎁 present','⭐ star','❄️ snow','🔔 bell'],
    'Easter':['🐣 chick','🥚 Easter egg','🐰 bunny','🌷 flower','🧺 basket','🍰 cake'],
    'Halloween':['🎃 pumpkin','👻 ghost','🦇 bat','🕷️ spider','🍬 sweets','🧙 witch'],
    'Birthday':['🎂 birthday cake','🕯️ candle','🎈 balloon','🎁 gift','🎉 party','🎵 song'],
    'Other days':['💐 Mother’s Day','👨 Father’s Day','🧒 Children’s Day','💝 Valentine’s Day','🎓 school trip','🌍 Earth Day'],
  }},

{ id:'nature-1', title:'Przyroda wokół nas', level:'1-3', area:'słownictwo', type:'groups',
  items:{
    'Sky':['☀️ sun','🌙 moon','⭐ star','☁️ cloud','🌈 rainbow','💨 wind'],
    'Plants':['🌳 tree','🌸 flower','🍃 leaf','🌱 grass','🍄 mushroom','🌰 nut'],
    'Water':['🌊 sea','🏞️ river','💧 rain','❄️ snow','🧊 ice','⛲ lake'],
    'Places':['⛰️ mountain','🏖️ beach','🌲 forest','🏜️ desert','🏝️ island','🌾 field'],
    'Garden':['🐛 caterpillar','🐞 ladybird','🦋 butterfly','🐌 snail','🐝 bee','🐜 ant'],
  }},

]);
