import { useState, useEffect, ReactNode, use} from "react";

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

  useEffect(() => {
    if (token && propertySelected) {
      populateReservations();
    }
  }, [token]);

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
        if (res.data) {
          populateReservations();
        } else {
          alert(res.message || "Failed to add reservation");
        }
      });
    }
  }

  const removeReservation = (reservationId: number) => {
    if (token && propertySelected) {
      deleteReservationService(token, propertySelected.id, reservationId).then((res) => {
        if (res.success) {
          populateReservations();
        } else {
          alert(res.message || "Failed to remove reservation");
        }
      });
    }
  }

  const updateReservation = (reservationId: number, updatedData: CreateReservation) => {
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


  return (
    <ReservationContext.Provider value={{ reservations, addReservation, removeReservation, updateReservation }}>
      {children}
    </ReservationContext.Provider>
  );
}