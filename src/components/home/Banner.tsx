import { Gloria_Hallelujah, Rubik_Wet_Paint } from "next/font/google";
import Link from "next/link";
import { BiSolidShoppingBag } from "react-icons/bi";

const rubikwetpaint = Rubik_Wet_Paint({
  weight: ["400"],
  subsets: ["latin"],
});
const gloria = Gloria_Hallelujah({
  weight: "400",
  subsets: ["latin"],
});

const Banner = () => {
  return (
    <div className="h-screen bg-[url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80)] bg-cover bg-center bg-fixed flex items-end">
      <div className="pb-12 w-full bg-white">
        <div className="container mx-auto flex">
          <div
            className={`w-full flex gap-6 justify-center -mt-16 ${rubikwetpaint.className}`}
          >
            <div>
              <h1 className="text-[6rem] leading-[6rem] text-[#111d33]">
                Wear
              </h1>
              <h1 className="text-[6rem] leading-[6rem] text-[#111d33]">
                best.
              </h1>
            </div>
            <div>
              <h1 className="text-[6rem] leading-[6rem] text-[#111d33]">the</h1>
              <p className={`max-w-xs text-gray-700 ${gloria.className}`}>
                {
                  '"Elevate your shopping journey with Replizen, where every click unveils a world of quality and convenience. Discover, indulge, and transform your lifestyle, one purchase at a time."'
                }
              </p>
            </div>
          </div>
          <div className="w-6/12 flex justify-center -mt-24">
            <div className="w-56 cursor-default hover:-translate-y-3 hover:scale-105 duration-300 border-8 rounded-2xl border-gray-900 bg-[#c3cf56] flex items-center justify-center flex-col px-3 py-4">
              <p
                className={`${gloria.className} text-xl text-gray-900 text-center`}
              >
                Explore, indulge, and elevate with our e-shop – where quality
                meets convenience, and shopping transforms
              </p>
              <Link
                href={"/store"}
                className="py-1 px-4 mt-2 bg-white rounded-lg font-bold border-2 border-gray-700 hover:bg-slate-800 text-gray-800 hover:text-gray-200 duration-500 hover:bg-gray-200/10 flex items-center gap-3"
              >
                Shop Now <BiSolidShoppingBag size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
