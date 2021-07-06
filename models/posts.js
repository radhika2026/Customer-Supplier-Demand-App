var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    item: String,
    quantity: {type: String},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    }
});

module.exports = mongoose.model("Post", postSchema);