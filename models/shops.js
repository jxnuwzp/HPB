var Shop = require('../lib/mongo').Shop;

module.exports = {
    // 创建一篇shop
    create: function create(shop) {
        return Shop.create(shop).exec();
    },

    // 通过shop id 获取一shop
    getShopById: function getShopById(shopId) {
        return Shop
            .findOne({ _id: shopId })
            .populate({ path: 'creator', model: 'User' })
            .addCreatedAt()
            .exec();
    },

    // 按创建时间降序获取所有用户shop或者某个特定用户的所有shop
    getShops: function getShops(name, creator, page) {
        var query = {};
        if (name) {
            query = { "shopname": new RegExp(name, 'i') };
        }
        query.creator = creator;
        return Shop
            .find(query, {
                skip: (page - 1) * 15,
                limit: 15
            })
            .populate({ path: 'creator', model: 'User' })
            .sort({ _id: -1 })
            .addCreatedAt()
            .exec();
    },
    getShopCount: function getShopCount(name, creator) {
        var query = {};
        if (name) {
            query = { "shopname": new RegExp(name, 'i') };
        }
        query.creator = creator;
        return Shop
            .find(query)
            .populate({ path: 'creator', model: 'User' })
            .exec();

    },
    // 通过用户 id 和shop id 更新一篇shop
    updateShopById: function updateShopById(shopId, creator, data) {
        return Shop.update({ creator: creator, _id: shopId }, { $set: data }).exec();
    },

    // 通过用户 id shop id 删除一shop
    delShopById: function delShopById(shopId, creator) {
        return Shop.remove({ creator: creator, _id: shopId }).exec();
    }
};