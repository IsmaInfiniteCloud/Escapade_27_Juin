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
    motDePasse: "",
    repete_passe: "",
  });

  //alert("On est dans PassOublieModal.js");

  const [isFormValid, setIsFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const resetForm = () => {
    setFormValues({
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
        .post("/api/users/patchPassword", formValues)
        .then((response) => {
          console.log("Réponse du serveur :", response.data);

          // Gestion de la réponse de l'API.
          if (response.status === 201) {
            resetForm();
            onServerMessage(response.data.message);
            // Si l'inscription est réussie, fermer le modal.
            onClose();
            onGoToConnexion();
          }
        })
        .catch((error) => {
          // setFormValues({
          //   prenom: "",
          //   nom: "",
          //   email: "",
          //   motDePasse: "",
          //   repete_passe: "",
          // });
          resetForm();
          if (error.response.status === 400) {
            onServerMessage(error.response.data.message);
          } else if (error.response.status === 404) {
            onServerMessage("Utilisateur non trouvé");
          } else {
            onServerMessage(
              "Une erreur s'est produite. Veuillez réessayer plus tard."
            );
          }
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
