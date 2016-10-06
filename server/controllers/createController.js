const Sequelize = require('sequelize');
const axios = require('axios');
const fs = require('fs');

const medcicleExampleURI = 'https://medcircle-coding-project.s3.amazonaws.com/api/articles.json';

const sequelize = new Sequelize('medcircle-project', null, null, {
  host: 'localhost',
  dialect: 'postgres',
});

const Article = sequelize.define('articles', {
  _id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id: Sequelize.INTEGER,
  title: Sequelize.STRING,
  summary: Sequelize.STRING,
  media_url: Sequelize.STRING,
  published_at: Sequelize.DATEONLY,
  likes_count: Sequelize.INTEGER,
  author_name: Sequelize.STRING,
  author_icon_url: Sequelize.STRING,
});

const createController = {
  createDB(req, res, next) {
    axios.get(medcicleExampleURI)
    .then((response) => {
      console.log(response.data);
      const articlesArray = response.data.map((articles) => {
        const { id, title, summary, media_url, published_at, likes_count, author: { name: author_name, icon_url: author_icon_url } } = articles;
        return { id, title, summary, media_url, published_at, likes_count, author_name, author_icon_url };
      });
      req.articlesArray = articlesArray;
      return sequelize.sync();
    })
    .then(() => Article.bulkCreate(req.articlesArray))
    .then(() => next())
    .catch(error => console.error(error));
  },


};

module.exports = createController;
