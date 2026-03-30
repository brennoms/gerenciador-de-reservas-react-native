import { useState, useEffect, ReactNode } from "react";

import { CalendarContext } from "./CalendarContext";
import { useReservation } from "../reservation/ReservationHook";


export function CalendarProvider({ children }: { children: ReactNode }) {

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [styledDays, setStyledDays] = useState<[{ [key: string]: any }]>([{}]);
  
  const { reservations, selectedReservation } = useReservation();

  useEffect(() => {

    reloadStyledDays();

  }, [reservations, selectedDate])

  const calendarDayPress = (day: Date) => {
    setSelectedDate(day);
  }

  const calendarMonthChange = (month: Date) => {
    setCalendarDate(month);
  }

  const reloadStyledDays = () => {

    function isoDate(date: Date) {
      return date.toISOString().split("T")[0];
    }

    const newStyledDays = {};

    for (const reservation of reservations) {

      let color = "";
      if (reservation.id === selectedReservation?.id){
        color = "orange";
      } else {
        color = "darkblue";
      }

      newStyledDays[isoDate(reservation.init_date)] = {
        startingDay: true,
        color: color,
        textColor: "white"
      }
      
      for (const i = new Date(reservation.init_date.getTime() + (24 * 60 * 60 * 1000)) ; i < reservation.end_date ; i.setDate(i.getDate() + 1)) {
        newStyledDays[isoDate(i)] = {
          color: color,
          textColor: "white"
        }
      }

      newStyledDays[isoDate(reservation.end_date)] = {
        endingDay: true,
        color: color,
        textColor: "white"
      }

    }

    if (newStyledDays[isoDate(today)]) {
      newStyledDays[isoDate(today)].color = "blue"
      newStyledDays[isoDate(today)].textColor = "white"
    } else {
      newStyledDays[isoDate(today)] = {
        color: "blue",
        textColor: "white",
        startingDay: true,
        endingDay: true
      }
    }

    if (newStyledDays[isoDate(selectedDate)]) {
      newStyledDays[isoDate(selectedDate)].color = `dark${newStyledDays[isoDate(selectedDate)].color}`
      newStyledDays[isoDate(selectedDate)].textColor = "white"
    } else {
      newStyledDays[isoDate(selectedDate)] = {
        color: "gray",
        textColor: "white",
        startingDay: true,
        endingDay: true
      }
    }

    setStyledDays(newStyledDays);
  }

  return (
    <CalendarContext.Provider value={{ selectedDate, calendarDayPress, calendarDate, calendarMonthChange, styledDays, reloadStyledDays,today }}>
      {children}
    </CalendarContext.Provider>
  );
}