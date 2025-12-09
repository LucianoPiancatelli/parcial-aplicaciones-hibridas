import Monster from '../models/Monster.js';

// GET /api/monsters?name=&type=&crMin=&crMax=&page=&limit=
export async function getMonsters(req, res) {
  const { name, type, crMin, crMax, page = 1, limit = 20 } = req.query;

  const q = {};
  if (name) q.name = { $regex: name, $options: 'i' };
  if (type) q.type = type;
  if (crMin !== undefined || crMax !== undefined) {
    q.challenge_rating = {};
    if (crMin !== undefined) q.challenge_rating.$gte = Number(crMin);
    if (crMax !== undefined) q.challenge_rating.$lte = Number(crMax);
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Monster.find(q).skip(skip).limit(Number(limit)).sort({ name: 1 }),
    Monster.countDocuments(q)
  ]);

  res.json({ total, page: Number(page), limit: Number(limit), items });
}

// GET /api/monsters/:id
export async function getMonsterById(req, res) {
  const item = await Monster.findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Monster no encontrado' });
  res.json(item);
}

// POST /api/monsters
export async function createMonster(req, res) {
  const created = await Monster.create(req.body);
  res.status(201).json(created);
}

// PATCH /api/monsters/:id
export async function updateMonster(req, res) {
  const updated = await Monster.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ error: 'Monster no encontrado' });
  res.json(updated);
}

// DELETE /api/monsters/:id
export async function deleteMonster(req, res) {
  const deleted = await Monster.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Monster no encontrado' });
  res.json({ ok: true });
}
