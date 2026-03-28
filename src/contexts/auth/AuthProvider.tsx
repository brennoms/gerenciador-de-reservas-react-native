import { useState, useEffect, ReactNode } from "react";
import { router } from "expo-router";

import { AuthContext } from "./AuthContext";
import { usePublic } from "../public/PublicHook";
import { UserProps } from "@/src/types/user.types";
import { getUserService } from "@/src/services/users";
import { setUnauthorizedHandler } from "@/src/services/api";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { token: publicToken } = usePublic();

  const [token, setToken] = useState<string | null>(publicToken);
  const [user, setUser] = useState<UserProps | null>(null);


  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setUser(null);
        router.replace("/login");
        return;
      }

      const res = await getUserService(token);

      if (res.success && res.data) {
        setUser(res.data);
      } else {
        setUser(null);
        setToken(null);
        router.replace("/login");
      }
    }

    loadUser();
    setUnauthorizedHandler(() => {
      signOut();
    });
  }, [token]);


  const signIn = (newToken: string) => {
    setToken(newToken);
  };


  const signOut = () => {
    setUser(null);
    setToken(null);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}