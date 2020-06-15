import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const style = {
  text: {
    color: "white",
    marginTop: hp("1%"),
    fontSize: hp("1.8%"),
    fontWeight: "bold",
  },
  touchableOpacity : {
    alignItems: "center",
    backgroundColor: "#1d5e81",
    padding: "2%",
    height: hp("6%"),
    width: wp("30%"),
    marginLeft: wp("9%"),
    marginTop: wp("12%"),
    marginBottom: wp("4%"),
  },
  disableStyle: {
    backgroundColor: "#568098",
    opacity: 0.5,
  }
};

export default style;
