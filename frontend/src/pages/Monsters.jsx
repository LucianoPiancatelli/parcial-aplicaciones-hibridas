import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

export default function Monsters() {
  const [data, setData] = useState({ items: [], total: 0 });
  const [q, setQ] = useState('');

  useEffect(() => {
    (async () => {
      const res = await api('/api/monsters' + (q ? `?name=${encodeURIComponent(q)}` : ''));
      setData(res);
    })();
  }, [q]);

  return (
    <section className="page-card resource-panel">
      <div className="panel-header">
        <h2>Monsters</h2>
        <p className="panel-subtitle">Consulta las criaturas que pueblan los Reinos Olvidados.</p>
      </div>
      <input
        className="text-input"
        placeholder="Buscar..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <ul className="resource-list">
        {data.items.map((m) => (
          <li className="resource-list__item" key={m._id}>
            <strong>{m.name}</strong> - {m.type} - CA {m.armor_class}
          </li>
        ))}
      </ul>
    </section>
  );
}
