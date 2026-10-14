/* Pegadas ilustrativas; os botões abrem o percurso real no Google Maps. */
(function setupWalks(){
  const section=document.querySelector('#por-perto');if(!section)return;
  const origin='Praia Canto do Forte Guest House, Av. Mal. Maurício José Cardoso, 358, Praia Grande, SP';
  const destinations={
    praia:{title:'PRAIA DO CANTO DO FORTE',distance:'400',caption:'Do portão para a areia.',description:'Um passeio até a Praia do Canto do Forte. Veja o caminho a pé e escolha onde estender a sua toalha.',destination:'Praia do Canto do Forte, Praia Grande, SP',path:'M180 264C270 305 350 265 370 200S431 141 466 146',end:[466,146]},
    centro:{title:'CENTRO DE PRAIA GRANDE',distance:'900',caption:'O centro entra no passeio.',description:'O comércio do Boqueirão também está por perto. Abra a rota a pé para planejar seu passeio pela região da Avenida Costa e Silva.',destination:'Centro comercial, Avenida Presidente Costa e Silva, Boqueirão, Praia Grande, SP',path:'M158 227C235 201 277 165 228 126S167 120 159 107',end:[159,107]}
  };
  const path=document.querySelector('#walking-path'),footprints=document.querySelector('#walk-footprints');
  const svg=document.querySelector('#walk-map'),frame=document.querySelector('.walk-illustration');
  const motion=matchMedia('(prefers-reduced-motion: reduce)');let current='praia';
  function drawSteps(animate){
    const len=path.getTotalLength(),parts=[];
    for(let i=0;i<18;i++){
      const dist=len*(i+1)/20,p=path.getPointAtLength(dist),before=path.getPointAtLength(Math.max(0,dist-1)),after=path.getPointAtLength(Math.min(len,dist+1));
      const rad=Math.atan2(after.y-before.y,after.x-before.x),side=i%2?1:-1;
      const x=p.x-Math.sin(rad)*side*7,y=p.y+Math.cos(rad)*side*7;
      parts.push(`<g class="walk-step" style="--step-delay:${i*.095}s" transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${(rad*180/Math.PI+90).toFixed(2)}) scale(.56)"><use href="#footprint-shape"/></g>`);
    }
    frame.classList.remove('steps-playing');footprints.innerHTML=parts.join('');
    if(animate&&!motion.matches){void svg.getBoundingClientRect();frame.classList.add('steps-playing')}
  }
  function chooseWalk(key,animate=true){
    const route=destinations[key];if(!route)return;current=key;
    section.querySelectorAll('[data-walk]').forEach(b=>{const active=b.dataset.walk===key;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
    document.querySelector('#walk-kicker').textContent=route.title;document.querySelector('#walk-distance').textContent=route.distance;
    document.querySelector('#walk-caption').textContent=route.caption;document.querySelector('#walk-description').textContent=route.description;
    const url=new URL('https://www.google.com/maps/dir/');url.search=new URLSearchParams({api:'1',origin,destination:route.destination,travelmode:'walking'}).toString();document.querySelector('#walking-route').href=url.href;
    path.setAttribute('d',route.path);document.querySelector('#walk-arrival').setAttribute('transform',`translate(${route.end.join(' ')})`);
    frame.dataset.destination=key;document.querySelector('#walk-svg-title').textContent=`Passeio ilustrativo da pousada até ${key==='praia'?'a praia':'o centro'}`;
    document.querySelector('#walk-svg-desc').textContent=`Pegadas ligam a casa ${key==='praia'?'à praia':'ao centro'}. A ilustração não representa o traçado das ruas. O botão abre a rota real no Google Maps.`;
    drawSteps(animate);
  }
  section.querySelectorAll('[data-walk]').forEach(b=>b.addEventListener('click',()=>chooseWalk(b.dataset.walk)));
  document.querySelector('#walk-replay').addEventListener('click',()=>chooseWalk(current));
  motion.addEventListener('change',()=>chooseWalk(current,false));chooseWalk('praia',false);
  if('IntersectionObserver'in window&&!motion.matches){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){drawSteps(true);observer.disconnect()}},{threshold:.3});observer.observe(frame)}
})();
