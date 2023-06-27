import React, { useState, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import Globe from "./components/Globe";
import logo from "./escapade-rond.png";
import logo2 from "./images/escapadeBl.png";
import "./App.css";
import Header from "./components/Header";

const App = () => {
  const [isModelVisible, setIsModelVisible] = useState(true);
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [isLogo2Visible, setIsLogo2Visible] = useState(false);

  useEffect(() => {
    const modelTimeout = setTimeout(() => {
      setIsModelVisible(false);
      setIsLogoVisible(true);
    }, 3000);

    const logoTimeout = setTimeout(() => {
      setIsLogoVisible(false);
      setIsLogo2Visible(true);
    }, 5000);

    return () => {
      clearTimeout(modelTimeout);
      clearTimeout(logoTimeout);
    };
  }, []);

  return (
    <div className="app ">
      <Header />
      {isModelVisible && (
        <Canvas className="container">
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 10, 5]} intensity={1} />
          <Globe />
        </Canvas>
      )}
      {isLogoVisible && (
        <div className="logo-container d-flex justify-content-center">
          <img src={logo} alt="Logo" className="logo" />
        </div>
      )}
      {isLogo2Visible && (
        <div className="logo-container d-flex justify-content-center">
          <img src={logo2} alt="Logo 2" className="logoFull" />
        </div>
      )}
    </div>
  );
};

export default App;
