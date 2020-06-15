import React, { useState } from "react";
import PropTypes from "prop-types";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./style";

const DatePickerFilter = (props) => {
  const {
    isDatePickerVisible,
    onDateSubmit,
    onDateCancel,
    onDatePickerPress,
    selectedDate,
  } = props;

  return (
    <>
      <Icon
        style={styles.calendar}
        name="calendar"
        size={30}
        onPress={onDatePickerPress}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={onDateSubmit}
        onCancel={onDateCancel}
        date={selectedDate}
      />
    </>
  );
};

DatePickerFilter.propTypes = {};

export default DatePickerFilter;
