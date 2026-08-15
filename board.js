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

function setBoardTheme(world, theme) {
  const route=theme.routeStyle||{}, fields=theme.fieldStyle||{}, title=theme.titleStyle||{};
  const routeWidth=route.width||10.5;
  const values={
    '--accent':theme.accent, '--accent2':theme.accent2,
    '--route-outer':route.outer, '--route-surface':route.surface, '--route-detail':route.detail,
    '--route-shadow-width':`${routeWidth+5}`, '--route-outer-width':`${routeWidth+2}`,
    '--route-surface-width':`${routeWidth}`, '--route-detail-width':`${Math.max(1.2,routeWidth*.15)}`,
    '--field-fill':fields.fill, '--field-rim':fields.rim, '--field-ink':fields.ink,
    '--field-shadow':fields.shadow, '--field-milestone':fields.milestone,
    '--title-bg':title.background, '--title-bg2':title.background2,
    '--title-edge':title.edge, '--title-ink':title.ink,
  };
  Object.entries(values).forEach(([name,value])=>{if(value)world.style.setProperty(name,value);});
  world.dataset.theme=theme.id;
}

function smoothRoute(points, tension=.14) {
  if(points.length<2)return '';
  const fixed=(n)=>Number(n.toFixed(2));
  let d=`M ${fixed(points[0][0])} ${fixed(points[0][1])}`;
  for(let i=0;i<points.length-1;i++){
    const p0=points[Math.max(0,i-1)], p1=points[i], p2=points[i+1], p3=points[Math.min(points.length-1,i+2)];
    const c1=[p1[0]+(p2[0]-p0[0])*tension,p1[1]+(p2[1]-p0[1])*tension];
    const c2=[p2[0]-(p3[0]-p1[0])*tension,p2[1]-(p3[1]-p1[1])*tension];
    d+=` C ${fixed(c1[0])} ${fixed(c1[1])}, ${fixed(c2[0])} ${fixed(c2[1])}, ${fixed(p2[0])} ${fixed(p2[1])}`;
  }
  return d;
}

function svgElement(name, attrs={}) {
  const node=document.createElementNS('http://www.w3.org/2000/svg',name);
  Object.entries(attrs).forEach(([key,value])=>node.setAttribute(key,String(value)));
  return node;
}

function starPoints(radius=4, inner=1.8, count=5) {
  return Array.from({length:count*2},(_,i)=>{
    const angle=-Math.PI/2+i*Math.PI/count, r=i%2?inner:radius;
    return `${(Math.cos(angle)*r).toFixed(2)},${(Math.sin(angle)*r).toFixed(2)}`;
  }).join(' ');
}

function addRouteMotif(host, kind, x, y, rotation, index) {
  const group=svgElement('g',{class:`route-motif motif-${kind}`,transform:`translate(${x} ${y}) rotate(${rotation})`});
  if(kind==='paw'){
    group.appendChild(svgElement('ellipse',{cx:0,cy:1.1,rx:2.8,ry:2.2}));
    [-2.4,0,2.4].forEach((cx,i)=>group.appendChild(svgElement('circle',{cx,cy:-2.2-(i===1?.5:0),r:1.05})));
  }else if(kind==='star'){
    group.appendChild(svgElement('polygon',{points:starPoints(4.3,1.8,5)}));
  }else if(kind==='knot'){
    group.appendChild(svgElement('circle',{cx:0,cy:0,r:3.1}));
    group.appendChild(svgElement('path',{d:'M -4 -3 L 4 3 M -4 3 L 4 -3'}));
  }else if(kind==='station'){
    group.appendChild(svgElement('rect',{x:-3.1,y:-3.1,width:6.2,height:6.2,rx:1}));
    group.appendChild(svgElement('circle',{cx:0,cy:0,r:1.3}));
  }else if(kind==='spark'){
    group.appendChild(svgElement('polygon',{points:'0,-5 1.2,-1.2 5,0 1.2,1.2 0,5 -1.2,1.2 -5,0 -1.2,-1.2'}));
  }else if(kind==='footprint'){
    group.appendChild(svgElement('ellipse',{cx:0,cy:1.4,rx:2.5,ry:3.4}));
    [-2.5,0,2.5].forEach((cx,i)=>group.appendChild(svgElement('circle',{cx,cy:-2.6-(i===1?.8:0),r:1.1})));
  }else if(kind==='stitch'){
    [-3,0,3].forEach((cx)=>group.appendChild(svgElement('line',{x1:cx-1.2,y1:-2.5,x2:cx+1.2,y2:2.5})));
  }else if(kind==='seasons'){
    const season=index%4;
    if(season===0){
      group.appendChild(svgElement('path',{d:'M -4 0 H 4 M 0 -4 V 4 M -3 -3 L 3 3 M -3 3 L 3 -3'}));
    }else if(season===1){
      for(let a=0;a<360;a+=90)group.appendChild(svgElement('ellipse',{cx:0,cy:-2.6,rx:1.5,ry:2.4,transform:`rotate(${a})`}));
      group.appendChild(svgElement('circle',{cx:0,cy:0,r:1.3}));
    }else if(season===2){
      group.appendChild(svgElement('circle',{cx:0,cy:0,r:2.1}));
      for(let a=0;a<360;a+=45)group.appendChild(svgElement('line',{x1:0,y1:-3.2,x2:0,y2:-5,transform:`rotate(${a})`}));
    }else{
      group.appendChild(svgElement('path',{d:'M -3 3 C -5 -2,-1 -5,4 -4 C 4 1,1 4,-3 3 Z M -2 2 L 3 -3'}));
    }
  }
  host.appendChild(group);
}

