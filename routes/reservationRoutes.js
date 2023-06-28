const express = require('express');
const router = express.Router();
//const bodyParser = require('body-parser');

const app = express();

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());


// Import Hebergement controller
const reservationController = require('../controllers/reservationController');

// Route pour creer un nouvel hebergement
router.post('/', reservationController.createReservation);

// Route Delete
router.delete('/:id', reservationController.deleteReservation);

// Route update
//router.put('/:id', reservationController.createReservation);

// Route details
//router.get('/:id', reservationController.createReservation);


module.exports = router;
