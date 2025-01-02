"use client";

const Header = () => {
  return (
    <header className="flex space-x-4 p-4 border-b bg-gray-100">
      <button className="font-semibold px-4 py-2 bg-blue-500 text-white rounded">
        Create GCP File From CSV
      </button>
      <button className="font-semibold px-4 py-2 bg-gray-200 rounded">
        Create GCP File From Map
      </button>
      <button className="font-semibold px-4 py-2 bg-gray-200 rounded">
        Resume Work on GCP File
      </button>
    </header>
  );
};

export default Header;
