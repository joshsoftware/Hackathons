import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import config from './config';

const styles = {
  button: {
    alignItems: "center",
    backgroundColor: "#1d5e81",
    padding: "2%",
    height: hp("6%"),
    width: wp("30%"),
    marginLeft: wp("9%"),
    marginTop: wp("12%"),
    marginBottom: wp("4%"),
  },
  loginBox: {
    backgroundColor: "white",
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 2,
    borderColor: "#000000",
    height: hp("35%"),
    width: wp("85%"),
    bottom: "5%",
    justifyContent: "center",
  },
  LoginBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: config.backgroundColor,
    height: hp("40%"),
    alignItems: "center",
  }
};

export default styles;
