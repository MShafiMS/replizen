import auth from "@/utils/firebase.init";
import { signOut } from "firebase/auth";
import { Mukta } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoLogOut } from "react-icons/io5";
import Logo from "./Logo";
import { UserContext } from "./auth/UserContext";
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

  const { authState } = useContext(UserContext);

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
      className={`fixed z-20 top-0 left-0 w-full bg-[#f0f0f0] duration-700 transition-all ${
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
        <div className="ml-28 flex gap-1 items-center">
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
            <>
              <Link
                href={"/profile"}
                title="Profile"
                className="p-2 rounded-full hover:bg-blue-700/30 text-gray-800 duration-500 relative"
              >
                <CgProfile size={20} />
              </Link>
              <button
                title="Logout"
                onClick={() => signOut(auth)}
                className="p-2 rounded-full hover:bg-red-700/30 text-gray-800 duration-500 relative"
              >
                <IoLogOut size={20} />
              </button>
            </>
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
