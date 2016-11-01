module.exports = function(app) {
  app.get('/', function (req, res) {
    res.render('index', { title: 'haopingbang' });
  });

  app.get('/login', function (req, res) {
    res.render('login');
  });

  app.get('/register', function (req, res) {
    res.render('register');
  });

  app.get('/shop', function (req, res) {
    res.render('home');
  });

  app.get('/reviewer', function (req, res) {
    res.render('home');
  }); 
};