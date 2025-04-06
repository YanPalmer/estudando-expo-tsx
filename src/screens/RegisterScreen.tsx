import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // Importa o auth do arquivo que você criou
import Toast from "react-native-toast-message";

export default function RegisterScreen({ navigation }: any) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      Toast.show({
        type: "error",
        text1: "Campos obrigatórios",
        text2: "Preencha todos os campos"
      });
      return;
    }

    try {
      // Cria o usuário com e-mail e senha
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      
      // Atualiza o nome do usuário (profile)
      await updateProfile(userCredential.user, {
        displayName: nome
      });

      Toast.show({
        type: "success",
        text1: "Usuário registrado",
        text2: "Você já pode fazer login"
      });

      navigation.navigate("Login");
    } catch (error: any) {
      console.log("Erro ao registrar:", error.message);
      Toast.show({
        type: "error",
        text1: "Erro ao registrar",
        text2: error.message
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        placeholder="Nome completo"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "gray", marginBottom: 15, borderRadius: 5, padding: 10 },
  button: { backgroundColor: "#333", padding: 15, alignItems: "center", borderRadius: 5 },
  buttonText: { color: "white", fontSize: 16 }
});
