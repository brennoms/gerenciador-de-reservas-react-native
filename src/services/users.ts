import axios from "axios";
import { api, logError, getErrorMessage } from "./api";

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

    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return {
        success: false,
        message: "Código inválido",
      };
    }

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