import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

import { useProperty } from "@/contexts/property/PropertyHook";


export default function AddProperty() {

  const {addProperty} = useProperty();

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permissão necessária");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    
  };

  const handleSubmit = () => {
    if (!name || !address || !image) {
      Alert.alert("Preencha todos os campos");
      return;
    }

    const property = { name, address, image };
    addProperty(property);

    Alert.alert("Imóvel cadastrado!");
    router.back()
  };

  return (
    <View className="flex-1 bg-white p-5">
      <Text className="text-2xl font-bold mb-5">
        Adicionar Imóvel
      </Text>

      {/* Image Picker */}
      <TouchableOpacity
        onPress={pickImage}
        className={`${image ? 'h-min':'h-40'} w-min bg-gray-200 rounded-xl justify-center items-center mb-5 overflow-hidden`}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            className="w-full"
            style={{ aspectRatio: 16 / 9 }}
            resizeMode="contain"
          />
        ) : (
          <Text className="text-gray-500">
            Selecionar Imagem
          </Text>
        )}
      </TouchableOpacity>

      {/* Nome */}
      <TextInput
        placeholder="Nome do imóvel"
        value={name}
        onChangeText={setName}
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      {/* Endereço */}
      <TextInput
        placeholder="Endereço"
        value={address}
        onChangeText={setAddress}
        className="border border-gray-300 rounded-lg p-3 mb-6"
      />

      {/* Botão */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-blue-500 p-4 rounded-xl items-center"
      >
        <Text className="text-white font-bold">
          Salvar
        </Text>
      </TouchableOpacity>
    </View>
  );
}