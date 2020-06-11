import React from "react";
import { Formik } from "formik";
import { Form, Card, CardBody, CardHeader } from "reactstrap";
import * as yup from "yup";
import NqInputV from "core-components/NqInputV";
import { NqButtonSubmit } from "core-components/NqButton";

export const LogInForm = ({ submitHandler }) => {
  let logInSchema = yup.object().shape({
    username: yup
      .string()
      .required("Mobile is a required field")
      .length(10, "Invalid mobile number")
      .matches("\\d{10}", "Invalid mobile number"),
    password: yup.string().required("Password is a required field"),
  });

  return (
    <Card>
      <CardHeader className="bg-dark text-light font-weight-bolder">
        <h2> Login </h2>
      </CardHeader>
      <CardBody>
        <div className="container-fluid">
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={logInSchema}
            onSubmit={(values) => {
              submitHandler(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <NqInputV
                  id="username"
                  type="text"
                  label="Mobile"
                  formText=""
                  name="username"
                  handleChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  error={touched.username && errors.username}
                  required={true}
                />
                <NqInputV
                  id="password"
                  type="password"
                  label="Password"
                  formText=""
                  name="password"
                  handleChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={touched.password && errors.password}
                  required={true}
                />
                <NqButtonSubmit
                  id="submit"
                  type="submit"
                  label="Submit"
                  className="btn-primary"
                  //disabled={isSubmitting}
                />
              </Form>
            )}
          </Formik>
        </div>
      </CardBody>
    </Card>
  );
};
