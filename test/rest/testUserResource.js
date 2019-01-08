const expect = require("chai").expect;
const fetch = require('node-fetch');
const URL = `http://localhost:${process.env.MOCHA_TEST_PORT}/node/api`

async function findAllUsers() {
    const users = await fetch(URL + '/users').then(res => res.json())
    expect(users.length).to.be.equal(5)
}

async function findPersonFromUsername() {
    const users = await fetch(URL + '/users/kw').then(res => res.json())
    expect(users.firstName).to.be.equal('Kurt')
}

async function addAUser() {
    const user = {
        "firstName": "Peter",
        "lastName": "Pan",
        "userName": "pp",
        "password": "test",
        "email": "a@b.dk"
    }
    const u = await fetch(URL + '/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(user) }).then(res => res.json())
    expect(u.firstName).to.be.equal('Peter')
}

module.exports = {
    findAllUsers,
    findPersonFromUsername,
    addAUser
}