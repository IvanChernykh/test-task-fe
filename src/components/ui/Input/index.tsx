import { Box, TextField, TextFieldProps, Typography } from '@mui/material';
import React from 'react';

import { Colors } from '@/utils/constants/colors';

type InputProps = TextFieldProps & {
  errorMessage?: string;
};

export const Input: React.FC<InputProps> = ({ errorMessage, ...props }) => {
  return (
    <Box>
      <TextField {...props} />
      {errorMessage && (
        <Typography
          sx={{
            marginTop: '2px',
            color: Colors.TEXT_ERROR,
            fontSize: 12,
          }}
        >
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};
