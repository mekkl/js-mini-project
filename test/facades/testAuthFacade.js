const mongoose = require("mongoose");
const expect = require("chai").expect;
const dbSetup = require("../../dbSetup");
const settings = require("../../settings")

/**
 * ISSUE FIX: was moved to here, from *1.
 */
const LocationBlog = require("../../models/LocationBlog");
const authFacade = require("../../facades/authFacade");
const User = require("../../models/User");

/**
 * *1.
 */

//https://github.com/Automattic/mongoose/issues/1251
mongoose.models = {};
mongoose.modelSchemas = {};
mongoose.connection = {};



describe("Testing the authFacade", function () {

  /**
   * Connect to the TEST-DATABASE 
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

  it("login (2 args): should be a succesfull attempt", async function () {
    const user = await authFacade.login('kw', 'test');
    expect(user.lastName).to.be.equal('Wonnegut');
  });

  it("login (2 args): should be a falied attempt", async function () {
    try {
      await authFacade.login('kw', 'tset')
    } catch (err) {
      expect(err.msg).to.be.equal('failed to authenticate from given username and/or password')
    }
  });



})