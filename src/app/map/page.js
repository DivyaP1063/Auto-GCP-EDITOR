"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic"; // Dynamically import Leaflet
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import { selectCoordinates } from "../slices/coordinatesSlice"; // Import the selector for coordinates
import Header from "../../components/Header"

// Dynamically import the map with no SSR (because it requires the browser)
const Map = dynamic(() => import("../../components/Map"), { ssr: false });

const MapPage = () => {
  // Use useSelector to get the coordinates from Redux
  const coordinates = useSelector(selectCoordinates);

  useEffect(() => {
    // Any logic you need to initialize here, if necessary
  }, [coordinates]); // Depend on coordinates to re-run when the list changes

  return (
    <div className="w-full rounded-md p-2">
    <Header />
      <h1 className="w-full text-center text-xl mt-4">GCP Map</h1>

      <div className="flex w-full gap-2 rounded-md">
        <div className="w-[20%] border-2 rounded-md">
          <h2 className="bg-gray-200 p-1 font-bold">Ground Control Points</h2>
          <div>
            {coordinates.length > 0 ? (
              coordinates.map((point, index) => (
                <p key={index} className="mb-2 text-xs">
                  {/* Display the coordinates of the GCP point */}
                  Image {index + 1}: {"Lat: " + point.latitude}, {"Long: " + point.longitude}
                </p>
              ))
            ) : (
              // Message if no points are added yet
              <p className="text-gray-500">No points added yet.</p>
            )}
          </div>
        </div>
        <div className="flex-grow w-[60%]">
          <Map /> {/* Include the Map component */}
        </div>
      </div>
    </div>
  );
};

export default MapPage;
