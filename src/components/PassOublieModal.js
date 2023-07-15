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

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function PassOublieModal({
  isOpen,
  onClose,
  onGoToConnexion,
  onServerMessage,
  onGoPassOublie,
}) {
  const [formValues, setFormValues] = useState({
    email: "",
    motDePasse: "",
    repete_passe: "",
  });

  //alert("On est dans PassOublieModal.js");

  const [isFormValid, setIsFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const resetForm = () => {
    setFormValues({
      email: "",
      motDePasse: "",
      repete_passe: "",
    });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    // Vérification du mot de passe en testant la conformité à la passwordRegex
    if (!passwordRegex.test(formValues.motDePasse)) {
      errors.motDePasse =
        "Le mot de passe doit comporter au moins 8 caractères, dont au moins une majuscule, une minuscule, un chiffre et un caractère spécial";
    }

    if (!emailRegex.test(formValues.email)) {
      errors.email = "Veuillez entrer une adresse email valide. ";
    }

    // Vérification de l'égalité entre le mot de passe et sa répétition
    if (formValues.motDePasse !== formValues.repete_passe) {
      errors.repete_passe = "Les mots de passe ne correspondent pas";
    }

    if (formValues.repete_passe.trim() === "") {
      errors.repete_passe = "Veuillez renseigner ce champ";
    }
    return errors;
  };

  const handleInscriptionClick = (event) => {
    event.preventDefault();
    // Ferme le modal d'inscription et ouvre le modal de connexion.
    onClose();
    //initialiser le formulaire
    resetForm();
    onGoPassOublie();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsFormValid(true);
      // Envoi des données du formulaire à l'API.
      axios
        .patch("/api/users/patchPassword", formValues)
        .then((response) => {
          console.log("Réponse du serveur :", response.data);

          // Gestion de la réponse de l'API.
          if (response.status === 200) {
            resetForm();
            onServerMessage(response.data.message);
            // If the password change is successful, close the modal.
            onClose();
            onGoToConnexion();
          }
        })
        .catch((error) => {
          resetForm();
          onServerMessage(error.response.data.message);
          onClose();
        });
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
      <form onSubmit={handleSubmit} className="container w-75 px-0">
        <h2>Nouveau mot de passe</h2>
        <div className="form-group">
          <label htmlFor="loginEmail">Email</label>

          <input
            type="email"
            id="loginEmail"
            className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
            placeholder="Entrez votre email"
            value={formValues.email}
            default=""
            onChange={(e) =>
              setFormValues({
                ...formValues,

                email: e.target.value,
              })
            }
            required
          />

          {formErrors.email && (
            <div className="invalid-feedback">{formErrors.email}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="motDePasse">Mot de passe</label>
          <input
            type="password"
            id="motDePasse"
            className={`form-control ${
              formErrors.motDePasse ? "is-invalid" : ""
            }`}
            placeholder="Entrez votre mot de passe"
            value={formValues.motDePasse}
            onChange={(e) =>
              setFormValues({ ...formValues, motDePasse: e.target.value })
            }
            required
          />
          {formErrors.motDePasse && (
            <div className="invalid-feedback">{formErrors.motDePasse}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="repete_passe">Validation</label>
          <input
            type="password"
            id="repete_passe"
            className={`form-control ${
              formErrors.repete_passe ? "is-invalid" : ""
            }`}
            placeholder="Répétez votre mot de passe"
            value={formValues.repete_passe}
            onChange={(e) =>
              setFormValues({ ...formValues, repete_passe: e.target.value })
            }
            required
          />
          {formErrors.repete_passe && (
            <div className="invalid-feedback">{formErrors.repete_passe}</div>
          )}
        </div>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <button type="submit" className="btn btn-dark" onClick={handleSubmit}>
            Envoyer
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default PassOublieModal;
