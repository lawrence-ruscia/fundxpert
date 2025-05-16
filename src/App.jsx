import { ThemeProvider } from './components/theme-provider';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
export const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </AuthProvider>
  );
};
