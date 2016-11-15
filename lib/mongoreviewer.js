var config = require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

// Register
exports.Reviewer = mongolass.model('Reviewer', {
    name: { type: 'string' },
    password: { type: 'string' },
    avatar: { type: 'string' },
    gender: { type: 'string', enum: ['m', 'f', 'x'] },
    bio: { type: 'string' }
});
exports.Reviewer.index({ name: 1 }, { unique: true }).exec(); // 根据用户名找到用户，用户名全局唯一

// UserInfo
exports.UserInfo = mongolass.model('ReviewerUserInfo', {
    userId: { type: 'number' },
    dianpingUserName: {type: 'string'},
    accountType: {type: 'number'}
});
exports.UserInfo.index({ userId: 1 }, { unique: true }).exec(); // 根据用户名找到用户，用户名全局唯一

// Account
exports.Account = mongolass.model('Account', {
    userId: { type: 'number' },
    dianpingUserName: {type: 'string'},
    accountType: {type: 'number'}
});
exports.Account.index({ userId: 1 }, { unique: true }).exec(); // 根据用户名找到用户，用户名全局唯一