module.exports = {
  port: 3000,
  session: {
    secret: 'xblog',
    key: 'xblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/xblog'
}; 
