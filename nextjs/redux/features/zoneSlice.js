import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchFlag: false,
  zipcode: null,
  address: null,
  detailAddress: null,
  lat: null,
  lng: null,
};

export const zone = createSlice({
  name: "zone",
  initialState,
  reducers: {
    reset: () => initialState,
    initSearchFlag: (state) => {
      state.searchFlag = false;
    },
    initZipCode: (state) => {
      state.zipcode = null;
    },
    initAddress: (state) => {
      state.address = null;
    },
    initDetailAddress: (state) => {
      state.detailAddress = null;
    },
    initLat: (state) => {
      state.lat = null;
    },
    initLng: (state) => {
      state.lng = null;
    },
    setSearchFlag: (state, action) => {
      state.searchFlag = action.payload;
    },
    setZipCode: (state, action) => {
      state.zipcode = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setDetailAddress: (state, action) => {
      state.detailAddress = action.payload;
    },
    setLat: (state, action) => {
      state.lat = action.payload;
    },
    setLng: (state, action) => {
      state.lng = action.payload;
    },
  },
});

export const {
  reset,
  initSearchFlag,
  initZipCode,
  initAddress,
  initDetailAddress,
  initLat,
  initLng,
  setSearchFlag,
  setZipCode,
  setAddress,
  setDetailAddress,
  setLat,
  setLng,
} = zone.actions;
export default zone.reducer;
