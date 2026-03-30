import { 
    api, 
    apiNoAuth,
    logError, 
    getErrorMessage, 
    ServiceResponse,
} from './api';

import { CalendarProps, HolidayProps } from '../types/calendar.types';
import { ReservationProps } from 'react-native-calendars/src/agenda/reservation-list/reservation';

function mapCalendarData(data: any): CalendarProps {
  return data.map((month: any) => ({
    year: month.ano,
    month_name: month.mes_nome,
    month_number: month.mes_numero,
    days: month.dias.map((day: any) => ({
      date: day.date,
      day: day.dia,
      actual_day: day.dia_atual,
      holiday: day.feriado
        ? {
            date: day.feriado.date,
            name: day.feriado.name,
            type: day.feriado.type,
            level: day.feriado.level,
          }
        : undefined,
      reservation: data.reserva ? <ReservationProps>{
        user_id: data.usuario_id,
        property_id: data.imovel_id,
        name: data.nome,
        contact: data.contato,
        deposit: data.deposito,
        amount: data.valor,
        init_date: data.data_inicio,
        end_date: data.data_fim,
        observations: data.observacoes,
      } : undefined, // se existir
    })),
  }));
}


export async function getCalendarService(
    token: string,
    propertyID: number,
    year: number,
): Promise<ServiceResponse<CalendarProps>> {
	
    try {

        const res = await api.get(`/${propertyID}/calendario/restrito`, {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                ano: year,
                estado: "RJ",
            }
        });

        const calendarData: CalendarProps = mapCalendarData(res.data);

        return {
            success: true,
            data: calendarData,
        };

    } catch (error) {
        logError("calendarService", error);

        return {
            success: false,
            message: getErrorMessage(error),
        };
    }

}

export async function getHolidaysService(token: string, year: Number): 
    Promise<ServiceResponse<HolidayProps[]>> {
    
    try {
        const res = await apiNoAuth.get(`/calendario/feriados`, {
            headers: { Authorization: `Bearer ${token}` },
            params: {
                ano: year,
                estado: "RJ",
            }
        });

        return {
            success: true,
            data: res.data,
        };

    } catch (error) {
        logError("calendarService", error);

        return {
            success: false,
            message: getErrorMessage(error),
        };
    }

}