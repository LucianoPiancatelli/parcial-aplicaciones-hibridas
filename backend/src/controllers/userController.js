import User from '../models/User.js';

export async function listUsers(req, res) {
  const { q, page = 1, limit = 20 } = req.query;
  const filter = q
    ? { $or: [ { name: { $regex: q, $options: 'i' } }, { email: { $regex: q, $options: 'i' } } ] }
    : {};

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    User.find(filter).select('-password').skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
    User.countDocuments(filter)
  ]);

  res.json({ total, page: Number(page), limit: Number(limit), items });
}

export async function getUserById(req, res) {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(user);
}

export async function updateUserRole(req, res) {
  const { role } = req.body || {};
  const updated = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  ).select('-password');
  if (!updated) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(updated);
}
