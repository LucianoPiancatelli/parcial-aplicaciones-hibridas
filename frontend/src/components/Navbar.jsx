import { Link } from 'react-router-dom';
import { useAuth } from '../state/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="nav-bar">
      <Link className="nav-link nav-link--brand" to="/">Inicio</Link>
      <Link className="nav-link" to="/spells">Spells</Link>
      <Link className="nav-link" to="/monsters">Monsters</Link>
      {user?.role === 'admin' && <Link className="nav-link" to="/admin">Admin</Link>}
      <span className="nav-spacer" />
      {user ? (
        <>
          <span className="nav-greeting">Hola, {user.name}</span>
          <button className="btn btn-ghost" onClick={logout}>Salir</button>
        </>
      ) : (
        <>
          <Link className="nav-link" to="/login">Ingresar</Link>
          <Link className="nav-link" to="/register">Registro</Link>
        </>
      )}
    </nav>
  );
}
