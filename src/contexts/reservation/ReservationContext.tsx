import { createContext } from "react";
import { ReservationsProps, CreateReservation } from "@/src/types/reservations.types";

type ReservationContextType = {
  reservations: ReservationsProps[];
  addReservation: (reservation: CreateReservation) => void;
  removeReservation: (reservationId: number) => void;
  updateReservation: (reservationId: number, updatedData: CreateReservation) => void;
};

export const ReservationContext = createContext<ReservationContextType | null>(null);