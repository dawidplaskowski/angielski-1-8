'use strict';

const libraryState = { section:'all' };
const qs = (s) => document.querySelector(s);

function sectionFromHash(){
  const h=location.hash.replace('#','');
  return ['plansze','karty','gry'].includes(h) ? {plansze:'boards',karty:'cards',gry:'games'}[h] : 'all';
}
function setSection(section){
  libraryState.section=section; state.deckId=null;
  document.querySelectorAll('.main-nav button').forEach((b)=>b.classList.toggle('active',b.dataset.section===section));
  renderLibrary();
}
function materialTags(items){const row=el('div','material-tags');items.forEach(t=>row.appendChild(el('span',null,t)));return row;}

function boardCard(theme){
  const card=el('article','material-card board-card');
  const art=el('div','material-cover'); art.style.backgroundImage=`linear-gradient(180deg,transparent 45%,#15251fbf),url('${theme.preview}')`;
  const badge=el('span','cover-badge','4 × A4'); art.appendChild(badge); card.appendChild(art);
  const body=el('div','material-body'); body.appendChild(el('span','material-kind','PLANSZA'));
  body.appendChild(el('h3',null,theme.title)); body.appendChild(el('p',null,theme.description));
  body.appendChild(materialTags(['klasy 1–3','pusta lub numerowana','6 uniwersalnych zestawów']));
  const a=el('a','open-material','Otwórz konfigurator →');a.href=`board.html?id=${theme.id}`;body.appendChild(a);card.appendChild(body);return card;
}

function deckCard(deck){
  const card=el('button','material-card deck-library-card');
  card.appendChild(el('div','deck-cover-icon',deck.area==='gramatyka'?'Aa':'✦'));
  const body=el('div','material-body'); body.appendChild(el('span','material-kind',deck.area.toUpperCase()));
  body.appendChild(el('h3',null,deck.title));
  body.appendChild(el('p',null,DECK_TYPES[deck.type].what));
  body.appendChild(materialTags([LEVEL_NAMES[deck.level],countItems(deck)+' kart',DECK_TYPES[deck.type].name]));card.appendChild(body);
  card.onclick=()=>{state.deckId=deck.id;const games=gamesFor(deck);state.game=games[0];renderDeckWorkspace();scrollTo(0,0);};
  return card;
}

function gameCard(id,g){
  const card=el('article','game-library-card');card.appendChild(el('span','game-big-icon',g.icon));
  const text=el('div');text.appendChild(el('h3',null,g.name));text.appendChild(el('p',null,g.short));
  text.appendChild(materialTags([g.players,g.time]));card.appendChild(text);return card;
}

function sectionHead(kicker,title,copy){const h=el('div','section-heading');const t=el('div');t.appendChild(el('span','eyebrow',kicker));t.appendChild(el('h2',null,title));t.appendChild(el('p',null,copy));h.appendChild(t);return h;}

