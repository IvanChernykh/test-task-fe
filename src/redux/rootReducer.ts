import { combineReducers } from 'redux';

import userReducer from './reducers/user/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
});

export type StoreType = ReturnType<typeof rootReducer>;

export default rootReducer;
