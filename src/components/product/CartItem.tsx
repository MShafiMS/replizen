import { Product } from "@/types";
import primaryAxios from "@/utils/primaryAxios";
import Image from "next/image";
import { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RiLoader4Fill } from "react-icons/ri";
import { UserContext } from "../auth/UserContext";

const CartItem = ({ product }: { product: Product }) => {
  const [cartLoading, setCartLoading] = useState(false);
  const { user, refetch } = useContext(UserContext);

  const removeFromCart = async () => {
    setCartLoading(true);
    try {
      const updatedCart = user?.cart?.filter(
        (item: { productId: string }) => item.productId !== product._id
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

  if (!product) {
    return (
      <div className="rounded-lg w-full h-16 bg-gray-200/80 flex justify-center items-center">
        <RiLoader4Fill size={24} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="rounded-lg w-full h-16 bg-gray-200/80 flex justify-between items-center">
      <div className="flex gap-2">
        <Image
          src={product?.imageUrl as string}
          width={400}
          height={400}
          className="w-24 h-16 object-cover object-center rounded-l-lg"
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
        className="p-2 mr-3 h-fit bg-gray-300/70 rounded hover:bg-blue-600/30 duration-200"
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
