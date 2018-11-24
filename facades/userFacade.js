const mongoose = require("mongoose");
const User = require("../models/User");
const debug = require('debug')('miniproject:userFacade');


function getAllUsers() {
  return User.find({}).exec();
}

async function addUser(firstName, lastName, userName, password, email) {
  const userDetails = { firstName, lastName, userName, password, email };
  const user = new User(userDetails);

  return user.save();
}

function findByUsername(username) {
  // debug(username)
  return User.findOne({ userName: username }).exec()
}

function findById(id) {
  return User.findById({ _id: id }).exec();
}

module.exports = {
  getAllUsers: getAllUsers,
  addUser: addUser,
  findByUsername: findByUsername,
  findById: findById,
}