const tokenDetailsActions = {
  fetchDetails: "FETCH_DETAILS",
  fetchDetailsSucceess: "FETCH_DETAILS_SUCCESS",
  fetchDetailsFailed: "FETCH_DETAILS_FAILED",
  createComment: "CREATE_COMMENT",
  createCommentSuccess: "CREATE_COMMENT_SUCCESS",
  createCommentFailed: "CREATE_COMMENT_FAILED",
  rejectToken: "REJECT_TOKEN",
  rejectTokenSuccess: "REJECT_TOKEN_SUCCESS",
  rejectTokenFailed: "REJECT_TOKEN_FAILED",
};

export default tokenDetailsActions;

export const fetchDetails = selectedTokenId => ({
  type: tokenDetailsActions.fetchDetails,
  payload: selectedTokenId
});

export const createComment = (selectedTokenId, comment) => ({
  type: tokenDetailsActions.createComment,
  payload: { selectedTokenId, body: comment }
});

export const rejectTokenAction = (selectedTokenId) => ({
  type: tokenDetailsActions.rejectToken,
  payload: { selectedTokenId }
});