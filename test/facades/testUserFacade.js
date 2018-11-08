const mongoose = require("mongoose");
const expect = require("chai").expect;
const dbSetup = require("../../dbSetup");
const settings = require("../../settings")

/**
 * ISSUE FIX: was moved to here, from *1.
 */
const userFacade = require("../../facades/userFacade");
const User = require("../../models/User");

//https://github.com/Automattic/mongoose/issues/1251
mongoose.models = {};
mongoose.modelSchemas = {};
mongoose.connection = {};

/**
 * *1.
 */

describe("Testing the User Facade", function () {
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
   * Setup the database in a known state (2 users) before EACH test
   */
  beforeEach(async function () {
    await User.deleteMany({}).exec();
    users = await Promise.all([
      new User({ firstName: "Kurt", lastName: "Wonnegut", userName: "kw", password: "test", email: "a@b.dk" }).save(),
      new User({ firstName: "Hanne", lastName: "Wonnegut", userName: "hw", password: "test", email: "b@b.dk" }).save(),
    ])
  })

  it("getAllUsers: Should find all users (Kurt and Hanne)", async function () {
    const users = await userFacade.getAllUsers();
    expect(users.length).to.be.equal(2);
  });

  it("findByUsername: Should Find Kurt Wonnegut by Username", async function () {
    const user = await userFacade.findByUsername("kw");
    expect(user.firstName).to.be.equal("Kurt");
  });

  it("findById: Should Find Kurt Wonnegut by ID", async function () {
    const user = await userFacade.findById(users[0]._id);
    expect(user.firstName).to.be.equal("Kurt");
  });

  it("addUser: Should add Peter Pan", async function () {
    const user = await userFacade.addUser("Peter", "Pan", "peter", "test", "a@b.dk");
    expect(user).to.not.be.null;
    expect(user.firstName).to.be.equal("Peter");
    const users = await userFacade.getAllUsers();
    expect(users.length).to.be.equal(3);
  });

})