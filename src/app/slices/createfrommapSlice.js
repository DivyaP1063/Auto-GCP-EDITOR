import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gcpPoints: [], // Array to store GCP points
};

export const createfrommapSlice = createSlice({
  name: "createcoordinates",
  initialState,
  reducers: {
    addGcpPoint: (state, action) => {
      const point = {
        ...action.payload,
        id: Date.now(), // Use a unique ID for each point (e.g., timestamp)
        label: `GCP-${state.gcpPoints.length + 1}`,
      };
      state.gcpPoints.push(point); // Add new point
    },
    removeGcpPoint: (state, action) => {
      // Remove point by id
      state.gcpPoints = state.gcpPoints.filter((point) => point.id !== action.payload);
    },
    clearAllPoints: (state) => {
      state.gcpPoints = []; // Clear all points
    },
  },
});

export const { addGcpPoint, removeGcpPoint, clearAllPoints } = createfrommapSlice.actions;

export const selectGcpPoints = (state) => state.createcoordinates.gcpPoints;

export default createfrommapSlice.reducer;
