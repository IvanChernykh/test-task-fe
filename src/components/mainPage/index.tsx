import { Box, Typography } from '@mui/material';
import React from 'react';

import ContentContainer from '../ui/contentContainer';

import { LoginForm } from './components/loginForm';

export const MainPage = () => {
  return (
    <ContentContainer>
      <Typography variant="h4">Manage Accaunts</Typography>
      <LoginForm />
    </ContentContainer>
  );
};
