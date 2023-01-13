import { Outlet } from 'react-router-dom';
import ApplicationShell from '../components/AppShell/ApplicationShell';
import ProtectedRoute from '../components/common/ProtectedRoute';
import { LoginPage } from '../components/Login/LoginPage';
import { useAuth } from '../util/AuthProvider';

export default function RootRoute() {
  const auth = useAuth();
  if (!auth.user) {
    return <LoginPage />;
  }
  return (
    <ProtectedRoute>
      <ApplicationShell>
        <Outlet />
      </ApplicationShell>
    </ProtectedRoute>
  );
}
