'use client';
import { Box, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState, useEffect } from 'react';

import { requestsApi } from '@/api/requests/requestsApi';
import { ModalCustom } from '@/components/ui/Modal';
import { IRequest } from '@/redux/reducers/requests/types';
import { Colors } from '@/utils/constants/colors';
import { capitalize } from '@/utils/helpers/capitalizeWord';

interface IRelatedRequestsModalProps {
  modalState: { open: boolean; requestId: string };
  handleClose: () => void;
}

export const RelatedRequestsModal: React.FC<IRelatedRequestsModalProps> = ({
  modalState,
  handleClose,
}) => {
  const [list, setList] = useState<IRequest[]>([]);
  useEffect(() => {
    if (modalState.open) {
      const related = requestsApi.findRelatedRequests(modalState.requestId);
      setList(related);
    }
  }, [modalState.open]);

  return (
    <ModalCustom
      open={modalState.open}
      handleClose={handleClose}
      header={<Typography variant="h6">Related requests</Typography>}
      style={{ width: 600 }}
    >
      <Box sx={{ borderTop: `2px solid ${Colors.BG_BASE_BRIGHT}` }}>
        {list.map((item) => (
          <Box
            key={item.id}
            sx={{
              mt: 2,
              pb: 2,
              borderBottom: `2px solid ${Colors.BG_BASE_BRIGHT}`,
              '*': {
                fontSize: 14,
              },
            }}
          >
            <Typography>Request {item.id}</Typography>
            <Typography>
              {capitalize(item.type)} from {item.cityFrom} to {item.cityTo}
            </Typography>
            <Typography>
              Created{' '}
              {moment(parseInt(item.createdAt, 10)).format('MMM DD YYYY HH:mm')}{' '}
              by {item.createdByUser?.name}
            </Typography>
            {item.type === 'order' && (
              <Typography>Type of parcel: {item.typeofParcel}</Typography>
            )}
          </Box>
        ))}
      </Box>
    </ModalCustom>
  );
};
