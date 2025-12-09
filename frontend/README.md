# Frontend - DnD5e Client (Vite + React)

SPA para consumir el backend DnD5e con vistas publicas y protegidas.

## Scripts
- `npm i`
- `npm run dev` (5173, proxy a `/api` -> http://localhost:3000)
- `npm run build` / `npm run preview`

## Vistas
- Home
- Spells, Monsters, Races, Equipment (listas con filtros basicos)
- Auth: Login, Register
- Admin (solo rol admin) para listar usuarios y cambiar roles

Configura `VITE_API_BASE` en un `.env` si el backend corre en otra URL.
