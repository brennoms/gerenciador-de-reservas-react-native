import { useState } from "react";
import { TestContext } from "./TestContext";

export function TestProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <TestContext.Provider value={{ user, setUser }}>
      {children}
    </TestContext.Provider>
  );
}
