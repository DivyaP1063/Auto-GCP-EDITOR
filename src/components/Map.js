"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import L from "leaflet";
import proj4 from "proj4";
import { selectCoordinates, selectCoordinateSystem } from "../app/slices/coordinatesSlice";
import "leaflet/dist/leaflet.css";

const MapPage = () => {
  const coordinates = useSelector(selectCoordinates); // Get GCPs from Redux
  const coordinateSystem = useSelector(selectCoordinateSystem); // EPSG code
  const dispatch = useDispatch();

  const mapRef = useRef(null);
  const markersRef = useRef([]); // Stores markers to clear on updates

  useEffect(() => {
    // Initialize map only once
    if (!mapRef.current) {
      const map = L.map("map").setView([22.5, 70], 12); // Default to world view
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
    }
  }, []); // Runs only once when component mounts

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // Define supported projections
    const projDefs = {
       "EPSG:27700": "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +datum=OSGB36 +units=m +no_defs",
      "EPSG:4326": "+proj=longlat +datum=WGS84 +no_defs", // Default WGS84
      // Add more projections if needed
    };

    // Register projections with proj4
    Object.entries(projDefs).forEach(([epsg, def]) => proj4.defs(epsg, def));

    // Clear old markers
    markersRef.current.forEach((marker) => map.removeLayer(marker));
    markersRef.current = [];

    // Add GCP markers with coordinate transformations
    coordinates.forEach((gcp) => {
      const { label, latitude, longitude, elevation } = gcp; // GCP details

      let latLng = [latitude, longitude]; // Default WGS84 (EPSG:4326)

      // Transform coordinates if system is not EPSG:4326
      if (coordinateSystem !== "EPSG:4326") {
        try {
          // Convert from the selected coordinate system to EPSG:4326
          latLng = proj4(coordinateSystem, "EPSG:4326", [longitude, latitude]);
        } catch (error) {
          console.error(`Error converting GCP (${label}):`, error);
          return; // Skip invalid coordinates
        }
      }

      // Create and add marker
      const marker = L.marker(latLng).addTo(map);


      markersRef.current.push(marker); // Track markers
    });

    // Adjust map view to fit markers
    if (markersRef.current.length > 0) {
      const group = new L.featureGroup(markersRef.current);
      map.fitBounds(group.getBounds());
    }
  }, [coordinates, coordinateSystem]); // Reacts to coordinate or EPSG changes

  return (
    <div className="w-full">
      <div
        id="map"
         // Fullscreen map container
        className="max-w-full h-[450px]"
      ></div>
    </div>
  );
};

export default MapPage;
