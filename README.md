# Monte Charge

Planning UI for vertical-lift / moving operations in Geneva, built for Batimove.

[Live](https://monte-charge1.vercel.app) · related frontend: [batimove-frontend](https://github.com/joshsegatt/batimove-frontend)

A React + Vite shell for the logistics side of a move: scheduling the lift, keeping the job visible, and presenting the operation in a compact desktop-style UI. 3D / motion pieces use Three.js and Motion.

## Stack

- React 19, TypeScript, Vite
- Tailwind 4, Motion, Lenis
- Three.js + React Three Fiber

This repository is the web hub. It is not the Batimove marketing site.

## Local

```bash
git clone https://github.com/joshsegatt/Monte-Charge1.git
cd Monte-Charge1
cp .env.example .env   # if you need GenAI keys
npm install
npm run dev            # http://localhost:3000
```

## License

Unlicensed / proprietary to Batimove Sàrl. Public as a technical brief, not as reusable product code.
