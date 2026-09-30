/* ==========================================================
   MENDOZA-PH.COM — LANDING PAGE SCRIPT
   ----------------------------------------------------------
   Sections:
     1. CONFIG            ← the numbers you will most likely tweak
     2. Family photo clicks (Michael / children / Andrea)
     3. Helpers
     4. Scene setup (cards, toys, water bowl)
     5. The cat: drawing, walking, jumping, poses
     6. The cat's behaviours (its "daily life")
     7. The cat's reactions (clicks on cat, children, toys)
     8. The screen-scratch effect
     9. Start everything

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

  cat: {
    widthFront: 118,   // cat width (picture px) at the very front of the floor. Bigger = bigger cat.
    backScale: 0.72,   // the cat is this much smaller at the back of the room (perspective)
    walkSpeed: 75,     // picture px per second
    runSpeed: 210,     // when chasing a toy
    start: { x: 720, y: 950 },  // where the cat is when the page opens
  },

  // Perspective: the floor goes from y=800 (back wall) to y=1000 (front edge)
  floorBackY: 800,
  floorFrontY: 1000,

  // Where the cat may wander randomly (the rug and front floor)
  wanderArea: { minX: 340, maxX: 1140, minY: 885, maxY: 990 },

  // Where toys may roll to (they can't leave this box)
  toyArea: { minX: 330, maxX: 1180, minY: 866, maxY: 1000 },

  // Pause between behaviours, in milliseconds [shortest, longest]
  pauseBetween: [1200, 4500],

  // How often each behaviour is picked. Bigger number = more often. 0 = never.
  behaviourWeights: {
    sitAndLookAround: 6,
    stareAtVisitor: 5,
    lieDown: 3,
    nap: 2,
    napInBed: 2,
    napSomewhereOdd: 1,
    stretch: 2,
    groom: 3,
    wander: 7,
    crossForeground: 2,
    visitFamily: 3,
    peekBehindPhoto: 2,
    playWithToy: 5,
    drink: 2,
    scratchTower: 2,
    jumpOnPlatform: 2,
    getDistracted: 2,
  },

  // The four photo cards, measured from the picture.
  //   left/right/top/bottom = the white-bordered card
  //   headTop = where the person's head starts (above the card) — also clickable
  cards: {
    michael: { left: 247,  right: 466,  top: 326, bottom: 857, headTop: 212 },
    child1:  { left: 521,  right: 741,  top: 326, bottom: 857, headTop: 226 },
    child2:  { left: 795,  right: 1014, top: 326, bottom: 857, headTop: 256 },
    andrea:  { left: 1069, right: 1288, top: 326, bottom: 857, headTop: 232 },
  },
  cardRadius: 34,  // roundness of the card corners (picture px)

  // The spaces between the photos. The cat walks through these to get
  // behind the photos (so it doesn't walk "through" them).
  gaps: [493, 768, 1041],

  // Floor toys — cut out of the original picture at these exact spots.
  // x/y = centre of the toy; w/h = size.  kind: 'ball' rolls, 'mouse' slides.
  toys: [
    { id: 'ball-green',  src: 'images/toy-ball-green.png',  x: 797.5, y: 890.5, w: 31, h: 31, kind: 'ball' },
    { id: 'ball-purple', src: 'images/toy-ball-purple.png', x: 845.5, y: 897.5, w: 31, h: 31, kind: 'ball' },
    { id: 'wand',        src: 'images/toy-wand.png',        x: 838,   y: 878.5, w: 66, h: 35, kind: 'stick' },
    { id: 'mouse-left',  src: 'images/toy-mouse-left.png',  x: 510.5, y: 862.5, w: 81, h: 35, kind: 'mouse' },
    { id: 'mouse-right', src: 'images/toy-mouse-right.png', x: 1020,  y: 880.5, w: 70, h: 33, kind: 'mouse' },
  ],

  // The water bowl: x = centre, y = where it touches the floor
  waterBowl: { x: 585, y: 962, width: 72 },

  // Special places in the room.
  //   depthY = the floor level used for size/"who is in front" when the
  //            cat is up on something (defaults to y).
  spots: {
    bedLeft:     { x: 272,  y: 905 },
    bedRight:    { x: 1300, y: 905 },
    platform:    { x: 1398, y: 772, depthY: 850 },   // low wooden step on the right wall
    platformFrom:{ x: 1290, y: 910 },                // where the cat jumps up from
    towerBase:   { x: 768,  y: 848 },                // cat tower, between the children
    foreground:  { y: 998, minX: 180, maxX: 1400 },  // strip along the front edge
  },

  // Clicking the cat
  clicks: {
    resetAfter: 7000,  // ms without clicks before the cat forgets being annoyed
    scratchAt: 5,      // click number that makes the cat scratch the screen
  },

  // Little random life signs (ms): [shortest, longest] between each
  blinkEvery: [2500, 7000],
  tailFlickEvery: [6000, 15000],
};

// Things the cat "says" (small bubble). Edit freely!
const LINES = {
  judge:    ['…', 'hmm.', '…really?', '*judging you*', '…'],
  notice:   ['?', '!', 'mrrp?'],
  annoyed:  ['…', 'hmph.', 'excuse me?'],
  angry:    ['hss!', 'HSS!'],
  scratch:  ['THAT\'S IT.'],
  child:    ['?', 'mrrp?', '*sniff sniff*', 'oh. you.'],
  distract: ['!', '!?', '…what was that?'],
  play:     ['!', 'gotcha.'],
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

// CHILDREN — no profiles, no links, no data. Clicking only makes the cat react.
function onChildClick(cardName, event) {
  pulseCard(cardName);
  catReactToChild(cardName);
}


/* ==========================================================
   3. HELPERS
   ========================================================== */
