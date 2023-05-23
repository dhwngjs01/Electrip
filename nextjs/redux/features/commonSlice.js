import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    reset: () => initialState,
    setUser: (state, action) => {
      state.user = { ...action.payload };
    },
  },
});

export const { reset, setUser } = common.actions;
export default common.reducer;
