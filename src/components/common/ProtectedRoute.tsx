import { Loader } from '@mantine/core';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../../providers/AuthProvider';

interface Props {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  const user = useUser({ useErrorBoundary: (error: any) => error.response?.status >= 500 });
  let location = useLocation();

  if (user.isLoading) {
    return <Loader />;
  }
  if (user.isError || !user.data) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
