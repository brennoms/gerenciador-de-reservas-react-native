import { Stack } from "expo-router";
import { CalendarProvider } from "@/src/contexts/calendar/CalendarProvider";
import { ReservationProvider } from "@/src/contexts/reservation/ReservationProvider";

export default function RootLayout() {

  return (
      <ReservationProvider>
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
      </ReservationProvider>
    )
}
