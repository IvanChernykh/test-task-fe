'use client';
import { Typography } from '@mui/material';
import React from 'react';

import { RequestForm } from '@/components/requestForm';
import ContentContainer from '@/components/ui/contentContainer';

export const Order = () => {
  return (
    <ContentContainer>
      <Typography variant="h5" mb={4}>
        Please, give us information about your parcel
      </Typography>
      <RequestForm
        type="order"
        onSubmit={(data) => {
          // send data
        }}
      />
    </ContentContainer>
  );
};
