import { Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { usePublic } from "@/src/contexts/public/PublicHook";
import { sendCodeService } from "@/src/services/users";

export default function RegisterScreen() {

  const {name, email, pass, setName, setEmail, setPass} = usePublic()
  const [confirmpass, setConfirmpass] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !pass || !confirmpass) {
      alert("Preencha todos os campos");
      return;
    }

    if (pass !== confirmpass) {
      alert("As senhas não coincidem");
      return;
    }

    const res = await sendCodeService(email);

    if (res.success) {
      router.navigate({pathname: "/register/verify"});
    } else {
      alert(res.message);
    }

    
  };

  return (
    <KeyboardAvoidingView 
      className="justify-center px-6 bg-gray-100" 
      style={{ flex: 1 }} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

      <Text className="text-3xl font-bold text-center mb-8">
        Criar Conta
      </Text>

      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        className="bg-white p-4 rounded-xl mb-4 border border-gray-300"
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        className="bg-white p-4 rounded-xl mb-4 border border-gray-300"
      />

      <TextInput
        placeholder="Senha"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
        className="bg-white p-4 rounded-xl mb-4 border border-gray-300"
      />

      <TextInput
        placeholder="Confirmar senha"
        value={confirmpass}
        onChangeText={setConfirmpass}
        secureTextEntry
        className="bg-white p-4 rounded-xl mb-6 border border-gray-300"
      />

      <TouchableOpacity
        onPress={handleRegister}
        className="bg-blue-500 p-4 rounded-xl"
      >
        <Text className="text-white text-center font-bold text-lg">
          Continuar
        </Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>
  );
}