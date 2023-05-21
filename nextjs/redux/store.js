import { configureStore } from "@reduxjs/toolkit";
import reserveReducer from "./features/reserveSlice";

export const store = configureStore({
  reducer: { reserveReducer },
  devTools: process.env.NODE_ENV !== "production",
});
