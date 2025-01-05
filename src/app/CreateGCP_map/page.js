"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { selectGcpPoints } from "../slices/createfrommapSlice";
import Header from "../../components/Header";

// Dynamically import the map component with SSR disabled
const CreateGCP_map = dynamic(
  () => import("../../components/CreateGCP_from_map"),
  { ssr: false }
);

const MapPage = () => {
  const gcpPoints = useSelector(selectGcpPoints); // Fetch GCP points from Redux store

  return (
    <div className="w-full rounded-md max-h-screen flex flex-col justify-between gap-5">
      <Header />

      <div className="flex w-full gap-2 rounded-md">
        {/* Sidebar */}
        <div className="w-[20%] border-2 rounded-md">
          <h2 className="bg-gray-200 p-1 font-bold">Ground Control Points</h2>
          <div className="p-2">
            {/* Render GCP points */}
            {gcpPoints.length > 0 ? (
              gcpPoints.map((point) => (
                <p key={point.id} className="mb-2">
                  {/* Display the coordinates of the GCP point */}
                  {point.label}: {point.latitude}, {point.longitude}
                </p>
              ))
            ) : (
              // Message if no points are added yet
              <p className="text-gray-500">No points added yet.</p>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="flex-grow w-[60%]">
          {/* Dynamically rendered map component */}
          <CreateGCP_map />
        </div>
      </div>
    </div>
  );
};

export default MapPage;
