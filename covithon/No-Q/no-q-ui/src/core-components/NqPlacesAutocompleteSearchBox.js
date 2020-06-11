import React from "react";
import { FormGroup, Label, Col } from "reactstrap";
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import { GOOGLE_API_KEY } from "constants/apiConstants";

const PlacesAutoCompleteSearchBox = (props) => {
    return (
        <FormGroup row>
            <Label for={props.id} md={props.labelMd || 2}>
                {props.label}
            </Label>
            <Col md={props.textMd || 6}>
            <ReactGoogleAutocomplete id= "address" class = "w-100" 
                apiKey = {GOOGLE_API_KEY}
                onPlaceSelected={(place, input) => {
                    props.onPlaceSelected(props.id, input.value , false)
                }}
                types={['establishment']}
                componentRestrictions={{country: "in"}}
            />
            </Col>
        </FormGroup>
    )
}

export default PlacesAutoCompleteSearchBox