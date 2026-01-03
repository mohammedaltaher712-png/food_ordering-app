import { Environments } from "@/constants/enums";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  devTools: process.env.NODE_ENV === Environments.DEV,
});
// نوع البيانات الدي اريد عرضها 
export type RootState = ReturnType<typeof store.getState>;
// نوع البيانات الدي اريد التعديل عليها 
export type AppDispatch = typeof store.dispatch;
