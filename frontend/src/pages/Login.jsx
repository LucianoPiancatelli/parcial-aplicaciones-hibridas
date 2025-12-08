import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { useAuth } from '../state/AuthContext.jsx';

const emailRegex = /^\S+@\S+\.\S+$/;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  const validateForm = () => {
    const nextErrors = {};
    if (!email.trim()) {
      nextErrors.email = 'El email es obligatorio';
    } else if (!emailRegex.test(email.trim())) {
      nextErrors.email = 'Formato de email invalido';
    }
    if (!password.trim()) {
      nextErrors.password = 'La contrasena es obligatoria';
    } else if (password.trim().length < 6) {
      nextErrors.password = 'Minimo 6 caracteres';
    }
    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setError(null);
    try {
      const payload = { email: email.trim(), password: password.trim() };
      const data = await api('/api/auth/login', { method: 'POST', body: payload });
      setToken(data.token);
      setUser(data.user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="page-card auth-panel">
      <h2>Ingresar</h2>
      <form className="stack-form" onSubmit={handleSubmit} noValidate>
        <div>
          <input
            className="text-input"
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          {fieldErrors.email && <small className="error-text">{fieldErrors.email}</small>}
        </div>
        <div>
          <input
            className="text-input"
            placeholder="Password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {fieldErrors.password && <small className="error-text">{fieldErrors.password}</small>}
        </div>
        <button className="btn" type="submit">Entrar</button>
      </form>
      {error && <p className="error-text">{error}</p>}
      <p className="helper-text">No tienes cuenta? <Link to="/register">Registrate</Link></p>
    </section>
  );
}
