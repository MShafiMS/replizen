import auth from "@/utils/firebase.init";
import { signOut } from "firebase/auth";
import { Mukta } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import Logo from "./Logo";
import { AuthContext } from "./auth/AuthContext";
import ProductCart from "./product/ProductCart";

const mukta = Mukta({
  weight: ["300", "400", "500", "700", "600"],
  style: ["normal"],
  subsets: ["latin"],
});

const Nav = () => {
  const [linkHovered, setLinkHovered] = useState(0);
  const [nav, setNav] = useState(false);
  const changeBackground = () => {
    if (window.scrollY >= 66) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  const { authState } = useContext(AuthContext);

  const router = useRouter();
  const links = [
    { name: "home", path: "/" },
    { name: "store", path: "/store" },
    { name: "blog", path: "/blog" },
    { name: "about", path: "/about" },
  ];

  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);
  });

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-[#f0f0f0] duration-700 transition-all ${
        nav ? "bg-opacity-100" : "bg-opacity-0"
      }`}
    >
      <div className="flex container mx-auto items-center justify-between py-2 px-6">
        <div className="flex items-center w-full justify-between">
          <Link href={"/"}>
            <Logo />
          </Link>
          <ul className="flex items-center gap-5 capitalize font-medium">
            {links.map((link, idx) => (
              <Link
                href={link.path}
                onMouseEnter={() => setLinkHovered(idx + 1)}
                onMouseLeave={() => setLinkHovered(0)}
                key={idx}
                className="flex flex-col items-end"
              >
                <span className={mukta.className}>{link.name}</span>
                <div
                  className={`h-[3px] rounded ${
                    (linkHovered === idx + 1 && "w-full opacity-80") ||
                    (router.asPath === link.path && "w-1/2") ||
                    "w-0"
                  } bg-gradient-to-r from-[#2D3F7E] to-[#48B8EA] duration-500`}
                />
              </Link>
            ))}
          </ul>
        </div>
        <div className="ml-28 flex gap-4 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-72 border font-thin py-1.5 px-2.5 rounded-md border-gray-200 outline-none text-sm"
            />
            <BiSearchAlt
              size={20}
              className="hover:text-blue-600 cursor-pointer absolute top-1/2 -translate-y-1/2 right-2"
            />
          </div>
          <ProductCart />
          {authState === "authenticated" ? (
            <button
              onClick={() => signOut(auth)}
              className="px-5 py-1 bg-gradient-to-l from-[#7e2d3f] via-[#903131] to-[#ec4a4a] hover:bg-gradient-to-r transition-all bg-pos-0 hover:bg-pos-100 duration-500 bg-size-200 text-white uppercase rounded"
            >
              Logout
            </button>
          ) : (
            <Link
              href={"/auth"}
              className="px-5 py-1 bg-gradient-to-l from-[#2D3F7E] via-[#315390] to-[#43A4D8] hover:bg-gradient-to-r transition-all bg-pos-0 hover:bg-pos-100 duration-500 bg-size-200 text-white uppercase rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
