import {
  REGISTER_STORE,
  SET_STORE_ERROR,
  SET_SLOTS,
  ADD_STORE_OWNER,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILURE,
  SET_STORE,
  FETCH_CATEGORIES,
  SET_CATEGORIES,
  LOG_IN_USER,
  SET_INACTIVE_SLOTS,
  SET_STORES,
  FETCH_STORES,
  FETCH_ADMIN_STORES,
  DISABLE_STORE,
  GET_STORE_DETAILS,
} from "../constants/actionConstants";

export const registerStore = (store) => ({
  type: REGISTER_STORE,
  store: store,
});

export const setStore = (store) => ({
  type: SET_STORE,
  store: store,
});

export const setStoreError = (error) => ({
  type: SET_STORE_ERROR,
  error: error,
});

export const addStoreOwner = (owner) => ({
  type: ADD_STORE_OWNER,
  user: owner,
});

export const setAuthSuccess = (data) => ({
  type: AUTHENTICATION_SUCCESS,
  data,
});

export const setAuthFailure = (error) => ({
  type: AUTHENTICATION_FAILURE,
  error: error,
});

export const fetchCategories = () => ({
  type: FETCH_CATEGORIES,
});

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  categories: categories,
});

export const logInUser = (user) => ({
  type: LOG_IN_USER,
  user: user,
});

export const setInactiveSlots = (slots) => ({
  type: SET_INACTIVE_SLOTS,
  slots: slots,
});

export const fetchStores = (filterParams) => ({
  type: FETCH_STORES,
  filterParams,
});

export const setStores = (stores) => ({
  type: SET_STORES,
  stores,
});

export const fetchAdminStores = () => ({
  type: FETCH_ADMIN_STORES,
});

export const disableStore = (id) => ({
  type: DISABLE_STORE,
  id,
});

export const getStoreDetails = () => ({
  type: GET_STORE_DETAILS,
});
