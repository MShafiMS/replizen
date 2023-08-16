import { Product } from "@/types";
import primaryAxios from "@/utils/primaryAxios";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RiLoader4Fill } from "react-icons/ri";
import { AuthContext } from "../auth/AuthContext";

const CartItem = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState<Product>();
  const [cartLoading, setCartLoading] = useState(false);
  const { authState, user, refetch } = useContext(AuthContext);

  const removeFromCart = async () => {
    setCartLoading(true);
    try {
      const updatedCart = user?.cart?.filter(
        (item: { productId: string }) => item.productId !== productId
      );
      await primaryAxios.put(`user/${user?._id}`, {
        ...user,
        cart: updatedCart,
      });
    } catch (error) {
      console.error(error);
    }
    refetch();
    setCartLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await primaryAxios.get(`product/${productId}`);
        if (data) {
          setProduct(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [productId]);

  if (!product) {
    return (
      <div className="rounded-lg w-full h-20 bg-gray-200/80 flex justify-center items-center">
        <RiLoader4Fill size={24} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="rounded-lg w-full h-20 bg-gray-200/80 flex justify-between items-center">
      <div className="flex gap-2">
        <Image
          src={product?.imageUrl as string}
          width={400}
          height={400}
          className="w-24 h-20 object-cover object-center rounded-l-lg"
          alt="ne"
        />
        <div className="mt-1">
          <h1 className="text-sm">{product?.name}</h1>
          {product?.discount ? (
            <div className="">
              <p className="text-[#e23939] font-semibold text-sm">
                ৳ {((100 - product.discount) / 100) * product.price}
              </p>
              <p className="text-xs text-gray-500 line-through">
                ৳ {product.price}
              </p>
            </div>
          ) : (
            <p className="text-[#e23939] font-semibold text-sm">
              ৳ {product?.price}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={() => removeFromCart()}
        className="p-3 mr-3 h-fit bg-gray-300/70 rounded hover:bg-red-300 duration-200"
      >
        {!cartLoading ? (
          <AiOutlineClose size={20} />
        ) : (
          <RiLoader4Fill size={20} className="animate-spin" />
        )}
      </button>
    </div>
  );
};

export default CartItem;
