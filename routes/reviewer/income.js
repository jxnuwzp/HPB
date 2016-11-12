var express = require('express');
var router = express.Router();

var checkNotLogin = require('../../middlewares/check').checkNotLogin;

// GET /reviewerincome management page
router.get('/', checkNotLogin, function (req, res, next) {
	res.render('reviewer/income');
});

// POST /reviewermanage 用户登录
router.post('/', checkNotLogin, function (req, res, next) {
	res.render('reviewermanage');
});

module.exports = router;