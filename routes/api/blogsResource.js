const express = require('express');
const router = express.Router();
const blogFacade = require('../../facades/blogFacade');
const userFacade = require('../../facades/userFacade');
const debug = require('debug')('miniproject:blogsResource');

router.route('/')
    // get all the blogs (accessed at GET http://localhost:8080/api/blogs)
    .get(async function (req, res) {
        try {
            let blogs = await blogFacade.getAllBlogs()
            res.json(blogs)
        } catch(err) {
            debug(err)
            res.status(500)
            res.json({ msg: 'an error happened', status: 500 })
        }
    })
    .post(async function(req, res) {
        /**
         * latitude: 90 +/-
         * longitude: 180 +/-
         */
        try {
            const username = req.body.username;
            const info = req.body.info;
            const longitude = req.body.longitude;
            const latitude = req.body.latitude;
            if(longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) res.json({msg: 'invalid range of longitude or/and latitude'})

            const user = await userFacade.findByUsername(username)
            if (user) {
                const blog = await blogFacade.addLocationBlog(info, user._id, longitude, latitude);
                res.json(blog)
            } else {
                res.json({msg: `no user with username: ${username}`})
            }
        } catch(err) {
            debug(err)
            res.status(500)
            res.json({ msg: 'an error happened', status: 500 })
        }
    });

module.exports = router;
