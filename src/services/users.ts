import axios, { AxiosError } from "axios";
import { CreateUser, LoginResponse, UserLogin, UserProps } from "../types/user.types";

const url = process.env.EXPO_PUBLIC_API_URL;

const logError = (serviceName: string, error: unknown) => {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data || error.message;
        const status = error.response?.status;
        console.error(`[${serviceName}] Erro ${status}:`, message);
    } else {
        console.error(`[${serviceName}] Erro inesperado:`, error);
    }
};

export async function loginService({ email, pass }: UserLogin) {
    try {
        console.log(`[loginService] Tentando login para: ${email}`);
        const res = await axios.post(`${url}/usuarios/login`, { email: email, senha: pass });
        
        if (res.status === 200 || res.status === 201) {
            return res.data as LoginResponse;
        }
        return false;
    } catch (error) {
        logError("loginService", error);
        return false;
    }
}

export async function getUserService(token: string) {
    try {
        const res = await axios.get(`${url}/usuarios/me`, { 
            headers: { Authorization: `Bearer ${token}` } 
        });

        if (res.status === 200) {
            return res.data as UserProps;
        }
        return false;
    } catch (error) {
        logError("getUserService", error);
        return false;
    }
}

export async function registerService({ name, email, pass, code }: CreateUser) {
    try {
        console.log(`[registerService] Cadastrando: ${email}`);
        const res = await axios.post(`${url}/usuarios/cadastro`, { 
            nome: name, 
            email: email, 
            senha: pass, 
            codigo: code 
        });

        return res.status === 201;
    } catch (error) {
        logError("registerService", error);
        return false;
    }
}

export async function sendCodeService(email: string) {
    try {
        console.log(`[sendCodeService] Solicitando código para: ${email}`);
        const res = await axios.post(`${url}/usuarios/cadastro/codigo`, { email });

        return res.status === 201 || res.status === 200;
    } catch (error) {
        logError("sendCodeService", error);
        return false;
    }
}