import Equipment from '../models/Equipment.js';

// GET /api/equipment?name=&category=&gear=&minWeight=&maxWeight=&page=&limit=
export async function getEquipment(req, res) {
  const { name, category, gear, minWeight, maxWeight, page = 1, limit = 20 } = req.query;

  const q = {};
  if (name) q.name = { $regex: name, $options: 'i' };
  if (category) q.category = category;
  if (gear) q.gear_category = gear;
  if (minWeight !== undefined || maxWeight !== undefined) {
    q.weight = {};
    if (minWeight !== undefined) q.weight.$gte = Number(minWeight);
    if (maxWeight !== undefined) q.weight.$lte = Number(maxWeight);
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Equipment.find(q).skip(skip).limit(Number(limit)).sort({ name: 1 }),
    Equipment.countDocuments(q)
  ]);

  res.json({ total, page: Number(page), limit: Number(limit), items });
}

// GET /api/equipment/:id
export async function getEquipmentById(req, res) {
  const item = await Equipment.findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Equipment no encontrado' });
  res.json(item);
}

// POST /api/equipment
export async function createEquipment(req, res) {
  const created = await Equipment.create(req.body);
  res.status(201).json(created);
}

// PATCH /api/equipment/:id
export async function updateEquipment(req, res) {
  const updated = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ error: 'Equipment no encontrado' });
  res.json(updated);
}

// DELETE /api/equipment/:id
export async function deleteEquipment(req, res) {
  const deleted = await Equipment.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Equipment no encontrado' });
  res.json({ ok: true });
}
