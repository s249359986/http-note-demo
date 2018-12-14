var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');
/* GET home page. */
router.head('/order', function(req, res, next) {  
	console.log('head',req.headers)
	res.set('Etag','head'+new Date().getTime())
	res.send({headers:'hello'})
});
router.get('/order', function(req, res, next) {
  res.send({method:req['method']})
});
router.post('/order', function(req, res, next) {
  res.send({method:req['method']})
});
router.delete('/order', function(req, res, next) {
  res.send({method:req['method']})
});
router.put('/order', function(req, res, next) {
  res.send({method:req['method']})
});
module.exports = router;
