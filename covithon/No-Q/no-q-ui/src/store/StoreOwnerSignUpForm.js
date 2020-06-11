import React from "react";
import { Formik } from "formik";
import { Form, Card, CardBody, CardHeader } from "reactstrap";
import * as yup from "yup";
import NqInputV from "core-components/NqInputV";
import { NqButtonSubmit } from "core-components/NqButton";

export const StoreOwnerSignUpForm = ({ submitHandler }) => {
  let signUpSchema = yup.object().shape({
    username: yup
      .string()
      .required("Mobile is a required field")
      .length(10, "Invalid mobile number")
      .matches("\\d{10}", "Invalid mobile number"),
    password: yup.string().required("Password is a required field").min(6),
    password_confirmation: yup
      .string()
      .required("Confirm Password is a required field")
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      }),
  });

  return (
    <Card>
      <CardHeader className="bg-dark text-light font-weight-bolder">
        <h2> Sign up </h2>
      </CardHeader>
      <CardBody>
        <div className="container-fluid">
          <Formik
            initialValues={{
              username: "",
              password: "",
              password_confirmation: "",
            }}
            validationSchema={signUpSchema}
            onSubmit={(values) => {
              let body = { ...values, role_id: 1 };
              submitHandler(body);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              //isSubmitting,
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
                <NqInputV
                  id="password_confirmation"
                  type="password"
                  label="Confirm Password"
                  formText=""
                  name="password_confirmation"
                  handleChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password_confirmation}
                  error={
                    touched.password_confirmation &&
                    errors.password_confirmation
                  }
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
