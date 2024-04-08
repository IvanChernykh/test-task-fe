'use client';
import {
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Typography,
  Box,
  Button,
} from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { requestsApi } from '@/api/requests/requestsApi';
import { RelatedRequestsModal } from '@/components/modals/relatedRequestsModal';
import { setAllRequests } from '@/redux/reducers/requests/requestsReducer';
import { IRequest } from '@/redux/reducers/requests/types';
import { capitalize } from '@/utils/helpers/capitalizeWord';

interface IRequestItemProps {
  request: IRequest;
  handleEdit: () => void;
}

type RelatedRequestsModalState = {
  open: boolean;
  requestId: string;
};

export const RequestItem: React.FC<IRequestItemProps> = ({
  request,
  handleEdit,
}) => {
  const [modalState, setModalState] = useState<RelatedRequestsModalState>({
    open: false,
    requestId: '',
  });
  const dispatch = useDispatch();
  const handleDelete = () => {
    const requests = requestsApi.deleteRequest(request.id);
    dispatch(setAllRequests(requests));
  };

  const handleOpenModal = () => {
    setModalState({ open: true, requestId: request.id });
  };

  const handleCloseModal = () => {
    setModalState({
      open: false,
      requestId: '',
    });
  };

  return (
    <>
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
            <Box mb={4}>
              <p>
                Created at:{' '}
                {moment(parseInt(request.createdAt, 10)).format(
                  'MMM DD YYYY HH:mm',
                )}
              </p>
              <p>Created by: {request.createdByUser?.name}</p>
            </Box>
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
            <p>
              Related requests:{' '}
              <Button onClick={handleOpenModal}>View list</Button>
            </p>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      <RelatedRequestsModal
        modalState={modalState}
        handleClose={handleCloseModal}
      />
    </>
  );
};
