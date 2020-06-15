import React from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from "react-native";
// import { Icon } from 'react-native-vector-icons/Icon';
import Icon from "react-native-vector-icons/FontAwesome";

const window = Dimensions.get("window");
const uri = "https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png";

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: "gray",
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: "absolute",
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: "300",
    paddingTop: 5,
  },
  signout: { color: "black", position: "absolute", left: 200, top: 10 },
});

export default function Menu({ onItemSelected, logout }) {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{ uri }} />
        <Text style={styles.name}>Welcome</Text>
        <Icon style={styles.signout} name="sign-out" size={30} onPress={logout} />
      </View>

      <Text onPress={() => onItemSelected("HomeScreen")} style={styles.item}>
        Home
      </Text>
    </ScrollView>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
