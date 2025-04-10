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

// Cria uma navegação em forma de pilha - Cada nova tela fica por cima da anterior
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

// Lembrando que só Funciona fora do código TSX{}
// Comentário simples
// * Informação importante
// ! Deprecated method, do not use
// ? Should this method be exposed in the public API?
// TODO: refactor this method so that it conforms to the API