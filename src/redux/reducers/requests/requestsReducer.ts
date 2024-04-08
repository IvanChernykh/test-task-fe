import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IRequest, IRequestsState } from './types';

const initialState: IRequestsState = {
  allRequests: [],
};

export const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setAllRequests: (state, { payload }: PayloadAction<IRequest[]>) => {
      state.allRequests = payload;
    },
  },
});

export const { setAllRequests } = requestsSlice.actions;

export default requestsSlice.reducer;
