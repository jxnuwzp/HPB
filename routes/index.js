var crypto = require('crypto'),
    User = require('../models/user.js')
ShopTask = require('../models/shoptask.js');
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

        res.render('reviewer/register', {
            title: '注册',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.post('/reviewer/register', checkNotLogin);
    app.post('/reviewer/register', function(req, res) {
        var name = req.body.username,
            password = req.body.userpassword,
            password_re = req.body['password_repeat'];
        //check password if the same
        if (password_re != password) {
            req.flash('error', '两次输入的密码不一致!');
            return res.redirect('register'); //return
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
                req.flash('error', '用户已存在!');
                return res.redirect('register'); //back to register page
            }
            //if user not exist, insert into database
            newUser.save(function(err, user) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('register'); //register fail
                }
                req.session.user = user; //save session
                req.flash('success', '注册成功!');
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
        res.render('reviewer/login', {
            title: '登录',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.post('/reviewer/login', checkNotLogin);
    app.post('/reviewer/login', function(req, res) {
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.userpassword).digest('hex');
        //check whether user exist.
        User.get(req.body.username, function(err, user) {
            if (!user) {
                req.flash('error', '用户不存在!');
                return res.redirect('login'); //user not exist!back to login page
            }
            //check if the password is the same with database
            if (user.password != password) {
                req.flash('error', '密码错误!');
                return res.redirect('login'); //password error, redirect to login page
            }
            //matched!, user store to  session
            req.session.user = user;
            req.flash('success', '登陆成功!');
            //success! back to home page
            res.render('reviewer/shop', {
                user: req.session.user
            });
        });

    });

    app.get('/shop/upload', function(req, res) {

        if (req.query.id) {
            ShopTask.get(req.query.id, function(err, _task) {
                //if taks exist, so do update
                if (_task) {
                    res.render('shop/upload', {
                        title: '商家更新任务',
                        task: _task,
                        user: { "name": "testing" }, //TODO
                        success: req.flash('success').toString(),
                        error: req.flash('error').toString()
                    });
                }
            });
        } else {
            res.render('shop/upload', {
                title: '商家上传任务',
                task: null,
                user: { "name": "testing" }, //TODO
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        }
    });
    //for shop owner upload task
    app.post('/shop/upload', function(req, res) {

        var task = new ShopTask({
            id: req.body._id,
            shopname: req.body.shopname,
            urlpath: req.body.urlpath,
            completetime: req.body.completetime,
            file: req.body.file,
            comment: req.body.comment,
            creator: req.session.user ? req.session.user.name : "", //TODO
            modifytime: new Date(),
            createtime: new Date()
        });
        task.urlpath = task.urlpath.toLowerCase().indexOf("http") > -1 || task.urlpath.toLowerCase().indexOf("https") > -1 ? task.urlpath : "http://" + task.urlpath;

        //check if task exist
        ShopTask.get(req.query.id, function(err, _task) {

            //if taks exist, so do update
            if (_task) {
                // update task
                ShopTask.update(task, function(err, data) {
                    if (err) {
                        req.flash('error', err);
                        return res.redirect('upload'); //add task fail
                    }
                    req.flash('success', 'update successfully!');
                    res.render('shop/upload', {
                        title: '商家更新任务',
                        task: task,
                        user: { "name": "testing" }, //TODO
                        success: req.flash('success').toString(),
                        error: req.flash('error').toString()
                    });
                });
            } else {
                //if user not exist, insert into database
                task.save(function(err, task) {
                    if (err) {
                        req.flash('error', err);
                        return res.redirect('upload'); //add task fail
                    }
                    req.flash('success', '添加成功');
                    //success! back to home page
                    return res.redirect('tasklist');
                });
            }
        });
    });
    app.get('/shop/tasklist', function(req, res) {

        //check if it is the first page，convert to number type
        var page = req.query.p ? parseInt(req.query.p) : 1;
        //get the ten page taks
        ShopTask.getTasks(null, page, function(err, tasks, total) {
            if (err) {
                tasks = [];
            }
            res.render('shop/tasklist', {
                title: 'task list',
                tasks: tasks,
                total: total,
                page: page,
                isFirstPage: (page - 1) == 0,
                isLastPage: ((page - 1) * 15 + tasks.length) == total,
                user: { "name": "testing" }, //TODO
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });

    app.get('/shop/search', function(req, res) {

        //check if it is the first page，convert to number type
        var page = req.query.p ? parseInt(req.query.p) : 1;
        var key = req.query.key;
        //get the ten page taks
        ShopTask.getTasks(key, page, function(err, tasks, total) {
            if (err) {
                tasks = [];
            }
            res.render('shop/tasklist', {
                title: 'task list',
                tasks: tasks,
                total: total,
                page: page,
                isFirstPage: (page - 1) == 0,
                isLastPage: ((page - 1) * 15 + tasks.length) == total,
                user: { "name": "testing" }, //TODO
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });
    //delete one record
    app.get('/shop/del', function(req, res) {
        //check if task exist
        ShopTask.get(req.query.id, function(err, _task) {
            if (err) {
                req.flash('error', err);
                return res.redirect('tasklist'); //add task fail
            }
            //if taks exist, so do delete
            ShopTask.del(req.query.id, function(err, data) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('tasklist');
                }
                req.flash('success', '删除成功');
                return res.redirect('tasklist');

            });
        });
    });

    //logout
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
            req.flash('error', '未登录!');
            return res.redirect('reviewer/login');
        }
        next();
    }

    function checkNotLogin(req, res, next) {
        if (req.session.user) {
            req.flash('error', '已登录!');
            return res.redirect('reviewer/shop'); //back to home page
        }
        next();
    }
};