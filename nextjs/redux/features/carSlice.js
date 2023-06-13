import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carNo: null,
  zoneNo: null,
  carImage: null,
  imgSrc: "/images/cars/empty.png",
  carName: null,
  carBrand: null,
  carClass: null,
  carPlate: null,
  carOdo: null,
  carPrice: null,
  carSeat: null,
};

export const car = createSlice({
  name: "car",
  initialState,
  reducers: {
    reset: () => initialState,
    initCarNo: (state) => {
      state.carNo = null;
    },
    initZoneNo: (state) => {
      state.zoneNo = null;
    },
    initCarImage: (state) => {
      state.carImage = null;
    },
    initImgSrc: (state) => {
      state.imgSrc = "/images/cars/empty.png";
    },
    initCarName: (state) => {
      state.carName = null;
    },
    initCarBrand: (state) => {
      state.carBrand = null;
    },
    initCarClass: (state) => {
      state.carClass = null;
    },
    initCarPlate: (state) => {
      state.carPlate = null;
    },
    initCarOdo: (state) => {
      state.carOdo = null;
    },
    initCarPrice: (state) => {
      state.carPrice = null;
    },
    initCarSeat: (state) => {
      state.carSeat = null;
    },
    setCarNo: (state, action) => {
      state.carNo = action.payload;
    },
    setZoneNo: (state, action) => {
      state.zoneNo = action.payload;
    },
    setCarImage: (state, action) => {
      state.carImage = action.payload;
    },
    setImgSrc: (state, action) => {
      state.imgSrc = action.payload;
    },
    setCarName: (state, action) => {
      state.carName = action.payload;
    },
    setCarBrand: (state, action) => {
      state.carBrand = action.payload;
    },
    setCarClass: (state, action) => {
      state.carClass = action.payload;
    },
    setCarPlate: (state, action) => {
      state.carPlate = action.payload;
    },
    setCarOdo: (state, action) => {
      state.carOdo = action.payload;
    },
    setCarPrice: (state, action) => {
      state.carPrice = action.payload;
    },
    setCarSeat: (state, action) => {
      state.carSeat = action.payload;
    },
  },
});

export const {
  reset,
  initCarNo,
  initZoneNo,
  initCarImage,
  initImgSrc,
  initCarName,
  initCarBrand,
  initCarClass,
  initCarPlate,
  initCarOdo,
  initCarPrice,
  initCarSeat,
  setCarNo,
  setZoneNo,
  setCarImage,
  setImgSrc,
  setCarName,
  setCarBrand,
  setCarClass,
  setCarPlate,
  setCarOdo,
  setCarPrice,
  setCarSeat,
} = car.actions;
export default car.reducer;
