import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { ReactNode } from "react";

type ItemListProps = {
  items: any[];
  renderItem: (item: any) => ReactNode;
  onAdd: () => void;
};

export default function ItemList({ items, renderItem, onAdd }: ItemListProps) {
  return (
    <View className="flex-1">

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderItem(item)}
      />

      <View className="absolute bottom-6 right-6">
        <TouchableOpacity
          onPress={onAdd}
          className="w-16 h-16 bg-blue-500 rounded-full justify-center items-center shadow-lg"
        >
          <Text className="text-white text-3xl font-bold">
            +
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}