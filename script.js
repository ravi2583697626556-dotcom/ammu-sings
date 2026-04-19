
// ── PARTICLES
const pt = document.getElementById('pt');
const notes = ['♩','♪','♫','♬','𝄞'];

for (let i = 0; i < 30; i++) {
  const el = document.createElement('div');
  if (i < 18) {
    el.className = 'p';
    const s = 1 + Math.random() * 2.5;
    el.style.cssText = `left:${Math.random()*100}%;width:${s}px;height:${s}px;--d:${7+Math.random()*10}s;--dl:${Math.random()*15}s;--dr:${(Math.random()-.5)*100}px`;
  } else {
    el.className = 'nt';
    el.textContent = notes[Math.floor(Math.random() * notes.length)];
    el.style.cssText = `left:${5+Math.random()*88}%;bottom:${Math.random()*25}%;--sz:${.7+Math.random()*1}rem;--d:${6+Math.random()*8}s;--dl:${Math.random()*12}s`;
  }
  pt.appendChild(el);
}

// ── WAVEFORM
const wf = document.getElementById('wf');
[2,4,8,14,22,32,42,50,54,56,54,50,42,32,22,14,8,4,2].forEach((h, i) => {
  const b = document.createElement('div');
  b.className = 'wb';
  b.style.cssText = `height:${h}px;--s:${.35+Math.random()*.7}s;animation-delay:${i*.05}s`;
  wf.appendChild(b);
});

// ── SCROLL REVEAL
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
}, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });
document.querySelectorAll('.rv').forEach(el => obs.observe(el));

// ── CURSOR (desktop / mouse only)
if (window.matchMedia('(pointer:fine)').matches) {
  document.body.style.cursor = 'none';

  const cur = document.createElement('div');
  cur.style.cssText = 'position:fixed;width:10px;height:10px;background:#d4a843;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);mix-blend-mode:screen;transition:.08s;top:0;left:0;';

  const cur2 = document.createElement('div');
  cur2.style.cssText = 'position:fixed;width:32px;height:32px;border:1px solid rgba(212,168,67,.4);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:.16s ease;top:0;left:0;';

  document.body.append(cur, cur2);

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
  });
  (function loop() {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    cur2.style.left = rx + 'px'; cur2.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();
}
