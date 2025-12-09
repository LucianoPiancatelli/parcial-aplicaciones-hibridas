import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const startServer = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error('Falta MONGO_URI en las variables de entorno');
    }

    // Conexión a MongoDB Atlas
    await connectDB(MONGO_URI);
    console.log(' Conectado a MongoDB');

   
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();
