import { useState } from "react";
import { PropertyContext } from "./PropertyContext";

export function PropertyProvider({ children }) {

  const [properties, setProperties] = useState([
      {
        id: "1",
        image: "https://picsum.photos/400/200",
        name: "Casa de Praia",
        address: "Rio de Janeiro",
      },
    ]);
  const addProperty = ({ image, name, address }) => {
    setProperties(prev => [
      ...prev,
      {
        id: String(prev.length + 1),
        image,
        name,
        address
      }
    ]);
  };

  return (
    <PropertyContext.Provider value={{ properties, addProperty }}>
      {children}
    </PropertyContext.Provider>
  );
}
