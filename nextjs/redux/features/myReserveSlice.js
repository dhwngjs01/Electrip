import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reserveList: [],
  reserveStatus: "",
};

export const myReserve = createSlice({
  name: "reserve",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    initReserveList: (state) => {
      state.reserveList = [];
    },
    initReserveStatus: (state) => {
      state.reserveStatus = "";
    },
    setReserveList: (state, action) => {
      state.reserveList = [...action.payload];
    },
    setReserveStatus: (state, action) => {
      state.reserveStatus = action.payload;
    },
  },
});

export const {
  reset,
  initReserveList,
  initReserveStatus,
  setReserveList,
  setReserveStatus,
} = myReserve.actions;
export default myReserve.reducer;
