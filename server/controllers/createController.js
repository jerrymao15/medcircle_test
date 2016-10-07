const axios = require('axios');
const { sequelize, Article } = require('./dbController');
require('dotenv').config();

const medcicleExampleURI = process.env.EXAMPLE_JSON;

const createController = {
  createDB(req, res, next) {
    return sequelize.sync()
    .then(() => axios.get(medcicleExampleURI))
    .then(response => Article.bulkCreate(response.data.map(articles => {
      const { id, title, summary, media_url, published_at, likes_count, author: { name: author_name, icon_url: author_icon_url } } = articles;
      return { id, title, summary, media_url, published_at, likes_count, author_name, author_icon_url };
    })))
    .then(() => console.log('Table created!'))
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
