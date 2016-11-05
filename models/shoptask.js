var mongodb = require('./db');

function ShopTask(task) {
    this.shopname = task.shopname;
    this.urlpath = task.urlpath;
    this.completetime = task.completetime;
    this.file = task.file;
    this.comment = task.comment;
    this.creator = task.creator;
    this.createtime = task.createtime;
    this.modifytime = task.modifytime;

};

module.exports = ShopTask;

//
ShopTask.prototype.save = function(callback) {

    //task info
    var task = {
        id: this.id,
        shopname: this.shopname,
        urlpath: this.urlpath,
        completetime: this.completetime,
        file: this.file,
        comment: this.comment,
        createtime: this.createtime,
        modifytime: this.modifytime,
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
            // var ret = db.counters.findAndModify({
            //     query: { id: task.id },
            //     update: { $inc: { seq: 1 } },
            //     new: true
            // });
            // task.id = ret.seq;

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

            collection.findOne({
                id: id
            }, function(err, task) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, task);
            });
        });
    });
};