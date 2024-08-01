// middleware/isAuthenticated.js
module.exports = (req, res, next) => {
 if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(403).json({ error: 'You must be logged in to view this' });
};