import React, { useState, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import Globe from "./components/Globe";
import logo from "./escapade-rond.png";
import logo2 from "./images/escapadeBl.png";
import "./App.css";
import Header from "./components/Header";
import axios from "axios";
import DetailsHebergementModal from "./components/DetailsHebergementModal";
import countries from "./countries.json";

function getCountryCode(countryName) {
  for (let countryCode in countries) {
    if (countries[countryCode].toLowerCase() === countryName.toLowerCase()) {
      return countryCode.toLowerCase();
    }
  }
  return "default";
}

const App = () => {
  const [isModelVisible, setIsModelVisible] = useState(true);
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [isLogo2Visible, setIsLogo2Visible] = useState(false);
  const [hebergementsAllVisible, setHebergementsAllVisible] = useState(false);
  const [hebergementsAll, setHebergementsAll] = useState([]);
  const [isDetailsHebergementModalOpen, setIsDetailsHebergementModalOpen] =
    useState(false);
  const [selectedHebergement, setSelectedHebergement] = useState(null);
  const [sliceLength, setSliceLength] = useState(30);

  const handleCardClick = (hebergement) => {
    setSelectedHebergement(hebergement);
    setIsDetailsHebergementModalOpen(true);
  };

  useEffect(() => {
    const modelTimeout = setTimeout(() => {
      setIsModelVisible(false);
      setIsLogoVisible(true);
    }, 3000);

    const logoTimeout = setTimeout(() => {
      setIsLogoVisible(false);
      setIsLogo2Visible(true);
      setHebergementsAllVisible(true);
    }, 5000);

    return () => {
      clearTimeout(modelTimeout);
      clearTimeout(logoTimeout);
    };
  }, []);

  useEffect(() => {
    axios
      .get("/api/hebergement/all", { params: { limit: 36 } })
      .then((response) => {
        setHebergementsAll(response.data);
      })
      .catch((error) => {
        alert("error :" + error);
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setSliceLength(20);
      } else if (width < 900) {
        setSliceLength(25);
      } else {
        setSliceLength(30);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="app">
      <Header />

      {isModelVisible && (
        <div className="canvas-container">
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 10, 5]} intensity={1} />
            <Globe />
          </Canvas>
        </div>
      )}

      {isLogoVisible && (
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
      )}

      <div className="responsive">&nbsp;</div>

      {isLogo2Visible && (
        <div className="d-flex justify-content-center">
          <img src={logo2} alt="Logo 2" className="logoFull" />
        </div>
      )}

      {hebergementsAllVisible && hebergementsAll.length > 0 && (
        <div className="hebergementsAll container">
          <h2 className="text text-center escapades-title">
            Escapades populaires
          </h2>

          <div className="hebergementsAll__container row">
            {hebergementsAll.map((hebergement, index) => {
              const countryCode = getCountryCode(
                hebergement.pays.toLowerCase()
              );

              return (
                <div
                  className="hebergementsAll__container__item col-sm-6 col-md-4 align-items-center justify-content-center"
                  key={index}
                >
                  <div
                    className="card h-100 my-1"
                    onClick={() => handleCardClick(hebergement)}
                  >
                    <div
                      className="card-image-wrapper "
                      style={{
                        paddingBottom: "56.25%" /* 16:9 aspect ratio */,
                        position: "relative",
                        height: 0,
                      }}
                    >
                      <img
                        className="card-image"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        src={hebergement.photos[0]}
                        alt={hebergement.titre}
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        {hebergement.titre.length > sliceLength
                          ? hebergement.titre.slice(0, sliceLength) + "..."
                          : hebergement.titre}
                      </h5>
                      <p className="card-text">{hebergement.categorie}</p>
                      <p className="card-text pb-4">
                        <img
                          src={`/flags/${getCountryCode(hebergement.pays)}.png`}
                          alt={hebergement.pays}
                          className="flag-icon"
                        />
                        {hebergement.pays}
                      </p>
                      <p className="card-text text-red card-text-responsive py-2 pe-2">
                        {hebergement.prix} $CAD/nuit
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isDetailsHebergementModalOpen && (
        <DetailsHebergementModal
          hebergement={selectedHebergement}
          onClose={() => setIsDetailsHebergementModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
