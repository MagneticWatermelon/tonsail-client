import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../util/AuthProvider';

interface Props {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  const { user } = useAuth();
  let location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
