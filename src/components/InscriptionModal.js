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

function InscriptionModal({
  isOpen,
  onClose,
  onGoToConnexion,
  onServerMessage,
}) {
  const [formValues, setFormValues] = useState({
    prenom: "",
    nom: "",
    email: "",
    motDePasse: "",
    repete_passe: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const resetForm = () => {
    setFormValues({
      prenom: "",
      nom: "",
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

    // Vérification de l'égalité entre le mot de passe et sa répétition
    if (formValues.motDePasse !== formValues.repete_passe) {
      errors.repete_passe = "Les mots de passe ne correspondent pas";
    }

    // Vérification des autres champs du formulaire d'inscription
    if (formValues.prenom.trim() === "") {
      errors.prenom = "Veuillez renseigner ce champ";
    }

    if (formValues.nom.trim() === "") {
      errors.nom = "Veuillez renseigner ce champ";
    }

    if (formValues.email.trim() === "") {
      errors.email = "Veuillez renseigner ce champ";
    } else if (!emailRegex.test(formValues.email)) {
      errors.email = "Veuillez saisir une adresse email valide";
    }

    if (formValues.motDePasse.trim() === "") {
      errors.motDePasse = "Veuillez renseigner ce champ";
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
    onGoToConnexion();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsFormValid(true);
      // Envoi des données du formulaire à l'API.
      axios
        .post("/api/users/signup", formValues)
        .then((response) => {
          console.log("Réponse du serveur :", response.data);

          // Gestion de la réponse de l'API.
          if (response.status === 201) {
            //réinitialisation du formulaire
            // setFormValues({
            //   prenom: "",
            //   nom: "",
            //   email: "",
            //   motDePasse: "",
            //   repete_passe: "",
            // });

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
      <form onSubmit={handleSubmit} className="container px-5">
        <h2>Inscription</h2>
        <div className="form-group">
          <label htmlFor="prenom">Prénom</label>
          <input
            type="text"
            id="prenom"
            className={`form-control ${formErrors.prenom ? "is-invalid" : ""}`}
            placeholder="Entrez votre prénom"
            value={formValues.prenom}
            onChange={(e) =>
              setFormValues({ ...formValues, prenom: e.target.value })
            }
            required
          />
          {formErrors.prenom && (
            <div className="invalid-feedback">{formErrors.prenom}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            id="nom"
            className={`form-control ${formErrors.nom ? "is-invalid" : ""}`}
            placeholder="Entrez votre nom"
            value={formValues.nom}
            onChange={(e) =>
              setFormValues({ ...formValues, nom: e.target.value })
            }
            required
          />
          {formErrors.nom && (
            <div className="invalid-feedback">{formErrors.nom}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
            placeholder="Entrez votre email"
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
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
            S'inscrire
          </button>
          <p className="mb-0">
            Déjà inscrit ?{" "}
            <a href="#" onClick={handleInscriptionClick}>
              Se connecter
            </a>
          </p>
        </div>
      </form>
    </Modal>
  );
}

export default InscriptionModal;
