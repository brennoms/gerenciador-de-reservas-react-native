import axios from "axios";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export const apiNoAuth = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});


let onUnauthorized: (() => void) | null = null;

export function setUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler;
}
export function getUnauthorizedHandler() {
  return onUnauthorized;
}

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      onUnauthorized?.();
    }

    return Promise.reject(err);
  }
);


export const logError = (serviceName: string, error: unknown) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data || error.message;
    const status = error.response?.status;
    console.error(`[${serviceName}] Erro ${status}:`, message);
  } else {
    console.error(`[${serviceName}] Erro inesperado:`, error);
  }
};

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (typeof error.response?.data === "object") {
      return (
        (error.response?.data as any)?.erro ||
        (error.response?.data as any)?.error ||
        error.message
      );
    }

    return error.response?.data || error.message;
  }

  return "Erro inesperado. Tente novamente.";
};

export type ServiceResponse<T = unknown> = {
  success: boolean;
  data?: T;
  message?: string;
};