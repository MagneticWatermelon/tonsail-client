import { Outlet } from 'react-router-dom';
import ApplicationShell from '../components/AppShell/ApplicationShell';
import ProtectedRoute from '../components/common/ProtectedRoute';

export default function RootRoute() {
  return (
    <ProtectedRoute>
      <ApplicationShell>
        <Outlet />
      </ApplicationShell>
    </ProtectedRoute>
  );
}
