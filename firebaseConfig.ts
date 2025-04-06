// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOCES_VXoWwMbdk5A-q9ZaZ0NxfZncw2E",
  authDomain: "teste-cadastro-produtos-aeb8c.firebaseapp.com", // <-- Corrigido
  projectId: "teste-cadastro-produtos-aeb8c",
  storageBucket: "teste-cadastro-produtos-aeb8c.appspot.com", // <-- Corrigido também
  messagingSenderId: "101571996608",
  appId: "1:101571996608:android:00d795528d68930312b625"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
