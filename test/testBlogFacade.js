const mongoose = require("mongoose");
const expect = require("chai").expect;
const dbSetup = require("..//dbSetup");

//https://github.com/Automattic/mongoose/issues/1251
mongoose.models = {};
mongoose.modelSchemas = {};
mongoose.connection = {};

var locationBlogFacade = require("../facades/blogFacade");
var LocationBlog = require("../models/LocationBlog");
var userFacade = require("../facades/userFacade");
var User = require("../models/user");

let connection = null;
describe("Testing the LocationBlog Facade", function () {

  /* Connect to the TEST-DATABASE */
  before(async function () {
    this.timeout(require("../settings").MOCHA_TEST_TIMEOUT);
    await dbSetup(require("../settings").TEST_DB_URI);
  })

  after(function () {
    mongoose.connection.close();
  })
  
  var users = [];
  var blogs = [];
  /* Setup the database in a known state (2 locBlogs + 2 users) before EACH test */
  beforeEach(async function () {
    await User.deleteMany({}).exec();
    users = await Promise.all([
      new User({ firstName: "Kurt", lastName: "Wonnegut", userName: "kw", password: "test", email: "a@b.dk" }).save(),
      new User({ firstName: "Hanne", lastName: "Wonnegut", userName: "hw", password: "test", email: "b@b.dk" }).save(),
    ])

    await LocationBlog.deleteMany({}).exec()
    blogs = await Promise.all([
        new LocationBlog({ info: 'Crazy place', pos: { longitude: 26, latitude: 28 }, author: users[0]._id }).save(),
        new LocationBlog({ info: 'Another crazy place', pos: { longitude: 56, latitude: 65 }, author: users[0]._id }).save()
    ])
  })

  it("Should find all location blogs ('Crazy place' and 'Another crazy place')", async function () {
    var blogs = await locationBlogFacade.getAllBlogs();
    expect(blogs.length).to.be.equal(2);
  });

  it("Should add the given userId to the liked list", async function () {
    var blogs = await locationBlogFacade.getAllBlogs();
    var users = await userFacade.getAllUsers();
    
    var blog = await locationBlogFacade.likeLocationBlog(blogs[0]._id, users[1]._id)
    
    expect(blog.likedBy.length).to.be.equal(1);
  });


})