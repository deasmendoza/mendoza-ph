/* ==========================================================
   MENDOZA-PH.COM — LANDING PAGE SCRIPT
   ----------------------------------------------------------
   Sections:
     1. CONFIG            ← the numbers you will most likely tweak
     2. Family photo clicks (Michael / children / Andrea)
     3. Helpers
     4. Scene setup (photo cards, floor toys)
     5. Start everything

   The old cat animation system has been removed. The new cat will be
   built from the realistic video library in cat-animations/ once you
   ask for it to be integrated (see cat-animations/README.md).

   ALL POSITIONS ARE IN PIXELS OF THE ORIGINAL PICTURE (1536 x 1024).
   Open images/family-room.webp in any image viewer that shows the
   mouse position, and you can read off new coordinates directly.
   ========================================================== */
'use strict';


/* ==========================================================
   1. CONFIG
   ========================================================== */
const CONFIG = {
  sceneWidth: 1536,
  sceneHeight: 1024,

  // Where toys may roll to when clicked (they can't leave this box)
  toyArea: { minX: 330, maxX: 1180, minY: 866, maxY: 1000 },

  // The four photo cards, measured from the picture.
  //   left/right/top/bottom = the white-bordered card
  //   headTop = where the person's head starts (above the card) — also clickable
  cards: {
    michael: { left: 247,  right: 466,  top: 326, bottom: 857, headTop: 212 },
    child1:  { left: 521,  right: 741,  top: 326, bottom: 857, headTop: 226 },
    child2:  { left: 795,  right: 1014, top: 326, bottom: 857, headTop: 256 },
    andrea:  { left: 1069, right: 1288, top: 326, bottom: 857, headTop: 232 },
  },

  // Floor toys — cut out of the original picture at these exact spots.
  // x/y = centre of the toy; w/h = size.  kind: 'ball' rolls, 'mouse' slides.
  toys: [
    { id: 'ball-green',  src: 'images/toy-ball-green.png',  x: 797.5, y: 890.5, w: 31, h: 31, kind: 'ball' },
    { id: 'ball-purple', src: 'images/toy-ball-purple.png', x: 845.5, y: 897.5, w: 31, h: 31, kind: 'ball' },
    { id: 'wand',        src: 'images/toy-wand.png',        x: 838,   y: 878.5, w: 66, h: 35, kind: 'stick' },
    { id: 'mouse-left',  src: 'images/toy-mouse-left.png',  x: 510.5, y: 862.5, w: 81, h: 35, kind: 'mouse' },
    { id: 'mouse-right', src: 'images/toy-mouse-right.png', x: 1020,  y: 880.5, w: 70, h: 33, kind: 'mouse' },
  ],
};


/* ==========================================================
   2. FAMILY PHOTO CLICKS
   ----------------------------------------------------------
   Each photo has its own function below. This is where you
   will later put what should happen when someone clicks it.
   ========================================================== */

// MICHAEL CLICK BEHAVIOUR — TO BE DEFINED
function onMichaelClick(event) {
  // Nothing is decided yet. For now the photo only gives a small glow
  // so you can see the click works.
  // Later you might put something here like:
  //     window.location.href = 'https://...';
  pulseCard('michael');
}

// ANDREA CLICK BEHAVIOUR — TO BE DEFINED
function onAndreaClick(event) {
  // Nothing is decided yet. For now the photo only gives a small glow
  // so you can see the click works.
  // Later you might put something here like:
  //     window.location.href = 'https://...';
  pulseCard('andrea');
}

// CHILDREN — no profiles, no links, no data.
// CAT REACTION TO BE ADDED when the new cat animation library is integrated.
function onChildClick(cardName, event) {
  pulseCard(cardName);
}


/* ==========================================================
   3. HELPERS
   ========================================================== */
const scene = document.getElementById('scene');

const W = CONFIG.sceneWidth;
const H = CONFIG.sceneHeight;

const pctX = (x) => (x / W * 100) + '%';
const pctY = (y) => (y / H * 100) + '%';
const rand = (min, max) => min + Math.random() * (max - min);
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// Convert a mouse/touch position on screen into picture coordinates
function toScene(clientX, clientY) {
  const r = scene.getBoundingClientRect();
  return { x: (clientX - r.left) / r.width * W, y: (clientY - r.top) / r.height * H };
}

