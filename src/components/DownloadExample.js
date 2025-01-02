"use client";

const DownloadExample = () => {
  return (
    <div className=" border-2 rounded-e-md">
      <h3 className="p-2 font-semibold mb-2 bg-gray-400">Download CSV examples</h3>
      <div className="p-5">
      <ul className="list-disc pl-4">
        <li>Northing, Easting, Elevation (ft)</li>
        <li>Northing, Easting, Elevation (m)</li>
        <li>Latitude, Longitude, Elevation (m)</li>
      </ul>
      </div>

    </div>
  );
};

export default DownloadExample;
