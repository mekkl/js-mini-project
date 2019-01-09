const express = require('express');
const router = express.Router();
const userFacade = require('../../facades/userFacade');


/**
 *  GET home page. 
 */
router.route('/')
  .get(function(req, res) {
    const baseUrl = (process.env.BASE_URL.length > 1) ? process.env.BASE_URL + '/' : process.env.BASE_URL;

    res.render('index', { title: 'Mini Project', baseUrl: baseUrl, status: '' });
  })
  .post(async function(req, res) {
    const baseUrl = (process.env.BASE_URL.length > 1) ? process.env.BASE_URL + '/' : process.env.BASE_URL;
    let status = ''
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const userName = req.body.userName
    const password = req.body.password
    const email = req.body.email
    console.log(firstName, lastName, userName, password, email)
    try {
      const user = await userFacade.addUser(firstName, lastName, userName, password, email)
      status = `user ${user.userName} created`
    } catch(err) {
      status = 'user could not be created'
      console.log(err)
    }

    res.render('index', { title: 'Mini Project', baseUrl: baseUrl, status: status });
  });

module.exports = router;
