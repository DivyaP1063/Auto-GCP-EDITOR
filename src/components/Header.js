"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import { setActiveButton, selectActiveButton } from "../app/slices/colorSlice"; // Import actions and selector

const Header = () => {
  const router = useRouter(); // Initialize Next.js router
  const dispatch = useDispatch(); // Initialize dispatch to update Redux state
  const activeButton = useSelector(selectActiveButton); // Get the active button from Redux state

  // Handle button click and set active button in the state
  const handleButtonClick = (buttonName) => {
    dispatch(setActiveButton(buttonName)); // Dispatch action to set active button
  };

  return (
    <header className="flex space-x-4 p-1 border-b bg-gray-100">
      <button
        onClick={() => {
          handleButtonClick("createGCPFileCSV");
          router.push("/");
        }}
        className={`font-semibold px-4 py-2 rounded ${activeButton === "createGCPFileCSV" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        Create GCP File From CSV
      </button>
      <button
        onClick={() => {
          handleButtonClick("createGCPFileMap");
          router.push("/CreateGCP_map");
        }}
        className={`font-semibold px-4 py-2 rounded ${activeButton === "createGCPFileMap" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        Create GCP File From Map
      </button>
      <button
        onClick={() => {
          handleButtonClick("resumeWork");
          router.push("/");
        }}
        className={`font-semibold px-4 py-2 rounded ${activeButton === "resumeWork" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        Resume Work on GCP File
      </button>
    </header>
  );
};

export default Header;
