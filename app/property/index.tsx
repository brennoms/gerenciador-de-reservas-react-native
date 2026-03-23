import { View, Text } from "react-native";
import { router } from "expo-router";

import ItemList from "@/src/components/ItemList";
import PropertyCard from "@/src/components/PropertyCard";
import { useProperty } from "@/src/contexts/property/PropertyHook";

export default function Propperty() {
  const {properties, selectProperty} = useProperty();

  const addPropertyCard = () => {
    router.navigate({ pathname: '/property/add'});
  };

  const onClickPropertyCard = (id: number) => {
    selectProperty(id);
    router.navigate({ pathname: `/property/[id]`, params: { id } });
  }

  return (
    <View className="flex-1 p-4 bg-gray-100">

      <Text className="text-center mb-4 text-4xl">Propriedades</Text>

      <ItemList
        className="rounded-lg"
        items={properties}
        onAdd={addPropertyCard}
        renderItem={(item) => (
          <PropertyCard
            id={item.id}
            image={item.image}
            name={item.name}
            address={item.address}
            onClick={() => onClickPropertyCard(item.id)}
          />
        )}
      />

    </View>
  );
}