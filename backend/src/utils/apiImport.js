import axios from 'axios';

const API = 'https://www.dnd5eapi.co';

export async function fetchAll(endpoint) {
  // endpoint: '/api/spells' | '/api/monsters' | '/api/races' | '/api/equipment'
  const { data } = await axios.get(`${API}${endpoint}`);
  return data.results || [];
}

export async function fetchDetail(url) {
  const { data } = await axios.get(`https://www.dnd5eapi.co${url}`);
  return data;
}

export async function mapSpell(d) {
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

export async function mapMonster(d) {
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

export async function mapRace(d) {
  return {
    index: d.index,
    name: d.name,
    speed: d.speed,
    size: d.size,
    alignment: d.alignment,
    age: d.age,
    language_desc: d.language_desc,
    traits: (d.traits || []).map(t => t.name || t),
    starting_proficiencies: (d.starting_proficiencies || []).map(p => p.name || p),
    ability_bonuses: (d.ability_bonuses || [])
      .map((ab) => ({
        ability: ab.ability_score?.name || ab.ability || '',
        bonus: ab.bonus ?? null
      }))
      .filter((ab) => ab.ability),
    source_url: `https://www.dnd5eapi.co/api/races/${d.index}`
  };
}

export async function mapEquipment(d) {
  return {
    index: d.index,
    name: d.name,
    category: d.equipment_category?.name || d.equipment_category,
    gear_category: d.gear_category?.name || d.gear_category,
    cost: d.cost ? { quantity: d.cost.quantity, unit: d.cost.unit } : null,
    weight: d.weight,
    desc: Array.isArray(d.desc) ? d.desc.join('\n') : d.desc,
    properties: (d.properties || []).map(p => p.name || p),
    source_url: `https://www.dnd5eapi.co/api/equipment/${d.index}`
  };
}
