import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { connectDB } from '../src/config/db.js';
import Spell from '../src/models/Spell.js';
import Monster from '../src/models/Monster.js';
import Race from '../src/models/Race.js';
import Equipment from '../src/models/Equipment.js';

const spells = [
  { index: 'magic-missile', name: 'Magic Missile', level: 1, school: 'Evocation', ritual: false, concentration: false, casting_time: '1 action', range: '120 feet', duration: 'Instantaneous', classes: ['Wizard'], components: ['V','S'] },
  { index: 'cure-wounds', name: 'Cure Wounds', level: 1, school: 'Evocation', ritual: false, concentration: false, casting_time: '1 action', range: 'Touch', duration: 'Instantaneous', classes: ['Cleric','Bard','Druid'], components: ['V','S'] },
  { index: 'fireball', name: 'Fireball', level: 3, school: 'Evocation', ritual: false, concentration: false, casting_time: '1 action', range: '150 feet', duration: 'Instantaneous', classes: ['Wizard','Sorcerer'], components: ['V','S','M'] },
  { index: 'shield', name: 'Shield', level: 1, school: 'Abjuration', ritual: false, concentration: false, casting_time: '1 reaction', range: 'Self', duration: '1 round', classes: ['Wizard'], components: ['V','S'] },
  { index: 'invisibility', name: 'Invisibility', level: 2, school: 'Illusion', ritual: false, concentration: true, casting_time: '1 action', range: 'Touch', duration: 'Up to 1 hour', classes: ['Wizard','Sorcerer','Bard'], components: ['V','S','M'] }
];

const monsters = [
  { index: 'goblin', name: 'Goblin', size: 'Small', type: 'humanoid', alignment: 'neutral evil', armor_class: 15, hit_points: 7, challenge_rating: 0.25, languages: 'Common, Goblin' },
  { index: 'orc', name: 'Orc', size: 'Medium', type: 'humanoid', alignment: 'chaotic evil', armor_class: 13, hit_points: 15, challenge_rating: 0.5, languages: 'Common, Orc' },
  { index: 'skeleton', name: 'Skeleton', size: 'Medium', type: 'undead', alignment: 'lawful evil', armor_class: 13, hit_points: 13, challenge_rating: 0.25, languages: 'Understands Common but cannot speak' },
  { index: 'ogre', name: 'Ogre', size: 'Large', type: 'giant', alignment: 'chaotic evil', armor_class: 11, hit_points: 59, challenge_rating: 2, languages: 'Common, Giant' },
  { index: 'troll', name: 'Troll', size: 'Large', type: 'giant', alignment: 'chaotic evil', armor_class: 15, hit_points: 84, challenge_rating: 5, languages: 'Giant' }
];

const races = [
  {
    index: 'human',
    name: 'Human',
    speed: 30,
    size: 'Medium',
    alignment: 'Humans tend toward no particular alignment.',
    age: 'Humans reach adulthood in their late teens and live less than a century.',
    language_desc: 'Common plus one extra language of your choice.',
    traits: ['Extra Language'],
    starting_proficiencies: [],
    ability_bonuses: [
      { ability: 'STR', bonus: 1 },
      { ability: 'DEX', bonus: 1 },
      { ability: 'CON', bonus: 1 },
      { ability: 'INT', bonus: 1 },
      { ability: 'WIS', bonus: 1 },
      { ability: 'CHA', bonus: 1 }
    ]
  },
  {
    index: 'elf',
    name: 'Elf',
    speed: 30,
    size: 'Medium',
    alignment: 'Elves love freedom and self expression.',
    age: 'Although elves reach physical maturity at about the same age as humans, the elven understanding of adulthood goes beyond physical growth.',
    language_desc: 'Common and Elvish.',
    traits: ['Darkvision', 'Keen Senses', 'Fey Ancestry', 'Trance'],
    starting_proficiencies: ['Perception'],
    ability_bonuses: [{ ability: 'DEX', bonus: 2 }]
  }
];

const equipment = [
  {
    index: 'longsword',
    name: 'Longsword',
    category: 'Weapon',
    gear_category: 'Martial Melee Weapons',
    cost: { quantity: 15, unit: 'gp' },
    weight: 3,
    desc: '1d8 slashing. Versatile (1d10)',
    properties: ['Versatile']
  },
  {
    index: 'shortbow',
    name: 'Shortbow',
    category: 'Weapon',
    gear_category: 'Simple Ranged Weapons',
    cost: { quantity: 25, unit: 'gp' },
    weight: 2,
    desc: '1d6 piercing. Ammunition, two-handed, range 80/320',
    properties: ['Ammunition', 'Two-Handed']
  },
  {
    index: 'leather-armor',
    name: 'Leather Armor',
    category: 'Armor',
    gear_category: 'Light Armor',
    cost: { quantity: 10, unit: 'gp' },
    weight: 10,
    desc: 'AC 11 + Dex modifier',
    properties: []
  }
];

async function seedLite() {
  if (!process.env.MONGO_URI) {
    console.error('Falta MONGO_URI en .env');
    process.exit(1);
  }

  await connectDB(process.env.MONGO_URI);

  await Spell.deleteMany({});
  await Monster.deleteMany({});
  await Race.deleteMany({});
  await Equipment.deleteMany({});

  await Spell.insertMany(spells);
  await Monster.insertMany(monsters);
  await Race.insertMany(races);
  await Equipment.insertMany(equipment);

  console.log('Seed lite completado');
  await mongoose.disconnect();
}

seedLite().catch((err) => {
  console.error('Error en seed lite:', err);
  process.exit(1);
});
