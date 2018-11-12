const expect = require("chai").expect;
const locationBlogFacade = require("../../facades/blogFacade");
const userFacade = require("../../facades/userFacade");

async function findAllLocations() {
  const blogs = await locationBlogFacade.getAllBlogs();
  expect(blogs.length).to.be.equal(4);
}

async function appendUserIdToLiked() {
  const blogs = await locationBlogFacade.getAllBlogs();
    const users = await userFacade.getAllUsers();
    const blog = await locationBlogFacade.likeLocationBlog(blogs[0]._id, users[1]._id)

    expect(blog.likedBy.length).to.be.equal(1);
}

module.exports = {
  findAllLocations,
  appendUserIdToLiked,
}