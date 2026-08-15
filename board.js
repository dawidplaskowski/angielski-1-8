'use strict';

const $ = (s) => document.querySelector(s);
const TYPE_NAMES = {
  recognition:'Rozpoznaj', listening:'Posłuchaj', movement:'Ruch', counting:'Policz',
  classification:'Klasyfikuj', production:'Powiedz', dialogue:'Rozmawiaj',
  reasoning:'Pomyśl', translation:'Przetłumacz',
};
const state = {
  boardId:'animal', mode:'numbered', packId:'animal-1', format:'list',
  answers:true, specials:true,
};

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}
function board() { return BOARD_THEMES.find((b) => b.id === state.boardId) || BOARD_THEMES[0]; }
function pack() { return TASK_PACKS.find((p) => p.id === state.packId) || TASK_PACKS[0]; }

function initBoardIcons() {
  if (typeof OM_SPRITE === 'undefined' || document.getElementById('openmoji-sprite')) return;
  const host=el('div'); host.id='openmoji-sprite'; host.hidden=true; host.innerHTML=OM_SPRITE;
  document.body.prepend(host);
}

function boardIcon(emoji, cls='field-icon') {
  const hex=typeof OM_MAP !== 'undefined' && OM_MAP[emoji];
  const symbol=hex && document.getElementById('om-'+hex);
  if (!symbol) return null;
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('class',cls); svg.setAttribute('viewBox','0 0 72 72'); svg.setAttribute('aria-hidden','true');
  for (const child of symbol.children) svg.appendChild(child.cloneNode(true));
  return svg;
}

function routeSvg(theme, col=0, row=0, whole=false) {
  const ns='http://www.w3.org/2000/svg', svg=document.createElementNS(ns,'svg');
  svg.setAttribute('class','board-route'); svg.setAttribute('viewBox',whole?'0 0 420 594':'0 0 210 297');
  const points=theme.fields.map((f)=>whole?`${f.x},${f.y}`:`${f.x-col*210},${f.y-row*297}`).join(' ');
  ['route-shadow','route-line'].forEach((cls)=>{
    const line=document.createElementNS(ns,'polyline'); line.setAttribute('class',cls);
    line.setAttribute('points',points); svg.appendChild(line);
  });
  return svg;
}

function boardField(theme, field, col=0, row=0, whole=false) {
  const activeSpecial=field.kind==='special' && state.specials;
  const kind=field.kind==='special' && !state.specials ? 'normal' : field.kind;
  const cell=el('div',`board-field ${kind} ${activeSpecial ? field.tone || '' : ''}`); cell.dataset.field=String(field.n);
  if (whole) {
    cell.style.left=(field.x/420*100)+'%'; cell.style.top=(field.y/594*100)+'%';
  } else {
    cell.style.left=(field.x-col*210)+'mm'; cell.style.top=(field.y-row*297)+'mm';
  }
  if (kind==='start' || kind==='finish') {
    const icon=boardIcon(kind==='start'?'🏁':'🏆'); if(icon) cell.appendChild(icon);
    cell.appendChild(el('span','field-label',kind==='start'?theme.startLabel:theme.finishLabel));
  } else if (activeSpecial) {
    const icon=boardIcon(field.icon); if(icon) cell.appendChild(icon);
    cell.appendChild(el('span','field-number',String(field.n)));
  } else cell.appendChild(el('span','field-number',String(field.n)));
  return cell;
}

function addBoardTitle(world, theme, whole=false) {
  const title=el('div',`board-title${whole?' whole-title':''}`);
  const [x,y]=theme.titlePosition||[120,282];
  title.style.left=whole?(x/420*100)+'%':x+'mm'; title.style.top=whole?(y/594*100)+'%':y+'mm';
  title.style.background=`linear-gradient(135deg,${theme.accent},${theme.accent2})`;
  title.appendChild(el('strong',null,theme.title)); title.appendChild(el('span',null,theme.subtitle)); world.appendChild(title);
}

function boardPage(theme, code, col, row) {
  const page=el('section',`print-page board-page board-${state.mode}`); page.dataset.code=code;
  const world=el('div','board-world');
  world.style.setProperty('--art',`url('${theme.art}')`); world.style.setProperty('--accent',theme.accent);
  world.style.setProperty('--accent2',theme.accent2); world.style.backgroundSize=theme.backgroundSize;
  world.style.backgroundPositionX=col?'-210mm':'0'; world.style.backgroundPositionY=-(theme.cropY+row*297)+'mm';
  world.appendChild(routeSvg(theme,col,row));
  theme.fields.filter((f)=>Math.floor(f.x/210)===col&&Math.floor(f.y/297)===row)
    .forEach((f)=>world.appendChild(boardField(theme,f,col,row)));
  if(code==='A') addBoardTitle(world,theme);
  page.appendChild(world); page.appendChild(el('span','sheet-code',code));
  page.appendChild(el('span','print-note',`${code} · 100% · A4 pionowo`)); return page;
}

