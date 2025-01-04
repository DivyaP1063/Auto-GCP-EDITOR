"use client";

import { useDispatch } from "react-redux";
import { setCoordinateSystem } from "../app/slices/coordinatesSlice";
import { useState } from "react";

const CoordinateSystemSelector = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(""); // State to manage input value

  // Handle manual input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value); // Update local state
    dispatch(setCoordinateSystem(value)); // Dispatch value to Redux store
  };

  // Handle preset coordinate system selection
  const handleCoordinateSystemChange = (system) => {
    setInputValue(system); // Update local state
    dispatch(setCoordinateSystem(system)); // Dispatch value to Redux store
  };

  return (
    <div className="w-fit h-fit p-1 flex gap-x-3 items-center border-2 rounded-md">
      <input
        type="text"
        value={inputValue} // Controlled input
        onChange={handleInputChange} // Handle input changes
        className="border p-2 rounded"
        placeholder="Enter EPSG or PROJ" // Placeholder for input clarity
      />
      <div className="flex bg-gray-200 px-4 py-2 rounded-md">
        <div
          onClick={(e) => handleCoordinateSystemChange("EPSG:"+inputValue)}
          className="hover:cursor-pointer hover:text-blue-700"
        >
          EPSG
        </div>
        /
        <div
          onClick={() => handleCoordinateSystemChange("+proj=longlat +datum=WGS84 +no_defs")}
          className="hover:cursor-pointer hover:text-blue-700"
        >
          PROJ
        </div>
      </div>
    </div>
  );
};

export default CoordinateSystemSelector;
