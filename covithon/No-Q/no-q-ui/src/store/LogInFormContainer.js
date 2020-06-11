import React from "react";
import { connect } from "react-redux";

import { LogInForm } from "./LogInForm";
import { logInUser } from "../actions";
import { Redirect } from "react-router-dom";

const logInForm = ({
  error,
  authenticated,
  logInHandler,
  isAdmin,
  storeRegistered,
}) => {
  if (isAdmin) {
    return <Redirect to={"/admin/stores"} />;
  } else if (authenticated) {
    if (storeRegistered) {
      return <Redirect to={"/myStore"} />;
    } else {
      return <Redirect to={"/register"} />;
    }
  } else {
    return <LogInForm submitHandler={logInHandler} />;
  }
};

const mapStateToProps = (state) => ({
  error: state.error && state.error.authError,
  authToken: state.authToken,
  authenticated: state.authenticated,
  isAdmin: state.isAdmin,
  storeRegistered: state.storeRegistered,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logInHandler: (body) => {
      dispatch(logInUser(body));
    },
  };
};

const LogInFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(logInForm);

export default LogInFormContainer;
