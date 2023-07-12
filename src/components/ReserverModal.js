import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function ReserverModal({ hebergement, isOpen, onClose }) {
  const [reservationValues, setReservationValues] = useState({
    nbPersonnes: "",
  });

  const [selectedDates, setSelectedDates] = useState([]);
  const [blockedDates, setBlockedDates] = useState([]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Logic here...
    console.log(reservationValues, selectedDates);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="reservationModal border border-dark"
      style={{
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        content: {
          position: "relative",
          paddingBottom: "15px",
        },
      }}
    >
      <div style={{ position: "relative" }}>
        <button
          style={{ position: "absolute", top: "-10px", right: 0 }}
          variant="dark"
          onClick={onClose}
          className="close-button me-4  mb-2"
        >
          X
        </button>

        <form onSubmit={handleFormSubmit} className="container mx-auto px-5 ">
          <h2 className="mb-3 mt-2 fs-2">Réserver</h2>
          <div className="form-group">
            <label htmlFor="nbPersonnes">Nombre de personnes</label>
            <input
              type="number"
              id="nbPersonnes"
              className="form-control mb-2"
              style={{ width: "60%" }}
              placeholder="Entrez le nombre de personnes"
              value={reservationValues.nbPersonnes}
              onChange={(e) =>
                setReservationValues({
                  ...reservationValues,
                  nbPersonnes: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="selectedDates">Choisir vos dates</label>
            <DatePicker
              className="blocked-dates-datepicker"
              id="selectedDates"
              locale="fr"
              selected={null}
              onChange={(dates) => setSelectedDates(dates)}
              selectsRange
              monthsShown={2}
              startDate={selectedDates[0]}
              endDate={selectedDates[1]}
              inline
              multiple
            />

            <button
              type="submit"
              className="btn btn-dark my-3"
              onClick={() => {
                if (selectedDates.length !== 2) {
                  console.log(
                    "Veuillez sélectionner une plage de dates valide."
                  );
                  return;
                }

                const startDate = new Date(selectedDates[0]);
                const endDate = new Date(selectedDates[1]);

                if (endDate < startDate) {
                  console.log(
                    "La date de fin doit être postérieure à la date de début."
                  );
                  return;
                }

                const blockedDateList = [];
                const currentDate = new Date(startDate);

                while (currentDate <= endDate) {
                  const formattedDate = currentDate.toLocaleDateString(
                    "fr-CA",
                    {
                      dateStyle: "short",
                    }
                  );
                  blockedDateList.push(formattedDate);
                  currentDate.setDate(currentDate.getDate() + 1);
                }

                setBlockedDates((prevBlockedDates) => [
                  ...prevBlockedDates,
                  ...blockedDateList,
                ]);

                setSelectedDates([]);
              }}
            >
              Soumettre
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ReserverModal;
