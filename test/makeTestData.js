require("../dbSetup.js")();

const User = require("../models/User.js");
const LocationBlog = require("../models/LocationBlog.js");
const Position = require("../models/Position.js");

//Utility Function to create users
function userCreate(firstName, lastName, userName, password, email, type, company, companyUrl) {
    const job = [{ type, company, companyUrl }, { type, company, companyUrl }];
    const userDetail = { firstName, lastName, userName, email, password, job };
    const user = new User(userDetail);
    return user.save();
}

//Utility Function to create Positions
function positionCreator(lon, lat, userId, dateInFuture) {
    const posDetail = { user: userId, loc: { coordinates: [lon, lat] } }
    if (dateInFuture) {
      posDetail.created = "2022-09-25T20:40:21.899Z"
    }
    const pos = new Position(posDetail);
    return pos.save();
}
//Utility Function to create LocationBlogs
function locationBlogCreator(info, author, longitude, latitude) {
  const LocationBlogDetail = { info, pos: { longitude, latitude }, author };
  const blog = new LocationBlog(LocationBlogDetail);
  return blog.save();
}
// Here we will setup users
async function createUsers() {
  
  await User.deleteMany({});
  await Position.deleteMany({});
  await LocationBlog.deleteMany({});

  const userPromises = [
    userCreate("Kurt", "Wonnegut", "kw", "test", "a@b.dk", "A type", "comp", "comp.url"),
    userCreate("Hanne", "Wonnegut", "hw", "test", "a@b.dk", "A type", "comp", "comp.url"),
    userCreate("Janne", "Wonnegut", "jw", "test", "a@b.dk", "A type", "comp", "comp.url"),
    userCreate("Iris", "Wonnegut", "iw", "test", "a@b.dk", "A type", "comp", "comp.url"),
  ]
  const users = await Promise.all(userPromises);
  
  const positionPromises = [
    positionCreator(10, 11, users[0]._id),
    positionCreator(11, 12, users[1]._id, true),
    positionCreator(11, 13, users[2]._id, true)
  ]
  const positions = await Promise.all(positionPromises);

  try {
    const blogPromises = [
      locationBlogCreator("Cool Place", users[0]._id, 26, 28),
      locationBlogCreator("Another Cool Place", users[0]._id, 56, 56),
      locationBlogCreator("Yet Another Cool Place", users[0]._id, 28, 56),
      locationBlogCreator("The coolest Place", users[3]._id, 34, 56),
    ];
    const blogs = await Promise.all(blogPromises);
  } catch (err) {
    console.log("UPPPS: ", err);
  }
  //Check the virtuals
  console.log("Slug for a Cool Place", blogs[0].slug);

  //Add a few likes for "a Cool Place"
  blogs[0].likedBy.push(users[1]); //Like by Hanne
  blogs[0].likedBy.push(users[2]); //Like by Janne
  console.log("Likes for a Cool Place", blogs[0].likedByCount);
}

module.exports = createUsers;
