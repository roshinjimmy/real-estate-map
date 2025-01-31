import React, { useState } from "react";
import MapComponent from "./components/MapComponent";
import PropertyList from "./components/PropertyList";
import "./App.css";

const allProperties = [
  { id: 1, lat: 37.7749, lng: -122.4194, price: "$800,000", address: "123 Main St" },
  { id: 2, lat: 37.7849, lng: -122.4094, price: "$950,000", address: "456 Oak St" },
  { id: 3, lat: 37.7949, lng: -122.4294, price: "$1,200,000", address: "789 Pine St" },
];

function App() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filteredProperties, setFilteredProperties] = useState(allProperties);

  return (
    <div className="container">
      <div className="map-container">
        <MapComponent selectedProperty={selectedProperty} setFilteredProperties={setFilteredProperties} />
      </div>
      <div className="list-container">
        <PropertyList onSelectProperty={setSelectedProperty} properties={filteredProperties} />
      </div>
    </div>
  );
}

export default App;
