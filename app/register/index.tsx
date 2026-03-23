import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

export default function RegisterScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleRegister = () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      alert("Preencha todos os campos");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem");
      return;
    }

    router.navigate({pathname: "/register/verify"});
  };

  return (
    <View className="flex-1 justify-center px-6 bg-gray-100">

      <Text className="text-3xl font-bold text-center mb-8">
        Criar Conta
      </Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        className="bg-white p-4 rounded-xl mb-4 border border-gray-300"
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        className="bg-white p-4 rounded-xl mb-4 border border-gray-300"
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        className="bg-white p-4 rounded-xl mb-4 border border-gray-300"
      />

      <TextInput
        placeholder="Confirmar senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
        className="bg-white p-4 rounded-xl mb-6 border border-gray-300"
      />

      <TouchableOpacity
        onPress={handleRegister}
        className="bg-blue-500 p-4 rounded-xl"
      >
        <Text className="text-white text-center font-bold text-lg">
          Criar conta
        </Text>
      </TouchableOpacity>

    </View>
  );
}