import { Stack } from "expo-router";
import { CalendarProvider } from "@/src/contexts/calendar/CalendarProvider";

export default function RootLayout() {
  return (
      <CalendarProvider>
        <Stack
            screenOptions={{
              headerShown: false
            }} 
          />
      </CalendarProvider>
    )
}
