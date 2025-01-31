import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMapEvents } from 'react-leaflet'; // Import useMapEvents
import L from "leaflet";
import DrawControls from "./DrawControls"; // Import Draw Tools
import "leaflet/dist/leaflet.css";

// Fix for missing marker icons in Leaflet
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41]
});

const MapEventHandler = ({ fetchProperties, lastFetchedBounds }) => {
  useMapEvents({
    moveend: (event) => {
      const map = event.target;
      const bounds = map.getBounds();
      const queryBounds = {
        north: bounds.getNorth(),
        east: bounds.getEast(),
        south: bounds.getSouth(),
        west: bounds.getWest(),
      };

      // Only fetch new properties if bounds have changed
      if (
        queryBounds.north !== lastFetchedBounds.north ||
        queryBounds.south !== lastFetchedBounds.south ||
        queryBounds.east !== lastFetchedBounds.east ||
        queryBounds.west !== lastFetchedBounds.west
      ) {
        console.log("🔄 Fetching properties for new bounds:", queryBounds);
        fetchProperties(queryBounds);
      }
    },
  });

  return null;
};

const MapComponent = ({ selectedProperty, setFilteredProperties, fetchProperties, filteredProperties }) => {
  const mapRef = useRef(null); // Store the map instance

  useEffect(() => {
    // Ensure the map is ready to handle the new markers
    if (filteredProperties.length > 0) {
      console.log("Markers should be rendered now.");
    }
  }, [filteredProperties]);

  return (
    <MapContainer
      center={[37.7749, -122.4194]}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
      whenCreated={(map) => (mapRef.current = map)} // Initialize map instance
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <DrawControls setFilteredProperties={setFilteredProperties} filteredProperties={filteredProperties} />
      <MapEventHandler fetchProperties={fetchProperties} lastFetchedBounds={filteredProperties} />

      {filteredProperties.map((property) => (
        <Marker key={property.id} position={[property.coordinates.lat, property.coordinates.lng]} icon={customIcon}>
          <Popup>
            <strong>{property.price}</strong> <br /> {property.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
