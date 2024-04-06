import { createSlice } from '@reduxjs/toolkit';

import { IRequestsState } from './types';

const initialState: IRequestsState = {};

export const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {},
});

export const {} = requestsSlice.actions;

export default requestsSlice.reducer;
