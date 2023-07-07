import React, { useState, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import Globe from "./components/Globe";
import logo from "./escapade-rond.png";
import logo2 from "./images/escapadeBl.png";
import "./App.css";
import Header from "./components/Header";
import axios from "axios";
import { getGeolocation } from "./components/GeolocationComponent";
import DetailsHebergementModal from "./components/DetailsHebergementModal";

const App = () => {
  const [isModelVisible, setIsModelVisible] = useState(true);
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [isLogo2Visible, setIsLogo2Visible] = useState(false);
  const [hebergementsAllVisible, setHebergementsAllVisible] = useState(false);
  const [hebergementsAll, setHebergementsAll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailsHebergementModalOpen, setIsDetailsHebergementModalOpen] =
    useState(false);
  const [selectedHebergement, setSelectedHebergement] = useState(null);

  const handleCardClick = (hebergement) => {
    //event.preventDefault();
    alert("Va afficher les détails d'une Escapade");

    //setSelectedHebergement(hebergement);
    //setIsDetailsHebergementModalOpen(true);
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
      .get("/api/hebergement/all", { params: { limit: 9 } })
      .then((response) => {
        console.log(response.data);
        setHebergementsAll(response.data); // ici vous passez les données de la réponse à setHebergementsAll
      })
      .catch((error) => {
        alert("error :" + error);
        console.error(error);
      });
  }, []); // [] signifie que cet effet s'exécutera seulement une fois, au montage du composant

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
        <div className="logo-container d-flex justify-content-center">
          <img src={logo} alt="Logo" className="logo" />
        </div>
      )}
      {isLogo2Visible && (
        <div className="d-flex justify-content-center">
          <img src={logo2} alt="Logo 2" className="logoFull" />
        </div>
      )}
      {hebergementsAllVisible && hebergementsAll.length > 0 && (
        <div className="hebergementsAll container w-75 text-white my-5">
          <h2>Escapades populaires</h2>
          <div className="hebergementsAll__container row my-3">
            {hebergementsAll.map((hebergement, index) => (
              <div
                className="hebergementsAll__container__item col-md-4"
                key={index}
              >
                <div
                  className="card my-3"
                  onClick={() => handleCardClick(hebergement)}
                >
                  <div
                    style={{
                      paddingBottom: "56.25%" /* 16:9 aspect ratio */,
                      position: "relative",
                      height: 0,
                    }}
                  >
                    <img
                      className="p-3"
                      src={hebergement.photos[0]}
                      alt={hebergement.titre}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {hebergement.titre.length > 30
                        ? hebergement.titre.slice(0, 30) + "..."
                        : hebergement.titre}
                    </h5>
                    <p className="card-text my-1">{hebergement.categorie}</p>
                    <p className="card-text my-1">{hebergement.pays}</p>
                    <p className="card-text my-1">{hebergement.prix} $/nuit</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
