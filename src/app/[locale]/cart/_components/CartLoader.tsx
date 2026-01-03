'use client';

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { loadCart, CartItem } from "@/redux/features/cart/cartSlice";

const CartLoader = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      const items: CartItem[] = JSON.parse(stored);
      dispatch(loadCart(items));
    }
  }, [dispatch]);

  return null;
};

export default CartLoader;
