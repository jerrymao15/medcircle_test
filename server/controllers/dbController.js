const Sequelize = require('sequelize');

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

module.exports = { sequelize, Article };
