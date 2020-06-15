import tokenActions from "../actions/tokenActions";

const initialState = {
  isLoading: false
};

const tokenReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case tokenActions.fetchTokens:
      return { ...state, ...payload, isLoading: true };

    case tokenActions.fetchTokensSucceeded:
      return { ...state, ...payload, isLoading: false };

    case tokenActions.fetchTokensFailed:
      return { ...state, ...payload, isLoading: false };

    default:
      return state;
  }
};

export default tokenReducer;
