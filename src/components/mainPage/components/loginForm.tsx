'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '@/redux/reducers/user/types';
import { authApi } from '@/api/auth/authApi';
import { setUser } from '@/redux/reducers/user/userReducer';
import { ChangeAccaunt } from './changeAccaunt';
import { StoreType } from '@/redux/rootReducer';
interface ILoginFormProps {}

export const LoginForm: React.FC<ILoginFormProps> = () => {
  const dispatch = useDispatch();
  const { currentUser, allUsers } = useSelector(
    (state: StoreType) => state.user,
  );

  const [activeTab, setActiveTab] = useState<number>(0);
  const [inputVal, setInputVal] = useState<string>('');
  const [users, setUsers] = useState<IUser[]>([]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const OnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value.trim());
  };

  const handleLogin = () => {
    const newCurrentUser = authApi.loginAsNewOrExistingUser(inputVal);
    dispatch(setUser({ user: newCurrentUser! }));
    setInputVal('');
  };

  useEffect(() => {
    if (activeTab !== 0) {
      setUsers(authApi.getAllUsers());
    }
  }, [activeTab]);

  return (
    <Box>
      <Typography></Typography>
      {currentUser && (
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Login" />
          <Tab label="Change account" />
        </Tabs>
      )}
      <Box mt={4}>
        {activeTab === 0 || !currentUser ? (
          <Box>
            <Box mb={2}>
              <Typography mb={2}>
                Enter your account (new or existing)
              </Typography>
              <TextField
                value={inputVal}
                onChange={OnInputChange}
                placeholder="Name"
              />
            </Box>
            <Button disabled={!inputVal.length} onClick={handleLogin}>
              Login
            </Button>
          </Box>
        ) : (
          <Box>
            <ChangeAccaunt users={users} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
