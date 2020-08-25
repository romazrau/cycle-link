var express = require('express');
var router = express.Router();

let testSql =  require('../src/SQL/test');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET users listing. */
router.get('/test', function(req, res, next) {
  testSql()
  .then((result)=>{
    res.json(result);
  })
  .catch((err)=>{
    res.send(err);
  })
  
});



module.exports = router;
