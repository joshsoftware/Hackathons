const tokenActions = {
  fetchTokens: "FETCH_TOKENS",
  fetchTokensSucceeded: "FETCH_TOKENS_SUCCEEDED",
  fetchTokensFailed: "FETCH_TOKENS_FAILED"
};

export default tokenActions;

export const fetchTokens = selectedDate => ({
  type: tokenActions.fetchTokens,
  payload: selectedDate
});

export const fetchTokensFailed = (errorResponse) => ({  
  type: tokenActions.fetchTokensFailed,
  payload: { ...errorResponse, error: true }
});
