import axios from "axios";
import { api } from "./api";

import { PropertyProps } from "../types/property.types";


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


export async function getPropertiesService(
  token: string
): Promise<ServiceResponse<PropertyProps[]>> {
  try {
    const res = await api.get(`/imoveis`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      data: res.data.imoveis,
    };
  } catch (error) {
    logError("getPropertiesService", error);

    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}


export async function getPropertyByIdService(
  token: string,
  id: number
): Promise<ServiceResponse<PropertyProps>> {
  try {
    const res = await api.get(`/imoveis/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    logError("getPropertyByIdService", error);

    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}


export async function createPropertyService(
  token: string,
  data: {
    nome: string;
    descricao: string;
    preco: number;
    imagem?: any; // file (expo-image-picker)
  }
): Promise<ServiceResponse> {
  try {
    const formData = new FormData();

    formData.append("nome", data.nome);
    formData.append("descricao", data.descricao);
    formData.append("preco", String(data.preco));

    if (data.imagem) {
      formData.append("imagem", {
        uri: data.imagem.uri,
        name: "image.jpg",
        type: "image/jpeg",
      } as any);
    }

    await api.post(`/imoveis`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: true,
      message: "Imóvel criado com sucesso",
    };
  } catch (error) {
    logError("createPropertyService", error);

    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}

export async function deletePropertyService(
  token: string,
  id: number
): Promise<ServiceResponse> {
  try {
    await api.delete(`/imoveis/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Imóvel removido com sucesso",
    };
  } catch (error) {
    logError("deletePropertyService", error);

    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}