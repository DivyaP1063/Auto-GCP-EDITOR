"use client";

const CsvSpecification = () => {
  return (
    <div className=" border-2 rounded-md">
      <h3 className="p-2 font-semibold mb-2 border-1 bg-gray-400">CSV format specification</h3>
      <div className="p-5">
      <ul className="list-disc pl-4 text-sm ">
        <li>Your .CSV must contain 4 columns</li>
        <li>The first row (header) must be: GCP Label, Y, X, Z</li>
        <li>
          Each subsequent row contains the label and coordinates of your ground
          control points
        </li>
        <li>No cells can be left blank</li>
        <li>GCP Labels must be unique</li>
      </ul>
      </div>


    </div>
  );
};

export default CsvSpecification;
