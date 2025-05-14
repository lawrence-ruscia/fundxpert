import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import Login from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Login /> },
      { path: 'dashboard', element: <Dashboard /> },
    ],
  },
]);
