const User = require("../models/User.js");
const LocationBlog = require("../models/LocationBlog.js");
const Position = require("../models/Position.js");
const debug = require('debug')('miniproject:makeTestData')

function userBuilder(firstName, lastName, userName, password, email, type, company, companyUrl) {
    debug('building user')
    const job = [{ type, company, companyUrl }, { type, company, companyUrl }];
    const userDetail = { firstName, lastName, userName, email, password, job };
    const user = new User(userDetail);
    return user.save();
}

function positionBuilder(lon, lat, userId, dateInFuture) {
    debug('building position')
    const posDetail = { user: userId, location: { type: 'Point', coordinates: [lon, lat] } }
    if (dateInFuture) {
        posDetail.created = "2022-09-25T20:40:21.899Z"
    }
    const pos = new Position(posDetail);
    return pos;
}
//Utility Function to create LocationBlogs
function locationBlogBuilder(info, author, longitude, latitude) {
    debug('building locationblog')
    const LocationBlogDetail = { info, position: { longitude, latitude }, author };
    const blog = new LocationBlog(LocationBlogDetail);
    return blog;
}

// Here we will setup users
async function createData() {
    debug('deleting current db data')
    await User.deleteMany({});
    await Position.deleteMany({});
    await LocationBlog.deleteMany({});

    debug('creating users')
    const users = []
    users.push(await userBuilder("Kurt", "Wonnegut", "kw", "test", "amoc@mail.dk", "A type", "comp a", "comp.a.url"))
    users.push(await userBuilder("Hanne", "Wonnegut", "hw", "test", "somecom@mail.dk", "B type", "comp b", "comp.b.url"))
    users.push(await userBuilder("Janne", "Wonnegut", "jw", "test", "wonn@mail.dk", "C type", "comp c", "comp.c.url"))
    users.push(await userBuilder("Iris", "Wonnegut", "iw", "test", "Iris@mail.dk", "D type", "comp d", "comp.d.url"))
    users.push(await userBuilder("Mikkel", "Larsen", "ml", "test", "mello@mail.dk", "E type", "comp e", "comp.e.url"))

    debug('creating positions')
    const positions = await Position.insertMany([
        positionBuilder(12.5828, 55.6842, users[0]._id),
        positionBuilder(12.5931, 55.6839, users[1]._id, true),
        positionBuilder(12.5775, 55.6857, users[2]._id, true),
        positionBuilder(12.5134, 55.6721, users[3]._id, true),
        positionBuilder(12.5366, 55.6749, users[4]._id, true)
    ], {ordered: true})

    debug('creating location blogs')
    const blogs = await LocationBlog.insertMany([
        locationBlogBuilder('Crazy place', users[0]._id, 26, 28),
        locationBlogBuilder('Another crazy place', users[1]._id, 56, 65),
        locationBlogBuilder("Yet Another Cool Place", users[0]._id, 28, 56),
        locationBlogBuilder("The coolest Place", users[3]._id, 34, 56),
    ], {ordered: true})

    //Add a few likes for "a Cool Place"
    blogs[0].likedBy.push(users[1]); //Like by Hanne
    blogs[0].likedBy.push(users[2]); //Like by Janne
}

module.exports = createData;