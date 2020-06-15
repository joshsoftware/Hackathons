import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text } from 'react-native';
import styles from "./style";

const Button = (props) => {
  const { onPressHandler, label, touchableOpacityStyle, disabled, textStyle } = props;

  let touchableStyles = {
    ...styles.touchableOpacity,
    ...touchableOpacityStyle,
  };

  if (disabled === true ) {
    touchableStyles = {
      ...styles.touchableOpacity,
      ...styles.disableStyle
    }
  }

  const buttonTextStyle = {
    ...styles.text,
    ...textStyle,
  }

  return (
    <TouchableOpacity
      style={touchableStyles}
      onPress={onPressHandler}
      disabled={disabled}
    >
      <Text
        style={buttonTextStyle}
      >
        { label }
      </Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  onPressHandler: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

Button.defaultProps = {
  disabled: false,
}

export default Button;
