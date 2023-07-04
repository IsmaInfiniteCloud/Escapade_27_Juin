const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session"); // Import the session
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const hebergementRoutes = require("./routes/hebergementRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000", // replace with the domain of your client app
    credentials: true,
  })
);

app.use(express.json());

// Add the session middleware
app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false, maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

// Connexion à la base de données MongoDB avec Mongoose
mongoose
  .connect(
    // "mongodb+srv://ameen:gr007,,@cluster0.rztkifm.mongodb.net/Escapade",
    "mongodb+srv://julesmartin63:Michelle0987@cluster0.tim76gj.mongodb.net/Escapade",
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
app.use("/api/reservation", reservationRoutes);

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
