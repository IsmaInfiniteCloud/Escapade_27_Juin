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
import { getCoordinates } from "../utils/geocoding.js";

function EscapadeModal({
  isOpen,
  onClose,
  onGotoConnexion,
  isUserLoggedIn,
  isUserId,
  onServerMessage,
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

  const validateEscapadeForm = () => {
    const {
      titre,
      description,
      pays,
      ville,
      adresse,
      codepostal,
      nbChambres,
      nbSallesDeBain,
      nbPersonnesMax,
      prix,
      photos,
    } = escapadeFormValues;

    const errors = {};

    if (escapadeFormValues.titre.trim() === "") {
      errors.titre = "Veuillez renseigner ce champ";
    }

    if (escapadeFormValues.description.trim() === "") {
      errors.description = "Veuillez renseigner ce champ";
    }

    if (escapadeFormValues.pays.trim() === "") {
      errors.pays = "Veuillez renseigner ce champ";
    }

    if (escapadeFormValues.ville.trim() === "") {
      errors.ville = "Veuillez renseigner ce champ";
    }

    if (escapadeFormValues.adresse.trim() === "") {
      errors.adresse = "Veuillez renseigner ce champ";
    }

    if (escapadeFormValues.codepostal.trim() === "") {
      errors.codepostal = "Veuillez renseigner ce champ";
    }

    // if (escapadeFormValues.prix.trim() === "") {
    //   errors.prix = "Veuillez renseigner ce champ";
    // } else if (
    //   !/^[0-9]+$/.test(escapadeFormValues.prix) ||
    //   escapadeFormValues.prix < 0
    // ) {
    //   errors.prix = "Veuillez entrer un nombre positif";
    // }

    if (escapadeFormValues.prix < 0) {
      errors.prix = "Veuillez entrer un nombre positif";
    }

    if (escapadeFormValues.nbChambres.trim() === "") {
      errors.nbChambres = "Veuillez renseigner ce champ";
    } else if (
      !/^[0-9]+$/.test(escapadeFormValues.nbChambres) ||
      escapadeFormValues.nbChambres < 0
    ) {
      errors.nbChambres = "Veuillez entrer un nombre positif";
    }

    // if (escapadeFormValues.nbSallesDeBain.trim() === "") {
    //   errors.nbSallesDeBain = "Veuillez renseigner ce champ";
    // } else if (
    //   !/^[0-9]+$/.test(escapadeFormValues.nbSallesDeBain) ||
    //   escapadeFormValues.nbSallesDeBain < 0
    // ) {
    //   errors.nbSallesDeBain = "Veuillez entrer un nombre positif";
    // }

    if (escapadeFormValues.nbSallesDeBain < 0) {
      errors.nbSallesDeBain = "Veuillez entrer un nombre positif";
    }

    if (escapadeFormValues.nbPersonnesMax.trim() === "") {
      errors.nbPersonnesMax = "Veuillez renseigner ce champ";
    } else if (
      !/^[0-9]+$/.test(escapadeFormValues.nbPersonnesMax) ||
      escapadeFormValues.nbPersonnesMax < 0
    ) {
      errors.nbPersonnesMax = "Veuillez entrer un nombre positif";
    }

    // si aucune photo n'a été sélectionnée

    if (selectedPhotos.length === 0) {
      errors.photos = "Vous devez ajouter au moins une photo";
    }

    return errors;
  };

  // console.log("EscapadeModal isOpen:", isOpen);
  // console.log("EscapadeModal onClose:", onClose);
  // console.log("EscapadeModal onGotoConnexion:", onGotoConnexion);
  // console.log("Utilissateur connecté:", isUserLoggedIn);
  // console.log("Id utilisateur:", userId);

  const handleEscapadeSubmit = async (event) => {
    event.preventDefault();

    // console.log("Coordonnées:", coordinates);

    console.log("Dates bloquées : ", blockedDates);
    // console.log("Photos sélectionnées : ", selectedPhotos);

    const errors = validateEscapadeForm();

    if (Object.keys(errors).length === 0) {
      const coordinates = await getCoordinates(
        escapadeFormValues.adresse,
        escapadeFormValues.ville,
        escapadeFormValues.codepostal,
        escapadeFormValues.pays
      );
      // Convert form values to appropriate types
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
          // Create the location object
          type: "Point", // Set the type property
          coordinates: [coordinates.lng, coordinates.lat], // Directly set the coordinates property to the returned coordinates array
        },
      };
      // Soumission du formulaire
      console.log(isUserId);
      console.log(escapadeFormValues);

      axios
        .post("/api/hebergement/", escapadeData, { withCredentials: true })

        .then((response) => {
          console.log(escapadeData);

          resetForm();
          onServerMessage(response.data.message);
          setSelectedFiles([]);
          setSelectedPhotos([]);
          setEscapadeFormErrors({});
          onClose();
          //setIsEscapadeOpen(false);
        })
        .catch((error) => {
          resetForm();
          // Traitement de l'erreur en cas d'échec de la soumission
          resetForm();
          setSelectedFiles([]);
          setSelectedPhotos([]);
          setEscapadeFormErrors({});
          onServerMessage(
            "Une erreur s'est produite. Veuillez réessayer plus tard."
          );
          onClose();
        });
    } else {
      setEscapadeFormErrors(errors);
    }
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    const photos = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        photos.push(event.target.result);
        if (photos.length === files.length) {
          setSelectedFiles(files);
          setSelectedPhotos(photos);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      {/* Modal content and form */}
      <Modal
        scrollable={true}
        className="custom-dialog-modal  modal-dialog-scrollable border border-dark"
        // className="custom-modal"
        isOpen={isOpen}
        onRequestClose={() => {
          onClose();
          resetForm();
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
          <form
            onSubmit={handleEscapadeSubmit}
            className="container mx-auto  px-5"
          >
            {/* <h2 className="mb-4 ">Créer une Escapade</h2> */}
            {/* Escapade form fields */}
            <div className="form-group">
              <label htmlFor="titre">Titre</label>
              <input
                type="text"
                id="titre"
                className={`form-control  mb-2 ${
                  escapadeFormErrors.titre ? "is-invalid" : ""
                }`}
                placeholder="Entrez le titre de votre escapade"
                value={escapadeFormValues.titre}
                onChange={(e) =>
                  setEscapadeFormValues({
                    ...escapadeFormValues,
                    titre: e.target.value,
                  })
                }
                required
              />
              {escapadeFormErrors.titre && (
                <div className="invalid-feedback">
                  {escapadeFormErrors.titre}
                </div>
              )}
            </div>
            <div className="form-group">
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
            </div>

            <div className="form-group">
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
            </div>

            <div className="form-group">
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
            </div>

            <div className="form-group">
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
            </div>

            <div className="form-group">
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
            </div>

            <div className="form-group">
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
            </div>

            <div className="form-group">
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
            </div>

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

            <div className="form-group">
              <label htmlFor="blockedDates">Bloquer des dates</label>
              <DatePicker
                id="blockedDates"
                selected={null}
                onChange={(dates) => setSelectedDates(dates)}
                selectsRange
                startDate={selectedDates[0]}
                endDate={selectedDates[1]}
                inline
                multiple
              />

              <button
                type="button"
                className="btn btn-dark my-2"
                onClick={() => {
                  if (selectedDates.length !== 2) {
                    console.log(
                      "Veuillez sélectionner une plage de dates valide."
                    );
                    return;
                  }

                  const startDate = new Date(selectedDates[0]);
                  const endDate = new Date(selectedDates[1]);

                  // Vérifier si la date de fin est antérieure à la date de début
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
                    currentDate.setDate(currentDate.getDate() + 1); // Passer à la prochaine date
                  }

                  setBlockedDates((prevBlockedDates) => [
                    ...prevBlockedDates,
                    ...blockedDateList,
                  ]);

                  setSelectedDates([]); // Réinitialiser les dates sélectionnées après l'ajout
                }}
              >
                Ajouter
              </button>
            </div>

            {/* {selectedDates.length > 0 && (
              <div className="mt-4">
                <h5>Dates sélectionnées :</h5>
                <ul>
                  {selectedDates.map(
                    (date, index) =>
                      date && <li key={index}>{date.toLocaleDateString()}</li>
                  )}
                </ul>
              </div>
            )} */}

            <div className="form-group">
              <label htmlFor="photos">Photos</label>
              <input
                type="file"
                id="photos
"
                className={`form-control mb-2 ${
                  escapadeFormErrors.photos ? "is-invalid" : ""
                }`}
                placeholder="Choisissez les photos de votre escapade"
                //value={escapadeFormValues.photos}
                onChange={(e) => handleFileInputChange(e)}
                // onChange={(e) =>
                //   setEscapadeFormValues({
                //     ...escapadeFormValues,
                //     photos: e.target.value,
                //   })
                // }
                required
                multiple
              />
              {escapadeFormErrors.photos && (
                <div className="invalid-feedback">
                  {escapadeFormErrors.photos}
                </div>
              )}
            </div>

            <div className="container px-0 py-3">
              <div className="row">
                {selectedPhotos.map((photo, index) => {
                  const imgClass =
                    index === 0
                      ? "first-photo col-12 rounded"
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
            onClick={handleEscapadeSubmit}
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

export default EscapadeModal;
