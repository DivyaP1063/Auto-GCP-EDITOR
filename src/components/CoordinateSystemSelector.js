"use client";

const CoordinateSystemSelector = () => {
  return (
    <div className="p-4 space-x-4">
      <input
        type="text"
        value="EPSG:4326"
        readOnly
        className="border p-2 rounded"
      />
      <button className="bg-gray-200 px-4 py-2 rounded">EPSG/PROJ</button>
    </div>
  );
};

export default CoordinateSystemSelector;
