var mongoose = require('mongoose');
var PassportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    area: {type:String, default: 'NA'},
    name: {type:String, default: 'NA'},
    slot1: {type:Number, default: 1},
    slot2: {type:Number, default: 2},
    slot3: {type:Number, default: 3},
    slot4: {type:Number, default: 4},
    slot5: {type:Number, default: 5},
    slot6: {type:Number, default: 6},
});

UserSchema.plugin(PassportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);