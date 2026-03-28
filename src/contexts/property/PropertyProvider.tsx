import { useState, useEffect, ReactNode, use } from "react";

import { PropertyContext } from "./PropertyContext";
import { PropertyProps, AddPropertyProps } from "../../types/property.types";
import { getPropertiesService, createPropertyService } from "../../services/propertys";

import { useAuth } from "../auth/AuthHook";

export function PropertyProvider({ children }: { children: ReactNode }) {

  const { token } = useAuth();

  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [propertySelected, setPropertySelected] = useState<PropertyProps | null>(null);

  useEffect(() =>{
    populateProperties();
  }, []);

  const populateProperties = () => {

    if (!token) return;

    getPropertiesService(token).then(res => {
      if(res.success && res.data) {
        setProperties(res.data);
      }
    });

  }

  const addProperty = ({ name, address, image }: AddPropertyProps) => {
    
    if (!token) return;

    createPropertyService(token, { name, address, image }).then(res => {
      if (res.success) {
        populateProperties();
      } else {
        alert(res.message);
      }
    });
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