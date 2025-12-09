import { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { useAuth } from '../state/AuthContext.jsx';

const sizeOptions = ['', 'Small', 'Medium', 'Large'];

export default function Races() {
  const [data, setData] = useState({ items: [], total: 0 });
  const [q, setQ] = useState('');
  const [size, setSize] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams();
      if (q.trim()) params.set('name', q.trim());
      if (size) params.set('size', size);
      const qs = params.toString() ? `?${params.toString()}` : '';
      const res = await api(`/api/races${qs}`);
      setData(res);
    })();
  }, [q, size]);

  return (
    <section className="page-card resource-panel">
      <div className="panel-header">
        <h2>Races</h2>
        <p className="panel-subtitle">
          Lineas de personajes con habilidades, proficiencias y velocidades base.
        </p>
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
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          {sizeOptions.map((opt) => (
            <option key={opt || 'all'} value={opt}>
              {opt ? `Size: ${opt}` : 'Todas las sizes'}
            </option>
          ))}
        </select>
      </div>
      <ul className="resource-list">
        {data.items.map((race) => (
          <li className="resource-list__item" key={race._id}>
            <div className="meta-row">
              <strong>{race.name}</strong>
              {race.size && <span className="pill">Size {race.size}</span>}
              {race.speed && <span className="pill">Speed {race.speed}</span>}
            </div>
            {race.alignment && <p className="helper-text">{race.alignment}</p>}
            {race.language_desc && <p className="helper-text">Idiomas: {race.language_desc}</p>}
            {(race.ability_bonuses || []).length > 0 && (
              <div className="tag-row">
                {(race.ability_bonuses || []).map((ab, idx) => {
                  const bonusLabel = typeof ab.bonus === 'number' ? ab.bonus : '?';
                  return (
                    <span className="badge" key={idx}>
                      {ab.ability}: +{bonusLabel}
                    </span>
                  );
                })}
              </div>
            )}
            {(race.traits || []).length > 0 && (
              <div className="tag-row">
                {(race.traits || []).map((t) => (
                  <span className="pill pill-muted" key={t}>{t}</span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
      {user?.role === 'admin' && (
        <p className="panel-note">Como admin puedes crear, editar o borrar races desde el backend.</p>
      )}
    </section>
  );
}