function renderLibrary(){
  const main=qs('#main');main.innerHTML='';document.body.classList.remove('workspace-open');
  const visible=DECKS.filter(matchesFilters);
  if(libraryState.section==='all'){
    const hero=el('section','library-hero');const copy=el('div');copy.appendChild(el('span','eyebrow','GOTOWE DO DRUKU'));
    copy.appendChild(el('h1',null,'Angielski, który chce się rozłożyć na stole.'));
    copy.appendChild(el('p',null,'Plansze, karty i gry dla klas 1–8. Bez konta, instalacji i nudnych szablonów.'));
    const actions=el('div','hero-actions');const b=el('button','primary','Zobacz plansze');b.onclick=()=>setSection('boards');actions.appendChild(b);copy.appendChild(actions);hero.appendChild(copy);
    const visual=el('div','hero-stack');BOARD_THEMES.slice(0,4).forEach((theme,i)=>{const x=el('div','hero-mini');x.style.backgroundImage=`url('${theme.preview}')`;x.style.transform=`rotate(${[-7,5,-3,8][i]}deg) translate(${[-34,18,-8,32][i]}px,${[10,-6,5,12][i]}px)`;visual.appendChild(x);});hero.appendChild(visual);main.appendChild(hero);
  }
  if(['all','boards'].includes(libraryState.section)){
    const section=el('section','library-section');section.appendChild(sectionHead('PLANSZE','Wielokrotnego użytku','Jedna zalaminowana plansza, wiele klas i zestawów zadań.'));
    const grid=el('div','materials-grid board-grid');BOARD_THEMES.forEach(b=>grid.appendChild(boardCard(b)));section.appendChild(grid);main.appendChild(section);
  }
  if(['all','cards'].includes(libraryState.section)){
    const section=el('section','library-section');section.appendChild(sectionHead('KARTY',`${visible.length} zestawów do wyboru`,'Filtruj według klasy i tematu, potem wybierz grę i wariant wydruku.'));
    const grid=el('div','materials-grid deck-grid');visible.slice(0,libraryState.section==='all'?8:visible.length).forEach(d=>grid.appendChild(deckCard(d)));section.appendChild(grid);
    if(!visible.length)section.appendChild(el('p','empty','Brak materiałów pasujących do filtrów.'));
    if(libraryState.section==='all'&&visible.length>8){const more=el('button','show-all','Pokaż wszystkie karty');more.onclick=()=>setSection('cards');section.appendChild(more);}main.appendChild(section);
  }
  if(['all','games'].includes(libraryState.section)){
    const section=el('section','library-section');section.appendChild(sectionHead('GRY','Cztery sposoby pracy','Te same treści możesz wykorzystać na kilka różnych sposobów.'));
    const grid=el('div','games-library-grid');Object.entries(GAMES).forEach(([id,g])=>grid.appendChild(gameCard(id,g)));section.appendChild(grid);main.appendChild(section);
  }
}

function renderDeckWorkspace(){
  const main=qs('#main'),deck=currentDeck();main.innerHTML='';document.body.classList.add('workspace-open');
  const crumb=el('button','workspace-back no-print','← Wróć do biblioteki');crumb.onclick=()=>{state.deckId=null;renderLibrary();};main.appendChild(crumb);
  const bar=el('div','workbench no-print');const head=el('div','wb-head');head.appendChild(el('span','eyebrow','KARTY DO DRUKU'));head.appendChild(el('h2',null,deck.title));
  const sub=el('p','wb-sub');sub.appendChild(el('span','tag tag-'+(deck.area==='gramatyka'?'g':'s'),deck.area));sub.appendChild(el('span','tag tag-type',DECK_TYPES[deck.type].icon+' '+DECK_TYPES[deck.type].name));sub.appendChild(el('span',null,LEVEL_NAMES[deck.level]+' · '+countItems(deck)+' kart'));head.appendChild(sub);bar.appendChild(head);
  renderGamePicker(deck,bar);bar.appendChild(renderOptions(bar,deck));bar.appendChild(renderRulesPanel(deck));main.appendChild(bar);
  main.appendChild(el('div','sheet-label no-print','Podgląd wydruku'));const sheet=el('div');sheet.id='sheet';main.appendChild(sheet);renderSheet();
}

function initLibrary(){
  initIcons();
  const lvl=qs('#f-level');LEVELS.forEach(l=>{const o=el('option',null,LEVEL_NAMES[l]);o.value=l;lvl.appendChild(o);});
  qs('#f-level').onchange=e=>{state.level=e.target.value;renderLibrary();};
  qs('#f-area').onchange=e=>{state.area=e.target.value;renderLibrary();};
  qs('#f-search').oninput=e=>{state.search=e.target.value.trim();renderLibrary();};
  qs('#home-btn').onclick=()=>setSection('all');
  document.querySelectorAll('.main-nav button').forEach(b=>b.onclick=()=>setSection(b.dataset.section));
  setSection(sectionFromHash());
}
initLibrary();
