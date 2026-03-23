import axios from "axios"
import { CreateUser, UserLogin, UserProps } from "../types/user.types";

const url = process.env.EXPO_PUBLIC_API_URL

type response<T> = {
	statusCode: number;
	data: T;
};

export async function login({email, pass}: UserLogin) {
	const res: response<UserLogin> = await axios.post(`${url}/usuarios/login`);

	if (res.statusCode === 201) {
		return res.data.token;
	}

}

export async function getUser(token: string) {
	const res: response<UserProps> = await axios.get(`${url}/usuarios/me`, 
		{ headers: { Authorization: `Bearer ${token}` } });

	if (res.statusCode === 201) {
		return res.data;
	}

}

export async function register({name, email, pass, code}: CreateUser) {
	const res: response<{message: string}> = await axios.post(`${url}/usuarios/register`);

	if (res.statusCode === 201) {
		return true;
	}

}

export async function sendCode(email: string) {

	const res: response<{ok: boolean}> = await axios.post(`${url}/usuarios/register`);

	if (res.statusCode === 201) {
		return true;
	}

}
