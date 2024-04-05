import { Box, Typography } from '@mui/material';
import React from 'react';

import { LoginForm } from './components/loginForm';

export const MainPage = () => {
  return (
    <Box pt={6}>
      <Box sx={{ margin: '0 auto', width: '100%', maxWidth: '900px' }}>
        <Typography variant="h4">Manage Accaunts</Typography>
        <LoginForm />
      </Box>
    </Box>
  );
};
