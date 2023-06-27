const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const hebergementRoutes = require("./routes/hebergementRoutes");

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

// Connexion à la base de données MongoDB avec Mongoose
mongoose
  .connect(
    "mongodb+srv://ameen:gr007,,@cluster0.rztkifm.mongodb.net/Escapade",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connexion à la base de données réussie");
  })
  .catch((error) => {
    console.error("Erreur de connexion à la base de données", error);
  });

// Définition des routes
app.get("/", (req, res) => {
  res.send("Bienvenue sur votre site transactionnel");
});

app.use("/api/hebergement", hebergementRoutes);
app.use("/api/users", userRoutes);

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
