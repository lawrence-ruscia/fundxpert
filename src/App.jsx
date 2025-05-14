import Dashboard from './app/dashboard/Dashboard';
import { ThemeProvider } from './components/theme-provider';
export const App = () => {
  return (
    <div>
      <ThemeProvider>
        <Dashboard />
      </ThemeProvider>
    </div>
  );
};
