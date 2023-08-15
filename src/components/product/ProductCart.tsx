import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RiShoppingCartFill } from "react-icons/ri";
import { AuthContext } from "../auth/AuthContext";
import CartItem from "./CartItem";

const ProductCart = () => {
  const [isShwoCart, setIsShowCart] = useState(false);
  const { authState, user } = useContext(AuthContext);
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
        {user?.cart?.length ? (
          <div className="absolute text-[10px] flex items-center justify-center top-0 right-0 bg-red-600 text-white w-[14px] h-[14px] rounded-full">
            {user?.cart?.length <= 9 ? user?.cart?.length : "9+"}
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
          <div className="space-y-3 overflow-y-auto px-3 py-4 h-full">
            {user?.cart.map((item: { productId: string }, idx: number) => (
              <CartItem key={idx} productId={item?.productId} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCart;
