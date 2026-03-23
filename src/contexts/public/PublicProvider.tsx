import { useState, useEffect, ReactNode } from "react";
import { router } from "expo-router";

import { PublicContext } from "./PublicContext";
import { sendCodeService, registerService, loginService } from "@/src/services/users";

export function PublicProvider({ children }: { children: ReactNode}) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [code, setCode] = useState("");

  async function register() {
    const res = await registerService({name, email, pass, code});

    if (res) {
      router.navigate({pathname: "/property"})
    }

  }

  async function sendCode() {
    const res = await sendCodeService(email);

    if (res) {
      return 0
    }

    return false;

  }

  async function login() {
    const res = await loginService({email, pass})

    if (res) {
      router.navigate({pathname: "/property"});
    }

    return false;
    
  }

  return (
    <PublicContext.Provider value={{ name, email, pass, code, setName, setEmail, setPass, setCode }}>
      {children}
    </PublicContext.Provider>
  );
}