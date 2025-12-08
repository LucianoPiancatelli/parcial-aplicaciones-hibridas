export const API_BASE = import.meta.env.VITE_API_BASE || '';

export async function api(path, { method = 'GET', token, body } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) {
    const err = await safeJson(res);
    const validation = Array.isArray(err?.errors) ? err.errors.map(e => e.msg).join(', ') : '';
    throw new Error(err?.error || err?.message || validation || res.statusText);
  }
  return safeJson(res);
}

async function safeJson(res) {
  try { return await res.json(); } catch { return null; }
}
