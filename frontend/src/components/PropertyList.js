import React from "react";

const PropertyList = ({ onSelectProperty, properties }) => {
  return (
    <div>
      <h2>Properties</h2>
      {properties.length === 0 ? (
        <p>No properties found in selected area</p>
      ) : (
        properties.map((property) => (
          <div key={property.id} className="property-item" onClick={() => onSelectProperty(property)}>
            <img src="https://via.placeholder.com/100" alt={property.address} />
            <div>
              <strong>{property.price}</strong>
              <p>{property.address}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PropertyList;
