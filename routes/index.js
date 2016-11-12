module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('home', {
            "title": "haopingbang"
        });
    });
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    app.use('/shop', require('./task'));
<<<<<<< HEAD
    app.use('/shopmgr', require('./shopmgr'));
=======
    app.use('/reviewer', require('./reviewer'));
>>>>>>> f840e8fadf3dbd5e5272e1f62b7085c627547899

    // 404 page
    app.use(function(req, res) {
        if (!res.headersSent) {
            res.render('404');
        }
    });
};