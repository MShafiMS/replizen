import useProducts from "@/hooks/useProducts";
import { Product } from "@/types";
import auth from "@/utils/firebase.init";
import primaryAxios from "@/utils/primaryAxios";
import { useRouter } from "next/router";
import React, { PropsWithChildren, useEffect, useState } from "react";

type AuthState = "loading" | "authenticated" | "unauthenticated";

interface IValue {
  authState: AuthState;
  user: any;
  isLoading: boolean;
  cartLoading: string;
  refetch: () => void;
  addToCart: (productId: string) => void;
  cartItems: Product[];
}

export const UserContext = React.createContext<IValue>({
  authState: "loading",
  user: null,
  isLoading: false,
  cartLoading: "",
  refetch: () => {},
  addToCart: () => {},
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
  const [cartLoading, setCartLoading] = useState("");
  const { getProduct } = useProducts();
  const router = useRouter();

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

  const addToCart = async (productId: string) => {
    setCartLoading(productId);
    if (authState === "authenticated") {
      try {
        const updatedCart = user?.cart
          ? [...user.cart, { productId }]
          : [{ productId }];
        await primaryAxios.put(`user/${user?._id}`, {
          ...user,
          cart: updatedCart,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      router.push("/auth");
    }
    await fetchUser();
    setCartLoading("");
  };

  useEffect(() => {
    const updateAuthState = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setAuthState("authenticated");
          setCurrentUser(user);
        } else {
          setAuthState("unauthenticated");
          refetch();
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
      value={{
        authState,
        user,
        isLoading,
        refetch,
        cartItems,
        addToCart,
        cartLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
