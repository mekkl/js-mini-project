const express = require('express');
const router = express.Router();
const userFacade = require('../../facades/userFacade');


/**
 *  benyte '/*' da react selv håndterer routing for sin egen path
 */
router.get('/*', function(req, res, next) {
  userFacade.getAllUsers().then((err, json) => {
    
  }).catch(err => {
    console.log(err)
  })
  res.render('react', { title: 'Mini Project' , baseUrl: process.env.BASE_URL});
});

module.exports = router;
