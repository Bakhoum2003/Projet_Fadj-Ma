# Fadj-Ma

Application de gestion pharmaceutique composée d’un frontend React et d’une API REST Node.js.

## Structure

```text
Fadj-Ma/
├── frontend/                 # Application React + Vite
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── backend/                  # API Express + MongoDB/Mongoose
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   └── routes/
│   ├── tests/
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

## Technologies

- Frontend : React 19, Vite 8, Tailwind CSS 4.
- Backend : Node.js (>= 18), Express, MongoDB Atlas/Mongoose, JWT et bcryptjs.
- Tests backend : Jest et Supertest.

## Installation

Installez les dépendances séparément pour chaque application :

```bash
cd frontend
npm install

cd ../backend
npm install
```

## Configuration backend

Copiez `backend/.env.example` vers `backend/.env`, puis renseignez les valeurs adaptées à votre environnement :

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=<uri MongoDB Atlas ou locale>
JWT_SECRET=<secret long et aléatoire>
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
LOW_STOCK_THRESHOLD=10
```

Ne versionnez jamais `backend/.env`. Le fichier exemple ne contient aucun secret exploitable.

## Démarrer les applications

Dans deux terminaux distincts :

```bash
cd frontend
npm run dev
```

Vite est disponible par défaut sur `http://localhost:5173`.

```bash
cd backend
npm run dev
```

L’API écoute par défaut sur `http://localhost:5000`. L’endpoint de santé est `GET /api/v1/health`.

## Vérifications

```bash
cd frontend
npm run lint
npm run build

cd ../backend
npm test
```

Le frontend n’est pas encore connecté à l’API : ses données de démonstration sont volontairement conservées pendant cette phase.
