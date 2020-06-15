

import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import otpReducer from './otpReducer';
import constantReducer from './constantReducer';
import tokenReducer from "./tokenReducer"
import shopRegistrationReducer from './shopRegistrationReducer';
import tokenDetailsReducer from "./tokenDetailsReducer";

const rootReducer = combineReducers({
  loginReducer,
  otpReducer,
  constantReducer,
  tokenReducer,
  shopRegistrationReducer,
  tokenDetailsReducer,
});

export default rootReducer;
