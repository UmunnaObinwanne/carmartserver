// middlewares/bodyParser.js

import express from 'express';

const bodyParserMiddleware = (req, res, next) => {
  // Exclude AdminJS routes
  if (req.path.startsWith('/admin')) {
    return next();
  }
  
  // Apply body parsers to non-AdminJS routes
  express.urlencoded({ extended: false })(req, res, () => {
    express.json()(req, res, next);
  });
};

export default bodyParserMiddleware;
