require("./dbSetup.js")();

const User = require("./models/User.js");
const LocationBlog = require("./models/LocationBlog.js");
const Position = require("./models/Position.js");
const debug = require('debug')('miniproject:makeTestData')

//Utility Function to create users
function userCreate(firstName, lastName, userName, password, email, type, company, companyUrl) {
  debug('building user')
  const job = [{ type, company, companyUrl }, { type, company, companyUrl }];
  const userDetail = { firstName, lastName, userName, email, password, job };
  const user = new User(userDetail);
  return user.save();
}

//Utility Function to create Positions
function positionCreator(lon, lat, userId, dateInFuture) {
  debug('building position')
  const posDetail = { user: userId, location: { type: 'Point', coordinates: [lon, lat] } }
  if (dateInFuture) {
    posDetail.created = "2022-09-25T20:40:21.899Z"
  }
  const pos = new Position(posDetail);
  return pos.save();
}
//Utility Function to create LocationBlogs
function locationBlogCreator(info, author, longitude, latitude) {
  debug('building locationblog')
  const LocationBlogDetail = { info, position: { longitude, latitude }, author };
  const blog = new LocationBlog(LocationBlogDetail);
  return blog.save();
}

// Here we will setup users
async function createUsers() {
  debug('deleting current db data')
  await User.deleteMany({});
  await Position.deleteMany({});
  await LocationBlog.deleteMany({});

  debug('creating users')
  const userPromises = [
    userCreate("Kurt", "Wonnegut", "kw", "test", "k@w.dk", "A type", "compa", "compa.url"),
    userCreate("Hanne", "Wonnegut", "hw", "test", "h@w.dk", "B type", "compb", "compb.url"),
    userCreate("Janne", "Wonnegut", "jw", "test", "j@w.dk", "C type", "compc", "compc.url"),
    userCreate("Iris", "Wonnegut", "iw", "test", "i@w.dk", "D type", "compd", "compd.url"),
  ]
  debug('await users creating')
  const users = await Promise.all(userPromises);

  debug('creating positions')
  const positionPromises = [
    positionCreator(12.5931, 55.6839, users[0]._id),
    positionCreator(12.5931, 55.6839, users[1]._id, true),
    positionCreator(12.5931, 55.6839, users[2]._id, true)
  ]
  debug('await positions creating')
  const positions = await Promise.all(positionPromises);


  const blogPromises = [
    locationBlogCreator("Cool Place", users[0]._id, 26, 28),
    locationBlogCreator("Another Cool Place", users[0]._id, 56, 56),
    locationBlogCreator("Yet Another Cool Place", users[0]._id, 28, 56),
    locationBlogCreator("The coolest Place", users[3]._id, 34, 56),
  ];
  debug('await locationblog creating')
  const blogs = await Promise.all(blogPromises);

  //Check the virtuals
  console.log("Slug for a Cool Place", blogs[0].slug);

  //Add a few likes for "a Cool Place"
  blogs[0].likedBy.push(users[1]); //Like by Hanne
  blogs[0].likedBy.push(users[2]); //Like by Janne
  console.log("Likes for a Cool Place", blogs[0].likedByCount);
}
createUsers()
module.exports = createUsers;
