import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const RegisterScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      
      <TextInput placeholder="Nome" style={styles.input} />
      <TextInput placeholder="E-mail" style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Senha" style={styles.input} secureTextEntry />
      
      <Button title="Registrar" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default RegisterScreen;
