import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = {
  TokenBox: {
    backgroundColor: "white",
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 2,
    borderColor: "#000000",
    height: hp("35%"),
    width: wp("85%"),
    justifyContent: "center",
  },
};

export default styles;
