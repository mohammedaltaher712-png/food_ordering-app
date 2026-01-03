import "./globals.css";
import Header from "@/components/header";
import ReduxProvider from "@/providers/ReduxProvider";
import CartLoader from "./cart/_components/CartLoader";
import { Directions, Languages } from "@/constants/enums";
import { Locale } from "@/i18n.config";
export async function generateStaticParams() {
  return [{ locale: Languages.ARABIC }, { locale: Languages.ENGLISH }];
}
export default async  function RootLayout({
  children,
    params,
}: Readonly<{
  children: React.ReactNode;
    params: Promise<{ locale: Locale }>;
}>) {
    const locale = (await params).locale;
  return (
    <div
      dir={locale === Languages.ARABIC ? Directions.RTL : Directions.LTR}
      lang={locale}
    >
      <ReduxProvider>
        <Header />
        <CartLoader />
        {children}
      </ReduxProvider>
    </div>
  );
}
