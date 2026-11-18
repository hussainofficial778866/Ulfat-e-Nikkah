# ULFAT-E-NIKAH (اُلفتِ نکاح) — Digital Nikah Invitation

A refined, responsive digital Nikah invitation website for **Eman Babar & Sheikh Saud Saeed**, designed with a pure white, soft sky-blue, and velvet red-rose botanical stationery aesthetic.

## Invitation Details

- **Bride:** Eman Babar
- **Groom:** Sheikh Saud Saeed
- **Date:** 23 December 2026
- **Nikah:** 8:00 PM
- **Dinner:** 9:00 PM
- **Venue:** LALA ZAAR MARRIAGE LAWN, Near Al-syad Center, Quaid-Abad
- **RSVP:** Mr. & Mrs. Babar Aziz — `0313-2042174`

## Project Structure

- `index.html` — Entry HTML document with OpenGraph / WhatsApp preview metadata
- `src/config/weddingConfig.ts` — Centralized wedding details, timings, map link, WhatsApp RSVP link, and poetic copy
- `src/components/OpeningCard.tsx` — Luxury invitation card cover with two joined hands centerpiece and cinematic opening reveal
- `src/components/JoinedHandsShowcase.tsx` — Subtle animated bride & groom joined-hands illustration (strictly two hands holding each other from opposite sides)
- `src/components/ScratchDateReveal.tsx` — Interactive Scratch Me foil reveal for the wedding date
- `src/components/MainInvitation.tsx` — Full invitation experience (hero reveal, poetry, scratch date reveal, countdown, schedule timeline, venue map, RSVP actions, and closing)
- `src/components/PetalCanvas.tsx` — Lightweight canvas rose-petal & soft light particle drift system
- `src/components/BotanicalOrnaments.tsx` — Watercolor rose and sky-blue stationery ornaments
- `src/utils/ambientAudio.ts` — Optional, user-initiated Web Audio gentle ambient chime melody

## Editing Wedding Details

All names, dates, timings, venue links, and RSVP contact details are centralized in `src/config/weddingConfig.ts`.

## Local Development & Build

```bash
npm install
npm run dev
npm run build
```

## GitHub Pages Publishing

The project uses relative asset paths (`base: './'` in `vite.config.ts`) and includes `.nojekyll` for clean static hosting. Build the static bundle with `npm run build` or configure GitHub Pages to publish your built `dist/` output on `main`.
