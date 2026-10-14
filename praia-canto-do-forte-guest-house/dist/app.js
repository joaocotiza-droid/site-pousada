/* Sem dependências. O site não inventa contato, política, preço ou avaliação. */
'use strict';
const C=window.POUSADA,$=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const lineIcon=n=>`<svg class="line-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-${n}"/></svg>`;
const reviewStars=n=>Array.from({length:Math.max(0,Math.min(5,Number(n)||0))},()=>lineIcon('star')).join('');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl=s=>{try{const u=new URL(s);return ['https:','http:'].includes(u.protocol)?u.href:'#'}catch{return '#'}};
$$('[data-maps]').forEach(a=>a.href=C.maps);$$('[data-phone]').forEach(a=>a.href=`tel:+${C.phone}`);$('#year').textContent=new Date().getFullYear();
const phoneValid=n=>/^55\d{10,11}$/.test(n||'');
if(phoneValid(C.whatsapp)){
 const href=`https://wa.me/${C.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de consultar uma estadia na '+C.name+'.')}`;
 $$('[data-contact]').forEach(a=>{a.href=href;const label=a.querySelector('.contact-label');if(label)label.textContent='Falar no WhatsApp'});
 $('#mobile-contact').textContent='WhatsApp';$('.floating-contact').setAttribute('aria-label','Falar no WhatsApp');$('#contact-fallback').hidden=true;
}
if(C.email){const a=document.createElement('a');a.href=`mailto:${C.email}`;a.textContent=C.email;$('#extra-contacts').append(a)}
if(C.instagram){const a=document.createElement('a');a.href=`https://www.instagram.com/${C.instagram.replace(/^@/,'')}/`;a.textContent=`@${C.instagram.replace(/^@/,'')}`;a.target='_blank';a.rel='noopener';$('#extra-contacts').append(a)}
$('#room-grid').innerHTML=C.rooms.map((r,i)=>`<article class="room glass reveal"><figure class="photo"><img src="${esc(r.photo)}" srcset="${esc(r.photo.replace('.webp','-640.webp'))} 640w, ${esc(r.photo)} 1280w" sizes="(max-width: 800px) 92vw, 30vw" alt="${esc(r.alt)}" width="1280" height="960" loading="lazy"></figure><div class="room-body"><div class="room-meta"><span>ATÉ ${r.guests} PESSOAS</span><span>${r.size} m²</span></div><h3>${esc(r.name)}</h3><p>${esc(r.detail)}</p><div class="room-price"><strong>${r.price?'A partir de '+Number(r.price).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}):'Valores sob consulta'}</strong></div><button class="button outline" data-room="${i}">Reservar este quarto <span aria-hidden="true">${lineIcon('external')}</span></button></div></article>`).join('');
function renderGallery(filter='todos'){
 const grid=$('#gallery-grid');grid.classList.toggle('filtered',filter!=='todos');
 grid.innerHTML=C.gallery.map((p,i)=>({p,i})).filter(({p})=>filter==='todos'||p.category===filter).map(({p,i})=>`<button class="gallery-item photo" data-photo="${i}" aria-label="Ampliar: ${esc(p.label)}"><img src="${esc(p.src)}" srcset="${esc(p.src.replace('.webp','-640.webp'))} 640w, ${esc(p.src)} 1280w" sizes="(max-width: 800px) 92vw, 35vw" alt="${esc(p.alt)}" loading="lazy" width="1280" height="960"><span class="gallery-caption">${esc(p.label)}</span><span class="zoom" aria-hidden="true">+</span></button>`).join('');
}
renderGallery();$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{$$('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});renderGallery(b.dataset.filter)}));
const faq=[['Qual é o horário de check-in e check-out?',C.policies.checkin&&C.policies.checkout?`Check-in: ${C.policies.checkin}. Check-out: ${C.policies.checkout}.`:'Confirme os horários de entrada e saída com a pousada antes de organizar sua viagem.'],['O café da manhã está incluído?',C.policies.breakfast||'Consulte se o café está incluído na opção e nas datas da sua reserva.'],['Posso levar meu pet?',C.policies.pets||'Confirme a política atual para animais de estimação diretamente com a pousada antes de reservar.'],['Há estacionamento?', 'A propriedade anuncia estacionamento privativo. Consulte a disponibilidade da vaga ao reservar.'],['Como funciona o cancelamento?',C.policies.cancellation||'As condições devem ser confirmadas antes de concluir a reserva. Peça os prazos e as regras para a sua tarifa.'],['Posso me hospedar com crianças?',C.policies.children||'Informe a quantidade e a idade das crianças para a pousada confirmar a acomodação e as condições da estadia.']];
$('#faq-list').innerHTML=faq.map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
let selectedRoom='',lastFocus=null;
const localDate=d=>[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
// A data mínima segue o fuso da pousada, sem comparar horários UTC.
const today=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const inEl=$('#checkin'),outEl=$('#checkout');inEl.min=today;outEl.min=today;
function nextDay(s){const d=new Date(s+'T12:00:00');d.setDate(d.getDate()+1);return localDate(d)}
inEl.addEventListener('change',()=>{inEl.setCustomValidity('');if(inEl.value){outEl.min=nextDay(inEl.value);if(outEl.value&&outEl.value<=inEl.value)outEl.value=outEl.min}outEl.setCustomValidity('')});outEl.addEventListener('input',()=>outEl.setCustomValidity(''));
function message(){
 const format=s=>s.split('-').reverse().join('/');
 const dates=inEl.value&&outEl.value?` de ${format(inEl.value)} a ${format(outEl.value)}`:'';
 const count=$('#guests').value;
 const guests=count==='5'?'5 ou mais pessoas':count==='1'?'1 pessoa':`${count} pessoas`;
 return `Olá! Gostaria de reservar na ${C.name}${dates}, para ${guests}.${selectedRoom?' Tenho interesse na '+selectedRoom+'.':''} Poderiam confirmar disponibilidade, valor e condições?`;
}
function whatsappUrl(text){return `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(text)}`}
function openDialog(d){lastFocus=document.activeElement;d.showModal();document.body.style.overflow='hidden'}
function showContact(){const m=message();if(phoneValid(C.whatsapp)){window.location.assign(whatsappUrl(m));return}$('#request-message').value=m;$('#copy-status').textContent='';$('#dialog-whatsapp').hidden=true;$('#dialog-booking').hidden=!C.bookingUrl;if(C.bookingUrl)$('#dialog-booking').href=safeUrl(C.bookingUrl);openDialog($('#contact-dialog'))}
$$('[data-contact]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();selectedRoom='';showContact()}));
$('#room-grid').addEventListener('click',e=>{const b=e.target.closest('[data-room]');if(b){selectedRoom=C.rooms[Number(b.dataset.room)].name;showContact()}});
$('#reservation').addEventListener('submit',e=>{e.preventDefault();inEl.setCustomValidity(inEl.value<today?'Escolha uma chegada a partir de hoje.':'');outEl.setCustomValidity(outEl.value<=inEl.value?'A saída deve ser depois da chegada.':'');if(!e.target.reportValidity())return;selectedRoom='';showContact()});
$('#copy-message').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#request-message').value);$('#copy-status').textContent='Mensagem copiada. Nenhuma reserva foi enviada.'}catch{$('#request-message').select();$('#copy-status').textContent='Selecione e copie a mensagem para usar no contato.'}});
$$('dialog').forEach(d=>{d.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>d.close()));d.addEventListener('close',()=>{document.body.style.overflow='';lastFocus?.focus()});d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}})});
let photoIndex=0;function displayPhoto(){const p=C.gallery[photoIndex];$('#lightbox-image').src=p.src;$('#lightbox-image').alt=p.alt;$('#lightbox-caption').textContent=`${p.label} · ${photoIndex+1} / ${C.gallery.length}`}
$('#gallery-grid').addEventListener('click',e=>{const b=e.target.closest('[data-photo]');if(b){photoIndex=Number(b.dataset.photo);displayPhoto();openDialog($('#lightbox'))}});
function shiftPhoto(n){photoIndex=(photoIndex+n+C.gallery.length)%C.gallery.length;displayPhoto()}
$('#photo-prev').addEventListener('click',()=>shiftPhoto(-1));$('#photo-next').addEventListener('click',()=>shiftPhoto(1));$('#lightbox').addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();shiftPhoto(-1)}if(e.key==='ArrowRight'){e.preventDefault();shiftPhoto(1)}});
let startX=0;$('#lightbox-image').addEventListener('touchstart',e=>startX=e.changedTouches[0].clientX,{passive:true});$('#lightbox-image').addEventListener('touchend',e=>{const delta=e.changedTouches[0].clientX-startX;if(Math.abs(delta)>65)shiftPhoto(delta<0?1:-1)},{passive:true});
$('#privacy-btn').addEventListener('click',()=>openDialog($('#privacy-dialog')));
const menu=$('.menu-btn');menu.addEventListener('click',()=>{const expanded=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!expanded));$('#navigation').classList.toggle('open',!expanded)});$('#navigation').addEventListener('click',e=>{if(e.target.closest('a')){menu.setAttribute('aria-expanded','false');$('#navigation').classList.remove('open')}});document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.setAttribute('aria-expanded','false');$('#navigation').classList.remove('open')}});
window.addEventListener('scroll',()=>$('#header').classList.toggle('scrolled',window.scrollY>20),{passive:true});
if(C.reviews.length){
 const track=$('#review-track');
 track.innerHTML=C.reviews.map((r,i)=>`<article class="glass review-card" aria-label="Avaliação ${i+1} de ${C.reviews.length}"><div class="review-card-top"><span class="review-seal">Avaliação real do Google</span>${r.rating?`<span class="stars" aria-label="${esc(r.rating)} de 5 estrelas">${reviewStars(r.rating)}<span class="review-rating">${esc(r.rating)},0</span></span>`:'<span class="review-original">Texto original</span>'}</div><blockquote>“${esc(r.text)}”</blockquote><div class="review-author"><span class="review-initial" aria-hidden="true">${esc(r.name.charAt(0))}</span><strong>${esc(r.name)}</strong><a href="${safeUrl(r.source||C.maps)}" target="_blank" rel="noopener" aria-label="Ver fonte da avaliação de ${esc(r.name)}">Ver fonte ${lineIcon('external')}</a></div></article>`).join('');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const step=()=>track.querySelector('.review-card').getBoundingClientRect().width+22;
 ['prev','next'].forEach((dir,i)=>$('#review-'+dir).addEventListener('click',()=>track.scrollBy({left:(i?1:-1)*step(),behavior:reduced?'instant':'smooth'})));
 const updateReviews=()=>{const start=Math.round(track.scrollLeft/step());const visible=innerWidth>800?2:1;$('#review-position').textContent=visible===1?`Avaliação ${Math.min(start+1,C.reviews.length)} de ${C.reviews.length}`:`Avaliações ${Math.min(start+1,C.reviews.length)}–${Math.min(start+visible,C.reviews.length)} de ${C.reviews.length}`;$('#review-prev').disabled=track.scrollLeft<4;$('#review-next').disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-4;$('.review-dots').innerHTML=C.reviews.map((_,i)=>`<i class="${i>=start&&i<start+visible?'active':''}"></i>`).join('')};
 track.addEventListener('scroll',updateReviews,{passive:true});window.addEventListener('resize',updateReviews);updateReviews();
 let drag=null;track.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button===0&&!e.target.closest('a')){drag={x:e.clientX,left:track.scrollLeft};track.classList.add('dragging');track.setPointerCapture(e.pointerId)}});
 track.addEventListener('pointermove',e=>{if(drag){e.preventDefault();track.scrollLeft=drag.left-(e.clientX-drag.x)}});
 const stopDrag=()=>{drag=null;track.classList.remove('dragging')};track.addEventListener('pointerup',stopDrag);track.addEventListener('pointercancel',stopDrag);track.addEventListener('lostpointercapture',stopDrag);
 track.addEventListener('keydown',e=>{if(e.target===track&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();track.scrollBy({left:(e.key==='ArrowRight'?1:-1)*step(),behavior:reduced?'instant':'smooth'})}});
}
// Dados estruturados: nota somente da ficha pública; reviews apenas se cadastradas.
const schema={'@context':'https://schema.org','@type':'LodgingBusiness',name:C.name,url:location.origin,telephone:'+'+C.phone,image:new URL('assets/piscina.webp',location.href).href,address:{'@type':'PostalAddress',streetAddress:'Av. Mal. Maurício José Cardoso, 358',addressLocality:'Praia Grande',addressRegion:'SP',postalCode:'11700-140',addressCountry:'BR'},sameAs:[C.maps],aggregateRating:{'@type':'AggregateRating',ratingValue:C.google.rating,bestRating:5,reviewCount:C.google.count}};
if(C.reviews.length)schema.review=C.reviews.map(r=>({'@type':'Review',author:{'@type':'Person',name:r.name},reviewBody:r.text,...(r.rating?{reviewRating:{'@type':'Rating',ratingValue:r.rating,bestRating:5}}:{})}));
const structured=$('#lodging-schema');structured.textContent=JSON.stringify(schema);
if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});document.body.classList.add('motion');$$('.reveal').forEach(el=>observer.observe(el))}

