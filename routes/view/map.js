const express = require('express');
const router = express.Router();

/**
 *  GET home page. 
 */
router.route('/')
    // post login params (accessed at POST http://localhost:PORT/api/auth/login)
    .get(async function (req, res, next) {
      res.render('map', { title: 'Google maps demo' });
    });

module.exports = router;
