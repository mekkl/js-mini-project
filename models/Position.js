const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EXPIRES =  60 * 60 * 1; // one hour

const PositionSchema = new Schema({
    //Make sure that next line reflects your User-model
    user: { type: Schema.ObjectId, ref: 'User', required: true },
    created: { type: Date, expires: EXPIRES, default: Date.now },
    location: {
        type: { type: String, enum: "Point", default: "Point" },
        coordinates: { type: [Number] }
    }
})
PositionSchema.index({ location: "2dsphere" }, { "background": true });

module.exports = mongoose.model("Position", PositionSchema);