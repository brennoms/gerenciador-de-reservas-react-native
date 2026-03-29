import { createContext } from "react";

type CalendarContextType = {
	today: Date;
	selectedDate: Date;
	calendarDayPress: (day: Date) => void;
	calendarDate: Date;
	calendarMonthChange: (month: Date) => void;
	styledDays: { [key: string]: any };
	reloadStyledDays: () => void;
};

export const CalendarContext = createContext<CalendarContextType | null>(null);