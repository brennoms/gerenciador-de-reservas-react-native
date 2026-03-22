import { createContext } from "react";
import { PropertyProps, AddPropertyProps } from "../../types/property.types";

type PropertyContextType = {
  properties: PropertyProps[];
  addProperty: (props: AddPropertyProps) => void;
  propertySelected: PropertyProps | null;
  selectProperty: (id: number) => void;
};

export const PropertyContext = createContext<PropertyContextType | null>(null);