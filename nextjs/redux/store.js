import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";

export const store = configureStore({
  reducer: { counterReducer },
  devTools: process.env.NODE_ENV !== "production",
});
