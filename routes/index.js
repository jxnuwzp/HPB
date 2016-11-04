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

    app.get('/reviewer/register', checkNotLogin);
    app.get('/reviewer/register', function(req, res) {
        res.render('reviewer/register');
    });

    app.post('/reviewer/register', checkNotLogin);
    app.post('/reviewer/register', function(req, res) {
        var name = req.body.username,
            password = req.body.userpassword,
            password_re = req.body['password_repeat'];
        //check password if the same
        if (password_re != password) {
            return res.redirect('reviewer/register'); //return
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
                return res.redirect('reviewer/register'); //back to register page
            }
            //if user not exist, insert into database
            newUser.save(function(err, user) {
                if (err) {
                    //   req.flash('error', err);
                    return res.redirect('reviewer/register'); //register fail
                }
                req.session.user = user; //save session
                //success! back to home page
                res.render('reviewer/shop', {
                    user: req.session.user
                });
            });
        });
        // res.render('register');
    });

    app.get('/reviewer/login', checkNotLogin);
    app.get('/reviewer/login', function(req, res) {
        res.render('reviewer/login');
    });

    app.post('/reviewer/login', checkNotLogin);
    app.post('/reviewer/login', function(req, res) {
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.userpassword).digest('hex');
        //check whether user exist.
        User.get(req.body.username, function(err, user) {
            if (!user) {
                return res.redirect('reviewer/login'); //user not exist!back to login page
            }
            //check if the password is the same with database
            if (user.password != password) {
                return res.redirect('reviewer/login'); //password error, redirect to login page
            }
            //matched!, user store to  session
            req.session.user = user;
            //success! back to home page
            res.render('reviewer/shop', {
                user: req.session.user
            });
        });

    });

    app.get('/logout', checkLogin);
    app.get('/logout', function(req, res) {
        req.session.user = null;
        res.redirect('/'); //
    });

    app.get('/shoplogin', function(req, res) {
        res.render('login');
    });

    app.get('/reviewerlogin', function(req, res) {
        res.render('login');
    });

    app.get('/reviewer/shop', function(req, res) {
        res.render('reviewer/shop', {
            user: req.session.user
        });
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

    function checkLogin(req, res, next) {
        if (!req.session.user) {
            return res.redirect('reviewer/login');
        }
        next();
    }

    function checkNotLogin(req, res, next) {
        if (req.session.user) {
            return res.redirect('shop'); //back to prev page
        }
        next();
    }
};