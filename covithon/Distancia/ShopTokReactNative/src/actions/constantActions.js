const constantActions =  {
  getConstants: "GET_CONSTANTS",
  getConstantsSucceeded: "GET_CONSTANTS_SUCCEEDED",
  getConstantsFailed: "GET_CONSTANTS_FAILED",
}

export default constantActions;

export const getConstants = () => ({
  type: constantActions.getConstants,
})

export const getConstantsSucceeded = (response) => ({
  type: constantActions.getConstantsSucceeded,
  payload: {
    ...response
  }
});

export const getConstantsFailed = (errorResponse) => ({
  type: constantActions.getConstantsFailed,
  payload: {
    ...errorResponse,
    error: true
  }
});
