const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');
const { createDB } = require('./controllers/createController');
const { validateToken } = require('./controllers/authController');

const app = express();
const PORT = 3000;

// middleware used for all routes
app.use(bodyParser.json());
app.use(validateToken);

/**
 * Express router is being used to handle potentially different versions of the API.
 * This makes it so if there are multiple versions this file is kept relatively sparse.
 */
app.use('/api', apiRoutes);

// used to populate the database on start.
app.get('/initialize', createDB, (req, res) => res.end());

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));

module.exports = app;
