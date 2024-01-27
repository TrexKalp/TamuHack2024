import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SplashScreen from "./components/SplashScreen";
import HomePage from "./components/HomePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SplashScreen onLoaded={() => console.log("Loading complete")} />
      <HomePage onStartQuiz={() => console.log("Starting quiz")} />
    </>
  );
}

export default App;
