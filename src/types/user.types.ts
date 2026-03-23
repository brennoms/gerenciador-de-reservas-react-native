export type UserProps = {
	user_id: string;
	name: string;
	email: string;
}

export type CreateUser = {
	name: string;
	email: string;
	pass: string;
	code: string;
}

export type UserLogin = {
	email: string;
	pass: string;
}

export type LoginResponse = {
	user_id: string;
	token: string;
}