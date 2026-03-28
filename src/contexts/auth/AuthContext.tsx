import { createContext } from "react";

import { UserProps } from "@/src/types/user.types";

type AuthContextType = {
	user: UserProps | null;
	token: string | null;
	signIn: (token: string) => void;
	signOut: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);