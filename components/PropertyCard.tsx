import { View, Text, Image } from "react-native";

type PropertyProps = {
  image: string;
  name: string;
  address: string;
};

export default function PropertyCard({ image, name, address }: PropertyProps) {
  return (
    <View className="bg-white rounded-xl mb-4 overflow-hidden">

      <Image
        source={{ uri: image }}
        className="w-full aspect-[1.5]"
      />

      <View className="p-4">
        <Text className="font-bold text-lg">{name}</Text>
        <Text className="text-gray-500">{address}</Text>
      </View>

    </View>
  );
}