function wholeBoard(theme) {
  const world=el('div',`whole-board-world board-${state.mode}`);
  world.style.setProperty('--art',`url('${theme.preview}')`); world.style.setProperty('--accent',theme.accent);
  world.style.setProperty('--accent2',theme.accent2); world.appendChild(routeSvg(theme,0,0,true));
  theme.fields.forEach((f)=>world.appendChild(boardField(theme,f,0,0,true))); addBoardTitle(world,theme,true); return world;
}

function renderBoardPreview(theme) {
  const preview=$('#whole-board-preview'), zoom=$('#board-preview-zoom'); preview.innerHTML=''; zoom.innerHTML='';
  preview.appendChild(wholeBoard(theme)); zoom.appendChild(wholeBoard(theme)); $('#zoom-title').textContent=theme.title;
}

function taskListPages(selected) {
  const pages=[];
  for(let start=0;start<32;start+=16){
    const page=el('section','print-page material-page task-list-page'); page.style.setProperty('--accent',board().accent);
    const head=el('div','material-head'); head.appendChild(el('span','material-kicker',`KLASA ${selected.grade}`));
    head.appendChild(el('h1',null,selected.title)); head.appendChild(el('p',null,`Zadania ${start+1}–${Math.min(start+16,32)} · ${board().title}`)); page.appendChild(head);
    const grid=el('div','task-list');
    selected.tasks.slice(start,start+16).forEach((t)=>{
      const row=el('article','task-row'); row.appendChild(el('span','task-n',String(t.n)));
      const body=el('div'); body.appendChild(el('b','task-type',TYPE_NAMES[t.type]||t.type)); body.appendChild(el('div','task-prompt',t.prompt));
      if(state.answers) body.appendChild(el('div','task-answer','Odpowiedź: '+t.answer));
      if(t.hint) body.appendChild(el('div','task-hint',t.hint)); row.appendChild(body); grid.appendChild(row);
    });
    page.appendChild(grid); pages.push(page);
  }
  return pages;
}

function taskCardPages(selected) {
  const pages=[];
  for(let start=0;start<32;start+=9){
    const page=el('section','print-page card-page'); page.style.setProperty('--accent',board().accent); const grid=el('div','task-cards');
    selected.tasks.slice(start,start+9).forEach((t)=>{
      const card=el('article','task-card'); card.appendChild(el('span','card-n',String(t.n))); card.appendChild(el('span','card-type',TYPE_NAMES[t.type]||t.type));
      if(t.icon) card.appendChild(el('div','card-icon',t.icon)); card.appendChild(el('div','card-prompt',t.prompt));
      if(state.answers) card.appendChild(el('div','card-answer',t.answer)); grid.appendChild(card);
    });
    page.appendChild(grid); pages.push(page);
  }
  return pages;
}

function rulesPage(theme, selected) {
  const page=el('section','print-page material-page rules-page'); page.style.setProperty('--accent',theme.accent);
  page.innerHTML=`<div class="material-head"><span class="material-kicker">ZASADY UNIWERSALNE</span><h1>${theme.title}</h1><p>${selected.title} · 2–4 graczy · 20–30 minut</p></div>
    <div class="rule-facts"><div><b>Potrzebne</b><span>kostka i pionki</span></div><div><b>Plansza</b><span>4 arkusze A4</span></div><div><b>Zadania</b><span>lista lub karty</span></div></div>
    <h2>Przygotowanie</h2><ol><li>Ułóż arkusze A–B / C–D i połącz je od spodu.</li><li>Wybierz listę zadań odpowiednią do klasy albo potasuj karty.</li><li>Ustaw pionki na START. Zaczyna najmłodsza osoba.</li></ol>
    <h2>Tura gracza</h2><ol><li>Rzuć kostką i przesuń pionek.</li><li>Przy liście wykonaj zadanie o numerze pola; przy kartach wylosuj jedną kartę.</li><li>Dobra odpowiedź: zostajesz. Po błędzie wracasz na pole sprzed rzutu.</li><li>${state.specials?'Wykonaj akcję pola specjalnego. ':''}Do mety nie trzeba wyrzucić dokładnej liczby.</li></ol>`;
  if(state.specials){
    page.appendChild(el('h2',null,'Pola specjalne')); const legend=el('div','special-legend');
    theme.fields.filter((f)=>f.kind==='special').forEach((f)=>{
      const item=el('div',`legend-item ${f.tone||''}`), icon=boardIcon(f.icon,'legend-icon'); if(icon)item.appendChild(icon);
      const copy=el('span','legend-copy'); copy.appendChild(el('b',null,`Pole ${f.n}`)); copy.appendChild(el('small',null,f.effect)); item.appendChild(copy); legend.appendChild(item);
    });
    page.appendChild(legend);
  }
  const tip=el('div','teacher-tip'); tip.innerHTML='<b>Wskazówka:</b> laminuj planszę tylko raz. Zmiana klasy, tematu albo trudności wymaga wydrukowania wyłącznie nowych zadań.'; page.appendChild(tip);
  return page;
}

