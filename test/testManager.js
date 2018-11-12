const mongoose = require("mongoose");
const expect = require("chai").expect;
const dbSetup = require("../dbSetup");
const settings = require("../settings")
const debug = require('debug')('test:testAuthFacade');
const testModule = require('./facades/testAuthWrapFacade')
const testModule2 = require('./facades/testBlogFacade')
const testModule3 = require('./facades/testPositionFacade')
const testModule4 = require('./facades/testUserFacade')

//https://github.com/Automattic/mongoose/issues/1251
mongoose.models = {};
mongoose.modelSchemas = {};
mongoose.connection = {};

/**
 * *1.
 */

describe("Test Manager starting module tests", function () {
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

  
  testModule()
  testModule2()
  testModule3()
  testModule4()

})