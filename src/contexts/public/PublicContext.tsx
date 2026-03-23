import { createContext } from "react";
import { CreateUser } from "@/src/types/user.types";


export const PublicContext = createContext<CreateUser | null>(null);