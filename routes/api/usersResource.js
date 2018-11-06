var express = require('express');
var router = express.Router();
var userFacade = require('../../facades/userFacade');
var debug = require('debug')('miniproject:usersResource');


router.route('/')
// GET: get all the users (accessed at GET http://localhost:PORT/api/users)
.get(async function(req, res) {
    let users = await userFacade.getAllUsers()
    res.json(users)
})
// POST: add new user (accessed at POST http://localhost:PORT/api/users)
.post(async function(req, res) {
    try {
        debug(req.body)
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



module.exports = router;
