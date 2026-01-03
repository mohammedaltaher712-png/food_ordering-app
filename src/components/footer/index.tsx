import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

const Footer = async () => {
  const locale = await getCurrentLocale();
  const { copyRight } = await getTrans(locale);
  return (
    <footer className="border-t p-8 text-center text-accent">
      <div className="container">
        <p>{copyRight}</p>
        <div className="flex justify-end items-end">
          <p className="underline text-lg">Eng.Mohammed AL-Taher</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
