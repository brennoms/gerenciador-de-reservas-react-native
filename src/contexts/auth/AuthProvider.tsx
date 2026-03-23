import { useState, useEffect, ReactNode } from "react";

import { AuthContext } from "./AuthContext";
import { UserLogin, UserProps } from "@/src/types/user.types";
import { login, getUser } from "@/src/serviices/user";

export function AuthProvider({ children, email, pass }:  {children: ReactNode} & UserLogin) {

  const [user, setUser] = useState<UserProps>();
  const [token, setToken] = useState<String>("");

  useEffect(() => {

    login(email, pass)
    .then((data: UserLogin) => {

      setToken(data.token);
      getUser(data.user_id)
      .then((dt: UserProps) => {
        setUser(dt);
      });

    })

  }, []);

  return (
    <AuthContext.Provider value={{ user, token }}>
      {children}
    </AuthContext.Provider>
  );
}