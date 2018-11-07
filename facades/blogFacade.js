const mongoose = require("mongoose");
const LocationBlog = require("../models/LocationBlog");

function getAllBlogs() {
    return LocationBlog.find({}).exec();
}

function addLocationBlog(info, author, longitude, latitude) {
    const LocationBlogDetail = { info, pos: { longitude, latitude }, author };
    const blog = new Blog(LocationBlogDetail);
    return blog.save();
}

function likeLocationBlog(id, userId) {
    return LocationBlog.findOneAndUpdate({_id: id}, {$push: {likedBy: userId}}, {new: true}).exec();
}

module.exports = {
    addLocationBlog: addLocationBlog,
    likeLocationBlog: likeLocationBlog,
    getAllBlogs: getAllBlogs,
}