var express = require('express');
var router = express.Router();

var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /reviewer/account management page
// to view the reviewer's account
router.get('/account', checkNotLogin, function (req, res, next) {
	res.render('reviewer/account');
});

// POST /reviewer/account
router.post('/account', checkNotLogin, function (req, res, next) {
	res.render('reviewermanage');
});

// GET /reviewer/info management page
// to view the reviewer's user information 
router.get('/userinfo', checkNotLogin, function (req, res, next) {
	res.render('reviewer/userinfo');
});

// GET /reviewer/completedtask page
// to view all the reviewer's completed tasks or in progress
router.get('/completedtask', checkNotLogin, function (req, res, next) {
	res.render('reviewer/completedtask');
});

// GET /reviewer/dotask page
// to view all the tasks which are in progress 
router.get('/dotask', checkNotLogin, function (req, res, next) {
	res.render('reviewer/dotask');
});

module.exports = router;