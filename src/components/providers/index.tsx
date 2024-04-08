'use client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { AuthLayout } from './components/auth';
import { MuiThemeProvider } from './components/muiThemeProvider';
import { ReduxProvider } from './components/reduxProvider';

interface IProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<IProvidersProps> = ({ children }) => {
  return (
    <ReduxProvider>
      <MuiThemeProvider>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <AuthLayout>{children}</AuthLayout>
        </LocalizationProvider>
      </MuiThemeProvider>
    </ReduxProvider>
  );
};
