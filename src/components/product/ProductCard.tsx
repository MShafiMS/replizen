import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { RiLoader4Fill, RiShoppingCartFill } from "react-icons/ri";
import { UserContext } from "../auth/UserContext";
import Rating from "./Rating";

interface IProducts {
  product: Product;
}

const ProductCard = ({ product }: IProducts) => {
  const { addToCart, cartLoading } = useContext(UserContext);

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
        <h1 className="font-medium hover:text-blue-950">
          {product.name.length <= 20
            ? product.name
            : `${product.name.slice(0, 20)}...`}
        </h1>
        <div>
          <div className="mt-1">
            {product.discount ? (
              <div className="flex items-center gap-1">
                <p className="text-[#e23939] text-lg">
                  ৳ {((100 - product.discount) / 100) * product.price}
                </p>
                <p className="text-sm text-gray-500 line-through">
                  ৳ {product.price}
                </p>
              </div>
            ) : (
              <p className="text-[#e23939] text-lg">৳ {product.price}</p>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Rating readValue={1.5} size="7" />
            <span className="text-xs text-gray-600">{"(1.5)"}</span>
          </div>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <button
            onClick={() => addToCart(product._id)}
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
