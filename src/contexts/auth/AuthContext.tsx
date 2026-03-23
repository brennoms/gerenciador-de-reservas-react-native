import { createContext } from "react";

import { UserProps } from "@/src/types/user.types";

type AuthContextType = {
	user: UserProps | null;
	token: String;
};

export const AuthContext = createContext<AuthContextType | null>(null);