import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import RegisterForm from "./RegisterForm";
import { registerStore, fetchCategories } from "../actions";

const Form = ({
  getCategories,
  store,
  error,
  createStoreHandler,
  categories
}) => {
  useEffect(() => {
    getCategories();
  }, []);

  if (store) {
    return <Redirect to={"/slots"} />;
  } else {
    return (
      <RegisterForm
        submitHandler={createStoreHandler}
        error={error}
        categories={categories}
      />
    );
  }
};

const mapStateToProps = (state) => ({
  error: state.error && state.error.StoreError,
  store: state.store,
  categories: state.categories || [],
});

const mapDispatchToProps = (dispatch) => {
  
  return {
    createStoreHandler: (body) => {
      dispatch(registerStore(body));
    },
    getCategories: () => {
      dispatch(fetchCategories());
    }
  };
  
};

const RegisterFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);

export default RegisterFormContainer;
