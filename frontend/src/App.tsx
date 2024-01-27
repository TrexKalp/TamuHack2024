import React, { useState } from "react";
// Importing the necessary components
import SplashScreen from "./components/SplashScreen";
import HomePage from "./components/HomePage";
import LoginScreen from "./components/LoginScreen";
import FlightNumberEntry from "./components/FlightNumberEntry";
import ConfirmationScreen from "./components/ConfirmationScreen";

function App() {
  // State to manage the current step of the app
  const [currentStep, setCurrentStep] = useState("splashScreen");

  // Handlers for each step of the flow
  const handleSplashLoaded = () => setCurrentStep("homePage");
  const handleStartQuiz = () => setCurrentStep("login");
  const handleLoginSuccess = () => setCurrentStep("enterFlightNumber");
  const handleFlightNumberEntered = () => setCurrentStep("confirmation");
  const handleConfirmed = () => {
    // Here you can redirect the user to the actual quiz or perform another action
    console.log("Confirmed, proceeding to quiz or next step...");
  };

  return (
    <>
      {currentStep === "splashScreen" && (
        <SplashScreen onLoaded={handleSplashLoaded} />
      )}
      {currentStep === "homePage" && <HomePage onStartQuiz={handleStartQuiz} />}
      {currentStep === "login" && <LoginScreen onLogin={handleLoginSuccess} />}
      {currentStep === "enterFlightNumber" && (
        <FlightNumberEntry onFlightNumberEntered={handleFlightNumberEntered} />
      )}
      {currentStep === "confirmation" && (
        <ConfirmationScreen onConfirmed={handleConfirmed} />
      )}
    </>
  );
}

export default App;
