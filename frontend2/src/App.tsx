import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import BottomTabNav from "./components/BottomTabNav";
import AircraftDiagram from "./components/AircraftDiagram";
import QuizPage from "./components/QuizPage";
import TopNav from "./components/TopNav";
import { Box } from "@chakra-ui/react";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./components/AuthContext";
import FlightCall from "./components/FlightCall";
const Layout = () => {
  const location = useLocation(); // Hook to get the current location
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && (
        <Box position="fixed" top={0} w="full" zIndex={1}>
          <TopNav />
        </Box>
      )}
      <Box pt={!isLoginPage ? "75px" : "0"} pb={!isLoginPage ? "75px" : "0"}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute element={HomePage} />} />
          <Route path="/quiz" element={<PrivateRoute element={QuizPage} />} />
          <Route
            path="/diagram"
            element={<PrivateRoute element={AircraftDiagram} />}
          />
          <Route path="/info" element={<PrivateRoute element={FlightCall} />} />
          {/* Define other private routes as needed */}
        </Routes>
      </Box>
      {!isLoginPage && (
        <Box position="fixed" bottom={0} w="full" zIndex={1}>
          <BottomTabNav />
        </Box>
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </Router>
  );
}

export default App;
