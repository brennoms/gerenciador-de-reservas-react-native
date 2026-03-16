import { View } from "react-native";
import { useState } from "react";
import ItemList from "@/components/ItemList";
import PropertyCard from "@/components/PropertyCard";

export default function Home() {
  const [properties, setProperties] = useState([
    {
      id: "1",
      image: "https://picsum.photos/400/200",
      name: "Casa de Praia",
      address: "Rio de Janeiro",
    },
  ]);

  const addPropertyCard = () => {
    setProperties([
      ...properties,
      {
        id: Date.now().toString(),
        image: "https://picsum.photos/401/200",
        name: "Nova Casa",
        address: "Copacabana",
      },
    ]);
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