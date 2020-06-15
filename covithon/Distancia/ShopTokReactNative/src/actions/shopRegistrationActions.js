const shopRegistrationActions =  {
  createShop: "CREATE_SHOP",
  createShopSucceeded: "CREATE_SHOP_SUCCEEDED",
  createShopFailed: "CREATE_SHOP_FAILED",
}

export default shopRegistrationActions;

export const createShop = (shopId, body) => ({
  type: shopRegistrationActions.createShop,
  payload: {
    shopId,
    body,
  }
})

export const createShopSucceeded = (response) => ({
  type: shopRegistrationActions.createShopSucceeded,
  payload: {
    ...response
  }
});

export const createShopFailed = (errorResponse) => ({
  type: shopRegistrationActions.createShopFailed,
  payload: {
    ...errorResponse,
    error: true
  }
});
