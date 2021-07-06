const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var methodOverride = require('method-override');
var flash = require('connect-flash')
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./models/users.js')
var Post = require('./models/posts.js')
var Customer = require('./models/customers.js')
var Wishlist = require('./models/wishlist.js')
var customerRoutes = require('./routes/customer')
var indexRoutes = require('./routes/index')
var postRoutes = require('./routes/posts')
//seedDB = require('./seed.js')

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); ''
app.use(methodOverride('_method'));
app.use(express.static(__dirname + "/public"))
app.set('view engine', 'ejs');


mongoose.connect('mongodb+srv://ayush:ayush@cluster0.2qbjg.mongodb.net/cbb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
//mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

//seedDB();

//Passport config
app.use(require('express-session')({
    secret: "Jon Snow kills Danny",
    resave: false,
    saveUninitialized: false
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});


app.use(indexRoutes);
app.use(postRoutes);
app.use(customerRoutes)

app.listen(process.env.PORT || 5000, function () {
    console.log("Server has Started at port 5000");
});
