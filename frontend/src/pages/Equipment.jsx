import { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { useAuth } from '../state/AuthContext.jsx';

const categoryOptions = ['', 'Weapon', 'Armor', 'Adventuring Gear'];

export default function Equipment() {
  const [data, setData] = useState({ items: [], total: 0 });
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams();
      if (q.trim()) params.set('name', q.trim());
      if (category) params.set('category', category);
      const qs = params.toString() ? `?${params.toString()}` : '';
      const res = await api(`/api/equipment${qs}`);
      setData(res);
    })();
  }, [q, category]);

  return (
    <section className="page-card resource-panel">
      <div className="panel-header">
        <h2>Equipment</h2>
        <p className="panel-subtitle">Objetos, armas y armaduras disponibles.</p>
      </div>
      <div className="form-actions">
        <input
          className="text-input"
          placeholder="Buscar por nombre..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="text-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categoryOptions.map((opt) => (
            <option key={opt || 'all'} value={opt}>
              {opt ? opt : 'Todas las categorias'}
            </option>
          ))}
        </select>
      </div>
      <ul className="resource-list">
        {data.items.map((item) => (
          <li className="resource-list__item" key={item._id}>
            <div className="meta-row">
              <strong>{item.name}</strong>
              {item.category && <span className="pill">{item.category}</span>}
              {item.gear_category && <span className="pill pill-muted">{item.gear_category}</span>}
            </div>
            <div className="meta-row">
              {item.cost && item.cost.quantity !== undefined && (
                <span className="badge">Costo: {item.cost.quantity} {item.cost.unit}</span>
              )}
              {item.weight !== undefined && item.weight !== null && (
                <span className="badge">Peso: {item.weight}</span>
              )}
            </div>
            {item.desc && <p className="helper-text">{item.desc}</p>}
            {(item.properties || []).length > 0 && (
              <div className="tag-row">
                {(item.properties || []).map((p) => (
                  <span className="pill pill-muted" key={p}>{p}</span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
      {user?.role === 'admin' && (
        <p className="panel-note">Como admin puedes crear, editar o borrar equipment desde el backend.</p>
      )}
    </section>
  );
}
