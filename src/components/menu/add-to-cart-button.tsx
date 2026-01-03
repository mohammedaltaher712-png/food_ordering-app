// components/menu/AddToCartButton.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { ProductWithRelations } from "@/types/product";
import PickSize from "./PickSize";
import Extras from "./Extras";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { addCartItem, removeCartItem, removeItemFromCart, selectCartItems } from "@/redux/features/cart/cartSlice";
import Image from "next/image";
import { Extra } from "@/generated/prisma/browser";
import { formatCurrency } from "@/lib/formatters";
import { getItemQuantity } from "@/lib/cart";
import { Size } from "@/generated/prisma/client";

export default function AddToCartButton({
  item,
}: {
  item: ProductWithRelations;
}) {
  const cart = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
  const quantity = getItemQuantity(item.id, cart);
  const defaultSize = cart.find((e) => e.id === item.id)?.size || item.sizes[0];
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const defaultExtras =
    cart.find((element) => element.id === item.id)?.extras || [];
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>(defaultExtras);
  let totalPrice = item.basePrice;
  if (selectedSize) {
    totalPrice += selectedSize.price;
  }
  if (selectedExtras.length > 0) {
    for (const extra of selectedExtras) {
      totalPrice += extra.price;
    }
  }

  function handleAdd() {
    dispatch(
      addCartItem({
        id: item.id,
        name: item.name,
        image: item.image,
        basePrice: item.basePrice,
        size: selectedSize,
        extras: selectedExtras,
      })
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4 w-full bg-orange-500 text-white font-semibold rounded-full hover:scale-105 transition-all ">
          Add To Cart
        </Button>
      </DialogTrigger>

      <DialogContent className=" sm:max-w-100 max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex justify-center items-center">
          <div className="relative w-48 h-48 mx-auto ">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover rounded-full"
            />
          </div>

          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription>{item.description}</DialogDescription>
        </DialogHeader>

        <div className="my-4">
          <PickSize
            sizes={item.sizes}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
        </div>

        <div className="my-4">
          <Extras
            extras={item.extras}
            selectedExtras={selectedExtras}
            setSelectedExtras={setSelectedExtras}
          />
        </div>

        <DialogFooter>
          {quantity === 0 ? (
            <Button
              onClick={handleAdd}
              className="w-full bg-orange-500 text-white font-semibold rounded-full flex justify-center items-center gap-5"
            >
              <span>Add to Cart</span>
              <span>{formatCurrency(totalPrice)}</span>
            </Button>
          ) : (
            <ChooseQuantity
              quantity={quantity}
              item={item}
              selectedSize={selectedSize}
              selectedExtras={selectedExtras}
            />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
const ChooseQuantity = ({
  quantity,
  item,
  selectedExtras,
  selectedSize,
}: {
  quantity: number;
  selectedExtras: Extra[];
  selectedSize: Size;
  item: ProductWithRelations;
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col items-center gap-4 w-full p-4 border rounded-lg shadow-sm bg-white">
      
      {/* أزرار التحكم بالكمية */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          className="w-10 h-10 flex items-center justify-center text-lg font-bold rounded-full hover:bg-red-50"
          onClick={() => dispatch(removeCartItem({ id: item.id }))}
        >
          -
        </Button>

        <div className="min-w-[60px] text-center font-medium text-gray-700">
          {quantity} in cart
        </div>

        <Button
          variant="outline"
          className="w-10 h-10 flex items-center justify-center text-lg font-bold rounded-full hover:bg-green-50"
          onClick={() =>
            dispatch(
              addCartItem({
                basePrice: item.basePrice,
                id: item.id,
                image: item.image,
                name: item.name,
                extras: selectedExtras,
                size: selectedSize,
              })
            )
          }
        >
          +
        </Button>
      </div>

      {/* زر إزالة العنصر بالكامل */}
      <Button
        size="sm"
        variant="destructive"
        className="w-full bg-red-600 hover:bg-red-700 text-white"
        onClick={() => dispatch(removeItemFromCart({ id: item.id }))}
      >
        Remove Item
      </Button>
    </div>
  );
};

