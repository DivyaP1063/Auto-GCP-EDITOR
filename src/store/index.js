"use client";


import { configureStore } from "@reduxjs/toolkit";
import coordinatesReducer from "../app/slices/coordinatesSlice";
import createfrommapReducer  from "../app/slices/createfrommapSlice";
import colorReducer from "../app/slices/colorSlice"

const store = configureStore({
  reducer: {
    coordinates: coordinatesReducer,
    createcoordinates:createfrommapReducer,
    color: colorReducer, 
  },
});

export default store;
