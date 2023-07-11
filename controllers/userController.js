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

//Modifier son mot de passe utilisateur

exports.patchPassword = async (req, res) => {
  const id = req.params.id;
  let updateData = req.body;

  // Si le mot de passe est mis à jour, le hacher à nouveau avant de sauvegarder
  if (updateData.motDePasse) {
    updateData.motDePasse = await argon2.hash(updateData.motDePasse);
  }

  User.findByIdAndUpdate(id, updateData, { new: true }, (err, user) => {
    if (err) {
      return res.status(500).json({
        message:
          "Erreur lors de la mise à jour des informations de l'utilisateur",
      });
    }
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    return res.status(200).json({
      message: "Informations de l'utilisateur mises à jour avec succès",
      user,
    });
  });
};
// fait par Pascal
exports.patchEmail = async (req, res) => {
  const id = req.params.id;
  const newEmail = req.body.email;

  // Vérifier si l'email est déjà utilisé
  const emailExists = await User.findOne({ email: newEmail });
  if (emailExists) {
    return res.status(400).json({ message: "Cet email est déjà utilisé" });
  }

  User.findByIdAndUpdate(
    id,
    { email: newEmail },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(500).json({
          message: "Erreur lors de la mise à jour de l'email de l'utilisateur",
        });
      }
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      return res.status(200).json({
        message: "Email de l'utilisateur mis à jour avec succès",
        user,
      });
    }
  );
};

//Update User/gerer profil
