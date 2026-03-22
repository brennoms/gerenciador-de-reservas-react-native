import { useState, ReactNode } from "react";
import { PropertyContext } from "./PropertyContext";
import { PropertyProps, AddPropertyProps } from "../../types/property.types";

export function PropertyProvider({ children }: { children: ReactNode }) {

  const [properties, setProperties] = useState<PropertyProps[]>([
    {
      id: 1,
      image: "https://picsum.photos/400/200",
      name: "Casa de Praia",
      address: "Rio de Janeiro",
    },
  ]);

  const addProperty = ({ image, name, address }: AddPropertyProps) => {
    setProperties(prev => [
      ...prev,
      {
        id: prev.length + 1,
        image,
        name,
        address,
      },
    ]);
  };

  return (
    <PropertyContext.Provider value={{ properties, addProperty }}>
      {children}
    </PropertyContext.Provider>
  );
}