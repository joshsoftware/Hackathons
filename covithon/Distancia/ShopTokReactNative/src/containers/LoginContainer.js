import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, ActivityIndicator } from "react-native";
import { LoginForm } from "../components/Login/LoginForm";
import { isMobileValid } from "../utils";
import { submitLogin, generateOTP } from "../actions/logInActions";
import { PREFIX } from "../constants";
import { retrieveData } from "../services/storageService";

const LoginContainer = (props) => {
  const {
    navigation: { navigate },
  } = props;
  // TODO use usereducer
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState(null);

  const [otp, setOtp] = useState("");
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [isLoginButtonDisable, setLoginButtonDisable] = useState(true);

  const loginReducer = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const {
    isLoading,
    token,
    data: {
      attributes: { is_registered: isRegistered },
    },
  } = loginReducer;
  
  const otpReducer = useSelector((state) => state.otpReducer);
  const { isLoading: isOtpLoading, isOtpGeneratedSuccessfully } = otpReducer;

  if (isRegistered === false) {
    navigate("Signup");
  }

  if (isRegistered === true) {
    navigate("HomeScreen");
  }

  const onLoginClick = () => {
    // validate mobile number and otp
    // if valid
    // call api and check status for navigation
    // if invalid show error
    dispatch(submitLogin(`${PREFIX}${mobileNumber}`, otp));
  };

  const onMobileNumberFieldFouced = () => {
    setMobileNumberError(null);
  };

  const onGenerateOtpClick = () => {
    // TODO validate mobile
    // CALL API
    if (isMobileValid(mobileNumber)) {
      setMobileNumberError(null);
      // check response and update login and otp visibility
      setLoginButtonDisable(false);
      setIsOtpVisible(true);
      dispatch(generateOTP(`${PREFIX}${mobileNumber}`));
      setOtp('');
    } else {
      setMobileNumberError("Please enter valid mobile number.");
    }
  };

  return (
    <LoginForm
      mobileNumber={mobileNumber}
      setMobileNumber={setMobileNumber}
      otp={otp}
      setOtp={setOtp}
      isOtpVisible={isOtpGeneratedSuccessfully}
      isLoginButtonDisable={isLoginButtonDisable}
      onLoginClick={onLoginClick}
      onGenerateOtpClick={onGenerateOtpClick}
      mobileNumberError={mobileNumberError}
      onMobileNumberFieldFouced={onMobileNumberFieldFouced}
      prefix={PREFIX}
      isLoading={isLoading || isOtpLoading}
    />
  );
};

export default LoginContainer;
