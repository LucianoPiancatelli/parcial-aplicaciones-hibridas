import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { connectDB } from '../src/config/db.js';
import Spell from '../src/models/Spell.js';
import Monster from '../src/models/Monster.js';
import axios from 'axios';

const API = 'https://www.dnd5eapi.co';

async function fetchAll(endpoint) {
  const { data } = await axios.get(`${API}${endpoint}`);
  return data.results || [];
}
async function fetchDetail(url) {
  const { data } = await axios.get(`https://www.dnd5eapi.co${url}`);
  return data;
}

function mapSpell(d) {
  return {
    index: d.index,
    name: d.name,
    level: d.level,
    school: d.school?.name || d.school,
    ritual: !!d.ritual,
    concentration: !!d.concentration,
    casting_time: d.casting_time,
    range: d.range,
    duration: d.duration,
    classes: (d.classes || []).map(c => c.name || c),
    components: d.components || [],
    desc: Array.isArray(d.desc) ? d.desc.join('\n') : d.desc,
    higher_level: Array.isArray(d.higher_level) ? d.higher_level.join('\n') : d.higher_level,
    source_url: `https://www.dnd5eapi.co/api/spells/${d.index}`
  };
}
function mapMonster(d) {
  return {
    index: d.index,
    name: d.name,
    size: d.size,
    type: d.type,
    alignment: d.alignment,
    armor_class: Array.isArray(d.armor_class) ? d.armor_class[0]?.value ?? null : d.armor_class,
    hit_points: d.hit_points,
    challenge_rating: d.challenge_rating,
    languages: d.languages,
    senses: d.senses ? Object.entries(d.senses).map(([k,v]) => `${k}: ${v}`).join(', ') : '',
    source_url: `https://www.dnd5eapi.co/api/monsters/${d.index}`
  };
}

async function seed() {
  console.log('MONGO_URI=', process.env.MONGO_URI);
  await connectDB(process.env.MONGO_URI);

  console.log('📥 Descargando índices de spells...');
  const spellRefs = await fetchAll('/api/spells');
  console.log('Spells disponibles:', spellRefs.length);

  const spells = [];
  for (const ref of spellRefs.slice(0, 100)) {
    try {
      const detail = await fetchDetail(ref.url);
      spells.push(mapSpell(detail));
    } catch (e) {
      console.error('Error fetch spell', ref.url, e.message);
    }
  }
  console.log('Insertando spells...', spells.length);
  await Spell.deleteMany({});
  if (spells.length) await Spell.insertMany(spells);
  console.log(`✅ Spells importados: ${await Spell.countDocuments()}`);

  console.log('📥 Descargando índices de monsters...');
  const monsterRefs = await fetchAll('/api/monsters');
  console.log('Monsters disponibles:', monsterRefs.length);

  const monsters = [];
  for (const ref of monsterRefs.slice(0, 100)) {
    try {
      const detail = await fetchDetail(ref.url);
      monsters.push(mapMonster(detail));
    } catch (e) {
      console.error('Error fetch monster', ref.url, e.message);
    }
  }
  console.log('Insertando monsters...', monsters.length);
  await Monster.deleteMany({});
  if (monsters.length) await Monster.insertMany(monsters);
  console.log(`✅ Monsters importados: ${await Monster.countDocuments()}`);

  await mongoose.disconnect();
  console.log('🏁 Listo');
}

seed().catch(e => {
  console.error('❌ Error en seed:', e);
  process.exit(1);
});
