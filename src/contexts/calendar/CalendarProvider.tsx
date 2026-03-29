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

  }, [])

  const calendarDayPress = (day: Date) => {
    setSelectedDate(day);
  }

  const calendarMonthChange = (month: Date) => {
    setCalendarDate(month);
  }

  const reloadStyledDays = () => {
    return {}
  }

  return (
    <CalendarContext.Provider value={{ selectedDate, calendarDayPress, calendarDate, calendarMonthChange, styledDays, reloadStyledDays,today }}>
      {children}
    </CalendarContext.Provider>
  );
}