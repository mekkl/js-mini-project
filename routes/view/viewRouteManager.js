const express = require('express');
const router = express.Router();

const index = require('./index')
const map = require('./map')
const react = require('./react')

router.use('/', index)
router.use('/map', map)
router.use('/react', react)

module.exports = router;


