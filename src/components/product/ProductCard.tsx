import { Product } from "@/types";
import primaryAxios from "@/utils/primaryAxios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { RiLoader4Fill, RiShoppingCartFill } from "react-icons/ri";
import { AuthContext } from "../auth/AuthContext";
import Rating from "./Rating";

interface IProducts {
  product: Product;
}

const ProductCard = ({ product }: IProducts) => {
  const { authState, user, refetch } = useContext(AuthContext);
  const [cartLoading, setCartLoading] = useState("");
  const router = useRouter();

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
    refetch();
    setCartLoading("");
  };

  return (
    <div className="w-56 rounded-xl duration-100 hover:shadow-lg">
      <Image
        src={product.imageUrl}
        alt="ff"
        width={500}
        height={500}
        className="bg-black/5 h-48 object-cover object-center rounded-t-xl"
      />
      <div className="px-3 py-3 rounded-b-xl bg-gray-100">
        <h1 className="text-lg font-medium hover:text-blue-950">
          {product.name}
        </h1>
        <div>
          <div className="mt-3">
            {product.discount ? (
              <div className="flex items-center gap-1">
                <p className="text-[#e23939] font-semibold text-lg">
                  ৳ {((100 - product.discount) / 100) * product.price}
                </p>
                <p className="text-sm text-gray-500 line-through">
                  ৳ {product.price}
                </p>
              </div>
            ) : (
              <p className="text-[#e23939] font-semibold text-lg">
                ৳ {product.price}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Rating readValue={1.5} size="7" />
            <span className="text-xs text-gray-600">{"(1.5)"}</span>
          </div>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <button
            onClick={() => {
              if (authState === "authenticated") {
                addToCart(product._id);
              } else {
                router.push("/auth");
              }
            }}
            disabled={cartLoading === product._id}
            title="Add to cart"
            className="p-2 rounded border-2 border-gray-700 hover:bg-gray-700 text-gray-800 hover:text-gray-200 duration-500 hover:bg-gray-200/10"
          >
            {cartLoading !== product._id ? (
              <RiShoppingCartFill size={18} />
            ) : (
              <RiLoader4Fill size={18} className="animate-spin" />
            )}
          </button>
          <Link
            href={`/store/${product._id}`}
            className="py-1.5 px-3 rounded border-2 border-gray-700 hover:bg-slate-800 text-gray-800 hover:text-gray-200 duration-500 hover:bg-gray-200/10"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
