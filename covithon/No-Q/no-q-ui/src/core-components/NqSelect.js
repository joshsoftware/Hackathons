import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input, Col } from "reactstrap";

const NqOption = ({ options }) =>
  options.map((option, index) => <option key={index}> {option}</option>);

const NqSelect = (props) => {
  return (
    <FormGroup row>
      <Label for={props.id} md={props.labelMd || 2}>
        {props.label}
      </Label>
      <Col md={props.textMd || 6}>
        <Input
          type="select"
          name={props.name}
          id={props.id}
          placeholder={props.placeholder}
          onChange={props.handleChange}
          value={props.value}
          {...props}
        >
          <NqOption options={props.options} />
        </Input>
      </Col>
    </FormGroup>
  );
};

NqSelect.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  formText: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  handleChange: PropTypes.func,
};

export default NqSelect;
