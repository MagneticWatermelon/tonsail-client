import { createBrowserRouter } from 'react-router-dom';
import RequestConfig from '../components/RequestConfig/RequestConfig';
import StageConfig from '../components/StageConfig/StageConfig';
import TestDetail from '../components/Test/TestDetail';
import TestConfig from '../components/TestConfig/TestConfig';
import TestRuns from '../components/TestRuns/TestRuns';
import { LoginPage, RegisterPage } from '@/features/auth';
import { UserProfile } from '@/features/user';
import { ErrorPage } from './error';
import RootRoute from './root';
import { queryClient } from '@/lib/react-query';
import { runMetricsLoader, runTestLoader } from '@/features/test';
import { OrganizationProfile, runOrganizationLoader } from '@/features/organization';
import { projectLoader, ProjectTests } from '@/features/project';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'tests/:testId',
        loader: runTestLoader(queryClient),
        element: <TestDetail />
      },
      {
        path: 'tests/:testId/config',
        element: <TestConfig />,
        children: [
          {
            path: 'scenario/:scenarioId',
            element: <RequestConfig />
          },
          {
            path: 'scenario/:scenarioId/options',
            element: <StageConfig />
          }
        ]
      },
      {
        path: 'account/:userId',
        element: <UserProfile />
      },
      {
        path: 'organization/:organizationId',
        loader: runOrganizationLoader(queryClient),
        element: <OrganizationProfile />
      },
      {
        path: 'projects/:projectId',
        loader: projectLoader(queryClient),
        element: <ProjectTests />
      },
      {
        path: 'runs/:runId',
        loader: runMetricsLoader(queryClient),
        element: <TestRuns />
      }
    ]
  },
  {
    path: 'login/',
    element: <LoginPage />
  },
  {
    path: 'register/',
    element: <RegisterPage />
  }
]);

export { router };
