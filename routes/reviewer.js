var express = require('express');
var router = express.Router();

var checkNotLogin = require('../middlewares/check').checkNotLogin;
var ReviewerUserInfoModel = require('../models/reviewer');

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
	var reviewerId = 333;
	ReviewerUserInfoModel.getReviewerInfoById(reviewerId)
		.then(function (result) {
			if(result == null){
				res.render('reviewer/userinfo', {
					dianpingUserName: null
				});
			}
			else{
				res.render('reviewer/userinfo', {
					dianpingUserName: result.dianpingUserName
				});
			}
		})
		.catch(next);
});

router.post('/userinfo', checkNotLogin, function (req, res, next) {
	var userId = 333; ///req.Session.user;
	var dianpingUserName = req.fields.dianpingUserName;

	// create the reviewer's account into a json object
	var reviewerUserInfo = {
		userId: userId,
		dianpingUserName: dianpingUserName,
		accountType: 1
	};

	ReviewerUserInfoModel.create(reviewerUserInfo)
		.then(function (result) {
			reviewerUserInfo = result.ops[0];
			req.flash('success', 'add successfully!');
			res.redirect('userinfo');
		})
		.catch(function (e) {
			if (e.message.match('E11000 duplicate key')) {
				req.flash('error', 'account已被占用');
				return res.redirect('userinfo');
			}
			next(e);
		});
	// res.render('reviewer/userinfo');
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