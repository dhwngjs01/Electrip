import { configureStore } from "@reduxjs/toolkit";
import reserveReducer from "./features/reserveSlice";
import commonReducer from "./features/commonSlice";
import myReserveReducer from "./features/myReserveSlice";
import carReducer from "./features/carSlice";
import zoneReducer from "./features/zoneSlice";

export const store = configureStore({
  reducer: {
    reserveReducer,
    commonReducer,
    myReserveReducer,
    carReducer,
    zoneReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
