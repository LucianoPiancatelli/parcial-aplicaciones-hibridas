import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Spells from './pages/Spells.jsx';
import Monsters from './pages/Monsters.jsx';
import Races from './pages/Races.jsx';
import Equipment from './pages/Equipment.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Admin from './pages/Admin.jsx';

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="content-panel">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spells" element={<Spells />} />
          <Route path="/monsters" element={<Monsters />} />
          <Route path="/races" element={<Races />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}
