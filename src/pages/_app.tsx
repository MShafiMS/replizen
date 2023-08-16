import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { UserContextProvider } from "@/components/auth/UserContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { M_PLUS_Rounded_1c } from "next/font/google";

const mPlusRounded1c = M_PLUS_Rounded_1c({
  weight: ["100", "300", "400", "500", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <div className={mPlusRounded1c.className}>
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </div>
    </UserContextProvider>
  );
}
