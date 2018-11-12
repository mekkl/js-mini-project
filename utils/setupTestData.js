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
    return pos.save();
}
//Utility Function to create LocationBlogs
function locationBlogBuilder(info, author, longitude, latitude) {
    debug('building locationblog')
    const LocationBlogDetail = { info, position: { longitude, latitude }, author };
    const blog = new LocationBlog(LocationBlogDetail);
    return blog.save();
}

// Here we will setup users
async function createData() {
    debug('deleting current db data')
    await User.deleteMany({});
    await Position.deleteMany({});
    await LocationBlog.deleteMany({});

    debug('creating users')
    const userPromises = [
        userBuilder("Kurt", "Wonnegut", "kw", "test", "a@b.dk", "A type", "comp", "comp.url"),
        userBuilder("Hanne", "Wonnegut", "hw", "test", "a@b.dk", "A type", "comp", "comp.url"),
        userBuilder("Janne", "Wonnegut", "jw", "test", "a@b.dk", "A type", "comp", "comp.url"),
        userBuilder("Iris", "Wonnegut", "iw", "test", "a@b.dk", "A type", "comp", "comp.url"),
    ]
    debug('await users creating')
    const users = await Promise.all(userPromises);

    debug('creating positions')
    const positionPromises = [
        positionBuilder(12.5931, 55.6839, users[0]._id),
        positionBuilder(12.5931, 55.6839, users[1]._id, true),
        positionBuilder(12.5931, 55.6839, users[2]._id, true)
    ]
    debug('await positions creating')
    const positions = await Promise.all(positionPromises);


    const blogPromises = [
        locationBlogBuilder("Cool Place", users[0]._id, 26, 28),
        locationBlogBuilder("Another Cool Place", users[0]._id, 56, 56),
        locationBlogBuilder("Yet Another Cool Place", users[0]._id, 28, 56),
        locationBlogBuilder("The coolest Place", users[3]._id, 34, 56),
    ];
    debug('await locationblog creating')
    const blogs = await Promise.all(blogPromises);

    //Add a few likes for "a Cool Place"
    blogs[0].likedBy.push(users[1]); //Like by Hanne
    blogs[0].likedBy.push(users[2]); //Like by Janne
}

module.exports = createData;