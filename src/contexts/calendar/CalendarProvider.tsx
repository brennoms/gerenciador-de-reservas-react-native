import { useState, useEffect, ReactNode } from "react";
import {useLocalSearchParams} from "expo-router"

import { CalendarContext } from "./CalendarContext";
import { useReservation } from "../reservation/ReservationHook";
import { useAuth } from "../auth/AuthHook";

import { HolydayProps } from "@/src/types/calendar.types"
import { getHolidaysService } from "@/src/services/calendar"


export function CalendarProvider({ children }: { children: ReactNode }) {

  const { token } = useAuth()

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [holidays, setHolidays] = useState<HolydayProps[] | null>(null)
  const [styledDays, setStyledDays] = useState<[{ [key: string]: any }]>([{}]);

  const [styledDaysSelection, setStyledDaysSelection] = useState<[{ [key: string]: any }]>([{}]);
  const [selection, setSelection] = useState([today, today]);
  const [selectionCalendar, setSelectionCalendar] = useState(false)
  
  const { reservations, selectedReservation, selectReservation } = useReservation();

  useEffect(() => {

    reloadStyledDays();

    if (selectionCalendar === "add" || selectionCalendar === "edit") {
      reloadStyledDaysSelection();
    }

  }, [reservations, selectedDate, calendarDate, holidays, selection])

  useEffect(() => {

    setSelection([]);

  }, [selectionCalendar])

  useEffect(() => {

    if (token) {
      getHolidaysService(token, today.toISOString().split("T")[0].split("-")[0])
      .then((res) => {
        setHolidays(res.data);
      })
    }

    calendarDayPress(today)

  }, [])

  const calendarDayPress = (day: Date) => {
    if (holidays ){
      const holiday = holidays.find(item => item.date === day.toISOString().split("T")[0]);
      setSelectedDate({date: day, holiday});
      selectReservation(day)
    } else {
      setSelectedDate({date: day});
      selectReservation(day)
    }
  }

  const calendarMonthChange = (month: Date) => {
    function getYear(date: Date) {
      return date.toISOString().split("T")[0].split("-")[0];
    }

    if (getYear(month) !== getYear(calendarDate)) {
      getHolidaysService(token, Number(getYear(month)))
      .then((res) => {
        setHolidays(res.data)
      })
    }
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
      newStyledDays[isoDate(today)].color = "green"
      newStyledDays[isoDate(today)].textColor = "white"
    } else {
      newStyledDays[isoDate(today)] = {
        color: "green",
        textColor: "white",
        startingDay: true,
        endingDay: true
      }
    }

    if (selectedDate){
      if (newStyledDays[isoDate(selectedDate.date)]) {
        newStyledDays[isoDate(selectedDate.date)].color = `dark${newStyledDays[isoDate(selectedDate.date)].color}`
        newStyledDays[isoDate(selectedDate.date)].textColor = "white"
      } else {
        newStyledDays[isoDate(selectedDate.date)] = {
          color: "gray",
          textColor: "white",
          startingDay: true,
          endingDay: true
        }
      }
    }

    if (holidays) {
      for (const holiday of holidays) {
        if (newStyledDays[holiday.date]) {
          newStyledDays[holiday.date].textColor = "red"
        } else {
          newStyledDays[holiday.date] = {
            textColor: "red"
          }
        }
      }

    }

    setStyledDays(newStyledDays);
  }

  const reloadStyledDaysSelection = () => {

    function isoDate(date: Date) {
      return date?.toISOString().split("T")[0];
    }

    const newStyledDays = {};

    let color = "lightblue";
    let initDate, endDate;

    if (selection.length === 2) {
      if ( isoDate(selection[0]) < isoDate(selection[1])) {
        initDate = selection[0];
        endDate = selection[1];
      } else {
        initDate = selection[1];
        endDate = selection[0];
      }

      newStyledDays[isoDate(initDate)] = {
        startingDay: true,
        color: color,
        textColor: "white"
      }
      
      for (const i = new Date(initDate.getTime() + (24 * 60 * 60 * 1000)) ; i < endDate ; i.setDate(i.getDate() + 1)) {
        newStyledDays[isoDate(i)] = {
          color: color,
          textColor: "white"
        }
      }

      newStyledDays[isoDate(endDate)] = {
        endingDay: true,
        color: color,
        textColor: "white"
      }
    } else {
      newStyledDays[isoDate(selection[0])] = {
        startingDay: true,
        endingDay: true,
        color: color,
        textColor: "white"
      }
    }

    for (const reservation of reservations) {

      if (selectionCalendar === "edit" && reservation.id === selectedReservation?.id) {
        continue;
      }

      let color = "orange";

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
      newStyledDays[isoDate(today)].color = "green"
      newStyledDays[isoDate(today)].textColor = "white"
    } else {
      newStyledDays[isoDate(today)] = {
        color: "green",
        textColor: "white",
        startingDay: true,
        endingDay: true
      }
    }

    if (holidays) {
      for (const holiday of holidays) {
        if (newStyledDays[holiday.date]) {
          newStyledDays[holiday.date].textColor = "red"
        } else {
          newStyledDays[holiday.date] = {
            textColor: "red"
          }
        }
      }

    }


    setStyledDaysSelection(newStyledDays);
  }

  function selectionPress(date: Date | [Date, Date]) {
    if (date.length === 2) {
      setSelection(date);
    } else if (selection.length >= 2) {
      setSelection([date]);
    } else {
      setSelection([...selection, date]);
    }
  }

  return (
    <CalendarContext.Provider value={{ selectedDate, calendarDayPress, calendarDate, calendarMonthChange, styledDays, reloadStyledDays, today, selection, styledDaysSelection, selectionPress, setSelectionCalendar}}>
      {children}
    </CalendarContext.Provider>
  );
}