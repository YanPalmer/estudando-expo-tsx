import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import MenuScreen from "./src/screens/MenuScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

// Testando
import Toast from 'react-native-toast-message';

// Define quais telas existem na navegação
export type RootStackParamList = {
  Login: undefined;
  Menu: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
      <Toast />
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
    </NavigationContainer>
  );
}
