var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/users');
var Wishlist = require('../models/wishlist')


router.get('/', function (req, res) {
    res.render('index', { currentUser: req.user })
});

router.get('/shopkeeper/dashboard', isLoggedIn, function (req, res) {
    res.render('shopkeeper', { currentUser: req.user })
});


//Auth Routes

router.get('/register', function (req, res) {
    res.render('register');
});

router.post('/register', function (req, res) {
    var newUser = new User({ username: req.body.username, area: req.body.area, name: req.body.name });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, function () {
            req.flash('success', 'Signed Up Successfully')
            res.redirect('/shopkeeper/dashboard');
        });
    });

});

router.get('/login', function (req, res) {
    res.render('login');
})

router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/shopkeeper/dashboard',
        failureRedirect: '/login'
    }), function (req, res) {   
    })

router.get('/logout', function (req, res) {
    req.logout();
    req.flash("success", "Logged Out Successfully")
    res.redirect('/');
});


//Customer


//Wishlist
router.get('/wishlist/add', function (req, res) {
    res.render('wishlist')
});

router.post('/wishlist', function (req, res) {
    var item = req.body.post.item;
    var quantity = req.body.post.quantity;
    var newitem = { item: item, quantity: quantity }
    Wishlist.create(newitem, function (err, post) {
        if (err) {
            console.log(err);
        } else {
            console.log(post);
        }
    });
    res.redirect('/customer/dashboard');
});

router.get('/wishlist', function (req, res) {
    Wishlist.find({}, function (err, items) {
        if (err) {
            console.log(err);
        } else {
            res.render('wishlist_view', { items: items });
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router