import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";

const FlightMap = ({ encodedPolyline, mapCenter }) => {
  const [decodedPath, setDecodedPath] = useState([]);

  useEffect(() => {
    const decodePath = () => {
      if (window.google && window.google.maps && window.google.maps.geometry) {
        return window.google.maps.geometry.encoding.decodePath(encodedPolyline);
      }
      return [];
    };

    setDecodedPath(decodePath());
  }, [encodedPolyline]);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyALs4j7Aw0B1OVAnxV2r9PQ-0WtIp1B9lI"
      libraries={["geometry"]}
    >
      <GoogleMap
        mapContainerStyle={{ width: "400px", height: "400px" }}
        center={mapCenter}
        zoom={12}
      >
        {decodedPath.length > 0 && (
          <Polyline
            path={decodedPath}
            options={{ strokeColor: "#FF0000", strokeWeight: 2 }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default FlightMap;
