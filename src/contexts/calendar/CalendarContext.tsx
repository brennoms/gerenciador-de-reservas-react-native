import { createContext } from "react";

import { CalendarProps } from "@/src/types/calendar.types";

type CalendarContextType = {
	calendar: CalendarProps;
};

export const CalendarContext = createContext<CalendarContextType | null>(null);