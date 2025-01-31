require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock property data
const properties = [
  { id: 1, lat: 37.7749, lng: -122.4194, price: "$800,000", address: "123 Main St" },
  { id: 2, lat: 37.7849, lng: -122.4094, price: "$950,000", address: "456 Oak St" },
  { id: 3, lat: 37.7949, lng: -122.4294, price: "$1,200,000", address: "789 Pine St" },
];

// API endpoint to fetch properties
app.get("/api/properties", (req, res) => {
  res.json(properties);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
