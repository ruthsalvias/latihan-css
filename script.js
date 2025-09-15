
// starfield canvas + simple animation
(function(){
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  function resize(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  function init(){
    resize();
    stars = [];
    const count = Math.floor((canvas.width*canvas.height)/50000);
    for(let i=0;i<count;i++){
      stars.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, r: Math.random()*1.2+0.2, a: Math.random() });
    }
  }
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(const s of stars){
      ctx.globalAlpha = s.a;
      ctx.beginPath();
      ctx.fillStyle='rgba(255,255,255,0.9)';
      ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  function twinkle(){
    for(const s of stars) s.a = 0.4 + Math.random()*0.6;
  }
  window.addEventListener('resize', init);
  init();
  setInterval(twinkle, 800);
  (function loop(){ draw(); requestAnimationFrame(loop); })();
})();

// intersection observer for reveal
(function(){
  const sections = document.querySelectorAll('.section');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show'); });
  }, {threshold:0.18});
  sections.forEach(s=>obs.observe(s));
})();
