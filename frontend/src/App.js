import React, { useState, useEffect } from "react";
import MapComponent from "./components/MapComponent";
import PropertyList from "./components/PropertyList";
import "./App.css";

function App() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filteredProperties, setFilteredProperties] = useState([]);

  // Fetch properties dynamically based on map bounds
  const fetchProperties = (bounds) => {
    const url = `http://localhost:5000/api/properties?north=${bounds.north}&east=${bounds.east}&south=${bounds.south}&west=${bounds.west}`;
    
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched properties:", data);
        setFilteredProperties(data);
      })
      .catch((err) => console.error("Error fetching properties:", err));
  };

  // Fetch properties for the initial bounds when the app loads
  useEffect(() => {
    const initialBounds = {
      north: 37.9,
      south: 37.5,
      east: -122.2,
      west: -123.0
    };
    fetchProperties(initialBounds); // Fetch properties initially
  }, []);

  return (
    <div className="container">
      <div className="map-container">
        <MapComponent
          selectedProperty={selectedProperty}
          setFilteredProperties={setFilteredProperties}
          fetchProperties={fetchProperties}
          filteredProperties={filteredProperties}
        />
      </div>
      <div className="list-container">
        <PropertyList onSelectProperty={setSelectedProperty} properties={filteredProperties} />
      </div>
    </div>
  );
}

export default App;
