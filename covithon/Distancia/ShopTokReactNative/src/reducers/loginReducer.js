import logInActions from "../actions/logInActions";
import { removeItemValue } from "../services/storageService";

const initialState = {
  isLoading: false,
  isRedirectSignup: false,
  token: null,
  data: {
    attributes : {
      // is_registered: true
    }
  },
  mobileNumber: null,
  // mobileNumber: '9764006434',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case logInActions.logInSucceeded:
      return { ...state, ...action.payload, isLoading: false };
    case logInActions.logInFailed:
      return { ...state, ...action.payload, isLoading: false };
    case logInActions.login:
      return { ...state, ...action.payload, isLoading: true };
    case logInActions.logOutFailed:
    return { ...state, ...action.payload, isLoading: false };
    case logInActions.resetLogin:
      removeItemValue('auth');
      return { ...initialState};
    default:
      return state;
  }
};

export default loginReducer;