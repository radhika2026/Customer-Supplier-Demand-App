var mongoose = require('mongoose');
var PassportLocalMongoose = require('passport-local-mongoose');

var CustomerSchema = new mongoose.Schema({
    username: String,
    password: String
});

CustomerSchema.plugin(PassportLocalMongoose);

module.exports = mongoose.model("Customer", CustomerSchema);