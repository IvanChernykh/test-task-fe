import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal } from '@mui/material';
import React from 'react';

import { Colors } from '@/utils/constants/colors';

interface IModalCustomProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  header?: React.ReactNode;
}

export const ModalCustom: React.FC<IModalCustomProps> = ({
  open,
  children,
  header,
  handleClose,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: Colors.BG_BASE,
          p: 4,
          width: 360,
          border: `2px solid ${Colors.BG_TEXT_CONTRAST}`,
          maxHeight: 500,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <div>{header}</div>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: Colors.TEXT_WHITE }} />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Modal>
  );
};
