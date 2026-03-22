import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { ReactElement } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';

type ItemListProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactElement;
  onAdd: () => void;
};

export default function ItemList<T>({ items, renderItem, onAdd, className }: ItemListProps<T> & { className?: string }) {

  return (

    <View className="flex-1">

      <FlatList
        className={className ? className : ""}
        data={items}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => renderItem(item)}
      />

      <TouchableOpacity
        onPress={onAdd}
        className="absolute bottom-6 right-6 w-min h-min rounded-full bg-blue-100"
      >
        <Ionicons name="add-circle" size={64} color="blue" />
      </TouchableOpacity>

    </View>

  );

}