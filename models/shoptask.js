var mongodb = require('./db');

function ShopTask(task) {
    this.id = task.id;
    this.shopname = task.shopname;
    this.urlpath = task.urlpath;
    this.completetime = task.completetime;
    this.file = task.file;
    this.comment = task.comment;
    this.creator = task.creator;
    this.status = task.status; //0:未开始 1:正在进行中 2:已完成
    this.createtime = task.createtime;
    this.modifytime = task.modifytime;

};

module.exports = ShopTask;

//
ShopTask.prototype.save = function(callback) {
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
        id: this.id,
        shopname: this.shopname,
        urlpath: this.urlpath,
        completetime: this.completetime,
        file: this.file,
        comment: this.comment,
        createtime: time,
        modifytime: time,
        status: 0, //0:未开始
        creator: this.creator
    };
    //open data base
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        //get shoptasks
        db.collection('shoptasks', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.insert(task, {
                safe: true
            }, function(err, task) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, task[0]); //success
            });
        });
    });
};

//get shop task
ShopTask.get = function(id, callback) {

    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }

        db.collection('shoptasks', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            // var query = {};
            // if (id) {
            //     query._id = ObjectId(id);
            // }
            var ObjectId = require('mongodb').ObjectID;
            collection.findOne({ "_id": ObjectId(id) }, function(err, task) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, task);
            });
        });
    });
};


ShopTask.getTasks = function(name, page, callback) {
    //open database
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        //get shoptasks collection
        db.collection('shoptasks', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            var query = {};
            if (name) {
                query = { "shopname": new RegExp(name, 'i') };
            }
            //get specify record
            collection.count(query, function(err, total) {
                //according to query condition get (page-1)*10 records，get 10 results
                collection.find(query, {
                    skip: (page - 1) * 15,
                    limit: 15
                }).sort({
                    modifytime: 1
                }).toArray(function(err, _tasks) {
                    mongodb.close();
                    if (err) {
                        return callback(err);
                    }
                    callback(null, _tasks, total);
                });
            });
        });
    });
};

//update shop task
ShopTask.update = function(data, callback) {

    var date = new Date();
    var time = {
        date: date,
        year: date.getFullYear(),
        month: date.getFullYear() + "-" + (date.getMonth() + 1),
        day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
            date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    }
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }

        db.collection('shoptasks', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            var ObjectId = require('mongodb').ObjectID;
            collection.update({ "_id": ObjectId(data.id) }, {
                $set: {
                    "shopname": data.shopname,
                    "urlpath": data.urlpath,
                    "completetime": data.completetime,
                    "file": data.file,
                    "comment": data.comment,
                    "modifytime": time

                }
            }, { multi: true }, function(err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};

ShopTask.del = function(id, callback) {
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }

        db.collection('shoptasks', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            var ObjectId = require('mongodb').ObjectID;
            collection.remove({ "_id": ObjectId(id) }, { multi: true }, function(err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};