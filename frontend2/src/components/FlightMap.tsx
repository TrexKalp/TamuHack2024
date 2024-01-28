import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";

const FlightMap = ({ encodedPolyline }) => {
  const [path, setPath] = useState([]);
  function decodePolyline(encoded) {
    let points = [];
    let index = 0,
      len = encoded.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      let dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      let dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({ lat: lat / 1e5, lng: lng / 1e5 });
    }

    return points;
  }

  useEffect(() => {
    // Decode the polyline string to a path
    const decodedPath = decodePolyline(encodedPolyline);
    setPath(decodedPath);
  }, [encodedPolyline]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyALs4j7Aw0B1OVAnxV2r9PQ-0WtIp1B9lI">
      <GoogleMap
        mapContainerStyle={{ width: "400px", height: "400px" }}
        center={path[0]} // Set the center to the first point in the path
        zoom={10}
      >
        <Polyline
          path={path}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};
export default FlightMap;
