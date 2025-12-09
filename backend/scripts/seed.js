import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { connectDB } from '../src/config/db.js';
import Spell from '../src/models/Spell.js';
import Monster from '../src/models/Monster.js';
import Race from '../src/models/Race.js';
import Equipment from '../src/models/Equipment.js';
import {
  fetchAll,
  fetchDetail,
  mapSpell,
  mapMonster,
  mapRace,
  mapEquipment
} from '../src/utils/apiImport.js';

async function seedSpells() {
  console.log('Descargando indices de spells...');
  const refs = await fetchAll('/api/spells');
  console.log('Spells disponibles:', refs.length);

  const spells = [];
  for (const ref of refs.slice(0, 120)) {
    try {
      const detail = await fetchDetail(ref.url);
      spells.push(await mapSpell(detail));
    } catch (e) {
      console.error('Error fetch spell', ref.url, e.message);
    }
  }

  console.log('Insertando spells...', spells.length);
  await Spell.deleteMany({});
  if (spells.length) await Spell.insertMany(spells);
  console.log(`Spells importados: ${await Spell.countDocuments()}`);
}

async function seedMonsters() {
  console.log('Descargando indices de monsters...');
  const refs = await fetchAll('/api/monsters');
  console.log('Monsters disponibles:', refs.length);

  const monsters = [];
  for (const ref of refs.slice(0, 120)) {
    try {
      const detail = await fetchDetail(ref.url);
      monsters.push(await mapMonster(detail));
    } catch (e) {
      console.error('Error fetch monster', ref.url, e.message);
    }
  }

  console.log('Insertando monsters...', monsters.length);
  await Monster.deleteMany({});
  if (monsters.length) await Monster.insertMany(monsters);
  console.log(`Monsters importados: ${await Monster.countDocuments()}`);
}

async function seedRaces() {
  console.log('Descargando races...');
  const refs = await fetchAll('/api/races');
  console.log('Races disponibles:', refs.length);

  const races = [];
  for (const ref of refs) {
    try {
      const detail = await fetchDetail(ref.url);
      races.push(await mapRace(detail));
    } catch (e) {
      console.error('Error fetch race', ref.url, e.message);
    }
  }

  console.log('Insertando races...', races.length);
  await Race.deleteMany({});
  if (races.length) await Race.insertMany(races);
  console.log(`Races importadas: ${await Race.countDocuments()}`);
}

async function seedEquipment() {
  console.log('Descargando equipment...');
  const refs = await fetchAll('/api/equipment');
  console.log('Equipment disponibles:', refs.length);

  const equipment = [];
  for (const ref of refs.slice(0, 150)) {
    try {
      const detail = await fetchDetail(ref.url);
      equipment.push(await mapEquipment(detail));
    } catch (e) {
      console.error('Error fetch equipment', ref.url, e.message);
    }
  }

  console.log('Insertando equipment...', equipment.length);
  await Equipment.deleteMany({});
  if (equipment.length) await Equipment.insertMany(equipment);
  console.log(`Equipment importados: ${await Equipment.countDocuments()}`);
}

async function seed() {
  if (!process.env.MONGO_URI) {
    console.error('Falta MONGO_URI en .env');
    process.exit(1);
  }

  console.log('Conectando a Mongo:', process.env.MONGO_URI);
  await connectDB(process.env.MONGO_URI);

  await seedSpells();
  await seedMonsters();
  await seedRaces();
  await seedEquipment();

  await mongoose.disconnect();
  console.log('Seed completo');
}

seed().catch((e) => {
  console.error('Error en seed:', e);
  process.exit(1);
});
