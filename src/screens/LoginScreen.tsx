import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, Image, TouchableOpacity, Platform } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { FontAwesome } from "@expo/vector-icons";

// Toast para Android
import Toast from "react-native-toast-message";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      navigation.replace("Menu"); // Navega para a tela de Menu e remove a tela de Login do histórico
    }
    else {
      if (Platform.OS !== "web") {
        // Exibe toast no celular
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Usuário ou senha incorretos",
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/yan-logo.png')} />
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Enter your username and password to login</Text>

      <View style={styles.inputContainer}>
        {/* <TextInput placeholder="Username" style={styles.input} /> */}
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Username?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        {/* <TextInput placeholder="Password" secureTextEntry style={styles.input} /> */}
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or login in with</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={20} color="#DB4437" />
          <Text style={styles.socialText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={20} color="#1877F2" />
          <Text style={styles.socialText}>Facebook</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.registerText}>Don't have an account? <Text style={styles.registerLink} onPress={() => navigation.navigate("Register")}>Register</Text></Text>
      <Text style={styles.helpText}>Need help? Visit our <Text style={styles.helpLink}>help center</Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  logo: { width: 80, height: 80, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 14, color: "gray", textAlign: "center", marginBottom: 20, marginTop: 5 },
  inputContainer: { width: "100%", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "gray", padding: 10, width: "100%", borderRadius: 5 },
  forgotText: { color: "gray", textAlign: "right", marginTop: 5 },
  loginButton: { backgroundColor: "#333", padding: 15, width: "100%", alignItems: "center", borderRadius: 5, marginBottom: 10 },
  loginText: { color: "white", fontSize: 16 },
  orText: { marginVertical: 10, color: "gray" },
  socialContainer: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  socialButton: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "gray", padding: 10, width: "48%", justifyContent: "center", borderRadius: 5 },
  socialText: { marginLeft: 10 },
  registerText: { marginTop: 20 },
  registerLink: { color: "blue" },
  helpText: { marginTop: 10 },
  helpLink: { color: "blue" }
});
