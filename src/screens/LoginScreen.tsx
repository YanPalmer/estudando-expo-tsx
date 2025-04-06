import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, Image, TouchableOpacity, Platform } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { FontAwesome } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

// Toast para Android
import Toast from "react-native-toast-message";

const showToast = (type: "success" | "info" | "error", text1: string, text2?: string, options?: {
  autoHide?: boolean;
  visibilityTime?: number;
}) => {
  Toast.show({
    type, text1, text2,
    autoHide: options?.autoHide,
    visibilityTime: options?.visibilityTime
  })
};


// Definindo props da tela
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

interface Props {
  navigation: LoginScreenNavigationProp;
}

//! Não seguro, armazenar em um banco de dados local
const Usuario = {
  email: "admin",
  password: "1234",
}

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //* Função de Login
  const handleLogin = async () => {
    if (Platform.OS === "android") {
      // Verifica se os campos email e password estão vazios
      if (!email && !password) {
        showToast("error", "Campos obrigatórios", "Preencha email de usuário e senha");
        return;
      }
      // Verifica o email
      if (!email) {
        showToast("error", "Campo obrigatório", "Preencha o email de usuário");
        return;
      }
      // Verifica o password
      if (!password) {
        showToast("error", "Campo obrigatório", "Preencha a senha");
        return;
      }

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        Toast.show({
          type: "success",
          text1: "Login realizado",
          text2: `Bem-vindo(a), ${user.displayName || "usuário"}!`
        });

        // Navegar para Menu passando o nome
        navigation.navigate("Menu", { nome: user.displayName || "Usuário" });
      } catch (error: any) {
        console.log("Erro ao logar:", error.message);
        Toast.show({
          type: "error",
          text1: "Erro ao logar",
          text2: error.message
        });
      }
    }
    // Se a plataforma for Web
    // TODO: Implementar para que seja obrigatório o preenchimento diretamnte nos campos
  };


  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/yan-logo.png')} />
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Enter your email and password to login</Text>

      {/* //* Email Input Container */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="E-mail"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        {/* //TODO: Fazer recuperação de nome de usuário */}
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot your E-mail?</Text>
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
