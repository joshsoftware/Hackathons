import shopRegistrationAcitons from "../actions/shopRegistrationActions";

const initialState = {
  isLoading: false,
  isShopCreatedSuccessfully: false,
};

const shopRegistrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case shopRegistrationAcitons.createShop:
      return {
        ...state,
        ...action.payload,
        isLoading: true,
        isShopCreatedSuccessfully: false,
      };
    case shopRegistrationAcitons.createShopSucceeded:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isShopCreatedSuccessfully: true,
      };
    case shopRegistrationAcitons.createShopFailed:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isShopCreatedSuccessfully: false,
      };
    default:
      return state;
  }
};

export default shopRegistrationReducer;
