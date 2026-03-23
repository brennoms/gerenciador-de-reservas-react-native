import { useState, useEffect, ReactNode } from "react";
import { router } from "expo-router";

import { AuthContext } from "./AuthContext";
import { LoginResponse, UserLogin, UserProps } from "@/src/types/user.types";
import { loginService, getUserService } from "@/src/services/users";

export function AuthProvider({ children, email, pass }:  {children: ReactNode} & UserLogin) {

  const [user, setUser] = useState<UserProps | null>(null);
  const [token, setToken] = useState<String>("");

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

  useEffect(() => {

    loginService({email, pass})
    .then((data) => {

      console.log(data);
      if (data) {

        setToken(data.token);
        getUserService(data.user_id)
        .then((dt) => {

          if (dt) {
            setUser(dt);
          } else {
            router.navigate({pathname: "/login"});
          }

        });
      } else {
        router.navigate({pathname: "/login"});
      }

    })

  }, []);

  return (
    <AuthContext.Provider value={ {user, token} }>
      {children}
    </AuthContext.Provider>
  );
}