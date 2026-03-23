import { useState, useEffect, ReactNode } from "react";
import axios from "axios";

import { CalendarContext } from "./CalendarContext";
import { CalendarProps } from "@/src/types/calendar.types";
import { useProperty } from "../property/PropertyHook";



export function CalendarProvider({ children }: { children: ReactNode }) {

  const { propertySelected } = useProperty();
  const [calendar, setCalendar] = useState<CalendarProps>([]);

  useEffect(() => {

    console.log('calendar');

  }, [])

  return (
    <CalendarContext.Provider value={{ calendar }}>
      {children}
    </CalendarContext.Provider>
  );
}