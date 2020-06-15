import constantActions from "../actions/constantActions";

const initialState = {
  isLoading: false,
  data : {
    shop_types: {},
  }
};

const constantReducer = (state = initialState, action) => {
  switch (action.type) {
    case constantActions.getConstants:
      return { ...state, ...action.payload, isLoading: false };
    case constantActions.getConstantsSucceeded:
      return { ...state, ...action.payload, isLoading: false };
    case constantActions.getConstantsFailed:
      return { ...state, ...action.payload, isLoading: true };
    default:
      return state;
  }
};

export default constantReducer;