import React, { useState, useEffect } from "react";
import MapComponent from "./components/MapComponent";
import PropertyList from "./components/PropertyList";
import "./App.css";

function App() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filteredProperties, setFilteredProperties] = useState([]);
  
  // Fetch properties from the backend
  useEffect(() => {
    fetch("http://localhost:5000/api/properties")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched properties:", data);
        setFilteredProperties(data);
      })
      .catch((err) => console.error("Error fetching properties:", err));
  }, []);

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
