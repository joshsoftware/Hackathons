import React, { useRef } from "react";
import PropTypes from "prop-types";
import { View, ScrollView, Image } from "react-native";
import { Column as Col, Row } from "react-native-flexbox-grid";

import styles from "../../styles/loginStyles";
import commonStyles from "../../styles/commonStyles";
import Button from "../shared/Button";
import TextBox from "../shared/TextBox";
import Loader from "../Loader";

const LoginForm = (props) => {
  const mobileRef = useRef(null);
  const otpRef = useRef(null);

  const {
    mobileNumber,
    setMobileNumber,
    otp,
    setOtp,
    isOtpVisible,
    isLoginButtonDisable,
    onLoginClick,
    onGenerateOtpClick,
    mobileNumberError,
    onMobileNumberFieldFouced,
    isLoading,
    prefix,
  } = props;

  return (
    <ScrollView>
      <Loader isLoading={isLoading} />
      <View style={styles.LoginBackground}>
        <View style={commonStyles.center}>
          <Image
            source={require("../../styles/images/finalLogo.png")}
            style={{ height: 200, width: 200, marginBottom: 50 }}
          />
        </View>
      </View>
      <View style={commonStyles.center}>
        <View style={styles.loginBox}>
          <TextBox
            label="Mobile Number"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            ref={mobileRef}
            onFocus={onMobileNumberFieldFouced}
            keyboardType="phone-pad"
            error={mobileNumberError}
            maxLength={10}
            prefix={prefix}
          />
          {isOtpVisible && (
            <TextBox
              label="OTP"
              value={otp}
              onChangeText={setOtp}
              ref={otpRef}
              secureTextEntry
              keyboardType="phone-pad"
              maxLength={6}
            />
          )}
          <Row size={12}>
            <Col sm={5} md={5} lg={5}>
              <Button
                onPressHandler={onGenerateOtpClick}
                label="Generate OTP"
              />
            </Col>
            <Col sm={5} md={5} lg={5}>
              <Button
                onPressHandler={onLoginClick}
                disabled={isLoginButtonDisable}
                label="Login"
              />
            </Col>
          </Row>
        </View>
      </View>
    </ScrollView>
  );
};

LoginForm.propTypes = {};

export { LoginForm };
