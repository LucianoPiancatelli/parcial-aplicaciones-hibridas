import { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { useAuth } from '../state/AuthContext.jsx';

export default function Spells() {
  const [data, setData] = useState({ items: [], total: 0 });
  const [q, setQ] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const res = await api('/api/spells' + (q ? `?name=${encodeURIComponent(q)}` : ''));
      setData(res);
    })();
  }, [q]);

  return (
    <section className="page-card resource-panel">
      <div className="panel-header">
        <h2>Spells</h2>
        <p className="panel-subtitle">Revisa los conjuros disponibles en la 5e SRD.</p>
      </div>
      <input
        className="text-input"
        placeholder="Buscar..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <ul className="resource-list">
        {data.items.map((s) => (
          <li className="resource-list__item" key={s._id}>
            <strong>{s.name}</strong> - nivel {s.level} - {s.school}
          </li>
        ))}
      </ul>
      {user?.role === 'admin' && (
        <p className="panel-note">Como admin puedes crear o editar desde el backend.</p>
      )}
    </section>
  );
}
