import Banner from "@/components/home/Banner";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={inter.className}>
      <Banner />
      <div className="h-screen"></div>
    </main>
  );
}
