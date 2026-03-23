import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { Link, router } from "expo-router";

import { usePublic } from "@/src/contexts/public/PublicHook";
import { loginService } from "@/src/services/users";

export default function LoginScreen() {
  const {email, pass, setEmail, setPass} = usePublic();

  const handleLogin = async () => {
    const login = await loginService({email, pass});

    if (login) {
    	router.navigate({pathname: "/property"});
    	return;
    }

    console.log("falha no login");

  };

  return (
     <KeyboardAvoidingView 
     		className="justify-center px-6 bg-gray-100" 
     		style={{ flex: 1 }} 
     		behavior={Platform.OS === "ios" ? "padding" : "height"}
     	>
      
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
	      placeholder="senha"
	      value={pass}
	      onChangeText={setPass}
	      secureTextEntry
	      className="bg-white p-4 rounded-xl mb-6 border border-gray-300"
	    />

	    <TouchableOpacity
	      onPress={() => {handleLogin()}}
	      className="bg-blue-500 p-4 rounded-xl mb-4"
	    >
	      <Text className="text-white text-center font-bold text-lg">
	        Entrar
	      </Text>
	    </TouchableOpacity>

	    <Text className="text-center">
	    	ainda não tem uma conta? <Link className="text-blue-500" href={"/register"}>Crie uma</Link>
	   	</Text>

	   </ KeyboardAvoidingView>
  );
}