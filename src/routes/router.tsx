import { createBrowserRouter } from 'react-router-dom';
import RequestConfig from '../components/RequestConfig/RequestConfig';
import StageConfig from '../components/StageConfig/StageConfig';
import TestConfig from '../components/TestConfig/TestConfig';
import { ErrorPage } from './error';
import RootRoute from './root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
    errorElement: <ErrorPage />,
    children: [
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
        path: 'projects/',
        element: <div />
      },
      {
        path: 'settings/',
        element: <div />
      },
    ]
  }
]);

export { router };