import logInActions from "../actions/logInActions";

const initialState = {
  isLoading: false,
  isOtpGeneratedSuccessfully: false,
};

const otpReducer = (state = initialState, action) => {
  switch (action.type) {
    case logInActions.generateOTP:
      return {
        ...state,
        ...action.payload,
        isLoading: true,
        isOtpGeneratedSuccessfully: false,
      };
    case logInActions.generateOTPFailed:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isOtpGeneratedSuccessfully: false,
      };
    case logInActions.generateOTPSucceeded:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isOtpGeneratedSuccessfully: true,
      };
    case logInActions.resetOtp:
      return {
        ...initialState
      };

    default:
      return state;
  }
};

export default otpReducer;
