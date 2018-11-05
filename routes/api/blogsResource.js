var express = require('express');
var router = express.Router();
var userFacade = require('../../facades/userFacade');
var blogFacade = require('../../facades/blogFacade');


router.route('/')
// get all the blogs (accessed at GET http://localhost:8080/api/blogs)
.get(async function(req, res) {
    let blogs = await blogFacade.getAllBlogs()
    res.json(blogs)
});

module.exports = router;
