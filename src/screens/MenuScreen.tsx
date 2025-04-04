import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";

type MenuScreenNavigationProp = StackNavigationProp<RootStackParamList, "Menu">;

interface Props {
  navigation: MenuScreenNavigationProp;
}

export default function MenuScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Menu</Text>
      <Button title="Sair" onPress={() => navigation.replace("Login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});
