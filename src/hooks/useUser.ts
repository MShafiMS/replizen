import auth from "@/utils/firebase.init";
import primaryAxios from "@/utils/primaryAxios";
import { useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState("");
  const currentUser = auth.currentUser;

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

  const refetch = () => {
    fetchUser();
  };

  const addToCart = async (productId: string) => {
    setCartLoading(productId);
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
    fetchUser();
    setCartLoading("");
  };

  useEffect(() => {
    if (currentUser) {
      fetchUser();
    }
  }, []);
  return { user, isLoading, refetch, addToCart, cartLoading };
};

export default useUser;
