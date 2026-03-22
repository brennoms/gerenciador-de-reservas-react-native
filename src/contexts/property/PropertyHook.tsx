import { useContext } from "react";
import { PropertyContext } from "./PropertyContext";

export function useProperty() {
  return useContext(PropertyContext);
}
