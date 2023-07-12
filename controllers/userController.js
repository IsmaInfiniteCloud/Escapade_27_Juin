const User = require("../models/User");
const argon2 = require("argon2");
exports.signUp = async (req, res) => {
  const { email, motDePasse, prenom, nom } = req.body;

  // Check si identifiant deja utilise
  let user = await User.findOne({ email });

  //console.log(req.body);

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
    message: "Vous êtes maintenant inscrit a Escapade",
    user,
  });
};

exports.signIn = async (req, res) => {
  const { email, motDePasse } = req.body;

  //console.log("Received email:", email); // Debug line
  //console.log("Received motDePasse:", motDePasse); // Debug line

  // Cherche lidentifiant dans la DB (email)
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ error: "Cet identifiant est inexistant !" });
  }

  req.session.user = user;
  console.log(user);
  // Vérification du motDePasse/encryption sur la DB
  const isMatch = await argon2.verify(user.motDePasse, motDePasse);

  if (!isMatch) {
    return res.status(401).json({ error: "Mot de passe invalide !" });
  }

  // Succes

  res
    .status(200)
    .json({ message: user.prenom + ", Bienvenue sur Escapade", user });
  //console.log(req.session.user._id);
  // userId = req.session.user._id;
  // console.log(userId);
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Une erreur s'est produite lors de la déconnexion" });
    }
    res.status(200).json({ message: "Déconnexion réussie" });
  });
};

exports.getUserByEmail = async (req, res) => {
  const email = req.params.email;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    return res.status(200).json({
      message: "Informations de l'utilisateur récupérées avec succès",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Erreur lors de la récupération des informations de l'utilisateur",
    });
  }
};
exports.patchPassword = async (req, res) => {
  const email = req.body.email;
  const newPassword = req.body.motDePasse;
  const confirmPassword = req.body.repete_passe;

  // Check if the new password and confirm password are same
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check for the user with the given email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If the user is found, hash the new password and update it
    const hashedPassword = await argon2.hash(newPassword);

    const updatedUser = await User.findByIdAndUpdate(user.id, { motDePasse: hashedPassword }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User password updated successfully",
      updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error when updating the user's password",
    });
  }
};
