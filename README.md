# Real Estate Map Application

This project is a real estate map application where users can interact with a dynamic map to view properties, draw custom shapes on the map, and filter properties based on those shapes. The application uses **React** for the frontend and **Express.js** for the backend.

The frontend is hosted at: https://real-estate-map-ten.vercel.app/

The backend is hosted at: https://real-estate-map.onrender.com

## Key Features

### Frontend (React)

- **Dynamic Map Integration**: Displays a map using **Leaflet.js** and **React-Leaflet**.
- **Property Markers**: Displays markers for properties on the map with essential information (price, address, etc.).
- **Drawing Tools**: Allows users to draw **polygons**, **rectangles**, and **circles** on the map to filter properties based on the drawn area.
- **Responsive Design**: The application is designed to work on **desktop**, **tablet**, and **mobile** screens.
- **Property List**: Displays a list of properties next to the map. Clicking on a property on the list will center the map on that property.

### Backend (Express.js)

- **RESTful API**: Provides an API to serve property data with endpoints for filtering properties within a specific geographic area.
- **Random Property Data Generation**: The backend generates random property data based on a given bounding box, including details such as price, address, size, type, and amenities.
- **Dynamic Property Fetching**: The frontend fetches property data dynamically based on the user’s interaction with the map.

## How to Run the Project Locally

### Prerequisites

- **Node.js** (v14 or later) installed on your machine.
- **npm** (comes with Node.js) or **yarn** for managing dependencies.

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/real-estate-map.git
cd real-estate-map
```

### 2. Set Up the Backend (Express.js)

Navigate to the backend directory:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm start
```

The backend server will run at `http://localhost:5000`. This API serves property data that the frontend will use.

### 3. Set Up the Frontend (React)

Navigate to the frontend directory:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm start
```

The frontend will be available at `http://localhost:3000`.

### 4. Open the Application

Open `http://localhost:3000` in your web browser to access the application.
The frontend will automatically connect to the backend running at `http://localhost:5000`.

## Key Features of the Application

### Frontend

- **Interactive Map**: Uses Leaflet.js and React-Leaflet for displaying a dynamic map.
- **Drawing Tools**: Provides the ability to draw polygons, rectangles, and circles on the map.
- **Property Filtering**: Filters properties based on the area defined by the user’s drawing.
- **Property Details**: Clicking on a property marker displays a popup with property details such as price and address.
- **Responsive Layout**: The layout adjusts for different screen sizes.

### Backend

- **Property Data API**: Exposes a RESTful API to fetch property data within specific bounds.
- **Random Property Generation**: Generates random property data based on geographic bounds, including the following fields:
    - `price`: The price of the property.
    - `address`: The address of the property.
    - `coordinates`: Latitude and longitude of the property.
    - `amenities`: A list of amenities available at the property.
    - `type`: Type of property (e.g., apartment, house).
    - `size`: The size of the property in square feet.
    - `image_url`: Placeholder image URL for the property.

## Additional Information

### Frontend Technology Stack:

- **React**: A JavaScript library for building user interfaces.
- **React-Leaflet**: A library for integrating Leaflet.js maps with React.
- **Leaflet.js**: A JavaScript library for interactive maps.
- **CSS**: Custom styling for the application (no external frameworks like Tailwind).

### Backend Technology Stack:

- **Node.js**: A JavaScript runtime for building the backend server.
- **Express.js**: A web framework for Node.js to handle routing and API endpoints.

## Troubleshooting

### Common Issues:

- **Properties Not Showing Initially**: Ensure that the map bounds are correctly set to fetch the properties. This can be adjusted in the initial API call made in the frontend.
- **Map Not Centering on Property**: Ensure that the property coordinates are passed correctly to the map’s `setView` method.
- **Drawing Tools Not Working**: Ensure that Leaflet Draw is properly installed and initialized. Verify that the `drawControlRef.current` is not reinitialized multiple times.

## License

This project is licensed under the MIT License – see the `LICENSE` file for details.
```
