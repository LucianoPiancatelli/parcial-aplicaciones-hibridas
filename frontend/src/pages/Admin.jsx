import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api.js';
import { useAuth } from '../state/AuthContext.jsx';

const emailRegex = /^\S+@\S+\.\S+$/;

export default function Admin() {
  const { token, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [meta, setMeta] = useState({ total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingUser, setPendingUser] = useState(null);

  const canManage = useMemo(() => user?.role === 'admin', [user]);

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  
  }, [token]);

  const fetchUsers = async (search = '') => {
    setLoading(true);
    setError(null);
    try {
      const qs = search ? `?q=${encodeURIComponent(search)}` : '';
      const data = await api(`/api/users${qs}`, { token });
      setUsers(data?.items ?? []);
      setMeta({ total: data?.total ?? 0 });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(query.trim());
  };

  const handleRoleChange = async (userId, nextRole) => {
    if (!nextRole) return;
    setPendingUser(userId);
    setError(null);
    try {
      await api(`/api/users/${userId}/role`, {
        method: 'PATCH',
        token,
        body: { role: nextRole }
      });
      await fetchUsers(query.trim());
    } catch (err) {
      setError(err.message);
    } finally {
      setPendingUser(null);
    }
  };

  return (
    <section className="page-card resource-panel">
      <div className="panel-header">
        <h2>Administracion</h2>
        <p className="panel-subtitle">
          Administra usuarios registrados y ajusta roles. Solo los administradores pueden acceder.
        </p>
      </div>

      <form className="stack-form" onSubmit={handleSearch}>
        <input
          className="text-input"
          placeholder="Buscar por nombre o email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="form-actions">
          <button className="btn" type="submit">Buscar</button>
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => { setQuery(''); fetchUsers(''); }}
          >
            Limpiar
          </button>
        </div>
      </form>

      {loading && <p className="helper-text">Cargando usuarios...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && users.length === 0 && (
        <p className="helper-text">No se encontraron usuarios para la busqueda actual.</p>
      )}

      {!loading && users.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td className={emailRegex.test(item.email) ? '' : 'error-text'}>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  {canManage && (
                    <select
                      className="text-input"
                      disabled={pendingUser === item._id}
                      value={item.role}
                      onChange={(e) => handleRoleChange(item._id, e.target.value)}
                    >
                      <option value="user">Usuario</option>
                      <option value="admin">Administrador</option>
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4">Total: {meta.total}</td>
            </tr>
          </tfoot>
        </table>
      )}
    </section>
  );
}
