import { useState, useEffect, ReactNode, use } from "react";

import { PropertyContext } from "./PropertyContext";
import { PropertyProps, AddPropertyProps } from "../../types/property.types";
import { getPropertiesService } from "../../services/propertys";

import { useAuth } from "../auth/AuthHook";

export function PropertyProvider({ children }: { children: ReactNode }) {

  const { token } = useAuth();

  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [propertySelected, setPropertySelected] = useState<PropertyProps | null>(null);

  // for tests, we will fetch some images from the internet and create some properties with them
  useEffect(() =>{

    if (!token) return;

    getPropertiesService(token).then(res => {
      if(res.success && res.data) {
        setProperties(res.data);
      }
    });

  }, []);

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

  const selectProperty = (id: number) => {
    const property = properties.find(p => p.id === id);

    if(property) {
      setPropertySelected(property);
    }

  }

  return (
    <PropertyContext.Provider value={{ properties, addProperty, propertySelected, selectProperty }}>
      {children}
    </PropertyContext.Provider>
  );
}