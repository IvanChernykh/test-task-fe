import { combineReducers } from 'redux';

import requestsReducer from './reducers/requests/requestsReducer';
import userReducer from './reducers/user/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  requests: requestsReducer,
});

export type Store = ReturnType<typeof rootReducer>;

export default rootReducer;
