export const isMobileValid = (mobileNo) => {
  const mobileFormat =  /^[5-9]\d{9}$/;
  return mobileFormat.test(mobileNo);
}