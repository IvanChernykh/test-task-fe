'use client';
import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestsApi } from '@/api/requests/requestsApi';
import { setAllRequests } from '@/redux/reducers/requests/requestsReducer';
import { Store } from '@/redux/rootReducer';

import { RequestList } from '../requestList';
import ContentContainer from '../ui/contentContainer';

export const AllRequests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state: Store) => state.requests.allRequests);

  useEffect(() => {
    const requestsFromApi = requestsApi.getAllRequests();
    dispatch(setAllRequests(requestsFromApi));
  }, []);

  return (
    <ContentContainer>
      <Typography variant="h5" mb={4}>
        All requests
      </Typography>
      <RequestList requests={requests} />
    </ContentContainer>
  );
};
