const express = require('express');

// on importe nos controllers
const mainController = require('./controllers/mainController');
const favorisController = require('./controllers/favorisController');


const router = express.Router();

// page d'accueil
router.get('/', mainController.homePage);

// page article
router.get('/article/:id', mainController.articlePage);

// page favoris
router.get('/favoris', favorisController.favorisPage );

router.get('/addFavoris/:id', favorisController.addFavoris)
router.get('/removeFavoris/:id', favorisController.removeFavoris)


// on exporte le router 
module.exports = router;