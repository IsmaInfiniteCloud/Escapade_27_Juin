const express = require('express');
const router = express.Router();

// Import Hebergement controller
const hebergementController = require('../controllers/hebergementController');

// Route pour creer un nouvel hebergement
router.post('/', hebergementController.createHebergement);

// Route Delete
router.delete('/:id', hebergementController.deleteHebergement);

// Route update
router.put('/:id', hebergementController.updateHebergement);

// Route details
router.get('/:id', hebergementController.getHebergement);


module.exports = router;
