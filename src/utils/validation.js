export const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export function validateConnexionForm(email, motDePasse) {
  const errors = {};

  if (!email || email.trim() === "") {
    errors.email = "Veuillez renseigner ce champ";
  } else if (!emailRegex.test(email)) {
    errors.email = "Veuillez entrer une adresse email valide.";
  }

  if (!motDePasse || motDePasse.trim() === "") {
    errors.motDePasse = "Veuillez renseigner ce champ";
  } else if (!passwordRegex.test(motDePasse)) {
    errors.motDePasse = "Il semble que le mot de passe ne soit pas dans un format valide. Veuillez réessayer.";
  }

  return errors;
}

export function validateEscapadeForm(
  {
    titre,
    description,
    pays,
    ville,
    adresse,
    codepostal,
    prix,
    nbChambres,
    nbSallesDeBain,
    nbPersonnesMax,
  },
  selectedPhotos
) {
  const errors = {};

  if (!titre || titre.trim() === "") {
    errors.titre = "Veuillez renseigner ce champ";
  }

  if (!description || description.trim() === "") {
    errors.description = "Veuillez renseigner ce champ";
  }

  if (!pays || pays.trim() === "") {
    errors.pays = "Veuillez renseigner ce champ";
  }

  if (!ville || ville.trim() === "") {
    errors.ville = "Veuillez renseigner ce champ";
  }

  if (!adresse || adresse.trim() === "") {
    errors.adresse = "Veuillez renseigner ce champ";
  }

  if (!codepostal || codepostal.trim() === "") {
    errors.codepostal = "Veuillez renseigner ce champ";
  }

  if (prix == null || prix < 0) {
    errors.prix = "Veuillez entrer un nombre positif";
  }

  if (nbChambres == null || nbChambres < 0 || !/^[0-9]+$/.test(nbChambres)) {
    errors.nbChambres = "Veuillez entrer un nombre positif";
  }

  if (nbSallesDeBain == null || nbSallesDeBain < 0) {
    errors.nbSallesDeBain = "Veuillez entrer un nombre positif";
  }

  if (nbPersonnesMax == null || nbPersonnesMax < 0 || !/^[0-9]+$/.test(nbPersonnesMax)) {
    errors.nbPersonnesMax = "Veuillez entrer un nombre positif";
  }

  if (selectedPhotos.length === 0) {
    errors.photos = "Vous devez ajouter au moins une photo";
  }

  return errors;
}
