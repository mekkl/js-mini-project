const mongoose = require("mongoose");
const LocationBlog = require("../models/LocationBlog");
const Blog = require('../models/LocationBlog')

function getAllBlogs() {
    return LocationBlog.find({}).exec();
}

function addLocationBlog(info, author, longitude, latitude) {
    if(longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) throw {msg: 'invalid range of longitude or/and latitude'}
    const LocationBlogDetail = { info, position: { longitude, latitude }, author };
    const blog = new Blog(LocationBlogDetail);
    return blog.save();
}

function likeLocationBlog(id, userId) {
    return LocationBlog.findOneAndUpdate({ _id: id }, { $push: { likedBy: userId } }, { new: true }).exec();
}

module.exports = {
    addLocationBlog: addLocationBlog,
    likeLocationBlog: likeLocationBlog,
    getAllBlogs: getAllBlogs,
}