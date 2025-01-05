"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import L from "leaflet";
import { addGcpPoint, removeGcpPoint, selectGcpPoints } from "../app/slices/createfrommapSlice"; // Import Redux actions and selectors
import "leaflet/dist/leaflet.css";

const MapPage = () => {
  const dispatch = useDispatch();
  const gcpPoints = useSelector(selectGcpPoints); // Get GCP points from Redux state
  const mapRef = useRef(null);
  const markersRef = useRef([]); // Ref to store markers on the map

  useEffect(() => {
    // Initialize map only once
    if (!mapRef.current) {
      const map = L.map("map").setView([22.5, 70], 12); // Default view
      mapRef.current = map;

      // Add ESRI Satellite tile layer
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution:
            '&copy; <a href="https://www.esri.com/">Esri</a> | Tiles &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      ).addTo(map);

      // Fix render issues by resizing map after DOM loads
      setTimeout(() => {
        map.invalidateSize();
      }, 300);

      // Add click event listener to mark points
      map.on("click", (e) => {
        const { lat, lng } = e.latlng; // Get clicked coordinates

        // Generate unique GCP label after the point is added
        const label = `GCP-${gcpPoints.length + 1}`;

        // Create a new GCP point object
        const newPoint = {
          label, // Include label directly in the point object
          latitude: lat.toFixed(6), // 6 decimal places
          longitude: lng.toFixed(6),
          elevation: 0, // Default elevation
        };

        // Dispatch action to add the new point to Redux
        dispatch(addGcpPoint(newPoint));

        // Add marker to the map
        const marker = L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`<b>${label}</b><br>Lat: ${lat}<br>Lng: ${lng}`)
          .openPopup();

        marker.pointLabel = label; // Store label in marker for later reference

        // Add click listener to remove marker
        marker.on("click", () => removeMarker(marker.pointLabel));

        // Store the marker in the markersRef
        markersRef.current.push({ label, marker }); // Store both label and marker
      });
    }
  }, [gcpPoints, dispatch]); // Re-run if gcpPoints changes

  // Remove marker from map and Redux state
  const removeMarker = (label) => {
    console.log(`Removing marker: ${label}`); // Debugging log
    // Find the marker by label
    const markerIndex = markersRef.current.findIndex(
      (entry) => entry.label === label
    );
    if (markerIndex !== -1) {
      const { marker } = markersRef.current[markerIndex];
      marker.remove(); // Remove from map
      markersRef.current.splice(markerIndex, 1); // Remove from the array
      console.log(`Marker with label ${label} removed from map.`); // Debugging log
    } else {
      console.log(`Marker with label ${label} not found in markersRef.`); // Debugging log
    }

    // Dispatch action to remove point from Redux state
    dispatch(removeGcpPoint(label));
  };

  // Export points as CSV file
  const exportCSV = () => {
    const csvContent = "GCP Label,Latitude,Longitude,Elevation (m)\n" + // CSV header
      gcpPoints
        .map((p, index) => `GCP-${index + 1},${p.latitude},${p.longitude},${p.elevation}`)
        .join("\n"); // Convert to CSV rows

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "gcp_points.csv";
    link.click();
  };

  // Export points as TXT file
  const exportTXT = () => {
    const txtContent = gcpPoints
      .map((p, index) => `GCP-${index + 1}, Latitude: ${p.latitude}, Longitude: ${p.longitude}, Elevation (m): ${p.elevation}`)
      .join("\n");

    const blob = new Blob([txtContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "gcp_points.txt";
    link.click();
  };

  return (
    <div className="w-full">
      <div id="map" className="max-w-full h-[400px]"></div>
      <div className="mt-4 flex gap-4 ">
        <button
          onClick={exportCSV}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Export as CSV
        </button>
        <button
          onClick={exportTXT}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Export as TXT
        </button>
      </div>
    </div>
  );
};

export default MapPage;
