const express = require('express');
const router = express.Router();
const userFacade = require('../../facades/userFacade');


/**
 *  GET home page. 
 */
router.get('/', function(req, res, next) {
  const baseUrl = (process.env.BASE_URL.length > 1) ? process.env.BASE_URL + '/' : process.env.BASE_URL;

  userFacade.getAllUsers().then((err, json) => {
  }).catch(err => {
    console.log(err)
  })
  res.render('index', { title: 'Mini Project', baseUrl: baseUrl });
});

module.exports = router;
