import { ProductWithRelations } from '@/types/product';
import MenuItem from './MenuItem';
import { getCurrentLocale } from '@/lib/getCurrentLocale';
import getTrans from '@/lib/translation';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
 async function Menu({ items }: { items: ProductWithRelations[] }) {
 const locale = await getCurrentLocale();
  const { noProductsFound } = await getTrans(locale);
  return items.length > 0 ? (
    <ul className='grid grid-cols-1 sm:grid-cols-3 gap-4 '>
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  ) : (
    <p className='text-accent text-center'>{noProductsFound}</p>
  );
}

export default Menu;