// Smooth animation of a number over time (used for rolling toys)
function animate(duration, onFrame) {
  return new Promise((resolve) => {
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      onFrame(t);
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });
}
const easeOut = (t) => 1 - Math.pow(1 - t, 3);


/* ==========================================================
   4. SCENE SETUP
   ========================================================== */

// --- Family photo cards -------------------------------------
const cardRings = {};

function setupCards() {
  for (const [name, c] of Object.entries(CONFIG.cards)) {
    // (a) the invisible button: covers the card AND the head above it
    const btn = document.querySelector(`.hotspot[data-card="${name}"]`);
    btn.style.left   = pctX(c.left);
    btn.style.width  = pctX(c.right - c.left);
    btn.style.top    = pctY(c.headTop);
    btn.style.height = pctY(c.bottom - c.headTop);

    // (b) the glow shown on hover
    const ring = document.createElement('div');
    ring.className = 'card-ring';
    ring.style.left   = pctX(c.left);
    ring.style.width  = pctX(c.right - c.left);
    ring.style.top    = pctY(c.top);
    ring.style.height = pctY(c.bottom - c.top);
    scene.appendChild(ring);
    cardRings[name] = ring;

    btn.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
    btn.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
    btn.addEventListener('focus',      () => ring.classList.add('is-hover'));
    btn.addEventListener('blur',       () => ring.classList.remove('is-hover'));
  }

  // Connect each photo to its click function (section 2)
  document.getElementById('michaelPhoto').addEventListener('click', onMichaelClick);
  document.getElementById('andreaPhoto').addEventListener('click', onAndreaClick);
  document.getElementById('child1Photo').addEventListener('click', (e) => onChildClick('child1', e));
  document.getElementById('child2Photo').addEventListener('click', (e) => onChildClick('child2', e));
}

function pulseCard(name) {
  const ring = cardRings[name];
  ring.classList.remove('pulse');
  void ring.offsetWidth;           // restart the animation
  ring.classList.add('pulse');
}

// --- Floor toys ----------------------------------------------
const toys = [];

function setupToys() {
  const holder = document.getElementById('toys');
  for (const t of CONFIG.toys) {
    const el = document.createElement('div');
    el.className = 'toy';
    el.innerHTML = `<img src="${t.src}" alt="" draggable="false">`;
    el.style.width  = pctX(t.w);
    el.style.height = pctY(t.h);
    holder.appendChild(el);
    const toy = { ...t, el, rot: 0 };
    placeToy(toy);
    toys.push(toy);

    // Visitors can flick a toy: it rolls a little away from the click
    el.addEventListener('click', (e) => {
      const p = toScene(e.clientX, e.clientY);
      const dir = Math.sign(toy.x - p.x) || 1;
      rollToy(toy, dir * rand(35, 80), rand(-18, 18));
    });
  }
}

function placeToy(toy) {
  toy.el.style.left = pctX(toy.x);
  toy.el.style.top  = pctY(toy.y);
  toy.el.style.setProperty('--rot', toy.rot + 'deg');
  toy.el.style.zIndex = Math.round(toy.y + toy.h / 2);  // lower on screen = in front
}

// Roll/slide a toy by (dx, dy) picture px — subtle, with friction
function rollToy(toy, dx, dy) {
  const a = CONFIG.toyArea;
  const fromX = toy.x, fromY = toy.y, fromRot = toy.rot;
  const toX = clamp(toy.x + dx, a.minX, a.maxX);
  const toY = clamp(toy.y + dy, a.minY, a.maxY);
  const dist = Math.hypot(toX - fromX, toY - fromY);
  let spin;
  if (toy.kind === 'ball')       spin = (dist / (toy.w / 2)) * 57.3 * Math.sign(toX - fromX || 1); // real rolling
  else if (toy.kind === 'mouse') spin = rand(-25, 25);
  else                           spin = rand(-12, 12);
  return animate(350 + dist * 11, (t) => {
    const e = easeOut(t);
    toy.x = fromX + (toX - fromX) * e;
    toy.y = fromY + (toY - fromY) * e;
    toy.rot = fromRot + spin * e;
    placeToy(toy);
  });
}


/* ==========================================================
   5. START
   ========================================================== */
setupCards();
setupToys();
