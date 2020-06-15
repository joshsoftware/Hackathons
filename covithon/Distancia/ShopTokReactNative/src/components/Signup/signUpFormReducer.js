
export const signUpFormActions = {
  SET_STORE_NAME: 'setStoreName',
  SET_STORE_TYPE: 'setStoreType',
  SET_ADDRESS: 'setAddress',
  SET_PIN_CODE: 'setPinCode',
  SET_MOBILE_NUMBER: 'setMobileNumber',
  SET_DURATION_OF_SLOTS: 'setDurationOfSlots',
  SET_NO_OF_PEOPLE_IN_SLOTS: 'setNoOfPeopleInSlots',
  SET_STORE_START_TIME: 'setStoreStartTime',
  SET_STORE_END_TIME:'setStoreEndTime',
  SET_UPI_ID: 'setUpiId',
  SET_IS_HOME_DELIVERY_AVAILABILITY: 'setIsHomeDeliveryAvailability',
  SET_TIME_PICKER_VISIBLITY: 'setTimePickerVisiblity',
  SET_CURRENT_TIME_FOCUSED: 'setCurrentTimeFocused',
  SET_ERRORS: 'SET_ERRORS',
};

export const signUpFormInitialState = {
  storeName: null,
  storeType: '',
  address: null,
  pincode: null,
  mobileNumber: null,
  durationOfSlot: '',
  noOfPeopleAllowedInSlots: '',
  storeStartTime: null,
  storeEndTime: null,
  upiId: null,
  isHomeDeliveryAvailable: false,
  isTimePickerVisible: false,
  currentTimeFocused: 'none',
  errors: {},
};

const signUpFormReducer = (state, action) => {
  switch (action.type) {
    case signUpFormActions.SET_STORE_NAME:
      return { ...state, storeName: action.value };
    case signUpFormActions.SET_ADDRESS:
      return { ...state, address: action.value };
    case signUpFormActions.SET_PIN_CODE:
      return { ...state, pincode: action.value };
    case signUpFormActions.SET_MOBILE_NUMBER:
      return { ...state, mobileNumber: action.value };
    case signUpFormActions.SET_DURATION_OF_SLOTS:
      return { ...state, durationOfSlot: action.value };
    case signUpFormActions.SET_NO_OF_PEOPLE_IN_SLOTS:
      return { ...state, noOfPeopleAllowedInSlots: action.value };
    case signUpFormActions.SET_STORE_START_TIME:
      return { ...state, storeStartTime: action.value };
    case signUpFormActions.SET_STORE_END_TIME:
      return { ...state, storeEndTime: action.value };
    case signUpFormActions.SET_UPI_ID:
      return { ...state, upiId: action.value };
    case signUpFormActions.SET_IS_HOME_DELIVERY_AVAILABILITY:
      return { ...state, isHomeDeliveryAvailable: action.value };
    case signUpFormActions.SET_TIME_PICKER_VISIBLITY:
      return { ...state, isTimePickerVisible: action.value };
    case signUpFormActions.SET_CURRENT_TIME_FOCUSED:
      return { ...state, currentTimeFocused: action.value };
    case signUpFormActions.SET_STORE_TYPE:
      return { ...state, storeType: action.value };
    case signUpFormActions.SET_ERRORS:
      return { ...state, errors: action.value };
    default:
      return state;
  }
};

export default signUpFormReducer;
