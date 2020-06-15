export const durationSlotsData = [
  {
    value: "5min",
  },
  {
    value: "10min",
  },
  {
    value: "15min",
  },
  {
    value: "20min",
  },
  {
    value: "25min",
  },
  {
    value: "30min",
  },
  {
    value: "45min",
  },{
    value: "60min",
  },
];

export const peopleInSlotsData = () => {
  var arr = [];
  for(let i=1; i< 11; i++){
    arr.push({value: i});
  }
  return arr;
}

export const TokenSampleData = [
  {
    tokenNumber: "Token#1",
    slotTime: "10am - 11am",
    mobileNumber: "9764006434",
    isHomeDelivered: true,
  },
  {
    tokenNumber: "Token#2",
    slotTime: "11am - 12am",
    mobileNumber: "9764006434",
    isHomeDelivered: true,
  },
];
