const mongoose = require("mongoose");
const expect = require("chai").expect;
const dbSetup = require("../../dbSetup");
const settings = require("../../settings")
const debug = require('debug')('test:testAuthFacade');
/**
 * ISSUE FIX: was moved to here, from *1.
 */
const LocationBlog = require("../../models/LocationBlog");
const authFacade = require("../../facades/authWrapFacade");
const User = require("../../models/User");
const Position = require('../../models/Position');
const positionFacade = require("../../facades/positionFacade");

//https://github.com/Automattic/mongoose/issues/1251
mongoose.models = {};
mongoose.modelSchemas = {};
mongoose.connection = {};

/**
 * *1.
 */

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
      new User({ firstName: "Mikkel", lastName: "Larsen", userName: "ml", password: "test", email: "b@b.dk" }).save(),
      new User({ firstName: "Jørgen", lastName: "Madsen", userName: "jm", password: "test", email: "b@b.dk" }).save(),
    ])

    await Position.deleteMany({}).exec()
    positions = await Promise.all([
      new Position({ user: users[1]._id, location: { type: 'Point', coordinates: [12.5931, 55.6839] } }).save(),
      new Position({ user: users[0]._id, location: { type: 'Point', coordinates: [12.5828, 55.6842] } }).save(),
      new Position({ user: users[3]._id, location: { type: 'Point', coordinates: [12.5775, 55.6857] } }).save()
    ])
    
    await LocationBlog.deleteMany({}).exec()
    blogs = await Promise.all([
      new LocationBlog({ info: 'Crazy place', position: { longitude: 26, latitude: 28 }, author: users[0]._id }).save(),
      new LocationBlog({ info: 'Another crazy place', position: { longitude: 56, latitude: 65 }, author: users[0]._id }).save()
    ])
  })

  it("login: should be a succesfull attempt, with two friends", async function () {
    const longitude = 12.5880
    const latitude = 55.6843
    const maxInMeters = 400
    const friendsInArea = await authFacade.login('ml', 'test', latitude, longitude, maxInMeters);
    expect(friendsInArea.length).to.be.equal(2);
    expect(friendsInArea[0].username).to.be.equal('hw');
    expect(friendsInArea[1].username).to.be.equal('kw');
  });

  it("login: should show one friend (the user self filtered out)", async function () {
    const longitude = 12.5880
    const latitude = 55.6843
    const maxInMeters = 400
    const friendsInArea = await authFacade.login('kw', 'test', latitude, longitude, maxInMeters);
    expect(friendsInArea.length).to.be.equal(1);
    expect(friendsInArea[0].username).to.be.equal('hw');
  });

  it("login: update the user's posistion", async function () {
    const longitude = 12.5880
    const latitude = 55.6843
    const maxInMeters = 400
    await authFacade.login('hw', 'test', latitude, longitude, maxInMeters);
    position = await positionFacade.getByUser(users[1])
    expect(position.location.coordinates[0]).to.be.equal(longitude);
    expect(position.location.coordinates[1]).to.be.equal(latitude);

  });

  it("login: should be a falied attempt", async function () {
    try {
      await authFacade.login('kw', 'tset')
    } catch (err) {
      expect(err.msg).to.be.equal('failed to authenticate from given username and/or password')
    }
  });



})