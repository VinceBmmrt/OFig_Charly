const path = require('path');
const dataMapper = require('../dataMapper');

const mainController = {

  // méthode pour la page d'accueil
  homePage: async (request, response) => {
    try {
      const figurines = await dataMapper.getAllWithAvgNote()
      const categories = await dataMapper.getNumberByCategory()
      response.render('accueil', { figurines, categories })

    } catch (error) {
      console.log("🚀 ~ file: mainController.js:15 ~ error:", error)
    }
  },

  // méthode pour la page article
  articlePage: async (request, response) => {
    const { id: figurineId } = request.params
    // on doit aller chercher la figurine en question

    try {

      // * sans JOINTURE
      // // on récupère la figurine
      // const figurine = await dataMapper.getOneFigurineById(Number(figurineId))
      // // puis ses reviews
      // const reviews = await dataMapper.getReviewsByFigurineId(Number(figurineId))


      //* avec JOINTURE
      // on récupère tout d'un coup
      const figurineWithReviews = await dataMapper.getFigurineWithReviewsById(figurineId)

      response.render('article', { figurine: figurineWithReviews[0], reviews: figurineWithReviews })
    } catch (error) {
      console.log("🚀 ~ file: mainController.js:26 ~ articlePage: ~ error:", error)
    }
  }

};


module.exports = mainController;
