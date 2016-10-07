const authController = {
  validateToken(req, res, next) {
    if (process.env.SECRET_TOKEN === undefined) require('dotenv').config();

    const validated = `bearer ${process.env.SECRET_TOKEN}` === req.get('Authorization');
    return validated ? next() : res.status(401).end('401 Unauthorized');
  },
};


module.exports = authController;
