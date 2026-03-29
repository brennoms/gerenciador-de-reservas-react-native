import { useState, useEffect, ReactNode, use} from "react";

import { ReservationContext } from "./ReservationContext";
import { ReservationsProps, CreateReservation } from "@/src/types/reservations.types";

import { useAuth } from "../auth/AuthHook";
import { useProperty } from "../property/PropertyHook";

import { 
  fetchReservations, 
  addReservationService, 
  removeReservationService, 
  updateReservationService 
} from "@/src/services/reservationService";

export function PropertyProvider({ children }: { children: ReactNode }) {
  
  const { token } = useAuth();
  const { propertySelected } = useProperty();

  const [reservations, setReservations] = useState<ReservationsProps[]>([]);

  useEffect(() => {
    if (token) {
      populateReservations();
    }
  }, [token]);

  const populateReservations = () => {
    if (token) {
      fetchReservations(token).then((res) => {
        
        if (res.data) {
          setReservations(res.data);
        } else {
          alert(res.message || "Failed to fetch reservations");
        }
      
        });
    }
  }

  const addReservation = (reservation: CreateReservation) => {
    if (token) {
      addReservationService(token, propertySelected?.id, reservation).then((res) => {
        if (res.data) {
          populateReservations();
        } else {
          alert(res.message || "Failed to add reservation");
        }
      });
    }
  }

  const removeReservation = (reservationId: number) => {
    if (token) {
      removeReservationService(token, reservationId).then((res) => {
        if (res.success) {
          populateReservations();
        } else {
          alert(res.message || "Failed to remove reservation");
        }
      });
    }
  }

  const updateReservation = (reservationId: number, updatedData: CreateReservation) => {
    if (token) {
      updateReservationService(token, reservationId, updatedData).then((res) => {
        if (res.success) {
          populateReservations();
        } else {
          alert(res.message || "Failed to update reservation");
        }
      });
    }
  }


  return (
    <ReservationContext.Provider value={{ reservations, addReservation, removeReservation, updateReservation }}>
      {children}
    </ReservationContext.Provider>
  );
}