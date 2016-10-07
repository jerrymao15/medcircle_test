const { sequelize, Article } = require('./dbController');

const articleController = {
  startDB() {
    return new Promise(resolve => resolve(sequelize.sync()));
  },

  getArticles(req, res) {
    const id = req.params.id ? req.params.id : false;

    return articleController.startDB()
    .then(() => {
      if (id === false) return Article.findAll({ raw: true });
      return Article.findOne({ where: { id }, raw: true });
    })
    .then(articles => {
      if (articles === null) return res.status(400).end();
      const result = Array.isArray(articles) ? articles : [articles];
      return res.set('Content-Type', 'application/json').end(JSON.stringify(result.map(ele => articleController.formatData(ele))));
    })
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

  formatData(article) {
    const { id, title, summary, media_url, published_at, likes_count, author_name: name, author_icon_url: icon_url } = article;
    return { id, title, summary, media_url, published_at, likes_count, author: { name, icon_url } };
  },
};

module.exports = articleController;
