import { Stack } from "expo-router";

import { PropertyProvider } from "@/src/contexts/property/PropertyProvider";
import { AuthProvider } from "@/src/contexts/auth/AuthProvider";

export default function RootLayout() {

  return (
      <AuthProvider>
      <PropertyProvider>
      
          <Stack
            screenOptions={

              ({route}) => {
                if (route.name === "add") {
                  return { title: "Adicionar Propriedade" }
                } else {
                  return { headerShown: false }
                }
              }

            }
          />
      
      </PropertyProvider>
      </AuthProvider>
    )
}
