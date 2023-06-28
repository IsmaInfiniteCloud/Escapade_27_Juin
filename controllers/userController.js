const User = require("../models/User");
const argon2 = require("argon2");
//essaie github
exports.signUp = async (req, res) => {
  const { email, motDePasse, prenom, nom } = req.body;

  // Check si identifiant deja utilise
  let user = await User.findOne({ email });
  console.log(req.body);

  if (user) {
    return res.status(400).json({ message: "Identifiant déjà utilisé" });
  }

  // Encryptage
  const hashedMotDePasse = await argon2.hash(motDePasse);

  // Create User
  user = new User({
    prenom,
    nom,
    email,
    motDePasse: hashedMotDePasse,
  });

  await user.save();
  res.status(201).json({
    message: "Vous êtes maintenant inscrit a Escapade. Bienvenue",
    user,
  });
};

exports.signIn = async (req, res) => {
  const { email, motDePasse } = req.body;

  console.log("Received email:", email); // Debug line
  console.log("Received motDePasse:", motDePasse); // Debug line

  // Cherche lidentifiant dans la DB (email)
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ error: "Cet identifiant est inexistant " });
  }

  // Vérification du motDePasse/encryption sur la DB
  const isMatch = await argon2.verify(user.motDePasse, motDePasse);

  if (!isMatch) {
    return res.status(401).json({ error: "Mot de passe invalide" });
  }

  // Succes

  res.status(200).json({ message: "Bienvenue", user });
  // console.log(req.session.user);
};

exports.logout = (req, res) => {
  res.status(200).json({ message: "Déconnexion réussie" });
};
