import AuthenticatedPage from "@/components/auth/AuthenticatedPage";
import useProducts from "@/hooks/useProducts";
import { Product } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Checkout = () => {
  const [product, setProduct] = useState<Product>();
  const { getProduct } = useProducts();
  const router = useRouter();
  const productId = router.query.id as string;

  useEffect(() => {
    const fetchData = async () => {
      const product = await getProduct(productId);
      setProduct(product);
    };

    fetchData();
  }, [productId]);

  return (
    <AuthenticatedPage>
      <div className="overflow-y-hidden mt-10">
        <div className="flex justify-center items-center 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44 ">
          <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
            <div className="flex w-full  flex-col justify-start items-start">
              <div>
                <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                  Check out
                </p>
              </div>
              <div className="mt-12">
                <p className="text-xl font-semibold leading-5 text-gray-800">
                  Shipping Details
                </p>
              </div>
              <div className="mt-8 flex flex-col justify-start items-start w-full space-y-8 ">
                <input
                  className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                  type="text"
                  placeholder="Full Name"
                />
                <input
                  className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                  type="text"
                  placeholder="Address"
                />
                <input
                  className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4   w-full"
                  type="text"
                  placeholder="Phone Number"
                />
              </div>
              <button className="focus:outline-none focus:ring-gray-500 focus:ring-offset-2 mt-8 text-base font-medium focus:ring-2 focus:ring-ocus:ring-gray-800 leading-4 hover:bg-black py-4 w-full md:w-4/12 lg:w-full text-white bg-gray-800">
                Proceed to payment
              </button>
            </div>
            <div className="flex flex-col justify-start items-start bg-gray-50 w-full p-6 md:p-14">
              <div>
                <h1 className="text-2xl font-semibold leading-6 text-gray-800">
                  Order Summary
                </h1>
              </div>
              <div className="flex mt-7 flex-col items-end w-full space-y-6">
                <div className="flex justify-between w-full items-center">
                  <p className="text-lg leading-4 text-gray-600">Total items</p>
                  <p className="text-lg font-semibold leading-4 text-gray-600">
                    1
                  </p>
                </div>
                <div className="flex justify-between w-full items-center">
                  <p className="text-lg leading-4 text-gray-600">
                    Total Charges
                  </p>
                  <p className="text-lg font-semibold leading-4 text-gray-600">
                    ৳{product?.price}
                  </p>
                </div>
                <div className="flex justify-between w-full items-center">
                  <p className="text-lg leading-4 text-gray-600">
                    Shipping charges
                  </p>
                  <p className="text-lg font-semibold leading-4 text-gray-600">
                    ৳20
                  </p>
                </div>
              </div>
              <div className="flex justify-between w-full items-center mt-32">
                <p className="text-xl font-semibold leading-4 text-gray-800">
                  Estimated Total{" "}
                </p>
                <p className="text-lg font-semibold leading-4 text-gray-800">
                  ৳{(product?.price as number) + 20}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedPage>
  );
};

export default Checkout;
