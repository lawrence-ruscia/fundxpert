import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import Login from '../login/LoginPage';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from '@/components/PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Login /> },
      {
        path: 'dashboard',
        element: <PrivateRoute />, // protect dashboard from unauthenticated user
        children: [{ index: true, element: <Dashboard /> }],
      },
    ],
  },
]);
