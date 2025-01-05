"use client";

import { useState, useRef } from "react";
import Papa from "papaparse";
import FileTable from "./FileTable"; // Import the FileTable component
import { useDispatch } from "react-redux";
import { setCoordinates } from "../app/slices/coordinatesSlice"; 

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [csvHeader, setCsvHeader] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  // Allowed Header Templates
  const validHeaders = [
    ["GCP Label", "Northing", "Easting", "Elevation (ft)"],
    ["GCP Label", "Northing", "Easting", "Elevation (m)"],
    ["GCP Label", "Latitude", "Longitude", "Elevation (m)"]
  ];

  // Validate Headers
  const validateHeaders = (headers) => {
    return validHeaders.some((template) =>
      headers.length === template.length &&
      headers.every((header, index) => header.trim() === template[index])
    );
  };

  // Handle File Change
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    const fileExtension = uploadedFile.name.split(".").pop();
    if (fileExtension !== "csv" && fileExtension !== "txt") {
      setError("Please upload a valid .csv or .txt file.");
      setFile(null);
      return;
    }

    setFile(uploadedFile);
    setError("");
    setCsvHeader(null);
    setTableData([]);
    setIsReady(false);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;

      // Process text content based on file type
      let rows;
      if (fileExtension === "csv") {
        // Parse CSV
        Papa.parse(text, {
          header: false,
          skipEmptyLines: true,
          complete: (result) => {
            rows = result.data.map((row) =>
              row.map((v) => v.trim())
            ).filter((row) => row.some((cell) => cell !== "")); // Remove completely empty rows
            processFileContent(rows);
          },
          error: (err) => {
            setError(`Error reading file: ${err.message}`);
            setFile(null);
          },
        });
      } else if (fileExtension === "txt") {
        // Process TXT (assuming rows are space/tab separated, you can adjust based on the format)
        rows = text
          .split("\n")
          .map((line) => line.split(/\s+/).map((v) => v.trim())) // Assuming space/tab separated
          .filter((line) => line.some((cell) => cell !== "")); // Remove completely empty rows
        processFileContent(rows);
      }
    };

    reader.readAsText(uploadedFile);
  };

  // Process file content and validate
  const processFileContent = (rows) => {
    // Check if rows exist
    if (rows.length < 2) {
      setError("File is empty or does not contain data rows.");
      setFile(null);
      return;
    }

    // Validate Headers
    const headers = rows[0];
    if (!validateHeaders(headers)) {
      setError("Invalid headers. Ensure the format matches the predefined templates.");
      setFile(null);
      return;
    }

    // Validate Rows
    const expectedColumns = headers.length;
    for (let i = 1; i < rows.length; i++) {
      const values = rows[i].filter((cell) => cell !== ""); // Ignore trailing empty columns

      if (values.length !== expectedColumns) {
        setError(`Row ${i + 1} has missing or extra values.`);
        setFile(null);
        return;
      }

      // Check for empty cells
      if (values.some((v) => v.trim() === "")) {
        setError(`Row ${i + 1} contains empty values.`);
        setFile(null);
        return;
      }
    }

      const coordinates = rows.slice(1).map(row => ({
      label: row[0],
      latitude: parseFloat(row[1]),  // Assuming lat, long format
      longitude: parseFloat(row[2]), // Adjust based on the CSV format
      elevation: parseFloat(row[3]),
    }));

    // Set CSV header and descriptor
    dispatch(setCoordinates(coordinates)); // Store coordinates in Redux
    setCsvHeader(headers);
    setTableData(rows.slice(1)); // Set rows excluding header
    setIsReady(true);
    setError("");
  };

  return (
    <div className="flex flex-col gay-y-2">
    <div className=" w-full h-fit p-1 flex gap-x-3 justify-between items-center border-2 rounded-md">

      <label htmlFor="fileUpload" className=" border-2 ">
       {file? <p className="">{file.name}</p>:<p className="p-2 borber-1 rounded-md">Choose a .CSV or .TXT file with GCP coordinates</p>}
      </label>
      <input
        ref={fileInputRef}
        id="fileUpload"
        type="file"
        accept=".csv,.txt"
        onChange={handleFileChange}
        className="hidden rounded-md"
        
      />
      <button
        onClick={() => fileInputRef.current.click()}
        className="bg-blue-500 text-white px-4 py-2  rounded w-fit h-fit"
      >
        Browse
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      
    </div>

    <div>
      {isReady && (
        <div className="mt-4">
          <h4 className="font-bold">File Content:</h4>
          <FileTable headers={csvHeader} data={tableData} />
        </div>
      )}
    </div>
    </div>

  );
};

export default FileUpload;
