import { configureStore } from "@reduxjs/toolkit";
import reserveReducer from "./features/reserveSlice";
import commonReducer from "./features/commonSlice";

export const store = configureStore({
  reducer: { reserveReducer, commonReducer },
  devTools: process.env.NODE_ENV !== "production",
});
