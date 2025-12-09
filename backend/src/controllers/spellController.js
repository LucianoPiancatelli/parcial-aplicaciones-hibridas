import Spell from '../models/Spell.js';

// GET /api/spells?name=...&level=...&school=...&ritual=true|false&concentration=true|false&page=&limit=
export async function getSpells(req, res) {
  const {
    name,
    level,
    school,
    ritual,
    concentration,
    page = 1,
    limit = 20
  } = req.query;

  const q = {};
  if (name) q.name = { $regex: name, $options: 'i' };
  if (level !== undefined) q.level = Number(level);
  if (school) q.school = school;
  if (ritual !== undefined) q.ritual = ritual === 'true';
  if (concentration !== undefined) q.concentration = concentration === 'true';

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Spell.find(q).skip(skip).limit(Number(limit)).sort({ name: 1 }),
    Spell.countDocuments(q)
  ]);

  res.json({ total, page: Number(page), limit: Number(limit), items });
}

// GET /api/spells/:id
export async function getSpellById(req, res) {
  const item = await Spell.findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Spell no encontrado' });
  res.json(item);
}

// POST /api/spells
export async function createSpell(req, res) {
  const created = await Spell.create(req.body);
  res.status(201).json(created);
}

// PATCH /api/spells/:id
export async function updateSpell(req, res) {
  const updated = await Spell.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ error: 'Spell no encontrado' });
  res.json(updated);
}

// DELETE /api/spells/:id
export async function deleteSpell(req, res) {
  const deleted = await Spell.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Spell no encontrado' });
  res.json({ ok: true });
}
