import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
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

// Sample property data
const allProperties = [
  { id: 1, lat: 37.7749, lng: -122.4194, price: "$800,000", address: "123 Main St" },
  { id: 2, lat: 37.7849, lng: -122.4094, price: "$950,000", address: "456 Oak St" },
  { id: 3, lat: 37.7949, lng: -122.4294, price: "$1,200,000", address: "789 Pine St" },
];

// Component to center map on selected property
const RecenterMap = ({ selectedProperty }) => {
  const map = useMap();
  const popupRef = useRef(null);

  useEffect(() => {
    if (selectedProperty) {
      console.log("📌 Centering map on:", selectedProperty);
      map.setView([selectedProperty.lat, selectedProperty.lng], 14, { animate: true });

      // Find the corresponding marker and open its popup
      if (popupRef.current) {
        popupRef.current.openPopup();
      }
    }
  }, [selectedProperty, map]);

  return null;
};

const MapComponent = ({ selectedProperty, setFilteredProperties }) => {
  const popupRefs = useRef({}); // Store references to popups

  return (
    <MapContainer center={[37.7749, -122.4194]} zoom={12} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <DrawControls setFilteredProperties={setFilteredProperties} allProperties={allProperties} />
      <RecenterMap selectedProperty={selectedProperty} />
      {allProperties.map((property) => (
        <Marker
          key={property.id}
          position={[property.lat, property.lng]}
          icon={customIcon}
          ref={(el) => (popupRefs.current[property.id] = el)}
        >
          <Popup ref={(el) => (popupRefs.current[property.id] = el)}>
            <strong>{property.price}</strong> <br /> {property.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
