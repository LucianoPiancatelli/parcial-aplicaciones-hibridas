import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../state/AuthContext.jsx';

export default function ProtectedRoute({ roles = null }) {
  const { token, user } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  if (roles && (!user || !roles.includes(user.role))) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
