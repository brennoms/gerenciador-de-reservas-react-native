import { useContext } from "react";
import { PublicContext } from "./PublicContext";

export function usePublic() {
  const context = useContext(PublicContext);

  if (!context) {
    throw new Error("usePublic must be used within PublicProvider");
  }

  return context;
}