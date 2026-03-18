import { View } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

import ItemList from "@/components/ItemList";
import PropertyCard from "@/components/PropertyCard";
import { useProperty } from "@/contexts/property/PropertyHook";

export default function Propperty() {
  const {properties} = useProperty();

  const addPropertyCard = () => {
    router.navigate({ pathname: '/property/add'});
  };

  return (
    <View className="flex-1 p-4 bg-gray-100">

      <ItemList
        items={properties}
        onAdd={addPropertyCard}
        renderItem={(item) => (
          <PropertyCard
            image={item.image}
            name={item.name}
            address={item.address}
          />
        )}
      />

    </View>
  );
}