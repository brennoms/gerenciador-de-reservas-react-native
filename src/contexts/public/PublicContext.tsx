import { createContext } from "react";
import { CreateUser } from "@/src/types/user.types";

type PublicContextType = {
	setName: (name: string) => void;
	setEmail: (email: string) => void;
	setPass: (pass: string) => void;
	setCode: (code: string) => void;
	setToken: (token: string) => void;
	name: string;
	email: string;
	pass: string;
	code: string;
	token: string;
} & CreateUser;


export const PublicContext = createContext<PublicContextType | null>(null);