var express = require('express');
var path = require('path');
var router = express.Router();

var TaskModel = require('../models/tasks');
var checkLogin = require('../middlewares/check').checkLogin;
var UserModel = require('../models/users');
var ShopModel = require('../models/shops');
// GET /Tasks 所有用户或者特定用户的task页
//   eg: GET /Tasks?creator=xxx
router.get('/tasklist', checkLogin, function(req, res, next) {
    var key = req.query.key;
    var creator = req.session.user._id;
    var totalCount = 0;
    TaskModel.getTaskCount(key, creator).then(function(tasks) {
        totalCount = tasks.length;
    });

    //check if it is the first page，convert to number type
    var page = req.query.p ? parseInt(req.query.p) : 1;
    //get the ten page taks
    TaskModel.getTasks(key, creator, page).then(function(tasks) {
            res.render('shop/tasklist', {
                tasks: tasks,
                total: totalCount,
                page: page,
                isFirstPage: (page - 1) == 0,
                isLastPage: ((page - 1) * 15 + tasks.length) == totalCount,
            });
        })
        .catch(next);
});

router.get('/userinfo', checkLogin, function(req, res, next) {
    res.render('shop/userinfo');
});

router.get('/shopcharge', checkLogin, function(req, res, next) {
    res.render('shop/shopcharge');
});

// GET /Tasks/create 发表task页
router.get('/create', checkLogin, function(req, res, next) {
    var creator = req.session.user._id;
    ShopModel.getShopCount(null, creator).then(function(shops) {
            res.render('shop/create', {
                shops: shops
            });
        })
        .catch(next);
});

// Task /Tasks 发表一篇task
router.post('/create', checkLogin, function(req, res, next) {
    var creator = req.session.user._id;
    var shopname = req.fields.shopname;
    var urlpath = req.fields.urlpath;


    // 校验参数
    try {
        if (!shopname.length) {
            throw new Error('请填写店名');
        }
        if (!urlpath.length) {
            throw new Error('请填写链接地址');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('back');
    }
    var date = new Date();
    var time = {
            date: date,
            year: date.getFullYear(),
            month: date.getFullYear() + "-" + (date.getMonth() + 1),
            day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
            minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
                date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
        }
        //task info
    var task = {
        shopname: shopname,
        urlpath: urlpath,
        completetime: time.minute,
        file: req.files.fileimg.path.split(path.sep).pop(),
        comment: req.fields.comment,
        createtime: time.minute,
        modifytime: time.minute,
        status: 0, //0:未开始
        creator: creator
    };

    TaskModel.create(task)
        .then(function(result) {
            // 此 Task 是插入 mongodb 后的值，包含 _id
            task = result.ops[0];
            req.flash('success', '发表成功');
            // 发表成功后跳转到该task页
            res.redirect('tasklist');
        })
        .catch(next);
});

// GET /Tasks/:taskId 单独一篇的task页
router.get('/:taskId', function(req, res, next) {
    var taskId = req.params.taskId;

    Promise.all([
            TaskModel.getTaskById(taskId) // 获取task信息
        ])
        .then(function(result) {
            var task = result[0];
            if (!task) {
                throw new Error('该task不存在');
            }

            res.render('Task', {
                Task: task
            });
        })
        .catch(next);
});

// GET /Tasks/:taskId/edit 更新task页
router.get('/:taskId/edit', checkLogin, function(req, res, next) {
    var taskId = req.params.taskId;
    var creator = req.session.user._id;

    Promise.all([
            TaskModel.getTaskById(taskId), // 获取task信息
            ShopModel.getShopCount(null, creator)
        ])
        .then(function(result) {
            var task = result[0];
            var shops = result[1];
            if (!task) {
                throw new Error('该task不存在');
            }
            if (creator.toString() !== task.creator._id.toString()) {
                throw new Error('权限不足');
            }
            res.render('shop/edit', {
                task: task,
                shops: shops
            });
        })
        .catch(next);
});

// Task /Tasks/:taskId/edit 更新一篇task
router.post('/:taskId/edit', checkLogin, function(req, res, next) {
    var taskId = req.params.taskId;
    var creator = req.session.user._id;

    var date = new Date();
    var time = {
        date: date,
        year: date.getFullYear(),
        month: date.getFullYear() + "-" + (date.getMonth() + 1),
        day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
            date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    }
    var taskdata = {
        shopname: req.fields.shopname,
        urlpath: req.fields.urlpath,
        completetime: req.fields.completetime,
        file: req.fields.file ? req.fields.file : "",
        comment: req.fields.comment,
        modifytime: time.minute,
        creator: creator
    };

    TaskModel.updateTaskById(taskId, creator, taskdata)
        .then(function() {
            req.flash('success', '编辑task成功');
            // 编辑成功后跳转到上一页
            res.redirect('/shop/tasklist');
        })
        .catch(next);
});

// GET /Tasks/:taskId/remove 删除一篇task
router.get('/:taskId/remove', checkLogin, function(req, res, next) {
    var taskId = req.params.taskId;
    var creator = req.session.user._id;

    TaskModel.delTaskById(taskId, creator)
        .then(function() {
            req.flash('success', '删除task成功');
            // 删除成功后跳转到主页
            res.redirect('/shop/tasklist');
        })
        .catch(next);
});
module.exports = router;