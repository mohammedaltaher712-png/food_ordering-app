import Link from "../link";
import { Routes } from "@/constants/enums";
import Navbar from "./Navbar";
import CartButton from "./cart-button";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import LanguageSwitcher from "./language-switcher";

async function Header() {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  return (
    <header className="py-4 md:py-6">
      <div className="container flex flex-col lg:flex-row justify-between items-center lg:items-center gap-4 lg:gap-0 ">
        {/* شعار الموقع */}
        <Link
          className="text-primary font-semibold text-2xl"
          href={`/${locale}/${Routes.ROOT}`}
        >
          {translations.logo}
        </Link>

        {/* القائمة */}
        <Navbar translations={translations} />
      </div>
    </header>
  );
}

export default Header;
