import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { getCoordinates } from '../../utils/geocoding';
import { createEscapade } from '../../utils/api';
import { validateEscapadeForm } from '../../utils/validation';
import DatePickerModal from '../DetailsHerbegementComponents/DatePickerModal';
import PhotosModal from '../DetailsHerbegementComponents/PhotosModal';


function EscapadeForm() {
  const [escapadeFormValues, setEscapadeFormValues] = useState({
    titre: "",
    description: "",
    pays: "",
    ville: "",
    adresse: "",
    codepostal: "",
    prix: "",
    nbChambres: "",
    nbSallesDeBain: "",
    nbPersonnesMax: "",
    photos: [],
    datesBloquees: [],
  });

  const [escapadeFormErrors, setEscapadeFormErrors] = useState({});

  const handleEscapadeSubmit = (event) => {
    event.preventDefault();
    const errors = validateEscapadeForm(escapadeFormValues, escapadeFormValues.photos);

    if (Object.keys(errors).length === 0) {
      // handle submit here
    } else {
      setEscapadeFormErrors(errors);
    }
  };

  const handleFileChange = (event) => {
    setEscapadeFormValues({
      ...escapadeFormValues,
      photos: Array.from(event.target.files),
    });
  };

  return (
    <form onSubmit={handleEscapadeSubmit} className="container px-5">
      <div className="mb-3">
        <label htmlFor="titre" className="form-label">
          Titre
        </label>
        <input
          type="text"
          className="form-control"
          id="titre"
          value={escapadeFormValues.titre}
          onChange={(e) =>
            setEscapadeFormValues({
              ...escapadeFormValues,
              titre: e.target.value,
            })
          }
        />
        {escapadeFormErrors.titre && (
          <div className="text-danger">{escapadeFormErrors.titre}</div>
        )}
      </div>

      {/* ... Repeat this pattern for all the fields ... */}

      <div className="mb-3">
        <label htmlFor="nbPersonnesMax" className="form-label">
          Nombre de personnes max
        </label>
        <input
          type="text"
          className="form-control"
          id="nbPersonnesMax"
          value={escapadeFormValues.nbPersonnesMax}
          onChange={(e) =>
            setEscapadeFormValues({
              ...escapadeFormValues,
              nbPersonnesMax: e.target.value,
            })
          }
        />
        {escapadeFormErrors.nbPersonnesMax && (
          <div className="text-danger">{escapadeFormErrors.nbPersonnesMax}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="photos" className="form-label">
          Photos
        </label>
        <input
          type="file"
          className="form-control"
          id="photos"
          multiple
          onChange={handleFileChange}
        />
        {escapadeFormErrors.photos && (
          <div className="text-danger">{escapadeFormErrors.photos}</div>
        )}
        {escapadeFormValues.photos.length > 0 && <PhotosModal photos={escapadeFormValues.photos} />}
      </div>

      <div className="mb-3">
        <label className="form-label">
          Dates bloquées
        </label>
        <DatePickerModal datesBloquees={escapadeFormValues.datesBloquees} />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default EscapadeForm;
