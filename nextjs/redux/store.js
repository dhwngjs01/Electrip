import { configureStore } from "@reduxjs/toolkit";
import reserveReducer from "./features/reserveSlice";
import commonReducer from "./features/commonSlice";
import myReserveReducer from "./features/myReserveSlice";

export const store = configureStore({
  reducer: { reserveReducer, commonReducer, myReserveReducer },
  devTools: process.env.NODE_ENV !== "production",
});
