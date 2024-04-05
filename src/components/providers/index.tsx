'use client';
import { MuiThemeProvider } from './components/muiThemeProvider';
import { ReduxProvider } from './components/reduxProvider';

interface IProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<IProvidersProps> = ({ children }) => {
  return (
    <ReduxProvider>
      <MuiThemeProvider>{children}</MuiThemeProvider>
    </ReduxProvider>
  );
};
