import { createBrowserRouter } from 'react-router-dom';
import { projectLoader } from '../api/project/getProject';
import { runMetricsLoader } from '../api/test/getRunMetrics';
import { runTestLoader } from '../api/test/getRuns';
import { LoginPage } from '../components/Login/LoginPage';
import { RegisterPage } from '../components/Login/RegisterPage';
import OrganizationProfile from '../components/Organization/OrganizationProfile';
import ProjectTests from '../components/Project/ProjectTests';
import RequestConfig from '../components/RequestConfig/RequestConfig';
import StageConfig from '../components/StageConfig/StageConfig';
import TestDetail from '../components/Test/TestDetail';
import TestConfig from '../components/TestConfig/TestConfig';
import TestRuns from '../components/TestRuns/TestRuns';
import UserProfile from '../components/User/UserProfile';
import { queryClient } from '../lib/react-query';
import { ErrorPage } from './error';
import RootRoute from './root';

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
        path: 'account/:user_id',
        element: <UserProfile />
      },
      {
        path: 'organization/:organization_id',
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
