/* custom cursor */
(function(){
  if (window.matchMedia('(hover: none)').matches) return;
  const dot=document.querySelector('.cursor-dot'), ring=document.querySelector('.cursor-ring');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
  (function loop(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
  document.querySelectorAll('a,button,.g-item,.chip').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('link-hover'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('link-hover'));
  });
})();

/* nav */
const nav=document.getElementById('nav');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40));
const burger=document.getElementById('burger'),navLinks=document.getElementById('navLinks');
burger.addEventListener('click',()=>{burger.classList.toggle('open');navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{burger.classList.remove('open');navLinks.classList.remove('open');}));

/* hero mouse parallax (desktop) */
if(!window.matchMedia('(hover: none)').matches){
  const p=document.getElementById('portrait'),r=document.getElementById('portraitRing');
  addEventListener('mousemove',e=>{
    const x=(e.clientX/innerWidth-.5), y=(e.clientY/innerHeight-.5);
    p.style.transform=`translate(${x*-18}px,${y*-14}px)`;
    r.style.transform=`translate(${x*-18}px,${y*-14}px)`;
  });
}

/* contact form -> WhatsApp */
const contactForm=document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit',function(e){
    e.preventDefault();
    const name=document.getElementById('cfName').value.trim();
    const phone=document.getElementById('cfPhone').value.trim();
    const subject=document.getElementById('cfSubject').value.trim();
    const message=document.getElementById('cfMessage').value.trim();
    const whatsappNumber='201144889891';
    let text=`New project inquiry from portfolio website:\n\n`;
    text+=`Name: ${name}\n`;
    text+=`Phone: ${phone}\n`;
    if(subject) text+=`Subject: ${subject}\n`;
    text+=`Message: ${message}`;
    const url=`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url,'_blank');
  });
}

/* reveal on scroll */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* lightbox with per-gallery captions */
const lb=document.getElementById('lightbox'),lbImg=document.getElementById('lbImg'),lbCap=document.getElementById('lbCap');
let items=[],caps=[],idx=0;
function openLb(gallery,i){
  items=[...gallery.querySelectorAll('img')];
  caps=JSON.parse(gallery.dataset.captions||'[]');
  idx=i;show();lb.classList.add('open');document.body.style.overflow='hidden';
}
function show(){
  lbImg.src=items[idx].src;
  lbCap.textContent=(caps[idx]||'')+`  ·  ${idx+1} / ${items.length}`;
}
document.querySelectorAll('.gallery').forEach(g=>{
  [...g.querySelectorAll('.g-item')].forEach((it,i)=>it.addEventListener('click',()=>openLb(g,i)));
});
document.getElementById('lbClose').onclick=()=>{lb.classList.remove('open');document.body.style.overflow='';};
document.getElementById('lbPrev').onclick=()=>{idx=(idx-1+items.length)%items.length;show();};
document.getElementById('lbNext').onclick=()=>{idx=(idx+1)%items.length;show();};
lb.addEventListener('click',e=>{if(e.target===lb){lb.classList.remove('open');document.body.style.overflow='';}});
addEventListener('keydown',e=>{
  if(!lb.classList.contains('open'))return;
  if(e.key==='Escape'){lb.classList.remove('open');document.body.style.overflow='';}
  if(e.key==='ArrowLeft')document.getElementById('lbPrev').click();
  if(e.key==='ArrowRight')document.getElementById('lbNext').click();
});
