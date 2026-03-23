import axios from "axios"
import { CreateUser, UserLogin, UserProps } from "../types/user.types";
import { response } from "../types/response.types";

const url = process.env.EXPO_PUBLIC_API_URL

export async function loginService({email, pass}: UserLogin) {
	const res: response<{token: string}> = await axios.post(`${url}/usuarios/login`);

	if (res.statusCode === 201) {
		return {ok: true, token: res.data.token};
	}

}

export async function getUserService(token: string) {
	const res: response<UserProps> = await axios.get(`${url}/usuarios/me`, 
		{ headers: { Authorization: `Bearer ${token}` } });

	if (res.statusCode === 201) {
		return {ok: true, user: res.data};
	}

}

export async function registerService({name, email, pass, code}: CreateUser) {
	const res: response<{message: string}> = await axios.post(`${url}/usuarios/register`);

	if (res.statusCode === 201) {
		return true;
	} else {
		return false;
	}

}

export async function sendCodeService(email: string) {

	const res: response<{ok: boolean}> = await axios.post(`${url}/usuarios/register`);

	if (res.statusCode === 201) {
		return true;
	} else {
		return false;
	}

}
