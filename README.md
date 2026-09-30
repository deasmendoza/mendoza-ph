# mendoza-ph.com: family landing page

A plain HTML/CSS/JavaScript page with no frameworks and no build step.
To see it, **double-click `index.html`** and it opens in your browser.

```
index.html      the page structure
style.css       colours and sizes
script.js       photo clicks and floor toys (CONFIG at the top)
images/         all pictures (see below)
cat-animations/ the new cat animation library (not used by the page yet)
```

**Cat status:** the first cat system, which was built from a single photo,
has been removed. The page currently has no cat. The new cat will be
built from the realistic Google Flow clips catalogued in
[`cat-animations/README.md`](cat-animations/README.md) once integration
is requested.

---

## 1. Where the images go

Everything lives in the `images/` folder.

| File | What it is |
|---|---|
| `family-room.webp` | **Your original family / cat-room image (Image 1)**, kept unchanged as the master copy. |
| `cat-photo.jpg` | **Your original cat photo (Image 2)**, kept unchanged as the master copy. |
| `family-room-scene.webp` | The picture the page actually shows. It is Image 1 with the five floor toys lifted off (the rug texture was filled in where they were). The people, cards and room are untouched. |
| `toy-ball-green.png`, `toy-ball-purple.png`, `toy-wand.png`, `toy-mouse-left.png`, `toy-mouse-right.png` | The five floor toys, cut out of Image 1. The page puts them back in exactly the same spots, and a visitor can click one to make it roll a little. |

If you ever replace the room picture with a new version of the same
1536 × 1024 image, overwrite `family-room-scene.webp`. If the layout changes,
update the numbers in `CONFIG` in `script.js`.

---

## 2. What you can tweak (all in `script.js`, section 1 "CONFIG")

All positions are **pixels of the original 1536 × 1024 picture**. Open the
picture in any viewer that shows mouse coordinates and read them off.

| Want to change… | Edit |
|---|---|
| Toy positions / how far they roll | `CONFIG.toys`, `CONFIG.toyArea`, and `rollToy()` |
| Family photo click areas | `CONFIG.cards` |

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
shows anything about them. For now it only shows the same glow. A cat
reaction will be added there when the new cat is integrated.

---

## 4. Family photos

**The children's cards, Michael's card and Andrea's card are exactly as
they appear in your image.** No other family photos were created or
altered. Only the loose floor toys were lifted off so they can move.


---

## 5. Publishing

These are static files, so any simple host works (GitHub Pages, Netlify,
Cloudflare Pages, or regular web hosting). Upload `index.html`,
`style.css`, `script.js` and the `images/` folder together, keeping the
same folder structure, and point `mendoza-ph.com` at it.
