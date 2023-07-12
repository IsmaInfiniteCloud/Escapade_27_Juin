import React, { useState } from "react";
import "./ReserverModal";
import "./DetailsHebergementModal";
import "./ConnexionModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Modal from "react-modal";
import axios from "axios";

function ReserverModal({ hebergement, onClose }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Effectuer des actions avec les dates de réservation
    // par exemple, envoyer les données au serveur, etc.
    console.log("Date de début :", startDate);
    console.log("Date de fin :", endDate);
    onClose();
  };

  return (
    <div>
      {/* Modal content and form */}
      <Modal
        scrollable={true}
        className="custom-dialog-modal  modal-dialog-scrollable border border-dark"
        // className="custom-modal"
        //isOpen={isOpen}
        onRequestClose={() => {
          onClose();
          // resetForm();
        }}
      >
        <div
          className="modal-header"
          style={{ position: "sticky", top: 0, zIndex: 1 }}
        >
          <h2 className="modal-title ms-5 mt-4  mb-2 fs-2">
            Créer une Escapade
          </h2>
          <div className="modal-header d-flex justify-content-between align-items-center">
            <button
              variant="dark"
              onClick={onClose}
              className="close-button me-4 mt-4 mb-2"
            >
              X
            </button>
          </div>
        </div>
        <hr />
        <div
          className="modal-body"
          style={{ maxHeight: "60vh", overflowY: "auto" }}
        >
          {" "}
          <form onSubmit={handleFormSubmit} className="container mx-auto  px-5">
            {/* <h2 className="mb-4 ">Créer une Escapade</h2> */}
            {/* Escapade form fields */}
            <div className="form-group">
              <label htmlFor="reserver">Réserver</label>

              {/* {escapadeFormErrors.titre && (
                <div className="invalid-feedback">
                  {escapadeFormErrors.titre}
                </div>
              )} */}
            </div>
            {/* <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className={`form-control mb-2 ${
                  escapadeFormErrors.description ? "is-invalid" : ""
                }`}
                placeholder="Entrez la description de votre escapade"
                value={escapadeFormValues.description}
                onChange={(e) =>
                  setEscapadeFormValues({
                    ...escapadeFormValues,
                    description: e.target.value,
                  })
                }
                required
              />
              {escapadeFormErrors.description && (
                <div className="invalid-feedback">
                  {escapadeFormErrors.description}
                </div>
              )}
            </div> */}

            {/* <div className="form-group">
              <label htmlFor="categorie">Catégorie</label>
              <select
                id="categorie"
                className="form-control mb-2"
                value={escapadeFormValues.selectOption}
                onChange={(e) =>
                  setEscapadeFormValues({
                    ...escapadeFormValues,
                    categorie: e.target.value,
                  })
                }
              >
                <option value="Chalet" selected>
                  Chalet
                </option>
                <option value="Appartement">Appartement</option>
                <option value="Maison">Maison</option>
              </select>
            </div> */}

            {/* <div className="form-group">
              <label htmlFor="adresse">Adresse</label>
              <input
                type="text"
                id="adresse"
                className={`form-control mb-2 ${
                  escapadeFormErrors.adresse ? "is-invalid" : ""
                }`}
                placeholder="Entrez l'adresse de votre escapade"
                value={escapadeFormValues.adresse}
                onChange={(e) =>
                  setEscapadeFormValues({
                    ...escapadeFormValues,
                    adresse: e.target.value,
                  })
                }
                required
              />
              {escapadeFormErrors.adresse && (
                <div className="invalid-feedback">
                  {escapadeFormErrors.adresse}
                </div>
              )}
            </div> */}

            {/* <div className="form-group">
              <label htmlFor="ville">Ville</label>
              <input
                type="text"
                id="ville"
                className={`form-control mb-2 ${
                  escapadeFormErrors.ville ? "is-invalid" : ""
                }`}
                placeholder="Entrez la ville de votre escapade"
                value={escapadeFormValues.ville}
                onChange={(e) =>
                  setEscapadeFormValues({
                    ...escapadeFormValues,
                    ville: e.target.value,
                  })
                }
                required
              />
              {escapadeFormErrors.ville && (
                <div className="invalid-feedback">
                  {escapadeFormErrors.ville}
                </div>
              )}
            </div> */}

            {/* <div className="form-group">
              <label htmlFor="codepostal">Code postal</label>
              <input
                type="text"
                id="codepostal"
                className={`form-control mb-2 ${
                  escapadeFormErrors.codepostal ? "is-invalid" : ""
                }`}
                placeholder="Entrez le code postal de votre escapade"
                value={escapadeFormValues.codepostal}
                onChange={(e) =>
                  setEscapadeFormValues({
                    ...escapadeFormValues,
                    codepostal: e.target.value,
                  })
                }
                required
              />
              {escapadeFormErrors.codepostal && (
                <div className="invalid-feedback">
                  {escapadeFormErrors.codepostal}
                </div>
              )}
            </div> */}

            {/* <div className="form-group">
              <label htmlFor="pays">Pays</label>
              <input
                type="text"
                id="pays"
                className={`form-control mb-2 ${
                  escapadeFormErrors.pays ? "is-invalid" : ""
                }`}
                placeholder="Entrez le pays de votre escapade"
                value={escapadeFormValues.pays}
                onChange={(e) =>
                  setEscapadeFormValues({
                    ...escapadeFormValues,
                    pays: e.target.value,
                  })
                }
                required
              />
              {escapadeFormErrors.pays && (
                <div className="invalid-feedback">
                  {escapadeFormErrors.pays}
                </div>
              )}
            </div> */}

            {/* <div className="form-group">
              <label htmlFor="nbChambres">Nombre de chambres</label>
              <input
                type="number"
                id="nbChambres"
                className={`form-control mb-2 ${
                  escapadeFormErrors.nbChambres ? "is-invalid" : ""
                }`}
                placeholder="Entrez le nombre de chambres de votre escapade"
                value={escapadeFormValues.nbChambres}
                onChange={(e) =>
                  setEscapadeFormValues({
                    ...escapadeFormValues,
                    nbChambres: e.target.value,
                  })
                }
                required
              />
              {escapadeFormErrors.nbChambres && (
                <div className="invalid-feedback">
                  {escapadeFormErrors.nbChambres}
                </div>
              )}
            </div> */}

            <div className="form-group">
              <label htmlFor="nbSallesDeBain">Nombre de salles de bain</label>
              <input
                type="number"
                id="nbSallesDeBain"
                className={`form-control mb-2 ${
                  escapadeFormErrors.nbSallesDeBain ? "is-invalid" : ""
                }`}
                placeholder="Entrez le nombre de salles de bain de votre escapade"
                value={escapadeFormValues.nbSallesDeBain}
                onChange={(e) => {
                  let number = Number(e.target.value.replace(",", "."));
                  setEscapadeFormValues({
                    ...escapadeFormValues,
                    nbSallesDeBain: number,
                  });
                }}
                required
              />
              {escapadeFormErrors.nbSallesDeBain && (
                <div className="invalid-feedback">
                  {escapadeFormErrors.nbSallesDeBain}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="nbPersonnesMax">
                Nombre de personnes maximum
              </label>
              <input
                type="number"
                id="nbPersonnesMax"
                className={`form-control mb-2 ${
                  escapadeFormErrors.nbPersonnesMax ? "is-invalid" : ""
                }`}
                placeholder="Entrez le nombre de personnes maximum de votre escapade"
                value={escapadeFormValues.nbPersonnesMax}
                onChange={(e) =>
                  setEscapadeFormValues({
                    ...escapadeFormValues,
                    nbPersonnesMax: e.target.value,
                  })
                }
                required
              />
              {escapadeFormErrors.nbPersonnesMax && (
                <div className="invalid-feedback">
                  {escapadeFormErrors.nbPersonnesMax}
                </div>
              )}
            </div>

            <div className="form-group">
              <div className="form-check my-2">
                <input
                  type="checkbox"
                  id="animalAccepte"
                  className="form-check-input"
                  checked={escapadeFormValues.animalAccepte}
                  onChange={(e) => {
                    setEscapadeFormValues({
                      ...escapadeFormValues,
                      animalAccepte: e.target.checked,
                    });
                  }}
                />
                <label className="form-check-label" htmlFor="animalAccepte">
                  Animaux acceptés
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="prix">Prix par jour</label>
              <input
                type="number"
                id="prix"
                className={`form-control mb-2 ${
                  escapadeFormErrors.prix ? "is-invalid" : ""
                }`}
                placeholder="Entrez le prix par jour de votre escapade"
                value={escapadeFormValues.prix}
                onChange={(e) => {
                  let number = Number(e.target.value.replace(",", "."));
                  setEscapadeFormValues({
                    ...escapadeFormValues,
                    prix: number,
                  });
                }}
                required
              />
              {escapadeFormErrors.prix && (
                <div className="invalid-feedback">
                  {escapadeFormErrors.prix}
                </div>
              )}
            </div>
          </form>
        </div>
        <hr />
        <div
          className="modal-footer my-3 mx-5"
          style={{ position: "sticky", bottom: 0, zIndex: 1 }}
        >
          <button
            type="submit"
            className="btn btn-dark my-3 mx-3"
            onClick={handleFormSubmit}
          >
            Soumettre
          </button>
          {/* <button
            type="button"
            className="btn btn-dark my-3 mx-3"
            onClick={() => setIsEscapadeOpen(false)}
          >
            Fermer
          </button> */}
        </div>
      </Modal>
    </div>
  );
}

export default ReserverModal;
