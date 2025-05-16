import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import LoginPage from '@/app/login/LoginPage';
import Dashboard from '@/app/dashboard/Dashboard';
import PrivateRoute from '@/components/PrivateRoute';
import Layout from '@/layout';
import { Navigate } from 'react-router-dom';
import Contributions from '@/app/contributions/Contributions';
import NotFoundError from '@/errors/not-found-error';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundError />, // Global error handler for the app
    children: [
      { index: true, element: <LoginPage /> },
      {
        path: 'app',
        element: <PrivateRoute />,
        children: [
          {
            element: <Layout />,
            children: [
              { index: true, element: <Navigate to='dashboard' /> },
              { path: 'dashboard', element: <Dashboard /> },
              { path: 'my-contributions', element: <Contributions /> },
              // TODO: Add routes here
            ],
          },
        ],
      },
      { path: '*', element: <NotFoundError /> }, // Catch any unmatched routes
    ],
  },
]);
