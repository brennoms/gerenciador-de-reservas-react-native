import { View, Text } from "react-native";

import { ReservationsProps } from "@/src/type/reservation.types"

type Props = {
  reservation: ReservationsProps;
};

export function ReservationCard({ reservation }: Props) {
  const formatDate = (date: Date) => {
    const [year, month, day] = date.toISOString().split("T")[0].split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <View className="w-full items-center bg-white rounded-2xl p-4 mb-4 shadow min-h-[200px]">
      
      <Text className="text-2xl font-bold text-gray-800">
        {reservation.name}
      </Text>

      <Text className="text-lg text-gray-500 mb-2">
        📞 {reservation.contact}
      </Text>

      <View >

      <View className="w-fit justify-between mb-2">
        <Text className="text-lg text-gray-600">
          Início: {formatDate(reservation.init_date)}
        </Text>
        <Text className="text-lg text-gray-600">
          Fim: {formatDate(reservation.end_date)}
        </Text>
      </View>

      <View className="justify-between mb-2">
        <Text className="text-lg text-green-600 font-semibold">
          Total: R$ {Number(reservation.amount).toFixed(2)}
        </Text>
        <Text className="text-lg text-blue-600">
          Sinal: R$ {Number(reservation.deposit).toFixed(2)}
        </Text>
      </View>

      </View>

      {reservation.observations ? (
        <Text className="self-start text-mg text-gray-700 mt-2">
          📝 {reservation.observations}
        </Text>
      ) : null}

    </View>
  );
}