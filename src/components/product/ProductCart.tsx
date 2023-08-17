import { Product } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { RiShoppingCartFill } from "react-icons/ri";
import { UserContext } from "../auth/UserContext";
import CartItem from "./CartItem";

const ProductCart = () => {
  const [isShwoCart, setIsShowCart] = useState(false);
  const { authState, cartItems } = useContext(UserContext);
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => {
          if (authState === "authenticated") {
            setIsShowCart(!isShwoCart);
          } else {
            router.push("/auth");
          }
        }}
        className="p-2 rounded-full hover:bg-gray-700/30 text-gray-800 duration-500 relative"
      >
        <RiShoppingCartFill size={18} />
        {cartItems.length ? (
          <div className="absolute text-[10px] flex items-center justify-center top-0 right-0 bg-red-600 text-white w-[14px] h-[14px] rounded-full">
            {cartItems.length <= 9 ? cartItems.length : "9+"}
          </div>
        ) : null}
      </button>
      {isShwoCart && (
        <div className="w-80 fixed border-l top-0 right-0 z-50 h-screen bg-gray-100">
          <div className="flex justify-between px-3 py-2 border-b">
            <h1 className="text-slate-800 text-xl uppercase font-bold flex items-center gap-2">
              <RiShoppingCartFill size={20} /> Cart
            </h1>
            <button
              onClick={() => setIsShowCart(false)}
              className="p-1.5 bg-gray-200 rounded hover:bg-red-600 duration-200 hover:text-white"
            >
              <AiOutlineClose size={18} />
            </button>
          </div>
          <div className="space-y-3 overflow-y-auto px-3 py-4 h-full pb-28">
            {cartItems?.map((product: Product) => (
              <CartItem key={product?._id} product={product} />
            ))}
          </div>
          <div className="w-full absolute z-40 px-3 py-2 bottom-0 right-0 h-fit bg-gray-300">
            {cartItems?.length ? (
              <Link
                href="/store/checkout"
                className="px-5 py-1.5 w-full bg-gray-800 hover:bg-opacity-90 text-white uppercase rounded text-center flex items-center justify-center gap-2"
              >
                Checkout Now <MdOutlineShoppingCartCheckout size={20} />
              </Link>
            ) : (
              <button
                disabled
                className="px-5 cursor-not-allowed py-1.5 w-full bg-gray-800 hover:bg-opacity-90 text-white uppercase rounded text-center flex items-center justify-center gap-2"
              >
                Checkout Now <MdOutlineShoppingCartCheckout size={20} />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCart;
