"use client";


import { configureStore } from "@reduxjs/toolkit";
import coordinatesReducer from "../app/slices/coordinatesSlice";

const store = configureStore({
  reducer: {
    coordinates: coordinatesReducer,
  },
});

export default store;
