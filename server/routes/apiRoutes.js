const express = require('express');
const v1Articles = require('../v1/articles');

const apiRoutes = express();

apiRoutes.use('/v1', v1Articles);


module.exports = apiRoutes;
