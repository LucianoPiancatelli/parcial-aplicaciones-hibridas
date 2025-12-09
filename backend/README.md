# Backend - DnD5e API (Express + MongoDB)

API con autenticacion JWT y CRUD para spells, monsters, races, equipment y usuarios.

## Requisitos
- Node 18+
- MongoDB (local o Atlas)

## Configuracion y arranque
1. `cp .env.example .env` y completa `MONGO_URI`, `JWT_SECRET`
2. `npm i`
3. Datos:
   - Completo desde D&D API: `npm run seed`
   - Datos cortos locales: `npm run seed:lite`
4. `npm run dev` (o `npm start`)

## Endpoints
- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- Usuarios (admin): `GET /api/users`, `GET /api/users/:id`, `PATCH /api/users/:id/role`
- Spells: `GET /api/spells?name&level&school&ritual&concentration&page&limit`, CRUD admin
- Monsters: `GET /api/monsters?name&type&crMin&crMax&page&limit`, CRUD admin
- Races: `GET /api/races?name&size&page&limit`, CRUD admin
- Equipment: `GET /api/equipment?name&category&gear&minWeight&maxWeight&page&limit`, CRUD admin

## Roles y proteccion
- Rutas de escritura (POST/PATCH/DELETE) requieren token y rol `admin`.
- Validaciones con `express-validator`; se bloquea payload invalido antes de llegar a Mongo.

## Seeds
- `npm run seed`: descarga spells, monsters, races y equipment desde https://www.dnd5eapi.co (limita cantidad para velocidad).
- `npm run seed:lite`: inserta dataset chico embebido para probar rapido.
