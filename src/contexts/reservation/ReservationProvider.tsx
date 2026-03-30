import { useState, useEffect, ReactNode, use} from "react";
import { router } from "expo-router";

import { ReservationContext } from "./ReservationContext";
import { ReservationsProps, CreateReservation } from "@/src/types/reservations.types";

import { useAuth } from "../auth/AuthHook";
import { useProperty } from "../property/PropertyHook";

import { 
  getReservationsByPropertyService,
  createReservationService,
  deleteReservationService,
  updateReservationService
} from "@/src/services/reservations";

export function ReservationProvider({ children }: { children: ReactNode }) {
  
  const { token } = useAuth();
  const { propertySelected } = useProperty();

  const [reservations, setReservations] = useState<ReservationsProps[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<ReservationsProps | null>(null)
  console.log(selectedReservation)

  useEffect(() => {
    if (token && propertySelected) {
      populateReservations();
    }
  }, [propertySelected]);

  const populateReservations = () => {
    if (token && propertySelected) {
      getReservationsByPropertyService(token, propertySelected.id).then((res) => {
        
        if (res.data) {
          setReservations(res.data);
        } else {
          alert(res.message || "Failed to fetch reservations");
        }
      
        });
    }
  }

  const addReservation = (reservation: CreateReservation) => {
    if (token && propertySelected) {
      createReservationService(token, propertySelected.id, reservation).then((res) => {
        if (res.success) {
          alert("Reserva criada com sucesso!");
          router.back();
          populateReservations();
        } else {
          alert(res.message || "Failed to add reservation");
        }
      });
    }
  }

  const removeReservation = (reservationId: number) => {
    if (token && propertySelected) {
      deleteReservationService(token, propertySelected.id, selectedReservation.id).then((res) => {
        if (res.success) {
          populateReservations();
        } else {
          alert(res.message || "Failed to remove reservation");
        }
      });
    }
  }

  const updateReservation = (updatedData: CreateReservation) => {
    if (token && propertySelected) {
      updateReservationService(token, propertySelected.id, reservationId, updatedData).then((res) => {
        if (res.success) {
          populateReservations();
        } else {
          alert(res.message || "Failed to update reservation");
        }
      });
    }
  }

  const selectReservation = (date: Date) => {
    let select = false;
    for (const reservation of reservations) {
      for (const i = new Date(reservation.init_date.getTime()) ; i <= reservation.end_date ; i.setDate(i.getDate() + 1)) {
        if (i.toISOString().split("T")[0] === date.toISOString().split("T")[0]) {
          select = true;
          setSelectedReservation( reservation );
          return;
        }
      }
    }

    setSelectedReservation(null);

  }

  return (
    <ReservationContext.Provider value={{ reservations, addReservation, removeReservation, updateReservation, selectedReservation, selectReservation }}>
      {children}
    </ReservationContext.Provider>
  );
}