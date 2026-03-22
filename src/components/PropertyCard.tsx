import { View, Text, Image, TouchableOpacity } from "react-native";

import { PropertyProps } from "../types/property.types";


export default function PropertyCard({ id, image, name, address, onClick, className }: PropertyProps & { onClick: () => void; className?: string }) {
  return (
    <TouchableOpacity 
      className={className ? className : "bg-white rounded-xl mb-4 overflow-hidden"}
      onPress={onClick}
    >

      <Image
        source={{ uri: image }}
        className="w-full aspect-[1.5]"
      />

      <View className="p-4">
        <Text className="font-bold text-lg">{name}</Text>
        <Text className="text-gray-500">{address}</Text>
      </View>

    </TouchableOpacity>
  );
}