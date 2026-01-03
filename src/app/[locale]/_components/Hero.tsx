import { Button } from "@/components/ui/button";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import Image from "next/image";
import React from "react";
 async function Hero() {
   const locale = await getCurrentLocale();

  const { home } = await getTrans(locale);
  const { hero } = home;
  return (
    <section className="section-gap">
      <div className="container grid grid-cols-1 lg:grid-cols-2 text-center lg:text-start">
        <div className="md:py-12">
          <h1 className="text-4xl font-bold text-gray-900 MyFont leading-tight">
          {hero.title}
          </h1>
          <p className="text-gray-700 mt-6 mb-8 text-xl leading-relaxed font-myfont">
          {hero.description}
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <Button className="bg-orange-500 text-white hover:bg-orange-600">
               {hero.orderNow}
            </Button>
            <Button className="bg-white text-orange-500 border border-orange-500 hover:bg-orange-50">
               {hero.learnMore}
            </Button>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <Image
            src={"/assets/images/Hero.jpg"}
            alt="Hero"
            fill
            loading="eager"
            priority
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
