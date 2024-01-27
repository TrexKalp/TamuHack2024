import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import BottomTabNav from "./components/BottomTabNav";
import AircraftDiagram from "./components/AircraftDiagram";
import TopNav from "./components/TopNav";
// Import other pages/components you might have

function App() {
  return (
    <Router>
      <TopNav style={{ position: "fixed", top: 0, width: "100%" }} />
      <div style={{ paddingBottom: "50px" }}>
        {" "}
        {/* Add padding to account for the BottomTabNav height */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/diagram" element={<AircraftDiagram />} />
          {/* Define other routes as needed */}
        </Routes>
      </div>
      <BottomTabNav style={{ position: "fixed", bottom: 0, width: "100%" }} />{" "}
      {/* Ensure BottomTabNav is always at the bottom */}
    </Router>
  );
}

export default App;
