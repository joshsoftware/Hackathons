const loginActions =  {
  login: "LOGIN",
  logout: "LOGOUT",
  logInSucceeded: "LOGIN_SUCCEEDED",
  logInFailed: "LOGIN_FAILED",
  logOutFailed: "LOGOUT_FAILED",
  resetLogin: "RESET_LOGIN",
  resetOtp: 'RESET_OTP',

  generateOTP: "GENERATE_OTP",
  generateOTPSucceeded: "GENERATE_OTP_SUCCEEDED",
  generateOTPFailed: "GENERATE_OTP_FAILED",
}

export default loginActions;

export const logout = () => ({
  type: loginActions.logout,
})

export const submitLogin = (mobileNumber, otp) => ({
  type: loginActions.login,
  payload: {
    mobileNumber,
    otp,
  }
})

export const logInSucceeded = (response) => ({
  type: loginActions.logInSucceeded,
  payload: {
    ...response
  }
});

export const logInFailed = (errorResponse) => ({
  type: loginActions.logInFailed,
  payload: {
    ...errorResponse,
    error: true
  }
});


export const generateOTP = (mobileNumber) => ({
  type: loginActions.generateOTP,
  payload: {
    mobileNumber,
  }
})

export const generateOTPSucceeded = (response) => ({
  type: loginActions.generateOTPSucceeded,
  payload: {
    ...response
  }
});

export const generateOTPFailed = (errorResponse) => ({
  type: loginActions.generateOTPFailed,
  payload: {
    ...errorResponse,
    error: true
  }
});