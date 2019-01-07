const express = require('express');
const router = express.Router();

/**
 *  GET home page. 
 */
router.route('/')
    // post login params (accessed at POST http://localhost:PORT/api/auth/login)
    .get(async function (req, res, next) {
      const baseUrl = (process.env.BASE_URL.length > 1) ? process.env.BASE_URL + '/' : process.env.BASE_URL;
      res.render('map', { title: 'Google maps demo', baseUrl: baseUrl });
    });

module.exports = router;
