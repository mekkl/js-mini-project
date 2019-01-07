const express = require('express');
const router = express.Router();
const userFacade = require('../../facades/userFacade');


/**
 *  benyte '/*' da react selv håndterer routing for sin egen path
 */
router.get('/*', function(req, res, next) {
  const baseUrl = (process.env.BASE_URL.length > 1) ? process.env.BASE_URL + '/' : process.env.BASE_URL;
  res.render('react', { title: 'Mini Project', baseUrl: baseUrl});
});

module.exports = router;
