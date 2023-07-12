import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { validateConnexionForm } from "../../utils/validation";
import { loginUser } from "../../utils/api";

function ConnexionForm({
  onReset,
  onSuccessfulLogin,
  onServerMessage,
  nextPopupToShow,
  onClose,
  onGoToEscapade,
  onGoToInscription,
}) {
  const [connexionFormValues, setConnexionFormValues] = useState({
    email: "",
    motDePasse: "",
  });

  const [connexionFormErrors, setConnexionFormErrors] = useState({});

  const resetForm = () => {
    setConnexionFormValues({
      email: "",
      motDePasse: "",
    });
    setConnexionFormErrors({});
  };

  useEffect(() => {
    onReset(resetForm);
  }, [onReset]);

  const handleInscriptionClick = (event) => {
    event.preventDefault();
    resetForm();
    onGoToInscription();
  };

  const handleConnexionSubmit = (event) => {
    event.preventDefault();
    const errors = validateConnexionForm(
      connexionFormValues.email,
      connexionFormValues.motDePasse
    );

    if (Object.keys(errors).length === 0) {
      const loginData = {
        email: connexionFormValues.email,
        motDePasse: connexionFormValues.motDePasse,
      };

      loginUser(loginData)
        .then((response) => {
          if (response.status === 200) {
            sessionStorage.setItem("connexion", "confirmée");

            resetForm();

            if (nextPopupToShow === "escapade") {
              onClose();
              onGoToEscapade();
            } else {
              onClose();
            }
            const userId = response.data.user._id;
            onSuccessfulLogin(userId);
            onServerMessage(response.data.message);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            onServerMessage(error.response.data.error);
          } else {
            onServerMessage(
              "Une erreur s'est produite. Veuillez réessayer plus tard."
            );
          }
        });
    } else {
      setConnexionFormErrors(errors);
    }
  };

  return (
    <form onSubmit={handleConnexionSubmit} className="container px-5">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={connexionFormValues.email}
          onChange={(e) =>
            setConnexionFormValues({
              ...connexionFormValues,
              email: e.target.value,
            })
          }
        />
        {connexionFormErrors.email && (
          <div className="text-danger">{connexionFormErrors.email}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="motDePasse" className="form-label">
          Mot de Passe
        </label>
        <input
          type="password"
          className="form-control"
          id="motDePasse"
          value={connexionFormValues.motDePasse}
          onChange={(e) =>
            setConnexionFormValues({
              ...connexionFormValues,
              motDePasse: e.target.value,
            })
          }
        />
        {connexionFormErrors.motDePasse && (
          <div className="text-danger">{connexionFormErrors.motDePasse}</div>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>

      <button
        type="button"
        className="btn btn-link"
        onClick={handleInscriptionClick}
      >
        Inscription
      </button>
    </form>
  );
}

export default ConnexionForm;
