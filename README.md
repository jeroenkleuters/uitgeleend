# 📚 Uitgeleend

Een fullstack applicatie om bij te houden welke items aan wie zijn uitgeleend.  
Gebouwd met **React (Vite, Tailwind, shadcn/ui)** voor de frontend en **Node.js, Express, MongoDB** voor de backend.

---

## 🚀 Features
- Gebruikers beheren (toevoegen, lijst bekijken)
- Items beheren (toevoegen, lijst bekijken)
- Items koppelen aan gebruikers ("uitgeleend aan...")
- UI met **Tailwind CSS 4** + **shadcn/ui** componenten
- Backend met **Express + Mongoose**
- TypeScript zowel frontend als backend

---

## 📂 Projectstructuur

uitgeleend/
├── client/ # React frontend (Vite + Tailwind + shadcn)
│ ├── src/
│ │ ├── components/ # UI en features
│ │ ├── lib/ # helpers (cn, utils)
│ │ └── App.tsx
│ ├── tsconfig.app.json
│ └── vite.config.ts
│
└── server/ # Node.js backend (Express + Mongoose)
├── src/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── index.ts
├── tsconfig.json
└── .env.example

🔧 Belangrijke scripts
Server

npm run dev → Start backend in watch-modus (nodemon + ts-node)

npm run build → Compileert TypeScript naar dist/

npm start → Draait gecompileerde versie

Client

npm run dev → Start frontend in dev-modus

npm run build → Bouwt productieversie

npm run preview → Serve productiebuild lokaal

🛠️ Stack

Frontend: React 18, Vite 5, TypeScript, Tailwind CSS 4, shadcn/ui

Backend: Node.js, Express, TypeScript, Mongoose

Database: MongoDB Atlas (cloud) of lokaal MongoDB

Dev-tools: Nodemon, ts-node, ESLint