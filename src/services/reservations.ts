import { api, logError, getErrorMessage, ServiceResponse } from "./api";
import {
  ReservationsProps,
  CreateReservation,
} from "@/src/types/reservations.types";


export async function getReservationsService(
  token: string
): Promise<ServiceResponse<ReservationsProps[]>> {
  try {
    const res = await api.get(`/reservas`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const reservations: ReservationsProps[] = res.data.reservas.map(
      (item: any) => ({
        id: item._id,
        user_id: item.usuario_id,
        property_id: item.imovel_id,
        name: item.nome,
        contact: item.contato,
        deposit: item.sinal,
        amount: item.valor,
        init_date: item.data_inicio,
        end_date: item.data_fim,
        observations: item.observacoes,
      })
    );

    return {
      success: true,
      data: reservations,
    };
  } catch (error) {
    logError("getReservationsService", error);

    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}


export async function getReservationByIdService(
  token: string,
  id: number
): Promise<ServiceResponse<ReservationsProps>> {
  try {
    const res = await api.get(`/reservas/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const reservation: ReservationsProps = {
      id: res.data._id,
      user_id: res.data.usuario_id,
      property_id: res.data.imovel_id,
      name: res.data.nome,
      contact: res.data.contato,
      deposit: res.data.sinal,
      amount: res.data.valor,
      init_date: res.data.data_inicio,
      end_date: res.data.data_fim,
      observations: res.data.observacoes,
    };

    return {
      success: true,
      data: reservation,
    };
  } catch (error) {
    logError("getReservationByIdService", error);

    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}


export async function getReservationsByPropertyService(
  token: string,
  propertyId: number
): Promise<ServiceResponse<ReservationsProps[]>> {
  try {
    const res = await api.get(`/imoveis/${propertyId}/reservas`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(res.data);

    if (!res.data.reservas) {
      return {
        success: true,
        data: [],
      };
    }

    const reservations: ReservationsProps[] = res.data.reservas.map(
      (item: any) => ({
        id: item._id,
        user_id: item.usuario_id,
        property_id: item.imovel_id,
        name: item.nome,
        contact: item.contato,
        deposit: item.sinal,
        amount: item.valor,
        init_date: item.data_inicio,
        end_date: item.data_fim,
        observations: item.observacoes,
      })
    );

    return {
      success: true,
      data: reservations,
    };
  } catch (error) {
    logError("getReservationsByPropertyService", error);

    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}


export async function createReservationService(
  token: string,
  propertyId: number,
  data: CreateReservation
): Promise<ServiceResponse> {
  try {
    await api.post(
      `/imoveis/${propertyId}/reservas`,
      {
        nome: data.name,
        contato: data.contact,
        sinal: data.deposit,
        valor: data.amount,
        data_inicio: data.init_date,
        data_fim: data.end_date,
        observacoes: data.observations,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Reserva criada com sucesso",
    };
  } catch (error) {
    logError("createReservationService", error);

    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}


export async function deleteReservationService(
  token: string,
  propertyId: number,
  reservationId: number
): Promise<ServiceResponse> {
  try {
    await api.delete(
      `/imoveis/${propertyId}/reservas/${reservationId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Reserva removida com sucesso",
    };
  } catch (error) {
    logError("deleteReservationService", error);

    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}


export async function updateReservationService(
  token: string,
  propertyId: number,
  reservationId: number,
  data: CreateReservation
): Promise<ServiceResponse<ReservationsProps>> {
  try {
    const res = await api.put(
      `/imoveis/${propertyId}/reservas/${reservationId}`,
      {
        nome: data.name,
        contato: data.contact,
        sinal: data.deposit,
        valor: data.amount,
        data_inicio: data.init_date,
        data_fim: data.end_date,
        observacoes: data.observations,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const reservationUpdated: ReservationsProps = {
      id: res.data._id,
      user_id: res.data.usuario_id,
      property_id: res.data.imovel_id,
      name: res.data.nome,
      contact: res.data.contato,
      deposit: res.data.sinal,
      amount: res.data.valor,
      init_date: res.data.data_inicio,
      end_date: res.data.data_fim,
      observations: res.data.observacoes,
    };

    return {
      success: true,
      data: reservationUpdated,
      message: "Reserva atualizada com sucesso",
    };
  } catch (error) {
    logError("updateReservationService", error);

    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}