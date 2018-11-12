const expect = require("chai").expect;
const userFacade = require('../../facades/userFacade');

async function findAllUsers() {
  const users = await userFacade.getAllUsers();
  expect(users.length).to.be.equal(5);
}

async function findPersonFromUsername() {
  const user = await userFacade.findByUsername("kw");
  expect(user.firstName).to.be.equal("Kurt");
}

async function findPersonFromId() {
  const users = await userFacade.getAllUsers()
  const user = await userFacade.findById(users[0]._id);
  expect(user.firstName).to.be.equal("Kurt");
}

async function addAUser() {
  await userFacade.addUser("Peter", "Pan", "pp", "test", "a@b.dk");
  const user = await userFacade.findByUsername('pp')
  expect(user).to.not.be.null;
  expect(user.firstName).to.be.equal("Peter");
  const users = await userFacade.getAllUsers();
  expect(users.length).to.be.equal(6);
}

module.exports = {
  findAllUsers,
  findPersonFromUsername,
  findPersonFromId,
  addAUser,
}