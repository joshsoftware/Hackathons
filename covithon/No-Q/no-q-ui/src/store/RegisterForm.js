import React from "react";
import { Formik } from "formik";
import { Form, Card, CardBody, CardHeader } from "reactstrap";
import * as yup from "yup";
import NqInputV from "core-components/NqInputV";
import NqTagSelect from "core-components/NqTagSelect";
import { WEEK_DAYS } from "constants/optionsConstants";

import { NqButtonSubmit } from "core-components/NqButton";

import PlacesAutoCompleteSearchBox from "core-components/NqPlacesAutocompleteSearchBox";

import { createOptions } from "utils";

const RegisterForm = ({ submitHandler, categories }) => {
  let optionCategories = createOptions(categories);
  let schema = yup.object().shape({
    name: yup.string().required(),
    address: yup.string().required(),
    city: yup.string(),
    state: yup.string(),
    capacity: yup.number().required(),
    pincode: yup.string().required()
    .length(6, "Invalid pincode")
    .matches('\\d{6}', 'Invalid pincode'),
    duration: yup.number().required(),
    opening_time: yup.string(),
    closing_time: yup.string(),
    available_days: yup
      .array()
      .required()
      .of(
        yup.object().shape({
          label: yup.string().required(),
          value: yup.string().required(),
        })
      ),
    categories: yup
      .array()
      .required()
      .of(
        yup.object().shape({
          label: yup.string().required(),
          value: yup.string().required(),
        })
      ),
  });

  return (
    <Card>
      <CardHeader className="bg-dark text-light font-weight-bolder">
        <h2> Register your store </h2>
      </CardHeader>
      <CardBody>
        <div className="container-fluid">
          <Formik
            enableReinitialize={false}
            initialValues={{
              name: "",
              address: "",
              city: "",
              state: "",
              pincode: "",
              duration: 5,
              capacity: 1,
              opening_time: "09:00",
              closing_time: "18:00",
              categories: [],
              available_days: WEEK_DAYS,
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
              let store = { ...values };
              store.category_ids = store.categories.map(
                (category) => category.value
              );
              let daysIndex = store.available_days.map((day) => day.value);
              store.available_days = WEEK_DAYS.map((day) =>
                daysIndex.includes(day.value) ? 1 : 0
              ).join("");

              submitHandler(store);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              setFieldTouched,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <NqInputV
                  id="name"
                  type="text"
                  label="Name"
                  formText="Avengers General Store"
                  name="name"
                  handleChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  error={touched.name && errors.name}
                  required={true}
                />

                <NqTagSelect
                  id="categories"
                  label="Category(s)"
                  name="categories"
                  handleBlur={setFieldTouched}
                  value={values.categories}
                  options={optionCategories}
                  multiple={true}
                  defaultValue={[optionCategories[0]]}
                  error={touched.categories && errors.categories}
                  handleChange={setFieldValue}
                  touched={touched.categories}
                  required={true}
                />
                <PlacesAutoCompleteSearchBox id = "address" label= "Address" 
                  onPlaceSelected = {setFieldValue}/>
                
                <NqInputV
                  id="pincode"
                  type="text"
                  label="Pincode"
                  formText="416003"
                  name="pincode"
                  handleChange={handleChange}
                  onBlur={handleBlur}
                  value={values.pincode}
                  error={touched.pincode && errors.pincode}
                  required={true}
                />
                <NqInputV
                  id="opening_time"
                  type="time"
                  label="Opening Time"
                  name="opening_time"
                  handleChange={handleChange}
                  onBlur={handleBlur}
                  value={values["opening_time"]}
                  error={touched["opening_time"] && errors["opening_time"]}
                  required={true}
                />
                <NqInputV
                  id="closing_time"
                  type="time"
                  label="Closing Time"
                  name="closing_time"
                  handleChange={handleChange}
                  onBlur={handleBlur}
                  value={values["closing_time"]}
                  error={touched["closing_time"] && errors["closing_time"]}
                  required={true}
                />
                <NqInputV
                  id="duration"
                  type="number"
                  label="Duration in mins"
                  formText="5 mins"
                  name="duration"
                  handleChange={handleChange}
                  onBlur={handleBlur}
                  value={values.duration}
                  error={touched.duration && errors.duration}
                  required={true}
                />
                <NqInputV
                  id="capacity"
                  type="number"
                  label="Capacity"
                  formText="3"
                  name="capacity"
                  handleChange={handleChange}
                  onBlur={handleBlur}
                  value={values.capacity}
                  error={touched.capacity && errors.capacity}
                  required={true}
                />
                <NqTagSelect
                  id="available_days"
                  label="Available days"
                  name="available_days"
                  handleBlur={setFieldTouched}
                  value={values["available_days"]}
                  options={WEEK_DAYS}
                  multiple={true}
                  defaultValue={WEEK_DAYS}
                  error={touched["available_days"] && errors["available_days"]}
                  handleChange={setFieldValue}
                  required={true}
                />
                <NqButtonSubmit
                  id="submit"
                  type="submit"
                  label="Submit"
                  className="btn-primary"
                  disabled={isSubmitting}
                />
              </Form>
            )}
          </Formik>
        </div>
      </CardBody>
    </Card>
  );
};

export default RegisterForm;
