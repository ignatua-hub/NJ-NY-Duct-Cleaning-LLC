# NJ&NY Duct Cleaning LLC — Marketing Website

Production-ready marketing site for **NJ&NY Duct Cleaning LLC**: air duct, dryer vent, chimney, and HVAC services across New Jersey. Built to drive phone calls and free quote requests.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react

## Run locally

```bash
npm install
npm run dev
```

Or on a custom port:

```bash
npm run dev -- -p 43123
```

Then open [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Logo

Place the official company logo at:

```text
public/images/logo.png
```

If `logo.png` is missing, the site shows a brand-matching SVG/text mark (dark background, electric-blue accents). Drop the real logo file at that path to replace the fallback.

## Before / after photos

Add job photos under `public/images/before-after/` using names like:

```text
job-1-before.jpg
job-1-after.jpg
…
job-6-after.jpg
```

Missing images show an “Add photo” placeholder. Register new jobs in `data/beforeAfter.ts`.

## Quote form API

`POST /api/quote` validates and currently logs submissions to the server console. Connect email/CRM later (see TODO in `app/api/quote/route.ts`).

## Replace before launch

- Phone number placeholders (`(000) 000-0000`)
- Email placeholders (`info@example.com`)
- Real customer reviews in `components/Testimonials.tsx`
- Real before/after job photos
- Official `public/images/logo.png`
