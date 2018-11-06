var express = require('express');
var router = express.Router();

const usersResource = require('./usersResource')
const blogsResource = require('./blogsResource')
const authResource = require('./authResource')

router.use('/auth', authResource)
router.use('/users', usersResource)
router.use('/blogs', blogsResource)


module.exports = router;

