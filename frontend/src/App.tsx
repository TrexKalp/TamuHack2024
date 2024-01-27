import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import LandingPage from "./components/LandingPage";
import LoginScreen from "./components/LoginScreen";
import FlightNumberEntry from "./components/FlightNumberEntry";
import ConfirmationScreen from "./components/ConfirmationScreen";
import HomePage from "./components/HomePage";
import AircraftDiagram from "./components/AircraftDiagram";
import QuizPage from "./components/QuizPage";
import BottomTabNav from "./components/BottomTabNav";

function App() {
  const handleLogin = () => {
    // Handle login here
  };
  return (
    <Router>
      {/* SplashScreen can be handled differently, e.g., as a modal or initial route */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/flight-number" element={<FlightNumberEntry />} />
        <Route path="/confirmation" element={<ConfirmationScreen />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/diagram" element={<AircraftDiagram />} />
        {/* Add more routes as needed */}
      </Routes>
      <BottomTabNav /> {/* Assuming BottomTabNav uses Links to navigate */}
    </Router>
  );
}

export default App;
