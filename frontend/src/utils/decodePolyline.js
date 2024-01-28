// Importing the necessary function from the backend server
import { fetchFlightPlan } from '../../../backend/server.js';

// Define the class
class FlightDataFetcher {
  // Constructor for initializing any class-specific properties
  constructor() {
    // You can initialize any properties here if needed
  }

  // Function to decode polyline
  decodePolyline(encoded) {
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

  // Function to fetch data
  async fetchData() {
    try {
      const flightPlanData = await fetchFlightPlan({
        fromICAO: 'EHAM',
        toName: 'Kennedy',
        limit: 1
      });

      // Assuming flightPlanData contains the polyline data
      return flightPlanData.polyline;

      // Continue with the rest of your program logic
    } catch (error) {
      console.error('Error fetching flight plan:', error);
      // Handle errors
    }
  }
}