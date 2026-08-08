// Talie do gier. Dodajesz nową? Skopiuj dowolną i zmień zawartość.
// level: '1-3' | '4' | '5-6' | '7-8'      area: 'słownictwo' | 'gramatyka'
// type:  'pairs'   -> items: [['big','small'], ...]        (memory, bingo)
//        'groups'  -> items: { 'Fruit': ['🍎 apple', ...] } (Piotruś, bingo)
//        'prompts' -> items: [{q:'She ___ (go).', a:'goes'}] (karty zadań)

window.DECKS = [

// ─── KLASY 1–3 ────────────────────────────────────────────────────────────

{ id:'opposites-1', title:'Przeciwieństwa', level:'1-3', area:'słownictwo', type:'pairs',
  items:[
    ['big','small'],['hot','cold'],['happy','sad'],['old','new'],['fast','slow'],
    ['long','short'],['open','closed'],['day','night'],['up','down'],['in','out'],
    ['yes','no'],['good','bad'],['tall','short'],['clean','dirty'],['full','empty'],
    ['young','old'],['easy','hard'],['loud','quiet'],['wet','dry'],['light','dark'],
    ['left','right'],['first','last'],['near','far'],['rich','poor'],['strong','weak'],
    ['thick','thin'],['soft','hard'],['front','back'],['boy','girl'],['sit','stand'],
  ]},

{ id:'animals-1', title:'Zwierzęta – ang/pol', level:'1-3', area:'słownictwo', type:'pairs',
  items:[
    ['🐱 cat','kot'],['🐶 dog','pies'],['🐭 mouse','mysz'],['🐦 bird','ptak'],['🐟 fish','ryba'],
    ['🐻 bear','niedźwiedź'],['🐰 rabbit','królik'],['🐴 horse','koń'],['🐮 cow','krowa'],['🐷 pig','świnia'],
    ['🐔 hen','kura'],['🐑 sheep','owca'],['🦆 duck','kaczka'],['🦁 lion','lew'],['🐒 monkey','małpa'],
    ['🐘 elephant','słoń'],['🐸 frog','żaba'],['🐝 bee','pszczoła'],['🦊 fox','lis'],['🐺 wolf','wilk'],
    ['🐯 tiger','tygrys'],['🦒 giraffe','żyrafa'],['🐍 snake','wąż'],['🕷️ spider','pająk'],['🐢 turtle','żółw'],
    ['🐧 penguin','pingwin'],['🦉 owl','sowa'],['🐋 whale','wieloryb'],['🦋 butterfly','motyl'],['🐐 goat','koza'],
  ]},

{ id:'colours-numbers-1', title:'Kolory i liczby', level:'1-3', area:'słownictwo', type:'groups',
  items:{
    'Colours':['🔴 red','🔵 blue','🟢 green','🟡 yellow','⚫ black','⚪ white','🟤 brown','🟠 orange','🟣 purple','🩷 pink'],
    'Numbers':['1️⃣ one','2️⃣ two','3️⃣ three','4️⃣ four','5️⃣ five','6️⃣ six','7️⃣ seven','8️⃣ eight','9️⃣ nine','🔟 ten'],
    'Shapes':['⬛ square','🔺 triangle','⚪ circle','⭐ star','❤️ heart','➖ line'],
  }},

{ id:'food-1', title:'Jedzenie i picie', level:'1-3', area:'słownictwo', type:'groups',
  items:{
    'Fruit':['🍎 apple','🍌 banana','🍇 grapes','🍓 strawberry','🍊 orange','🍐 pear'],
    'Vegetables':['🥕 carrot','🥔 potato','🍅 tomato','🥒 cucumber','🧅 onion','🥬 lettuce'],
    'Drinks':['🥛 milk','🧃 juice','💧 water','☕ tea','🥤 lemonade','🍫 cocoa'],
    'Sweets':['🍰 cake','🍪 biscuit','🍫 chocolate','🍦 ice cream','🍬 sweets','🍩 doughnut'],
    'Meals':['🍞 bread','🧀 cheese','🥚 egg','🍕 pizza','🍜 soup','🍚 rice'],
  }},

{ id:'clothes-1', title:'Ubrania', level:'1-3', area:'słownictwo', type:'pairs',
  items:[
    ['👕 T-shirt','koszulka'],['👖 trousers','spodnie'],['👗 dress','sukienka'],['👞 shoes','buty'],
    ['🧦 socks','skarpetki'],['🧢 cap','czapka z daszkiem'],['🧥 coat','płaszcz'],['🧤 gloves','rękawiczki'],
    ['🧣 scarf','szalik'],['👚 blouse','bluzka'],['🩳 shorts','krótkie spodenki'],['👘 skirt','spódnica'],
    ['🥾 boots','kozaki'],['🩱 swimsuit','strój kąpielowy'],['👔 shirt','koszula'],['🎒 backpack','plecak'],
    ['🧶 sweater','sweter'],['👟 trainers','adidasy'],['🎩 hat','kapelusz'],['👜 handbag','torebka'],
    ['🕶️ sunglasses','okulary słoneczne'],['⌚ watch','zegarek'],['👝 pyjamas','piżama'],['🦺 jacket','kurtka'],
    ['👡 sandals','sandały'],['🧦 tights','rajstopy'],
  ]},

{ id:'toys-1', title:'Zabawki i zabawa', level:'1-3', area:'słownictwo', type:'groups',
  items:{
    'Toys':['🧸 teddy bear','🪁 kite','🎈 balloon','🚗 toy car','🪀 yo-yo','🧩 puzzle'],
    'Outside':['⚽ ball','🚲 bike','🛴 scooter','🛼 roller skates','🪃 boomerang','🏀 basketball'],
    'Games':['🎲 dice','♟️ chess','🃏 cards','🎯 darts','🎮 computer game','🪅 piñata'],
    'Music':['🥁 drum','🎸 guitar','🎹 piano','🎺 trumpet','🎻 violin','🎤 microphone'],
    'Craft':['✏️ pencil','🖍️ crayons','✂️ scissors','🎨 paints','📄 paper','🧵 string'],
  }},

// ─── KLASA 4 ──────────────────────────────────────────────────────────────

{ id:'school-4', title:'Szkoła i przybory', level:'4', area:'słownictwo', type:'pairs',
  items:[
    ['✏️ pencil','ołówek'],['🖊️ pen','długopis'],['📕 book','książka'],['📓 notebook','zeszyt'],
    ['📏 ruler','linijka'],['🧽 rubber','gumka'],['✂️ scissors','nożyczki'],['🖍️ crayons','kredki'],
    ['🎒 schoolbag','tornister'],['🪑 chair','krzesło'],['🧑‍🏫 teacher','nauczyciel'],['🧒 pupil','uczeń'],
    ['🏫 classroom','klasa (sala)'],['🖼️ blackboard','tablica'],['📐 set square','ekierka'],['🗒️ timetable','plan lekcji'],
    ['📚 library','biblioteka'],['🏃 break','przerwa'],['📝 homework','praca domowa'],['🎨 art','plastyka'],
    ['🔢 maths','matematyka'],['🧪 science','przyroda'],['🏃 PE','wf'],['🌍 geography','geografia'],
    ['📖 dictionary','słownik'],['✅ mark','ocena'],['🖇️ glue','klej'],['🗑️ bin','kosz'],
    ['🏆 test','sprawdzian'],['🎓 headmaster','dyrektor'],
  ]},

{ id:'family-4', title:'Rodzina', level:'4', area:'słownictwo', type:'pairs',
  items:[
    ['👩 mother','mama'],['👨 father','tata'],['👧 sister','siostra'],['👦 brother','brat'],
    ['👵 grandmother','babcia'],['👴 grandfather','dziadek'],['👶 baby','niemowlę'],['🧑 cousin','kuzyn/kuzynka'],
    ['👩‍🦰 aunt','ciocia'],['🧔 uncle','wujek'],['👨‍👩‍👧 parents','rodzice'],['👨‍👩‍👧‍👦 family','rodzina'],
    ['🐕 pet','zwierzak domowy'],['👫 twins','bliźniaki'],['🏠 home','dom'],['💍 wife','żona'],
  ]},

{ id:'routine-4', title:'Codzienna rutyna', level:'4', area:'słownictwo', type:'pairs',
  items:[
    ['⏰ get up','wstawać'],['🚿 have a shower','brać prysznic'],['🥣 have breakfast','jeść śniadanie'],
    ['🦷 brush my teeth','myć zęby'],['🚌 go to school','iść do szkoły'],['📖 do homework','odrabiać lekcje'],
    ['🍽️ have dinner','jeść obiad'],['📺 watch TV','oglądać telewizję'],['🛏️ go to bed','iść spać'],
    ['👕 get dressed','ubierać się'],['🐕 walk the dog','wyprowadzać psa'],['🧹 tidy my room','sprzątać pokój'],
    ['⚽ play football','grać w piłkę'],['🎹 practise the piano','ćwiczyć na pianinie'],
    ['📞 call a friend','dzwonić do kolegi'],['😴 fall asleep','zasypiać'],
    ['🧼 wash my face','myć twarz'],['🎒 pack my bag','pakować plecak'],['🍎 have a snack','jeść przekąskę'],
    ['🚿 take a bath','brać kąpiel'],['📚 read a book','czytać książkę'],['🛒 do the shopping','robić zakupy'],
    ['🍳 make breakfast','robić śniadanie'],['🚶 walk home','iść pieszo do domu'],['💤 have a nap','uciąć sobie drzemkę'],
  ]},

{ id:'tobe-havegot-4', title:'to be / have got', level:'4', area:'gramatyka', type:'prompts',
  items:[
    {q:'I ___ a pupil.', a:'am'},
    {q:'She ___ my sister.', a:'is'},
    {q:'We ___ in the classroom.', a:'are'},
    {q:'Tom and Ann ___ happy.', a:'are'},
    {q:'It ___ a big dog.', a:'is'},
    {q:'You ___ my best friend.', a:'are'},
    {q:'___ you ten years old?', a:'Are'},
    {q:'He ___ not (not) at home.', a:'is'},
    {q:'I ___ got a bike.', a:'have'},
    {q:'She ___ got two cats.', a:'has'},
    {q:'My brother ___ got a new phone.', a:'has'},
    {q:'They ___ got a big garden.', a:'have'},
    {q:'___ you got a pet?', a:'Have'},
    {q:'___ your dad got a car?', a:'Has'},
    {q:'We ___ not got any milk.', a:"haven't"},
    {q:'The cat ___ not got a name.', a:"hasn't"},
    {q:'Przetłumacz: Mam siostrę.', a:'I have got a sister.'},
    {q:'Przetłumacz: On jest wysoki.', a:'He is tall.'},
    {q:'Przetłumacz: Czy oni mają psa?', a:'Have they got a dog?'},
    {q:'Przetłumacz: Nie jestem zmęczony.', a:"I'm not tired."},
  ]},

// ─── KLASY 5–6 ────────────────────────────────────────────────────────────

{ id:'present-simple-cont-5', title:'Present Simple vs Continuous', level:'5-6', area:'gramatyka', type:'prompts',
  items:[
    {q:'She ___ (go) to school every day.', a:'goes'},
    {q:'Look! He ___ (run) very fast.', a:'is running'},
    {q:'I usually ___ (get) up at seven.', a:'get'},
    {q:'Listen! The baby ___ (cry).', a:'is crying'},
    {q:'We ___ (not / like) fish.', a:"don't like"},
    {q:'Right now they ___ (watch) TV.', a:'are watching'},
    {q:'My dad ___ (work) in a hospital.', a:'works'},
    {q:'Be quiet, I ___ (do) my homework.', a:'am doing'},
    {q:'___ you ___ (play) tennis on Sundays?', a:'Do / play'},
    {q:'What ___ she ___ (do) at the moment?', a:'is / doing'},
    {q:'Water ___ (boil) at 100 degrees.', a:'boils'},
    {q:'It ___ (rain) now, take an umbrella.', a:'is raining'},
    {q:'Cats ___ (not / eat) grass.', a:"don't eat"},
    {q:'Where ___ your friend ___ (live)?', a:'does / live'},
    {q:'They ___ (have) breakfast right now.', a:'are having'},
    {q:'He never ___ (drink) coffee.', a:'drinks'},
    {q:'Nazwij słowo-klucz: "every day" → który czas?', a:'Present Simple'},
    {q:'Nazwij słowo-klucz: "at the moment" → który czas?', a:'Present Continuous'},
    {q:'Przetłumacz: Ona teraz czyta książkę.', a:'She is reading a book now.'},
    {q:'Przetłumacz: Zawsze jeżdżę autobusem.', a:'I always go by bus.'},
  ]},

{ id:'irregular-past-5', title:'Past Simple – czasowniki nieregularne', level:'5-6', area:'gramatyka', type:'pairs',
  items:[
    ['go','went'],['have','had'],['do','did'],['see','saw'],['eat','ate'],
    ['drink','drank'],['make','made'],['take','took'],['come','came'],['give','gave'],
    ['write','wrote'],['read','read'],['run','ran'],['swim','swam'],['sing','sang'],
    ['buy','bought'],['think','thought'],['bring','brought'],['find','found'],['get','got'],
    ['know','knew'],['sleep','slept'],['speak','spoke'],['begin','began'],
    ['fly','flew'],['drive','drove'],['leave','left'],['meet','met'],['put','put'],
    ['say','said'],['tell','told'],['win','won'],['lose','lost'],['catch','caught'],
  ]},

{ id:'house-town-5', title:'Dom i miasto', level:'5-6', area:'słownictwo', type:'groups',
  items:{
    'Rooms':['🛏️ bedroom','🍳 kitchen','🛁 bathroom','🛋️ living room','🚪 hall','🪜 attic'],
    'Furniture':['🪑 armchair','🛏️ bed','🪟 window','🚪 door','🗄️ wardrobe','🪞 mirror'],
    'Places in town':['🏥 hospital','🏦 bank','🏪 shop','🏛️ museum','🎬 cinema','🚉 station'],
    'Directions':['⬅️ turn left','➡️ turn right','⬆️ go straight on','↩️ go back','🔀 crossroads','🚦 traffic lights'],
    'Outside':['🌳 park','🌉 bridge','🛣️ street','🅿️ car park','⛲ fountain','🏟️ stadium'],
  }},

{ id:'weather-5', title:'Pogoda i pory roku', level:'5-6', area:'słownictwo', type:'pairs',
  items:[
    ['☀️ sunny','słonecznie'],['🌧️ rainy','deszczowo'],['❄️ snowy','śnieżnie'],['💨 windy','wietrznie'],
    ['☁️ cloudy','pochmurno'],['🌫️ foggy','mgliście'],['⛈️ stormy','burzowo'],['🥶 freezing','lodowato'],
    ['🌡️ temperature','temperatura'],['🌈 rainbow','tęcza'],['⚡ lightning','błyskawica'],['🌊 flood','powódź'],
    ['🌸 spring','wiosna'],['☀️ summer','lato'],['🍂 autumn','jesień'],['⛄ winter','zima'],
    ['🌡️ warm','ciepło'],['🧊 cool','chłodno'],['💧 humid','wilgotno'],['🏜️ dry','sucho'],
    ['🌪️ tornado','tornado'],['🌦️ shower','przelotny deszcz'],['🌥️ overcast','zachmurzenie'],
    ['🥵 heatwave','fala upałów'],['🧊 ice','lód'],['☃️ snowman','bałwan'],
  ]},

// ─── KLASY 7–8 ────────────────────────────────────────────────────────────

{ id:'present-perfect-7', title:'Present Perfect', level:'7-8', area:'gramatyka', type:'prompts',
  items:[
    {q:'I ___ (never / be) to London.', a:'have never been'},
    {q:'She ___ (just / finish) her homework.', a:'has just finished'},
    {q:'They ___ (live) here since 2015.', a:'have lived'},
    {q:'___ you ever ___ (eat) sushi?', a:'Have / eaten'},
    {q:'He ___ (not / see) that film yet.', a:"hasn't seen"},
    {q:'We ___ (know) each other for ten years.', a:'have known'},
    {q:'The train ___ (already / leave).', a:'has already left'},
    {q:'How long ___ she ___ (work) here?', a:'has / worked'},
    {q:'since czy for? ___ Monday', a:'since'},
    {q:'since czy for? ___ three hours', a:'for'},
    {q:'since czy for? ___ I was a child', a:'since'},
    {q:'since czy for? ___ a long time', a:'for'},
    {q:'Popraw: I have seen him yesterday.', a:'I saw him yesterday.'},
    {q:'Popraw: She has went home.', a:'She has gone home.'},
    {q:'Past Simple czy Present Perfect? "in 1999"', a:'Past Simple'},
    {q:'Past Simple czy Present Perfect? "ever"', a:'Present Perfect'},
    {q:'Przetłumacz: Zgubiłem klucze.', a:'I have lost my keys.'},
    {q:'Przetłumacz: Czy kiedykolwiek byłeś w Paryżu?', a:'Have you ever been to Paris?'},
    {q:'Przetłumacz: Ona jeszcze nie przyszła.', a:"She hasn't come yet."},
    {q:'Przetłumacz: Znam go od dziecka.', a:'I have known him since childhood.'},
  ]},

{ id:'passive-7', title:'Strona bierna', level:'7-8', area:'gramatyka', type:'prompts',
  items:[
    {q:'English ___ (speak) all over the world.', a:'is spoken'},
    {q:'The letter ___ (write) yesterday.', a:'was written'},
    {q:'These cars ___ (make) in Japan.', a:'are made'},
    {q:'The window ___ (break) by the boys.', a:'was broken'},
    {q:'The room ___ (clean) every morning.', a:'is cleaned'},
    {q:'The homework ___ (not / finish) yet.', a:"hasn't been finished"},
    {q:'The bridge ___ (build) in 1890.', a:'was built'},
    {q:'Pizza ___ (eat) by millions of people.', a:'is eaten'},
    {q:'Zamień na bierną: They clean the office daily.', a:'The office is cleaned daily.'},
    {q:'Zamień na bierną: Shakespeare wrote Hamlet.', a:'Hamlet was written by Shakespeare.'},
    {q:'Zamień na bierną: Someone stole my bike.', a:'My bike was stolen.'},
    {q:'Zamień na bierną: They will open the shop at 8.', a:'The shop will be opened at 8.'},
    {q:'Zamień na czynną: The cake was baked by Ann.', a:'Ann baked the cake.'},
    {q:'Zamień na czynną: The song is sung by children.', a:'Children sing the song.'},
    {q:'Jaki przyimek wprowadza wykonawcę czynności?', a:'by'},
    {q:'Podaj wzór strony biernej.', a:'be + past participle (3. forma)'},
    {q:'Przetłumacz: Ten dom został zbudowany w 1920.', a:'This house was built in 1920.'},
    {q:'Przetłumacz: Śniadanie jest podawane o 8.', a:'Breakfast is served at 8.'},
  ]},

{ id:'phrasal-verbs-7', title:'Phrasal verbs', level:'7-8', area:'słownictwo', type:'pairs',
  items:[
    ['get up','wstawać'],['give up','poddawać się'],['look after','opiekować się'],['look for','szukać'],
    ['turn on','włączać'],['turn off','wyłączać'],['put on','zakładać (ubranie)'],['take off','zdejmować'],
    ['find out','dowiedzieć się'],['come back','wracać'],['grow up','dorastać'],['run out of','skończyć się (zapas)'],
    ['look forward to','nie móc się doczekać'],['get on with','dogadywać się z'],['take care of','dbać o'],
    ['put off','odkładać na później'],['break down','zepsuć się'],['go on','kontynuować'],
    ['pick up','podnosić / odbierać'],['work out','ćwiczyć / wychodzić na dobre'],
    ['fill in','wypełniać (formularz)'],['throw away','wyrzucać'],['set off','wyruszać'],['bring up','wychowywać'],
    ['carry on','kontynuować'],['give in','ustępować'],['hang out','spędzać czas'],['make up','wymyślać'],
    ['point out','zwracać uwagę na'],['turn up','pojawiać się'],
  ]},

{ id:'personality-7', title:'Opis osoby – charakter i wygląd', level:'7-8', area:'słownictwo', type:'groups',
  items:{
    'Positive':['😊 friendly','🤝 helpful','😄 cheerful','🧠 clever','💪 brave','🤗 generous'],
    'Negative':['😠 rude','😒 lazy','🙄 selfish','😤 stubborn','😰 nervous','🤫 mean'],
    'Appearance':['🧔 bearded','👱 blonde','🕶️ good-looking','📏 tall','🦱 curly-haired','👓 bespectacled'],
    'Neutral':['🤔 quiet','🎭 shy','⚡ energetic','📚 serious','🎨 creative','⏰ punctual'],
    'Feelings':['😃 excited','😟 worried','😴 bored','😳 embarrassed','😌 relaxed','😢 disappointed'],
  }},

{ id:'reported-speech-7', title:'Mowa zależna', level:'7-8', area:'gramatyka', type:'prompts',
  items:[
    {q:'"I am tired." → He said (that) he ___ tired.', a:'was'},
    {q:'"I like pizza." → She said she ___ pizza.', a:'liked'},
    {q:'"We are working." → They said they ___ working.', a:'were'},
    {q:'"I have finished." → He said he ___ finished.', a:'had'},
    {q:'"I will call you." → She said she ___ call me.', a:'would'},
    {q:'"I saw him." → He said he ___ him.', a:'had seen'},
    {q:'"I can swim." → She said she ___ swim.', a:'could'},
    {q:'"Where do you live?" → He asked where I ___.', a:'lived'},
    {q:'"Are you happy?" → She asked ___ I was happy.', a:'if / whether'},
    {q:'"Close the door." → He told me ___ the door.', a:'to close'},
    {q:"\"Don't run.\" → She told us ___ run.", a:'not to'},
    {q:'Zamień: tomorrow →', a:'the next day'},
    {q:'Zamień: yesterday →', a:'the day before'},
    {q:'Zamień: now →', a:'then'},
    {q:'Zamień: here →', a:'there'},
    {q:'Zamień: this →', a:'that'},
    {q:'"I am going home." → Ann said...', a:'Ann said she was going home.'},
    {q:'"Do you speak French?" → He asked me...', a:'He asked me if I spoke French.'},
  ]},

];
