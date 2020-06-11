import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Col, FormFeedback } from "reactstrap";
import Select from "react-select";

const NqTagSelect = (props) => {
  const onChange = (value) => {
    props.handleChange(props.name, value);
  };

  const onBlur = (value) => {
    props.handleBlur(props.name, true);
  };

  let className = props.required ? "required" : "";

  return (
    <FormGroup row className={className}>
      <Label for={props.id} md={props.labelMd || 2}>
        {props.label}
      </Label>
      <Col md={props.textMd || 6}>
        <Select
          value={props.value}
          onChange={onChange}
          errorText={props.touched && props.error}
          options={props.options}
          isMulti={props.multiple}
          name={props.name}
          defaultValue={props.defaultValue}
          onBlur={onBlur}
          invalid={!!props.error}
        />
        <FormFeedback className="d-block"> {props.error} </FormFeedback>
      </Col>
    </FormGroup>
  );
};

NqTagSelect.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  formText: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  handleChange: PropTypes.func,
  multiple: PropTypes.bool,
};

export default NqTagSelect;
