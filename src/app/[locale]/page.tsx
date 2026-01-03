import Image from "next/image";
import Hero from "./_components/Hero";
import BestSellers from "./_components/BestSellers";
import { prisma } from "@/lib/prisma";
import About from "@/components/about";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
export default async function Home() {
  return (
    <main>
      <Hero />
      <BestSellers />
      <About />
      <Contact/>
      <Footer/>
    </main>
  );
}
