var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');
/* GET home page. */

router.get('/noCach', function(req, res, next) {
  res.render('index',{title:'aa'})
});

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../public/html/cache.html'),{maxAge:'3600000'})
});
router.get('/cache', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../public/html/cache.html'),{maxAge:'3600000'})
});


/***
Connection: keep-alive
*/
router.get('/img', function(req, res, next) {
  console.log('req:query',req['query'])
  console.log('req:params',req['params'])
  res.set({'ETag':new Date().getTime()})
  let tempFileName = '../public/images/dayu/abc_'+ req['query']['id'] +'.jpg'
  res.sendFile(path.join(__dirname,tempFileName),{maxAge:'0','cacheControl':false,'lastModified':false})
});

/***
Connection: close
*/

router.get('/imgClose', function(req, res, next) {
  console.log('req:query',req['query'])
  console.log('req:params',req['params'])
  // res.set({'ETag':new Date().getTime()})
  res.set({'ETag':new Date().getTime(),'Connection':'close'})
  let tempFileName = '../public/images/dayu/abc_'+ req['query']['id'] +'.jpg'
  res.sendFile(path.join(__dirname,tempFileName),{maxAge:'0','cacheControl':false,'lastModified':false})
});


router.get('/style.css', function(req, res, next) {
  const cssPath = path.join(__dirname,'../public/stylesheets/style.css')
  console.log('style.css')
  fs.readFile(cssPath,(error,content) => {
    res.setHeader('Cache-Control','max-age=10')
    res.end(content)
  })
});
router.get('/test.js', function(req, res, next) {
  const cssPath = path.join(__dirname,'../public/javascripts/test.js')
  console.log('test.js')
  fs.readFile(cssPath,(error,content) => {
    res.setHeader('Cache-Control','max-age=10')
    res.end(content)
  })
});
module.exports = router;
