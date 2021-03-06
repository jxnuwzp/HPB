var config = require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
    afterFind: function(results) {
        results.forEach(function(item) {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
        });
        return results;
    },
    afterFindOne: function(result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
});

exports.User = mongolass.model('User', {
    name: { type: 'string' },
    password: { type: 'string' },
    avatar: { type: 'string' },
    gender: { type: 'string', enum: ['m', 'f', 'x'] },
    bio: { type: 'string' }
});
exports.User.index({ name: 1 }, { unique: true }).exec(); // 根据用户名找到用户，用户名全局唯一

exports.Task = mongolass.model('Task', {
    creator: { type: Mongolass.Types.ObjectId },
    shopname: { type: 'string' },
    urlpath: { type: 'string' },
    status: { type: 'number' },
    completetime: { type: 'string' },
    tempfile: { type: 'string' },
    filename: { type: 'string' },
    comment: { type: 'string' },
    createtime: { type: 'string' },
    modifytime: { type: 'string' }
});
exports.Task.index({ creator: 1, _id: -1 }).exec(); // 按创建时间降序查看用户的task列表

exports.Shop = mongolass.model('Shop', {
    creator: { type: Mongolass.Types.ObjectId },
    shopname: { type: 'string' },
    createtime: { type: 'string' },
    modifytime: { type: 'string' }
});
exports.Shop.index({ creator: 1, _id: -1 }).exec(); // 按创建时间降序查看用户的Shop列表