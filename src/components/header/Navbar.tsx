"use client";
import { Pages, Routes } from "@/constants/enums";
import React, { useState } from "react";
import Link from "../link";
import { Button, buttonVariants } from "../ui/button";
import { Menu, XIcon } from "lucide-react";
import CartButton from "./cart-button";
import { useParams, usePathname } from "next/navigation";
import LanguageSwitcher from "./language-switcher";

function Navbar({ translations }: { translations: Translations }) {
  const [openMenu, setOpenMenu] = useState(false);
  const { locale } = useParams();
  const pathname = usePathname();
  const links = [
    {
      id: crypto.randomUUID(),
      title: translations.navbar.menu,
      href: Routes.MENU,
    },
    {
      id: crypto.randomUUID(),
      title: translations.navbar.about,
      href: Routes.ABOUT,
    },
    {
      id: crypto.randomUUID(),
      title: translations.navbar.contact,
      href: Routes.CONTACT,
    },
    {
      id: crypto.randomUUID(),
      title: translations.navbar.login,
      href: `${Routes.AUTH}/${Pages.LOGIN}`,
    },
  ];
  return (
    <nav className="w-full lg:w-auto">
      <Button
        variant="secondary"
        size="sm"
        className="lg:hidden"
        onClick={() => setOpenMenu(true)}
      >
        <Menu className="w-6! h-6!" />
      </Button>
      <ul
        className={`
          flex flex-col lg:flex-row gap-5 lg:gap-10
          w-full lg:w-auto
          bg-white lg:bg-transparent
          fixed top-0 h-full lg:static
          transition-all duration-300
          ${openMenu ? "left-0 z-50" : "-left-full"}
          items-center lg:items-center p-6 lg:p-0
        `}
      >
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-15 right-10 lg:hidden"
          onClick={() => setOpenMenu(false)}
        >
          <XIcon className="w-6! h-6!" />
        </Button>
        {links.map((link) => (
          <li key={link.id}>
            <Link
              className={`${
                link.href === `${Routes.AUTH}/${Pages.LOGIN}`
                  ? `${buttonVariants({
                      size: "lg",
                    })} rounded-full! bg-orange-500! text-white`
                  : "hover:text-orange-500 duration-200 text-gray-500 transition-colors font-semibold block"
              } font-semibold ${
                pathname.startsWith(`/${locale}/${link.href}`)
                  ? "text-orange-500"
                  : "text-gray-500"
              }`}
              href={`/${locale}/${link.href}`}
            >
              {link.title}
            </Link>
            
          </li>
        ))}
         <LanguageSwitcher />
        <CartButton />
      </ul>
    </nav>
  );
}

export default Navbar;
