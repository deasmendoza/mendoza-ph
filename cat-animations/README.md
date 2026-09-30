# Cat animation library

Realistic cat animation clips generated in Google Flow for the
mendoza-ph.com landing page.

**The landing page does not use these clips yet.** They are stored and
labelled here until you ask for them to be integrated.

```
cat-animations/
  videos/      the clips, renamed by behaviour
  previews/    a 6-frame contact sheet of each clip (0 s → 10 s)
  library.json the same list in a form the page code can read later
```

All clips are MP4, 1280 × 720, 24 fps, 10 seconds long (240 frames),
with an audio track.

## Library

| # | Name | File | Behaviour | Intended use | Ready for integration? |
|---|---|---|---|---|---|
| 1 | **Cat_Walking** | `videos/cat-walking.mp4` | Walks slowly on four legs across a wooden floor, then turns toward the camera and stops. | Moving between spots in the room: wandering, crossing the foreground, going to a toy, bowl, bed or photo. | Catalogued. Needs background removal first. |
| 2 | **Cat_Sitting** | `videos/cat-sitting.mp4` | Walks, stops and sits down (about 5.5–8 s), then sits facing the viewer. | The walk-to-sit transition, the seated idle pose, and staring at the viewer. | Catalogued. Needs background removal first. |
| 3 | **Cat_Scratching** | `videos/cat-scratching.mp4` | Walks to a sisal post, stands up and scratches it (about 4–8.5 s), then sits beside it. | Scratching the cat tower or scratching post. | Catalogued. Needs background removal first. |
| 4 | **Cat_Playing** | `videos/cat-playing.mp4` | Paws a small yellow ball, follows it, crouches, rolls onto its side to bat it, then sits up facing the viewer. | Playing with a floor toy. | Catalogued. Needs background removal first. |

Second-by-second breakdowns are in `library.json`.

## What "ready for integration" means here

All four clips are usable, but none can be dropped into the room as-is:

1. **Each clip has its own background** (a living room with a grey sofa
   and a wooden floor). The cat needs to be cut out into a transparent
   video (for example WebM with transparency) or an image sequence
   before it can appear in our room.
2. **The camera moves** in every clip. For a cat walking inside a fixed
   room, a locked-off camera is easiest. Otherwise the cut-out has to be
   stabilised.
3. **Props come with some clips.** The scratching post and yellow ball
   would need to match something in our room, or stay in the cut-out.

If Google Flow can generate on a **plain green or white background with
a still camera**, clips like that would be ready to integrate almost
directly.

## Wishlist (not yet provided, so not implemented)

grooming · stretching · drinking water · sleeping · jumping onto the cat
bed/sofa · climbing the cat tower · hiding/peeking · staring at the
viewer · looking around · sitting near a family photo · playing with the
wand toy · reacting when clicked · annoyed reaction

## Adding a new clip

1. Put the file in `videos/`, named `cat-<behaviour>.mp4`.
2. Add a row to the table above and an entry to `library.json`.
3. Keep the page untouched until integration is requested.
