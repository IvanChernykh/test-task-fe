'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { authApi } from '@/api/auth/authApi';
import { setUser } from '@/redux/reducers/user/userReducer';

export const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  const dispatch = useDispatch();

  if (currentUser) {
    dispatch(setUser({ user: currentUser }));
  }

  useEffect(() => {
    setCurrentUser(authApi.auth());
  }, []);

  return <div>{children}</div>;
};
