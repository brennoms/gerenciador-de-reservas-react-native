import { Stack } from "expo-router";

import { PropertyProvider } from "@/src/contexts/property/PropertyProvider";
import { AuthProvider } from "@/src/contexts/auth/AuthProvider";

export default function RootLayout() {

  return (
      <AuthProvider>
        <PropertyProvider>
          <Stack
            screenOptions={{
              headerShown: false
            }} 
          />
        </PropertyProvider>
      </AuthProvider>
    )
}
