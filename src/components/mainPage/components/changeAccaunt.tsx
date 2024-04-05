import {
  Box,
  Typography,
  FormControl,
  Select,
  InputLabel,
  Button,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { IUser } from '@/redux/reducers/user/types';
import { setUser } from '@/redux/reducers/user/userReducer';
import { Colors } from '@/utils/constants/colors';

interface IChangeAccauntProps {
  users: IUser[];
}

export const ChangeAccaunt: React.FC<IChangeAccauntProps> = ({ users }) => {
  const dispatch = useDispatch();

  const [selectValue, setSelectValue] = useState<string>('');

  const handleChange = (e: SelectChangeEvent<string>) => {
    setSelectValue(e.target.value);
  };

  const handleChangeAccount = () => {
    dispatch(setUser({ user: users.find((item) => item.id === selectValue)! }));
  };

  return (
    <Box mb={2} sx={{ width: '100%', maxWidth: '300px' }}>
      <Typography mb={2}>Change account</Typography>
      <FormControl fullWidth>
        <InputLabel>Pick user</InputLabel>
        <Select label="Pick user" value={selectValue} onChange={handleChange}>
          {users.map(({ id, name }) => {
            return (
              <MenuItem key={id} value={id} sx={{ color: Colors.BG_BLACK }}>
                {name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Button
        sx={{ mt: 2 }}
        disabled={!selectValue}
        onClick={handleChangeAccount}
      >
        Change account
      </Button>
    </Box>
  );
};
