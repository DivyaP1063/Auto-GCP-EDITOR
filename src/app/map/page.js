"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic"; // Dynamically import Leaflet

// Dynamically import the map with no SSR (because it requires the browser)
const Map = dynamic(() => import("../../components/Map"), { ssr: false });


const MapPage = () => {
  useEffect(() => {
    // Any logic you need to initialize here, if necessary
  }, []);

  return (
    <div className= "w-full rounded-md p-2">
      <h1 className=" w-full text-center text-xl mt-4">GCP Map</h1>

      <div className=" flex w-full gap-2 rounded-md  ">
      <div className="w-[20%] border-2 rounded-md ">
        <h2 className=" bg-gray-200 p-1 font-bold ">Ground Control Points</h2>
        <div>
          <p>image1</p>
          <p>image2</p>
          <p>image3</p>
          <p>image4</p>
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
