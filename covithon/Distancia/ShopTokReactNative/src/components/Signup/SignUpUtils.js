export const getSignUpObject = (signUpFromData) => {
  const {
    storeName,
    storeType,
    address,
    pincode,
    mobileNumber,
    durationOfSlot,
    noOfPeopleAllowedInSlots,
    storeStartTime,
    storeEndTime,
    upiId,
    isHomeDeliveryAvailable,
  } = signUpFromData;

  return {
    shop: {
      mobile_number: mobileNumber,
      shop_name: storeName,
      shop_type: storeType,
      address_line_1: address,
      starting_time: storeStartTime.split(':').join(''),
      closing_time: storeEndTime.split(':').join(''),
      capacity_per_slot: noOfPeopleAllowedInSlots,
      slot_duration: durationOfSlot.split('min')[0],
      pincode: pincode,
      city: "",
      state: "",
      upi_payment_id: upiId,
      is_home_delivery_available: isHomeDeliveryAvailable,
    },
  };
};

export const getShopTypesData = (shopTypes) => {
  const arr = [];
  for( const key in shopTypes) {
    arr.push({
      label: key,
      value: shopTypes[key],
    })
  }
  return arr;
}