module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  database: process.env.DATABASE || 'mongodb://localhost/base_model'
};