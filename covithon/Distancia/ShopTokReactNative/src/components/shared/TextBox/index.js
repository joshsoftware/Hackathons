import React from "react";
import PropTypes from "prop-types";
import { TextField } from "react-native-material-textfield";
import { marginLeftRight } from "../../../styles/commonStyles";

const TextBox = React.forwardRef((props, ref) => {
  const {
    label,
    value,
    onChangeText,
    onSubmitEditing,
    ...otherProps
  } = props;

  return (
    <TextField
      inputContainerStyle={{...marginLeftRight(7, 7)}}
      label={label}
      contentInset={{
        top: 8,
        input: 4,
      }}
      value={value}
      ref={ref}
      onChangeText={(text) => {
        onChangeText(text);
      }}
      onSubmitEditing={onSubmitEditing}
      returnKeyType="next"
      titleTextStyle={marginLeftRight(7, 7)}
      enablesReturnKeyAutomatically
      {...otherProps}
    />
  );
});

TextBox.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
};

TextBox.defaultProps = {
  onSubmitEditing: () => {},
}

export default TextBox;
