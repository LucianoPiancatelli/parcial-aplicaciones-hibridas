import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

(async () => {
  if (!MONGO_URI) {
    console.error('Falta MONGO_URI en .env');
    process.exit(1);
  }
  await connectDB(MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
})();

