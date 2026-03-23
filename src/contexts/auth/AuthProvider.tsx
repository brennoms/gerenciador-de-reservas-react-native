import { useState, useEffect, ReactNode } from "react";
import { router } from "expo-router";

import { AuthContext } from "./AuthContext";
import { LoginResponse, UserLogin, UserProps } from "@/src/types/user.types";
import { loginService, getUserService } from "@/src/services/users";
import { usePublic } from "../public/PublicHook";

export function AuthProvider({ children }:  {children: ReactNode}) {

  const [user, setUser] = useState<UserProps | null>(null);
  const [token, setToken] = useState<String>("");
  const {email, pass} = usePublic();

  async function login() {

    const login = await loginService({email, pass});

    if (login) {
      setToken(login.token);

      const me = await getUserService(login.token);

      if (me) {
        setUser(me);
      } else {
        router.navigate({pathname:"/login"});
      }

    } else {
      router.navigate({pathname:"/login"});
    }

  }

  useEffect(() => { login() }, []);

  return (
    <AuthContext.Provider value={ {user, token} }>
      {children}
    </AuthContext.Provider>
  );
}