var crypto = require('crypto'),
    User = require('../models/user.js');
module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index', { title: 'haopingbang' });
    });

    app.get('/shopregister', function(req, res) {
        res.render('reviewerregister');
    });

    app.get('/reviewerregister', function(req, res) {
        res.render('reviewerregister');
    });

    app.post('/reviewerregister', function(req, res) {
        res.render('reviewerregister');
    });

    app.get('/register', checkNotLogin);
    app.get('/register', function(req, res) {
        res.render('register');
    });

    app.post('/register', checkNotLogin);
    app.post('/register', function(req, res) {
        var name = req.body.username,
            password = req.body.userpassword,
            password_re = req.body['password_repeat'];
        //check password if the same
        if (password_re != password) {
            return res.redirect('/register'); //return
        }

        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.userpassword).digest('hex');
        var newUser = new User({
            name: req.body.username,
            password: password,
            email: req.body.useremail
        });


        //check if user exist
        User.get(newUser.name, function(err, user) {

            //if user exist
            if (user) {
                // req.flash('error', 'user exist');
                return res.redirect('/register'); //back to register page
            }
            //if user not exist, insert into database
            newUser.save(function(err, user) {
                if (err) {
                    //   req.flash('error', err);
                    return res.redirect('/register'); //register fail
                }
                req.session.user = user; //save session
                res.redirect('/'); //go to home
            });
        });
        // res.render('register');
    });



    app.get('/shoplogin', function(req, res) {
        res.render('login');
    });

    app.get('/reviewerlogin', function(req, res) {
        res.render('login');
    });

    app.get('/shop', function(req, res) {
        res.render('shop');
    });

    app.get('/shopmanage', function(req, res) {
        res.render('shopmanage');
    });

    app.get('/shoptask', function(req, res) {
        res.render('shoptask');
    });

    app.get('/shoppublishtask', function(req, res) {
        res.render('shoppublishtask');
    });

    app.get('/shopcharge', function(req, res) {
        res.render('shopcharge');
    });


    app.get('/reviewer', function(req, res) {
        res.render('reviewer');
    });

    app.get('/reviewermanage', function(req, res) {
        res.render('reviewermanage');
    });

    app.get('/reviewermoney', function(req, res) {
        res.render('reviewermoney');
    });

    app.get('/reviewertask', function(req, res) {
        res.render('reviewertask');
    });

    app.get('/task', function(req, res) {
        res.render('task');
    });

    function checkNotLogin(req, res, next) {
        if (req.session.user) {
            req.flash('error', 'already logined!');
            return res.redirect('back'); //back to prev page
        }
        next();
    }
};