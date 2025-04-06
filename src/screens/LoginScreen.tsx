import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, Image, TouchableOpacity, Platform } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { FontAwesome } from "@expo/vector-icons";

// Toast para Android
import Toast from "react-native-toast-message";
const showToast = (type: "success" | "info" | "error", text1: string, text2?: string, options?: {
  autoHide?: boolean;
  visibilityTime?: number;
}) => {
  Toast.show({ type, text1, text2,
    autoHide: options?.autoHide,
    visibilityTime: options?.visibilityTime})
};


// Definindo props da tela
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

interface Props {
  navigation: LoginScreenNavigationProp;
}

//! Não seguro, armazenar em um banco de dados local
const Usuario = {
  username: "admin",
  password: "1234",
}

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //* Função de Login
  const handleLogin = () => {
    if (Platform.OS === "android") {
      // Verifica se os campos username e password estão vazios
      if (!username && !password) {
        showToast("error", "Campost obrigatórios", "Preencha nome de usuário e senha");
        return;
      }
      // Verifica o username
      if (!username) {
        showToast("error", "Campo obrigatório", "Preencha o nome de usuário");
        return;
      }
      // Verifica o password
      if (!password) {
        showToast("error", "Campo obrigatório", "Preencha a senha");
        return;
      }
      const isValidUser = (username === Usuario.username) && (password === Usuario.password);
      if (isValidUser) {
        navigation.replace("Menu");
        showToast("success", "Login bem-sucedido", "Seja bem-vindo!", {
          autoHide: true,
          visibilityTime: 3000,
        });
      } else {
        showToast("error", "Erro", "Usuário ou senha incorretos");
      }
    }
    // Se a plataforma for Web
    // TODO: Implementar para que seja obrigatório o preenchimento diretamnte nos campos
  };


  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/yan-logo.png')} />
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Enter your username and password to login</Text>
      
      {/* //* Username Input Container */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        {/* //TODO: Fazer recuperação de nome de usuário */}
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Username?</Text>
        </TouchableOpacity>
      </View>
      
      {/* //* Password Input Container */}
      <View style={styles.inputContainer}>
        {/* <TextInput placeholder="Password" secureTextEntry style={styles.input} /> */}
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        {/* //TODO: Fazer recuperação de senha de usuário */}
        <TouchableOpacity> 
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      
      {/* //* Botão Login */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      
      {/* //TODO: Fazer login pela rede social favorita */}
      <Text style={styles.orText}>Or login in with</Text>
      
      {/* //* Container para redes sociais */}
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
      
      {/* //TODO: Registrar a conta de um novo usuário */}
      <Text style={styles.registerText}>Don't have an account? <Text style={styles.registerLink} onPress={() => navigation.navigate("Register")}>Register</Text></Text>
      
      {/* //TODO: Fazer central de ajuda */}
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
