const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const articleRoutes = require('./v1/articleRoutes');
const { createDB } = require('./controllers/createController');
const { validateToken } = require('./controllers/authController');

const app = express();
const PORT = 3000;

// middleware used for all routes
app.use(bodyParser.json());
// app.use(validateToken);
app.use(express.static(path.join(__dirname, './../')));

/**
 * Express router is being used to handle potentially different versions of the API.
 * This makes it so if there are multiple versions this file is kept relatively sparse.
 */
app.use('/v1', articleRoutes);

// used to populate the database on start.
app.get('/initialize', createDB, (req, res) => res.end());

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));

module.exports = app;
