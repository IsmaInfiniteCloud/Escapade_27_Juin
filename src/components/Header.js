import React, { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { BiSearch, BiUser, BiMenu } from "react-icons/bi";
import logo from "../images/escapade.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import InscriptionModal from "./InscriptionModal";
import ConnexionModal from "./ConnexionModal";
import EscapadeModal from "./EscapadeModal";
import Modal from "react-modal";

Modal.setAppElement("#root");

function Header() {
  const [isInscriptionOpen, setIsInscriptionOpen] = useState(false);
  const [isConnexionOpen, setIsConnexionOpen] = useState(false);
  const [isEscapadeOpen, setIsEscapadeOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [PopupToShow, setPopupToShow] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isUserId, setIsUserId] = useState(null);

  const handleInscriptionClick = (event) => {
    event.preventDefault();
    setIsConnexionOpen(false);
    setIsInscriptionOpen(true);
  };

  const handleLoginClick = (event) => {
    event.preventDefault();
    setIsInscriptionOpen(false);
    setIsConnexionOpen(true);
  };

  const handleConnexionClick = (event) => {
    event.preventDefault();
    setIsInscriptionOpen(false);
    setIsConnexionOpen(true);
  };

  const handleEscapadeClick = (event) => {
    event.preventDefault();
    setIsEscapadeOpen(true);
    if (!isUserLoggedIn) {
      setPopupToShow("escapade");
      setIsEscapadeOpen(false);
      setIsConnexionOpen(true);

      return;
    } else {
      setIsEscapadeOpen(true);
    }
  };

  const openInscriptionModal = () => {
    setIsInscriptionOpen(true);
    setIsConnexionOpen(false);
  };

  const openConnexionModal = () => {
    setIsConnexionOpen(true);
    setIsInscriptionOpen(false);
  };

  const openEscapadeModal = () => {
    setIsEscapadeOpen(true);
  };

  const handleSuccessfulLogin = (userId) => {
    setIsUserLoggedIn(true);
    setIsUserId(userId);
    alert("Connexion réussie. \n\nBienvenue sur Escapade!   userId: " + userId);
    // console.log("Connexion réussie");
    console.log(userId);
  };

  const handleLogout = () => {
    setIsUserLoggedIn(false);
    alert("Déconnexion réussie");
  };

  return (
    <div>
      {/* {isUserLoggedIn && <div>Bienvenue sur Escapade</div>}

      <button onClick={() => setIsConnexionOpen(true)}>Open Modal</button>

      {isConnexionOpen && (
        <ConnexionModal
          isOpen={isConnexionOpen}
          onClose={handleCloseModal}
          onSuccessfulLogin={handleSuccessfulLogin}
        />
      )} */}
      <header className="header">
        <div className="container-fluid">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-4">
                {/* Logo */}
                <img src={logo} alt="Logo" className="logoPetit" />
              </div>
              <div className="recherche col-md-4 border border-lightgrey rounded my-2">
                {/* Champ de recherche */}
                <div className="input-group ">
                  <input
                    type="text"
                    placeholder="Rechercher une destination"
                    className="form-control  border border-white rounded-pill"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-dark rounded-circle ms-2 fw-bold my-2 align-items-center justify-content-center "
                      type="button"
                    >
                      <BiSearch />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 menuDroit d-flex justify-content-end">
                {/* Lien "Partez une Escapade" */}
                <button
                  onClick={handleEscapadeClick}
                  className="btn btn-white text-black"
                >
                  Partez une Escapade
                </button>

                {/* Bouton pour changer la langue */}
                <button
                  className="globe my-2 pb-2 px-3 border-0 rounded"
                  // onClick={handleLanguageClick}
                >
                  <FaGlobe />
                </button>

                {/* Bouton pour se connecter/loguer */}
                <div className="dropdown">
                  <button
                    className="btn text-decoration-none text-dark dropdown-toggle pb-3 pt-2"
                    type="button"
                    id="loginDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {/* <span className={`me-2`}> */}
                    <span
                      className={`me-2 ${isUserLoggedIn ? "red-icon" : ""}`}
                    >
                      <BiMenu />
                    </span>
                    {/* <span> */}
                    <span className={`${isUserLoggedIn ? "red-icon" : ""}`}>
                      <BiUser />
                    </span>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="loginDropdown">
                    {isUserLoggedIn ? (
                      <>
                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            // onClick={handleAccountManagementClick}
                          >
                            Gérer mon compte
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={handleLogout}
                          >
                            Déconnexion
                          </a>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <a
                            className="dropdown-item inscription-link"
                            href="#"
                            onClick={handleInscriptionClick}
                          >
                            Inscription
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={handleLoginClick}
                          >
                            Connexion
                          </a>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <InscriptionModal
        className="custom-modal"
        isOpen={isInscriptionOpen}
        onClose={() => setIsInscriptionOpen(false)}
        onGoToConnexion={openConnexionModal}
      />
      <ConnexionModal
        className="custom-modal"
        isOpen={isConnexionOpen}
        onClose={() => setIsConnexionOpen(false)}
        onSuccessfulLogin={handleSuccessfulLogin}
        onGoToInscription={openInscriptionModal}
        nextPopupToShow={PopupToShow}
        onGoToEscapade={openEscapadeModal}
      />

      <EscapadeModal
        className="custom-modal-dialog modal-dialog-scrollable"
        isOpen={isEscapadeOpen}
        onClose={() => setIsEscapadeOpen(false)}
        onGoToConnexion={openConnexionModal}
        isUserLoggedIn={isUserLoggedIn}
        isUserId={isUserId}
      />
    </div>
  );
}

export default Header;
