const express = require('express');
const router = express.Router();
const userFacade = require('../facades/userFacade');


/**
 *  GET home page. 
 */
router.get('/', function(req, res, next) {
  userFacade.getAllUsers().then((err, json) => {
    
  }).catch(err => {
    console.log(err)
  })
  res.render('index', { title: 'Mini Project' });
});

module.exports = router;
