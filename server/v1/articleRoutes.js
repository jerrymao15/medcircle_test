const express = require('express');
const { getArticles, editArticle, deleteArticle } = require('../controllers/articleController');
const apiDescription = require('./description');

const articleRoutes = express.Router();

// used to give information on our API
articleRoutes.get('/', (req, res) => res.set('Content-Type', 'application/json').send(JSON.stringify(apiDescription)));

articleRoutes.route('/articles/')
.get(getArticles);

articleRoutes.route('/articles/:id')
.get(getArticles)
.put(editArticle)
.delete(deleteArticle);


module.exports = articleRoutes;
