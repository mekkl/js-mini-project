require('dotenv').config()
require('@babel/polyfill')
const mongoose = require("mongoose");
const dbSetup = require("../dbSetup");
const debug = require('debug')('test:testAuthFacade');
const genData = require('../utils/setupTestData')

const http = require("http");
const app = require('../app');
let server;

// Facade test modules
const authFacadeTests = require('./facades/testAuthWrapFacade')
const blogFacadeTests = require('./facades/testBlogFacade')
const positionFacadeTests = require('./facades/testPositionFacade')
const userFacadeTests = require('./facades/testUserFacade')

// REST test modules
const userResourceTests = require('./rest/testUserResource')

//https://github.com/Automattic/mongoose/issues/1251
mongoose.models = {};
mongoose.modelSchemas = {};
mongoose.connection = {};

// describe("Facade tests:", function () {
//   /**
//    * Connect to the TEST-DATABASE 
//    */
//   before(async function () {
//     this.timeout(process.env.MOCHA_TEST_TIMEOUT);
//     await dbSetup(process.env.TEST_DB_URI);
//   })

//   after(function (done) {
//     mongoose.connection.close();
//     done()
//   })

//   beforeEach(genData)

//   describe("authWrapperFacade.js tests:", function () {
//     it("login: should be a succesfull attempt, with two friends", authFacadeTests.succes1)
//     it("login: update the user's posistion", authFacadeTests.succes2)
//     it("login: should be a falied attempt", authFacadeTests.fail1)
//   })

//   describe("blogFacade tests.js", function () {
//     it("getAllBlogs: Should find all location blogs ('Crazy place' and 'Another crazy place')", blogFacadeTests.findAllLocations)
//     it("likeLocationBlog: Should add the given userId to the liked list", blogFacadeTests.appendUserIdToLiked)
//   })

//   describe("userFacade.js tests", function () {
//     it("getAllUsers: Should find all users (5)", userFacadeTests.findAllUsers)
//     it("findByUsername: Should Find Kurt Wonnegut by Username", userFacadeTests.findPersonFromUsername)
//     it("findById: Should Find Kurt Wonnegut by ID", userFacadeTests.findPersonFromId)
//     it("addUser: Should add Peter Pan", userFacadeTests.addAUser)
//   })

//   describe("positionFacade.js tests", function () {
//     it("getAll: Should find all positions", positionFacadeTests.getAllPositions)
//     it("getByUsername: Should find the right positions from given usernames", positionFacadeTests.findRightPositionFromUsername)
//     it("updateOrCreate: Should update the position with new coordinates given user and coordinates", positionFacadeTests.updatePosition)
//     it("updateOrCreate: Should create the position with new coordinates given user and coordinates", positionFacadeTests.createPosition)
//     it("findNeaby: Should should find two positions given the location and maxDistance", positionFacadeTests.findPositions)
//     it("findNeabyUsers: Should should find two positions given the location and maxDistance", positionFacadeTests.findUsersInPositions)
//   })
// })

describe("REST api tests:", function () {
  /**
   * Create server
   */
  before(function (done) {
    this.timeout(process.env.MOCHA_TEST_TIMEOUT);
    server = http.createServer(app);
    server.listen(process.env.MOCHA_TEST_PORT, function () {
      done();
    });
  })

  after(function (done) {
    server.close();
    done();
  })

  beforeEach(genData)

  describe("user endpoint tests:", function () {
    it("/api/users: Should find all users (5)", userResourceTests.findAllUsers)
    it("/api/users/:username: Should add Peter Pan", userResourceTests.addAUser)
    it("/api/users/:username Should Find Kurt Wonnegut by Username", userResourceTests.findPersonFromUsername)
  })

})