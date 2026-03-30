import React from "react";
import { Calendar as RNCalendar } from "react-native-calendars";

type CalendarProps = {
  current: Date;
  markedDates: any;

  onDayPress: (date: Date) => void;
  onMonthChange: (date: Date) => void;
};

export default function AppCalendar({
  current,
  markedDates,
  onDayPress,
  onMonthChange,
}: CalendarProps) {

  function handleDay(day: any) {
    const [ano, mes, dia] = day.dateString.split("-").map(Number);
    onDayPress(new Date(ano, mes - 1, dia));
  }

  function handleMonth(month: any) {
    onMonthChange(new Date(month.year, month.month - 1, 1));
  }

  return (
    <RNCalendar
      style={{ borderRadius: 10 }}
      enableSwipeMonths={true}
      hideExtraDays={false}
      current={current.toISOString().split("T")[0]}
      markingType={"period"}
      onDayPress={handleDay}
      onMonthChange={handleMonth}
      markedDates={markedDates}
    />
  );
}