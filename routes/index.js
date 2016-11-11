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
    // 404 page
    app.use(function(req, res) {
        if (!res.headersSent) {
            res.render('404');
        }
    });
};