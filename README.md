# mendoza-ph.com: family landing page

A plain HTML/CSS/JavaScript page with no frameworks and no build step.
To see it, **double-click `index.html`** and it opens in your browser.

```
index.html   the page structure
style.css    colours, sizes and all the cat's pose animations
script.js    the cat's brain, the toys and the click behaviour (CONFIG at the top)
images/      all pictures (see below)
```

---

## 1. Where the images go

Everything lives in the `images/` folder.

| File | What it is |
|---|---|
| `family-room.webp` | **Your original family / cat-room image (Image 1)**, kept unchanged as the master copy. |
| `cat-photo.jpg` | **Your original cat photo (Image 2)**, kept unchanged as the master copy. |
| `family-room-scene.webp` | The picture the page actually shows. It is Image 1 with the five floor toys lifted off (the rug texture was filled in where they were). The people, cards and room are untouched. |
| `toy-ball-green.png`, `toy-ball-purple.png`, `toy-wand.png`, `toy-mouse-left.png`, `toy-mouse-right.png` | The five floor toys, cut out of Image 1. The page puts them back in exactly the same spots, and from there they can roll. |
| `cat-sprite.png` | Our cat, cut out of Image 2 with a transparent background. |

If you ever replace the room picture with a new version of the same
1536 × 1024 image, overwrite `family-room-scene.webp`. If the layout changes,
update the numbers in `CONFIG` in `script.js`.

---

## 2. What you can tweak (all in `script.js`, section 1 "CONFIG")

All positions are **pixels of the original 1536 × 1024 picture**. Open the
picture in any viewer that shows mouse coordinates and read them off.

| Want to change… | Edit |
|---|---|
| Cat size | `CONFIG.cat.widthFront` (width at the front of the room). `backScale` controls how much smaller it gets at the back. |
| Cat speed | `CONFIG.cat.walkSpeed`, `CONFIG.cat.runSpeed` |
| Where the cat starts | `CONFIG.cat.start` |
| Where it wanders | `CONFIG.wanderArea` |
| How often it does each thing | `CONFIG.behaviourWeights`. A higher number means more often, `0` means never. |
| Pause between activities | `CONFIG.pauseBetween` |
| Blink / tail-flick frequency | `CONFIG.blinkEvery`, `CONFIG.tailFlickEvery` |
| Clicks before the screen scratch | `CONFIG.clicks.scratchAt` |
| What the cat "says" | `LINES` (just below CONFIG) |
| Toy positions / how far they roll | `CONFIG.toys`, `CONFIG.toyArea`, and `rollToy()` |
| Water bowl position / size | `CONFIG.waterBowl` |
| Beds, wall step, cat tower spot | `CONFIG.spots` |
| Family photo click areas | `CONFIG.cards` |
| Cat colour / brightness | `filter:` on `.cat-pose` in `style.css` |
| Look of each pose | the "Poses" part of section 5 in `style.css` |

---

## 3. Michael's and Andrea's photos (for later)

In `script.js`, **section 2** has two clearly marked functions:

```js
// MICHAEL CLICK BEHAVIOUR — TO BE DEFINED
function onMichaelClick(event) { ... }

// ANDREA CLICK BEHAVIOUR — TO BE DEFINED
function onAndreaClick(event) { ... }
```

Right now a click on either photo only shows a short glow, so you can see
the click registers. Nothing else happens: no links, no profiles, no data.
Put the behaviour you want inside these functions later.

The two children's photos call `onChildClick()`. It **never** navigates or
shows anything about them. It only makes the cat react.

---

## 4. How the cat works

**The cat's "life".** In `script.js` section 6, each behaviour is a short
step-by-step script (walk here, wait, sit, look at the visitor…). The cat
picks one at random using `behaviourWeights`, does it, pauses, and picks
another. Current behaviours:

