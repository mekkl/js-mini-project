const mongoose = require("mongoose");
const User = require("../models/User");
const Position = require('../models/Position');
const userFacade = require('./userFacade');
const debug = require('debug')('miniproject:positionFacade');
const SECONDS = 1;
const EXPIRES = 60  * SECONDS ;


function getAll() {
    return Position.find({}).exec();
}

function updateOrCreate(user, longitude, latitude) {
    return Position.findOneAndUpdate(
            {user: user._id}, 
            {$set: {user: user._id, created: Date.now(), loc: { type: 'Point', coordinates: [longitude, latitude]}}},
            {upsert: true, new: true}
        ).exec()
}

async function getByUsername(username) {
    const user = await userFacade.findByUsername(username)
    return Position.findOne({user: user._id}).exec()
}


module.exports = {
getAll,
getByUsername,
updateOrCreate
}