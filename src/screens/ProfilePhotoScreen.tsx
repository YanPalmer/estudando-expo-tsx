import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";

// Toast para Android
import Toast from "react-native-toast-message";
import { showToast } from "./LoginScreen";

// Definindo props da tela
type NavigationProp = StackNavigationProp<RootStackParamList, 'ProfilePhoto'>;

interface Props {
    navigation: NavigationProp;
}


export default function ProfilePhotoScreen() {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const navigation = useNavigation<NavigationProp>();

    // * Função para abrir a câmera ou galeria
    const pickImage = async (fromCamera: boolean) => {
        const permissionResult = fromCamera
            ? await ImagePicker.requestCameraPermissionsAsync()
            : await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert("Permission is required!");
            return;
        }

        const result = fromCamera
            ? await ImagePicker.launchCameraAsync({ quality: 0.5, base64: false })
            : await ImagePicker.launchImageLibraryAsync({ quality: 0.5, base64: false });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImageUri(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        try {
            if (!imageUri) return;
    
            const auth = getAuth();
            const user = auth.currentUser;
    
            if (!user) {
                alert("Usuário não autenticado");
                return;
            }
    
            const response = await fetch(imageUri);
            const blob = await response.blob();
            const imageRef = ref(storage, `profilePictures/${user.uid}.jpg`);
    
            await uploadBytes(imageRef, blob);
            const downloadURL = await getDownloadURL(imageRef);
    
            console.log("Imagem salva:", downloadURL);
            alert("Foto enviada com sucesso!");
    
            navigation.navigate("Menu");
        } catch (error) {
            console.error("Erro ao fazer upload da imagem:", error);
            // alert("Erro ao enviar a imagem. Tente novamente.");
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>LOGO</Text>
            <Text style={styles.title}>Register</Text>

            <TouchableOpacity style={styles.option} onPress={() => pickImage(true)}>
                <Text>📷 Take photo with camera</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => pickImage(false)}>
                <Text>🖼️ Upload Photo from your phone</Text>
            </TouchableOpacity>

            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.uploadBtn} onPress={uploadImage}>
                    <Text style={styles.uploadText}>Upload</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.navigate("Menu")}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.help}>Need help? Visit our <Text style={{ fontWeight: 'bold' }}>help center</Text></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
    logo: { fontSize: 24, marginBottom: 10 },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 30 },
    option: { marginVertical: 10 },
    image: { width: 120, height: 120, borderRadius: 60, marginTop: 20 },
    buttonRow: { flexDirection: "row", marginTop: 20 },
    uploadBtn: {
        backgroundColor: "#4A5568",
        padding: 10,
        borderRadius: 5,
        marginRight: 10
    },
    skipBtn: {
        borderWidth: 1,
        borderColor: "#4A5568",
        padding: 10,
        borderRadius: 5
    },
    uploadText: { color: "#fff" },
    skipText: { color: "#4A5568" },
    help: { position: "absolute", bottom: 30 }
});
