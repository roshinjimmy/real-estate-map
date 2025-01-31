require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper function to generate random coordinates within bounds
const getRandomCoordinate = (min, max) => (Math.random() * (max - min)) + min;

// Helper function to generate random properties
const generateProperties = (num, bounds) => {
    const { north, east, south, west } = bounds;
    const propertyTypes = ["Apartment", "House", "Villa", "Condo"];
    const amenitiesList = ["Pool", "Gym", "Parking", "Garden", "WiFi"];

    let properties = [];
    for (let i = 0; i < num; i++) {
        const lat = getRandomCoordinate(south, north);
        const lng = getRandomCoordinate(west, east);
        
        properties.push({
            id: i + 1,
            price: `$${(Math.random() * 900000 + 100000).toFixed(0)}`,
            address: `${Math.floor(Math.random() * 999)} Main St`,
            coordinates: { lat, lng },
            location: `City ${Math.floor(Math.random() * 100)}`,
            contact_info: `agent${i + 1}@realestate.com`,
            type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
            size: `${Math.floor(Math.random() * 3000 + 500)} sqft`,
            image_url: `https://via.placeholder.com/150`,
            amenities: amenitiesList.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 2),
        });
    }
    return properties;
};

// API Endpoint: Generate properties within bounds
app.get("/api/properties", (req, res) => {
    let { north, east, south, west } = req.query;
    
    if (!north || !east || !south || !west) {
        return res.status(400).json({ error: "Bounds (north, east, south, west) are required" });
    }

    // Convert to numbers
    north = parseFloat(north);
    east = parseFloat(east);
    south = parseFloat(south);
    west = parseFloat(west);

    // Generate random properties
    const properties = generateProperties(20, { north, east, south, west });
    res.json(properties);
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
