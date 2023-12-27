const { log } = require('console');
const path = require('path');
const dataMapper = require('../dataMapper');

const favorisController = {

  // méthode pour afficher les favoris
  favorisPage: (request, response) => {
    response.render('favoris', { favoris: request.session.favoris })
  },

  addFavoris: async (req, res) => {
    const { id: figurineId } = req.params
    // on récupère l'id de la figurine et on va la chercher dans la db pour l'insérer dans la liste de favoris dan sla session
    // ça permettra de ne pas avoir à aller chercher les figurines à chaque fois qu'on veut affiche rla vue (car elles sont déjà dans la session et pas seulement leurs ids)

    // on vérifie si la figurine est déjà présente dans la liste de favoris
    const alreadyExists = req.session.favoris.find((figurine) => figurine.id === Number(figurineId))

    // seulement si elle n'y est pas, on va la chercher dans la db et on l'ajoute dans la session
    if (!alreadyExists) {
      const figurine = await dataMapper.getOneFigurineById(figurineId)
      req.session.favoris.push(figurine)
    }

    res.redirect('/favoris')
  },

  removeFavoris: (req, res) => {
    const { id: figurineId } = req.params

    // je remplace la valeur de mes favoris par une version filtrée du tableau de favoris
    req.session.favoris = req.session.favoris.filter((favoris) => favoris.id !== Number(figurineId))

    res.redirect('/favoris')
  }

};


module.exports = favorisController;
