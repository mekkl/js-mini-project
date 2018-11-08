const mongoose = require("mongoose");
const userFacade = require('./userFacade')
const debug = require('debug')('miniproject:authFacade');
const bcrypt = require('bcrypt')

async function login(username, password) {
    try {
        const user = await userFacade.findByUsername(username)
        const verified = (user && await bcrypt.compare(password, user.password))
        if (verified) return user
        else throw { msg: 'failed to authenticate from given username and/or password' }
    } catch (err) {
        throw err
    }
}

module.exports = {
    login
}