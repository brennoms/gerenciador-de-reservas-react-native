import axios from "axios";
import { api, logError, getErrorMessage, ServiceResponse } from "./api";

import { AddPropertyProps, PropertyProps } from "../types/property.types";


export async function getPropertiesService(
  token: string
): Promise<ServiceResponse<PropertyProps[]>> {
  try {
    const res = await api.get(`/imoveis`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const properties: PropertyProps[] = res.data.imoveis.map((property: any) => ({
      id: property._id,
      name: property.nome,
      address: property.endereco,
      image: property.imagem_url,
    }));

    return {
      success: true,
      data: properties,
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
  data: AddPropertyProps
): Promise<ServiceResponse> {
  try {
    console.log("Creating property with data:", data);
    const formData = new FormData();

    formData.append("nome", data.name);
    formData.append("endereco", data.address);

    if (data.image) {
      formData.append("imagem", {
        uri: data.image,
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

export async function updatePropertyService(
  token: string,
  id: number,
  data: AddPropertyProps
): Promise<ServiceResponse<PropertyProps>> {
  try {
    const formData = new FormData();

    if (data.name) {
      formData.append("nome", data.name);
    }
    if (data.address) {
      formData.append("endereco", data.address);
    }

    if (data.image) {
      formData.append("imagem", {
        uri: data.image,
        name: "image.jpg",
        type: "image/jpeg",
      } as any);
    }

    const res = await api.patch(`/imoveis/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    const propertyUpdated = {
      id: res.data._id,
      name: res.data.nome,
      address: res.data.endereco,
      image: res.data.imagem_url,
    };

    return {
      success: true,
      data: propertyUpdated,
      message: "Imóvel atualizado com sucesso",
    };
  } catch (error) {
    logError("updatePropertyService", error);

    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}