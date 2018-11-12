const expect = require("chai").expect;

const User = require("../../models/User")
const userFacade = require('../../facades/userFacade');


function testModule4(){
    describe("Testing the User Facade", function () {
        let users = [];
        /**
         * Setup the database in a known state (2 users) before EACH test
         */
        beforeEach(async function () {
          await User.deleteMany({}).exec();
          users = await Promise.all([
            new User({ firstName: "Kurt", lastName: "Wonnegut", userName: "kw", password: "test", email: "a@b.dk" }).save(),
            new User({ firstName: "Hanne", lastName: "Wonnegut", userName: "hw", password: "test", email: "b@b.dk" }).save(),
          ])
        })
      
        it("getAllUsers: Should find all users (Kurt and Hanne)", async function () {
          const users = await userFacade.getAllUsers();
          expect(users.length).to.be.equal(2);
        });
      
        it("findByUsername: Should Find Kurt Wonnegut by Username", async function () {
          const user = await userFacade.findByUsername("kw");
          expect(user.firstName).to.be.equal("Kurt");
        });
      
        it("findById: Should Find Kurt Wonnegut by ID", async function () {
          const user = await userFacade.findById(users[0]._id);
          expect(user.firstName).to.be.equal("Kurt");
        });
      
        it("addUser: Should add Peter Pan", async function () {
          const user = await userFacade.addUser("Peter", "Pan", "peter", "test", "a@b.dk");
          expect(user).to.not.be.null;
          expect(user.firstName).to.be.equal("Peter");
          const users = await userFacade.getAllUsers();
          expect(users.length).to.be.equal(3);
        });
      
    })
}

module.exports = testModule4;