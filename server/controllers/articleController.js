const { sequelize, Article } = require('./dbController');

const articleController = {
  startDB() {
    return new Promise(resolve => resolve(sequelize.sync()));
  },

  getArticles(req, res) {
    const id = req.params.id ? req.params.id : false;

    return articleController.startDB()
    .catch(err => res.status(400).end(err));
  },

  editArticle(req, res) {
    const id = req.params.id;
    return articleController.startDB()
    .catch(err => res.status(400).end(err));
  },

  deleteArticle(req, res) {
    const id = req.params.id;
    return articleController.startDB()
    .catch(err => res.status(400).end(err));
  },
};

module.exports = articleController;
