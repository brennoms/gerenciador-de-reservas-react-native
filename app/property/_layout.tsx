import { Stack } from "expo-router";
import { PropertyProvider } from "@/src/contexts/property/PropertyProvider";

import { usePublic } from "@/src/contexts/public/PublicHook";
import { AuthProvider } from "@/src/contexts/auth/AuthProvider";

export default function RootLayout() {

  const { email, pass } = usePublic()

  return (
      <AuthProvider email={email} pass={pass}>
        <PropertyProvider>
          <Stack />
        </PropertyProvider>
      </AuthProvider>
    )
}
