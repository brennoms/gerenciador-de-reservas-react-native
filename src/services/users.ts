import axios from "axios";
import { api } from "./api";

import {
  CreateUser,
  LoginResponse,
  UserLogin,
  UserProps,
} from "../types/user.types";


export type ServiceResponse<T = unknown> = {
  success: boolean;
  data?: T;
  message?: string;
};

const logError = (serviceName: string, error: unknown) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data || error.message;
    const status = error.response?.status;
    console.error(`[${serviceName}] Erro ${status}:`, message);
  } else {
    console.error(`[${serviceName}] Erro inesperado:`, error);
  }
};


const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (typeof error.response?.data === "object") {
      return (error.response?.data as any)?.erro || 
        (error.response?.data as any)?.error ||
        error.message;
    }

    return error.response?.data || error.message;
  }

  return "Erro inesperado. Tente novamente.";
};


export async function loginService({
  email,
  pass,
}: UserLogin): Promise<ServiceResponse<LoginResponse>> {
  try {
    console.log(`[loginService] Tentando login para: ${email}`);

    const res = await api.post(`/usuarios/login`, {
      email,
      senha: pass,
    });

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    logError("loginService", error);

    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}


export async function getUserService(
  token: string
): Promise<ServiceResponse<UserProps>> {
  try {
    const res = await api.get(`/usuarios/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    logError("getUserService", error);

    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}


export async function registerService(
  data: CreateUser
): Promise<ServiceResponse> {
  try {
    console.log(`[registerService] Cadastrando: ${data.email}`);

    await api.post(`/usuarios/cadastro`, {
      nome: data.name,
      email: data.email,
      senha: data.pass,
      codigo: data.code,
    });

    return {
      success: true,
      message: "Usuário criado com sucesso",
    };
  } catch (error) {
    logError("registerService", error);

    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}


export async function sendCodeService(
  email: string
): Promise<ServiceResponse> {
  try {
    console.log(`[sendCodeService] Código para: ${email}`);

    await api.post(`/usuarios/cadastro/codigo`, { email });

    return {
      success: true,
      message: "Código enviado com sucesso",
    };
  } catch (error) {
    logError("sendCodeService", error);

    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}