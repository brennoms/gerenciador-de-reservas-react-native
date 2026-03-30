import { createContext } from "react";
import { HolydayProps } from "@/src/types/calendar.types"

type CalendarContextType = {
	today: {date: Date, holiday: HolydayProps};
	selectedDate: Date;
	calendarDayPress: (day: Date) => void;
	calendarDate: Date;
	calendarMonthChange: (month: Date) => void;
	styledDays: { [key: string]: any };
	reloadStyledDays: () => void;
};

export const CalendarContext = createContext<CalendarContextType | null>(null);