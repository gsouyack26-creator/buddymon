# Buddymon: JJ Quest

A Pokemon-style creature-catching adventure, built as a single-file offline HTML5 game for my nephew JJ.

**Play now:** https://gsouyack26-creator.github.io/buddymon/

## What is it

Explore a friendly world, catch and train Buddymon, battle wild creatures and rival trainers, evolve your team, and become the champion. Runs entirely in the browser, works offline (installable PWA), and saves your progress locally.

## Features

- 27 collectable Buddymon across 3 evolution families and multiple biomes
- Turn-based battles with type matchups, catching, items, and a rival storyline
- Explorable overworld: town, routes, Sunset Beach, and two gyms
- Fishing, a shop, a Buddy Box for storing your collection, and a Buddydex
- Day/night lighting, animated water, grass rustle, screen shake, and catch confetti
- Full save/load with autosave, settings toggles, run button, and sound
- Installable as an app (offline-first service worker + web manifest)

## Run locally

Just open `index.html` in any modern browser. No build step, no dependencies.

To serve it (recommended for PWA/service-worker testing):

```
npx serve .
```

## iOS (experimental)

The repo includes a [Capacitor](https://capacitorjs.com/) scaffold to wrap the game as a native iOS app.

```
npm install
npm run build:web   # copies the game into www/
npx cap add ios
npx cap sync ios
```

Then open `ios/App/App.xcworkspace` in Xcode. A GitHub Actions workflow (`.github/workflows/ios.yml`) performs an unsigned simulator build to verify the wrap compiles. Producing a real signed `.ipa` for a device requires macOS, Xcode, and an Apple Developer account.

## Project layout

```
index.html               single-file game (HTML + CSS + JS)
sw.js                    service worker (offline cache)
manifest.webmanifest     PWA manifest
icons/                   app icons
package.json             Capacitor / build config
capacitor.config.json    Capacitor app config
scripts/build-web.js     copies web assets into www/
.github/workflows/ios.yml   CI iOS build
```

## License

Personal project. Made with love for JJ.
