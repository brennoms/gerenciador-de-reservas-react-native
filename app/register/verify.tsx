import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { registerService } from "@/src/services/users";
import { usePublic } from "@/src/contexts/public/PublicHook";
import { setUnauthorizedHandler, getUnauthorizedHandler } from "@/src/services/api";

export default function RegisterScreen() {
  const{ name, email, pass, code, setCode } = usePublic()
 
  const handleRegister = async () => {

    if (!code) {
      alert("O campo do codigo não pode estar vazio");
      return;
    }

    const previousHandler = () => getUnauthorizedHandler();
    setUnauthorizedHandler(() => {});
    const res = await registerService({name, email, pass, code});
    setUnauthorizedHandler(previousHandler);

    if (!res.success) {
      if ("message" in res) {
        alert(res.message);
      } else {
        alert("Ocorreu um erro desconhecido");
      }
      return;
    }

    if (res.success) {
      router.replace({pathname:"/property"});
    }

  };

  return (
    <View className="flex-1 justify-center px-6 bg-gray-100">

      <Text className="text-2xl font-bold text-center mb-8">
        Digite o código que foi enviado para seu e-mail
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