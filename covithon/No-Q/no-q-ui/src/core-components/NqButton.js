import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

const NqButton = (props) => {
  return (
    <Button
      color={props.color}
      type={props.type}
      id={props.id}
      className={props.className}
      onClick={props.handleClick}
      {...props}
    >
      {props.label}
    </Button>
  );
};

const NqButtonSubmit = (props) => <NqButton color="success" {...props} />;

NqButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  color: PropTypes.string,
  handleClick: PropTypes.func,
};

export { NqButtonSubmit };
export default NqButton;
