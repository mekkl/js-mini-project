var express = require('express');
var router = express.Router();
var userFacade = require('../facades/userFacade');
var blogFacade = require('../facades/blogFacade');


/* GET home page. */
router.get('/', function(req, res, next) {
  userFacade.getAllUsers().then((err, json) => {
    
    console.log('yo')
  }).catch(err => {
    console.log(err)
  })
  console.log('to')
  res.render('index', { title: 'Mini Project' });
});

module.exports = router;
