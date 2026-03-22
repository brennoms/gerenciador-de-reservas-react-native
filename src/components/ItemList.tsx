import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { ReactElement } from "react";

type ItemListProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactElement;
  onAdd: () => void;
};

export default function ItemList<T>({ items, renderItem, onAdd }: ItemListProps<T>) {

  return (

    <View className="flex-1">

      <FlatList
        data={items}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => renderItem(item)}
      />

      <View className="absolute bottom-[100px] right-[100px]">
        <TouchableOpacity
          onPress={onAdd}
          className="w-16 h-16 bg-blue-500 rounded-full justify-center items-center shadow-lg"
        >
          <Text className="text-white text-3xl font-bold"> + </Text>
        </TouchableOpacity>
      </View>

    </View>

  );

}