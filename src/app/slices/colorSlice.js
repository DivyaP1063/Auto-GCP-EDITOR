
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeButton: "createGCPFileCSV", // Track which button is active
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setActiveButton: (state, action) => {
      state.activeButton = action.payload; // Set active button
    },
  },
});

export const { setActiveButton } = colorSlice.actions;

export const selectActiveButton = (state) => state.color.activeButton;

export default colorSlice.reducer;
