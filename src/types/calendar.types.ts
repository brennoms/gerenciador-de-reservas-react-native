import { ReservationProps } from "react-native-calendars/src/agenda/reservation-list/reservation";

export type HolidayProps = {
    date: string;
    name: string;
    type: string;
    level: string;
};

export type DayProps = {
    date: string;
    day: number;
    holiday?: HolidayProps;
    reservation?: ReservationProps;
    actual_day?: boolean;
};

export type MonthProps = {
    year: number;
    month_name: string;
    month_number: number;
    days: DayProps[];
};

export type CalendarProps = MonthProps[];
