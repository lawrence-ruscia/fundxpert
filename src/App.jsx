import { ThemeProvider } from './components/theme-provider';
import { Outlet } from 'react-router-dom';
export const App = () => {
  return (
    <div>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </div>
  );
};
