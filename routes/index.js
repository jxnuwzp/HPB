module.exports = function(app) {
  app.get('/', function (req, res) {
    res.render('index', { title: 'haopingbang' });
  });

  app.get('/shopregister', function (req, res) {
    res.render('register');
  });

  app.get('/reviewerregister', function (req, res) {
    res.render('register');
  });

  app.get('/shoplogin', function (req, res) {
    res.render('login');
  });

  app.get('/reviewerlogin', function (req, res) {
    res.render('login');
  });

  app.get('/shop', function (req, res) {
    res.render('shop');
  });

  app.get('/shopmanage', function (req, res) {
    res.render('shopmanage');
  });

  app.get('/shoptask', function (req, res) {
    res.render('shoptask');
  });

  app.get('/shoppublishtask', function (req, res) {
    res.render('shoppublishtask');
  });

  app.get('/shopcharge', function (req, res) {
    res.render('shopcharge');
  });
 

  app.get('/reviewer', function (req, res) {
    res.render('reviewer');
  });

  app.get('/reviewermanage', function (req, res) {
    res.render('reviewermanage');
  });

  app.get('/reviewermoney', function (req, res) {
    res.render('reviewermoney');
  });

  app.get('/reviewertask', function (req, res) {
    res.render('reviewertask');
  });

  app.get('/task', function (req, res) {
    res.render('task');
  });
};