import { Gloria_Hallelujah, Rubik_Wet_Paint } from "next/font/google";

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
    <div className="h-screen w-screen bg-[url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80)] bg-cover bg-center bg-fixed flex items-end">
      <div className="pb-12 w-full bg-white">
        <div className="container mx-auto flex">
          <h1
            className={`w-full flex justify-center text-[8rem] leading-[8rem] text-[#111d33] font-bold -mt-16 ${rubikwetpaint.className}`}
          >
            Wear the <br /> best.
          </h1>
          <div className="w-6/12 flex justify-center -mt-24">
            <div className="w-56 h-72 border-8 rounded-2xl border-gray-900 bg-[#eedd41] flex items-center justify-center flex-col p-3">
              <p
                className={`${gloria.className} text-xl text-gray-900 text-center`}
              >
                Explore, indulge, and elevate with our e-shop – where quality
                meets convenience, and shopping transforms
              </p>
              <button className="relative inline-block text-lg group mt-2">
                <span className="relative z-10 block px-5 py-1.5 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-1.5 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                  <span className="relative">Shop Now</span>
                </span>
                <span
                  className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                  data-rounded="rounded-lg"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