function renderPages(){
  const host=$('#pages'); host.innerHTML=''; const theme=board(), selected=pack(); renderBoardPreview(theme);
  [['A',0,0],['B',1,0],['C',0,1],['D',1,1]].forEach(([c,x,y])=>host.appendChild(boardPage(theme,c,x,y)));
  const materials=state.format==='cards'?taskCardPages(selected):taskListPages(selected); materials.forEach((p)=>host.appendChild(p)); host.appendChild(rulesPage(theme,selected));
  $('#page-title').textContent=theme.title; $('#config-title').textContent=theme.title; $('#config-description').textContent=theme.description;
  document.title=`${theme.title} · plansza do druku`;
}

function syncPacks(reset){
  const select=$('#pack-select'), available=TASK_PACKS.filter((p)=>p.theme===state.boardId);
  if(reset||!available.some((p)=>p.id===state.packId)) state.packId=available[0].id;
  select.innerHTML=''; available.forEach((p)=>{const o=el('option',null,p.title);o.value=p.id;select.appendChild(o);}); select.value=state.packId;
}

function init(){
  initBoardIcons();
  const params=new URLSearchParams(location.search), id=params.get('id');
  if(BOARD_THEMES.some((b)=>b.id===id)) state.boardId=id;
  if(['numbered','blank'].includes(params.get('mode'))) state.mode=params.get('mode');
  if(['list','cards'].includes(params.get('format'))) state.format=params.get('format');
  if(params.has('answers')) state.answers=params.get('answers')!=='0';
  if(params.has('specials')) state.specials=params.get('specials')!=='0';
  if(params.get('output')==='board') document.body.classList.add('board-only');
  if(params.get('output')==='tasks') document.body.classList.add('tasks-only');
  const requestedPack=TASK_PACKS.find((p)=>p.id===params.get('pack')&&p.theme===state.boardId); if(requestedPack) state.packId=requestedPack.id;
  const boardSelect=$('#board-select'); BOARD_THEMES.forEach((b)=>{const o=el('option',null,b.title);o.value=b.id;boardSelect.appendChild(o);}); boardSelect.value=state.boardId;
  syncPacks(!requestedPack); $('#mode-select').value=state.mode; $('#format-select').value=state.format;
  $('#answers-toggle').checked=state.answers; $('#specials-toggle').checked=state.specials;
  boardSelect.onchange=(e)=>{state.boardId=e.target.value;syncPacks(true);renderPages();};
  $('#mode-select').onchange=(e)=>{state.mode=e.target.value;renderPages();};
  $('#pack-select').onchange=(e)=>{state.packId=e.target.value;renderPages();};
  $('#format-select').onchange=(e)=>{state.format=e.target.value;renderPages();};
  $('#answers-toggle').onchange=(e)=>{state.answers=e.target.checked;renderPages();};
  $('#specials-toggle').onchange=(e)=>{state.specials=e.target.checked;renderPages();};
  $('#print-board').onclick=()=>{document.body.classList.remove('tasks-only');document.body.classList.add('board-only');window.print();};
  $('#print-tasks').onclick=()=>{document.body.classList.remove('board-only');document.body.classList.add('tasks-only');window.print();};
  addEventListener('afterprint',()=>document.body.classList.remove('board-only','tasks-only'));
  const dialog=$('#board-preview-dialog'); $('#open-board-preview').onclick=()=>dialog.showModal(); $('#close-board-preview').onclick=()=>dialog.close();
  dialog.addEventListener('click',(e)=>{if(e.target===dialog)dialog.close();}); renderPages();
}
init();
