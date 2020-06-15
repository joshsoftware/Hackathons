import React, { useReducer, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SignUpForm from "../components/Signup/SignUpForm";
import signUpFormReducer, {
  signUpFormInitialState,
} from "../components/Signup/signUpFormReducer";
import { isValid } from "../components/Signup/signUpValidations";
import {
  getSignUpObject,
  getShopTypesData,
} from "../components/Signup/SignUpUtils";
import { getConstants } from "../actions/constantActions";
import { createShop } from "../actions/shopRegistrationActions";

const SingUpContainer = (props) => {
  const {
    navigation: { navigate },
  } = props;
  const dispatch = useDispatch();
  const loginReducer = useSelector((state) => state.loginReducer);
  const { isShopCreatedSuccessfully, isLoading } = useSelector(
    (state) => state.shopRegistrationReducer
  );

  const {
    mobileNumber,
    data: { id: shopId },
  } = loginReducer;
  const {
    data: { shop_types: shopTypes },
  } = useSelector((state) => state.constantReducer);

  const [signUpFromData, signUpFromDispatch] = useReducer(signUpFormReducer, {
    ...signUpFormInitialState,
    mobileNumber,
  });

  const onRegisterPressed = () => {
    if (isValid(signUpFromData, signUpFromDispatch)) {
      const body = getSignUpObject(signUpFromData);
      dispatch(createShop(shopId, body));
    }
  };

  useEffect(() => {
    if (isShopCreatedSuccessfully === true) {
      navigate("HomeScreen");
    }
  }, [isShopCreatedSuccessfully]);

  useEffect(() => {
    dispatch(getConstants());
  }, []);

  return (
    <SignUpForm
      storeTypes={getShopTypesData(shopTypes)}
      signUpFromData={signUpFromData}
      signUpFromDispatch={signUpFromDispatch}
      onRegisterPressed={onRegisterPressed}
      isLoading={isLoading}
    />
  );
};

export default SingUpContainer;
