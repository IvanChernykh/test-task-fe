'use client';
import { Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';

import { requestsApi } from '@/api/requests/requestsApi';
import { RequestForm, RequestFormData } from '@/components/requestForm';
import ContentContainer from '@/components/ui/contentContainer';
import { setAllRequests } from '@/redux/reducers/requests/requestsReducer';
import { Routes } from '@/utils/constants/routes';
import { getUserId } from '@/utils/helpers/getUserId';
import { parseRoute } from '@/utils/helpers/parseRoute';

export const Order = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleSubmit = (data: RequestFormData) => {
    const userId = getUserId(pathname);
    const requests = requestsApi.createRequest({
      ...data,
      type: 'order',
      createdByUser: userId,
    });

    dispatch(setAllRequests(requests));
    router.push(parseRoute(Routes.USER_REQUESTS, userId));
  };

  return (
    <ContentContainer>
      <Typography variant="h4" mb={2}>
        Create order request
      </Typography>
      <Typography mb={4}>
        Please, give us information about your parcel
      </Typography>
      <RequestForm
        type="order"
        onSubmit={(data) => {
          handleSubmit(data);
        }}
      />
    </ContentContainer>
  );
};
