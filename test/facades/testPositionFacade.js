const expect = require("chai").expect;
const positionFacade = require("../../facades/positionFacade");
const userFacade = require("../../facades/userFacade");

async function getAllPositions() {
  const positions = await positionFacade.getAll();
  expect(positions.length).to.be.equal(5);
}

async function findRightPositionFromUsername() {
  const users = await userFacade.getAllUsers()
  let position = await positionFacade.getByUser(users[0]._id);
  expect(position.location.coordinates[0]).to.be.equal(12.5828);
  position = await positionFacade.getByUser(users[2]._id);
  expect(position.location.coordinates[0]).to.be.equal(12.5775);
}

async function updatePosition() {
  const user = await userFacade.findByUsername('kw')
  const longitude = -110.8571443
  const latitude = 32.4586858
  const position = await positionFacade.updateOrCreate(user._id, longitude, latitude)

  expect(position.location.coordinates[1]).to.be.equal(latitude);
  expect(position.location.coordinates[0]).to.be.equal(longitude);
}

async function createPosition() {
  const user = await userFacade.findByUsername('ml')
  const longitude = -110.8571443
  const latitude = 32.4586858
  const position = await positionFacade.updateOrCreate(user._id, longitude, latitude)

  expect(position.location.coordinates[1]).to.be.equal(latitude);
  expect(position.location.coordinates[0]).to.be.equal(longitude);
}

async function findPositions() {
  const longitude = 12.5880
  const latitude = 55.6843
  const maxInMeters = 400
  const positions = await positionFacade.findNearby(longitude, latitude, maxInMeters)
  expect(positions.length).to.be.equal(2);
}

async function findUsersInPositions() {
  const longitude = 12.5880
  const latitude = 55.6843
  const maxInMeters = 400
  const popuUsers = await positionFacade.findNearbyUsers(longitude, latitude, maxInMeters)

  expect(popuUsers.length).to.be.equal(2);
  expect(popuUsers[0].user.userName).to.be.equal('hw');
  expect(popuUsers[1].user.userName).to.be.equal('kw');
}

module.exports = {
  getAllPositions,
  findRightPositionFromUsername,
  updatePosition,
  createPosition,
  findPositions,
  findUsersInPositions,
}