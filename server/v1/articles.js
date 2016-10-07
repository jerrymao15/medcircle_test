const express = require('express');
const { getArticles, editArticle, deleteArticle } = require('../controllers/articleController');
const apiDescription = require('./description');

const articles = express.Router();

// used to give information on our API
articles.get('/', (req, res) => res.set('Content-Type', 'application/json').send(JSON.stringify(apiDescription)));

articles.route('/articles/')
.get(getArticles);

articles.route('/articles/:id')
.get(getArticles)
.put(editArticle)
.delete(deleteArticle);


module.exports = articles;
