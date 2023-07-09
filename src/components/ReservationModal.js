import React, { useState } from 'react';

const ReservationModal = ({ hebergement, onClose }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Effectuer des actions avec les dates de réservation
    // par exemple, envoyer les données au serveur, etc.
    console.log('Date de début :', startDate);
    console.log('Date de fin :', endDate);
    onClose();
  };

  return (
    <div className="reservation-modal">
      <h2>Réserver {hebergement.titre}</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Date de début :</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>Date de fin :</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit">Réserver</button>
        <button type="button" onClick={onClose}>Annuler</button>
      </form>
    </div>
  );
};

export default ReservationModal;