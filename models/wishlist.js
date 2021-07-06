var mongoose = require("mongoose");

var wishlistSchema = new mongoose.Schema({
    item: String,
    quantity: {type: String},
});

module.exports = mongoose.model("Wishlist", wishlistSchema);