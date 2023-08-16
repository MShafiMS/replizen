import Banner from "@/components/home/Banner";
import Category from "@/components/home/Category";
import { Inter } from "next/font/google";
import Store from "./store";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={inter.className}>
      <Banner />
      <Category />
      <Store title="Leatest Products!" className="bg-white" />
    </main>
  );
}
