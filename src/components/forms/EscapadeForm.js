import React, { useState } from 'react';
import axios from 'axios';
import { getCoordinates } from '../../utils/geocoding';
import DatePickerField from '../EscapadeModalComponents/DatePickerField';
import PhotoPreview from '../EscapadeModalComponents/PhotoPreview';
import { createEscapade } from '../../utils/api';
import { validateEscapadeForm } from '../../utils/validation';
export default function EscapadeForm({
  isUserId,
  onServerMessage,
  onClose,
}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [isEscapadeOpen, setIsEscapadeOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [blockedDates, setBlockedDates] = useState([]);
  const [escapadeFormValues, setEscapadeFormValues] = useState({
    idUser: isUserId,
    titre: "",
    description: "",
    categorie: "Chalet",
    adresse: "",
    ville: "",
    codepostal: "",
    pays: "",
    nbChambres: "",
    nbSallesDeBain: "",
    nbPersonnesMax: "",
    animalAccepte: false,
    photos: "",
    prix: "",
  });
  const [isEscapadeFormValid, setIsEscapadeFormValid] = useState(false);
  const [escapadeFormErrors, setEscapadeFormErrors] = useState({});

  const resetForm = () => {
    setEscapadeFormValues({
      idUser: isUserId,
      titre: "",
      description: "",
      categorie: "Chalet",
      adresse: "",
      ville: "",
      codepostal: "",
      pays: "",
      nbChambres: "",
      nbSallesDeBain: "",
      nbPersonnesMax: "",
      animalAccepte: false,
      photos: "",
      prix: "",
    });
    setEscapadeFormErrors({});
  };

  const handleFormInputChange = (event) => {
    setEscapadeFormValues({
      ...escapadeFormValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckboxChange = (event) => {
    setEscapadeFormValues({
      ...escapadeFormValues,
      [event.target.name]: event.target.checked,
    });
  };

  const handleEscapadeSubmit = async (event) => {
    event.preventDefault();
  
    const errors = validateEscapadeForm(
      escapadeFormValues,
      selectedPhotos,
      resetForm
    );
  
    if (Object.keys(errors).length === 0) {
      const coordinates = await getCoordinates(
        escapadeFormValues.adresse,
        escapadeFormValues.ville,
        escapadeFormValues.codepostal,
        escapadeFormValues.pays
      );
  
      const escapadeData = {
        ...escapadeFormValues,
        idUser: isUserId,
        nbChambres: parseInt(escapadeFormValues.nbChambres),
        nbSallesDeBain: parseFloat(escapadeFormValues.nbSallesDeBain),
        nbPersonnesMax: parseInt(escapadeFormValues.nbPersonnesMax),
        photos: selectedPhotos,
        date_bloque: blockedDates,
        prix: parseFloat(escapadeFormValues.prix),
        location: {
          type: "Point",
          coordinates: [coordinates.lng, coordinates.lat],
        },
      };
  
      createEscapade(escapadeData)
        .then((response) => {
          resetForm();
          onServerMessage(response.data.message);
          setSelectedFiles([]);
          setSelectedPhotos([]);
          onClose();
        })
        .catch((error) => {
          resetForm();
          setSelectedFiles([]);
          setSelectedPhotos([]);
          onServerMessage(
            "Une erreur s'est produite. Veuillez réessayer plus tard."
          );
          onClose();
        });
    } else {
      setEscapadeFormErrors(errors);
    }
  };


  return (
    <form onSubmit={handleEscapadeSubmit}>
      <input
        type="text"
        name="titre"
        value={escapadeFormValues.titre}
        onChange={handleFormInputChange}
        placeholder="Title"
      />
      <textarea
        name="description"
        value={escapadeFormValues.description}
        onChange={handleFormInputChange}
        placeholder="Description"
      />
      <input
        type="text"
        name="categorie"
        value={escapadeFormValues.categorie}
        onChange={handleFormInputChange}
        placeholder="Category"
      />
      <input
        type="text"
        name="adresse"
        value={escapadeFormValues.adresse}
        onChange={handleFormInputChange}
        placeholder="Address"
      />
      <input
        type="text"
        name="ville"
        value={escapadeFormValues.ville}
        onChange={handleFormInputChange}
        placeholder="City"
      />
      <input
        type="text"
        name="codepostal"
        value={escapadeFormValues.codepostal}
        onChange={handleFormInputChange}
        placeholder="Postal Code"
      />
      <input
        type="text"
        name="pays"
        value={escapadeFormValues.pays}
        onChange={handleFormInputChange}
        placeholder="Country"
      />
      <input
        type="text"
        name="nbChambres"
        value={escapadeFormValues.nbChambres}
        onChange={handleFormInputChange}
        placeholder="Number of Bedrooms"
      />
      <input
        type="text"
        name="nbSallesDeBain"
        value={escapadeFormValues.nbSallesDeBain}
        onChange={handleFormInputChange}
        placeholder="Number of Bathrooms"
      />
      <input
        type="text"
        name="nbPersonnesMax"
        value={escapadeFormValues.nbPersonnesMax}
        onChange={handleFormInputChange}
        placeholder="Max Number of People"
      />
      <input
        type="checkbox"
        name="animalAccepte"
        checked={escapadeFormValues.animalAccepte}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="animalAccepte">Are animals accepted?</label>
      <input
        type="text"
        name="photos"
        value={escapadeFormValues.photos}
        onChange={handleFormInputChange}
        placeholder="Photos"
      />
      <input
        type="text"
        name="prix"
        value={escapadeFormValues.prix}
        onChange={handleFormInputChange}
        placeholder="Price"
      />
      <DatePickerField
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
        blockedDates={blockedDates}
        setBlockedDates={setBlockedDates}
      />
      <PhotoPreview
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        selectedPhotos={selectedPhotos}
        setSelectedPhotos={setSelectedPhotos}
        escapadeFormErrors={escapadeFormErrors}
        setEscapadeFormErrors={setEscapadeFormErrors}
      />
      <button type="submit">Submit</button>
    </form>
  );

}