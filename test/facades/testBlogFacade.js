const mongoose = require("mongoose");
const expect = require("chai").expect;
const dbSetup = require("../../dbSetup");
const settings = require("../../settings")

/**
 * ISSUE FIX: was moved to here, from *1.
 */
const locationBlogFacade = require("../../facades/blogFacade");
const LocationBlog = require("../../models/LocationBlog");
const userFacade = require("../../facades/userFacade");
const User = require("../../models/User");

/**
 *  https://github.com/Automattic/mongoose/issues/1251
 */
mongoose.models = {};
mongoose.modelSchemas = {};
mongoose.connection = {};

/**
 * *1.
 */

describe("Testing the LocationBlog Facade", function () {

  /**
   *  Connect to the TEST-DATABASE 
   */
  before(async function () {
    this.timeout(settings.MOCHA_TEST_TIMEOUT);
    await dbSetup(settings.TEST_DB_URI);
  })

  after(function () {
    mongoose.connection.close();
  })


  let users = [];
  /**
   *  Setup the database in a known state (2 locBlogs + 2 users) before EACH test 
   */
  beforeEach(async function () {
    await User.deleteMany({}).exec();
    users = await Promise.all([
      new User({ firstName: "Kurt", lastName: "Wonnegut", userName: "kw", password: "test", email: "a@b.dk" }).save(),
      new User({ firstName: "Hanne", lastName: "Wonnegut", userName: "hw", password: "test", email: "b@b.dk" }).save(),
    ])

    await LocationBlog.deleteMany({}).exec()
    blogs = await Promise.all([
      new LocationBlog({ info: 'Crazy place', position: { longitude: 26, latitude: 28 }, author: users[0]._id }).save(),
      new LocationBlog({ info: 'Another crazy place', position: { longitude: 56, latitude: 65 }, author: users[0]._id }).save()
    ])
  })

  it("getAllBlogs: Should find all location blogs ('Crazy place' and 'Another crazy place')", async function () {
    const blogs = await locationBlogFacade.getAllBlogs();
    expect(blogs.length).to.be.equal(2);
  });

  it("getAllBlogs: Should add the given userId to the liked list", async function () {
    const blogs = await locationBlogFacade.getAllBlogs();
    const users = await userFacade.getAllUsers();
    const blog = await locationBlogFacade.likeLocationBlog(blogs[0]._id, users[1]._id)

    expect(blog.likedBy.length).to.be.equal(1);
  });


})