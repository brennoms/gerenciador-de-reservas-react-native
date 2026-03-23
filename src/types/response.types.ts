export type response<T> = {
	ok: boolean;
	setatusCode: number;
	data: T;
};
