'use client';

import { Box, Button, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { authApi } from '@/api/auth/authApi';
import { IUser } from '@/redux/reducers/user/types';
import { setUser } from '@/redux/reducers/user/userReducer';
import { Store } from '@/redux/rootReducer';

import { ChangeAccaunt } from './changeAccaunt';

interface ILoginFormProps {}

export const LoginForm: React.FC<ILoginFormProps> = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: Store) => state.user);

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
