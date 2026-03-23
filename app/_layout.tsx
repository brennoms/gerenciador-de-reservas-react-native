import "../global.css"
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

import { PublicProvider } from "@/src/contexts/public/PublicProvider";

export default function RootLayout() {
  return (
    <PublicProvider>
    <SafeAreaView className="bg-gray-100" style={{ flex: 1 }} edges={["top", "bottom", "right"]}>
    <StatusBar translucent backgroundColor={"#3B82F6"}/>

        <Stack
          screenOptions={{
            headerShown: false
          }} 
        />

    </SafeAreaView>
    </PublicProvider>
  )
}
