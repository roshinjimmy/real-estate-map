import React from "react";

const PropertyList = ({ onSelectProperty, properties }) => {
  // Check if there are any filtered properties
  if (properties.length === 0) {
    return <p>No properties found in the selected area.</p>;
  }

  return (
    <div>
      <h2>Properties</h2>
      {properties.map((property) => (
        <div
          key={property.id}
          className="property-item"
          onClick={() => onSelectProperty(property)} // Handle property selection
        >
          <img src="https://via.placeholder.com/100" alt={property.address} />
          <div>
            <strong>{property.price}</strong>
            <p>{property.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
