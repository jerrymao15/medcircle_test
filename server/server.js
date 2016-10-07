const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const articleRoutes = require('./v1/articleRoutes');
const createController = require('./controllers/createController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../')));

app.use('/v1', articleRoutes);

// used to populate the database on start.
app.get('/initialize', createController.createDB, (req, res) => res.end());

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