// Parallax discreto apenas no desktop, respeitando movimento reduzido.
if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&matchMedia('(min-width: 1101px)').matches){let scheduled=false;const art=$('.hero-art');window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(()=>{art.style.translate=`0 ${Math.min(window.scrollY,650)*.035}px`;scheduled=false})}},{passive:true})}

// Mar em SVG: a rolagem muda o desenho das ondas, sem bloquear o gesto no celular.
const sea=$('#scroll-sea');
if(sea&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
 let framePending=false;
 function drawSea(){framePending=false;const y=window.scrollY,full=Math.max(1,document.documentElement.scrollHeight-innerHeight),progress=y/full;const phase=y*.0022;const levels=[580,665,775,597,682];const amplitudes=[66,53,34,66,53];sea.querySelectorAll('path').forEach((path,i)=>{const level=levels[i]-progress*110,amplitude=amplitudes[i];let d=`M-120 ${level+Math.sin(phase+i)*amplitude}`;for(let x=-120;x<1560;x+=120){const mid=x+60,next=x+120;d+=` Q${mid} ${level+Math.sin(mid*.004+phase+i)*amplitude*1.2} ${next} ${level+Math.sin(next*.004+phase+i)*amplitude}`}if(i<3)d+=' V960 H-120Z';path.setAttribute('d',d)});document.documentElement.style.setProperty('--sea-drift',`${Math.sin(phase)*25}px`)}
 const requestSea=()=>{if(!framePending){framePending=true;requestAnimationFrame(drawSea)}};
 window.addEventListener('scroll',requestSea,{passive:true});window.addEventListener('resize',requestSea);drawSea();
}
