import auth from "@/utils/firebase.init";
import React, { PropsWithChildren, useEffect, useState } from "react";

type AuthState = "loading" | "authenticated" | "unauthenticated";

interface IValue {
  authState: AuthState;
}

export const AuthContext = React.createContext<IValue>({
  authState: "loading",
});

export function AuthContextProvider(
  props: PropsWithChildren<Record<string, unknown>>
) {
  const { children } = props;
  const [authState, setAuthState] = useState<AuthState>("loading");

  useEffect(() => {
    const updateAuthState = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setAuthState("authenticated");
        } else {
          setAuthState("unauthenticated");
        }
      });
    };

    updateAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ authState }}>
      {children}
    </AuthContext.Provider>
  );
}
