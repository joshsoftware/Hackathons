import React from "react";
import { Formik } from "formik";
import { Form, Card, CardBody, CardHeader } from "reactstrap";
import * as yup from "yup";

import NqInputV from "core-components/NqInputV";
import NqTagSelect from "core-components/NqTagSelect";
import { NqButtonSubmit } from "core-components/NqButton";

import { createOptions } from "utils";

const StoreListFilter = ({ submitHandler, categories }) => {
  let optionCategories = createOptions(categories || []);

  let schema = yup.object().shape({
    pincode: yup.string().required(),
    category_ids: yup.array().of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
    ),
  });

  return (
    <Card>
      <CardHeader className="bg-dark text-light font-weight-bolder">
        <h2> Find stores near to you </h2>
      </CardHeader>
      <CardBody>
        <div className="container-fluid">
          <Formik
            enableReinitialize={false}
            initialValues={{
              pincode: "",
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
              let store = { ...values };
              if (store.category_ids) {
                store.category_ids = store.category_ids
                  .map((category) => category.value)
                  .join(",");
              }
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
                <NqTagSelect
                  id="category_ids"
                  label="Category(s)"
                  name="category_ids"
                  handleBlur={setFieldTouched}
                  value={values.category_ids}
                  options={optionCategories}
                  multiple={true}
                  error={touched.category_ids && errors.category_ids}
                  handleChange={setFieldValue}
                />
                <NqButtonSubmit
                  id="submit"
                  type="submit"
                  label="Filter"
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

export default StoreListFilter;
