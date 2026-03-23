import { useState, useEffect, ReactNode } from "react";
import { router } from "expo-router";

import { PublicContext } from "./PublicContext";
import { sendCodeService, registerService, loginService } from "@/src/services/users";

export function AuthProvider({ children }: { children: ReactNode}) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [code, setCode] = useState("");

  async function register() {
    const res = await registerService({name, email, pass, code});

    if (res.ok) {
      router.navigate({pathname: "/property"})
    }

  }

  async function sendCode() {
    const res = sendCodeService(email);

    if (res.ok) {
      return 0
    }

  }

  async function login() {
    const res = loginService({email, pass})

    if (res.ok) {
      return 0
    }
    
  }

  return (
    <PublicContext.Provider value={{ name, email, pass, code }}>
      {children}
    </PublicContext.Provider>
  );
}