'use client';
import { Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestsApi } from '@/api/requests/requestsApi';
import { setAllRequests } from '@/redux/reducers/requests/requestsReducer';
import { Store } from '@/redux/rootReducer';
import { getUserId } from '@/utils/helpers/getUserId';

import { RequestList } from '../requestList';
import ContentContainer from '../ui/contentContainer';

export const MyRequests = () => {
  const pathname = usePathname();
  const uId = getUserId(pathname);

  const dispatch = useDispatch();
  const requests = useSelector((state: Store) => state.requests.allRequests);

  useEffect(() => {
    const requestsFromApi = requestsApi.getAllUserRequests(uId);
    dispatch(setAllRequests(requestsFromApi));
  }, []);

  return (
    <ContentContainer>
      <Typography variant="h5" mb={4}>
        My requests
      </Typography>
      <RequestList requests={requests} />
    </ContentContainer>
  );
};
