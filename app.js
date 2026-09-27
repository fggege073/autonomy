const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const levels = {
car: [['L0','비자동화','운전자가 주행을 수행하는 단계입니다.','SAE J3016 · 자동차 자동화 기준'],['L1','운전자 지원','운전자의 주행을 보조하는 단계입니다.','SAE J3016 · 자동차 자동화 기준'],['L2','부분 자동화','L2는 부분 자동화 단계입니다. 고도화 L2+는 공식 등급이 아닙니다.','L2+ · DMS 기반 핸즈프리 보조 / 운전자 책임 100%'],['L3','조건부 자동화','조건부 자동화 · 제어권 전환 요청(TOR)에 대한 운전자 응답','시스템 책임 원칙 / TOR 미응답 시 운전자'],['L4','고도 자동화','고도 자동화 단계 · Waymo L4 로보택시','SAE J3016 · 고도 자동화'],['L5','완전 자동화','자동차 자동화 단계에서 완전 자동화로 소개됩니다.','SAE J3016 · 완전 자동화']],
ship: [['Degree 1','승선지원','선박 자동화 · 승선지원','IMO MASS'],['Degree 2','승선지원','선박 자동화 · 승선지원','IMO MASS'],['Degree 2','원격제어','선박 자동화 · 원격제어','IMO MASS · 원격제어'],['Degree 3','무인원격','선박의 무인 원격 운항 단계로 소개됩니다.','IMO MASS'],['Degree 4','완전자율','선박의 완전 자율 단계로 소개됩니다.','IMO MASS']]
};
let domain='car';
function selected(buttons, predicate){buttons.forEach((b,i)=>{const active=predicate(b,i);b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});}
function selectLevel(index){const [number,title,description,note]=levels[domain][index];$('#level-domain').textContent=domain==='car'?'AUTOMOTIVE / SAE J3016':'MARITIME / IMO MASS';$('#level-number').textContent=number;$('#level-number').style.fontSize=domain==='ship'?'48px':'';$('#level-title').textContent=title;$('#level-description').textContent=description;$('#level-note').textContent=note;selected($$('#level-buttons button'),(_,i)=>i===index);}
function renderLevels(key){domain=key;$('#level-buttons').innerHTML=levels[key].map(([number,title],i)=>`<button style="height:${68+i*18}px" data-level="${i}" aria-pressed="false"><span${key==='ship'?' style="font-size:12px"':''}>${number}</span><small>${title}</small></button>`).join('');selected($$('[data-domain]'),b=>b.dataset.domain===key);selectLevel(key==='car'?2:0);}
$$('[data-domain]').forEach(b=>b.addEventListener('click',()=>renderLevels(b.dataset.domain)));
$('#level-buttons').addEventListener('click',e=>{const b=e.target.closest('button');if(b)selectLevel(Number(b.dataset.level));});renderLevels('car');
const architectures={
tesla:{title:'테슬라 FSD 작동방식',subtitle:'Pure Vision → 3D 공간 표현 → 차량 제어 → 데이터 학습',badge:'VISION & END-TO-END AI',cards:[['◎','Pure Vision','카메라 중심 인식','카메라 중심 · HD Map 배제'],['▦','Occupancy Network','3D 공간 표현','주변 공간을 입체적으로 표현'],['⌘','End-to-End AI','비전 입력 → 차량 제어','종단간 AI'],['⟳','수직 통합 데이터 엔진','데이터 수집 → AI 학습 → 배포','반복되는 데이터 학습 순환']]},
nvidia:{title:'엔비디아 자율주행 작동방식',subtitle:'하드웨어와 소프트웨어를 연결하는 NVIDIA DRIVE 플랫폼',badge:'PLATFORM & FUSION',className:'three',cards:[['⌖','Hyperion','레퍼런스 아키텍처','멀티센서 지원'],['▱','Dual Stack','모듈형 + End-to-End','이중 스택 구조'],['▧','DRIVE AGX','Thor / Orin','NVIDIA DRIVE 컴퓨팅 플랫폼']]},
others:{title:'타 자동차 회사 작동방식',subtitle:'센서 퓨전과 HD Map을 중심으로 소개한 기업별 사례',badge:'SENSOR FUSION / HD MAP',className:'others',cards:[['⌖','Waymo','L4 로보택시','센서 퓨전 · HD Map'],['◇','Mercedes-Benz','L3 DRIVE PILOT','고속도로 조건부'],['◎','GM','Super Cruise','DMS · HD Map'],['▱','현대자동차','HDA 계열','센서 퓨전']]}
};
function renderArchitecture(key){const a=architectures[key];$('#architecture-content').innerHTML=`<div class="arch-intro"><div><h3>${a.title}</h3><p>${a.subtitle}</p></div><span>${a.badge}</span></div><div class="flow-grid ${a.className||''}">${a.cards.map(([icon,title,description,note],i)=>`<article class="panel flow-card"><small>0${i+1} / ${key==='others'?'COMPANY':'SYSTEM'}</small><span class="icon" aria-hidden="true">${icon}</span><h4>${title}</h4><p>${description}</p><div class="flow-foot">${note}</div></article>`).join('')}</div>`;selected($$('[data-company]'),b=>b.dataset.company===key);queueFlowAnimation();}
$$('[data-company]').forEach(b=>b.addEventListener('click',()=>renderArchitecture(b.dataset.company)));renderArchitecture('tesla');
const liabilities=['100% 운전자 책임','시스템 책임 원칙 / TOR 미응답 시 운전자','100% 제조사 & 운영사 책임'];
$$('[data-liability]').forEach(b=>b.addEventListener('click',()=>{selected($$('[data-liability]'),el=>el===b);$('#liability-description').innerHTML=`<strong>${liabilities[Number(b.dataset.liability)]}</strong><p>${b.textContent}</p>`;}));
const menu=$('.menu');function closeMenu(){$('#nav').classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','메뉴 열기');}
menu.addEventListener('click',()=>{const open=$('#nav').classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');});$$('#nav a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
function updateProgress(){const height=document.documentElement.scrollHeight-innerHeight;$('.progress').style.width=`${height>0?scrollY/height*100:0}%`;}
window.addEventListener('scroll',updateProgress,{passive:true});window.addEventListener('resize',updateProgress);updateProgress();
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)$$('#nav a').forEach(a=>a.classList.toggle('current',a.hash===`#${entry.target.id}`));});},{rootMargin:'-15% 0px -55% 0px'});$$('main>section[id]').forEach(s=>observer.observe(s));

// Play once on entering view. Never hide content while waiting for an observer.
function queueFlowAnimation() {
  const grid = document.querySelector('#architecture-content .flow-grid');
  if (!grid || grid.classList.contains('others') || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  grid.querySelectorAll('.flow-card').forEach((card, index) => card.style.setProperty('--flow-index', index));
  const flowObserver = new IntersectionObserver(entries => {
    if (!grid.isConnected) { flowObserver.disconnect(); return; }
    if (entries.some(entry => entry.isIntersecting)) {
      grid.classList.add('flow-playing');
      flowObserver.disconnect();
    }
  }, { threshold: .2 });
  flowObserver.observe(grid);
}
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-enter');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.section .heading, .standard-grid, .callout, .table-wrap, .reg-card, .liability, .marine, .team-card').forEach(element => revealObserver.observe(element));
}
