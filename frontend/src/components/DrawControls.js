import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw"; // Ensure Leaflet Draw is imported

const DrawControls = ({ setFilteredProperties, filteredProperties }) => {
  const map = useMap(); // Get map instance from React-Leaflet
  const drawControlRef = useRef(null); // Store reference to Draw Control

  useEffect(() => {
    if (!map) {
      console.error("❌ Map instance is null!");
      return;
    }

    console.log("✅ Leaflet Map found, adding Draw Controls...");

    // Prevent adding the controls more than once
    if (drawControlRef.current) {
      console.log("⚠️ Drawing tools already added!");
      return;
    }

    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    drawControlRef.current = new L.Control.Draw({
      draw: {
        polygon: true,
        rectangle: true,
        circle: true,
        marker: false,
        polyline: false,
      },
      edit: {
        featureGroup: drawnItems,
        remove: true, // Allow shape deletion
      },
    });

    map.addControl(drawControlRef.current);

    // Handle drawing event
    map.on(L.Draw.Event.CREATED, (event) => {
      console.log("🖊️ Shape drawn:", event.layer);
      drawnItems.clearLayers();
      drawnItems.addLayer(event.layer);
      const drawnLayer = event.layer;
      let filtered = [];

      // Filtering logic based on drawn shape type
      if (drawnLayer instanceof L.Rectangle || drawnLayer instanceof L.Circle) {
        const bounds = drawnLayer.getBounds();
        console.log("📍 Shape bounds:", bounds);
        filtered = filteredProperties.filter((property) =>
          bounds.contains([property.coordinates.lat, property.coordinates.lng])
        );
      } else if (drawnLayer instanceof L.Polygon) {
        const latlngs = drawnLayer.getLatLngs()[0];
        console.log("📐 Polygon coordinates:", latlngs);
        const polygon = L.polygon(latlngs);
        filtered = filteredProperties.filter((property) =>
          L.Util.pointInPolygon([property.coordinates.lat, property.coordinates.lng], latlngs)
        );
      }

      console.log("🏠 Filtered properties:", filtered);
      setFilteredProperties(filtered);
    });

    // Event: When shapes are deleted, reset properties
    map.on(L.Draw.Event.DELETED, () => {
      console.log("🗑️ Shape deleted, resetting properties...");
      setFilteredProperties(filteredProperties);
    });

  }, [map, setFilteredProperties, filteredProperties]);

  return null;
};

export default DrawControls;
