var express = require('express');
var router = express.Router();

var ShopModel = require('../models/shops');
var checkLogin = require('../middlewares/check').checkLogin;

router.get('/shoplist', checkLogin, function(req, res, next) {
    var key = req.query.key;
    var creator = req.session.user._id;
    //check if it is the first page，convert to number type
    var page = req.query.p ? parseInt(req.query.p) : 1;
    var totalCount = 0;
    ShopModel.getShopCount(key, creator).then(function(shops) {
        totalCount = shops.length;
    });
    //get the ten page shops
    ShopModel.getShops(key, creator, page).then(function(shops) {
            var total = ShopModel.getShopCount(key, creator);
            res.render('shop/shoplist', {
                shops: shops,
                total: totalCount,
                page: page,
                isFirstPage: (page - 1) == 0,
                isLastPage: ((page - 1) * 15 + shops.length) == totalCount,
            });
        })
        .catch(next);
});

router.post('/create', checkLogin, function(req, res, next) {
    var creator = req.session.user._id;
    var shopname = req.fields.shopname;

    // 校验参数
    try {
        if (!shopname.length) {
            throw new Error('请填写店名');
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
        //shop info
    var shop = {
        shopname: shopname,
        createtime: time.minute,
        modifytime: time.minute,
        creator: creator
    };

    ShopModel.create(shop)
        .then(function(result) {
            // 此 shop 是插入 mongodb 后的值，包含 _id
            // shop = result.ops[0];
            req.flash('success', '添加成功');
            // 发表成功后跳转到该shop页
            res.redirect('shoplist');
        })
        .catch(next);
});

router.post('/:shopId/edit', checkLogin, function(req, res, next) {
    var shopId = req.params.shopId;
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
    var shopdata = {
        shopname: req.fields.shopname,
        modifytime: time.minute,
        creator: creator
    };
    ShopModel.updateShopById(shopId, creator, shopdata)
        .then(function(shop) {
            if (!shop) {
                throw new Error('该商店不存在');
            }
            if (creator.toString() !== shop.creator._id.toString()) {
                throw new Error('权限不足');
            }
            return shop;
        })
        .catch(next);
});

//delete
router.get('/:shopId/remove', checkLogin, function(req, res, next) {
    var shopId = req.params.shopId;
    var creator = req.session.user._id;

    ShopModel.delShopById(shopId, creator)
        .then(function() {
            req.flash('success', '删除商店成功');
            // 删除成功后跳转到主页
            res.redirect('/shopmgr/shoplist');
        })
        .catch(next);
});

module.exports = router;