var mongoose = require("mongoose");
var User = require("../models/User");
var Position = require("../models/Position")
var debug = require('debug')('miniproject:authFacade');

function login() {
    return User.find({}).exec();
}

module.exports = {
    login
}