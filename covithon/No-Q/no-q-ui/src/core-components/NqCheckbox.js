import React, { useState } from "react";
import { FormGroup, Label, Col, Input } from "reactstrap";

const NqCheckbox = (props) => {
  const [checked, setState] = useState(props.checked);
  const onChange = (event) => {
    setState(!checked);
    props.handleChange(event);
  };

  return (
    <FormGroup row>
      <Col md={props.textMd || 6}>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              id={props.id}
              name={props.name}
              placeholder={props.placeholder}
              onChange={onChange}
              checked={checked}
            />
            {props.text}
          </Label>
        </FormGroup>
      </Col>
    </FormGroup>
  );
};
export default NqCheckbox;
