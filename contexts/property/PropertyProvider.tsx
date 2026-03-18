import { useState } from "react";
import { PropertyContext } from "./PropertyContext";

export function PropertyProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <PropertyContext.Provider value={{ user, setUser }}>
      {children}
    </PropertyContext.Provider>
  );
}
