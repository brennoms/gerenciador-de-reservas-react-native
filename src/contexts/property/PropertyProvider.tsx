import { useState, useEffect, ReactNode, use } from "react";

import { PropertyContext } from "./PropertyContext";
import { PropertyProps, AddPropertyProps } from "../../types/property.types";

import axios from "axios"; // for tests, we will fetch some images from the internet and create some properties with them

export function PropertyProvider({ children }: { children: ReactNode }) {

  const [properties, setProperties] = useState<PropertyProps[]>([]);

  // for tests, we will fetch some images from the internet and create some properties with them
  useEffect(() =>{

    axios.get("https://picsum.photos/v2/list?limit=5&page=45").then(response => {
      const images = response.data;
      for(let image of images) {
        setProperties(prev => [
          ...prev,
          {
            id: prev.length + 1,
            image: image.download_url,
            name: `Property ${prev.length + 1}`,
            address: `Address ${prev.length + 1}`,
          },
        ]);
      };
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

  return (
    <PropertyContext.Provider value={{ properties, addProperty }}>
      {children}
    </PropertyContext.Provider>
  );
}