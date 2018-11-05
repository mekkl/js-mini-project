var express = require('express');
var router = express.Router();
var userFacade = require('../../facades/userFacade');
var blogFacade = require('../../facades/blogFacade');

router.route('/login')
// post login params (accessed at POST http://localhost:8080/api/auth/login)
.post(async function(req, res) {
    try {
        let userName = req.params.userName
        let password = req.params.password
        const latitude = req.params.latitude
        const longitude = req.params.longitude
        let user = await userFacade.findByUsername(userName)
        res.json(user)
    } catch (err) {
        res.status(500)
        res.json({error: 'an error happened'})
    }
});

module.exports = router;
