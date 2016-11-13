var ReviewerUserInfo = require('../lib/mongoreviewer').UserInfo;

module.exports = {
	// 注册一个用户
	create: function create(userInfo) {
		return ReviewerUserInfo.create(userInfo).exec();
	},

	// // 通过用户名获取用户信息
	// getUserByName: function getUserByName(name) {
	// 	return ReviewerAccount
	// 		.findOne({ name: name })
	// 		.addCreatedAt()
	// 		.exec();
	// },

	// Get user account info according to userId
	getReviewerInfoById: function getReviewerInfoById(reviewerId) {
		return ReviewerUserInfo
			.findOne({ _id: reviewerId })
			.populate({ path: 'creator', model: 'User' })
			.addCreatedAt()
			.exec();
	},
};
