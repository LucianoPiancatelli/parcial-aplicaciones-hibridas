# Parcial Aplicaciones Hibridas

Mono-repo con backend Express/Mongo y frontend React (Vite) para consumir DnD5e API. Estructura:

- `backend/`: API REST con JWT y CRUD para spells, monsters, races, equipment y usuarios (roles admin).
- `frontend/`: SPA con React Router, contexto de autenticacion y vistas publicas/protegidas.

## Como correr

### Backend
1) `cd backend`
2) `cp .env.example .env` y completa `MONGO_URI`, `JWT_SECRET`
3) `npm i`
4) Poblar datos: `npm run seed` (D&D API) o `npm run seed:lite` (datos locales)
5) `npm run dev` (puerto 3000 por defecto)

### Frontend
1) `cd frontend`
2) `npm i`
3) `npm run dev` (Vite en 5173 con proxy a `/api` -> `http://localhost:3000`)

## Endpoints principales (backend)
- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- Usuarios (admin): `GET /api/users`, `GET /api/users/:id`, `PATCH /api/users/:id/role`
- Spells: `GET /api/spells?name&level&school&ritual&concentration&page&limit`, CRUD admin
- Monsters: `GET /api/monsters?name&type&crMin&crMax&page&limit`, CRUD admin
- Races: `GET /api/races?name&size&page&limit`, CRUD admin
- Equipment: `GET /api/equipment?name&category&gear&minWeight&maxWeight&page&limit`, CRUD admin

## Deploy rapido
- Backend listo para Render (Node 18+, comando `npm i && npm run start` desde `backend/`).
- Frontend listo para cualquier static host (build `npm run build` en `frontend/`).

## Deploy en Render.com
1) Sube el repo a GitHub/GitLab.
2) Crea un servicio **Web Service** para el backend:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Env Vars: `MONGO_URI`, `JWT_SECRET`, (opcional) `JWT_EXPIRES_IN`
   - Render asigna `PORT`, el servidor ya lo usa automaticamente.
3) Opcional: correr `npm run seed` en un Shell de Render para poblar la base.
4) Crea un **Static Site** para el frontend:
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - Env Var: `VITE_API_BASE=https://tu-backend.onrender.com`
