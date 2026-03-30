import { View, Text, TouchableOpacity, ScrollView } from "react-native"
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

  const { selectedReservation, selectReservation } = useReservation()

  const { today, styledDays, reloadStyledDays, selectedDate, calendarDayPress, calendarMonthChange } = useCalendar();

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
          <TouchableOpacity onPress={() => router.push("/property/[id]/reservation/add")} className="self-end rounded-lg mr-4">
            <Ionicons name="add-circle" size={48} color="lightgreen" />
          </TouchableOpacity>
        </View>

        <View className="w-full h-min items-center">
          
          {selectedReservation ? 
            <>
              <ReservationCard reservation={selectedReservation} /> 
              <TouchableOpacity onPress={() => router.push("/property/[id]/reservation/edit")} className="absolute top-3 left-3 px-2 rounded-lg bg-blue-100">
                <AntDesign name="edit" size={32} color="black" />
              </TouchableOpacity>
            </>
          : 
            <></>
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