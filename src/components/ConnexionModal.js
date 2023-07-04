import React, { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { BiSearch, BiUser, BiMenu } from "react-icons/bi";
import logo from "../images/escapade.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Modal from "react-modal";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ConnexionModal({
  isOpen,
  onClose,
  onGoToInscription,
  onSuccessfulLogin,
  nextPopupToShow,
  onGoToEscapade,
}) {
  const [connexionFormValues, setConnexionFormValues] = useState({
    email: "",
    motDePasse: "",
  });
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  const [isConnexionFormValid, setIsConnexionFormValid] = useState(false);
  const [connexionFormErrors, setConnexionFormErrors] = useState({});
  const [isEscapadeOpen, setIsEscapadeOpen] = useState(false);

  const [welcomeMessage, setWelcomeMessage] = useState("");

  var confirmation = sessionStorage.getItem("connexion");

  const resetForm = () => {
    setConnexionFormValues({
      email: "",
      motDePasse: "",
    });
    setConnexionFormErrors({});
  };

  const validateConnexionForm = () => {
    const { email, motDePasse } = connexionFormValues;

    const errors = {};

    if (!email || email.trim() === "") {
      errors.email = "Veuillez renseigner ce champ";
    } else if (!emailRegex.test(email)) {
      errors.email = "Veuillez entrer une adresse email valide.";
    }

    if (!motDePasse || motDePasse.trim() === "") {
      errors.motDePasse = "Veuillez renseigner ce champ";
    } else if (!passwordRegex.test(motDePasse)) {
      errors.motDePasse =
        "Il semble que le mot de passe ne soit pas dans un format valide. Veuillez réessayer.";
      setConnexionFormValues({
        email: email,
        motDePasse: "",
      });
    }

    return errors;
  };

  const handleInscriptionClick = (event) => {
    event.preventDefault();
    onClose();
    resetForm();
    onGoToInscription();
  };

  const handleConnexionSubmit = (event) => {
    event.preventDefault();
    const errors = validateConnexionForm();

    if (Object.keys(errors).length === 0) {
      const loginData = {
        email: connexionFormValues.email,
        motDePasse: connexionFormValues.motDePasse,
      };

      // Soumission du formulaire de connexion
      axios
        .post("/api/users/signIn", loginData)

        .then((response) => {
          // Traitement de la réponse du serveur en cas de succès
          console.log("Réponse du serveur :", response.data);
          // si la connexion est réussie, on ferme la popup
          if (response.status === 200) {
            sessionStorage.setItem("connexion", "confirmée");
            confirmation = sessionStorage.getItem("connexion");
            console.log(confirmation);

            // Réinitialisation des valeurs du formulaire de connexion
            resetForm();
            // on dit redirige l'utilisateur ver la popupToShow
            if (nextPopupToShow === "escapade") {
              onClose();
              onGoToEscapade();
            }
            const userId = response.data.user._id;
            // on appelle la fonction onSuccessfulLogin pour mettre à jour le state de App.js
            onSuccessfulLogin(userId);
            console.log(userId);
          }
        })
        .catch((error) => {
          // Traitement de l'erreur en cas d'échec de la soumission
          console.error("Erreur lors de la soumission du formulaire :", error);
        });

      onClose();

      // onGoToInscription();
    } else {
      setConnexionFormErrors(errors);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        onClose();
        resetForm();
      }}
      className="custom-modal border border-dark"
    >
      <form onSubmit={handleConnexionSubmit} className="container w-75">
        <h2>Connexion</h2>
        {/* Login form fields */}
        <div className="form-group">
          <label htmlFor="loginEmail">Email</label>
          <input
            type="email"
            id="loginEmail"
            className={`form-control ${
              connexionFormErrors.email ? "is-invalid" : ""
            }`}
            placeholder="Entrez votre email"
            value={connexionFormValues.email}
            default=""
            onChange={(e) =>
              setConnexionFormValues({
                ...connexionFormValues,
                email: e.target.value,
              })
            }
            required
          />
          {connexionFormErrors.email && (
            <div className="invalid-feedback">{connexionFormErrors.email}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Mot de passe</label>
          <input
            type="password"
            id="loginPassword"
            className={`form-control ${
              connexionFormErrors.motDePasse ? "is-invalid" : ""
            }`}
            placeholder="Entrez votre mot de passe"
            value={connexionFormValues.motDePasse}
            default=""
            onChange={(e) =>
              setConnexionFormValues({
                ...connexionFormValues,
                motDePasse: e.target.value,
              })
            }
            required
          />
          {connexionFormErrors.motDePasse && (
            <div className="invalid-feedback">
              {connexionFormErrors.motDePasse}
            </div>
          )}
        </div>
        {/* Login form submit button */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <button
            type="submit"
            className="btn btn-dark"
            onClick={handleConnexionSubmit}
          >
            Se connecter
          </button>
          <p className="mb-0">
            Pas inscrit ?{" "}
            <a href="#" onClick={handleInscriptionClick}>
              S'inscrire
            </a>
          </p>
        </div>
      </form>
    </Modal>
  );
}

export default ConnexionModal;
