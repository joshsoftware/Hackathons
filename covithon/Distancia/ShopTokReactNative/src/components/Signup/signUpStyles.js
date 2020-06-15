import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import config from "../../styles/config";

const styles = {
  signupBox: {
    backgroundColor: "white",
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 2,
    borderColor: "#000000",
    height: hp("80%"),
    width: wp("85%"),
  },
  signupBoxBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: config.backgroundColor,
  }
};

export default styles;
