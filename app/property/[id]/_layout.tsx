import { Stack } from "expo-router";

export default function RootLayout() {

  return (
    <Stack
        screenOptions={

          ({route}) => {
            if (route.name === "edit") {
              return { title: "editar propriedade" }
            } else if (route.name === "reservation/add") {
              return { title: "Adicionar Reserva" }
            } else if (route.name === "reservation/edit") {
              return { title: "Editar Reserva" }
            } else {
              return { title: "Propriedade" }
            }
          }

        }
      />
    )
}
