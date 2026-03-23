import { Stack } from "expo-router";
import { PropertyProvider } from "@/src/contexts/property/PropertyProvider";

import { usePublic } from "@/src/contexts/public/PublicHook";

export default function RootLayout() {

  const { user, token } = usePublic()

  return (
      <PropertyProvider us={user} tk={token}>
        <Stack />
      </PropertyProvider>
    )
}
