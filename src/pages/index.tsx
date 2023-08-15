import Banner from "@/components/home/Banner";
import { Inter } from "next/font/google";
import Store from "./store";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={inter.className}>
      <Banner />
      <Store />
    </main>
  );
}
