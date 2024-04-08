'use client';
import {
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Typography,
  Box,
  Button,
} from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

import { requestsApi } from '@/api/requests/requestsApi';
import { setAllRequests } from '@/redux/reducers/requests/requestsReducer';
import { IRequest } from '@/redux/reducers/requests/types';
import { capitalize } from '@/utils/helpers/capitalizeWord';

interface IRequestItemProps {
  request: IRequest;
}

export const RequestItem: React.FC<IRequestItemProps> = ({ request }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    const requests = requestsApi.deleteRequest(request.id);
    dispatch(setAllRequests(requests));
  };

  return (
    <Accordion>
      <AccordionSummary aria-controls="panel1-content" id="panel1-header">
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography>Request {request.id}</Typography>
          <Typography>
            {capitalize(request.type)} to {request.cityTo}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box width="100%">
          <Typography variant="h6">Request details</Typography>
          <p>City of departure: {request.cityFrom}</p>
          <p>Destination city: {request.cityTo}</p>
          <p>Date of dispatch: {request.dispatchDate}</p>
          {request.type === 'order' && (
            <>
              <p>Type of parcel: {request.typeofParcel}</p>
              <p>Description:</p>
              <p>{request.description}</p>
            </>
          )}
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};