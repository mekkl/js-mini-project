const express = require('express');
const router = express.Router();
const debug = require('debug')('miniproject:authResource');
const af = require('../../facades/authWrapFacade');

router.route('/login')
    // POST: login with params = username, password, latitude, longitude (accessed at POST http://localhost:PORT/api/auth/login)
    .post(async function (req, res) {
        try {
            const username = req.body.username
            const password = req.body.password
            const latitude = req.body.latitude
            const longitude = req.body.longitude
            const radius = req.body.radius
            const friends = await af.login(username, password, latitude, longitude, radius)
            if (friends) {
                res.json(friends)
            } else {
                res.status(403)
                res.json({ msg: "wrong username or password", status: 403 })
            }
        } catch (err) {
            res.status(500)
            res.json({ error: 'an error happened' })
        }
    });


module.exports = router;
