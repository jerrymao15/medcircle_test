const express = require('express');
const bodyParser = require('body-parser');
const { getArticles, editArticle, deleteArticle } = require('../controllers/articleController');

const articleRoutes = express.Router();

articleRoutes.use(bodyParser.json());

articleRoutes.route('/articles/')
.get(getArticles);

articleRoutes.route('/articles/:id')
.get(getArticles)
.put(editArticle)
.delete(deleteArticle);


module.exports = articleRoutes;
