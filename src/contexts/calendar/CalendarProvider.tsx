import { useState, useEffect, ReactNode } from "react";

import { CalendarContext } from "./CalendarContext";
import { CalendarProps } from "@/src/types/calendar.types";
import { useProperty } from "../property/PropertyHook";
import { getCalendar } from "@/src/services/calendar";



export function CalendarProvider({ children }: { children: ReactNode }) {

  const { propertySelected } = useProperty();
  const [calendar, setCalendar] = useState<CalendarProps>([]);

  useEffect(() => {

    getCalendar()
    .then((data) => {
      setCalendar(data);
    })

  }, [])

  return (
    <CalendarContext.Provider value={{ calendar }}>
      {children}
    </CalendarContext.Provider>
  );
}