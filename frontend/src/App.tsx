import React, { useState } from "react";
// Importing all the necessary components
import SplashScreen from "./components/SplashScreen";
import LandingPage from "./components/LandingPage";
import LoginScreen from "./components/LoginScreen";
import FlightNumberEntry from "./components/FlightNumberEntry";
import ConfirmationScreen from "./components/ConfirmationScreen";
import HomePage from "./components/HomePage"; // Make sure to import the HomePage component
import AircraftDiagram from "./components/AircraftDiagram";
import QuizPage from "./components/QuizPage.tsx";

function App() {
  // State to manage the current step of the app
  const [currentStep, setCurrentStep] = useState("splashScreen");

  // Handlers for each step of the flow
  const handleSplashLoaded = () => setCurrentStep("landingPage"); // Changed to "landingPage" to match your naming
  const handleStartCompanion = () => setCurrentStep("login");
  const handleLoginSuccess = () => setCurrentStep("enterFlightNumber");
  const handleFlightNumberEntered = () => setCurrentStep("confirmation");
  const handleConfirmed = () => setCurrentStep("homePage"); // Transition to HomePage after confirmation
  const handleQuizStart = () => setCurrentStep("quizLandingPage");
  const handleDiagramStart = () => setCurrentStep("diagramLandingPage");


  return (
    <>
      {currentStep === "splashScreen" && (
        <SplashScreen onLoaded={handleSplashLoaded} />
      )}
      {currentStep === "landingPage" && ( // Changed to "landingPage" to match your naming
        <LandingPage onGoToHome={handleStartCompanion} />
      )}
      {currentStep === "login" && <LoginScreen onLogin={handleLoginSuccess} />}
      {currentStep === "enterFlightNumber" && (
        <FlightNumberEntry onFlightNumberEntered={handleFlightNumberEntered} />
      )}
      {currentStep === "confirmation" && (
        <ConfirmationScreen onConfirmed={handleConfirmed} />
      )}
      {currentStep === "homePage" && ( // Render the HomePage component after confirmation
        <HomePage onQuizClick={handleQuizStart}  onDiagramClick={handleDiagramStart}/> // Assuming you want to provide an option to start the quiz from the HomePage
      )}
      {currentStep === "quizLandingPage" && (
        <QuizPage />
      )}
      {currentStep === "diagramLandingPage" && (
        <AircraftDiagram />
      )}
    </>
  );
}

export default App;
