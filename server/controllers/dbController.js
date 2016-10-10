const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true, /* for SSL config since Heroku gives you this out of the box */
  },
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