const scene      = document.getElementById('scene');
const stage      = document.querySelector('.stage');
const catEl      = document.getElementById('cat');
const bubbleEl   = document.getElementById('catBubble');
const bowlEl     = document.getElementById('waterBowl');

const W = CONFIG.sceneWidth;
const H = CONFIG.sceneHeight;

const pctX = (x) => (x / W * 100) + '%';
const pctY = (y) => (y / H * 100) + '%';
const rand = (min, max) => min + Math.random() * (max - min);
const randInt = (min, max) => Math.floor(rand(min, max + 1));
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const chance = (p) => Math.random() < p;

// Pick a key from { name: weight } according to the weights
function weightedPick(weights) {
  const entries = Object.entries(weights).filter(([, w]) => w > 0);
  let total = entries.reduce((sum, [, w]) => sum + w, 0);
  let r = Math.random() * total;
  for (const [name, w] of entries) {
    if ((r -= w) <= 0) return name;
  }
  return entries[0][0];
}

// Convert a mouse/touch position on screen into picture coordinates
function toScene(clientX, clientY) {
  const r = scene.getBoundingClientRect();
  return { x: (clientX - r.left) / r.width * W, y: (clientY - r.top) / r.height * H };
}

/* --- Interruptible waiting ---------------------------------
   The cat's behaviours are written as simple step-by-step
   "async" functions (walk here, wait, sit, ...).
   When something happens (a click!), interruptCat() stops the
   current behaviour immediately so the cat can react.        */
class Interrupted extends Error {}
const pendingSteps = new Set();

function wait(ms) {
  return new Promise((resolve, reject) => {
    const step = {
      cancel: () => { clearTimeout(timer); reject(new Interrupted()); },
    };
    const timer = setTimeout(() => { pendingSteps.delete(step); resolve(); }, ms);
    pendingSteps.add(step);
  });
}

function interruptCat() {
  for (const step of pendingSteps) step.cancel();
  pendingSteps.clear();
}

// Smooth animation of a number over time (used for toys and jumps)
function animate(duration, onFrame, { interruptible = true } = {}) {
  return new Promise((resolve, reject) => {
    const start = performance.now();
    let frame;
    const step = { cancel: () => { cancelAnimationFrame(frame); reject(new Interrupted()); } };
    if (interruptible) pendingSteps.add(step);
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      onFrame(t);
      if (t < 1) frame = requestAnimationFrame(tick);
      else { pendingSteps.delete(step); resolve(); }
    };
    frame = requestAnimationFrame(tick);
  });
}
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;


/* ==========================================================
   4. SCENE SETUP
   ========================================================== */

// --- Family photo cards -------------------------------------
const cardRings = {};
const cardFaces = {};

