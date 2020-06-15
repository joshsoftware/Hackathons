import tokenDetailsActions from "../actions/tokenDetails";

const initialState = {
  isLoading: false,
  addedComment: false,
  tokenRejected: false,
};

const tokenDetailsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case tokenDetailsActions.fetchDetails:
      return { ...state, ...payload, isLoading: true };

    case tokenDetailsActions.fetchDetailsSucceess:
      return {
        ...state,
        ...payload,
        isLoading: false,
        addedComment: false,
        tokenRejected: false,
      };

    case tokenDetailsActions.fetchDetailsFailed:
      return {
        ...state,
        ...payload,
        isLoading: false,
        addedComment: false,
        tokenRejected: false,
      };

    case tokenDetailsActions.createCommentSuccess:
      return { ...state, addedComment: true };

    case tokenDetailsActions.rejectTokenSuccess:
      return { ...state, tokenRejected: true };

    default:
      return { ...state };
  }
};

export default tokenDetailsReducer;
