const express = require('express');
const router = express.Router();
const userFacade = require('../../facades/userFacade');
const debug = require('debug')('miniproject:usersResource');


router.route('/')
    // GET: get all the users (accessed at GET http://localhost:PORT/api/users)
    .get(async function (req, res) {
        const users = await userFacade.getAllUsers()
        res.json(users)
    })
    // POST: add new user (accessed at POST http://localhost:PORT/api/users)
    .post(async function (req, res) {
        try {
            debug(req.body)
            const firstName = req.body.firstName
            const lastName = req.body.lastName
            const userName = req.body.userName
            const password = req.body.password
            const email = req.body.email
            const user = await userFacade.addUser(firstName, lastName, userName, password, email)
            res.json(user)
        } catch (err) {
            res.status(500)
            res.json({ msg: 'an error happened', status: 500 })
        }
    });

router.route('/:username')
    // GET: get all the users (accessed at GET http://localhost:PORT/api/users)
    .get(async function (req, res) {
        try {
            const username = req.params.username;
            const users = await userFacade.findByUsername(username)
            res.json(users)
        } catch (err) {
            debug(err)
            res.status(500)
            res.json({ msg: 'an error happened', status: 500 })
        }
    });



module.exports = router;
