const { sequelize, Article } = require('./dbController');

const articleController = {

  getArticles(req, res) {
    const id = req.params.id ? req.params.id : false;

    return sequelize.sync()
    .then(() => {
      if (id === false) return Article.findAll({ raw: true });
      return Article.findOne({ where: { id }, raw: true });
    })
    .then(articles => {
      if (articles === null) return res.status(400).end('No articles found.');
      const result = Array.isArray(articles) ? articles : [articles];

      return res.type('application/json')
        .end(JSON.stringify(result.map(ele => articleController.formatData(ele))));
    })
    .catch(err => res.status(400).end(err));
  },

  editArticle(req, res) {
    const id = req.params.id;
    const articleFields = ['title', 'summary', 'media_url', 'published_at', 'likes_count'];
    const updatedFields = {};

    articleFields.forEach(field => {
      if (req.body.hasOwnProperty(field)) updatedFields[field] = req.body[field];
    });

    if (Object.keys(updatedFields).length === 0) return res.status(400).end('No edits specified.');

    return sequelize.sync()
    .then(() => Article.update(updatedFields, { where: { id }, returning: true }))
    .then(rows => rows[1].length === 0 ? res.status(400).end() : res.type('application/json')
      .end(JSON.stringify([articleController.formatData(rows[1][0])])))
    .catch(err => res.status(400).end(err));
  },

  deleteArticle(req, res) {
    const id = req.params.id;
    return sequelize.sync()
    .catch(err => res.status(400).end(err));
  },

  formatData(article) {
    const { id, title, summary, media_url, published_at, likes_count, author_name: name, author_icon_url: icon_url } = article;
    return { id, title, summary, media_url, published_at, likes_count, author: { name, icon_url } };
  },
};

module.exports = articleController;
