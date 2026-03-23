import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function RegisterScreen() {
  const [code, setCode] = useState("");

  const handleRegister = () => {

    if (!code) {
      alert("O campo do codigo não pode estar vazio");
      return;
    }

  };

  return (
    <View className="flex-1 justify-center px-6 bg-gray-100">

      <Text className="text-2xl font-bold text-center mb-8">
        Digite o código que foi envidado para seu e-mail
      </Text>

      <TextInput
        value={code}
        onChangeText={setCode}
        className="bg-white p-4 rounded-xl mb-4 border border-gray-300"
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