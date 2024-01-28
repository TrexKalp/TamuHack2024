import React from "react";
import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

// Default center of the map
const defaultCenter = { lat: 40.748817, lng: -73.985428 }; // Example: New York

const FlightMap = ({ polyline }) => {
  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyALs4j7Aw0B1OVAnxV2r9PQ-0WtIp1B9lI">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={10}
      >
        {/* Render the polyline */}
        <Polyline path={polyline} options={options} />
      </GoogleMap>
    </LoadScript>
  );
};

export default FlightMap;
