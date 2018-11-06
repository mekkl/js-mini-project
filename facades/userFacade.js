var mongoose = require("mongoose");
var User = require("../models/User");
var debug = require('debug')('miniproject:userFacade');

function getAllUsers() {
  return User.find({}).exec();
}

function addUser(firstName, lastName, userName, password, email) {
  var userDetails = { firstName, lastName, userName, password, email};
  var user = new User(userDetails);
  return user.save();
}

function findByUsername(username) {
  debug(username)
  return User.findOne({userName: username}).exec()
}

function findById(id) {
  return User.findById({ _id:id }).exec();
}

module.exports = {
  getAllUsers: getAllUsers,
  addUser: addUser,
  findByUsername: findByUsername,
  findById: findById,
}