import React, { useState } from "react";

import {
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

import { useProperty } from "@/src/contexts/property/PropertyHook";


export default function AddProperty() {

  const { updateProperty, propertySelected } = useProperty();

  const [image, setImage] = useState<string | null>(propertySelected?.image || null);
  const [name, setName] = useState(propertySelected?.name || "");
  const [address, setAddress] = useState(propertySelected?.address || "");

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
    updateProperty(property);

    Alert.alert("Imóvel atualizado!");
    router.back()
    
  };

  return (
    <KeyboardAvoidingView 
      className="bg-gray-100 p-5" 
      style={{ flex: 1 }} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity
        onPress={pickImage}
        className={`${image ? 'h-min':'h-40'} w-min bg-gray-200 rounded-xl justify-center items-center mb-5 overflow-hidden`}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            className="w-full aspect-[1.5]"
          />
        ) : (
          <Text className="text-gray-500">
            Selecionar Imagem
          </Text>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Nome do imóvel"
        placeholderTextColor="gray"
        value={name}
        onChangeText={setName}
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      <TextInput
        placeholder="Endereço"
        placeholderTextColor="gray"
        value={address}
        onChangeText={setAddress}
        className="border border-gray-300 rounded-lg p-3 mb-6"
      />

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-blue-500 p-4 rounded-xl items-center mb-5"
      >
        <Text className="text-white font-bold">
          Salvar
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}