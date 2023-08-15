import auth from "@/utils/firebase.init";
import primaryAxios from "@/utils/primaryAxios";
import React, { PropsWithChildren, useEffect, useState } from "react";

type AuthState = "loading" | "authenticated" | "unauthenticated";

interface IValue {
  authState: AuthState;
  user: any;
  isLoading: boolean;
  refetch: () => void;
}

export const AuthContext = React.createContext<IValue>({
  authState: "loading",
  user: null,
  isLoading: false,
  refetch: () => {},
});

export function AuthContextProvider(
  props: PropsWithChildren<Record<string, unknown>>
) {
  const { children } = props;
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [user, setUser] = useState<any>();
  const [currentUser, setCurrentUser] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async () => {
    setIsLoading(true);
    if (currentUser?.email) {
      const { data } = await primaryAxios.get(
        `/user/data?email=${currentUser.email}`
      );
      if (data) {
        setUser(data);
      }
    } else if (currentUser?.phoneNumber) {
      const { data } = await primaryAxios.get(
        `/user/data?phone=${currentUser.phoneNumber.slice(1)}`
      );
      if (data) {
        setUser(data);
      }
    }
    setIsLoading(false);
  };

  const refetch = async () => {
    await fetchUser();
  };

  useEffect(() => {
    const updateAuthState = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setAuthState("authenticated");
          setCurrentUser(user);
        } else {
          setAuthState("unauthenticated");
        }
      });
    };

    updateAuthState();
  }, []);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setIsLoading(true);
      if (currentUser?.email) {
        const { data } = await primaryAxios.get(
          `/user/data?email=${currentUser.email}`
        );
        if (data) {
          setUser(data);
        }
      } else if (currentUser?.phoneNumber) {
        const { data } = await primaryAxios.get(
          `/user/data?phone=${currentUser.phoneNumber.slice(1)}`
        );
        if (data) {
          setUser(data);
        }
      }
      setIsLoading(false);
    };
    if (currentUser) {
      fetchCurrentUser();
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ authState, user, isLoading, refetch }}>
      {children}
    </AuthContext.Provider>
  );
}
