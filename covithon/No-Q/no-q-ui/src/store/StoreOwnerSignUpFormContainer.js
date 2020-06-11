import React from "react";
import { connect } from "react-redux";

import { StoreOwnerSignUpForm } from "./StoreOwnerSignUpForm";
import { addStoreOwner } from "../actions";
import { Redirect } from "react-router-dom";

const storeOwnerSignUpForm = ({
  authToken,
  authenticated,
  newStoreOwnerHandler,
}) => {
  if (authenticated) {
    return <Redirect to={"/register"} />;
  } else {
    return <StoreOwnerSignUpForm submitHandler={ newStoreOwnerHandler }/>
  }
};

const mapStateToProps = (state) => ({
  error: state.error && state.error.authError,
  authToken: state.authToken,
  authenticated: state.authenticated,
});

const mapDispatchToProps = (dispatch) => {
    return {
      newStoreOwnerHandler: (body) => {
        //body["role_id"] = 1;
        dispatch(addStoreOwner(body));
      },
    };
};

const SignUpFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(storeOwnerSignUpForm);

export default SignUpFormContainer;
