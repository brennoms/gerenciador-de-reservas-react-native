import { Stack } from "expo-router";
import { CalendarProvider } from "@/src/contexts/calendar/CalendarProvider";

export default function RootLayout() {

  return (
      <CalendarProvider>
        <Stack
            screenOptions={

              ({route}) => {
                if (route.name === "edit") {
                  return { title: "editar propriedade" }
                } else {
                  return { title: "Propriedade" }
                }
              }

            }
          />
      </CalendarProvider>
    )
}
