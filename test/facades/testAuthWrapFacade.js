const expect = require("chai").expect;
const authFacade = require("../../facades/authWrapFacade");

async function succes1() {
    const longitude = 12.5880
    const latitude = 55.6843
    const maxInMeters = 400
    const friendsInArea = await authFacade.login('ml', 'test', latitude, longitude, maxInMeters);
    expect(friendsInArea.length).to.be.equal(2);
    expect(friendsInArea[0].username).to.be.equal('hw');
    expect(friendsInArea[1].username).to.be.equal('kw');
}

async function succes2() {
    const longitude = 12.5880
    const latitude = 55.6843
    const maxInMeters = 400
    const friendsInArea = await authFacade.login('kw', 'test', latitude, longitude, maxInMeters);
    expect(friendsInArea.length).to.be.equal(1);
    expect(friendsInArea[0].username).to.be.equal('hw');
}

async function fail1() {
    try {
        await authFacade.login('kw', 'tset')
    } catch (err) {
        expect(err.msg).to.be.equal('failed to authenticate from given username and/or password')
    }
}

module.exports = {
    succes1,
    succes2,
    fail1,
}