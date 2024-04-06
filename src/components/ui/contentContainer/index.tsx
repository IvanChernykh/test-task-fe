import { Box, BoxProps } from '@mui/material';
import React from 'react';

const ContentContainer: React.FC<BoxProps> = ({
  children,
  sx,
  pt,
  ...props
}) => {
  return (
    <Box
      {...props}
      pt={pt || 6}
      sx={{ margin: '0 auto', width: '100%', maxWidth: '900px', ...sx }}
    >
      {children}
    </Box>
  );
};

export default ContentContainer;
