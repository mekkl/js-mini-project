var mongoose = require("mongoose");
var LocationBlog = require("../models/LocationBlog");

function getAllBlogs() {
    return LocationBlog.find({}).exec();
}

function addLocationBlog(info, author, longitude, latitude) {
    var LocationBlogDetail = { info, pos: { longitude, latitude }, author };
    var blog = new Blog(LocationBlogDetail);
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