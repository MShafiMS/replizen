import useProducts from "@/hooks/useProducts";
import { Product } from "@/types";
import auth from "@/utils/firebase.init";
import primaryAxios from "@/utils/primaryAxios";
import React, { PropsWithChildren, useEffect, useState } from "react";

type AuthState = "loading" | "authenticated" | "unauthenticated";

interface IValue {
  authState: AuthState;
  user: any;
  isLoading: boolean;
  refetch: () => void;
  cartItems: Product[];
}

export const UserContext = React.createContext<IValue>({
  authState: "loading",
  user: null,
  isLoading: false,
  refetch: () => {},
  cartItems: [],
});

export function UserContextProvider(
  props: PropsWithChildren<Record<string, unknown>>
) {
  const { children } = props;
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [user, setUser] = useState<any>();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [currentUser, setCurrentUser] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const { getProduct } = useProducts();

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
    const cart = user?.cart || [];
    const fetchCartProducts = async () => {
      const cartProducts = await Promise.all(
        cart.map(async (item: any) => {
          const product = await getProduct(item?.productId);
          return product;
        })
      );
      if (cartProducts) {
        setCartItems(cartProducts);
      }
    };
    if (user) {
      fetchCartProducts();
    }
  }, [user]);

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
    <UserContext.Provider
      value={{ authState, user, isLoading, refetch, cartItems }}
    >
      {children}
    </UserContext.Provider>
  );
}