- sitting and looking around
- staring at the visitor (with a squint and an occasional "…really?")
- lying down, napping (eyes closed, "Zzz"), napping in a cat bed, napping somewhere odd (the middle of the floor, beside the water bowl, on the wooden wall step, behind the photos)
- stretching and grooming
- wandering, and walking across the foreground
- sitting in front of one of the family photos and looking up at it
- hiding behind the photos and peeking out between them
- playing with the toys: it stares, wiggles, bats the toy (which rolls a little and stops), sometimes follows it, then pauses looking pleased
- drinking from the water bowl (the water ripples)
- scratching the cat tower between the two children's photos
- jumping onto the low wooden step on the right wall
- getting distracted by "something" nobody else can see

It also blinks and flicks its tail now and then on its own timers.

**Depth.** The cat is smaller at the back of the room and bigger at the
front. Anything lower on the screen is drawn in front. The four photo
cards are also redrawn on top of the cat, so it can walk *behind* them
and peek out through the gaps.

**Clicking the cat** (it gets more annoyed each time; the count resets after 7 s of peace):

1. It notices you: a little hop, and it looks toward your cursor.
2. An annoyed stare and a tail flick.
3. It hunkers down, squints, lashes its tail: "hmph."
4. It swats at you twice: "hss!"
5. **It scratches your screen.** Four claw marks tear across the whole browser window, a big paw swipes through, and the page shakes. After about 3 seconds it all fades, and the cat grooms itself as if nothing happened. This is a purely visual overlay and never blocks or changes anything.

**Clicking a child's photo:** the cat reacts. Sometimes it just glances
over. Sometimes it walks over, sniffs and looks up at the photo, then
looks back at you. Sometimes it sits beside the photo and slow-blinks.
A sleeping cat may only twitch and keep sleeping. After any of these it
goes back to its normal routine.

**Clicking a toy:** the toy rolls a little, and the cat may come and play
with it (or pointedly ignore it).

---

## 5. Honest limitations, and the assets that would fix them

Everything the cat does is built from **one front-facing photo of the cat
lying down**. The page can move, squash, stretch, tilt and flip that photo,
but it cannot invent angles the photo doesn't show. So:

| Behaviour | What you see now | What would make it realistic |
|---|---|---|
| Walking / running | The lying-down photo glides with a bob, and small drawn legs shuffle underneath. | A **side-view walking video or photo sequence** (8–12 frames of the cat walking past the camera). |
| Looking around / turning head | The head can only tilt a little. It can't turn sideways, because we only have the front of the face. | Photos of the cat's head **in profile** and **three-quarter view**. |
| Tail | **The tail is drawn**, not from the photo, because the tail isn't visible in it. Its colour is matched to the fur. | A photo where the cat **tail is visible**, ideally a few with it in different positions. |
| Legs / paws (walking, batting toys, scratching) | Simple drawn fur-coloured shapes. | A photo of the cat **standing**, and one of the cat **reaching with a paw**. |
| Sleeping / blinking | Small fur-coloured "eyelids" are drawn over the eyes. | A photo of the cat **asleep or with eyes closed**. |
| Ears back | Not possible from this photo. The cat hunkers down and squints instead. | A photo with the cat **ears flattened** (the classic annoyed look). |
| Stretching, grooming, drinking | The whole photo stretches or tilts, and a paw shape appears for grooming. | Photos of the cat **stretching**, **licking a paw** and **drinking**. |
| Colour / lighting | The cat photo was taken in shade, so a warm brightening filter helps the cat match the sunny room (see `.cat-pose` in `style.css`). | A photo taken in **similar daylight**. |

Any of these can be added later. Send the photos and each pose can switch
to the real image. Best results come from photos shot against a plain
background, in daylight, with the whole body in frame.

**The children's cards, Michael's card and Andrea's card are exactly as
they appear in your image.** No other family photos were created or
altered. Only the loose floor toys were lifted off so they can move.

---

## 6. Publishing

These are static files, so any simple host works (GitHub Pages, Netlify,
Cloudflare Pages, or regular web hosting). Upload `index.html`,
`style.css`, `script.js` and the `images/` folder together, keeping the
same folder structure, and point `mendoza-ph.com` at it.
