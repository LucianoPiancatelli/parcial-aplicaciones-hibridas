import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { useAuth } from '../state/AuthContext.jsx';

const emailRegex = /^\S+@\S+\.\S+$/;

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  const validateForm = () => {
    const nextErrors = {};
    if (!name.trim()) {
      nextErrors.name = 'El nombre es obligatorio';
    } else if (name.trim().length < 3) {
      nextErrors.name = 'Minimo 3 caracteres';
    }
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
      const payload = { name: name.trim(), email: email.trim(), password: password.trim() };
      const data = await api('/api/auth/register', { method: 'POST', body: payload });
      setToken(data.token);
      setUser(data.user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="page-card auth-panel">
      <h2>Registro</h2>
      <form className="stack-form" onSubmit={handleSubmit} noValidate>
        <div>
          <input
            className="text-input"
            placeholder="Nombre"
            required
            minLength={3}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
          {fieldErrors.name && <small className="error-text">{fieldErrors.name}</small>}
        </div>
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
            autoComplete="new-password"
          />
          {fieldErrors.password && <small className="error-text">{fieldErrors.password}</small>}
        </div>
        <button className="btn" type="submit">Crear cuenta</button>
      </form>
      {error && <p className="error-text">{error}</p>}
      <p className="helper-text">Ya tienes cuenta? <Link to="/login">Ingresa</Link></p>
    </section>
  );
}
