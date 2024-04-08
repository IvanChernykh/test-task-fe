import { Typography } from '@mui/material';
import React from 'react';

export const HelperText: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Typography fontSize={12} mb={1}>
      {children}
    </Typography>
  );
};
