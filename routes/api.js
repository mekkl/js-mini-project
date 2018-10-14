var express = require('express');
var router = express.Router();
var userFacade = require('../facades/userFacade');
var blogFacade = require('../facades/blogFacade');

router.route('/users')
// get all the users (accessed at GET http://localhost:8080/api/users)
.get(async function(req, res) {
    let users = await userFacade.getAllUsers()
    res.json(users)
})
// post new user (accessed at POST http://localhost:8080/api/users)
.post(async function(req, res) {
    try {
        let firstName = req.body.firstName
        let lastName = req.body.lastName
        let userName = req.body.userName
        let password = req.body.password
        let email = req.body.email
        let user = await userFacade.addUser(firstName, lastName, userName, password, email)
        res.json(user)
    } catch (err) {
        res.status(500)
        res.json({error: 'an error happened'})
    }
});

router.route('/blogs')
// get all the blogs (accessed at GET http://localhost:8080/api/blogs)
.get(async function(req, res) {
    let blogs = await blogFacade.getAllBlogs()
    res.json(blogs)
});

module.exports = router;
