import { Outlet } from 'react-router-dom';
import ApplicationShell from '../components/AppShell/ApplicationShell';

export default function RootRoute() {
  return (
    <ApplicationShell>
      <Outlet />
    </ApplicationShell>
  );
}
