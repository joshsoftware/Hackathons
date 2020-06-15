import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./LoginContainer";
import SingUpScreen from "./SignUpContainer";
import HomeScreen from "./HomeContainer";
import TokenDetailScreen from "./TokenDetailContainer";

const Stack = createStackNavigator();
const AppContainer = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SingUpScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="TokenDetailScreen" component={TokenDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
