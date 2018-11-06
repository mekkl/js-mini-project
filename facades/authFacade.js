var mongoose = require("mongoose");
var User = require("../models/User");
var Position = require("../models/Position")
var debug = require('debug')('miniproject:authFacade');

function login(username, password, longitude, latitude, distance) {
    try {
        debug(username, password, longitude, latitude, distance)

        
        return User.findOne({userName: username}).exec()
    } catch(err) {

    }
}

module.exports = {
    login
}