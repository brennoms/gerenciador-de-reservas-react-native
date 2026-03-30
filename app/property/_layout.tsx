import { Stack } from "expo-router";

import { PropertyProvider } from "@/src/contexts/property/PropertyProvider";
import { AuthProvider } from "@/src/contexts/auth/AuthProvider";
import { ReservationProvider } from "@/src/contexts/reservation/ReservationProvider";
import { CalendarProvider } from "@/src/contexts/calendar/CalendarProvider";

export default function RootLayout() {

  return (
      <AuthProvider>
      <PropertyProvider>
      <ReservationProvider>
      <CalendarProvider>
      
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
      
      </CalendarProvider>
      </ReservationProvider>
      </PropertyProvider>
      </AuthProvider>
    )
}
