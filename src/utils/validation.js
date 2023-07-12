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
