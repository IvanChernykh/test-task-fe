import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IUserState, SetUserPayload } from './types';

const initialState: IUserState = {
  currentUser: null,
  allUsers: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SetUserPayload>) => {
      state.currentUser = action.payload.user;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
