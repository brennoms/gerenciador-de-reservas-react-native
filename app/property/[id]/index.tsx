import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { Calendar } from "react-native-calendars";

import { useProperty } from "@/src/contexts/property/PropertyHook";
import PropertyShow from "@/src/components/PropertyShow";

import { useCalendar } from "@/src/contexts/calendar/CalendarHook";
import { router } from "expo-router";


export default function Index() {

  const { propertySelected } = useProperty();

  const { today, styledDays, reloadStyledDays, selectedDate, calendarDayPress, calendarMonthChange } = useCalendar();

  const propertyEdit = () => {
    router.push(`/property/[id]/edit`);
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

        <View className="w-full h-min mb-4">
          <Calendar
            style={{ borderRadius: 10 }}
            enableSwipeMonths={true}
            hideExtraDays={false}
            current={today.toISOString().split('T')[0]}
            
            onMonthChange={(month) =>{
              calendarMonthChange(new Date(month.year, month.month - 1, 1));
            }}
            onDayPress={(day) => {
              const [ano, mes, dia] = day.dateString.split("-").map(Number);
              calendarDayPress(new Date(ano, mes - 1, dia));
            }}
            markedDates={styledDays}

          />
        </View>

        <View className="w-full h-min items-center">

            <Text className="text-2xl">Data Selecionada:</Text>
            <Text className="text-xl color-gray-500">{selectedDate.toLocaleDateString('pt-BR')}</Text>
            <Text>url: {String(process.env.EXPO_PUBLIC_API_URL)}</Text>


        </View>

        <View className="h-40"></View>
        
      </ScrollView>

    ) 
      : 
    (
      <View></View>
    );

}