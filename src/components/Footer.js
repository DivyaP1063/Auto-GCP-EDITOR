"use client"; // Mark this as a Client Component

import { useRouter } from "next/navigation"; // Correct import for Next.js 13+
import React from "react";

const Footer = () => {
  const router = useRouter(); // Initialize useRouter

  const handleNextStepClick = () => {
    // Navigate to the map page when the button is clicked
    router.push("/map");
  };

  return (
    <footer className="max-h-hit border-1 bg-cyan-500 text-center text-sm text-white w-fit rounded-md self-end p-2">
      <button onClick={handleNextStepClick}>Go To Next Step</button>
    </footer>
  );
};

export default Footer;
