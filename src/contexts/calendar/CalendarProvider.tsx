import { useState, useEffect, ReactNode } from "react";

import { CalendarContext } from "./CalendarContext";
import { useReservation } from "../reservation/ReservationHook";


export function CalendarProvider({ children }: { children: ReactNode }) {

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [styledDays, setStyledDays] = useState<[{ [key: string]: any }]>([{}]);
  
  const { reservations } = useReservation();

  useEffect(() => {

    reloadStyledDays();

  }, [reservations])

  const calendarDayPress = (day: Date) => {
    setSelectedDate(day);
  }

  const calendarMonthChange = (month: Date) => {
    setCalendarDate(month);
  }

  const reloadStyledDays = () => {
    const newStyledDays = {};

    for (const reservation of reservations) {

      newStyledDays[reservation.init_date.toISOString().split("T")[0]] = {
        startingDay: true,
        color: "blue",
        textColor: "white"
      }
      
      for (const i = new Date(reservation.init_date.getTime() + (24 * 60 * 60 * 1000)) ; i < reservation.end_date ; i.setDate(i.getDate() + 1)) {
        newStyledDays[i.toISOString().split("T")[0]] = {
          color: "blue",
          textColor: "white"
        }
      }

      newStyledDays[reservation.end_date.toISOString().split("T")[0]] = {
        endingDay: true,
        color: "blue",
        textColor: "white"
      }

    }

    if (newStyledDays[today.toISOString().split("T")[0]]) {
      newStyledDays[today.toISOString().split("T")[0]].color = "lightblue"
      newStyledDays[today.toISOString().split("T")[0]].textColor = "black"
    } else {
      newStyledDays[today.toISOString().split("T")[0]] = {
        color: "lightblue",
        textColor: "black"
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