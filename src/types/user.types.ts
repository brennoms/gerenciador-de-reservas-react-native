export type UserProps = {
	user_id: String;
	name: String;
	email: String;
}

export type CreateUser = {
	name: String;
	email: String;
	pass: String;
	code: String;
}

export type UserLogin = {
	email: String;
	pass: String;
}