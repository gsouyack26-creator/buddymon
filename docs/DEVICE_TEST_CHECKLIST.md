# iPad walking-smoothness test checklist (v0.21.1)

Purpose: confirm the v0.20/v0.21 display-pipeline fix actually resolves the
walking "skip"/judder on a real ProMotion iPad. Everything up to this point
has only been verified in code review + a Node/canvas-stub harness, which
*cannot* reproduce a compositor-timing bug -- only a real device can.

## Before you start
1. Make sure the device is loading the latest version, not a stale cached
   PWA:
   - If already installed as an app: fully quit it (swipe up and away in
     the app switcher), then reopen. The service worker is network-first
     for `index.html`, so a normal reopen *should* pick up the new code,
     but a full quit/reopen removes any doubt.
   - If testing in Safari (not installed): hard-refresh, or open in a
     fresh private tab to bypass any HTTP cache.
   - To be certain you're on the right build: check that `sw.js` reports
     `bmon-v0.21.1` (view-source, or Safari dev tools if connected to a
     Mac) -- there's no on-screen version number today, so if in doubt,
     a full quit + reopen is the simplest way to be sure.

## What to test
Walk in **every direction** (up/down/left/right), at **both speeds**
(normal walk, and holding Shift/Run toggle), in these situations:

- [ ] Open field, plenty of room to move (e.g. Route outside town)
- [ ] Near a map edge (camera stops scrolling, player still visible moving
      across the locked view) -- this is where camera-clamp + interpolation
      interact and is a good stress case
- [ ] With a follower Buddymon active (extra sprite interpolating alongside
      you) -- more draw work per frame
- [ ] Rapidly tapping direction changes (up, then immediately left, etc.)
      -- checks the "moving" state machine doesn't stutter on direction
      switches mid-step
- [ ] Rotating the device mid-walk (portrait <-> landscape) -- checks the
      resize()/orientation-change path doesn't cause a visible hitch

## What "fixed" looks like
Motion should look like a constant, even glide between tiles -- like a
GBA-style RPG. No visible per-frame stutter, no "catch-up" pops, no
half-second freezes.

## What "still broken" looks like, and what to report
If it's still juddery, please note:
- Which of the above scenarios it happens in (all of them, or only some?)
- Whether it's a rhythmic stutter (same-ish interval each time) or random
- Whether toggling Settings -> Run on/off changes anything
- iPad model + iOS version if you have it handy (ProMotion refresh
  behavior differs across models)

That detail is enough for the next round of investigation to pick up
without needing to re-derive the same theories from scratch.
