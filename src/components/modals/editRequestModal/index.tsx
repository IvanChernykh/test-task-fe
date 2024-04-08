'use client';
import { Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

import { requestsApi } from '@/api/requests/requestsApi';
import { RequestForm, RequestFormData } from '@/components/requestForm';
import { EditRequestModalState } from '@/components/requestList';
import { ModalCustom } from '@/components/ui/Modal';
import { setAllRequests } from '@/redux/reducers/requests/requestsReducer';

interface IEditRequestModalProps {
  modalState: EditRequestModalState;
  handleClose: () => void;
}

export const EditRequestModal: React.FC<IEditRequestModalProps> = ({
  modalState,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const { open, request } = modalState;

  const handleSubmit = (data: RequestFormData) => {
    const newRequests = requestsApi.updateRequest({
      ...request!,
      cityFrom: data.cityFrom,
      cityTo: data.cityTo,
      dispatchDate: data.dispatchDate,
      typeofParcel: data.typeofParcel,
      description: data.description,
    });

    dispatch(setAllRequests(newRequests));
    handleClose();
  };

  if (!open) {
    return null;
  }

  return (
    <ModalCustom
      open={open}
      handleClose={handleClose}
      header={
        <Typography id="modal-modal-title" variant="h6">
          Edit Request
        </Typography>
      }
    >
      <RequestForm
        type={request!.type}
        onSubmit={handleSubmit}
        defaultValues={{
          cityFrom: request!.cityFrom,
          cityTo: request!.cityTo,
          typeofParcel: request!.typeofParcel,
          dispatchDate: request!.dispatchDate,
          description: request!.description,
        }}
      />
    </ModalCustom>
  );
};
