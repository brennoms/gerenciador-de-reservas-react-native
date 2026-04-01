import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";


import { useReservation } from "@/src/contexts/reservation/ReservationHook";
import { useProperty } from "@/src/contexts/property/PropertyHook";
import { useCalendar } from "@/src/contexts/calendar/CalendarHook";

import Calendar from "@/src/components/Calendar"

import { stringToNumber } from "@/src/utils/number.utils";


export default function AddReservation() {
  const { addReservation } = useReservation();
  const { propertySelected } = useProperty();
  const { today, styledDaysSelection, selectionPress, setSelectionCalendar, selection } = useCalendar();
  
  useEffect(() => {
    setSelectionCalendar("add");
  }, [])

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [deposit, setDeposit] = useState("");
  const [amount, setAmount] = useState("");
  const [initDate, setInitDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [observations, setObservations] = useState("");

  const [loading, setLoading] = useState(false);

  function isoDate(date: Date) {
    return date.toISOString().split("T")[0];
  }
  useEffect(() => {
    if (selection.length === 2) {
      if ( isoDate(selection[0]) < isoDate(selection[1])) {
        setInitDate(isoDate(selection[0]).split("-").reverse().join("/"));
        setEndDate(isoDate(selection[1]).split("-").reverse().join("/"));
      } else {
        setInitDate(isoDate(selection[1]).split("-").reverse().join("/"));
        setEndDate(isoDate(selection[0]).split("-").reverse().join("/"));
      }
    } else if (selection.length === 1) {
      setInitDate(isoDate(selection[0]).split("-").reverse().join("/"))
      setEndDate("");
    }
  }, [selection])

  const handleSubmit = async () => {
    if (!name || !contact || !amount || !initDate || !endDate) {
      Alert.alert("Preencha os campos obrigatórios");
      return;
    }

    if (!propertySelected?.id) {
      Alert.alert("Erro ao identificar o imóvel");
      return;
    }

    setLoading(true);

    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!initDate.match(regex) || !endDate.match(regex)) {
      alert("formato de data incorreto");
      setLoading(false);
      return;
    }

    const reservation = {
      name,
      contact,
      deposit: stringToNumber(deposit) || 0,
      amount: stringToNumber(amount),
      init_date: new Date(initDate.split("/").reverse().join("-")),
      end_date: new Date(endDate.split("/").reverse().join("-")),
      observations,
    };

    const result = addReservation(reservation);

    setLoading(result);
  };

  const formatDate = (text: string) => {
    const cleaned = text.replace(/\D/g, "");

    let formatted = cleaned;

    if (cleaned.length > 2) {
      formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
    }
    if (cleaned.length > 4) {
      formatted =
        cleaned.slice(0, 2) +
        "/" +
        cleaned.slice(2, 4) +
        "/" +
        cleaned.slice(4, 8);
    }

    return formatted;
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-5">
        
      <Calendar 
        current={today}
        markedDates={styledDaysSelection}
        onDayPress={selectionPress}
        onMonthChange={() => {return;}}
      />

      <View className="flex-row w-max-[100vw] mt-4 gap-2">
        <TextInput
          placeholder="Data início (DD/MM/AAAA)"
          placeholderTextColor="gray"
          keyboardType="numeric"
          value={initDate}
          onChangeText={(text) => setInitDate(formatDate(text))}
          className="border border-gray-300 rounded-lg p-3 flex-1"
        />

        <TextInput
          placeholder="Data fim (DD/MM/AAAA)"
          placeholderTextColor="gray"
          keyboardType="numeric"
          value={endDate}
          onChangeText={(text) => setEndDate(formatDate(text))}
          className="border border-gray-300 rounded-lg p-3 flex-1"
        />
      </View>

      <TextInput
        placeholder="Nome do cliente"
        placeholderTextColor="gray"
        value={name}
        onChangeText={setName}
        className="border border-gray-300 rounded-lg p-3 mb-4 mt-4"
      />

      <TextInput
        placeholder="Contato"
        placeholderTextColor="gray"
        value={contact}
        onChangeText={setContact}
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      <TextInput
        placeholder="Valor total"
        placeholderTextColor="gray"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      <TextInput
        placeholder="Sinal (opcional)"
        placeholderTextColor="gray"
        value={deposit}
        onChangeText={setDeposit}
        keyboardType="numeric"
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      <TextInput
        placeholder="Observações"
        placeholderTextColor="gray"
        value={observations}
        onChangeText={setObservations}
        multiline
        className="border border-gray-300 rounded-lg p-3 mb-6"
      />

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={loading}
        className="bg-blue-500 p-4 rounded-xl items-center mb-[400px]"
      >
        <Text className="text-white font-bold">
          {loading ? "Salvando..." : "Salvar"}
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}