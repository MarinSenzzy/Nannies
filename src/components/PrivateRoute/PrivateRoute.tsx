import { Navigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return user ? children : <Navigate to="/" replace />;
}
