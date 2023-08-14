import Nav from "@/components/Nav";
import { AuthContextProvider } from "@/components/auth/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <div className={inter.className}>
        <Nav />
        <Component {...pageProps} />
      </div>
    </AuthContextProvider>
  );
}
