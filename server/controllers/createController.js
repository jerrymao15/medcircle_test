const axios = require('axios');
const { sequelize, Article } = require('./dbController');

const medcicleExampleURI = 'https://medcircle-coding-project.s3.amazonaws.com/api/articles.json';

const createController = {
  createDB(req, res, next) {
    axios.get(medcicleExampleURI)
    .then((response) => {
      const articlesArray = response.data.map(articles => {
        const { id, title, summary, media_url, published_at, likes_count, author: { name: author_name, icon_url: author_icon_url } } = articles;
        return { id, title, summary, media_url, published_at, likes_count, author_name, author_icon_url };
      });
      req.articlesArray = articlesArray;
      return sequelize.sync();
    })
    .then(() => Article.bulkCreate(req.articlesArray))
    .then(() => console.log('Database created!'))
    .then(() => next())
    .catch(error => console.error(error));
  },
  
  dropDB(req, res, next) {
    return sequelize.sync()
    .then(Article.drop())
    .then(() => next())
    .catch(error => console.error(error));
  },

};

module.exports = createController;
