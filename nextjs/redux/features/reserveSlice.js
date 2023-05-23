import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPos: {
    lat: 37.4514480321002,
    lng: 126.651542258118,
  },
  address: "인천광역시 미추홀구 인하로 100",
  searchKeyword: "인천광역시 미추홀구 인하로 100",
  zoneAddress: "장소를 먼저 선택해주세요.",
  zoneNo: null,
  zoneList: [],
  carNo: null,
  carName: "차량을 선택해주세요.",
  carImage: null,
  carList: [],
  startDate: null,
  startHour: null,
  startMinute: null,
  endDate: null,
  endHour: null,
  endMinute: null,
  reserveStartDate: null,
  reserveEndDate: null,
  reserveMinute: null,
  reservePeriod: null,
  totalPrice: null,
  showReserveLayout: false,
  showDateLayout: false,
  showCarLayout: false,
  showDetailLayout: false,
};

export const reserve = createSlice({
  name: "reserve",
  initialState,
  reducers: {
    reset: (state) => {
      document.querySelectorAll(".custom-overlay").forEach((overlay) => {
        overlay.classList.remove("custom-overlay-active");
      });

      return initialState;
    },

    initZoneAddress: (state) => {
      state.zoneAddress = "장소를 먼저 선택해주세요.";
    },
    initCarName: (state) => {
      state.carName = "차량을 선택해주세요.";
    },
    initCarNo: (state) => {
      state.carNo = null;
    },
    initCarImage: (state) => {
      state.carImage = null;
    },
    initCarList: (state) => {
      state.carList = [];
    },
    initDate: (state) => {
      state.startDate = null;
      state.startHour = null;
      state.startMinute = null;
      state.endDate = null;
      state.endHour = null;
      state.endMinute = null;
      state.reserveStartDate = null;
      state.reserveEndDate = null;
    },
    initTotalPrice: (state) => {
      state.totalPrice = null;
    },
    setCurrentPos: (state, action) => {
      state.currentPos = { ...action.payload };
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    setZoneAddress: (state, action) => {
      state.zoneAddress = action.payload;
    },
    setZoneNo: (state, action) => {
      state.zoneNo = action.payload;
    },
    setCarNo: (state, action) => {
      state.carNo = action.payload;
    },
    setCarName: (state, action) => {
      state.carName = action.payload;
    },
    setCarImage: (state, action) => {
      state.carImage = action.payload;
    },
    setZoneList: (state, action) => {
      state.zoneList = [...action.payload];
    },
    setCarList: (state, action) => {
      state.carList = [...action.payload];
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setStartHour: (state, action) => {
      state.startHour = action.payload;
    },
    setStartMinute: (state, action) => {
      state.startMinute = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setEndHour: (state, action) => {
      state.endHour = action.payload;
    },
    setEndMinute: (state, action) => {
      state.endMinute = action.payload;
    },
    setReserveStartDate: (state, action) => {
      state.reserveStartDate = action.payload;
    },
    setReserveEndDate: (state, action) => {
      state.reserveEndDate = action.payload;
    },
    setReserveMinute: (state, action) => {
      state.reserveMinute = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    setReservePeriod: (state, action) => {
      state.reservePeriod = action.payload;
    },
    showReserveLayout: (state) => {
      state.showReserveLayout = true;
    },
    hideReserveLayout: (state) => {
      state.showReserveLayout = false;
    },
    showCarLayout: (state) => {
      state.showCarLayout = true;
    },
    hideCarLayout: (state) => {
      state.showCarLayout = false;
    },
    showDateLayout: (state) => {
      state.showDateLayout = true;
    },
    hideDateLayout: (state) => {
      state.showDateLayout = false;
    },
    showDetailLayout: (state) => {
      state.showDetailLayout = true;
    },
    hideDetailLayout: (state) => {
      state.showDetailLayout = false;
    },
  },
});

export const {
  reset,
  initZoneAddress,
  initCarName,
  initCarNo,
  initCarImage,
  initCarList,
  initDate,
  initTotalPrice,
  setCurrentPos,
  setAddress,
  setSearchKeyword,
  setZoneAddress,
  setZoneNo,
  setCarNo,
  setCarName,
  setCarImage,
  setZoneList,
  setCarList,
  setStartDate,
  setStartHour,
  setStartMinute,
  setEndDate,
  setEndHour,
  setEndMinute,
  setReserveStartDate,
  setReserveEndDate,
  setReserveMinute,
  setReservePeriod,
  setTotalPrice,
  showReserveLayout,
  hideReserveLayout,
  showCarLayout,
  hideCarLayout,
  showDateLayout,
  hideDateLayout,
  showDetailLayout,
  hideDetailLayout,
} = reserve.actions;
export default reserve.reducer;
