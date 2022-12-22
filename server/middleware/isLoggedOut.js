const Session = require('../models/Session.model');

module.exports = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization !== 'null') {
    return Session.findById(req.headers.authorization).then((session) => {
      if (session) {
        return res.status(401).json({
          errorMessage: 'You should not be logged in to make this request',
        });
      }
      return next();
    });
  }
  next();
};
