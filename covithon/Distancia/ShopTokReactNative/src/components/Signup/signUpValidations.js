import * as yup from "yup"; // TODO  import required thing

const options = {
  abortEarly: false,
};

const errorMessages = {
  storeName: "Please entered store name.",
  address: "Please entered address.",
  pincode: "Please entered valid pincode.",
  mobileNumber: "Please entered valid mobile number.",
  durationOfSlot: "Duration of slots can't be blank.",
  noOfPeopleAllowedInSlots: "Number of people can't be blank",
  storeStartTime: "Please select store start time.",
  storeEndTime: "Please select store end time.",
  upiId: "Please enter upi id.",
  upiIdInvalid: "Please enter valid upi id.",
  storeType: "Please select store type",
};
const upiRegExp = /^\w+@\w+$/;

export const schema = yup.object().shape({
  storeName: yup.string().nullable().required(errorMessages.storeName),
  storeType: yup.string().nullable().required(errorMessages.storeType),
  address: yup.string().nullable().required(errorMessages.storeName),
  pincode: yup.string().nullable().required(errorMessages.storeName),
  // mobileNumber: yup
  //   .string()
  //   .nullable()
  //   .matches(phoneRegExp, errorMessages.mobileNumber)
  //   .required(errorMessages.mobileNumber),
  durationOfSlot: yup.string().nullable().required(errorMessages.durationOfSlot),
  noOfPeopleAllowedInSlots: yup.string().nullable().required(errorMessages.noOfPeopleAllowedInSlots),
  storeStartTime: yup.string().nullable().required(errorMessages.storeStartTime),
  storeEndTime: yup.string().nullable().required(errorMessages.storeEndTime),
});

export const isValid = (obj, dispatch) => {
  const result = schema.isValidSync(obj);
  if (result === false) {
    schema.validate(obj, options).catch((err) => {
      const errors = {};
      err.inner.forEach((ele) => {
        errors[ele.path] = ele.message;
      });
      dispatch({
        type: "SET_ERRORS",
        value: errors,
      });
    });
  }
  dispatch({
    type: "SET_ERRORS",
    value: {},
  });
  return result;
};
