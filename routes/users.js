var express = require('express');
var router = express.Router();

/* GET users listing. */
router.use(function timeLog (req, res, next) {
  console.log('Time: ', new Date())
  next()
})
router.get('/', function(req, res, next) {
  res.send('respond with a resource1');
});
router.post('/post', function(req, res, next) {
  res.send({key:'json'});
});

module.exports = router;
