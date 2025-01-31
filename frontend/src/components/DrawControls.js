import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw"; // Ensure Leaflet Draw is imported

const DrawControls = ({ setFilteredProperties, allProperties }) => {
  const map = useMap(); // Get map instance from React-Leaflet
  const drawControlRef = useRef(null); // Store Draw Control to prevent duplicates

  useEffect(() => {
    if (!map) {
      console.error("❌ Map instance is null!");
      return;
    }

    console.log("✅ Leaflet Map found, adding Draw Controls...");

    // Prevent adding multiple draw toolbars
    if (drawControlRef.current) {
      console.warn("⚠️ Draw Controls already exist, skipping re-addition.");
      return;
    }

    // Create a FeatureGroup to store drawn items
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Initialize Leaflet Draw toolbar
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
    console.log("✅ Draw Controls added!");

    // Event: When a shape is created
    map.on(L.Draw.Event.CREATED, (event) => {
      console.log("🖊️ Shape drawn:", event.layer);
      drawnItems.clearLayers();
      drawnItems.addLayer(event.layer);
      const drawnLayer = event.layer;
      let filtered = [];

      if (drawnLayer instanceof L.Rectangle || drawnLayer instanceof L.Circle) {
        const bounds = drawnLayer.getBounds();
        console.log("📍 Shape bounds:", bounds);
        filtered = allProperties.filter((property) => bounds.contains([property.lat, property.lng]));
      } else if (drawnLayer instanceof L.Polygon) {
        const latlngs = drawnLayer.getLatLngs()[0];
        console.log("📐 Polygon coordinates:", latlngs);
        const polygon = L.polygon(latlngs);
        filtered = allProperties.filter((property) => polygon.getBounds().contains([property.lat, property.lng]));
      }

      console.log("🏠 Filtered properties:", filtered);
      setFilteredProperties(filtered);
    });

    // Event: When shapes are deleted, reset properties
    map.on(L.Draw.Event.DELETED, () => {
      console.log("🗑️ Shape deleted, resetting properties...");
      setFilteredProperties(allProperties);
    });

  }, [map, setFilteredProperties, allProperties]);

  return null;
};

export default DrawControls;
