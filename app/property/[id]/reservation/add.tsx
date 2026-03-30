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
  const { addReservation } = useReservation();
  const { propertySelected } = useProperty();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [deposit, setDeposit] = useState("");
  const [amount, setAmount] = useState("");
  const [initDate, setInitDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [observations, setObservations] = useState("");

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
        placeholder="Data início (DD/MM/AAAA)"
        keyboardType="numeric"
        value={initDate}
        onChangeText={(text) => setInitDate(formatDate(text))}
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      <TextInput
        placeholder="Data fim (DD/MM/AAAA)"
        keyboardType="numeric"
        value={endDate}
        onChangeText={(text) => setEndDate(formatDate(text))}
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