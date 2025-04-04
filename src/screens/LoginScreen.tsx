import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, Image, TouchableOpacity, Platform } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { FontAwesome } from "@expo/vector-icons";

// Toast para Android
import Toast from "react-native-toast-message";

// Definindo props da tela
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const Usuario = {
  username: "admin",
  password: "1234",
}

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (Platform.OS === "android") {
      if (!username && !password) { // Verifica se os campos username e password estão vazios
        Toast.show({
          type: "error",
          text1: "Campos obrigatórios",
          text2: "Preencha nome de usuário e senha",
        });
        return;
      }
      if (!username) { // Verifica o username
        Toast.show({
          type: "error",
          text1: "Campo obrigatório",
          text2: "Preencha o nome de usuário",
        });
        return;
      }
      if (!password) { // Verifica o password
        Toast.show({
          type: "error",
          text1: "Campo obrigatório",
          text2: "Preencha a senha",
        });
        return;
      }
      const isValidUser = (username === Usuario.username) && (password === Usuario.password);
      if (isValidUser) {
        navigation.replace("Menu");
        Toast.show({
          type: "success",
          text1: "Login bem-sucedido",
          text2: "Seja bem-vindo!",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Usuário ou senha incorretos",
        });
      }
    }
    // Se a plataforma for Web
  };


  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/yan-logo.png')} />
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Enter your username and password to login</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TouchableOpacity> // TODO: Fazer recuperação de nome de usuário
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
        <TouchableOpacity> // TODO: Fazer recuperação de senha de usuário
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or login in with</Text> // TODO: Fazer login pela rede social favorita

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

      <Text style={styles.registerText}>Don't have an account? <Text style={styles.registerLink} onPress={() => navigation.navigate("Register")}>Register</Text></Text> // TODO: Registrar a conta de um novo usuário
      <Text style={styles.helpText}>Need help? Visit our <Text style={styles.helpLink}>help center</Text></Text> // TODO: Fazer central de ajuda
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
