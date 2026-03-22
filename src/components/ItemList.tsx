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
      className="z-2"
        data={items}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => renderItem(item)}
      />

        <TouchableOpacity
          onPress={onAdd}
          className="absolute bottom-6 right-6 w-16 h-16 bg-blue-500 rounded-full justify-center items-center shadow-xl elevation-5"
        >
          <Text className="text-white text-3xl font-bold"> + </Text>
        </TouchableOpacity>

    </View>

  );

}