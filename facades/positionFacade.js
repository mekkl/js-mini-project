const mongoose = require("mongoose");
const Position = require('../models/Position');
import userFacade from './userFacade';
const debug = require('debug')('miniproject:positionFacade');



function getAll() {
    return Position.find({}).exec();
}

async function updateOrCreate(userId, longitude, latitude) {
    const user = await userFacade.findById(userId)
    if(user._id !== undefined) {
        return Position.findOneAndUpdate(
            { user: userId },
            { $set: { user: userId, created: Date.now(), location: { type: 'Point', coordinates: [longitude, latitude] } } },
            { upsert: true, new: true }
        ).exec()
    }else {
        return null
    }
    
}

async function getByUser(userId) {
    return Position.findOne({ user: userId }).exec()
}

async function findNearby(longitude, latitude, maxDistance, minDistance = 0) {
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
/** 
 * 
 */
async function findNearbyUsers(longitude, latitude, maxDistance, minDistance = 0) {
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
    getByUser,
    updateOrCreate,
    findNearby,
    findNearbyUsers,
}