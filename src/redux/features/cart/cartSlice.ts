import { Extra, Size } from "@/generated/prisma/browser";
import { RootState } from "@/redux/store";
import { Item } from "@radix-ui/react-radio-group";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// البيانات الدي اريد حفظها
export type CartItem = {
  name: string;
  id: string;
  image: string;
  basePrice: number;
  quantity?: number;
  size?: Size;
  extras?: Extra[];
};

type CartState = {
  items: CartItem[];
};
const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        // إذا العنصر موجود، نضيف الكمية الموجودة أو 1
        existingItem.quantity =
          (existingItem.quantity || 0) + (action.payload.quantity || 1);
        existingItem.size = action.payload.size;
        existingItem.extras = action.payload.extras;
      } else {
        // إذا العنصر جديد، نحفظ الكمية الموجودة أو 1
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
    },

    removeCartItem: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.items.find((Item) => Item.id === action.payload.id);
      if (item) {
        if (item.quantity === 1) {
          state.items.filter((Item) => Item.id !== action.payload.id);
        } else {
          item.quantity! -= 1;
        }
      }
    },
    removeItemFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items = state.items.filter(
        (item) => item.id !== action.payload.id
      );
    },
    loadCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addCartItem, removeCartItem, removeItemFromCart,loadCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
