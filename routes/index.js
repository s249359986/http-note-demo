var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '约谈http' });
});
router.get('/cache', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../public/html/cache.html'),{maxAge:'3600000'})
});


router.get('/style.css', function(req, res, next) {
  const cssPath = path.join(__dirname,'../public/stylesheets/style.css')
  fs.readFile(cssPath,(error,content) => {
    res.setHeader('Cache-Control','public,max-age=20')
    res.end(content)
  })
});
router.get('/test.js', function(req, res, next) {
  const cssPath = path.join(__dirname,'../public/javascripts/test.js')
  fs.readFile(cssPath,(error,content) => {
    res.setHeader('Cache-Control','public,max-age=20')
    res.end(content)
  })
});
module.exports = router;
