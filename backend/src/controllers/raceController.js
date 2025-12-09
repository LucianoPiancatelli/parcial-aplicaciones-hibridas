import Race from '../models/Race.js';

// GET /api/races?name=&size=&page=&limit=
export async function getRaces(req, res) {
  const { name, size, page = 1, limit = 20 } = req.query;

  const q = {};
  if (name) q.name = { $regex: name, $options: 'i' };
  if (size) q.size = size;

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Race.find(q).skip(skip).limit(Number(limit)).sort({ name: 1 }),
    Race.countDocuments(q)
  ]);

  res.json({ total, page: Number(page), limit: Number(limit), items });
}

// GET /api/races/:id
export async function getRaceById(req, res) {
  const item = await Race.findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Race no encontrada' });
  res.json(item);
}

// POST /api/races
export async function createRace(req, res) {
  const created = await Race.create(req.body);
  res.status(201).json(created);
}

// PATCH /api/races/:id
export async function updateRace(req, res) {
  const updated = await Race.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ error: 'Race no encontrada' });
  res.json(updated);
}

// DELETE /api/races/:id
export async function deleteRace(req, res) {
  const deleted = await Race.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Race no encontrada' });
  res.json({ ok: true });
}
