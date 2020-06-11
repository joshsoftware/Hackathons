import React from "react";
import PropTypes from "prop-types";
import {
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  FormFeedback,
} from "reactstrap";

const NqInputV = (props) => {
  let className = props.required ? "required" : "";
  return (
    <FormGroup row className={className}>
      <Label for={props.id} md={props.labelMd || 2}>
        {props.label}
      </Label>
      <Col md={props.textMd || 6}>
        <Input
          type={props.type}
          name={props.name}
          id={props.id}
          placeholder={props.placeholder}
          onChange={props.handleChange}
          value={props.value}
          invalid={!!props.error}
        />
        <FormFeedback> {props.error}</FormFeedback>
        <FormText>{props.formText}</FormText>
      </Col>
    </FormGroup>
  );
};

NqInputV.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  formText: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  handleChange: PropTypes.func,
};

export default NqInputV;
