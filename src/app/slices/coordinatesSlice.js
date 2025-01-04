"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coordinates: [],
  coordinateSystem: "EPSG:4326", // Default coordinate system
};

const coordinatesSlice = createSlice({
  name: "coordinates",
  initialState,
  reducers: {
    setCoordinates: (state, action) => {
      state.coordinates = action.payload;
    },
    setCoordinateSystem: (state, action) => {
      state.coordinateSystem = action.payload;
    },
  },
});

export const { setCoordinates, setCoordinateSystem } = coordinatesSlice.actions;

export const selectCoordinates = (state) => state.coordinates.coordinates;
export const selectCoordinateSystem = (state) => state.coordinates.coordinateSystem;

export default coordinatesSlice.reducer;
