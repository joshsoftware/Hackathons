import React, { useState } from "react";
import SideMenu from "react-native-side-menu";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ToastAndroid,
} from "react-native";
import Menu from "../components/Menu/SideMenu";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../actions/logInActions";
import { removeItemValue } from "../services/storageService";

const image = require("../styles/images/menu.png");

class ContentView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{"\n"}
          Cmd+Control+Z for dev menu
        </Text>
      </View>
    );
  }
}

const SideMenuContainer = (props) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(isOpen => !isOpen);
  };

  const onChange = (onChangeValue) => {
    setIsOpen(onChangeValue);
  }

  const logout = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Logout",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
    dispatch(logoutAction());
    props.navigation.navigate("Login");
  };
  const menu = (
    <Menu onItemSelected={props.navigation.navigate} logout={logout} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SideMenu menu={menu} isOpen={isOpen} onChange={onChange}>
        {/* <ContentView /> */}
        {props.children}
        <TouchableOpacity onPress={toggle} style={styles.button}>
          <Image source={image} style={{ width: 32, height: 32 }} />
        </TouchableOpacity>
      </SideMenu>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 20,
    padding: 10,
  },
  caption: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});

export default SideMenuContainer;
