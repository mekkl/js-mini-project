const express = require('express');
const router = express.Router();
const debug = require('debug')('miniproject:authResource');
const userFacade = require('../../facades/userFacade');

router.route('/login')
// post login params (accessed at POST http://localhost:PORT/api/auth/login)
.get(async function(req, res) {
    try {
        res.json({msg: 'login endpoint. method = POST. params = userName, password, latitude, longitude'})
    } catch (err) {
        res.status(500)
        res.json({error: 'an error happened'})
    }
})
// POST: login with params = username, password, latitude, longitude (accessed at POST http://localhost:PORT/api/auth/login)
.post(async function(req, res) {
    try {
        const userName = req.body.userName
        const password = req.body.password
        const latitude = req.body.latitude
        const longitude = req.body.longitude
        const distance = req.body.distance
        const user = await userFacade.findByUsername(userName)
        if (user) {
            res.json(user)
        } else {
            res.status(403)
            res.json({msg: "wrong username or password", status: 403})
        }
    } catch (err) {
        res.status(500)
        res.json({error: 'an error happened'})
    }
});


module.exports = router;
