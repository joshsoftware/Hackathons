import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-native-material-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Column as Col, Row } from "react-native-flexbox-grid";
import { View, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements";

import { scrollViewStyle } from "../../styles/commonStyles";
import styles from "./signUpStyles";
import { marginLeftRight } from "../../styles/commonStyles";
import TextBox from "../shared/TextBox";
import Button from "../shared/Button";
import { durationSlotsData, peopleInSlotsData } from "./constant";
import { signUpFormActions } from "./signUpFormReducer";
import { PREFIX } from "../../constants";
import Loader from "../Loader";

const SignUpForm = (props) => {
  const {
    signUpFromData,
    signUpFromDispatch,
    onRegisterPressed,
    storeTypes,
    isLoading,
  } = props;

  const {
    storeName,
    storeType,
    address,
    pincode,
    mobileNumber,
    durationOfSlot,
    noOfPeopleAllowedInSlots,
    storeStartTime,
    storeEndTime,
    upiId,
    isTimePickerVisible,
    currentTimeFocused,
    errors,
    isHomeDeliveryAvailable,
  } = signUpFromData;

  const showDatePicker = (val) => {
    signUpFromDispatch({
      type: signUpFormActions.SET_TIME_PICKER_VISIBLITY,
      value: true,
    });
    // Setting which textfield is focus to update reducer state accordingly
    // e.g if start time text field is focus it should update start time in reducer state
    signUpFromDispatch({
      type: signUpFormActions.SET_CURRENT_TIME_FOCUSED,
      value: val,
    });
  };

  const hideDatePicker = () => {
    signUpFromDispatch({
      type: signUpFormActions.SET_TIME_PICKER_VISIBLITY,
      value: false,
    });
  };

  const handleConfirmTime = (date) => {
    hideDatePicker();
    const dt = new Date(date);
    const hourPrefix = dt.getHours() < 10 ? '0' : '';
    const minutesPrefix = dt.getMinutes() < 10 ? '0' : '';

    const time = `${hourPrefix}${dt.getHours()}:${minutesPrefix}${dt.getMinutes()}`;
    signUpFromDispatch({
      type:
        currentTimeFocused === "start"
          ? signUpFormActions.SET_STORE_START_TIME
          : signUpFormActions.SET_STORE_END_TIME,
      value: time,
    });
    setTimeVisiblity("none");
    signUpFromDispatch({
      type: signUpFormActions.SET_CURRENT_TIME_FOCUSED,
      value: "none",
    });
  };

  return (
    <ScrollView contentContainerStyle={scrollViewStyle}>
      <Loader isLoading={isLoading}></Loader>
      <View style={styles.signupBoxBackground}>
        <View style={styles.signupBox}>
          <ScrollView contentContainerStyle={scrollViewStyle}>
            <TextBox
              label="Store Name"
              value={storeName}
              onChangeText={(text) => {
                signUpFromDispatch({
                  type: signUpFormActions.SET_STORE_NAME,
                  value: text,
                });
              }}
              error={errors.storeName}
              maxLength={100}
            />
            <Dropdown
              label="Store Type"
              value={storeType}
              data={storeTypes}
              containerStyle={marginLeftRight(7, 7)}
              onChangeText={(text, index, data) => {
                signUpFromDispatch({
                  type: signUpFormActions.SET_STORE_TYPE,
                  value: data[index].value,
                });
              }}
              error={errors.storeType}
            />
            <CheckBox
              checked={isHomeDeliveryAvailable}
              title="Is home delivery available"
              onPress={() => {
                signUpFromDispatch({
                  type: signUpFormActions.SET_IS_HOME_DELIVERY_AVAILABILITY,
                  value: !isHomeDeliveryAvailable,
                });
              }}
              containerStyle={{
                ...marginLeftRight(7,7)
              }}
            />
            <TextBox
              label="Address"
              value={address}
              onChangeText={(text) => {
                signUpFromDispatch({
                  type: signUpFormActions.SET_ADDRESS,
                  value: text,
                });
              }}
              multiline
              error={errors.address}
              maxLength={200}
            />
            <TextBox
              label="Pincode"
              keyboardType="phone-pad"
              value={pincode}
              onChangeText={(text) => {
                signUpFromDispatch({
                  type: signUpFormActions.SET_PIN_CODE,
                  value: text,
                });
              }}
              error={errors.pincode}
              maxLength={6}
            />
            <TextBox
              label="Mobile number"
              disabled
              value={mobileNumber}
              onChangeText={(text) => {
                signUpFromDispatch({
                  type: signUpFormActions.SET_MOBILE_NUMBER,
                  value: text,
                });
              }}
              // maxLength={13}
              keyboardType="phone-pad"
              error={errors.mobileNumber}
              // prefix={PREFIX}
            />
            <Dropdown
              label="Duration of slots"
              value={durationOfSlot}
              data={durationSlotsData}
              containerStyle={marginLeftRight(7, 7)}
              onChangeText={(text) => {
                signUpFromDispatch({
                  type: signUpFormActions.SET_DURATION_OF_SLOTS,
                  value: text,
                });
              }}
              error={errors.durationOfSlot}
            />
            <Dropdown
              label="No. of people allowed in slots"
              data={peopleInSlotsData()}
              value={noOfPeopleAllowedInSlots}
              containerStyle={marginLeftRight(7, 7)}
              onChangeText={(text) => {
                signUpFromDispatch({
                  type: signUpFormActions.SET_NO_OF_PEOPLE_IN_SLOTS,
                  value: text,
                });
              }}
              error={errors.noOfPeopleAllowedInSlots}
            />
            <Row size={12}>
              <Col smOffset={1} mdOffset={1} lgOffset={1} sm={5} md={5} lg={5}>
                <TextBox
                  key={storeStartTime}
                  value={storeStartTime}
                  label="Store start time"
                  onFocus={() => {
                    showDatePicker("start");
                  }}
                  error={errors.storeStartTime}
                />
              </Col>
              <Col sm={5} md={5} lg={5}>
                <TextBox
                  key={storeEndTime}
                  value={storeEndTime}
                  label="Store end time"
                  onFocus={() => {
                    showDatePicker("end");
                  }}
                  error={errors.storeEndTime}
                />
              </Col>
            </Row>

            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleConfirmTime}
              onCancel={hideDatePicker}
            />

            <TextBox
              label="Upi id"
              value={upiId}
              onChangeText={(text) => {
                signUpFromDispatch({
                  type: signUpFormActions.SET_UPI_ID,
                  value: text,
                });
              }}
              maxLength={100}
              error={errors.upiId}
            />
          </ScrollView>
        </View>
        <Button
          label="Register"
          onPressHandler={onRegisterPressed}
          touchableOpacityStyle={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 0,
            backgroundColor: "white",
          }}
          textStyle={{
            color: "#1d5e81",
          }}
        />
      </View>
    </ScrollView>
  );
};

SignUpForm.propTypes = {
  signUpFromData: PropTypes.object,
  signUpFromDispatch: PropTypes.func,
  onRegisterPressed: PropTypes.func,
};

export default SignUpForm;
