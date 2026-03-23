import "../global.css"
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { PublicProvider } from "@/src/contexts/public/PublicProvider";

export default function RootLayout() {
  return (
    <PublicProvider>
      <SafeAreaView className="flex-1">
        <Stack
          screenOptions={{
            headerShown: false
          }} 
        />
      </SafeAreaView>
    </PublicProvider>
  )
}
