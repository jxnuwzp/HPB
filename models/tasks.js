var Task = require('../lib/mongo').Task;

module.exports = {
    // 创建一篇task
    create: function create(task) {
        return Task.create(task).exec();
    },

    // 通过task id 获取一篇task
    getTaskById: function getTaskById(taskId) {
        return Task
            .findOne({ _id: taskId })
            .populate({ path: 'creator', model: 'User' })
            .addCreatedAt()
            .exec();
    },
    getTaskCount: function getTaskCount(name, creator) {    
        var query = {};
        if (name) {
            query = { "shopname": new RegExp(name, 'i') };
        }
        query.creator = creator;
        return Task
            .find(query)
            .populate({ path: 'creator', model: 'User' })
            .exec();

    },
    // 按创建时间降序获取所有用户task或者某个特定用户的所有task
    getTasks: function getTasks(name, creator, page) {
        var query = {};
        if (name) {
            query = { "shopname": new RegExp(name, 'i') };
        }
        query.creator = creator;
        return Task
            .find(query, {
                skip: (page - 1) * 15,
                limit: 15
            })
            .populate({ path: 'creator', model: 'User' })
            .sort({ _id: -1 })
            .addCreatedAt()
            .exec();
    },

    // 通过用户 id 和task id 更新一篇task
    updateTaskById: function updateTaskById(taskId, creator, data) {
        return Task.update({ creator: creator, _id: taskId }, { $set: data }).exec();
    },

    // 通过用户 id 和task id 删除一篇task
    delTaskById: function delTaskById(taskId, creator) {
        return Task.remove({ creator: creator, _id: taskId }).exec();
    }
};