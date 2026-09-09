# Prism

**Connect through perspectives, not followers.**

Prism is a social platform prototype that reimagines online interaction around
*how people think*, not who follows them. Instead of an infinite feed, users
respond to a single thought-provoking question with their stance and their
reasoning — then explore a **Perspective Map**: other people's answers,
clustered by how closely their reasoning actually overlaps with the user's own.

🔗 **Live demo:** https://prism-alpha-lilac.vercel.app

## The problem with traditional social media

Most platforms connect people through followers, likes, and engagement —
optimizing for "what will keep you scrolling." Prism asks a different
question: **"What perspective could expand your thinking?"**

## How it works

1. **Answer a real question** — not a poll, a situation that requires reasoning
   (e.g. *"You're offered your dream career, but taking it means moving
   thousands of miles from everyone you love. Do you take it?"*)
2. **Say why** — pick up to 2 reasoning tags (Growth, Risk, Family, Freedom, etc.)
3. **See the Perspective Map** — other people's answers, grouped by stance and
   sorted by how many reasoning tags they share with you. This isn't a comment
   section with a different layout — the ordering is computed, not arbitrary.
4. **Explore a perspective** — read someone's full reasoning, then react with
   something meaningful: 🤝 I relate · 💡 Changed my thinking · ↔️ I see it differently
   (no likes, no follower counts)
5. **View your Perspective Trail** — a behavior-based record of the tags and
   viewpoints you've engaged with, replacing "followers/following" with an
   honest account of what you've actually explored

## Tech stack

- React + Vite
- Tailwind CSS v4
- Plain React state (no router, no external state library — the flow is
  linear by design)
- Local mock data, structured behind a `perspectiveService.js` seam so it can
  later be swapped for a real backend (Supabase) without touching the UI

## Design decisions worth knowing about

- **The map's positioning has real meaning.** Every mock perspective carries
  2–3 reasoning tags. When a user answers, their tags are compared against
  every seeded perspective, and each answer-group is sorted by shared-tag
  count — the people most aligned with you genuinely surface first.
- **No personality claims.** The Perspective Trail reports counts of behavior
  ("3 growth perspectives explored"), never inferred traits or percentages
  ("82% empathetic") — perspectives are self-reported, not diagnosed.
- **Accessible by construction, not by patch.** The map is built from real
  `<button>` elements in a CSS layout, not a freeform node-graph — so keyboard
  navigation and screen readers work without extra effort, and there's no
  reliance on visual-only positioning to access content.

## Running locally

```bash
git clone https://github.com/nikharendra/prism
cd prism
npm install
npm run dev
```

## Project structure

src/
├── components/ # Logo, shared UI pieces
├── pages/ # Landing, Explore, PerspectiveMap, PerspectiveDetail, PerspectiveTrail
├── data/ # questions.js, perspectives.js, reasoningTags.js (mock data)
├── services/ # perspectiveService.js — the data-access seam
└── App.jsx # screen routing via React state


## Roadmap 

This MVP intentionally excludes backend, auth, and real-time infrastructure.
The planned next step is swapping the mock data layer for Supabase so real
users can share perspectives with each other, followed by seeding it with an
initial group of real users to validate the core interaction before any
public launch.

## Built for

Frontend Odyssey Hackathon — "Reimagine Social" challenge.

## Built by 
Harendra Singh Yadav (Pondicherry University)