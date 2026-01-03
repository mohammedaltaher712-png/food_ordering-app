"use client";

import { Button } from "@/components/ui/button";
import { deliveryFee, getSubTotal } from "@/lib/cart";
import { formatCurrency } from "@/lib/formatters";
import {
  removeItemFromCart,
  selectCartItems,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

function CartItems() {
  const cart = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
 const subTotal = getSubTotal(cart);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="flex flex-col gap-6">
      {cart && cart.length > 0 ? (
        <>
          <ul className="flex flex-col gap-6">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 border rounded-lg shadow-sm bg-white"
              >
                {/* صورة المنتج واسم المنتج */}
                <div className="flex items-start md:items-center gap-4 flex-1">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-semibold text-base md:text-lg text-black">
                      {item.name}
                    </h4>

                    {item.size && (
                      <span className="text-sm text-accent">
                        Size: {item.size.name}
                      </span>
                    )}

                    {item.extras && item.extras.length > 0 && (
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-sm font-medium">Extras:</span>
                        <ul className="flex flex-wrap gap-2">
                          {item.extras.map((extra) => (
                            <li key={extra.id}>
                              <span className="text-sm text-accent ">
                                {extra.name} {formatCurrency(extra.price)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <span className="text-sm text-black mt-1">
                      Quantity: {item.quantity}
                    </span>
                  </div>
                </div>

                {/* السعر و زر الحذف */}
                <div className="flex items-center gap-3 mt-2 md:mt-0">
                  <strong className="text-black text-lg">
                    {/* {formatCurrency(item.basePrice * item.quantity)} */}
                  </strong>
                  <Button
                    onClick={() =>
                      dispatch(removeItemFromCart({ id: item.id }))
                    }
                    variant="destructive"
                    className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          {/* الملخص */}
          <div className="flex flex-col items-end gap-2 mt-4 p-4 border-t border-gray-200">
            <div className="flex justify-between w-52">
              <span className="text-accent font-medium">Subtotal:</span>
              <span className="text-black font-semibold">
                {formatCurrency(subTotal)}
              </span>
            </div>
            <div className="flex justify-between w-52">
              <span className="text-accent font-medium">Delivery:</span>
              <span className="text-black font-semibold">
                {formatCurrency(deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between w-52 text-lg">
              <span className="text-accent font-medium">Total:</span>
              <span className="text-black font-bold">
                {formatCurrency(subTotal + deliveryFee)}
              </span>
            </div>
          </div>
        </>
      ) : (
        <p className="text-accent text-center py-6">
          Your cart is empty. Add some items!
        </p>
      )}
    </div>
  );
}

export default CartItems;
