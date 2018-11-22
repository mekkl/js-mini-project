const express = require('express');
const router = express.Router();

const index = require('./index')
const map = require('./map')

router.use('/', index)
router.use('/map', map)


module.exports = router;


