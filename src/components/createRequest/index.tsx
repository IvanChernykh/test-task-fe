'use client';
import { Box, Button, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import React from 'react';

import { Routes } from '@/utils/constants/routes';
import { getUserId } from '@/utils/helpers/getUserId';
import { parseRoute } from '@/utils/helpers/parseRoute';

import ContentContainer from '../ui/contentContainer';
import { LinkCustom } from '../ui/LinkCustom';

const CreateRequest = () => {
  const pathname = usePathname();

  const userId = getUserId(pathname);

  return (
    <ContentContainer>
      <Typography variant="h4">Create Request</Typography>
      <Typography>
        Create a request for the transportation of your parcel or deliver
        another user&apos;s package.
      </Typography>
      <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
        <LinkCustom href={parseRoute(Routes.CREATE_ORDER_REQUEST, userId)}>
          <Button>Send parcel</Button>
        </LinkCustom>
        <LinkCustom href={parseRoute(Routes.CREATE_DELIVER_REQUEST, userId)}>
          <Button>Deliver parcel</Button>
        </LinkCustom>
      </Box>
    </ContentContainer>
  );
};

export default CreateRequest;
