import React from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//Modal.setAppElement("#root"); // Remplacez '#root' par l'id de l'élément racine de votre application

function DetailsHebergementModal({ hebergement, onClose }) {
  const handleReserverClick = (event) => {
    event.preventDefault();
    onClose();
  };

  // Convertir les dates de réservation en objets Date pour le DatePicker
  // Convertir les dates de réservation en objets Date pour le DatePicker
  const reservationDates = hebergement.reservations
    ? hebergement.reservations.map((dateString) => new Date(dateString))
    : [];

  // Vous pouvez également utiliser la fonction highlightDates pour donner un style spécifique aux dates réservées
  const highlightWithRanges = [
    {
      "react-datepicker__day--highlighted-custom-1": reservationDates,
    },
  ];

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
        {" "}
        <p className="py-0">
          <span className="fw-bold">Catégorie:</span> {hebergement.categorie}
        </p>
        <p className="py-0">
          <span className="fw-bold">Ville:</span> {hebergement.ville}
        </p>
        <p className="py-0">
          <span className="fw-bold">Pays:</span> {hebergement.pays}
        </p>
        <p className="py-0">
          <span className="fw-bold">Description:</span>{" "}
          {hebergement.description}
        </p>
        <p className="py-0">
          <span className="fw-bold">Nombre de chambre:</span>{" "}
          {hebergement.nbChambres}
        </p>
        <p className="py-0">
          <span className="fw-bold">Nombre de salle de bain:</span>{" "}
          {hebergement.nbSallesDeBain}
        </p>
        <p className="py-0">
          <span className="fw-bold">Nombre de personnes maximum:</span>{" "}
          {hebergement.nbPersonnesMax}
        </p>
        <p className="py-0">
          <span className="fw-bold">Animaux acceptés:</span>{" "}
          {hebergement.animalAccepte ? "Oui" : "Non"}
        </p>
        <div className="container px-0 py-3">
          <div className="row">
            {hebergement.photos.map((photo, index) => {
              const imgClass =
                index === 0
                  ? "first-photo col-md-6 rounded"
                  : "subsequent-photo col-md-6 rounded";
              return (
                <div key={index} className={imgClass}>
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="img-fluid"
                    style={{ width: "100%" }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {/* <div className="calendar">
          <h3>Disponibilités</h3>
          {hebergement.reservations &&
            hebergement.reservations.map((reservation, index) => (
              <p key={index}>{reservation}</p> // Formattez ces dates comme vous le souhaitez
            ))}
                  
        </div> */}
        <h3>Disponibilités</h3>
        <DatePicker
          inline
          includeDates={reservationDates}
          highlightDates={highlightWithRanges}
        />
      </div>
      <hr />
      <button
        type="button"
        className="btn btn-dark my-3 mx-5 fw-bold"
        onClick={handleReserverClick}
      >
        Réserver
      </button>
    </Modal>
  );
}

export default DetailsHebergementModal;