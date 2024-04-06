'use client';

import { Box, Button, Typography, List, ListItemButton } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setUser } from '@/redux/reducers/user/userReducer';
import { Store } from '@/redux/rootReducer';
import { Colors } from '@/utils/constants/colors';
import { Routes } from '@/utils/constants/routes';
import { parseRoute } from '@/utils/helpers/parseRoute';

import { LinkCustom } from '../ui/LinkCustom';

interface ISidebarProps {}

type MenuItem = {
  name: string;
  route: Routes;
};

const menuItems: MenuItem[] = [
  { name: 'Home', route: Routes.HOME },
  { name: 'All Requests', route: Routes.ALL_REQUESTS },
  { name: 'My Requests', route: Routes.USER_REQUESTS },
  { name: 'Create Request', route: Routes.CREATE_REQUEST },
];

export const Sidebar: React.FC<ISidebarProps> = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: Store) => state.user.currentUser);

  const handleLogout = () => {
    dispatch(setUser({ user: null }));
  };

  return (
    <Box
      sx={{
        minWidth: '300px',
        background: Colors.BG_BASE,
        borderRadius: '8px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h6" my={2} textAlign="center">
          {currentUser?.name || 'Not Logged In'}
        </Typography>
        {currentUser && <Button onClick={handleLogout}>Log Out</Button>}
      </Box>
      <List>
        {menuItems
          .filter((item) => currentUser || item.route === Routes.HOME)
          .map(({ name, route }) => {
            return (
              <LinkCustom
                href={parseRoute(route, currentUser?.id || '')}
                key={name}
              >
                <ListItemButton key={name}>{name}</ListItemButton>
              </LinkCustom>
            );
          })}
      </List>
    </Box>
  );
};
