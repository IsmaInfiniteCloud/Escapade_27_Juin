import React from "react";
import Modal from "react-modal";
import DetailsItem from "./DetailsHerbegementComponents/DetailsItem"
import Photos from "./DetailsHerbegementComponents/PhotosModal"
import DatePickerModal from "./DetailsHerbegementComponents/DatePickerModal";
import ReserveButton from "./DetailsHerbegementComponents/ReserveButton";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { convertToDateObjects } from "../utils/dateUtils";

function DetailsHebergementModal({ hebergement, onClose }) {
  const handleReserverClick = (event) => {
    event.preventDefault();
    alert("C'est ici que nous affichons le formulaire de réservation");
    onClose();
  };

  // Convertir les dates de réservation en objets Date pour le DatePicker
  const datesBloquees = convertToDateObjects(hebergement.date_bloque);

  if (!hebergement) return null;

  return (
    <Modal
      scrollable={true}
      className="modal-dialog-details border border-dark"
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Détails de l'hébergement"
    >
      <div
        className="modal-header d-flex justify-content-between"
        style={{ position: "sticky", top: 0, zIndex: 1 }}
      >
        <h2 className="modal-title ms-5 mt-4 mb-2 fs-2">{hebergement.titre}</h2>
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
        className="modal-body px-5"
        style={{ maxHeight: "65vh", overflowY: "auto" }}
      >
        <DetailsItem label="Catégorie" value={hebergement.categorie} />
        <DetailsItem label="Ville" value={hebergement.ville} />
        <DetailsItem label="Pays" value={hebergement.pays} />
        <DetailsItem label="Description" value={hebergement.description} />
        <DetailsItem label="Nombre de chambre" value={hebergement.nbChambres} />
        <DetailsItem
          label="Nombre de salle de bain"
          value={hebergement.nbSallesDeBain}
        />
        <DetailsItem
          label="Nombre de personnes maximum"
          value={hebergement.nbPersonnesMax}
        />
        <DetailsItem
          label="Animaux acceptés"
          value={hebergement.animalAccepte ? "Oui" : "Non"}
        />
        <DetailsItem label="Prix" value={hebergement.prix + " $ / nuit"} />
        <Photos photos={hebergement.photos} />
        <DatePickerModal datesBloquees={datesBloquees} />
      </div>
      <hr />
      <ReserveButton onClick={handleReserverClick} />
    </Modal>
  );
}

export default DetailsHebergementModal;
