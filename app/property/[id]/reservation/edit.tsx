import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";


import { useReservation } from "@/src/contexts/reservation/ReservationHook";
import { useProperty } from "@/src/contexts/property/PropertyHook";

export default function AddReservation() {
  const { updateReservation, selectedReservation } = useReservation();
  const { propertySelected } = useProperty();

  const [name, setName] = useState(selectedReservation?.name || "");
  const [contact, setContact] = useState(selectedReservation?.contact || "");
  const [deposit, setDeposit] = useState(String(selectedReservation?.deposit) || "");
  const [amount, setAmount] = useState(String(selectedReservation?.amount) || "");
  const [initDate, setInitDate] = useState(
    selectedReservation?.init_date.toLocaleDateString("pt-BR", { timeZone: "UTC" }) || ""
  );
  const [endDate, setEndDate] = useState(
    selectedReservation?.end_date.toLocaleDateString("pt-BR", { timeZone: "UTC" }) || ""
  );
  const [observations, setObservations] = useState(selectedReservation?.observations || "");

  const [loading, setLoading] = useState(false);

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
      deposit: Number(deposit) || 0,
      amount: Number(amount),
      init_date: new Date(initDate.split("/").reverse().join("-")),
      end_date: new Date(endDate.split("/").reverse().join("-")),
      observations,
    };

    console.log(reservation)

    const result = updateReservation(reservation);

    setLoading(result);
  };

  return (
    <KeyboardAvoidingView
      className="bg-gray-100 p-5"
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TextInput
        placeholder="Nome do cliente"
        value={name}
        onChangeText={setName}
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      <TextInput
        placeholder="Contato"
        value={contact}
        onChangeText={setContact}
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      <TextInput
        placeholder="Valor total"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      <TextInput
        placeholder="Sinal (opcional)"
        value={deposit}
        onChangeText={setDeposit}
        keyboardType="numeric"
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      <TextInput
        placeholder="Data início (YYYY-MM-DD)"
        value={initDate}
        onChangeText={setInitDate}
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      <TextInput
        placeholder="Data fim (YYYY-MM-DD)"
        value={endDate}
        onChangeText={setEndDate}
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      <TextInput
        placeholder="Observações"
        value={observations}
        onChangeText={setObservations}
        multiline
        className="border border-gray-300 rounded-lg p-3 mb-6"
      />

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={loading}
        className="bg-blue-500 p-4 rounded-xl items-center"
      >
        <Text className="text-white font-bold">
          {loading ? "Salvando..." : "Salvar"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}