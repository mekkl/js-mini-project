const mongoose = require("mongoose");
const Position = require('../models/Position');
const userFacade = require('./userFacade');
const debug = require('debug')('miniproject:positionFacade');


function getAll() {
    return Position.find({}).exec();
}

/**
 * 
 * @param {Object id} userId 
 * @param {float} longitude 
 * @param {float} latitude 
 * 
 * @returns {Promise} updated/created Position
 */
function updateOrCreate(userId, longitude, latitude) {
    return Position.findOneAndUpdate(
            {user: userId}, 
            {$set: {user: userId, created: Date.now(), location: { type: 'Point', coordinates: [longitude, latitude]}}},
            {upsert: true, new: true}
        ).exec()
}

async function getByUsername(username) {
    const user = await userFacade.findByUsername(username)
    return Position.findOne({user: user._id}).exec()
}

async function findNearby(longitude, latitude, maxDistance, minDistance=0) {
    return Position.find({
        location: {
            $near: {
                $geometry: { type: 'Point', coordinates: [longitude, latitude] },
                $minDistance: minDistance,
                $maxDistance: maxDistance
            }
        }
    }).exec()
}
/** */
async function findNearbyUsers(longitude, latitude, maxDistance, minDistance=0) {
    return Position.find({
        location: {
            $near: {
                $geometry: { type: 'Point', coordinates: [longitude, latitude] },
                $minDistance: minDistance,
                $maxDistance: maxDistance
            }
        }
    }).populate('user').exec()
}


module.exports = {
getAll,
getByUsername,
updateOrCreate,
findNearby,
findNearbyUsers,
}