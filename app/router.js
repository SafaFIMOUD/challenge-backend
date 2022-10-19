const express = require('express');
const router = new express.Router()
const Restaurant = require('./models/restaurant');

/**
 * Déclaration des routes de l'app
 */

router.get("/", getHome);
router.get("/explore", getExplore);
router.get("/restos", getRestos);

/**
 * Déclaration des controlleurs de l'app
 */

/**
 * GET /
 * Page d'accueil
 */
function getHome(req, res) {
  res.render('index');
}

/**
 * GET /
 * Restos
 */
async function getRestos(req, res) {
  const limit = req.query.limit ? req.query.limit : 10
  //on cherche la valeur envoyé depuis le formulaire
  const restaurant = req.query.name;
  //le regex permet de chercher tout les valeurs majuscule et miniscule
  const regex = new RegExp(restaurant, 'i')
  //on cherche dans mongodb
  const restaurants = await Restaurant.find({name: {$regex: regex}}).limit(limit);
  res.render('restos', {restaurants})
}

/**
 * GET /
 * Explore
 */
async function getExplore(req, res) {
    //on cherche le quartier et la cuisine envoyé depuis le formulaire
    const quartier = req.query.borough;
    //on cherche tout les quartiers renseingé dans le mongodb
    const quartiers = await Restaurant.collection.distinct('borough');
    const cuisine = req.query.cuisine;
        //on cherche tout les cuisines renseingé dans le mongodb
    const cuisines = await Restaurant.collection.distinct('cuisine');

    //on cherche dans mongodb avec les params
    const restaurants = await Restaurant.find({cuisine: cuisine, borough: quartier});
    res.render('explore', {restaurants, quartiers, cuisines, selectedQuartier: quartier, selectedCuisine: cuisine})
}

// Exporte le routeur pour le fichier principal
module.exports = router;