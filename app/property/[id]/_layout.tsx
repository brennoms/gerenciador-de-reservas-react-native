import { Stack } from "expo-router";
import { PropertyProvider } from "@/src/contexts/property/PropertyProvider";

export default function RootLayout() {
  return (
      <PropertyProvider>
        <Stack />
      </PropertyProvider>
    )
}