function routeSvg(theme, col=0, row=0, whole=false) {
  const route=theme.routeStyle||{}, material=route.material||'classic';
  const svg=svgElement('svg',{class:`board-route route-${material}`,viewBox:whole?'0 0 420 594':'0 0 210 297','aria-hidden':'true'});
  if(material==='seasons'){
    const defs=svgElement('defs'), gradient=svgElement('linearGradient',{id:'season-route-gradient',x1:0,y1:1,x2:0,y2:0});
    [['0%','#dcecff'],['32%','#bfe6c0'],['62%','#f7d167'],['100%','#db8152']].forEach(([offset,color])=>gradient.appendChild(svgElement('stop',{offset,'stop-color':color})));
    defs.appendChild(gradient); svg.appendChild(defs);
  }
  const points=theme.fields.map((f)=>[f.x-col*210,f.y-row*297]), d=smoothRoute(points,route.tension||.14);
  ['route-shadow','route-outer','route-surface','route-detail'].forEach((cls)=>svg.appendChild(svgElement('path',{class:cls,d})));
  const motifs=svgElement('g',{class:'route-motifs'}), marks=[3,11,19,27];
  marks.forEach((fieldIndex,index)=>{
    const a=theme.fields[fieldIndex], b=theme.fields[fieldIndex+1];
    const x=(a.x+b.x)/2-col*210, y=(a.y+b.y)/2-row*297;
    const angle=Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI;
    addRouteMotif(motifs,route.motif||'star',x,y,angle,index);
  });
  svg.appendChild(motifs);
  return svg;
}

function boardField(theme, field, col=0, row=0, whole=false) {
  const activeSpecial=field.kind==='special' && state.specials;
  const kind=field.kind==='special' && !state.specials ? 'normal' : field.kind;
  const milestone=field.n%8===0?' milestone':'';
  const cell=el('div',`board-field ${kind}${milestone} ${activeSpecial ? field.tone || '' : ''}`); cell.dataset.field=String(field.n);
  if (whole) {
    cell.style.left=(field.x/420*100)+'%'; cell.style.top=(field.y/594*100)+'%';
  } else {
    cell.style.left=(field.x-col*210)+'mm'; cell.style.top=(field.y-row*297)+'mm';
  }
  if (kind==='start' || kind==='finish') {
    const badge=el('span','field-icon-badge'), icon=boardIcon(kind==='start'?'🏁':'🏆'); if(icon)badge.appendChild(icon);
    cell.appendChild(badge); const copy=el('span','endpoint-copy'); copy.appendChild(el('small',null,kind==='start'?'START':'META'));
    copy.appendChild(el('span','field-label',kind==='start'?theme.startLabel:theme.finishLabel)); cell.appendChild(copy);
  } else if (activeSpecial) {
    const badge=el('span','field-icon-badge'), icon=boardIcon(field.icon); if(icon)badge.appendChild(icon); cell.appendChild(badge);
    cell.appendChild(el('span','field-number',String(field.n)));
  } else cell.appendChild(el('span','field-number',String(field.n)));
  return cell;
}

function addBoardTitle(world, theme, whole=false) {
  const style=theme.titleStyle||{}, title=el('div',`board-title title-${style.variant||'classic'}${whole?' whole-title':''}`);
  const x=style.x||120, y=style.y||282, width=style.width||104, height=style.height||27;
  title.style.left=whole?(x/420*100)+'%':x+'mm'; title.style.top=whole?(y/594*100)+'%':y+'mm';
  title.style.width=whole?(width/420*100)+'%':width+'mm'; title.style.minHeight=whole?(height/594*100)+'%':height+'mm';
  const ornamentLeft=el('span','title-ornament ornament-left'), ornamentRight=el('span','title-ornament ornament-right');
  title.appendChild(ornamentLeft); const iconWrap=el('span','title-icon-wrap'), icon=boardIcon(style.icon||'⭐','title-icon');
  if(icon)iconWrap.appendChild(icon); title.appendChild(iconWrap);
  const copy=el('span','title-copy'); copy.appendChild(el('strong',null,theme.title)); copy.appendChild(el('span','title-subtitle',theme.subtitle)); title.appendChild(copy);
  title.appendChild(ornamentRight); world.appendChild(title);
}

function boardPage(theme, code, col, row) {
  const page=el('section',`print-page board-page board-${state.mode}`); page.dataset.code=code;
  const world=el('div','board-world');
  world.style.setProperty('--art',`url('${theme.art}')`); setBoardTheme(world,theme); world.style.backgroundSize=theme.backgroundSize;
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
  world.style.setProperty('--art',`url('${theme.preview}')`); setBoardTheme(world,theme); world.appendChild(routeSvg(theme,0,0,true));
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
