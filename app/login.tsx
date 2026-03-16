import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    console.log(email, senha);
  };

  return (
    <View className="flex-1 justify-center px-6 bg-gray-100">
      
			<Text className="text-3xl font-bold text-center mb-8">
	      Login
	    </Text>

	    <TextInput
	      placeholder="Email"
	      value={email}
	      onChangeText={setEmail}
	      className="bg-white p-4 rounded-xl mb-4 border border-gray-300"
	    />

	    <TextInput
	      placeholder="Senha"
	      value={senha}
	      onChangeText={setSenha}
	      secureTextEntry
	      className="bg-white p-4 rounded-xl mb-6 border border-gray-300"
	    />

	    <TouchableOpacity
	      onPress={handleLogin}
	      className="bg-blue-500 p-4 rounded-xl mb-4"
	    >
	      <Text className="text-white text-center font-bold text-lg">
	        Entrar
	      </Text>
	    </TouchableOpacity>

	    <Text className="text-center">
	    	ainda não tem uma conta? <Link className="text-blue-500" href={"/register"}>Crie uma</Link>
	   	</Text>

    </View>
  );
}