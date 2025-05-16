import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import Login from '../login/LoginPage';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from '@/components/PrivateRoute';
import Layout from '@/layout';
import { Navigate } from 'react-router-dom';
import Contributions from '@/contributions/Contributions';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Login /> },
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
    ],
  },
]);
