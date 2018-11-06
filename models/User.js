var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

//Use as an example for embedding
var JobSchema = new Schema({
  type: String,
  company: String,
  companyUrl : String
});

var UserSchema = new Schema({
  userName: {type: String, unique: true, required: true},
  firstName : String,
  lastName : String,
  password : {type: String, required: true},
  email: {type: String, required: true},
  //Observe embedding
  job : [JobSchema],
  created: {type: Date, default: Date.now},
  lastUpdated : Date
})

UserSchema.pre("save", async function(next) {
  const saltRounds = 10
  this.password = await bcrypt.hash(this.password, saltRounds)
  this.lastUpdated = new Date();
  next();
})

UserSchema.pre("update",function(next){
  this.update({},{$set : {lastUpdated: new Date()}});
  next();
})

module.exports = mongoose.model("User",UserSchema);