function setupCards() {
  for (const [name, c] of Object.entries(CONFIG.cards)) {
    // (a) the invisible button: covers the card AND the head above it
    const btn = document.querySelector(`.hotspot[data-card="${name}"]`);
    btn.style.left   = pctX(c.left);
    btn.style.width  = pctX(c.right - c.left);
    btn.style.top    = pctY(c.headTop);
    btn.style.height = pctY(c.bottom - c.headTop);

    // (b) a copy of the card drawn in front of the cat (so it can hide behind)
    const face = document.createElement('div');
    face.className = 'card-face';
    const r = CONFIG.cardRadius;
    face.style.clipPath =
      `inset(${pctY(c.top)} ${pctX(W - c.right)} ${pctY(H - c.bottom)} ${pctX(c.left)} ` +
      `round ${pctX(r)} / ${pctY(r)})`;
    scene.appendChild(face);
    cardFaces[name] = face;

    // (c) the glow shown on hover
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

// --- Toys ----------------------------------------------------
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

    // Visitors can flick a toy too — the cat may chase it
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const p = toScene(e.clientX, e.clientY);
      const dx = toy.x - p.x || rand(-1, 1);
      const dir = Math.sign(dx) || 1;
      rollToy(toy, dir * rand(35, 80), rand(-18, 18));
      catNoticeToy(toy);
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
  // Toys move on their own timeline — not stopped by cat interruptions
  return animate(350 + dist * 11, (t) => {
    const e = easeOut(t);
    toy.x = fromX + (toX - fromX) * e;
    toy.y = fromY + (toY - fromY) * e;
    toy.rot = fromRot + spin * e;
    placeToy(toy);
  }, { interruptible: false });
}

function wobbleToy(toy) {
  toy.el.classList.remove('wobble');
  void toy.el.offsetWidth;
  toy.el.classList.add('wobble');
}

// --- Water bowl ----------------------------------------------
function setupBowl() {
  const b = CONFIG.waterBowl;
  bowlEl.style.left   = pctX(b.x);
  bowlEl.style.top    = pctY(b.y);
  bowlEl.style.width  = pctX(b.width * depthScale(b.y));
  bowlEl.style.zIndex = Math.round(b.y);
}


/* ==========================================================
   5. THE CAT — drawing, walking, jumping, poses
   ========================================================== */
const cat = {
  x: CONFIG.cat.start.x,
  y: CONFIG.cat.start.y,
  depthY: null,        // floor level when up on something (null = on the floor)
  face: 1,             // 1 = facing right, -1 = facing left
  pose: 'sitting',
  busyReacting: false,
  clicks: 0,
  clickTimer: null,
};

const POSES = ['sitting', 'walking', 'running', 'lying', 'sleeping', 'stretching',
               'grooming', 'drinking', 'sniffing', 'crouching', 'scratching', 'alert', 'angry'];

// How big things are at a given floor level (perspective)
function depthScale(y) {
  const t = clamp((y - CONFIG.floorBackY) / (CONFIG.floorFrontY - CONFIG.floorBackY), 0, 1);
  return CONFIG.cat.backScale + (1 - CONFIG.cat.backScale) * t;
}

function catWidth() {
  return CONFIG.cat.widthFront * depthScale(cat.depthY ?? cat.y);
}

// Put the cat element where the cat "is"
function renderCat() {
  const depth = cat.depthY ?? cat.y;
  catEl.style.left   = pctX(cat.x);
  catEl.style.top    = pctY(cat.y);
  catEl.style.width  = pctX(catWidth());
  // Whoever is lower on the floor is drawn in front. The photo cards sit at
  // y = 857, so a cat further back than that is drawn BEHIND the photos.
  catEl.style.zIndex = Math.round(depth) + 2;
  catEl.style.setProperty('--face', cat.face);
}

function setPose(pose) {
  cat.pose = pose;
  catEl.classList.remove(...POSES);
  catEl.classList.add(pose);
  bowlEl.classList.toggle('lapping', pose === 'drinking');
}

// Briefly add a CSS class (blink, hop, tail-flick, ...)
function flash(cls, ms) {
  catEl.classList.remove(cls);
  void catEl.offsetWidth;
  catEl.classList.add(cls);
  clearTimeout(flash[cls]);
  flash[cls] = setTimeout(() => catEl.classList.remove(cls), ms);
}

// Tilt the head toward a point (or reset with lookAt(null))
function lookAt(target) {
  if (!target) {
    catEl.style.setProperty('--look-rot', '0deg');
    catEl.style.setProperty('--look-y', '0%');
    return;
  }
  const dx = target.x - cat.x;
  const dy = target.y - (cat.y - 40);
  if (Math.abs(dx) > 50) { cat.face = Math.sign(dx); renderCat(); }
  // The photo faces forward, so we can't turn the head sideways —
  // instead it tilts up/down a little toward what it's looking at.
  // (Negative = chin up. The head is inside the flipped layer, so this
  // works the same whichever way the cat is facing.)
  const tilt = clamp(dy / 40, -6, 6);
  catEl.style.setProperty('--look-rot', tilt + 'deg');
  catEl.style.setProperty('--look-y', '0%');
}
function lookAtViewer(quizzical = false) {
  catEl.style.setProperty('--look-rot', quizzical ? (chance(.5) ? 6 : -6) + 'deg' : '0deg');
  catEl.style.setProperty('--look-y', '0%');
}

// Speech bubble
let bubbleTimer;
function say(text, ms = 1800) {
  bubbleEl.textContent = text;
  bubbleEl.classList.add('show');
  clearTimeout(bubbleTimer);
  bubbleTimer = setTimeout(() => bubbleEl.classList.remove('show'), ms);
}

// Walk in a straight line to (x, y)
function walkStraight(x, y, speed) {
  const fromX = cat.x, fromY = cat.y;
  const dist = Math.hypot(x - fromX, y - fromY);
  if (dist < 2) return Promise.resolve();
  if (Math.abs(x - fromX) > 4) cat.face = Math.sign(x - fromX);
  setPose(speed > CONFIG.cat.walkSpeed * 1.5 ? 'running' : 'walking');
  // Walking "into" the room is slower on screen (perspective)
  const duration = dist / (speed * depthScale((fromY + y) / 2)) * 1000;
  return animate(duration, (t) => {
    cat.x = fromX + (x - fromX) * t;
    cat.y = fromY + (y - fromY) * t;
    renderCat();
  });
}

// Walk anywhere — goes through a gap between photos if it needs to
// get behind (or come out from behind) the photo cards.
const CARD_LINE = 857;
async function walkTo(x, y, speed = CONFIG.cat.walkSpeed) {
  lookAt(null);
  if (cat.depthY != null) await jumpDown();
  const behindNow = cat.y < CARD_LINE, behindThen = y < CARD_LINE;
  if (behindNow !== behindThen) {
    // choose the gap closest to where we are (or are going)
    const refX = behindNow ? cat.x : x;
    const gap = CONFIG.gaps.reduce((a, b) => Math.abs(b - refX) < Math.abs(a - refX) ? b : a);
    if (behindNow) {
      await walkStraight(gap, 846, speed);
      await walkStraight(gap, 870, speed);
    } else {
      await walkStraight(gap, 870, speed);
      await walkStraight(gap, 846, speed);
    }
  }
  await walkStraight(x, y, speed);
  setPose('sitting');
}

// Jump in an arc to (x, y). depthY = floor level at the landing spot.
async function jumpTo(x, y, depthY = null, height = 60) {
  lookAt(null);
  if (Math.abs(x - cat.x) > 4) { cat.face = Math.sign(x - cat.x); renderCat(); }
  setPose('crouching');
  await wait(rand(350, 700));
  setPose('alert');
  const fromX = cat.x, fromY = cat.y, fromDepth = cat.depthY ?? cat.y;
  const toDepth = depthY ?? y;
  await animate(480, (t) => {
    const e = easeInOut(t);
    cat.x = fromX + (x - fromX) * e;
    cat.y = fromY + (y - fromY) * e - Math.sin(Math.PI * t) * height;
    cat.depthY = fromDepth + (toDepth - fromDepth) * e;
    renderCat();
  });
  cat.depthY = depthY;
  renderCat();
  setPose('crouching');
  await wait(180);
  setPose('sitting');
}

// Hop down if we are up on a platform/bed
async function jumpDown() {
  const x = clamp(cat.x - 80, 360, 1300);
  await jumpTo(x, 915, null, 40);
}

function randomFloorPoint() {
  const a = CONFIG.wanderArea;
  return { x: rand(a.minX, a.maxX), y: rand(a.minY, a.maxY) };
}


/* ==========================================================
   6. THE CAT'S BEHAVIOURS
   ----------------------------------------------------------
   Each behaviour is a little script. The cat picks one at random
   (see CONFIG.behaviourWeights), performs it, pauses, and picks
   the next one. Add your own by copying one of these!
   ========================================================== */
const behaviours = {

  async sitAndLookAround() {
    setPose('sitting');
    for (let i = 0; i < randInt(2, 4); i++) {
      lookAt({ x: cat.x + rand(-400, 400), y: rand(300, 1000) });
      await wait(rand(900, 2000));
    }
    lookAt(null);
    await wait(rand(1000, 2500));
  },

  // The signature move: staring straight at the visitor, judging.
  async stareAtVisitor() {
    setPose('sitting');
    lookAtViewer(chance(.3));
    await wait(rand(600, 1200));
    catEl.classList.add('squint');
    if (chance(.45)) say(pick(LINES.judge), 2200);
    await wait(rand(2500, 4500));
    catEl.classList.remove('squint');
    await wait(rand(500, 1500));
    lookAt(null);
  },

  async lieDown() {
    setPose('lying');
    await wait(rand(4000, 9000));
    if (chance(.4)) { lookAtViewer(); await wait(1500); }
    setPose('sitting');
  },

  async nap() {
    setPose('lying');
    await wait(rand(1500, 3000));
    setPose('sleeping');
    await wait(rand(9000, 18000));
    await wakeUp();
  },

  async napInBed() {
    const bed = pick([CONFIG.spots.bedLeft, CONFIG.spots.bedRight]);
    const nearX = bed.x < W / 2 ? 400 : 1160;           // walk to the bed's edge
    await walkTo(nearX, 915);
    await jumpTo(bed.x, bed.y, null, 30);
    await wait(800);
    await behaviours.nap();
  },

  // Sleeping somewhere unexpected: in the middle of the front floor,
  // right next to the water bowl, or on the wooden step.
  async napSomewhereOdd() {
    const options = [
      () => walkTo(rand(600, 950), 996),
      () => walkTo(CONFIG.waterBowl.x - 55, CONFIG.waterBowl.y - 4),
      () => behaviours.getOnPlatform(),
      () => walkTo(CONFIG.gaps[1] + 6, 846),
    ];
    await pick(options)();
    await behaviours.nap();
  },

  async stretch() {
    setPose('stretching');
    await wait(2300);
    setPose('sitting');
    if (chance(.5)) { flash('blink', 250); }
  },

  async groom() {
    setPose('grooming');
    await wait(rand(2500, 5000));
    setPose('sitting');
    await wait(400);
    if (chance(.4)) { lookAtViewer(); await wait(1500); } // "what? I'm busy."
  },

  async wander() {
    const p = randomFloorPoint();
    await walkTo(p.x, p.y);
    if (chance(.5)) await behaviours.sitAndLookAround();
  },

  async crossForeground() {
    const f = CONFIG.spots.foreground;
    const fromLeft = cat.x < W / 2;
    await walkTo(fromLeft ? f.minX + 60 : f.maxX - 60, f.y);
    await walkTo(fromLeft ? f.maxX - rand(0, 200) : f.minX + rand(0, 200), f.y);
    if (chance(.5)) { lookAtViewer(); await wait(1500); }
  },

  // Go and sit in front of one of the family photos
  async visitFamily() {
    const name = pick(Object.keys(CONFIG.cards));
    const c = CONFIG.cards[name];
    const x = (c.left + c.right) / 2 + rand(-50, 50);
    await walkTo(x, rand(872, 895));
    lookAt({ x: (c.left + c.right) / 2, y: 500 });      // look up at the photo
    await wait(rand(1500, 3000));
    if (chance(.6)) { lookAtViewer(); await wait(rand(1200, 2500)); }
    if (chance(.4)) await behaviours.lieDown();
  },

  // Half-hidden behind one of the photos, peeking out
  async peekBehindPhoto() {
    const i = randInt(0, CONFIG.gaps.length - 1);
    const side = chance(.5) ? 1 : -1;
    await walkTo(CONFIG.gaps[i], 846);
    await walkStraight(CONFIG.gaps[i] + side * 16, 846, CONFIG.cat.walkSpeed);
    cat.face = -side;                                   // face peeks out of the gap
    renderCat();
    setPose('sitting');
    lookAtViewer();
    await wait(rand(3000, 6000));
    if (chance(.5)) { catEl.classList.add('squint'); await wait(1500); catEl.classList.remove('squint'); }
    await walkTo(CONFIG.gaps[i], 880);
  },

  // Walk to a toy, stare, wiggle, bat it, maybe chase it
  async playWithToy(toy = pick(toys)) {
    const side = toy.x > cat.x ? -1 : 1;                // approach from our side
    await walkTo(toy.x + side * catWidth() * 0.55, clamp(toy.y + 4, 870, 1000));
    cat.face = -side; renderCat();
    lookAt(toy);
    await wait(rand(700, 1500));                        // stares at it…
    if (chance(.25)) { wobbleToy(toy); flash('swiping', 450); await wait(1200); setPose('sitting'); return; } // just a tap

    const rounds = randInt(1, 3);
    for (let i = 0; i < rounds; i++) {
      setPose('crouching');                             // …wiggles…
      await wait(rand(500, 1200));
      setPose('sitting');
      flash('swiping', 450);                            // …BAT!
      await wait(120);
      const push = cat.face * rand(25, 70);
      rollToy(toy, push, rand(-12, 12));
      if (i === 0 && chance(.4)) say(pick(LINES.play), 1200);
      await wait(rand(400, 900));
      if (i < rounds - 1) {                             // follow it
        await walkTo(toy.x - cat.face * catWidth() * 0.55, clamp(toy.y + 4, 870, 1000), chance(.4) ? CONFIG.cat.runSpeed : CONFIG.cat.walkSpeed);
        lookAt(toy);
      }
    }
    // pause after playing, very pleased with itself
    await wait(rand(800, 1600));
    lookAtViewer();
    await wait(rand(1000, 2000));
    if (chance(.4)) await behaviours.groom();
  },

  async drink() {
    const b = CONFIG.waterBowl;
    const side = cat.x < b.x ? -1 : 1;
    await walkTo(b.x + side * catWidth() * 0.42, b.y - 5);
    cat.face = -side; renderCat();                     // face the bowl
    setPose('drinking');
    await wait(rand(3000, 6000));
    setPose('sitting');
    await wait(rand(800, 1500));
    if (chance(.5)) { setPose('grooming'); await wait(1500); setPose('sitting'); } // lick lips
    await wait(rand(1000, 3000));                      // sit beside the bowl
  },

  async scratchTower() {
    const s = CONFIG.spots.towerBase;
    await walkTo(s.x, s.y);
    await wait(500);
    setPose('scratching');
    await wait(rand(2000, 3500));
    setPose('sitting');
    await wait(600);
    lookAtViewer();                                     // "yes, that's allowed."
    await wait(1500);
  },

  async getOnPlatform() {
    const from = CONFIG.spots.platformFrom, p = CONFIG.spots.platform;
    await walkTo(from.x, from.y);
    lookAt(p);
    await wait(rand(600, 1400));
    await jumpTo(p.x, p.y, p.depthY, 55);
  },

  async jumpOnPlatform() {
    await behaviours.getOnPlatform();
    await behaviours.sitAndLookAround();
    if (chance(.5)) await behaviours.stareAtVisitor();
    await wait(rand(2000, 5000));
    // hop back down happens automatically on the next walk
  },

  async getDistracted() {
    setPose('alert');
    const spot = { x: rand(0, W), y: rand(100, 700) };  // "something" — nobody else sees it
    lookAt(spot);
    flash('twitch', 500);
    if (chance(.5)) say(pick(LINES.distract), 1500);
    await wait(rand(1500, 3000));
    if (chance(.4)) {
      const p = randomFloorPoint();
      await walkTo(p.x, p.y, CONFIG.cat.runSpeed * 0.7);
      lookAt(spot);
      await wait(1500);
    }
    setPose('sitting');
    lookAt(null);
  },
};

async function wakeUp() {
  setPose('lying');
  await wait(800);
  flash('blink', 300);
  setPose('stretching');
  await wait(2300);
  setPose('sitting');
}

/* --- The life loop -----------------------------------------
   runActivity() stops whatever the cat is doing, runs the new
   activity, and then goes back to random behaviours.          */
let activityId = 0;

// Clear leftover moods (squinting, ears back…) from an interrupted activity
function resetMoods() {
  catEl.classList.remove('squint', 'ears-back', 'tail-lash', 'swiping');
  lookAt(null);
}

async function runActivity(activity) {
  interruptCat();
  resetMoods();
  const myId = ++activityId;
  try {
    await activity();
    await wait(rand(...CONFIG.pauseBetween));
  } catch (err) {
    if (!(err instanceof Interrupted)) console.error(err);
    return;                               // something else took over
  }
  if (myId === activityId) nextBehaviour();
}

function nextBehaviour() {
  const name = weightedPick(CONFIG.behaviourWeights);
  runActivity(behaviours[name]);
}

// Blinking and tail flicks happen on their own timers
function startLifeSigns() {
  (function blink() {
    if (!['sleeping'].includes(cat.pose)) flash('blink', 160);
    setTimeout(blink, rand(...CONFIG.blinkEvery));
  })();
  (function tail() {
    if (cat.pose !== 'sleeping') flash('tail-flick', 900);
    setTimeout(tail, rand(...CONFIG.tailFlickEvery));
  })();
}


/* ==========================================================
   7. THE CAT'S REACTIONS
   ========================================================== */

// --- Clicking the cat: gets more annoyed each time ----------
function onCatClick(event) {
  event.stopPropagation();
  const p = event.clientX != null && event.clientX !== 0
    ? toScene(event.clientX, event.clientY)
    : { x: cat.x, y: 1100 };             // keyboard: "the viewer"

  cat.clicks++;
  clearTimeout(cat.clickTimer);
  cat.clickTimer = setTimeout(() => { cat.clicks = 0; }, CONFIG.clicks.resetAfter);

  const n = cat.clicks;
  if (n >= CONFIG.clicks.scratchAt) {
    cat.clicks = 0;
    runActivity(reactScratch);
    return;
  }
  const reactions = [null, reactNotice, reactAnnoyed, reactEarsBack, reactSwat];
  runActivity(() => reactions[Math.min(n, reactions.length - 1)](p));
}

// 1st click: notices you
async function reactNotice(p) {
  const wasSleeping = cat.pose === 'sleeping' || cat.pose === 'lying';
  setPose('alert');
  flash('hop', 400);
  lookAt({ x: p.x, y: p.y });
  say(wasSleeping ? '…?' : pick(LINES.notice), 1500);
  await wait(1800);
  setPose('sitting');
  lookAtViewer(true);
  await wait(1500);
}

// 2nd click: annoyed stare
async function reactAnnoyed(p) {
  setPose('sitting');
  lookAtViewer();
  catEl.classList.add('squint');
  flash('tail-flick', 900);
  say(pick(LINES.annoyed), 1800);
  await wait(2200);
  catEl.classList.remove('squint');
}

// 3rd click: ears back, tail lashing
async function reactEarsBack(p) {
  setPose('sitting');
  lookAtViewer();
  catEl.classList.add('squint', 'ears-back', 'tail-lash');
  say('hmph.', 1800);
  await wait(2500).finally(() => catEl.classList.remove('squint', 'ears-back', 'tail-lash'));
}

// 4th click: swats at you
async function reactSwat(p) {
  lookAt({ x: p.x, y: p.y });
  setPose('angry');
  say(pick(LINES.angry), 1400);
  await wait(250);
  flash('swiping', 450);
  await wait(500);
  flash('swiping', 450);
  await wait(1400);
  setPose('sitting');
}

// 5th click: THE SCREEN SCRATCH
async function reactScratch() {
  cat.busyReacting = true;
  try {
    lookAtViewer();
    setPose('angry');
    say(LINES.scratch[0], 1400);
    await wait(900);
    flash('swiping', 450);
    scratchScreen();
    await wait(2600);
    // …and then acts like nothing happened
    setPose('grooming');
    await wait(2500);
    setPose('sitting');
    lookAtViewer();
    await wait(1500);
  } finally {
    cat.busyReacting = false;
  }
}

// --- Clicking a child's photo: the cat goes to investigate ----
function catReactToChild(cardName) {
  const c = CONFIG.cards[cardName];
  const centre = { x: (c.left + c.right) / 2, y: 600 };

  // A sleeping cat might just twitch an ear and carry on sleeping
  if (cat.pose === 'sleeping' && chance(.45)) { flash('twitch', 500); return; }
  if (cat.busyReacting) return;

  const variant = pick(['glance', 'investigate', 'investigate', 'sitBeside']);
  runActivity(async () => {
    if (cat.pose === 'sleeping' || cat.pose === 'lying') { await wakeUp(); }

    if (variant === 'glance') {                      // just looks over
      setPose('alert');
      lookAt(centre);
      flash('twitch', 500);
      say(pick(LINES.child), 1500);
      await wait(rand(1500, 2500));
      setPose('sitting');
      return;
    }

    lookAt(centre);
    await wait(500);
    const x = centre.x + rand(-45, 45);
    await walkTo(x, rand(870, 885), chance(.3) ? CONFIG.cat.runSpeed * .7 : CONFIG.cat.walkSpeed);
    lookAt(centre);                                   // looks up at the photo

    if (variant === 'investigate') {
      setPose('sniffing');
      say(pick(LINES.child), 1600);
      await wait(1300);
      setPose('sitting');
      lookAt(centre);
      await wait(rand(1200, 2200));
      lookAtViewer(true);                             // "is this yours?"
      await wait(1200);
    } else {                                          // sits beside, pleased
      setPose('sitting');
      await wait(1200);
      lookAtViewer();
      flash('blink', 400);                            // slow blink = cat love
      await wait(rand(2000, 3500));
    }
  });
}

// --- A visitor flicked a toy --------------------------------
function catNoticeToy(toy) {
  if (cat.busyReacting) return;
  if (cat.pose === 'sleeping' && chance(.7)) { flash('twitch', 500); return; }
  if (chance(.65)) {
    runActivity(async () => {
      if (cat.pose === 'sleeping' || cat.pose === 'lying') await wakeUp();
      setPose('alert');
      lookAt(toy);
      await wait(600);                                // wait for it to stop rolling
      await behaviours.playWithToy(toy);
    });
  } else {
    lookAt(toy);                                      // "…no."
  }
}


/* ==========================================================
   8. THE SCREEN-SCRATCH EFFECT
   ----------------------------------------------------------
   Draws 4 claw marks across the whole browser window with a big
   paw swiping through, shakes the page a little, then fades.
   Purely visual — nothing is actually damaged.
   ========================================================== */
function scratchScreen() {
  const layer = document.getElementById('scratchLayer');
  const vw = window.innerWidth, vh = window.innerHeight;
  const size = Math.min(vw, vh);

  // Marks go from upper-right to lower-left, like a right paw swipe
  const start = { x: vw * rand(.62, .78), y: vh * rand(.08, .2) };
  const end   = { x: vw * rand(.22, .38), y: vh * rand(.8, .92) };
  const len = Math.hypot(end.x - start.x, end.y - start.y);
  const nx = -(end.y - start.y) / len, ny = (end.x - start.x) / len;  // perpendicular
  const spacing = size * 0.055;

  let paths = '';
  for (let i = 0; i < 4; i++) {
    const off = (i - 1.5) * spacing;
    const s = { x: start.x + nx * off + rand(-8, 8), y: start.y + ny * off + (i === 0 || i === 3 ? spacing * .6 : 0) };
    const e = { x: end.x + nx * off + rand(-8, 8),   y: end.y + ny * off - (i === 0 || i === 3 ? spacing * .6 : 0) };
    const bend = rand(-.08, .08) * len;
    const c = { x: (s.x + e.x) / 2 + nx * bend, y: (s.y + e.y) / 2 + ny * bend };
    const d = `M${s.x},${s.y} Q${c.x},${c.y} ${e.x},${e.y}`;
    const L = len * 1.1;
    const delay = (i * 0.035).toFixed(3) + 's';
    const w = size * (i === 0 || i === 3 ? 0.009 : 0.013);
    paths +=
      `<path class="claw-mark edge"  d="${d}" style="--len:${L};--delay:${delay}" stroke-width="${w * 2.4}"/>` +
      `<path class="claw-mark core"  d="${d}" style="--len:${L};--delay:${delay}" stroke-width="${w}"/>` +
      `<path class="claw-mark glint" d="${d}" style="--len:${L};--delay:${delay}" stroke-width="${w * .3}" transform="translate(${-w},${-w * .4})"/>`;
  }

  // The giant paw (drawn with simple shapes: fur + pink toe beans)
  const paw = `
    <svg class="giant-paw" viewBox="0 0 100 100" style="left:0;top:0;
         --x0:${start.x - size * .17}px; --y0:${start.y - size * .25}px;
         --x1:${end.x - size * .17}px;   --y1:${end.y - size * .1}px">
      <defs><radialGradient id="pawFur" cx=".45" cy=".4" r=".7">
        <stop offset="0" stop-color="#8b8583"/><stop offset="1" stop-color="#4f4a48"/>
      </radialGradient></defs>
      <ellipse cx="50" cy="58" rx="40" ry="36" fill="url(#pawFur)"/>
      <ellipse cx="50" cy="66" rx="17" ry="13" fill="#d99aa0"/>
      <ellipse cx="26" cy="42" rx="8"  ry="10" fill="#d99aa0"/>
      <ellipse cx="42" cy="32" rx="8"  ry="10" fill="#d99aa0"/>
      <ellipse cx="59" cy="32" rx="8"  ry="10" fill="#d99aa0"/>
      <ellipse cx="75" cy="42" rx="8"  ry="10" fill="#d99aa0"/>
    </svg>`;

  layer.classList.remove('fade');
  layer.innerHTML = `<svg viewBox="0 0 ${vw} ${vh}" preserveAspectRatio="none">${paths}</svg>${paw}`;

  stage.classList.remove('shake');
  void stage.offsetWidth;
  stage.classList.add('shake');

  clearTimeout(scratchScreen.t1);
  clearTimeout(scratchScreen.t2);
  scratchScreen.t1 = setTimeout(() => layer.classList.add('fade'), 2200);
  scratchScreen.t2 = setTimeout(() => { layer.innerHTML = ''; layer.classList.remove('fade'); }, 3200);
}


/* ==========================================================
   9. START
   ========================================================== */
function start() {
  setupCards();
  setupToys();
  setupBowl();

  cat.face = -1;
  setPose('sitting');
  renderCat();

  catEl.addEventListener('click', onCatClick);
  catEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onCatClick(e); }
  });

  startLifeSigns();
  // First thing the cat does: stare at the new visitor.
  runActivity(behaviours.stareAtVisitor);
}

start();
