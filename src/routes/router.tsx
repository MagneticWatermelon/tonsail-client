import { createBrowserRouter } from 'react-router-dom';
import RequestConfig from '../components/RequestConfig/RequestConfig';
import StageConfig from '../components/StageConfig/StageConfig';
import TestDetail from '../components/Test/TestDetail';
import TestConfig from '../components/TestConfig/TestConfig';
import { LoginPage, RegisterPage } from '@/features/auth';
import { UserProfile } from '@/features/user';
import { ErrorPage } from './error';
import RootRoute from './root';
import { queryClient } from '@/lib/react-query';
import { OrganizationProfile, runOrganizationLoader } from '@/features/organization';
import { ProjectTests } from '@/features/project';
import { TonsailTestRun } from '@/features/test';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'tests/:testId',
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
        element: <ProjectTests />
      },
      {
        path: 'runs/:runId',
        element: <TonsailTestRun />
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
