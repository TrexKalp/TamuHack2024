import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import BottomTabNav from "./components/BottomTabNav";
import AircraftDiagram from "./components/AircraftDiagram";
import QuizPage from "./components/QuizPage.tsx";
import TopNav from "./components/TopNav";
// Import other pages/components you might have
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Router>
      <Box position="fixed" top={0} w="100%" zIndex={1}>
        <TopNav />
      </Box>
      <Box pt="75px" pb="75px">
        {/* Add padding to account for the TopNav and BottomTabNav height */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/diagram" element={<AircraftDiagram />} />
          {/* Define other routes as needed */}
        </Routes>
      </Box>
      <Box position="fixed" bottom={0} w="100%" zIndex={1}>
        <BottomTabNav />
      </Box>
    </Router>
  );
}

export default App;
