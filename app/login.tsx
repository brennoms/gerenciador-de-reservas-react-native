import { Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, View } from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";

import { usePublic } from "@/src/contexts/public/PublicHook";
import { loginService } from "@/src/services/users";

export default function LoginScreen() {
  const {email, pass, setEmail, setPass, setToken} = usePublic();
	const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    
    if (!email || !pass) {
      alert("Preencha email e senha");
      return;
    }

    const login = await loginService({email, pass});

    if (login.success && login.data?.token) {
      setToken(login.data.token);
    	router.navigate({pathname: "/property"});
    } else {
      alert(login.message || "Erro ao fazer login");
    }

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
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
	      className="bg-white p-4 rounded-xl mb-4 border border-gray-300"
	    />

      <View className="relative">
        <TextInput
          placeholder="senha"
          value={pass}
          onChangeText={setPass}
          secureTextEntry={!showPassword}
          autoComplete="password"
          textContentType="password"
          className="bg-white p-4 rounded-xl mb-6 border border-gray-300"
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-[50%] -translate-y-1/2"
        >
          <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={20} />
        </TouchableOpacity>
      </View>

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