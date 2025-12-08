# Parcial-Aplicaciones-Hibridas

Alumno: Luciano Piancatelli - Brisa Gonzalez - Tomas Martinez
Materia: Aplicaciones Hibridas
Docente: Cruz, Jonathan Emanuel
Comision: DWT4AP

## Segunda Entrega: API + Frontend

El proyecto incluye:
- Backend Node/Express con MongoDB y autenticacion JWT.
- Entidades: Users, Spells y Monsters con CRUD separado para administradores.
- Frontend React (Vite) con Router, Context y consumo de la API.

> Importante: el archivo `.env` no se versiona. Copia `.env.example`, renombralo a `.env` y completa tus credenciales antes de ejecutar el proyecto.

### Backend

Requisitos previos
- Node 18+
- MongoDB local o MongoDB Atlas

Configuracion
1. Copiar `.env.example` a `.env` y completar:
   - `MONGO_URI=mongodb://127.0.0.1:27017/dnd5e`
   - `JWT_SECRET=<tu-secret>`
2. Instalar deps: `npm i`
3. Ejecutar: `npm run dev`

Rutas principales
- `POST /api/auth/register` y `POST /api/auth/login` (validadas con express-validator)
- `GET /api/auth/me` para perfil autenticado
- `GET /api/users` y `GET /api/users/:id` (admin)
- `PATCH /api/users/:id/role` (admin) con validacion estricta de roles
- `GET /api/spells` y `GET /api/monsters` con filtros y paginacion
- `POST/PATCH/DELETE /api/spells|monsters` (admin) con validacion de payload antes de llegar a Mongo

Semillas de datos
- Opcional: `npm run seed` (descarga desde DnD5e API) o `npm run seed:lite`.

### Frontend (Vite + React)

Ir a `frontend/`:
1. `npm i`
2. `npm run dev`
   - Vite corre en `http://localhost:5173` con proxy a `http://localhost:3000`.

Caracteristicas
- Login/Registro con validaciones en el cliente y almacenamiento de token en `localStorage`.
- Context para estado global de autenticacion y `ProtectedRoute` con validacion opcional de roles.
- Paginas: Home, Spells, Monsters, Login, Register y Admin (vista protegida para gestionar usuarios y roles).

### Notas
- Cambia el puerto del backend con `PORT` en `.env`.
- Si tu maquina usa IPv6 para `localhost`, usa `127.0.0.1` en `MONGO_URI`.
- Ejecuta `npm run seed` si necesitas poblar spells y monsters desde cero.
