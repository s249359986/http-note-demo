var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var crypto = require('crypto')
function getMd5(path){
  var md5 = crypto.createHash('md5');
  return new Promise(function(resolve,reject){
    fs.readFile(path,(error,content) => {
      resolve(md5.update(content).digest('hex'))
    })
  })

}

/* GET users listing. */
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', new Date())
//   next()
// })
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../public/html/bj.html'))
});

router.get('/duibi.css', function(req, res, next) {
  const cssPath = path.join(__dirname,'../public/stylesheets/duibi.css')
getMd5(cssPath).then(function(data){
  console.log('headers',req.headers)
  if(req.headers['if-none-match'] === data){
    console.log('304')
    res.status(304).end('123')
  }else {
    fs.readFile(cssPath,(error,content) => {
      // getMd5(cssPath).then(function(data){
        res.set('ETag',data)
        setTimeout(function(){
          // res.setHeader('Cache-Control','no-cache')
          res.end(content)
        },5000)
      })
    // })
  }

})

});
router.get('/duibi.js', function(req, res, next) {
  const cssPath = path.join(__dirname,'../public/javascripts/duibi.js')
  fs.readFile(cssPath,(error,content) => {
    res.end(content)
  })
});
router.post('/post', function(req, res, next) {
  res.send({key:'json'});
});

module.exports = router;
