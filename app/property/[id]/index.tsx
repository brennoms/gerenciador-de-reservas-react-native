import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from "expo-router";
import { Calendar } from "react-native-calendars";

import { useProperty } from "@/src/contexts/property/PropertyHook";
import PropertyShow from "@/src/components/PropertyShow";

import { useReservation } from "@/src/contexts/reservation/ReservationHook";
import { ReservationCard } from "@/src/components/ReservationCard";

import { useCalendar } from "@/src/contexts/calendar/CalendarHook";


export default function Index() {

  const { propertySelected } = useProperty();

  const { selectedReservation, selectReservation, removeReservation } = useReservation()

  const { today, holidays, styledDays, reloadStyledDays, selectedDate, calendarDayPress, calendarMonthChange } = useCalendar();

  const propertyEdit = () => {
    router.push(`/property/[id]/edit`);
  }

  function handleDay(day) {
      const [ano, mes, dia] = day.dateString.split("-").map(Number);
      calendarDayPress(new Date(ano, mes - 1, dia));
      selectReservation(new Date(ano, mes-1, dia));
  }

  function handleMonth(month) {
    calendarMonthChange(new Date(month.year, month.month - 1, 1));
  }

  function handleDeleteReservation() {
    Alert.alert(
      "Confirmação",
      "Você tem certeza que deseja excluir?",
      [
        {
          text: "Não",
          style: "cancel",
          onPress: () => {return;},
        },
        {
          text: "Sim",
          onPress: () => removeReservation(),
        },
      ],
      { cancelable: true }
    );
  }

  return propertySelected ? 
    (

      <ScrollView className="flex-1 p-4">

        <View className="w-min h-min">
          <PropertyShow
            id={propertySelected.id}
            image={propertySelected.image}
            name={propertySelected.name}
            address={propertySelected.address}
          />

          <TouchableOpacity className="absolute bottom-6 right-3 px-2 rounded-lg bg-blue-100" onPress={() => propertyEdit()}>
            <AntDesign name="edit" size={32} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/property/[id]/reservation/add")}
          className="w-full bg-green-500 py-3 rounded-2xl items-center justify-center shadow-md my-2"
        >
          <Text className="text-white text-lg font-semibold">
            + Adicionar Reserva
          </Text>
        </TouchableOpacity>

        <View className="w-full h-min">
          <Calendar
            style={{ borderRadius: 10 }}
            enableSwipeMonths={true}
            hideExtraDays={false}
            current={today.toISOString().split('T')[0]}
            markingType={"period"}
            
            onMonthChange={(month) => handleMonth(month)}
            onDayPress={(day) => handleDay(day)}
            markedDates={styledDays}

          />
        </View>

        {selectedDate?.holiday ? 
            <Text className="text-center text-xl text-red-400 my-2">
              {selectedDate.holiday.name}
            </Text> 
          : 
            <View className="my-6"></View>
        }

        <View className="w-full h-min items-center">
          
          {selectedReservation ? 
            <>
              <ReservationCard reservation={selectedReservation} /> 
              <View className="absolute top-3 left-3 px-2">
                <View className="flex-col">
                  <TouchableOpacity onPress={() => router.push("/property/[id]/reservation/edit")} className="rounded-lg bg-blue-100 mb-2">
                    <AntDesign name="edit" size={32} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteReservation()} className="rounded-lg bg-red-100 items-center py-1">
                    <Ionicons name="trash" size={28} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          : 
            <View className="w-full items-center bg-white rounded-2xl p-4 mb-4 shadow min-h-[200px]">
              <Text className="text-2xl mb-4">
                {selectedDate.date.toISOString().split("T")[0].split("-").reverse().join("/")}
              </Text>
            </View>
          }

        </View>

        <View className="h-40"></View>
        
      </ScrollView>

    ) 
      : 
    (
      <View></View>
    );

}