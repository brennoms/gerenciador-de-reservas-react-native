import { useContext } from "react";
import { TestContext } from "./TestContext";

export function useTest() {
  return useContext(TestContext);
}
